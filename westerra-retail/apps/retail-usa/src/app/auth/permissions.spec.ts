import * as env from '../../environments/environment';
import * as permissions from './permissions';

describe('Entitlements', () => {
  it('should have engagements service as default in notification preference', () => {
    env.environment.notificationPreferencesApiMode = 'engagements';
    const perference = permissions.setNotificationPreference('engagements');
    permissions.setNotificationPreference(env.environment.notificationPreferencesApiMode);
    expect(perference).toEqual(permissions.canViewManageNotificationsForEngagements);
    expect(permissions.PERMISSIONS.canViewManageNotifications).toEqual(
      permissions.canViewManageNotificationsForEngagements,
    );
  });

  it('should have engagements service as default in notification preference', () => {
    env.environment.notificationPreferencesApiMode = 'actions';
    const perference = permissions.setNotificationPreference('actions');
    expect(perference).toEqual(permissions.canViewManageNotificationsForActions);
  });
});
