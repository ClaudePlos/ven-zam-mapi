import {makeAutoObservable} from "mobx";

class AdditionalMaterialsStore {

    public dialogAdditionalMaterialsOpened : boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async dialogAdditionalMaterialsChange(value: boolean) {
        this.dialogAdditionalMaterialsOpened = value;
    }

}

export const additionalMaterialsStore = new AdditionalMaterialsStore();