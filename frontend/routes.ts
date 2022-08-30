import {Route} from '@vaadin/router';
import Role from './generated/pl/kskowronski/data/Role';
import {appStore} from './stores/app-store';
import './views/helloworld/hello-world-view';
import './views/feed/feed-view';
import './views/main-layout';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  requiresLogin?: boolean;
  rolesAllowed?: Role[];
  children?: ViewRoute[];
};

export const hasAccess = (route: Route) => {
  const viewRoute = route as ViewRoute;
  if (viewRoute.requiresLogin && !appStore.loggedIn) {
    return false;
  }

  if (viewRoute.rolesAllowed) {
    return viewRoute.rolesAllowed.some((role) => appStore.isUserInRole(role));
  }
  return true;
};

// @ts-ignore
export const views: ViewRoute[] = [
  // place routes below (more info https://hilla.dev/docs/routing)
  {
    path: '',
    component: 'feed-view',
    requiresLogin: true,
    icon: '',
    title: '',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      return;
    },
  },
  {
    path: 'feed',
    component: 'feed-view',
    requiresLogin: true,
    icon: 'la la-star',
    title: 'Stan żywionych na dzień',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      return;
    },
  },
  {
    path: 'users',
    component: 'users-view',
    requiresLogin: true,
    icon: 'la la-qq',
    title: 'Użytkownicy',
    rolesAllowed: [Role.ADMIN],
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/admin/users/users-view');
      return;
    },
  },
  {
    path: 'zam-blockade-hours',
    component: 'zam-blockade-hours-view',
    requiresLogin: true,
    icon: 'la la-circle',
    title: 'KK blokada godzin zam.',
    rolesAllowed: [Role.ADMIN],
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/admin/zam-blockade-hours/zam-blockade-hours-view');
      return;
    },
  },
  {
    path: 'about',
    component: 'about-view',
    requiresLogin: true,
    icon: 'la la-file',
    title: 'About',
    action: async (_context, _command) => {
      if (!hasAccess(_context.route)) {
        return _command.redirect('login');
      }
      await import('./views/about/about-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: 'login',
    component: 'login-view',
    requiresLogin: true,
    icon: '',
    title: 'Login',
    action: async (_context, _command) => {
      await import('./views/login/login-view');
      return;
    },
  },

  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
