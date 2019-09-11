import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    findAll: function(){
        return new Ember.RSVP.Promise(function (resolve) {
            let data = JSON.parse(window.localStorage.getItem('issues'));
            if(!data || data == "") {
                data = {issues:[]};
            }
            resolve(data);
        });   
    },
    updateRecord: function(store, type, snapshot){
        let currentIssues = JSON.parse(window.localStorage.getItem('issues'));
        let record = store.serializerFor(type.modelName).serialize(snapshot);
        record.id = snapshot.record.id;
        if(currentIssues && currentIssues.issues){
            for(let i=0; i < currentIssues.issues.length; i++){
                if(currentIssues.issues[i].id == snapshot.record.id){
                    currentIssues.issues[i] = record;
                    break;
                }
            }
            window.localStorage.setItem('issues', JSON.stringify(currentIssues));
        }
        return this.findAll();
    },
    createRecord: function(store, type, snapshot){
        let record = this.serialize(snapshot);
        record.id = '' + Date.now()+ Math.floor((Math.random() * 100) + 1);
        return new Ember.RSVP.Promise(function (resolve) {
            let data = JSON.parse(window.localStorage.getItem('issues'));
            if(!data || data == "") {
                data = {issues:[]};
            }
            data.issues.push(record);
            window.localStorage.setItem('issues', JSON.stringify(data));
            resolve({issue:record});
        });  
    },
    deleteRecord: function(store, type, snapshot){
        let currentIssues = JSON.parse(window.localStorage.getItem('issues'));
        if(currentIssues && currentIssues.issues){
            for(let i=0; i < currentIssues.issues.length; i++){
                if(currentIssues.issues[i].id == snapshot.id){
                    currentIssues.issues.removeObject(currentIssues.issues[i]);
                    break;
                }
            }
            window.localStorage.setItem('issues', JSON.stringify(currentIssues));
        }
        return this.findAll();
    },
    findRecord: function(store, type, id){
        return new Ember.RSVP.Promise(function (resolve) {
            let currentIssues = JSON.parse(window.localStorage.getItem('issues'));
            if(currentIssues && currentIssues.issues){
                for(let i=0; i < currentIssues.issues.length; i++){
                    if(currentIssues.issues[i].id == id){
                        resolve({issue:currentIssues.issues[i]});
                        break;
                    }
                }
            }
        });
    }
    
});
