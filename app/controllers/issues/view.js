import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    date: Ember.computed('model', function(){
        let createdDate = this.get('model.createdDate');
        return new Date(createdDate - 60000).toLocaleString('en-US');
    }),
    isOpen: Ember.computed('model', function(){
        return this.get('model.status') == 'Open';
    }),
    actions: {
        completeIssue: function(){
            let issue = this.get('model');
            issue.set('status', 'Completed');
            issue.save();
        }
    }
});
