import {html} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';
import {usersAddViewStore} from './users-add-view-store';
import {MobxLitElement} from "@adobe/lit-mobx";
import {UserEndpoint} from "Frontend/generated/endpoints";
import {Notification} from "@vaadin/notification";
import User from "Frontend/generated/pl/kskowronski/data/entity/User";

@customElement('users-add-view')
class UsersAddView extends MobxLitElement {

    @state()
    private user: User | undefined;

    @query('input#inName')
    private inputName!: HTMLInputElement;

    @query('input#inUserName')
    private inputUserName!: HTMLInputElement;

    @query('input#inOpId')
    private inputOpId!: HTMLInputElement;

    @query('input#inPass')
    private inputPass!: HTMLInputElement;

    async firstUpdated() {
        //Notification.show("opened")
    }

    protected render() {
        return html`
            <style>
                body {font-family: Arial, Helvetica, sans-serif;}

                /* The Modal (background) */
                .modal {
                    display: ${usersAddViewStore.display}; /* Hidden by default */
                    position: fixed; /* Stay in place */
                    z-index: 1; /* Sit on top */
                    padding-top: 100px; /* Location of the box */
                    left: 0;
                    top: 0;
                    width: 100%; /* Full width */
                    height: 100%; /* Full height */
                    overflow: auto; /* Enable scroll if needed */
                    background-color: rgb(0,0,0); /* Fallback color */
                    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
                }

                /* Modal Content */
                .modal-content {
                    background-color: #fefefe;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%;
                }

                /* The Close Button */
                .close {
                    color: #aaaaaa;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                }

                .close:hover,
                .close:focus {
                    color: #000;
                    text-decoration: none;
                    cursor: pointer;
                }
            </style>
            <div id="myModal" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close" @click=${this.close}>&times;</span>
              
                    <p>Wypełnij dane: </p>
                        <label for="inName">Nazwa użytkownika</label></br>
                        <input type="text" id="inName" value="${usersAddViewStore.name}"></br>
                        <label for="inUserName">Login</label></br>
                        <input type="text" id="inUserName" value="${usersAddViewStore.userName}"></br>
                        <label for="inOpId">OperatorId</label></br>
                        <input type="text" id="inOpId" value="${usersAddViewStore.opId}"></br>
                        <label for="inOpId">Hasło</label></br>
                        <input type="password" id="inPass"></br>
                    <p><button @click=${this._addNewUser}>Dodaj</button></p>
              
                </div>
            </div>
      `;
    }

    async _addNewUser(e: Event) {
        //Notification.show("name: " + this.inputName.value + "userName: " + this.inputUserName.value);
        this.user = {};
        if (this.user){
            this.user.id = usersAddViewStore.id;
            this.user.name = this.inputName.value;
            this.user.username = this.inputUserName.value;
            this.user.operatorId = Number(this.inputOpId.value);
            this.user.hashedPassword = this.inputPass.value;
            this.user = await UserEndpoint.addNewUser(this.user);
            if (this.user) {
                usersAddViewStore.items.push(this.user);
            }
        }

        usersAddViewStore.display = "none";

    }

    private close(e: Event) {
        usersAddViewStore.display = "none";
    }


}
