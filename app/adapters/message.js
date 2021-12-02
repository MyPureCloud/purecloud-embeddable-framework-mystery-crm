import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    findAll: function(){
        return new Ember.RSVP.Promise(function (resolve) {
            let data = JSON.parse(window.localStorage.getItem('messages'));
            if(!data || data == "") {
                data = {messages:[]};
            }

            resolve(data);
        });
    },
    updateRecord: function(store, type, snapshot){
        let currentMessages = JSON.parse(window.localStorage.getItem('messages'));
        let record = store.serializerFor(type.modelName).serialize(snapshot);
        record.id = snapshot.record.id;
        if(currentMessages && currentMessages.messages){
            for(let i=0; i < currentMessages.messages.length; i++){
                if(currentMessages.messages[i].id == snapshot.record.id){
                    currentMessages.messages[i] = record;
                    break;
                }
            }
            window.localStorage.setItem('messages', JSON.stringify(currentMessages));
        }
        return this.findAll();
    },
    createRecord: function(store, type, snapshot){
        let record = this.serialize(snapshot);
        record.id = '' + Date.now()+ Math.floor((Math.random() * 100) + 1);
        return new Ember.RSVP.Promise(function (resolve) {
            let data = JSON.parse(window.localStorage.getItem('messages'));
            if(!data || data == "") {
                data = {messages:[]};
            }
            data.messages.push(record);
            window.localStorage.setItem('messages', JSON.stringify(data));
            resolve({message:record});
        });
    },
    deleteRecord: function(store, type, snapshot){
        let currentMessages = JSON.parse(window.localStorage.getItem('messages'));
        if(currentMessages && currentMessages.messages){
            for(let i=0; i < currentMessages.messages.length; i++){
                if(currentMessages.messages[i].id == snapshot.id){
                    currentMessages.messages.removeObject(currentMessages.messages[i]);
                    break;
                }
            }
            window.localStorage.setItem('messages', JSON.stringify(currentMessages));
        }
        return this.findAll();
    },
    findRecord: function(store, type, id){
        return new Ember.RSVP.Promise(function (resolve) {
            let currentMessages = JSON.parse(window.localStorage.getItem('messages'));
            if(currentMessages && currentMessages.messages){
                for(let i=0; i < currentMessages.messages.length; i++){
                    if(currentMessages.messages[i].id == id){
                        resolve({message:currentMessages.messages[i]});
                        break;
                    }
                }
            }
        });
    }
});
