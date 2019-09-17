import Service from '@ember/service';
import Ember from 'ember';

export default Service.extend({
    store: Ember.inject.service(),
    getActivities: function(){
        return this.get('store').findAll('activity');
    },
    updateActivity: function(newActivity, interaction){
        newActivity.flagged = interaction.flagged;
        newActivity.queueName = interaction.queueName;
        newActivity.duration = interaction.interactionDurationSeconds;
        newActivity.campaign = interaction.dialerCampaignId;
        if(newActivity.selectedContact){
            newActivity.contactId = newActivity.selectedContact.id;
        }
        if(newActivity.selectedRelation){
            newActivity.relatedId = newActivity.selectedRelation.id;
        }
        
        return this.get('store').findRecord('activity', newActivity.id).then((activity)=>{
            for(let key in newActivity){
                if(newActivity.hasOwnProperty(key) && key !='id'){
                    let value = newActivity[key];
                    activity.set(key, value);
                }
            }
            return activity.save();
        });
    },
    logActivity: function(activity, interaction){
        activity.createdDate = Date.now();
        activity.direction = interaction.direction;
        activity.interactionId = interaction.id;
        return this.get('store').createRecord('activity', activity).save();
    },
    removeActivity: function(activity){
        activity.destroyRecord();
    }
});
