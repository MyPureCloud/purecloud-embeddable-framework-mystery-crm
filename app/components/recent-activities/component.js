import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    classNames: ['recent-activities'],
    activityService: Ember.inject.service(),
    ctiService: Ember.inject.service(),

    init:function(){
        this._super(...arguments);
        this.get('activityService').getActivities().then((items)=>{
            this.set('activities', items.filter(item => {
                let sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                return sevenDaysAgo.getTime() < item.get('createdDate');
            }));
        });
    },
    columnDefs: Ember.computed(function () {
        return [
            { key: 'createdDate', header: 'Date', component:'date-cell', cellClass:'center', width: '20%' },
            { key: 'subject', header: 'Subject', width: '20%' },
            { key: 'direction', header: 'Direction', width: '10%' },
            { key: 'notes', header: 'Notes', width: '60%' },
        ];
    }),
    actions:{
        clicked: function(columnName, dataRow){
           if(columnName == 'delete') {
                this.get('activityService').removeActivity(dataRow);
            }else {
                // Pop Edit form
            }
        }
    }
});
