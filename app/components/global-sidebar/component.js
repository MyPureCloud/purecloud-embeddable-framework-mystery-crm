import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    navigationService: Ember.inject.service(),
    ctiService: Ember.inject.service(),
    classNames: ['sidebar'],
    actions: {
        togglePhone: function(){
            this.toggleProperty('ctiService.isPhoneVisible');
        },
        navigate: function(route){
            if(route){
                this.get('navigationService').navigate(route);
            } else {
                //promptService with message 
                //only then allow navigation
                //then only fires if they click ok
            }
        }
    }
});

