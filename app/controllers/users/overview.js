import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    userService: Ember.inject.service(),
    ctiService: Ember.inject.service(),
    newUser:{},
    init:function(){
        this._super(...arguments);
       this.get('userService').getUsers().then((data)=>{
           this.set('contacts', data);
       });
    },
    columnDefs: Ember.computed(function () {
        return [
            { key: 'firstName', component:'link-to-cell', route:'users.view', header: 'First Name', width: '20%' },
            { key: 'lastName', component:'link-to-cell',route:'users.view', header: 'Last Name', width: '20%' },
            { key: 'company', header: 'Company', width: '20%' },
            { key: 'phoneNumber', header: 'Phone', component:'clickable-text', cellClass:'center', width: '20%' },
            { key: 'email', header: 'Email', width: '20%' },
            { key: 'delete', component:'clickable-x', cellClass:'center', header: ' ', width: '5%'}
        ];
    }),
    actions:{
        openAddContact: function(){
            this.toggleProperty('formOpen');
        },
        addContact: function(){
            this.get('userService').createUser(this.get('newUser'));
            this.set('newUser', {});
        },
        clicked: function(columnName, dataRow){
            if(columnName == 'phoneNumber'){
                this.get('ctiService').placeCall(dataRow.get('phoneNumber'));
            }else if(columnName == 'delete') {
                this.get('userService').removeUser(dataRow);
            }else {
                // Pop Edit Form
            }
        }
    }
});
