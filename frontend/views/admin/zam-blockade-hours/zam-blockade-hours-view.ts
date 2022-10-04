import '@vaadin/vaadin-button';
import '@vaadin/time-picker';
import { customElement, state, query } from 'lit/decorators.js';
import {View} from "Frontend/views/view";
import {html} from "lit";
import { columnBodyRenderer } from '@vaadin/grid/lit.js';
import type { DateTimePickerValueChangedEvent } from '@vaadin/date-time-picker';
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

    @state() private hhS: string | undefined = "";
    @state() private hhS2: string | undefined = "";

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
                <vaadin-time-picker class="time" label="Sniadanie do" value="${this.hhS}" @value-changed="${(e: DateTimePickerValueChangedEvent) => (this.hhS = e.detail.value)}"></vaadin-time-picker>
                <vaadin-time-picker class="time" label="Drugie Sniad do" value="${this.hhS2}" @value-changed="${(e: DateTimePickerValueChangedEvent) => (this.hhS2 = e.detail.value)}"></vaadin-time-picker>
                <vaadin-button theme='primary' @click=${this.save}>Zapisz</vaadin-button>
            </div>
                
                
            <div>
                <vaadin-grid .items="${this.hours}">
                    <vaadin-grid-column header="Typ"  path="blkType"></vaadin-grid-column>
                    <vaadin-grid-column header="Godz"  path="blkHours"></vaadin-grid-column>
                    <vaadin-grid-column header="TimeOfDay"  path="blkTimeOfDay"></vaadin-grid-column>
                    <vaadin-grid-column ${columnBodyRenderer<NapZamBlockadeVO>( (hour) => html`<vaadin-button theme="secondary error" 
                                               @click="${async () => { await NapZamBlockadeEndpoint.delete(hour.blkId);  await this.getHours() }}">X</vaadin-button>`,[] )} 
                                        header="Usuń" ></vaadin-grid-column>
                </vaadin-grid>
            </div>
                
         </div>
        `;
    }

    async kkChanged(e: CustomEvent) {
        this.idKK = e.detail.value as string;
        this.getHours()
        this.clearHoursInView()
    }

    async clearHoursInView() {
        this.hhS = "00:00";
        this.hhS2 = "00:00";
    }

    async getHours() {
        if (this.idKK !== "") {
            this.selectedKK = 1;
            const hours = await NapZamBlockadeEndpoint.getBlockadesForKK(Number(this.idKK));
            this.hours = hours;
            this.buildHours()
        }
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
        const blockS: NapZamBlockadeVO = {};
        blockS.blkKkId = Number(this.idKK);
        blockS.blkType = 'ZAM';
        // @ts-ignore
        blockS.blkHours = new Date('July 1, 1999, ' + this.hhS +':00');
        blockS.blkTimeOfDay = 'S';
        await NapZamBlockadeEndpoint.save(blockS);

        const block2S: NapZamBlockadeVO = {};
        block2S.blkKkId = Number(this.idKK);
        block2S.blkType = 'ZAM';
        // @ts-ignore
        block2S.blkHours = new Date('July 1, 1999, ' + this.hhS2 +':00');
        block2S.blkTimeOfDay = 'S2';
        await NapZamBlockadeEndpoint.save(block2S);

        this.getHours()
    }



}