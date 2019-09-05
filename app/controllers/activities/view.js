import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    store: Ember.inject.service(),
    date: Ember.computed('model', function(){
        let createdDate = this.get('model.createdDate');
        return new Date(createdDate - 60000).toLocaleString('en-US');
    }),
    relatedContact: Ember.computed('model.contactId', function(){
        let id = this.get('model.contactId');
        if(id){
            return this.get('store').findRecord('user', id);
        }
    }),
    relatedIssue: Ember.computed('model.relatedId', function(){
        let id = this.get('model.relatedId');
        if(id){
            return this.get('store').findRecord('issue', id);
        }
    })
});
