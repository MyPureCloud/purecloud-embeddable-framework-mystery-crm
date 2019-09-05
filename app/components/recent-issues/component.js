import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
    classNames: ['recent-issues'],
    issueService: Ember.inject.service(),
    ctiService: Ember.inject.service(),
    init:function(){
        this._super(...arguments);
        this.get('issueService').getIssues().then((items)=>{
            this.set('issues', items.filter(item => {
                let sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                return sevenDaysAgo.getTime() < item.get('createdDate');
            }));
        });
    },
    columnDefs: Ember.computed(function () {
        return [
            { key: 'createdDate', header: 'Date', component:'date-cell', cellClass:'center', width: '20%' },
            { key: 'title', header: 'Title', width: '20%' },
            { key: 'status', header: 'Status', width: '20%' }
        ];
    })
});
