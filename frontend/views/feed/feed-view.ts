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
import { appStore } from '../../stores/app-store';

@customElement('feed-view')
export class FeedView extends View {

    idKK: number = 0;
    idGZ: number = 0;
    sortType: string = "lp";
    czyKorekta: string = "N";

    @state()
    private kkList: KierunekKosztowVO[] = [];

    @state()
    private gzList: GrupaZywionychVO[] = [];

    @state()
    private stanyZywionychNaDzien: StanZywionychNaDzienDTO[] = [];
    private binder = new Binder(this, StanZywionychNaDzienDTOModel);

    async firstUpdated() {
        const kkList = await KierunekKosztowEndpoint.findAllUserKK(appStore.user?.id);
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

                <vaadin-grid-column path="lp" width="60px"></vaadin-grid-column>
                <vaadin-grid-column path="dietaNazwa" width="300px"></vaadin-grid-column>
  
                
                <vaadin-grid-column-group header="Planowanie">
                <vaadin-grid-column header="Ś"   .renderer="${this.valueRendererS}" width="145px"></vaadin-grid-column>
                <vaadin-grid-column header="IIŚ" .renderer="${this.valueRendererIIS}" width="145px"></vaadin-grid-column>
                <vaadin-grid-column header="O"   .renderer="${this.valueRendererO}" width="145px"></vaadin-grid-column>
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

    private valueRendererS = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.sniadaniePlanIl !== undefined ? render(html` <vaadin-integer-field class="firld-plan"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "s")} 
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}                                                                        
               value="${model.item.sniadaniePlanIl as number}" style="width: 110px"></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererIIS = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.drugieSniadaniePlanIl !== undefined ? render(html` <vaadin-integer-field class="field-kor"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "2s")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}                                                                      
               value="${model.item.drugieSniadaniePlanIl as number}" style="width: 110px"></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererO = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.obiadPlanIl !== undefined ? render(html` <vaadin-integer-field class="field-plan"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "o")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}
               value="${model.item.obiadPlanIl as number}" style="width: 110px"></vaadin-integer-field>`, root) : render(html``,root);
    }

    // private valueRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
    //     render(html` <input type="number" id="fname" name="fname" value="${model.item.sniadaniePlanIl}"
    //                         onChange="${this.handleChange}"
    //             style="border: none;width: 50px;font-size: 16px"></input>`, root);
    // };

    updateState( item: StanZywionychNaDzienDTO, value: number, type: string){
        if (type === "s") {
            item.sniadaniePlanIl = value as number;
        }
        else if (type === "2s") {
            item.drugieSniadaniePlanIl = value as number;
        }
    }

    updateClickState( item: StanZywionychNaDzienDTO){
            item.dataChanged = true;
    }

    handleChange = (event: CustomEvent<{ value: string }>) => {
        Notification.show("zmienione" + event);
    }

    updateTodoState2( e: number){
        Notification.show("zmienione" + e);
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
        const ret = await StanyZywionychEndpoint.zapiszStanZyw(feedViewStore.startDate, this.idGZ, this.sortType, this.idKK, this.czyKorekta
            , appStore.user?.operatorId,  this.stanyZywionychNaDzien.filter((obj) => { return obj.dataChanged === true }));
        Notification.show(ret);
        this.stanyZywionychNaDzien.filter((obj) => { return obj.dataChanged === true }).forEach((stanZ) =>{
            stanZ.dataChanged = false;
        })
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
