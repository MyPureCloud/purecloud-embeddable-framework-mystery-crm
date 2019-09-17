import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | issues/view', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:issues/view');
    assert.ok(controller);
  });
});
