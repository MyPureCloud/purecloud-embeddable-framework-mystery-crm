import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    ctiSettingsService: Ember.inject.service(),
    settings: Ember.computed.alias('ctiSettingsService.settings'),
    envs: [
        { name:'Local', key:'local'},
        { name:'Private', key:'ppef'},
        { name:'Production', key:'pef'}
    ],
    classNames: ['cti-settings'],
    actions: {
        updateEnv: function(env){
            this.set('settings.env', env);
        },
        saveSettings: function(){
            this.get('ctiSettingsService').saveSettings(this.get('settings'));
            
        },
        updateIntegrationType(integrationType) {
            this.set('integrationType', integrationType);
        }
    }
});
