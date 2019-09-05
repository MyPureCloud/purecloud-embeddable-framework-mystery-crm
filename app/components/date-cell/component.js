import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    text: Ember.computed('dataRow', function() {
        let epoch = this.get('dataRow.'+this.get('columnDef.key'));
        let date = new Date(epoch-60000);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleString('en-US',  options);
    }),
    actions:{
        clicked: function (){
            this.bubbleAction('clicked', this.get('columnDef.key'), this.get('dataRow'), this.get('text'));
        }
    }
});
