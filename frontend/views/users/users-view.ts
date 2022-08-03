import '@vaadin/button';
import '@vaadin/notification';
import '@vaadin/text-field';
import '@vaadin/crud';
import type { Crud, CrudNewEvent } from '@vaadin/crud';
import '@vaadin/text-field';
import { html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { View } from '../../views/view';
import User from "Frontend/generated/pl/kskowronski/data/entity/User";
import {UserEndpoint} from "Frontend/generated/endpoints";

@customElement('users-view')
export class UsersView extends View {

    // protected createRenderRoot() {
    //     const root = super.createRenderRoot();
    //     // Apply custom theme (only supported if your app uses one)
    //     applyTheme(root);
    //     return root;
    // }

    @query('vaadin-crud')
    private crud!: Crud<Partial<User>>;

    @state()
    private items: User[] = [];

    async firstUpdated() {
        const users = await UserEndpoint.findAll();
        this.items = users;
    }

    render() {
        return html`
      <vaadin-crud
        include="username, name, operatorId, hashedPassword"
        .items="${this.items}"
        @new="${this.handleNewItem}"
      ></vaadin-crud>
    `;
    }

    handleNewItem(e: CrudNewEvent) {
        // Cancel event to allow setting a custom item instance
        e.preventDefault();
        this.crud.editedItem = {
            name: '@vaadin.com',
            username: 'Developer',
        };
    }

}
