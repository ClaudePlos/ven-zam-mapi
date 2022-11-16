import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/vertical-layout';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { dialogRenderer, dialogHeaderRenderer } from '@vaadin/dialog/lit.js';
import { applyTheme } from 'Frontend/generated/theme';
import { feedViewStore } from '../feed-view-store';
import { repWartodzywcze2Store } from '../reports/rep-wartodzywcze2-store';
import {MobxLitElement} from "@adobe/lit-mobx";

@customElement('rep-wartodzywcze2')
export class RepWartodzywcze2 extends MobxLitElement {

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
                    .opened="${repWartodzywcze2Store.dialogRepWartodzywcze2}"
                    @opened-changed="${(e: DialogOpenedChangedEvent) => (repWartodzywcze2Store.dialogRepWartOdzywczaChange(e.detail.value))}"
                    }
                    ${dialogHeaderRenderer(
                            () => html`
                            <vaadin-button theme="tertiary" @click="${() => (repWartodzywcze2Store.dialogRepWartodzywcze2 = false)}">
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
    <vaadin-vertical-layout style="align-items: stretch; width: 18rem; max-width: 100%; width: 1800px; height: 400px;">
        <span>Dieta: ${feedViewStore.selectedItem?.dietaNazwa} Na dzień: ${feedViewStore.startDate}</span>
        <vaadin-button theme="secondary error icon small" style="width: 100px" @click="${() => (repWartodzywcze2Store.genPDF())}">pdf</vaadin-button>
        <div class="wartodzywcze2Table"><table id="wartodzywcze2Table" style="border: 1px solid black; border-collapse: collapse;"></table></div>
        
    </vaadin-vertical-layout>
  `;


}
