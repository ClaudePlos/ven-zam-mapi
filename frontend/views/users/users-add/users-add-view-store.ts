import {makeAutoObservable} from "mobx";

class UsersAddViewStore {

    name: string | undefined = "";
    display: string | undefined = "none";

    constructor() {
        makeAutoObservable(this);
    }

    dateChanged( newDate: string | undefined ) {
        this.name = newDate;
    }

    openPopUp(name: string | undefined){
        this.name = name;
        this.display = "block";
    }

}

export const usersAddViewStore = new UsersAddViewStore();