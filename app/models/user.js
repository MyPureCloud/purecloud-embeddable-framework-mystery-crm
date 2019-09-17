import DS from 'ember-data';

export default DS.Model.extend({
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    createdDate: DS.attr('string'),
    phoneNumber: DS.attr('string'),
    address: DS.attr('string'),
    email: DS.attr('string'),
    company: DS.attr('string')
});
