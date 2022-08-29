import {makeAutoObservable} from "mobx";
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
import {KierunekKosztowEndpoint} from "Frontend/generated/endpoints";

class KkUserViewStore {

    userId: number | undefined;
    username: string | undefined = "";
    userKKList: KierunekKosztowVO[] = [];

    public grid1Items: KierunekKosztowVO[] = [];

    public grid2Items: KierunekKosztowVO[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async dateChanged( userId: number | undefined, username: string | undefined ) {
        this.userId = userId;
        this.username = username;
        await this.getUserKK();
    }

    async getUserKK() {
        this.userKKList = await KierunekKosztowEndpoint.findAllUserKK(this.userId)
        await this.updateGrid();
    }

    async updateGrid() {
        if (kkUserViewStore.userId !== null) {
            const kk  = await KierunekKosztowEndpoint.getAllKK();
            kk.forEach((value, index) => {
                this.userKKList.forEach((value2, index2) => {
                    if (value.kierunekKosztowKod === value2.kierunekKosztowKod) {
                        kk.splice(index,1)
                    }
                })
            });
            this.grid1Items = this.userKKList;
            this.grid2Items = kk;
        }
    }

}

export const kkUserViewStore = new KkUserViewStore();