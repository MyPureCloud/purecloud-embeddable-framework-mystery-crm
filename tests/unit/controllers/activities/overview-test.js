import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | activities/overview', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:activities/overview');
    assert.ok(controller);
  });
});
