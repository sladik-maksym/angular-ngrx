import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appButtonHoverEffect]',
  standalone: true,
})
export class ButtonHoverEffectDirective {
  @Input() public appButtonHoverEffect: string = '1';
  @Input() public appDefaultButtonHoverEffect: string = '1';

  constructor(private element: ElementRef<HTMLButtonElement>) {}

  ngAfterViewInit() {
    this.changeOpacity(this.appDefaultButtonHoverEffect);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeOpacity(this.appButtonHoverEffect);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeOpacity(this.appDefaultButtonHoverEffect);
  }

  private changeOpacity(opacity: string) {
    this.element.nativeElement.style.opacity = opacity;
  }
}
