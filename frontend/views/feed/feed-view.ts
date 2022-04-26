import '@vaadin/button';
import '@vaadin/combo-box'
import '@vaadin/grid/vaadin-grid';
import '@vaadin/grid/vaadin-grid-column-group.js';
import './components/claude-date';
import '@vaadin/number-field';
import '@vaadin/integer-field';

import { html, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {Notification} from "@vaadin/notification";
import { View } from '../../views/view';
import { Binder, field } from '@hilla/form';
import { GridItemModel } from '@vaadin/grid';
import { feedViewStore } from './feed-view-store';
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
// @ts-ignore
import {GrupaZywionychEndpoint, KierunekKosztowEndpoint, StanyZywionychEndpoint} from "Frontend/generated/endpoints";
import GrupaZywionychVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/GrupaZywionychVO";
import StanZywionychNaDzienDTO from "Frontend/generated/pl/kskowronski/data/entity/mapi/StanZywionychNaDzienDTO";

import "./feed-view.css"
import StanZywionychNaDzienDTOModel
    from "Frontend/generated/pl/kskowronski/data/entity/mapi/StanZywionychNaDzienDTOModel";
//import '@vaadin/vaadin-lumo-styles/utility.js';

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
    private binder = new Binder(this, StanZywionychNaDzienDTOModel);

    async firstUpdated() {
        const kkList = await KierunekKosztowEndpoint.getAllKK();
        this.kkList = kkList;
    }

    render() {

        const { model } = this.binder;

        return html`<div style="width: 99%; height: 100%; padding-left: 5px">
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
                <vaadin-button theme="secondary" @click=${this.save}>Zapisz</vaadin-button>
            </div>
            <vaadin-grid .items="${this.stanyZywionychNaDzien}" style="width: 99%; height: 88%" theme="column-borders">

                <vaadin-grid-column path="lp" width="50px"></vaadin-grid-column>
                <vaadin-grid-column path="dietaNazwa" width="300px"></vaadin-grid-column>
  
                
                <vaadin-grid-column-group header="Planowanie">
                <vaadin-grid-column header="Ś" path="sniadaniePlanIl" .renderer="${this.valueRenderer}"></vaadin-grid-column>
                <vaadin-grid-column path="drugieSniadaniePlanIl"></vaadin-grid-column>
                <vaadin-grid-column path="obiadPlanIl"></vaadin-grid-column>
                <vaadin-grid-column path="podwieczorekPlanIl"></vaadin-grid-column>
                <vaadin-grid-column path="kolacjaPlanIl"></vaadin-grid-column>
                <vaadin-grid-column path="posilekNocnyPlanIl"></vaadin-grid-column>
                <vaadin-grid-column path="szUwagi"></vaadin-grid-column>
                </vaadin-grid-column-group>
                

                <vaadin-grid-column-group header="Korekta">
                <vaadin-grid-column path="sniadanieKorIl"></vaadin-grid-column>
                <vaadin-grid-column path="drugieSniadanieKorIl"></vaadin-grid-column>
                <vaadin-grid-column path="obiadKorIl"></vaadin-grid-column>
                <vaadin-grid-column path="podwieczorekKorIl"></vaadin-grid-column>
                <vaadin-grid-column path="kolacjaKorIl"></vaadin-grid-column>
                <vaadin-grid-column path="posilekNocnyKorIl"></vaadin-grid-column>
                </vaadin-grid-column-group>
            </vaadin-grid>
    </div>`;
    }

    private valueRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        render(html` <vaadin-integer-field has-controls @value-changed=${(e: CustomEvent) => this.updateTodoState(model.item, e.detail.value)}
                                           value="${model.item.sniadaniePlanIl}"></vaadin-integer-field>`, root);
    };

    // private valueRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
    //     render(html` <input type="number" id="fname" name="fname" value="${model.item.sniadaniePlanIl}"
    //                         onchange="${model.item.sniadaniePlanIl} == this.value"
    //             style="border: none;width: 50px;font-size: 16px"></input>`, root);
    // };

    updateTodoState( item: StanZywionychNaDzienDTO, value: number){
        item.sniadaniePlanIl = value;
    }

    inputChange(e: CustomEvent) {
        Notification.show("zmienione");
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

    async save() {
        Notification.show("Zapisane");
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
