import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    text: Ember.computed('dataRow', function() {
        return this.get('dataRow.'+this.get('columnDef.key'));
    }),
    actions:{
        clicked: function (){
            this.bubbleAction('clicked', this.get('columnDef.key'), this.get('dataRow'), this.get('text'));
        }
    }
});
