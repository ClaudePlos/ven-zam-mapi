import { RouterLocation } from '@vaadin/router';
import User from 'Frontend/generated/pl/kskowronski/data/entity/User';
import Role from 'Frontend/generated/pl/kskowronski/data/Role';
import { UserEndpoint } from 'Frontend/generated/endpoints';
import { makeAutoObservable } from 'mobx';

export class AppStore {
  applicationName = 'ven-zam-mapi';

  // The location, relative to the base path, e.g. "hello" when viewing "/hello"
  location = '';

  currentViewTitle = '';

  user: User | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setLocation(location: RouterLocation) {
    const serverSideRoute = location.route?.path == '(.*)';
    if (location.route && !serverSideRoute) {
      this.location = location.route.path;
    } else if (location.pathname.startsWith(location.baseUrl)) {
      this.location = location.pathname.substr(location.baseUrl.length);
    } else {
      this.location = location.pathname;
    }
    if (serverSideRoute) {
      this.currentViewTitle = document.title; // Title set by server
    } else {
      this.currentViewTitle = (location?.route as any)?.title || '';
    }
  }

  async fetchUserInfo() {
    this.user = await UserEndpoint.getAuthenticatedUser();
  }

  clearUserInfo() {
    this.user = undefined;
  }

  get loggedIn() {
    return !!this.user;
  }

  isUserInRole(role: Role) {
    return this.user?.roles?.includes(role);
  }

  public fixPolishLetter( text: String | undefined ){
    // @ts-ignore
    return text.replace("Ł",'L').replace("Ś","S").toUpperCase()
  }
}
export const appStore = new AppStore();
