import '@vaadin/button';
import '@vaadin/combo-box'
import '@vaadin/grid/vaadin-grid';
import '@vaadin/grid/vaadin-grid-column-group.js';
import './components/claude-date';
import './components/date-copy';
import './reports/rep-jadlospis';
import './reports/rep-jadlospispro';
import '@vaadin/number-field';
import '@vaadin/integer-field';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset';
import '@vaadin/notification';
import '@vaadin/horizontal-layout';
import '@vaadin/icon';
import '@vaadin/checkbox';
import '@vaadin/text-field';
import '@vaadin/dialog';
import '@vaadin/button';
import '@vaadin/menu-bar';
import '@vaadin/split-layout';

import type { GridActiveItemChangedEvent } from '@vaadin/grid';
import { html, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {Notification} from "@vaadin/notification";
import type { MenuBarItemSelectedEvent } from '@vaadin/menu-bar';
import type { NotificationOpenedChangedEvent } from '@vaadin/notification';
import { notificationRenderer } from '@vaadin/notification/lit.js';
import type { NotificationLitRenderer } from '@vaadin/notification/lit.js';
import { gridRowDetailsRenderer, columnBodyRenderer } from '@vaadin/grid/lit.js';
import { View } from '../../views/view';
import { Binder } from '@hilla/form';
import { GridItemModel } from '@vaadin/grid';

import { feedViewStore } from './feed-view-store';
import { repJadlospisStore } from './reports/rep-jadlospis-store';
import { repJadlospisproStore } from './reports/rep-jadlospispro-store';

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
import { appStore } from '../../stores/app-store';
import {
    columnFooterRenderer,
} from '@vaadin/grid/lit.js';



@customElement('feed-view')
export class FeedView extends View {

    idKK: number = 0;

    @state()
    czyKorekta: boolean = false;

    @state()
    styl: string = "badge";

    @state()
    status: string = "Edycja";

    @state()
    private kkList: KierunekKosztowVO[] = [];

    @state()
    private gzList: GrupaZywionychVO[] = [];

    @state()
    private binder = new Binder(this, StanZywionychNaDzienDTOModel);

    @state()
    private notCommentsOpened = false;

    @state() sumS: number = 0;
    @state() sumS2: number = 0;
    @state() sumO: number = 0;
    @state() sumP: number = 0;
    @state() sumK: number = 0;
    @state() sumPN: number = 0;
    @state() sumS_kor: number = 0;
    @state() sumS2_kor: number = 0;
    @state() sumO_kor: number = 0;
    @state() sumP_kor: number = 0;
    @state() sumK_kor: number = 0;
    @state() sumPN_kor: number = 0;

    @state()
    private itemsRep = [
        {
            text: 'Raporty',
            children: [
                { text: 'Księga receptur' },{ text: 'Księga receptur PRO' },
                { component: 'hr' },{ text: 'By email' }, { text: 'Get link' },
                { component: 'hr' },{ text: 'Set permissions' },
            ],
        },
    ];

    @state()
    private detailsOpenedItem: StanZywionychNaDzienDTO[] = [];

    @state()
    private dietName : string | undefined = "";

    async firstUpdated() {
        const kkList = await KierunekKosztowEndpoint.findAllUserKK(appStore.user?.id);
        this.kkList = kkList;
    }

    render() {

        const { model } = this.binder;

        return html`
            <div>
                <rep-jadlospis></rep-jadlospis>
                <rep-jadlospispro></rep-jadlospispro>
            <vaadin-horizontal-layout theme="spacing padding" style="align-items: baseline; padding-top: inherit;">
                <claude-date></claude-date>
                <vaadin-combo-box  label="Kierunek kosztów" theme="small"
                                   .items="${this.kkList}"
                                   @value-changed="${this.kkChanged}"
                                   item-label-path="kierunekKosztowNazwa"
                                   item-value-path="idKierunekKosztow"
                                   allow-custom-value style="width:300px"
                                   label="Browser"
                                   helper-text="Wybierz kierunk koszótw"
                ></vaadin-combo-box>
                <vaadin-combo-box  label="Grupa żywionych / Oddział" theme="small"
                                   .items="${this.gzList}"
                                   @value-changed="${this.gzChanged}"
                                   item-label-path="grupaZywionych"
                                   item-value-path="idGrupaZywionych"
                                   allow-custom-value style="width:300px"
                                   label="Browser"
                                   helper-text="Wybierz grupę żywionych"
                ></vaadin-combo-box>
                <vaadin-button theme="primary" @click=${this.save}>Zapisz</vaadin-button>
                <vaadin-button theme="secondary error icon small" @click="${() => (this.notCommentsOpened = true)}" .disabled="${this.notCommentsOpened}">u</vaadin-button>
                <vaadin-notification
                        duration="0"
                        position="top-stretch"
                        .opened="${this.notCommentsOpened}"
                        @opened-changed="${(e: NotificationOpenedChangedEvent) => {
                            this.notCommentsOpened = e.detail.value;
                        }}"
                        ${notificationRenderer(this.rendererComments, [])}
                ></vaadin-notification>
                <vaadin-checkbox theme="small" .checked=${this.czyKorekta} label="Aktywuj korektę"  @click="${() => (this.correctionActive())}"></vaadin-checkbox>
                <span theme="${this.styl}">
                  <span>${this.status}</span>
                </span>
                <vaadin-horizontal-layout style="border-style: groove; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; display: block">
                    <date-copy></date-copy>
                    <vaadin-button theme="small" @click="${feedViewStore.copyStanZywForDay}">Plan</vaadin-button>
                </vaadin-horizontal-layout>
                <vaadin-menu-bar theme="small" .items="${this.itemsRep}" @item-selected="${this.itemSelected}"></vaadin-menu-bar>
            </vaadin-horizontal-layout>

            </div>
                
                
            

            <vaadin-horizontal-layout theme="spacing">
                <p style="font-size: 14px">Plan/Korekta:</p><p style="color:red;font-size: 14px"> Godz zablokowane: ${feedViewStore.textBlockadeHours}</p><p style="color:green;font-size: 14px"> Godz otwarte: ${feedViewStore.textOpenHours}</p>
                <p style="font-size: 14px">Zaznaczona dieta: ${this.dietName}</p>
            </vaadin-horizontal-layout>
                
            <!--<vaadin-grid class="gridZamSum" slot="gridZamSum" style="width: 100%; height: 3%" theme="compact column-borders" all-rows-visible>
                <vaadin-grid-column header="" width="48px"></vaadin-grid-column>
                <vaadin-grid-column header="Razem: / Korekta + Plan" width="245px"></vaadin-grid-column>
                
                <vaadin-grid-column header="${this.sumS}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="${this.sumS2}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="${this.sumO}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="${this.sumP}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="${this.sumK}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="${this.sumPN}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column  width="48px"></vaadin-grid-column>
                
                <vaadin-grid-column header="${this.sumS_kor}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="${this.sumS2_kor}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="${this.sumO_kor}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="${this.sumP_kor}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="${this.sumK_kor}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="${this.sumPN_kor}" width="123px"></vaadin-grid-column>
                
            </vaadin-grid> -->
                
            
                
            <vaadin-grid id="gridZam" class="gridZam" .items="${feedViewStore.stanyZywionychNaDzien}" style="width: 100%; height: 80%" theme="column-borders" all-rows-visible
                         @size-changed="${() => this.requestUpdate()}"
                         @active-item-changed="${(e: GridActiveItemChangedEvent<StanZywionychNaDzienDTO>) => {
                             const item = e.detail.value;
                             if (item !== null) {
                                 feedViewStore.selectItemChange(item);  
                                 this.dietName = item.dietaNazwa
                             }
                         }}"
                         .detailsOpenedItems="${this.detailsOpenedItem}"
                         ${gridRowDetailsRenderer<StanZywionychNaDzienDTO>(
                                 (item) => html`
                            <vaadin-form-layout .responsiveSteps="${[{ minWidth: '0', columns: 3 }]}">
                              <vaadin-text-field
                                label="Uwagi" style="width:800px"
                                .value="${item.szUwagi}"
                                @value-changed=${(e: CustomEvent) => this.updateState(item, 0, e.detail.value as string, "comment")}
                                @click=${(e: CustomEvent) => this.updateClickState(item, "")}
                                colspan="1"></vaadin-text-field>
                              <vaadin-text-field
                                      label="Uwagi Korekta" style="width:800px"
                                      .value="${item.szUwagi}"
                                      @value-changed=${(e: CustomEvent) => this.updateState(item, 0, e.detail.value as string, "comment")}
                                      @click=${(e: CustomEvent) => this.updateClickState(item, "")}
                                      colspan="3"></vaadin-text-field>
                            </vaadin-form-layout>
                          `,[])}
                        >

                <vaadin-grid-column path="lp" width="48px"></vaadin-grid-column>
                <vaadin-grid-column header="Dieta Nazwa" .renderer="${this.dietNameRenderer}" ${columnFooterRenderer(this.footerRendererDesc, [])}
                                    width="245px" resizable></vaadin-grid-column>
  
                
                <vaadin-grid-column-group header="Planowanie">
                <vaadin-grid-column header="Ś" .renderer="${this.valueRendererS}" ${columnFooterRenderer(this.footerRendererSumS, [this.sumS])} width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="IIŚ" .renderer="${this.valueRendererIIS}" ${columnFooterRenderer(this.footerRendererSumS2, [this.sumS])} width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="O"   .renderer="${this.valueRendererO}" ${columnFooterRenderer(this.footerRendererSumO, [this.sumS])} width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="P"   .renderer="${this.valueRendererP}" ${columnFooterRenderer(this.footerRendererSumP, [this.sumS])} width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="K"   .renderer="${this.valueRendererK}" ${columnFooterRenderer(this.footerRendererSumK, [this.sumS])} width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="PN"  .renderer="${this.valueRendererPN}" ${columnFooterRenderer(this.footerRendererSumPN, [this.sumS])} width="123px"></vaadin-grid-column>
                <vaadin-grid-column width="48px"
                            ${columnBodyRenderer<StanZywionychNaDzienDTO>(
                                    (item) => html`
                                      <vaadin-button 
                                        theme="tertiary small"
                                        @click="${() => {
                                        const isOpened = this.detailsOpenedItem.includes(item);
                                        this.detailsOpenedItem = isOpened
                                                ? this.detailsOpenedItem.filter((p) => p !== item)
                                                : [...this.detailsOpenedItem, item];
                                    }}"
                >+</vaadin-button>
            `,
                                    []
                            )}
                    ></vaadin-grid-column>
                </vaadin-grid-column-group>
                

                <vaadin-grid-column-group class="gridCorrection" header="Korekta" >
                <vaadin-grid-column header="Ś"   .renderer="${this.valueRendererS_kor}" ${columnFooterRenderer(this.footerRendererSumS_k, [this.sumS_kor])}  width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="IIŚ" .renderer="${this.valueRendererIIS_kor}" ${columnFooterRenderer(this.footerRendererSumS2_k, [this.sumS2_kor])} width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="O"   .renderer="${this.valueRendererO_kor}" ${columnFooterRenderer(this.footerRendererSumO_k, [this.sumO_kor])} width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="P"   .renderer="${this.valueRendererP_kor}" ${columnFooterRenderer(this.footerRendererSumP_k, [this.sumP_kor])} width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="K"   .renderer="${this.valueRendererK_kor}" ${columnFooterRenderer(this.footerRendererSumK_k, [this.sumK_kor])} width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="PN"  .renderer="${this.valueRendererPN_kor}" ${columnFooterRenderer(this.footerRendererSumPN_k, [this.sumPN_kor])} width="123px"></vaadin-grid-column>
                </vaadin-grid-column-group>
            </vaadin-grid>
    </div>
        `;
    }


    private footerRendererDesc  = () => { return html`<span>Razem: / <span style="color: red">Korekta + Plan</span></span>`; }
    private footerRendererSumS  = () => { return html`<span>${this.sumS}</span>`; }
    private footerRendererSumS2 = () => { return html`<span>${this.sumS2}</span>`; }
    private footerRendererSumO  = () => { return html`<span>${this.sumO}</span>`; }
    private footerRendererSumP  = () => { return html`<span>${this.sumP}</span>`; }
    private footerRendererSumK  = () => { return html`<span>${this.sumK}</span>`; }
    private footerRendererSumPN = () => { return html`<span>${this.sumPN}</span>`; }
    private footerRendererSumS_k  = () => { return html`<span style="color: red">${this.sumS_kor}</span>`; }
    private footerRendererSumS2_k = () => { return html`<span style="color: red">${this.sumS2_kor}</span>`; }
    private footerRendererSumO_k  = () => { return html`<span style="color: red">${this.sumO_kor}</span>`; }
    private footerRendererSumP_k  = () => { return html`<span style="color: red">${this.sumP_kor}</span>`; }
    private footerRendererSumK_k  = () => { return html`<span style="color: red">${this.sumK_kor}</span>`; }
    private footerRendererSumPN_k = () => { return html`<span style="color: red">${this.sumPN_kor}</span>`; }


    async gzChanged(e: CustomEvent) {
        this.sumS = 0;
        feedViewStore.idGZ = e.detail.value as number;
        await feedViewStore.getStanyZywionychNaDzien();
        await this.calcTotal()
    }

    private dietNameRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        render(html` <span title='${model.item.dietaNazwa}'>${model.item.dietaNazwa}</span>`, root);
    };

    // plan

    private valueRendererS = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.sniadaniePlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" id="${model.item.dietaNazwa}_S" .readonly="${feedViewStore.sBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "s")} 
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}                                                                        
               value="${model.item.sniadaniePlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererIIS = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.drugieSniadaniePlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" id="${model.item.dietaNazwa}_2s" .readonly="${feedViewStore.s2Block}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "2s")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}                                                                      
               value="${model.item.drugieSniadaniePlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererO = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.obiadPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" id="${model.item.dietaNazwa}_O" .readonly="${feedViewStore.oBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "o")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}
               value="${model.item.obiadPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererP = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.podwieczorekPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" id="${model.item.dietaNazwa}_P" .readonly="${feedViewStore.pBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "p")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}
               value="${model.item.podwieczorekPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererK = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.kolacjaPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" id="${model.item.dietaNazwa}_K" .readonly="${feedViewStore.kBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "k")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}
               value="${model.item.kolacjaPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererPN = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.posilekNocnyPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" id="${model.item.dietaNazwa}_PN" .readonly="${feedViewStore.pnBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "pn")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}
               value="${model.item.posilekNocnyPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    // kor
    private valueRendererS_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.sniadanieKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${feedViewStore.sBlock_kor}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "s_kor")} 
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "kor")}                                                                        
               value="${model.item.sniadanieKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererIIS_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.drugieSniadanieKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${feedViewStore.s2Block_kor}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "2s_kor")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "kor")}                                                                      
               value="${model.item.drugieSniadanieKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererO_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.obiadKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${feedViewStore.oBlock_kor}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "o_kor")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "kor")}
               value="${model.item.obiadKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererP_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.podwieczorekKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${feedViewStore.pBlock_kor}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "p_kor")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "kor")}
               value="${model.item.podwieczorekKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererK_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.kolacjaKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${feedViewStore.kBlock_kor}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "k_kor")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "kor")}
               value="${model.item.kolacjaKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererPN_kor = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.posilekNocnyKorIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-kor" .readonly="${feedViewStore.pnBlock_kor}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "pn_kor")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "kor")}
               value="${model.item.posilekNocnyKorIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }


    correctionActive() {
        if (this.czyKorekta === false) {
            this.czyKorekta = true
            this.status = "Korekta"
            this.styl = "badge error"
        } else {
            this.czyKorekta = false
            this.status = "Edycja"
            this.styl = "badge";
        }
    }

    rendererComments: NotificationLitRenderer = () => {
        return html`
      <vaadin-horizontal-layout theme="spacing" >
          <vaadin-grid .items="${feedViewStore.stanyZywionychNaDzien}" style="width: 1800px; height: 400px">
              <vaadin-grid-column path="dietaNazwa" header="Dieta" width="300px" text-align="start"></vaadin-grid-column>
              <vaadin-grid-column path="szUwagi" header="Uwagi" width="1450px" text-align="start"></vaadin-grid-column>
          </vaadin-grid>
        <vaadin-button theme="tertiary-inline" @click="${this.close}" aria-label="Close">
          <vaadin-icon icon="lumo:cross"></vaadin-icon>
        </vaadin-button>
      </vaadin-horizontal-layout>
    `;
    };

    async updateState( item: StanZywionychNaDzienDTO, value: number, comment : String, type: string){
        if (type === "s") {
            item.sniadaniePlanIl = value as number; item.obiadPlanIl = value as number; item.kolacjaPlanIl = value as number;

                let numEl1 = item.dietaNazwa+"_O";
                let numEl2 = item.dietaNazwa+"_K";
                let e1 = document.getElementById(numEl1);
                let e2 = document.getElementById(numEl2);
                // @ts-ignore
                e1.value = value as number;
                // @ts-ignore
                e2.value = value as number;

        }
        else if (type === "2s") { item.drugieSniadaniePlanIl = value as number }
        else if (type === "o") { item.obiadPlanIl = value as number }
        else if (type === "p") { item.podwieczorekPlanIl = value as number }
        else if (type === "k") { item.kolacjaPlanIl = value as number }
        else if (type === "pn") { item.posilekNocnyPlanIl = value as number }
        else if (type === "comment") { item.szUwagi = comment as string }
        else if (type === "s_kor") { item.sniadanieKorIl = value as number }
        else if (type === "2s_kor") { item.drugieSniadanieKorIl = value as number }
        else if (type === "o_kor") { item.obiadKorIl = value as number }
        else if (type === "p_kor") { item.podwieczorekKorIl = value as number }
        else if (type === "k_kor") { item.kolacjaKorIl = value as number }
        else if (type === "pn_kor") { item.posilekNocnyKorIl = value as number }
        await this.calcTotal()
    }

    async calcTotal() {
        this.sumS = 0; this.sumS2 = 0; this.sumO = 0; this.sumP = 0; this.sumK = 0; this.sumPN = 0;
        this.sumS_kor = 0; this.sumS2_kor = 0; this.sumO_kor = 0; this.sumP_kor = 0; this.sumK_kor = 0; this.sumPN_kor = 0;
        let sumS_korL = 0; let sumS2_kor = 0; let sumO_korL = 0; let sumP_korL = 0; let sumK_korL = 0; let sumPN_korL = 0;
        await feedViewStore.stanyZywionychNaDzien.forEach( item => {
            this.sumS += Number(item.sniadaniePlanIl) ? Number(item.sniadaniePlanIl) : 0;
            this.sumS2 += Number(item.drugieSniadaniePlanIl) ? Number(item.drugieSniadaniePlanIl) : 0;
            this.sumO += Number(item.obiadPlanIl) ? Number(item.obiadPlanIl) : 0;
            this.sumP += Number(item.podwieczorekPlanIl) ? Number(item.podwieczorekPlanIl) : 0;
            this.sumK += Number(item.kolacjaPlanIl) ? Number(item.kolacjaPlanIl) : 0;
            this.sumPN += Number(item.posilekNocnyPlanIl) ? Number(item.posilekNocnyPlanIl) : 0;

            sumS_korL += Number(item.sniadanieKorIl) ? Number(item.sniadanieKorIl) : 0;
            sumS2_kor += Number(item.drugieSniadanieKorIl) ? Number(item.drugieSniadanieKorIl) : 0;
            sumO_korL += Number(item.obiadKorIl) ? Number(item.obiadKorIl) : 0;
            sumP_korL += Number(item.podwieczorekKorIl) ? Number(item.podwieczorekKorIl) : 0;
            sumK_korL += Number(item.kolacjaKorIl) ? Number(item.kolacjaKorIl) : 0;
            sumPN_korL += Number(item.posilekNocnyKorIl) ? Number(item.posilekNocnyKorIl) : 0;
        })

        this.sumS_kor = this.sumS + sumS_korL
        this.sumS2_kor = this.sumS2 + sumS2_kor
        this.sumO_kor = this.sumO + sumO_korL
        this.sumP_kor = this.sumP + sumP_korL
        this.sumK_kor = this.sumK + sumK_korL
        this.sumPN_kor = this.sumPN + sumPN_korL
    }

    updateClickState( item: StanZywionychNaDzienDTO, typeOfFeed : String){

        if ( typeOfFeed === "kor" && this.czyKorekta === false) {
            const notification = Notification.show("Aktywuj korektę! Uwaga wartości zmienione na korekcie nie zostaną zapisane.", {position: 'middle', duration: 2000});
            notification.setAttribute('theme', 'error');
        }

        if ( typeOfFeed === "" && this.czyKorekta === true) {
            const notification = Notification.show("Dezaktywuj korektę! Uwaga wartości zmienione na planie nie zostaną zapisane.", {position: 'middle', duration: 2000});
            notification.setAttribute('theme', 'primary');
        }

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
        feedViewStore.blockHours = blockHours;
        await feedViewStore.checkBlockadeHours()
    }

    async getGzList() {
        const gzList = await GrupaZywionychEndpoint.getAllGzForKkId(this.idKK);
        this.gzList = gzList;
    }

    async save() {
        const ret = await StanyZywionychEndpoint.zapiszStanZyw(feedViewStore.startDate, feedViewStore.idGZ, feedViewStore.sortType, this.idKK, this.czyKorekta === true ? "T" : "N"
            , appStore.user?.operatorId,  feedViewStore.stanyZywionychNaDzien.filter((obj) => { return obj.dataChanged === true }));
        const notification = Notification.show(ret, {position: 'middle', duration: 1000});
        notification.setAttribute('theme', 'success');
        // feedViewStore.stanyZywionychNaDzien.filter((obj) => { return obj.dataChanged === true }).forEach((stanZ) =>{
        //     stanZ.dataChanged = false;
        // })
        await feedViewStore.getStanyZywionychNaDzien();
        await this.calcTotal()
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
        this.notCommentsOpened = false;
    }


    itemSelected(e: MenuBarItemSelectedEvent) {

        if ( e.detail.value.text === 'Księga receptur' ) {
            repJadlospisStore.dialogRep01Change(true)
        } else if ( e.detail.value.text === 'Księga receptur PRO' ) {
            repJadlospisproStore.dialogRepJadlospisProChange(true)
        }

    }

}
