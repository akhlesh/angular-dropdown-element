import {Component, ElementRef} from '@angular/core';

@Component({
    selector: 'app-dropdown-item',
    template: '<ng-content></ng-content>'
})
export class DropdownItem {
    public element: HTMLElement;
    constructor(elementRef: ElementRef){
        this.element = elementRef.nativeElement;
    }
}