import '@vaadin/button';
import '@vaadin/combo-box'
import '@vaadin/grid/vaadin-grid';
import '@vaadin/grid/vaadin-grid-column-group.js';
import './components/claude-date';
import '@vaadin/number-field';
import '@vaadin/integer-field';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/notification';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';


import { html, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {Notification} from "@vaadin/notification";
import type { NotificationOpenedChangedEvent } from '@vaadin/notification';
import { notificationRenderer } from '@vaadin/notification/lit.js';
import type { NotificationLitRenderer } from '@vaadin/notification/lit.js';
import { View } from '../../views/view';
import { Binder } from '@hilla/form';
import { GridItemModel } from '@vaadin/grid';
import { feedViewStore } from './feed-view-store';
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
// @ts-ignore
import {
    GrupaZywionychEndpoint,
    KierunekKosztowEndpoint,
    NapZamBlockadeEndpoint,
    StanyZywionychEndpoint
} from "Frontend/generated/endpoints";
import GrupaZywionychVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/GrupaZywionychVO";
import StanZywionychNaDzienDTO from "Frontend/generated/pl/kskowronski/data/entity/mapi/StanZywionychNaDzienDTO";

import "./feed-view.css"
import StanZywionychNaDzienDTOModel
    from "Frontend/generated/pl/kskowronski/data/entity/mapi/StanZywionychNaDzienDTOModel";
//import '@vaadin/vaadin-lumo-styles/utility.js';
import { appStore } from '../../stores/app-store';
import NapZamBlockadeVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/nap/NapZamBlockadeVO";

@customElement('feed-view')
export class FeedView extends View {

    idKK: number = 0;
    czyKorekta: string = "N";

    @state()
    private kkList: KierunekKosztowVO[] = [];

    @state()
    private blockHours: NapZamBlockadeVO[] = [];

    @state()
    private gzList: GrupaZywionychVO[] = [];


    private binder = new Binder(this, StanZywionychNaDzienDTOModel);

    @state()
    private notificationOpened = false;

    @state()
    private textBlockadeHours : string = " ";

    @state()
    private textOpenHours : string = " test";

    @state() private sBlock = false;
    @state() private s2Block = false;
    @state() private oBlock = false;
    @state() private pBlock = false;
    @state() private kBlock = false;
    @state() private pnBlock = false;


    async firstUpdated() {
        const kkList = await KierunekKosztowEndpoint.findAllUserKK(appStore.user?.id);
        this.kkList = kkList;
    }

    render() {

        const { model } = this.binder;

        return html`
            <div style="width: 99%; height: 100%; padding-left: 5px">
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
                <vaadin-button theme="secondary error icon" @click="${() => (this.notificationOpened = true)}" .disabled="${this.notificationOpened}">i</vaadin-button>
                <vaadin-notification
                        duration="0"
                        position="top-stretch"
                        .opened="${this.notificationOpened}"
                        @opened-changed="${(e: NotificationOpenedChangedEvent) => {
                            this.notificationOpened = e.detail.value;
                        }}"
                        ${notificationRenderer(this.renderer, [])}
                ></vaadin-notification>
            </div>
            <vaadin-grid .items="${feedViewStore.stanyZywionychNaDzien}" style="width: 99%; height: 88%" theme="column-borders">

                <vaadin-grid-column path="lp" width="60px"></vaadin-grid-column>
                <vaadin-grid-column path="dietaNazwa" width="300px"></vaadin-grid-column>
  
                
                <vaadin-grid-column-group header="Planowanie">
                <vaadin-grid-column header="Ś"   .renderer="${this.valueRendererS}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="IIŚ" .renderer="${this.valueRendererIIS}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="O"   .renderer="${this.valueRendererO}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="P"   .renderer="${this.valueRendererP}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="K"   .renderer="${this.valueRendererK}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="PN"  .renderer="${this.valueRendererPN}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="Uwagi" path="uwagi"></vaadin-grid-column>
                </vaadin-grid-column-group>
                

                <vaadin-grid-column-group class="gridCorrection" header="Korekta">
                <vaadin-grid-column header="Ś"   .renderer="${this.valueRendererS_kor}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="IIŚ" .renderer="${this.valueRendererIIS_kor}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="O"   .renderer="${this.valueRendererO_kor}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="P"   .renderer="${this.valueRendererP_kor}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="K"   .renderer="${this.valueRendererK_kor}" width="124px"></vaadin-grid-column>
                <vaadin-grid-column header="PN"  .renderer="${this.valueRendererPN_kor}" width="124px"></vaadin-grid-column>
                </vaadin-grid-column-group>
            </vaadin-grid>
    </div>`;
    }

    gzChanged(e: CustomEvent) {
        feedViewStore.idGZ = e.detail.value as number;
        feedViewStore.getStanyZywionychNaDzien();
    }

    // plan

    private valueRendererS = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.sniadaniePlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${this.sBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "s")} 
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}                                                                        
               value="${model.item.sniadaniePlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererIIS = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.drugieSniadaniePlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${this.s2Block}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "2s")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}                                                                      
               value="${model.item.drugieSniadaniePlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererO = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.obiadPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${this.oBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "o")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}
               value="${model.item.obiadPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererP = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.podwieczorekPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${this.pBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "p")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}
               value="${model.item.podwieczorekPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererK = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.kolacjaPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${this.kBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "k")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}
               value="${model.item.kolacjaPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererPN = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.posilekNocnyPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${this.pnBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "pn")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}
               value="${model.item.posilekNocnyPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    // kor

    private valueRendererS_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.sniadanieKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${this.sBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "s_kor")} 
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}                                                                        
               value="${model.item.sniadanieKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererIIS_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.drugieSniadanieKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${this.s2Block}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "2s_kor")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}                                                                      
               value="${model.item.drugieSniadanieKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererO_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.obiadKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${this.oBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "o_kor")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}
               value="${model.item.obiadKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererP_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.podwieczorekKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${this.pBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "p_kor")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}
               value="${model.item.podwieczorekKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererK_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.kolacjaKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${this.kBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "k_kor")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}
               value="${model.item.kolacjaKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererPN_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.posilekNocnyKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${this.pnBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "pn_kor")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item)}
               value="${model.item.posilekNocnyKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }




    renderer: NotificationLitRenderer = () => {
        return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
        <div>Plan/Korekta:<p style="color:red"> Godz zablokowane:${this.textBlockadeHours}</p> Godz otwarte:${this.textOpenHours}</div>
        <vaadin-button theme="tertiary-inline" @click="${this.close}" aria-label="Close">
          <vaadin-icon icon="lumo:cross"></vaadin-icon>
        </vaadin-button>
      </vaadin-horizontal-layout>
    `;
    };

    updateState( item: StanZywionychNaDzienDTO, value: number, type: string){
        if (type === "s") { item.sniadaniePlanIl = value as number }
        else if (type === "2s") { item.drugieSniadaniePlanIl = value as number }
        else if (type === "o") { item.obiadPlanIl = value as number }
        else if (type === "p") { item.podwieczorekPlanIl = value as number }
        else if (type === "k") { item.kolacjaPlanIl = value as number }
        else if (type === "pn") { item.posilekNocnyPlanIl = value as number }
        else if (type === "s_kor") { item.sniadanieKorIl = value as number }
        else if (type === "2s_kor") { item.drugieSniadanieKorIl = value as number }
        else if (type === "o_kor") { item.obiadKorIl = value as number }
        else if (type === "p_kor") { item.podwieczorekKorIl = value as number }
        else if (type === "k_kor") { item.kolacjaKorIl = value as number }
        else if (type === "pn_kor") { item.posilekNocnyKorIl = value as number }
    }

    updateClickState( item: StanZywionychNaDzienDTO){
            item.dataChanged = true;
    }

    handleChange = (event: CustomEvent<{ value: string }>) => {
        Notification.show("zmienione" + event);
    }


    inputChange(e: CustomEvent) {
        Notification.show("zmienione");
    }

    async kkChanged(e: CustomEvent) {
        this.idKK = e.detail.value as number;
        this.getGzList();
        const blockHours = await NapZamBlockadeEndpoint.getBlockadesForKK(this.idKK)
        this.blockHours = blockHours;
        this.blockHours.forEach( item => {
            this.textBlockadeHours += item.blkTimeOfDay + "(" + item.blkRamyCzasowe + "):" + item.blkHours?.substring(0,5) + " "
        })
    }

    async getGzList() {
        const gzList = await GrupaZywionychEndpoint.getAllGzForKkId(this.idKK);
        this.gzList = gzList;
    }


    async save() {
        const ret = await StanyZywionychEndpoint.zapiszStanZyw(feedViewStore.startDate, feedViewStore.idGZ, feedViewStore.sortType, this.idKK, this.czyKorekta
            , appStore.user?.operatorId,  feedViewStore.stanyZywionychNaDzien.filter((obj) => { return obj.dataChanged === true }));
        Notification.show(ret);
        feedViewStore.stanyZywionychNaDzien.filter((obj) => { return obj.dataChanged === true }).forEach((stanZ) =>{
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

    private close() {
        this.notificationOpened = false;
    }
}
