import DS from 'ember-data';

export default DS.Model.extend({
    subject: DS.attr('string'),
    createdDate: DS.attr('string'),
    direction: DS.attr('string'),
    notes: DS.attr('string', {defaultValue: ''}),
    interactionId: DS.attr('string'),
    flagged: DS.attr('string', {defaultValue: 'false'}),
    queueName: DS.attr('string'),
    duration: DS.attr('string', {defaultValue: '0'}),
    campaign: DS.attr('string'),
    relatedId: DS.attr('string'),
    contactId: DS.attr('string')
});
