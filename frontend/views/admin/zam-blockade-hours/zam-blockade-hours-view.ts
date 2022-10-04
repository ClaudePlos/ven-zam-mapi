import '@vaadin/vaadin-button';
import '@vaadin/time-picker';
import { customElement, state, query } from 'lit/decorators.js';
import {View} from "Frontend/views/view";
import {html} from "lit";
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
import {KierunekKosztowEndpoint, NapZamBlockadeEndpoint} from "Frontend/generated/endpoints";
import {appStore} from "Frontend/stores/app-store";
import NapZamBlockadeVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/nap/NapZamBlockadeVO";
import {Notification} from "@vaadin/notification";
import {Binder} from "@hilla/form";
import NapZamBlockadeVOModel from "Frontend/generated/pl/kskowronski/data/entity/mapi/nap/NapZamBlockadeVOModel";



@customElement('zam-blockade-hours-view')
export class ZamBlockadeHoursView extends View {

    @state()
    private idKK: string = "";

    @state()
    private blkId: number | undefined;

    @state()
    private hhS: string | undefined = "";

    @state()
    private selectedKK: number = 0;

    @state()
    private kkList: KierunekKosztowVO[] = [];

    @state()
    private hours: NapZamBlockadeVO[] = [];

    private binS = new Binder(this, NapZamBlockadeVOModel);


    async firstUpdated() {
        const kkList = await KierunekKosztowEndpoint.getAllKK();
        kkList.sort((a,b) => (appStore.fixPolishLetter(a.kierunekKosztowNazwa) > appStore.fixPolishLetter(b.kierunekKosztowNazwa)) ? 1 : -1);
        this.kkList = kkList;
    }

    render() {
        return html`
            <style>
                .combo-kk {
                    width: 600px;
                }
                .zam-blockade-hours-view {
                    margin: 10px;
                }
                .time {
                    width: 100px;
                }
            </style>
            <div class="zam-blockade-hours-view">
                <vaadin-combo-box  class="combo-kk" label="Kierunek kosztów" 
                                   .items="${this.kkList}"
                                   @value-changed="${this.kkChanged}"
                                   item-label-path="kierunekKosztowNazwa"
                                   item-value-path="idKierunekKosztow"
                                   allow-custom-value
                                   label="Browser"
                                   helper-text="Wybierz kierunk koszótw"
                ></vaadin-combo-box>
            <div>
                <vaadin-button theme='primary' @click=${this.addZamBlockade} ?disabled="${this.selectedKK !== 1}" >Dodaj Godziny dla Korekt (ZAM)</vaadin-button>  
            </div>
            <div>
                <vaadin-time-picker class="time" label="Sniadanie do" value="${this.hhS}" ></vaadin-time-picker>
                <vaadin-button theme='primary' @click=${this.save}>Zapisz</vaadin-button>
            </div>
                
         </div>
        `;
    }

    async kkChanged(e: CustomEvent) {
        this.idKK = e.detail.value as string;
        if (this.idKK !== "") {
            this.selectedKK = 1;
            const hours = await NapZamBlockadeEndpoint.getBlockadesForKK(Number(this.idKK));
            this.hours = hours;
            this.buildHours()
        }
        //Notification.show(this.idKK + "");
    }

    async buildHours() {
        this.hours.forEach( item => {
            Notification.show(item.blkHours + " " + item.blkTimeOfDay);
            if (item.blkTimeOfDay === "S") {
                //binS = item;
                this.hhS = item.blkHours;
            }
        })
    }

    async addZamBlockade() {
        const block: NapZamBlockadeVO = {};
        block.blkKkId = Number(this.idKK);
        block.blkType = 'ZAM';
        // @ts-ignore
        block.blkHours = new Date('July 1, 1999, 00:00:00').getTime();
        block.blkTimeOfDay = 'S';
        await NapZamBlockadeEndpoint.save(block);
    }

    async save() {
        const block: NapZamBlockadeVO = {};
        block.blkKkId = Number(this.idKK);
        block.blkType = 'ZAM';
        // @ts-ignore
        block.blkHours = new Date('July 1, 1999, 00:00:00').getTime();
        block.blkTimeOfDay = 'S';
        await NapZamBlockadeEndpoint.save(block);
    }

}