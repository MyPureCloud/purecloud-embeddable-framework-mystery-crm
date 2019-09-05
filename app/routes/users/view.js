import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
    store: Ember.inject.service(),
    ctiService: Ember.inject.service(),
    model(params) {
        return this.get('store').findRecord('user',params.user_id).then((user)=>{
            let ctiService = this.get('ctiService');
            ctiService.logNavigation({type:'contact', id:user.get('id'), text: user.get('firstName')+ ' ' + user.get('lastName')});
            return user;
        });
    }
});
