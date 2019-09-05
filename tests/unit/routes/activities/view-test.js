import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | activities/view', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:activities/view');
    assert.ok(route);
  });
});
