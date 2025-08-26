import DS from 'ember-data';

export default DS.Model.extend({
    time: DS.attr('string'),
    body: DS.attr('string'),
    type: DS.attr('string'),
});
