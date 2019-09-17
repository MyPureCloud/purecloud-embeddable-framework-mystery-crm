import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | users/view', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:users/view');
    assert.ok(route);
  });
});
