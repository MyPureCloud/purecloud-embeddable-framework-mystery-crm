import Ember from 'ember';

export default Ember.Helper.extend({
    intl: Ember.inject.service(),
    compute(params, namedArgs) {
        let translationKey = params[0];
        if (params.length > 1) {
            translationKey += `.${params[1]}`;
            if (!this.get('intl').exists(translationKey)) {
                translationKey = params[0] + `.${params[1].camelize()}`;
                if (!this.get('intl').exists(translationKey) && params.length > 2) {
                    return this.get('intl').t(params[2], namedArgs);
                }
            }
        }
        return this.get('intl').t(translationKey, namedArgs);

    },
    languageChanged: Ember.observer('intl.locale', function() {
        this.recompute();
    })
});
