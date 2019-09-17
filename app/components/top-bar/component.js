import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    classNames: ['top-bar'],
    router: Ember.inject.service(),
    actions: {
        home: function(){
            this.get('router').transitionTo('index');
        },
        settings: function() {
            this.get('router').transitionTo('settings');
        }
    }
});
