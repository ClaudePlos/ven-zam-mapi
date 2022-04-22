import '@vaadin/grid/vaadin-grid';
import '@vaadin/combo-box'
import './components/claude-date';

import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../../views/view';
import { feedViewStore } from './feed-view-store';
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
// @ts-ignore
import {GrupaZywionychEndpoint, KierunekKosztowEndpoint, StanyZywionychEndpoint} from "Frontend/generated/endpoints";
import GrupaZywionychVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/GrupaZywionychVO";
import StanZywionychNaDzienDTO from "Frontend/generated/pl/kskowronski/data/entity/mapi/StanZywionychNaDzienDTO";

@customElement('feed-view')
export class FeedView extends View {

    idKK: number = 0;
    idGZ: number = 0;
    sortType: string = "lp";

    @state()
    private kkList: KierunekKosztowVO[] = [];

    @state()
    private gzList: GrupaZywionychVO[] = [];

    @state()
    private stanyZywionychNaDzien: StanZywionychNaDzienDTO[] = [];

    async firstUpdated() {
        const kkList = await KierunekKosztowEndpoint.getAllKK();
        this.kkList = kkList;
    }

    render() {
        return html`<div>
            <div><claude-date></claude-date>
                <vaadin-combo-box  label="Kierunek kosztów"
                                   .items="${this.kkList}"
                                   @value-changed="${this.kkChanged}"
                                   item-label-path="kierunekKosztowNazwa"
                                   item-value-path="idKierunekKosztow"
                                   allow-custom-value
                                   label="Browser"
                                   helper-text="Wybierz kierunk koszótw"
                ></vaadin-combo-box>
                <vaadin-combo-box  label="Grupa żywionych"
                                   .items="${this.gzList}"
                                   @value-changed="${this.gzChanged}"
                                   item-label-path="grupaZywionych"
                                   item-value-path="idGrupaZywionych"
                                   allow-custom-value
                                   label="Browser"
                                   helper-text="Wybierz grupę żywionych"
                ></vaadin-combo-box>
            </div>
            <vaadin-grid .items="${this.stanyZywionychNaDzien}">
                <vaadin-grid-column path="lp"></vaadin-grid-column>
                <vaadin-grid-column path="dietaNazwa"></vaadin-grid-column>
                <vaadin-grid-column path="sniadaniePlanIl"></vaadin-grid-column>
                <vaadin-grid-column path="drugieSniadaniePlanIl"></vaadin-grid-column>
            </vaadin-grid>
    </div>`;
    }

    kkChanged(e: CustomEvent) {
        this.idKK = e.detail.value as number;
        this.getGzList();
    }

    async getGzList() {
        const gzList = await GrupaZywionychEndpoint.getAllGzForKkId(this.idKK);
        this.gzList = gzList;
    }

    gzChanged(e: CustomEvent) {
        this.idGZ = e.detail.value as number;
        this.getStanyZywionychNaDzien();
    }

    async getStanyZywionychNaDzien() {
        const stanyZywionychNaDzien = await StanyZywionychEndpoint.pobierzStanZywionychWdniuDlaGZ(feedViewStore.startDate, this.idGZ, this.sortType);
        this.stanyZywionychNaDzien = stanyZywionychNaDzien;
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add(
            'flex',
            'flex-col',
            'h-full',
            'p-l',
            'box-border'
        );
    }
}
