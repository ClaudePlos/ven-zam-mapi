import {makeAutoObservable} from "mobx";
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
import {KierunekKosztowEndpoint} from "Frontend/generated/endpoints";
import {appStore} from "Frontend/stores/app-store";

class KkUserViewStore {

    userId: number | undefined;
    username: string | undefined = "";
    userKKList: KierunekKosztowVO[] = [];

    public grid1Items: KierunekKosztowVO[]  = [];

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
        // @ts-ignore
        await this.updateGrid();
    }

    async updateGrid() {
        if (kkUserViewStore.userId !== null) {
            const kk  = await KierunekKosztowEndpoint.getAllKK();
            const kkRefreshed = kk.filter(item => !this.userKKList.some(itemToBeRemoved => itemToBeRemoved.idKierunekKosztow === item.idKierunekKosztow));

            // @ts-ignore
            kkRefreshed.sort((a, b) => (appStore.fixPolishLetter(a.kierunekKosztowNazwa) > appStore.fixPolishLetter(b.kierunekKosztowNazwa)) ? 1 : -1);

            this.grid1Items = this.userKKList;
            this.grid2Items = kkRefreshed;
        }
    }

}

export const kkUserViewStore = new KkUserViewStore();