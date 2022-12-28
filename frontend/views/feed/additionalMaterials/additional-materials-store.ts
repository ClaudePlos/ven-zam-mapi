import {makeAutoObservable} from "mobx";


class AdditionalMaterialsStore {

    public dialogAdditionalMaterialsOpened : boolean = false;

}


export const additionalMaterialsStore = new AdditionalMaterialsStore();