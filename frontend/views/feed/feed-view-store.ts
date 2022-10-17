import dateFnsFormat from "date-fns/format";
import {makeAutoObservable} from "mobx";
import {StanyZywionychEndpoint} from "Frontend/generated/endpoints";
import StanZywionychNaDzienDTO from "Frontend/generated/pl/kskowronski/data/entity/mapi/StanZywionychNaDzienDTO";

class FeedViewStore {

    public startDate: string = dateFnsFormat(new Date('2022-01-01'), 'yyyy-MM-dd');
    public idGZ: number = 0;
    public sortType: string = "lp";

    public stanyZywionychNaDzien: StanZywionychNaDzienDTO[] = [];


    constructor() {
        makeAutoObservable(this);
    }

    async dateChanged( newDate: string ) {
        this.startDate = newDate;
        this.getStanyZywionychNaDzien()
    }

    async getStanyZywionychNaDzien() {
        const stanyZywionychNaDzien = await StanyZywionychEndpoint.pobierzStanZywionychWdniuDlaGZ(feedViewStore.startDate, this.idGZ, this.sortType);
        this.stanyZywionychNaDzien = stanyZywionychNaDzien;
    }

}

export const feedViewStore = new FeedViewStore();