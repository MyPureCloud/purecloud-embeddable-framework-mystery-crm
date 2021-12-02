import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    transcriptService: Ember.inject.service(),
    ctiService: Ember.inject.service(),
    test: 'yes',
    maxMessages: 5,
    initialSet: false,
    init: function () {
        this._super(...arguments);

        this.get('transcriptService').getMessages()
            .then((data) => {
                this.set('messages', data);
            });

        window.addEventListener('message', (event) => {
          const data = JSON.parse(event.data);

          if (data.type === 'chatUpdate') {
              this.handleMessages(data.data);
          }
      });
    },
    handleMessages(newMessages) {
      // If multiple messages already exist, ie refreshing in the middle of a chat, send most recent
      if (!this.initialSet && newMessages.length > 1) {
          this.manage(newMessages.filter((m) => m.role === 'customer'));
      } else {
          // Just send the most recent message
          if (newMessages[newMessages.length - 1].role === 'customer') {
              this.manage(newMessages[newMessages.length - 1]);
          }
      }
    },
    manage(message) {
        // Manage multiple messages
        if (Array.isArray(message)) {
            message.forEach((el) => {
                this.get('transcriptService').createMessage(el);
            });
        } else {
            // Manage one message
            this.get('transcriptService').createMessage(message);
        }

        if (!this.initialSet) {
            this.initialSet = true;
        }
    },
});
