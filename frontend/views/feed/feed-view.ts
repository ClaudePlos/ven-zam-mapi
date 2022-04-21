import '@vaadin/combo-box'
import './components/claude-date';

import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../../views/view';
import { feedViewStore } from './feed-view-store';
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
// @ts-ignore
import {GrupaZywionychEndpoint, KierunekKosztowEndpoint} from "Frontend/generated/endpoints";
import GrupaZywionychVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/GrupaZywionychVO";

@customElement('feed-view')
export class FeedView extends View {

    idKK: number = 0;
    idGZ: number = 0;

    @state()
    private kkList: KierunekKosztowVO[] = [];

    @state()
    private gzList: GrupaZywionychVO[] = [];

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
      <h2>This place intentionally left empty</h2>
      <p>It’s a place where you can grow your own UI 🤗</p>
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
