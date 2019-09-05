import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    issueService: Ember.inject.service(),
    ctiService: Ember.inject.service(),
    newIssue:{},
    init:function(){
        this._super(...arguments);
        this.get('issueService').getIssues().then((data)=>{
            this.set('issues', data);
        });
    },
    columnDefs: Ember.computed(function () {
        return [
            { key: 'createdDate', header: 'Date', component:'date-cell', cellClass:'center', width: '20%' },
            { key: 'title', header: 'Title', component:'link-to-cell', route:'issues.view', width: '20%' },
            { key: 'status', header: 'Status', width: '20%' },
            { key: 'delete', component:'clickable-x', cellClass:'center', header: ' ', width: '5%'}
        ];
    }),
    actions:{
        openAddIssue: function(){
            this.toggleProperty('formOpen');
        },
        addIssue: function(){
            this.get('issueService').createIssue(this.get('newIssue'));
            this.set('newIssue', {});
        },
        clicked: function(columnName, dataRow){
           if(columnName == 'delete') {
                this.get('issueService').removeIssue(dataRow);
            }else {
                // Pop Edit Form
            }
        }
    }
});
