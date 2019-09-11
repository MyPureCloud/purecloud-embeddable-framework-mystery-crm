import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    findAll: function(){
        return new Ember.RSVP.Promise(function (resolve) {
            let data = JSON.parse(window.localStorage.getItem('activities'));
            if(!data || data == "") {
                data = {activities:[]};
            }
            resolve(data);
        });   
    },
    updateRecord: function(store, type, snapshot){
        let currentActivities = JSON.parse(window.localStorage.getItem('activities'));
        let record = store.serializerFor(type.modelName).serialize(snapshot);
        record.id = snapshot.record.id;
        if(currentActivities && currentActivities.activities){
            for(let i=0; i < currentActivities.activities.length; i++){
                if(currentActivities.activities[i].id == snapshot.record.id){
                    currentActivities.activities[i] = record;
                    break;
                }
            }
            window.localStorage.setItem('activities', JSON.stringify(currentActivities));
        }
        return this.findAll();
    },
    createRecord: function(store, type, snapshot){
        let record = this.serialize(snapshot);
        record.id = '' + Date.now()+ Math.floor((Math.random() * 100) + 1);
        return new Ember.RSVP.Promise(function (resolve) {
            let data = JSON.parse(window.localStorage.getItem('activities'));
            if(!data || data == "") {
                data = {activities:[]};
            }
            data.activities.push(record);
            window.localStorage.setItem('activities', JSON.stringify(data));
            resolve({activity:record});
        });  
    },
    deleteRecord: function(store, type, snapshot){
        let currentActivities = JSON.parse(window.localStorage.getItem('activities'));
        if(currentActivities && currentActivities.activities){
            for(let i=0; i < currentActivities.activities.length; i++){
                if(currentActivities.activities[i].id == snapshot.id){
                    currentActivities.activities.removeObject(currentActivities.activities[i]);
                    break;
                }
            }
            window.localStorage.setItem('activities', JSON.stringify(currentActivities));
        }
        return this.findAll();
    },
    findRecord: function(store, type, id){
        return new Ember.RSVP.Promise(function (resolve) {
            let currentActivities = JSON.parse(window.localStorage.getItem('activities'));
            if(currentActivities && currentActivities.activities){
                for(let i=0; i < currentActivities.activities.length; i++){
                    if(currentActivities.activities[i].id == id){
                        resolve({activity:currentActivities.activities[i]});
                        break;
                    }
                }
            }
        });
    }
    
});
