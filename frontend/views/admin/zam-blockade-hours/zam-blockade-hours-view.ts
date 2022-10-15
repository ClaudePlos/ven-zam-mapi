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
                <vaadin-button theme='primary' @click=${this.add} ?disabled="${this.selectedKK !== 1}">Dodaj Godz. Korekt (ZAM)</vaadin-button>
                <vaadin-button theme='primary' @click=${this.saveAll}>Zapisz</vaadin-button>
            </div>
                
                
            <div>
                <vaadin-grid .items="${this.hours}">
                    <vaadin-grid-column header="Typ"  path="blkType"></vaadin-grid-column>
                    <vaadin-grid-column header="Godz"  flex-grow="0" auto-width ${columnBodyRenderer(this.timeRenderer, [])}></vaadin-grid-column>
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
            this.hours = hours;
            if (this.hours.length === 0) {
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
        this.save('S','00:00');
        this.save('2S','00:00');
        this.save('O','00:00');
        this.save('P','00:00');
        this.save('K','00:00');
        this.save('PN','00:00');
        this.getHours()
    }

    async save( timeOfDay : string, hhSS : string) {
        const block: NapZamBlockadeVO = {};
        block.blkKkId = Number(this.idKK);
        block.blkType = 'ZAM';
        // @ts-ignore
        block.blkHours = new Date('July 1, 1999, ' + hhSS +':00');
        block.blkTimeOfDay = timeOfDay;
        await NapZamBlockadeEndpoint.save(block);
    }

    async saveAll() {
        this.hours.forEach( item => {
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