import '@vaadin/button';
import '@vaadin/notification';
import { Notification } from '@vaadin/notification';
import type { DialogOpenedChangedEvent } from '@vaadin/dialog';
import '@vaadin/text-field';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {MobxLitElement} from "@adobe/lit-mobx";
import {additionalMaterialsStore} from './additional-materials-store';

@customElement('additional-material')
export class AdditionalMaterials extends MobxLitElement {
    name = '';

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('flex', 'p-m', 'gap-m', 'items-end');
    }

    render() {
        return html`
            <vaadin-dialog
                    header-title="Materiały dodatkowe"
                    resizable
                    draggable
                    .opened="${additionalMaterialsStore.dialogAdditionalMaterialsOpened}"
                    @opened-changed="${(e: DialogOpenedChangedEvent) => (additionalMaterialsStore.dialogAdditionalMaterialsOpened = e.detail.value)}"
            >
                
                test
            </vaadin-dialog>
    `;
    }


}
