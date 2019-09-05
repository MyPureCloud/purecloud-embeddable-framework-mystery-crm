import Service from '@ember/service';

const localStorageKey = "MysteryCRMSettings";
export default Service.extend({
    settings: {sso:{},theme:{}, clientIds: { purecloudEnv:'mypurecloud.com'}},
    screenPopAttributes: ['mystery_type', 'mystery_id'],
    init: function(){
        this._super(...arguments);
        this.refreshSettings();
    },
    saveSettings: function(settings){
        if(settings){
            window.localStorage.setItem(localStorageKey, JSON.stringify(settings));
            this.set('settings', settings);
        }
    },
    refreshSettings: function(){
        let cachedSettingsString = window.localStorage.getItem(localStorageKey);
        if(cachedSettingsString){
            let cachedSettings = JSON.parse(cachedSettingsString);
            this.set('settings', cachedSettings);
        }
    }
});
