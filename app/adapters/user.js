import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    findAll: function(){
        return new Ember.RSVP.Promise(function (resolve) {
            let data = JSON.parse(window.localStorage.getItem('users'));
            if(!data || data == "") {
                data = {users:[]};
            }
            resolve(data);
        });   
    },
    createRecord: function(store, type, snapshot){
        let record = this.serialize(snapshot);
        record.id = '' + Date.now()+ Math.floor((Math.random() * 100) + 1);
        return new Ember.RSVP.Promise(function (resolve) {
            let data = JSON.parse(window.localStorage.getItem('users'));
            if(!data || data == "") {
                data = {users:[]};
            }
            data.users.push(record);
            window.localStorage.setItem('users', JSON.stringify(data));
            resolve({user:record});
        });  
    },
    deleteRecord: function(store, type, snapshot){
        let currentUsers = JSON.parse(window.localStorage.getItem('users'));
        if(currentUsers && currentUsers.users){
            for(let i=0; i < currentUsers.users.length; i++){
                if(currentUsers.users[i].id == snapshot.id){
                    currentUsers.users.removeObject(currentUsers.users[i]);
                    break;
                }
            }
            window.localStorage.setItem('users', JSON.stringify(currentUsers));
        }
        return this.findAll();
    },
    findRecord: function(store, type, id){
        return new Ember.RSVP.Promise(function (resolve) {
            let currentUsers = JSON.parse(window.localStorage.getItem('users'));
            if(currentUsers && currentUsers.users){
                for(let i=0; i < currentUsers.users.length; i++){
                    if(currentUsers.users[i].id == id){
                        resolve({user:currentUsers.users[i]});
                        break;
                    }
                }
            }
        });
    }
});
