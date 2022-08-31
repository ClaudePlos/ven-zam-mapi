import '@vaadin/vaadin-button';
import { customElement, state, query } from 'lit/decorators.js';
import {View} from "Frontend/views/view";
import {html} from "lit";
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
import {KierunekKosztowEndpoint, NapZamBlockadeEndpoint} from "Frontend/generated/endpoints";
import {appStore} from "Frontend/stores/app-store";
import { Binder, field } from '@hilla/form';
import {Notification} from "@vaadin/notification";
import NapZamBlockadeVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/nap/NapZamBlockadeVO";
import NapZamBlockadeVOModel from "Frontend/generated/pl/kskowronski/data/entity/mapi/nap/NapZamBlockadeVOModel";


@customElement('zam-blockade-hours-view')
export class ZamBlockadeHoursView extends View {

    idKK: string = "";

    @state()
    private selectedKK: number = 0;

    @state()
    private kkList: KierunekKosztowVO[] = [];

    // @state()
    // private todos: NapZamBlockadeVO[] = [];
    // private binder = new Binder(this, NapZamBlockadeVOModel);


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
                
            
            </div>
        `;
    }

    kkChanged(e: CustomEvent) {
        this.idKK = e.detail.value as string;
        if (this.idKK !== "") {
            this.selectedKK = 1;
        }
        //Notification.show(this.idKK + "");
    }

    async addZamBlockade() {
        const block: NapZamBlockadeVO = {};
        block.blkId = 3;
        block.blkKkId = Number(this.idKK);
        block.blkType = 'ZAM';
        // @ts-ignore
        block.blkHours = new Date('July 1, 1999, 14:14:00').getTime();
        block.blkTimeOfDay = 'S';
        await NapZamBlockadeEndpoint.save(block);
    }

}