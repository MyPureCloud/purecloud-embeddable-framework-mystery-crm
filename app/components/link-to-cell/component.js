import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    route: Ember.computed.alias('columnDef.route'),
    text: Ember.computed('dataRow', function() {
        return this.get('dataRow.'+this.get('columnDef.key'));
    }),
    cellId: Ember.computed.alias('dataRow.id')
});
