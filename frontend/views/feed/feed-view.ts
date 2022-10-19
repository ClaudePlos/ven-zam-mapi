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
import '@vaadin/checkbox';
import '@vaadin/text-field';
import '@vaadin/dialog';


import { html, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {Notification} from "@vaadin/notification";
import type { NotificationOpenedChangedEvent } from '@vaadin/notification';
import { notificationRenderer } from '@vaadin/notification/lit.js';
import type { NotificationLitRenderer } from '@vaadin/notification/lit.js';
import { gridRowDetailsRenderer } from '@vaadin/grid/lit.js';
import type { GridActiveItemChangedEvent } from '@vaadin/grid';
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
import dateFnsParse from "date-fns/parse";

@customElement('feed-view')
export class FeedView extends View {

    idKK: number = 0;

    @state()
    czyKorekta: boolean = false;

    @state()
    private detailsOpenedItem: StanZywionychNaDzienDTO[] = [];

    @state()
    styl: string = "badge";

    @state()
    status: string = "Edycja";

    @state()
    private kkList: KierunekKosztowVO[] = [];

    @state()
    private gzList: GrupaZywionychVO[] = [];


    private binder = new Binder(this, StanZywionychNaDzienDTOModel);

    @state()
    private notificationOpened = false;


    @state()
    private textOpenHours : string = " test";

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


    async firstUpdated() {
        const kkList = await KierunekKosztowEndpoint.findAllUserKK(appStore.user?.id);
        this.kkList = kkList;
    }

    render() {

        const { model } = this.binder;

        return html`
            <div style="width: 99%; height: 100%; padding-left: 5px">
            <div><claude-date></claude-date>
                <vaadin-combo-box  label="Kierunek kosztów" theme="small"
                                   .items="${this.kkList}"
                                   @value-changed="${this.kkChanged}"
                                   item-label-path="kierunekKosztowNazwa"
                                   item-value-path="idKierunekKosztow"
                                   allow-custom-value style="width:300px"
                                   label="Browser"
                                   helper-text="Wybierz kierunk koszótw"
                ></vaadin-combo-box>
                <vaadin-combo-box  label="Grupa żywionych" theme="small"
                                   .items="${this.gzList}"
                                   @value-changed="${this.gzChanged}"
                                   item-label-path="grupaZywionych"
                                   item-value-path="idGrupaZywionych"
                                   allow-custom-value style="width:300px"
                                   label="Browser"
                                   helper-text="Wybierz grupę żywionych"
                ></vaadin-combo-box>
                <vaadin-button theme="secondary small" @click=${this.save}>Zapisz</vaadin-button>
                <vaadin-button theme="secondary error icon small" @click="${() => (this.notificationOpened = true)}" .disabled="${this.notificationOpened}">i</vaadin-button>
                <vaadin-notification
                        duration="0"
                        position="top-stretch"
                        .opened="${this.notificationOpened}"
                        @opened-changed="${(e: NotificationOpenedChangedEvent) => {
                            this.notificationOpened = e.detail.value;
                        }}"
                        ${notificationRenderer(this.renderer, [])}
                ></vaadin-notification>
                <vaadin-checkbox theme="small" .checked=${this.czyKorekta} label="Aktywuj korektę"  @click="${() => (this.correctionActive())}"></vaadin-checkbox>
                <span theme="${this.styl}">
                  <span>${this.status}</span>
                </span>
            </div>
            <vaadin-grid class="gridZam" .items="${feedViewStore.stanyZywionychNaDzien}" style="width: 100%; height: 90%" theme="column-borders"

                         .detailsOpenedItems="${this.detailsOpenedItem}"
                         @active-item-changed="${(e: GridActiveItemChangedEvent<StanZywionychNaDzienDTO>) =>
                                 (this.detailsOpenedItem = [e.detail.value])}"
                         ${gridRowDetailsRenderer<StanZywionychNaDzienDTO>(
                                 (item) => html`
            <vaadin-form-layout .responsiveSteps="${[{ minWidth: '0', columns: 1 }]}">
              <vaadin-text-field
                label="Uwagi"
                .value="${item.szUwagi}"
                colspan="5"
                readonly
              >
            </vaadin-form-layout>
          `,
                                 []
                         )}
            
            >

                <vaadin-grid-column path="lp" width="48px"></vaadin-grid-column>
                <vaadin-grid-column header="Dieta Nazwa" .renderer="${this.dietNameRenderer}" width="245px" resizable></vaadin-grid-column>
  
                
                <vaadin-grid-column-group header="Planowanie">
                <vaadin-grid-column header="Ś (${this.sumS})" .renderer="${this.valueRendererS}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="IIŚ (${this.sumS2})" .renderer="${this.valueRendererIIS}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="O (${this.sumO})"   .renderer="${this.valueRendererO}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="P (${this.sumP})"   .renderer="${this.valueRendererP}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="K (${this.sumK})"   .renderer="${this.valueRendererK}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="PN (${this.sumPN})"  .renderer="${this.valueRendererPN}" width="123px"></vaadin-grid-column>
                </vaadin-grid-column-group>
                

                <vaadin-grid-column-group class="gridCorrection" header="Korekta" >
                <vaadin-grid-column header="Ś (${this.sumS_kor})"   .renderer="${this.valueRendererS_kor}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="IIŚ (${this.sumS2_kor})" .renderer="${this.valueRendererIIS_kor}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="O (${this.sumO_kor})"   .renderer="${this.valueRendererO_kor}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="P (${this.sumP_kor})"   .renderer="${this.valueRendererP_kor}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="K (${this.sumK_kor})"   .renderer="${this.valueRendererK_kor}" width="123px"></vaadin-grid-column>
                <vaadin-grid-column header="PN (${this.sumPN_kor})"  .renderer="${this.valueRendererPN_kor}" width="123px"></vaadin-grid-column>
                </vaadin-grid-column-group>
            </vaadin-grid>
    </div>`;
    }

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
        model.item.sniadaniePlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${feedViewStore.sBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "s")} 
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}                                                                        
               value="${model.item.sniadaniePlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererIIS = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.drugieSniadaniePlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${feedViewStore.s2Block}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "2s")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}                                                                      
               value="${model.item.drugieSniadaniePlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererO = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.obiadPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${feedViewStore.oBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "o")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}
               value="${model.item.obiadPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererP = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.podwieczorekPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${feedViewStore.pBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "p")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}
               value="${model.item.podwieczorekPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererK = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.kolacjaPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${feedViewStore.kBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "k")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}
               value="${model.item.kolacjaPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    private valueRendererPN = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
        model.item.posilekNocnyPlanIl !== undefined ? render(html` <vaadin-integer-field theme="small" class="field-plan" .readonly="${feedViewStore.pnBlock}"
            has-controls @value-changed=${(e: CustomEvent) => this.updateState(model.item, e.detail.value as number, "", "pn")}
                         @click=${(e: CustomEvent) => this.updateClickState(model.item, "")}
               value="${model.item.posilekNocnyPlanIl as number}" ></vaadin-integer-field>`, root) : render(html``,root);
    }

    // comment
    // private valueRendererComments = (root: HTMLElement, _: HTMLElement, model: GridItemModel<StanZywionychNaDzienDTO>) => {
    //     render(html` <vaadin-text-field
    //             @value-changed=${(e: CustomEvent) => this.updateState(model.item, 0, e.detail.value as string, "comment")}
    //             value="${model.item.szUwagi as string}"></vaadin-text-field>`, root) ;
    // }

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



    renderer: NotificationLitRenderer = () => {
        return html`
      <vaadin-horizontal-layout theme="spacing" style="align-items: center;">
        <div>Plan/Korekta:<p style="color:red"> Godz zablokowane:${feedViewStore.textBlockadeHours}</p> Godz otwarte:${this.textOpenHours}</div>
        <vaadin-button theme="tertiary-inline" @click="${this.close}" aria-label="Close">
          <vaadin-icon icon="lumo:cross"></vaadin-icon>
        </vaadin-button>
      </vaadin-horizontal-layout>
    `;
    };

    async updateState( item: StanZywionychNaDzienDTO, value: number, comment : String, type: string){
        if (type === "s") {item.sniadaniePlanIl = value as number}
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
            sumS2_kor += Number(item.drugieSniadanieKorIl) ? this.sumS2 + Number(item.drugieSniadanieKorIl) : 0;
            sumO_korL += Number(item.obiadKorIl) ? this.sumO + Number(item.obiadKorIl) : 0;
            sumP_korL += Number(item.podwieczorekKorIl) ? this.sumP + Number(item.podwieczorekKorIl) : 0;
            sumK_korL += Number(item.kolacjaKorIl) ? this.sumK + Number(item.kolacjaKorIl) : 0;
            sumPN_korL += Number(item.posilekNocnyKorIl) ?  this.sumPN + Number(item.posilekNocnyKorIl) : 0;
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
            this.correctionActive()
            const notification = Notification.show("Aktywuję korektę! Uwaga wartości zmienione na korekcie nie zostaną zapisane.", {position: 'middle', duration: 2000});
            notification.setAttribute('theme', 'error');
        }

        if ( typeOfFeed === "" && this.czyKorekta === true) {
            this.correctionActive()
            const notification = Notification.show("Dezaktywuję korektę! Uwaga wartości zmienione na planie nie zostaną zapisane.", {position: 'middle', duration: 2000});
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
        this.notificationOpened = false;
    }

}
