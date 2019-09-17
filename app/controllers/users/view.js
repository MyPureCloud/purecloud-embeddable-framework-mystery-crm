import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    name: Ember.computed('model', function(){
        return this.get('model.firstName') + ' ' + this.get('model.lastName');
    }),
    memberSince: Ember.computed('model', function(){
        let createdDate = this.get('model.createdDate');
        return new Date(createdDate - 60000).toLocaleString('en-US');
    })
});
