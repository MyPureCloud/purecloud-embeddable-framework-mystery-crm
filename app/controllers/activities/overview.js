import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    activityService: Ember.inject.service(),
    ctiService: Ember.inject.service(),
    init:function(){
        this._super(...arguments);
       this.get('activityService').getActivities().then((data)=>{
           this.set('activities', data);
       });
    },
    columnDefs: Ember.computed(function () {
        return [
            { key: 'createdDate', header: 'Date', component:'date-cell', cellClass:'center', width: '10%' },
            { key: 'direction', header: 'Direction', width: '10%' },
            { key: 'subject', header: 'Subject', component:'link-to-cell', route:'activities.view', width: '40%' },
            { key: 'delete', component:'clickable-x', cellClass:'center', header: ' ', width: '5%'}
        ];
    }),
    actions:{
        clicked: function(columnName, dataRow){
           if(columnName == 'delete') {
                this.get('activityService').removeActivity(dataRow);
            }else {
                // Pop Edit Form
            }
        }
    }
});
