import '@vaadin/combo-box'
import './components/claude-date';

import { html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../../views/view';
import { feedViewStore } from './feed-view-store';
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
import {KierunekKosztowEndpoint} from "Frontend/generated/endpoints";

@customElement('feed-view')
export class FeedView extends View {

    kkId: number = 0;

    @state()
    private allKK: KierunekKosztowVO[] = [];

    async firstUpdated() {
        const allKK = await KierunekKosztowEndpoint.getAllKK();
        this.allKK = allKK;
    }

    render() {
        return html`<div>
            <div><claude-date></claude-date>
                <vaadin-combo-box  id="companies-box" label="Kierunek kosztów"
                                   .items="${this.allKK}"
                                   @value-changed="${this.kkChanged}"
                                   item-label-path="kierunekKosztowNazwa"
                                   item-value-path="idKierunekKosztow"
                                   allow-custom-value
                                   label="Browser"
                                   helper-text="Wybierz kierunk koszótw"
                ></vaadin-combo-box>
            </div>
      <h2>This place intentionally left empty</h2>
      <p>It’s a place where you can grow your own UI 🤗</p>
    </div>`;
    }

    kkChanged(e: CustomEvent) {
        this.kkId = e.detail.value as number;
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
