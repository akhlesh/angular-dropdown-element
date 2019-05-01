import {
  Component, OnInit, Input, Output,
  EventEmitter, HostListener, SimpleChanges, ViewChildren,
  QueryList, ElementRef, OnDestroy, OnChanges
} from '@angular/core';
import { isString, identity, keys } from './utils';
import { DropdownItem } from './dropdown-item.component';
import { DomSanitizer } from '@angular/platform-browser';

type fn = (item: any) => any;

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnDestroy, OnChanges {
  @Input() items: Array<any> = [];
  @Input() value: any = undefined;
  @Input() label: string | fn = identity;
  @Input() placeholder: string = 'Please select an item';
  @Output() valueChange = new EventEmitter();
  @Input() itemRenderer: (item: any) => string = (item) => `<span>${this.labelFn(item)}</span>`;
  @ViewChildren(DropdownItem) dropdownItems: QueryList<DropdownItem>;

  activeIndex = -1;
  activeItem = undefined;
  isOpen = false;
  labelFn: Function;
  private hostElement: HTMLElement

  constructor(elementRef: ElementRef, private sanitizer: DomSanitizer) {
    this.hostElement = elementRef.nativeElement;        
  }

  ngOnInit() {
    this.labelFn = isString(this.label as string) ? (item) => item[this.label as string] : this.label as Function;
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.items || change.value) {
      const index = this.items.indexOf(this.value);
      this.updateActiveIndexAndItem(Math.max(index, 0));
    }
  }

  isIndexOverflow(index) {
    return index >= this.items.length || index < 0;
  }

  updateActiveIndexAndItem(index: number) {
    if (this.isIndexOverflow(index)) {
      return;
    }
    this.activeIndex = index;
    this.scrollItemIntoView(index);
  }

  scrollItemIntoView(index: number) {
    const dropdownItem = this.dropdownItems && this.dropdownItems.toArray()[index];
    dropdownItem && dropdownItem.element.scrollIntoView({ block: "end", inline: "nearest" })
  }

  onItemClick(item) {
    this.selectItem(item);
    this.closeMenu();
  }

  selectItem(item: any) {
    this.value = item;
    this.valueChange.emit(item);
    this.updateActiveIndexAndItem(Math.max(this.items.indexOf(item), 0));
  }

  getSelectedLabel() {
    return this.value ? this.labelFn(this.value) : this.placeholder;
  }

  openMenu() {
    this.isOpen = true;
    document.addEventListener('click', this.documentClickHanlder);
    setTimeout(() => this.scrollItemIntoView(this.activeIndex));
  }

  closeMenu() {
    this.isOpen = false;
    document.removeEventListener('click', this.documentClickHanlder);
  }

  toggleMenu() {
    this.isOpen ? this.closeMenu() : this.openMenu();
  }

  getItemClass(item) {
    const classList = [
      item === this.value ? 'active' : '',
      'dropdown-item'
    ];

    return classList.join(' ').trim();
  }

  getItemHtml(item) {
    return this.sanitizer.bypassSecurityTrustHtml(this.itemRenderer(item));
  }

  containsElement(element: HTMLElement) {
    return this.hostElement.contains(element);
  }

  @HostListener('keydown', ['$event', '$event.keyCode'])
  keyDownListener(evt: KeyboardEvent, keyCode: number) {
    switch (keyCode) {
      case keys.DownArrow:
      case keys.UpArrow:
        const dir = keyCode === keys.DownArrow ? 1 : -1;
        const index = this.activeIndex + dir;
        !this.isIndexOverflow(index) && this.selectItem(this.items[index]);
        break;
      case keys.Enter:
        this.toggleMenu();
        break;
      case keys.Escape:
      case keys.Tab:
        this.closeMenu();
        break;
    }
  }

  documentClickHanlder = (e) => {
    !this.containsElement(e.target) && this.closeMenu();
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.documentClickHanlder);
  }

}
