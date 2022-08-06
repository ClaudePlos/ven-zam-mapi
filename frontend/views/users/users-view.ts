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
import {Notification} from "@vaadin/notification";
import "./users-add/users-add-view"
import {usersAddViewStore} from "Frontend/views/users/users-add/users-add-view-store";

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
    <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #dddddd;
        }
    </style>
      <table>
          <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Operatorid</th>
              <th>.</th>
          </tr>
          ${this.items.map((item) =>
                  html`<tr>
                        <td>${item.username}</td>
                        <td>${item.name}</td>
                        <td>${item.operatorId}</td>
                        <td><button @click=${(e: Event) => this.addToDo(item.id, item.username)}>Update</button></td>
                      </tr>`
          )}
      </table>
      <ul>
          <!-- TODO: Render list items. -->
          ${this.items.map((item) =>
                  html`<li>${item.username}</li>`
          )}
      </ul>
    <users-add-view></users-add-view>
    `;
    }

    addToDo(id: number | undefined, userName: string | undefined) {
        Notification.show("ret:" + id + " " + userName);
        usersAddViewStore.openPopUp(userName);
    }


}
