import dateFnsFormat from "date-fns/format";
import {makeAutoObservable} from "mobx";
import {StanyZywionychEndpoint} from "Frontend/generated/endpoints";
import StanZywionychNaDzienDTO from "Frontend/generated/pl/kskowronski/data/entity/mapi/StanZywionychNaDzienDTO";
import {Notification} from "@vaadin/notification";
import dateFnsParse from "date-fns/parse";
import NapZamBlockadeVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/nap/NapZamBlockadeVO";

class FeedViewStore {

    public startDate: string = dateFnsFormat(new Date(), 'yyyy-MM-dd');
    public idGZ: number = 0;
    public sortType: string = "lp";

    public stanyZywionychNaDzien: StanZywionychNaDzienDTO[] = [];

    public blockHours: NapZamBlockadeVO[] = [];

    public textBlockadeHours : string = "";

    public sBlock : boolean = false;
    public s2Block : boolean = false;
    public oBlock : boolean = false;
    public pBlock : boolean = false;
    public kBlock : boolean = false;
    public pnBlock : boolean = false;

    public sBlock_kor : boolean = false;
    public s2Block_kor : boolean = false;
    public oBlock_kor : boolean = false;
    public pBlock_kor : boolean = false;
    public kBlock_kor : boolean = false;
    public pnBlock_kor : boolean = false;


    constructor() {
        makeAutoObservable(this);
    }

    async dateChanged( newDate: string ) {
        this.startDate = newDate;
        await this.checkBlockadeHours()
        await this.getStanyZywionychNaDzien()
    }

    async getStanyZywionychNaDzien() {
        const stanyZywionychNaDzien = await StanyZywionychEndpoint.pobierzStanZywionychWdniuDlaGZ(feedViewStore.startDate, this.idGZ, this.sortType);
        this.stanyZywionychNaDzien = stanyZywionychNaDzien;
        if (this.stanyZywionychNaDzien.length != 0){
            Notification.show("+")
        }
    }

    async checkBlockadeHours() {
        const parData: Date = dateFnsParse(this.startDate, 'yyyy-MM-dd', new Date())
        const today = new Date()
        const myToday: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
        if (parData < myToday) {
            this.sBlock = true;
            this.s2Block = true;
            this.oBlock = true;
            this.pBlock = true;
            this.kBlock = true;
            this.pnBlock = true;
            this.sBlock_kor = true;
            this.s2Block_kor = true;
            this.oBlock_kor = true;
            this.pBlock_kor = true;
            this.kBlock_kor = true;
            this.pnBlock_kor = true;
            this.textBlockadeHours = "Zmiany zablokowane, wybrany dzień starszy niż dziś"
            return;
        } else if (parData > myToday) {
            this.sBlock = false;
            this.s2Block = false;
            this.oBlock = false;
            this.pBlock = false;
            this.kBlock = false;
            this.pnBlock = false;
            this.sBlock_kor = false;
            this.s2Block_kor = false;
            this.oBlock_kor = false;
            this.pBlock_kor = false;
            this.kBlock_kor = false;
            this.pnBlock_kor = false;

            this.blockHours.forEach( item => {
                if ( item.blkRamyCzasowe === "W" ) {
                    this.checkBlockadeEditHoursForTomorrow( item.blkTimeOfDay, item.blkHours);
                    this.textBlockadeHours += item.blkTimeOfDay + "(" + item.blkRamyCzasowe + "):" + item.blkHours?.substring(0,5) + " "
                }
            })

        } else {
            // daty równe dziś i oznaczona na stronie, sprawdzamy do któreh godz można wprowadzać zamówienia
            // Wiec jeżeli dziś to, blokujemy plan i sprawdzamy tylko korekty:
            const q1 = dateFnsFormat(new Date(),'yyyy-MM-dd')
            const q2 = feedViewStore.startDate
            if ( dateFnsFormat(new Date(),'yyyy-MM-dd') === feedViewStore.startDate ) {
                // nie mozna planowac na dzis, tylko na jutro
                this.sBlock = true;
                this.s2Block = true;
                this.oBlock = true;
                this.pBlock = true;
                this.kBlock = true;
                this.pnBlock = true;

                this.blockHours.forEach( item => {
                    if ( item.blkRamyCzasowe === "D" ) {
                        this.checkBlockadeEditHoursForToday( item.blkTimeOfDay, item.blkHours);
                        this.textBlockadeHours += item.blkTimeOfDay + "(" + item.blkRamyCzasowe + "):" + item.blkHours?.substring(0,5) + " "
                    }
                })

            }



        }
    }

    // blkTimeOfDay S, 2S, O, P, K, PN
    // blkRamyCzasowe W jutro, D dzis
    // blkHours 00:00:00
    async checkBlockadeEditHoursForToday(blkTimeOfDay: string | undefined, blkHours: string | undefined) {

        const d1 : Date = new Date();
        const d1_tommorow = new Date();
        d1_tommorow.setDate(d1_tommorow.getDate() + 1)

        const d2 : Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), Number(blkHours?.substring(0,2)), Number(blkHours?.substring(3,5)), 0)

        //KOREKTA
        if ( blkTimeOfDay == "S" ) {
            d1 > d2 ? this.sBlock_kor = true : this.sBlock_kor = false
        }

        if ( blkTimeOfDay == "2S" ) {
            d1 > d2 ? this.s2Block_kor = true : this.s2Block_kor = false
        }

        if ( blkTimeOfDay == "O" ) {
            d1 > d2 ? this.oBlock_kor = true : this.oBlock_kor = false
        }

        if ( blkTimeOfDay == "P" ) {
            d1 > d2 ? this.pBlock_kor = true : this.pBlock_kor = false
        }

        if ( blkTimeOfDay == "K" ) {
            d1 > d2 ? this.kBlock_kor = true : this.kBlock_kor = false
        }

        if ( blkTimeOfDay == "PN" ) {
            d1 > d2 ? this.pnBlock_kor = true : this.pnBlock_kor = false
        }

    }


    // blkTimeOfDay S, 2S, O, P, K, PN
    // blkRamyCzasowe W jutro, D dzis
    // blkHours 00:00:00
    async checkBlockadeEditHoursForTomorrow(blkTimeOfDay: string | undefined, blkHours: string | undefined) {

        const d1 : Date = new Date();
        const d1_tommorow = new Date();
        d1_tommorow.setDate(d1_tommorow.getDate() + 1)

        const d2 : Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), Number(blkHours?.substring(0,2)), Number(blkHours?.substring(3,5)), 0)

        //KOREKTA
        if ( blkTimeOfDay == "S" ) {
            d1 > d2 ? this.sBlock = true : this.sBlock = false
        }

        if ( blkTimeOfDay == "2S" ) {
            d1 > d2 ? this.s2Block = true : this.s2Block = false
        }

        if ( blkTimeOfDay == "O" ) {
            d1 > d2 ? this.oBlock = true : this.oBlock = false
        }

        if ( blkTimeOfDay == "P" ) {
            d1 > d2 ? this.pBlock = true : this.pBlock = false
        }

        if ( blkTimeOfDay == "K" ) {
            d1 > d2 ? this.kBlock = true : this.kBlock = false
        }

        if ( blkTimeOfDay == "PN" ) {
            d1 > d2 ? this.pnBlock = true : this.pnBlock = false
        }

    }

}

export const feedViewStore = new FeedViewStore();