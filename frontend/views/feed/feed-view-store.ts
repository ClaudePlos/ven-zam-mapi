import dateFnsFormat from "date-fns/format";
import {makeAutoObservable} from "mobx";


class FeedViewStore {

    public startDate: string = dateFnsFormat(new Date('2022-01-01'), 'yyyy-MM-dd');

    constructor() {
        makeAutoObservable(this);
    }

    dateChanged( newDate: string ) {
        this.startDate = newDate;
    }

}

export const feedViewStore = new FeedViewStore();