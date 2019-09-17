import Service from '@ember/service';
import Ember from 'ember';

export default Service.extend({
    ctiSettingsService: Ember.inject.service(),
    activityService: Ember.inject.service(),
    router: Ember.inject.service(),

    embedDetailsWindow: Ember.computed('ctiSettingsService.settings', function(){
        return this.get('ctiSettingsService.settings.embeddedInteractionWindow');
    }),
    isDetailsWindowVisible: false,
    phoneURL: Ember.computed('ctiSettingsService.settings.env', function(){
        let env = this.get('ctiSettingsService.settings.env');
        let region = this.getRegion();
        let domain = window.location.origin;
        if(!env){
            env = {};
        }

        if(env.key == 'local'){
            return `https://apps.${region}/crm/index.html?crm=framework-local-secure&parentDomain=${domain}`;
        }else if(env.key == 'pef'){
            let partnerName = this.get('ctiSettingsService.settings.frameworkName');
            return `https://apps.${region}/crm/${partnerName}/index.html?parentDomain=${domain}`;
        }else{
            return `https://apps.${region}/crm/embeddableFramework.html?parentDomain=${domain}`;
        }
    }),
    detailsWindowURL: Ember.computed('ctiSettingsService.settings.env', function(){
        let env = this.get('ctiSettingsService.settings.env');
        let region = this.getRegion();
        if(!env){
            env = {};
        }
        if(env.key == 'pef'){
            let partnerName = this.get('ctiSettingsService.settings.frameworkName');
            return `https://apps.${region}/crm/${partnerName}/interaction.html`;
        }else{
            return `https://apps.${region}/crm/interaction.html`; 
        }
    }),
    postSettings: function(){
        let payload = {
            type:'init',
            settings: {
                embedWebRTCByDefault: this.get('ctiSettingsService.settings.embedWebRTCByDefault'),
                enableCallLogs: this.get('ctiSettingsService.settings.enableCallLogs'),
                enableServerSideLogging: this.get('ctiSettingsService.settings.enableServerSideLogging'),
                enableTransferContext: this.get('ctiSettingsService.settings.enableTransferContext'),
                enableConfigurableCallerID: this.get('ctiSettingsService.settings.enableConfigurableCallerID'),
                hideCallLogContact: this.get('ctiSettingsService.settings.hideCallLogContact'),
                hideCallLogRelation: this.get('ctiSettingsService.settings.hideCallLogRelation'),
                hideCallLogSubject: this.get('ctiSettingsService.settings.hideCallLogSubject'),
                hideWebRTCPopUpOption: this.get('ctiSettingsService.settings.hideWebRTCPopUpOption'),
                embeddedInteractionWindow: this.get('ctiSettingsService.settings.embeddedInteractionWindow')
            },
            customInteractionAttributes: this.get('ctiSettingsService.screenPopAttributes'),
            name: this.get('ctiSettingsService.settings.frameworkName'),
            clientIds:{}
            
        }
        if(this.get('ctiSettingsService.settings.customTheme')){
            payload.settings.theme = {
                primary:this.get('ctiSettingsService.settings.theme.primary'),
                text: this.get('ctiSettingsService.settings.theme.text')
            };
        }

        if(this.get('ctiSettingsService.settings.advanceSSO')){
            payload.settings.sso = {
                orgName:this.get('ctiSettingsService.settings.sso.orgName'),
                provider: this.get('ctiSettingsService.settings.sso.provider')
            };
        }
        let region = this.getRegion();
        payload.clientIds[region] =this.get('ctiSettingsService.settings.clientIds.clientId')
        this.postMessageToCTI(payload);
    },
    isPhoneVisible:false,
    phoneVisibleChanged: Ember.observer('isPhoneVisible', function(){
        if(!this.get('isPhoneVisible')){
            this.set('isDetailsWindowVisible', false);
        }
    }),
    init: function(){
        this._super(...arguments);
        window.addEventListener("message", (event) => {
            let message = JSON.parse(event.data);
            if(message){
                if(message.type == 'settingsRequest'){
                   this.postSettings();
                }else if(message.type =='notificationSubscription' && message.data.category == "interactionWindow" && message.data.data.reason == 'focus'){
                    this.set('isDetailsWindowVisible', true);
                }else if(message.type =='processCallLog'){
                    if(message.data.callLog.id){
                        this.get('activityService').updateActivity(message.data.callLog, message.data.interaction).then(()=>{
                            this.postMessageToCTI({type:'processCallLogCompleted', interaction:message.data.interaction, callLogId:message.data.callLog.id});
                        });
                    }else{
                        this.get('activityService').logActivity(message.data.callLog, message.data.interaction).then((activity)=>{
                            this.postMessageToCTI({type:'processCallLogCompleted', interaction:message.data.interaction, callLogId:activity.id});
                        });
                    }
                }else if(message.type =='screenPop'){
                    this.set('isPhoneVisible', true);
                    if(message.data.interaction.attributes){
                        let screenPopAttributes = this.get('ctiSettingsService.screenPopAttributes');
                        let attributeMapping = {};
                        screenPopAttributes.forEach(element => {
                            attributeMapping[element] = message.data.interaction.attributes[element];
                        });
                        
                        if(attributeMapping.mystery_type == 'user'){
                            this.get('router').transitionTo('users.view', attributeMapping.mystery_id );
                        }else if(attributeMapping.mystery_type == 'issue'){
                            this.get('router').transitionTo('issues.view', attributeMapping.mystery_id );
                        }
                    }
                }
            }
        });
    },
    getRegion: function () {
        let region = this.get('ctiSettingsService.settings.clientIds.purecloudEnv');
        if (region) {
            let appsIndex = region.toLowerCase().indexOf('apps.');
            if (appsIndex > -1) {
                region = region.substr(appsIndex + 'apps.'.length);
            }
        }
        return region;
    },
    postMessageToCTI: function(payload){
        if(payload){
            let ctiWindow = Ember.$('#cti')[0];
            if(ctiWindow && ctiWindow.contentWindow){
                ctiWindow.contentWindow.postMessage(JSON.stringify(payload), '*');
            }
        }
    },
    placeCall: function(phoneNumber){
        this.set('isPhoneVisible', true);
        let payload ={
            type:'clickToDial',
            data: {
                number: phoneNumber,
                autoPlace: true
            }
        };
        this.postMessageToCTI(payload);
    },
    logNavigation: function(data){
        let payload ={
            type:'addAssociation',
            data: data
        };
        this.postMessageToCTI(payload);
    }
});
