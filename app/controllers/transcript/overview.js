import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    transcriptService: Ember.inject.service(),
    ctiService: Ember.inject.service(),
    savedMessages: [],
    maxMessages: 5,
    initialSet: false,
    init: function () {
        this._super(...arguments);

        this.get('transcriptService').getMessages()
            .then((data) => {
                this.messages = data;
            });

        window.addEventListener('message', (event) => {
          const data = JSON.parse(event.data);

          if (data.type === 'chatUpdate') {
              this.handleMessages(data.data, 'chat');
          }
      });
    },
    handleMessages(newMessages, type) {
        // If multiple messages already exist, ie refreshing in the middle of a chat, send most recent
        if (!this.initialSet && newMessages.length > 1) {
            newMessages.filter((m) => m.role === 'customer').forEach((el) => {
                el.type = type;
                this.create(el);
            });
        } else {
            // Just send the most recent message
            const last = newMessages[newMessages.length - 1];

            if (last.role === 'customer') {
                last.type = type;
                this.create(last);
            }
        }

        if (!this.initialSet) {
            this.initialSet = true;
        }
    },
    create(message) {
        if (!this.savedMessages.find((m) => m.body === message.body && m.type === message.type)) {
            this.savedMessages.push(message);
            this.get('transcriptService').createMessage(message);
        }
    },
});
