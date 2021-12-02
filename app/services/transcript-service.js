import Service from '@ember/service';
import Ember from 'ember';

export default Service.extend({
    store: Ember.inject.service(),
    init: function(){
        this._super(...arguments);
        this.getMessages().then((data) => {
            if (data.get('length') == 0) {
                this.get('store').createRecord('message', {body: 'This is a message', time: Date.now()}).save();
            }
        });
    },
    getMessages: function (){
        return this.get('store').findAll('message');
    },
    createMessage: function(message) {
      this.get('store').createRecord('message', {body: message.body, time: message.time}).save();
    },
});
