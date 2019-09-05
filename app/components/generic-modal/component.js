import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    classNames: ['generic-modal'],
    openMonitor: Ember.observer('open', function(){
        if(this.get('open')){
            this.set('showModal', true);
        }else {
            Ember.run.debounce(this, this.hideContent, 200);
        }
    }),
    hideContent: function(){
        if(!this.get('open')){
            this.set('showModal', false);
        }
    },
    actions: {
        close: function(){
            this.set('open', false);
        },
        save: function(){
            this.trigger('submit');
            this.set('open', false);
        }
    }
});
