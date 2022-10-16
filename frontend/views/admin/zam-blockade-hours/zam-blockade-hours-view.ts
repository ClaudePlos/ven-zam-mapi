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
import type { GridColumnBodyLitRenderer } from '@vaadin/grid/lit.js';



@customElement('zam-blockade-hours-view')
export class ZamBlockadeHoursView extends View {

    @state()
    private idKK: string = "";

    @state()
    private blkId: number | undefined;

    @state()
    private selectedKK: number = 0;

    @state()
    private kkList: KierunekKosztowVO[] = [];

    @state()
    private blockHours: NapZamBlockadeVO[] = [];

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
                .grid-block-hours {
                    height: 800px;
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
                <vaadin-button theme='primary' @click=${this.add} ?disabled="${this.selectedKK !== 1}">Dodaj Godz. Korekt (ZAM)</vaadin-button>
                <vaadin-button theme='primary' @click=${this.saveAll}>Zapisz</vaadin-button>
            </div>
                
                
            <div>
                <vaadin-grid class="grid-block-hours" .items="${this.blockHours}">
                    <vaadin-grid-column header="Typ"  path="blkType"></vaadin-grid-column>
                    <vaadin-grid-column header="Godz"  flex-grow="0" auto-width ${columnBodyRenderer(this.timeRenderer, [])}></vaadin-grid-column>
                    <vaadin-grid-column header="Ramy Czasowe" path="blkRamyCzasowe"></vaadin-grid-column>
                    <vaadin-grid-column header="TimeOfDay" path="blkTimeOfDay"></vaadin-grid-column>
                    <vaadin-grid-column ${columnBodyRenderer<NapZamBlockadeVO>( (hour) => html`<vaadin-button theme="secondary error" 
                                               @click="${async () => { await NapZamBlockadeEndpoint.delete(hour.blkId);  await this.getHours() }}">X</vaadin-button>`,[] )} 
                                        header="Usuń" ></vaadin-grid-column>
                </vaadin-grid>
            </div>
                
         </div>
        `;
    }

    private timeRenderer: GridColumnBodyLitRenderer<NapZamBlockadeVO> = (block) => html`
        <vaadin-time-picker class="time" value="${block.blkHours}"
              @value-changed="${(e: DateTimePickerValueChangedEvent) => (block.blkHours = e.detail.value)}"
        ></vaadin-time-picker>
  `;

    async kkChanged(e: CustomEvent) {
        this.idKK = e.detail.value as string;
        this.getHours()
    }

    async getHours() {
        if (this.idKK !== "") {
            const hours = await NapZamBlockadeEndpoint.getBlockadesForKK(Number(this.idKK));
            this.blockHours = hours;
            if (this.blockHours.length === 0) {
                this.selectedKK = 1;
            } else {
                this.selectedKK = 0;
            }
        }
    }


    // async buildHours() {
    //     this.hours.forEach( item => {
    //         Notification.show(item.blkHours + " " + item.blkTimeOfDay);
    //     })
    // }

    async add() {
        await this.save('S','06:00', 1, 'D')
        await this.save('2S','08:00',2, 'D')
        await this.save('O','10:00', 3, 'D')
        await this.save('P','12:00', 4, 'D')
        await this.save('K','14:00', 5, 'D')
        await this.save('PN','16:00',6, 'D')
        await this.save('S','06:00', 1, 'W')
        await this.save('2S','08:00',2, 'W')
        await this.save('O','10:00', 3, 'W')
        await this.save('P','12:00', 4, 'W')
        await this.save('K','14:00', 5, 'W')
        await this.save('PN','16:00',6, 'W')
        await this.getHours()
    }

    async save( timeOfDay : string, hhSS : string, lp : number, timeframe : string) {
        const block: NapZamBlockadeVO = {};
        block.blkKkId = Number(this.idKK);
        block.blkType = 'ZAM';
        // @ts-ignore
        block.blkHours = new Date('July 1, 1999, ' + hhSS +':00');
        block.blkTimeOfDay = timeOfDay;
        block.blkLp = lp;
        block.blkRamyCzasowe = timeframe;
        await NapZamBlockadeEndpoint.save(block);
    }

    async saveAll() {
        this.blockHours.forEach( item => {
            // @ts-ignore
            console.log(item.blkHours.toString());
             // @ts-ignore
            if (!item.blkHours.toString().includes('Jul')) {
                 // @ts-ignore
                 item.blkHours = new Date('July 1, 1999, ' + item.blkHours);
             }
             NapZamBlockadeEndpoint.save(item);
        })
        const notification = Notification.show('Zapisano', {position: 'middle',});
        notification.setAttribute('theme', 'success');
    }



}