import '@vaadin/app-layout';
import { AppLayout } from '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/avatar/vaadin-avatar';
import '@vaadin/context-menu';
import '@vaadin/tabs';
import '@vaadin/tabs/vaadin-tab';
import { html, render } from 'lit';
import { customElement } from 'lit/decorators.js';
import { logout } from '../auth';
import { router } from '../index';
import { hasAccess, views } from '../routes';
import { appStore } from '../stores/app-store';
import { Layout } from './view';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

@customElement('main-layout')
export class MainLayout extends Layout {
  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <header class="view-header" slot="navbar">
          <vaadin-drawer-toggle aria-label="Menu toggle" class="view-toggle" theme="contrast"></vaadin-drawer-toggle>
          <h1 class="view-title">${appStore.currentViewTitle}</h1>
        </header>
        <section class="drawer-section" slot="drawer">
          <h2 class="app-name">${appStore.applicationName}</h2>
          <nav aria-labelledby="views-title" class="menu-item-container">
            <ul class="navigation-list">
              ${this.getMenuRoutes().map(
                (viewRoute) => html`
                  <li>
                    <a
                      ?highlight=${viewRoute.path == appStore.location}
                      class="menu-item-link"
                      href=${router.urlForPath(viewRoute.path)}
                    >
                      <span class="${viewRoute.icon} menu-item-icon"></span>
                      <span class="menu-item-text">${viewRoute.title}</span>
                    </a>
                  </li>
                `
              )}
            </ul>
          </nav>
          <footer class="footer">
            ${appStore.user
              ? html` <vaadin-context-menu open-on="click" .renderer="${this.renderLogoutOptions}">
                  <vaadin-avatar
                    theme="xsmall"
                    img="${appStore.user.profilePictureUrl}"
                    name="${appStore.user.name}"
                  ></vaadin-avatar>
                  <span class="font-medium ms-xs text-s text-secondary">${appStore.user.name}</span>
                </vaadin-context-menu>`
              : html`<a router-ignore href="login">Sign in</a>`}
          </footer>
        </section>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('block', 'h-full');
    this.reaction(
      () => appStore.location,
      () => {
        AppLayout.dispatchCloseOverlayDrawerEvent();
      }
    );
  }

  private renderLogoutOptions(root: HTMLElement) {
    render(html`<vaadin-list-box><vaadin-item @click=${() => logout()}>Logout</vaadin-item></vaadin-list-box>`, root);
  }

  private getMenuRoutes(): RouteInfo[] {
    return views.filter((route) => route.title).filter((route) => hasAccess(route)) as RouteInfo[];
  }
}
