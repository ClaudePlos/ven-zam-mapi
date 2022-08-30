import { customElement, state, query } from 'lit/decorators.js';
import {View} from "Frontend/views/view";
import {html} from "lit";
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
import {KierunekKosztowEndpoint} from "Frontend/generated/endpoints";
import {appStore} from "Frontend/stores/app-store";


@customElement('zam-blockade-hours-view')
export class ZamBlockadeHoursView extends View {

    private idKK: number = 0;

    @state()
    private kkList: KierunekKosztowVO[] = [];


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
            
            </div>
        `;
    }

    kkChanged(e: CustomEvent) {
        this.idKK = e.detail.value as number;
    }

}