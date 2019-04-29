import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DropdownComponent } from './dropdown.component';
import { DropdownItem } from './dropdown-item.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownItem
  ],
  imports: [BrowserModule],
  entryComponents: [DropdownComponent]
})
export class DropdownModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(DropdownComponent, { injector });
    customElements.define('ng-dropdown-element', el);
  }
  ngDoBootstrap() { }
}
