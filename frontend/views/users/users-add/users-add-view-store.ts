import {makeAutoObservable} from "mobx";
import User from "Frontend/generated/pl/kskowronski/data/entity/User";

class UsersAddViewStore {

    id: number | undefined;
    name: string | undefined = "";
    userName: string | undefined = "";
    opId: number | undefined;

    display: string | undefined = "none";

    public items: User[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    dateChanged( newDate: string | undefined ) {
        this.name = newDate;
    }

    openPopUp(name: string | undefined, userName: string | undefined, opId: number | undefined, id: number | undefined){
        this.name = name;
        this.userName = userName;
        this.opId = opId;
        this.id = id;
        this.display = "block";
    }

}

export const usersAddViewStore = new UsersAddViewStore();