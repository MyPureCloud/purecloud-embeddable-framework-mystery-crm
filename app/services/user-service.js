import Service from '@ember/service';
import Ember from 'ember';

export default Service.extend({
    store: Ember.inject.service(),
    init: function(){
        this._super(...arguments);
        this.getUsers().then((data)=>{
            if(data.get('length') == 0){
                this.get('store').createRecord('user', {firstName:"Samson", lastName:"Blackstone", createdDate: Date.now(), address: "Blackstone's Circus", phoneNumber:"317-555-1234", company:"Blackstone's circus", email: "s.blackstone@circus.com"}).save();
                this.get('store').createRecord('user', {firstName:"Miner", lastName:"Forty-Niner", createdDate: Date.now(), address: "Gold City Guest Ranch", phoneNumber:"317-555-9831", company:"Gold City Guest Ranch", email: "miner.49@goldcityranch.com"}).save();
                this.get('store').createRecord('user', {firstName:"Zeb", lastName:"Perkins", createdDate: Date.now(), address: "Riverboat Swamp", phoneNumber:"317-555-0113", company:"Sunken Riverboat", email: "zeb.perkins@sunkenriverboad.com"}).save();
                this.get('store').createRecord('user', {firstName:"Henry", lastName:"Bascomb", createdDate: Date.now(), address: "Area 57 Navada", phoneNumber:"317-555-0115", company:"The Goverment", email: "henry.bascomb@goverment.gov"}).save();
            }
        });
    },
    getUsers: function(){
        return this.get('store').findAll('user');
    },
    removeUser: function(user){
        user.destroyRecord();
    },
    createUser: function(user){
        user.createdDate = Date.now();
        this.get('store').createRecord('user', user).save();
    }
});
