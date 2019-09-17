import Service from '@ember/service';
import Ember from 'ember';

export default Service.extend({
    store: Ember.inject.service(),
    init: function(){
        this._super(...arguments);
        this.getIssues().then((data)=>{
            if(data.get('length') == 0){
                this.get('store').createRecord('issue', {title:'Uncle Stuart is missing!', description:'Sharons Uncle Stuart disappears, and when they find him, he says he was beckoned by the voice of the Ghost of Elias Kingston from the Kingston Mansion. The gang find themselves wrapped up in the tangle of the spooky ghoul of Elias Kingston who wants the family treasure', createdDate: Date.now(), status: 'Open'}).save();
                this.get('store').createRecord('issue', {title:'Haunted Air Filed', description:'A mysterious aircraft appears and lands behind some trees, and out of it comes a mysterious ghost which releases a maniacal laugh.', createdDate: Date.now(), status: 'Open'}).save();
                this.get('store').createRecord('issue', {title:'When does the theme park open?', description:'I anticipate the opening of a theme park while clam collecting on a nearby beach. But when the theme parks lights come on and the rides start running, when the park is supposed to be closed, I investigated it but was ran off by a strange man who looks like a walking torpedo.', createdDate: Date.now(), status: 'Open'}).save();
                this.get('store').createRecord('issue', {title:'Lost in a desert gold mine: Help!', description:'I was exploring the desert when I came across an abandon gold mine. I looked inside but quickly got turned around. Now idk if I’m hallucinating but I think I am using a ghastly miner. ……. HELP!', createdDate: Date.now(), status: 'Open'}).save();
            }
        });
    },
    getIssues: function(){
        return this.get('store').findAll('issue');
    },
    removeIssue: function(issue){
        issue.destroyRecord();
    },
    createIssue: function(issue){
        issue.createdDate = Date.now();
        issue.status = "Open";
        this.get('store').createRecord('issue', issue).save();
    }
});
