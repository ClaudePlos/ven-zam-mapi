import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@vaadin/button';
import '@vaadin/dialog';
import '@vaadin/vertical-layout';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import { dialogFooterRenderer, dialogRenderer } from '@vaadin/dialog/lit.js';
import { applyTheme } from 'Frontend/generated/theme';
import { feedViewStore } from '../feed-view-store';
import {MobxLitElement} from "@adobe/lit-mobx";

@customElement('rep-01')
export class Rep01 extends MobxLitElement {

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
                    .opened="${feedViewStore.dialogRep01}"
                    @opened-changed="${(e: DialogOpenedChangedEvent) => (feedViewStore.dialogRep01Change(e.detail.value))}"
                    }
                    ${dialogRenderer(this.renderDialog, [])}
            >
            </vaadin-dialog>
    `;
    }


    private renderDialog = () => html`
    <vaadin-vertical-layout style="align-items: stretch; width: 18rem; max-width: 100%;">
      <vaadin-text-field label="First name"></vaadin-text-field>
      <vaadin-text-field label="Last name"></vaadin-text-field>
    </vaadin-vertical-layout>
  `;



}
