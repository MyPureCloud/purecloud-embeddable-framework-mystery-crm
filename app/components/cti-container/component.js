import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    classNames: ['cti-container'],
    ctiService: Ember.inject.service(),
    ctiURL: Ember.computed.alias('ctiService.phoneURL'),
    isPhoneVisible: Ember.computed.alias('ctiService.isPhoneVisible'),
    detailWindowURL: Ember.computed.alias('ctiService.detailsWindowURL'),
    embedDetailsWindow: Ember.computed.alias('ctiService.embedDetailsWindow'),
    isDetailsWindowVisible: Ember.computed.alias('ctiService.isDetailsWindowVisible'),
    actions: {
        closeDetailWindow: function(){
            this.set('isDetailsWindowVisible', false);
        }
    }
});
