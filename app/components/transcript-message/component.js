import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    formattedTime: Ember.computed('message', function () {
        const date = new Date(this.get('message.time'));

        return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}:${date.getSeconds()}`;
    }),
})
.reopenClass({
  positionalParams: ['message'],
});
