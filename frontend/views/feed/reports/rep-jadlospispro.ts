import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/vertical-layout';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { dialogRenderer, dialogHeaderRenderer } from '@vaadin/dialog/lit.js';
import { applyTheme } from 'Frontend/generated/theme';
import { feedViewStore } from '../feed-view-store';
import { repJadlospisproStore } from '../reports/rep-jadlospispro-store';
import {MobxLitElement} from "@adobe/lit-mobx";

@customElement('rep-jadlospispro')
export class RepJadlospispro extends MobxLitElement {

    protected createRenderRoot() {
        const root = super.createRenderRoot();
        // Apply custom theme (only supported if your app uses one)
        applyTheme(root);
        return root;
    }

    render() {
        return html`
            <vaadin-dialog
                    header-title="Raport"
                    resizable
                    draggable
                    .opened="${repJadlospisproStore.dialogRepJadlospisPro}"
                    @opened-changed="${(e: DialogOpenedChangedEvent) => (repJadlospisproStore.dialogRepJadlospisProChange(e.detail.value))}"
                    }
                    ${dialogHeaderRenderer(
                            () => html`
                            <vaadin-button theme="tertiary" @click="${() => (repJadlospisproStore.dialogRepJadlospisPro = false)}">
                              <vaadin-icon icon="lumo:cross"></vaadin-icon>
                            </vaadin-button>
                          `,
                            []
                    )}
                    ${dialogRenderer(this.renderDialog, [])}
            >
            </vaadin-dialog>
    `;
    }

    private renderDialog = () => html`
    <vaadin-vertical-layout style="align-items: stretch; width: 18rem; max-width: 100%; width: 1600px; height: 800px;">
        <span>Dieta: ${feedViewStore.selectedItem?.dietaNazwa} Na dzień: ${feedViewStore.startDate}</span>
        <vaadin-button theme="secondary error icon small"  style="width: 100px" @click="${() => (repJadlospisproStore.genPDF())}">pdf</vaadin-button>
        <div class="jadlospisTable">
            <table id="jadlospisTable"></table>
            <label id="descAlergen"></label>
        </div>
        
    </vaadin-vertical-layout>
  `;


}
