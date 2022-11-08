import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/vertical-layout';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { dialogRenderer } from '@vaadin/dialog/lit.js';
import { applyTheme } from 'Frontend/generated/theme';
import { feedViewStore } from '../feed-view-store';
import { repJadlospisStore } from '../reports/rep-jadlospis-store';
import {MobxLitElement} from "@adobe/lit-mobx";

@customElement('rep-jadlospis')
export class RepJadlospis extends MobxLitElement {

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
                    .opened="${repJadlospisStore.dialogRep01}"
                    @opened-changed="${(e: DialogOpenedChangedEvent) => (repJadlospisStore.dialogRep01Change(e.detail.value))}"
                    }
                    ${dialogRenderer(this.renderDialog, [])}
            >
            </vaadin-dialog>
    `;
    }


    private renderDialog = () => html`
    <vaadin-vertical-layout style="align-items: stretch; width: 18rem; max-width: 100%; width: 1400px; height: 800px;">
        <span>Dieta: ${feedViewStore.selectedItem?.dietaNazwa} Na dzień: ${feedViewStore.startDate}</span>

        <div class="jadlospisTable">
            <table id="jadlospisTable"></table>
        </div>
        
    </vaadin-vertical-layout>
  `;


}
