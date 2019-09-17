import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | issues/overview', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:issues/overview');
    assert.ok(route);
  });
});
