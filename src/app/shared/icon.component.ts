import { Component, Input } from '@angular/core';

export type IconName =
  | 'search'
  | 'x'
  | 'sun'
  | 'moon'
  | 'bell'
  | 'user'
  | 'logout'
  | 'grid'
  | 'basket'
  | 'bottle'
  | 'pill'
  | 'chevron-down'
  | 'send'
  | 'trash'
  | 'arrow-left'
  | 'arrow-right'
  | 'leaf'
  | 'linkedin'
  | 'mail'
  | 'github'
  | 'sort';

/** Inline stroke icons. Size it with classes on the element: <app-icon name="bell" class="h-5 w-5"> */
@Component({
  selector: 'app-icon',
  host: { class: 'inline-block shrink-0' },
  template: `
    <svg
      viewBox="0 0 24 24"
      class="block h-full w-full"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
      [attr.stroke-width]="stroke"
      [attr.fill]="filled ? 'currentColor' : 'none'"
      [ngSwitch]="name"
    >
      <g *ngSwitchCase="'search'"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></g>
      <g *ngSwitchCase="'x'"><path d="M18 6 6 18M6 6l12 12" /></g>
      <g *ngSwitchCase="'sun'"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g>
      <g *ngSwitchCase="'moon'"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></g>
      <g *ngSwitchCase="'bell'"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></g>
      <g *ngSwitchCase="'user'"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></g>
      <g *ngSwitchCase="'logout'"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></g>
      <g *ngSwitchCase="'grid'"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>
      <g *ngSwitchCase="'basket'"><path d="M3 9h18l-1.5 10a2 2 0 0 1-2 1.7H6.5a2 2 0 0 1-2-1.7z" /><path d="M8 9l4-6 4 6" /></g>
      <g *ngSwitchCase="'bottle'"><path d="M10 2h4v4l1.5 2.5a3 3 0 0 1 .5 1.6V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-9.9a3 3 0 0 1 .5-1.6L10 6z" /><path d="M8 13h8" /></g>
      <g *ngSwitchCase="'pill'"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></g>
      <g *ngSwitchCase="'chevron-down'"><path d="m6 9 6 6 6-6" /></g>
      <g *ngSwitchCase="'send'"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></g>
      <g *ngSwitchCase="'trash'"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" /></g>
      <g *ngSwitchCase="'arrow-left'"><path d="M19 12H5M12 19l-7-7 7-7" /></g>
      <g *ngSwitchCase="'arrow-right'"><path d="M5 12h14M12 5l7 7-7 7" /></g>
      <g *ngSwitchCase="'leaf'"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></g>
      <g *ngSwitchCase="'linkedin'"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></g>
      <g *ngSwitchCase="'mail'"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></g>
      <g *ngSwitchCase="'sort'"><path d="M3 6h18M6 12h12M10 18h4" /></g>
      <g *ngSwitchCase="'github'"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></g>
    </svg>
  `,
})
export class IconComponent {
  @Input() name!: IconName;
  @Input() stroke = 2;
  @Input() filled = false;
}
