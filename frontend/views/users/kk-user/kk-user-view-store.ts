import {makeAutoObservable} from "mobx";
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
import {KierunekKosztowEndpoint} from "Frontend/generated/endpoints";

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
            kkRefreshed.sort((a, b) => (this.fixPolishLetter(a.kierunekKosztowNazwa) > this.fixPolishLetter(b.kierunekKosztowNazwa).replace("Ł",'L')) ? 1 : -1);

            // kkRefreshed.sort(function(a, b){
            //     // @ts-ignore
            //     return a.kierunekKosztowNazwa - b.kierunekKosztowNazwa;
            // });

            this.grid1Items = this.userKKList;
            this.grid2Items = kkRefreshed;
        }
    }

    private fixPolishLetter( text: String){
        return text.replace("Ł",'L').replace("Ś","S").toUpperCase()
    }

}

export const kkUserViewStore = new KkUserViewStore();