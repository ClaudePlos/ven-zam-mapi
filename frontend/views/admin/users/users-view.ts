import '@vaadin/button';
import '@vaadin/notification';
import '@vaadin/text-field';
import '@vaadin/text-field';
import { html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { View } from '../../view';
import User from "Frontend/generated/pl/kskowronski/data/entity/User";
import {UserEndpoint} from "Frontend/generated/endpoints";
import "./users-add/users-add-view"
import "./kk-user/kk-user-view"
import {usersAddViewStore} from "Frontend/views/admin/users/users-add/users-add-view-store";
import {kkUserViewStore} from "Frontend/views/admin/users/kk-user/kk-user-view-store";

@customElement('users-view')
export class UsersView extends View {


    async firstUpdated() {
        const users = await UserEndpoint.findAll();
        usersAddViewStore.items = users;
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
            cursor: pointer;
        }

        .userTable {
            margin: 10px;
        }

        
        
    </style>
    <div class="userTable">
      <table>
          <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Operatorid</th>
              <th></th>
          </tr>
          ${usersAddViewStore.items.map((item) =>
                  html`<tr @click=${(e: Event) => this.openKKDialog(item.id, item.username)}>
                        <td>${item.username}</td>
                        <td>${item.name}</td>
                        <td>${item.operatorId}</td>
                        <td>
                            <button @click=${(e: Event) => this.addNewUser(item.id, item.name, item.username, item.operatorId)}>Update</button>
                            <button @click=${(e: Event) => this.deleteUser(item.id)}>Delete</button>
                        </td>
                      </tr>`
          )}
      </table>
      <button @click=${(e: Event) => this.addNewUser(undefined, "", "", undefined )}>New</button>
        <br>
     <users-add-view></users-add-view>
     <kk-user-view></kk-user-view>
    </div>
    `;
    }

    addNewUser(id: number | undefined, name: string | undefined, userName: string | undefined, opId: number | undefined) {
       // Notification.show("ret:" + id + " " + userName);
        usersAddViewStore.openPopUp(name, userName, opId, id);
    }

    async deleteUser(id: number | undefined) {
      const ret = await UserEndpoint.deleteUser(id);
      if ( ret === "OK" ){
          const index = usersAddViewStore.items.findIndex( obj => obj.id === id);
          usersAddViewStore.items.splice(index);
      }
    }

    openKKDialog(userId: number | undefined, username: string | undefined){
        kkUserViewStore.dateChanged(userId, username);
    }


}
