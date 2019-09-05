import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' });
  this.route('users', { path: '/users' }, function() {
    this.route('view',  { path: '/:user_id'});
    this.route('overview', { path : '/'});
  });

  this.route('issues', { path: '/issues' }, function() {
    this.route('view',  { path: '/:issue_id'});
    this.route('overview', { path : '/'});
  });

  this.route('activities', { path: '/activities' }, function() {
    this.route('view',  { path: '/:activity_id'});
    this.route('overview', { path : '/'});
  });

  this.route('settings', { path: '/settings' });
});

export default Router;
