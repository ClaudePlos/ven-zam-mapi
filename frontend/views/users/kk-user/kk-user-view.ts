import { css, html, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@vaadin/grid';
import type { GridDragStartEvent, GridItemModel } from '@vaadin/grid';
import { KierunekKosztowEndpoint } from "Frontend/generated/endpoints";
import KierunekKosztowVO from "Frontend/generated/pl/kskowronski/data/entity/mapi/KierunekKosztowVO";
import { applyTheme } from 'Frontend/generated/theme';
import {MobxLitElement} from "@adobe/lit-mobx";
import {kkUserViewStore} from "Frontend/views/users/kk-user/kk-user-view-store";

@customElement('kk-user-view')
export class KkUserView extends MobxLitElement {
    protected createRenderRoot() {
        const root = super.createRenderRoot();
        // Apply custom theme (only supported if your app uses one)
        applyTheme(root);
        return root;
    }

    static get styles() {
        return css`
      .grids-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      vaadin-grid {
        width: 300px;
        height: 300px;
        margin-left: 0.5rem;
        margin-top: 0.5rem;
        align-self: unset;
      }
    `;
    }

    @state()
    private draggedItem?: KierunekKosztowVO;

    async firstUpdated() {

    }

    private startDraggingItem = (event: GridDragStartEvent<KierunekKosztowVO>) => {
        console.log("startDraggingItem")
        this.draggedItem = event.detail.draggedItems[0];
    };

    private clearDraggedItem = () => {
        console.log("clearDraggedItem")
        delete this.draggedItem;
    };

    render() {
        return html`<div><p>Zaznaczony użytkownik to: <b><h3> ${kkUserViewStore.username}</h3></b></p></div>
      <div class="grids-container">
        <vaadin-grid
          .items="${kkUserViewStore.grid1Items}"
          ?rows-draggable="${true}"
          drop-mode="on-grid"
          @grid-dragstart="${this.startDraggingItem}"
          @grid-dragend="${this.clearDraggedItem}"
          @grid-drop="${() => {
            const draggedKK = this.draggedItem as KierunekKosztowVO;
            const draggedItemIndex = kkUserViewStore.grid2Items.indexOf(draggedKK);
            if (draggedItemIndex >= 0) {
                // remove the item from its previous position
                kkUserViewStore.grid2Items.splice(draggedItemIndex, 1);
                // re-assign the array to refresh the grid
                kkUserViewStore.grid2Items = [...kkUserViewStore.grid2Items];
                // re-assign the array to refresh the grid
                kkUserViewStore.grid1Items = [...kkUserViewStore.grid1Items, draggedKK];
                KierunekKosztowEndpoint.saveSetting(kkUserViewStore.userId, draggedKK.idKierunekKosztow);
            }
        }}"
        >
          <vaadin-grid-column
            header="Przypisane KK do użytkownika"
            .renderer="${this.fullNameRenderer}"
          ></vaadin-grid-column>
        </vaadin-grid>

        <vaadin-grid
          .items="${kkUserViewStore.grid2Items}"
          ?rows-draggable="${true}"
          drop-mode="on-grid"
          @grid-dragstart="${this.startDraggingItem}"
          @grid-dragend="${this.clearDraggedItem}"
          @grid-drop="${() => {
            const draggedKK = this.draggedItem as KierunekKosztowVO;
            const draggedItemIndex = kkUserViewStore.grid1Items.indexOf(draggedKK);
            if (draggedItemIndex >= 0) {
                // remove the item from its previous position
                kkUserViewStore.grid1Items.splice(draggedItemIndex, 1);
                // re-assign the array to refresh the grid
                kkUserViewStore.grid1Items = [...kkUserViewStore.grid1Items];
                // re-assign the array to refresh the grid
                kkUserViewStore.grid2Items = [...kkUserViewStore.grid2Items, draggedKK];
                KierunekKosztowEndpoint.deleteSetting(kkUserViewStore.userId, draggedKK.idKierunekKosztow);
            }
        }}"
        >
          <vaadin-grid-column
            header="Kierunek Kosztów Nazwa"
            .renderer="${this.fullNameRenderer}"
          ></vaadin-grid-column>
        </vaadin-grid>
      </div>
    `;
    }

    private fullNameRenderer = (root: HTMLElement, _: HTMLElement, model: GridItemModel<KierunekKosztowVO>) => {
        const k: KierunekKosztowVO = model.item;
        render(html`${k.kierunekKosztowNazwa} ${k.kierunekKosztowKod}`, root);
    };
}