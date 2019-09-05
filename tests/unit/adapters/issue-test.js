import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | issue', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:issue');
    assert.ok(adapter);
  });
});
