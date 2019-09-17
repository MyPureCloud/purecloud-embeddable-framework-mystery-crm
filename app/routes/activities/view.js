import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
    store: Ember.inject.service(),
    ctiService: Ember.inject.service(),
    model(params) {
        return this.get('store').findRecord('activity',params.activity_id).then((activity)=>{
            return activity;
        });
    }
});
