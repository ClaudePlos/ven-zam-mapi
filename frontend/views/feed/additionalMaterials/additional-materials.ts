import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@vaadin/button';
import '@vaadin/notification';
import '@vaadin/dialog';
import '@vaadin/vertical-layout';

import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import '@vaadin/text-field';
import {MobxLitElement} from "@adobe/lit-mobx";
import {additionalMaterialsStore} from './additional-materials-store';
import {applyTheme} from "Frontend/generated/theme";
import { dialogRenderer, dialogHeaderRenderer } from '@vaadin/dialog/lit.js';

@customElement('additional-materials')
export class AdditionalMaterials extends MobxLitElement {
    name = '';

    protected createRenderRoot() {
        const root = super.createRenderRoot();
        // Apply custom theme (only supported if your app uses one)
        applyTheme(root);
        return root;
    }

    render() {
        return html`
            <vaadin-dialog
                    header-title="Materiały dodatkowe"
                    resizable
                    draggable
                    .opened="${additionalMaterialsStore.dialogAdditionalMaterialsOpened}"
                    @opened-changed="${(e: DialogOpenedChangedEvent) => (additionalMaterialsStore.dialogAdditionalMaterialsChange(e.detail.value) )}"
                    }
                    ${dialogHeaderRenderer(
                            () => html`
                              <vaadin-button theme="tertiary" @click="${() => (additionalMaterialsStore.dialogAdditionalMaterialsOpened = false)}">
                              <vaadin-icon icon="lumo:cross"></vaadin-icon>
                            </vaadin-button>
                          `,
                            []
                    )}
                    ${dialogRenderer(this.renderDialog, [])}
            >
                
                test
            </vaadin-dialog>
    `;
    }

    private renderDialog = () => html`
    <vaadin-vertical-layout style="align-items: stretch; width: 18rem; max-width: 100%; width: 1400px; height: 800px;">

     TEST
        
    </vaadin-vertical-layout>
  `;


}
