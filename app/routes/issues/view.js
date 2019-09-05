import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
    store: Ember.inject.service(),
    ctiService: Ember.inject.service(),
    model(params) {
        return this.get('store').findRecord('issue',params.issue_id).then((issue)=>{
            let ctiService = this.get('ctiService');
            ctiService.logNavigation({type:'relation', id:issue.get('id'), text: issue.get('title')});
            return issue;
        });
    }
});
