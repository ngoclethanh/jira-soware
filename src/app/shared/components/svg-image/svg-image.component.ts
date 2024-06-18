import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg-image',
  standalone: true,
  imports: [],
  template: `
    <svg
      [attr.fill]="fill"
      [class]="svgClass"
    >
      <use [attr.xlink:href]="'assets/icons/icons.svg#' + src"></use>
    </svg>
  `,
  styles: [],
  host: {
    style: `
      display: inline-flex;
    `,
  },
})
export class SvgImageComponent {
  @Input({ required: true }) src: string | undefined;
  @Input() fill: string|undefined;
  @Input() svgClass: string|undefined;
}
