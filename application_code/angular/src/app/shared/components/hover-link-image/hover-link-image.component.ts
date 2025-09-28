import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hover-link-image',
  template: `<a class="hover-link" href="{{ link }}" target="_blank">
  <img src="{{ imgSrc }}" alt="Hover Image" class="hover-image" />
</a>
`,
  styles: [`
  .hover-link {
    display: inline-block;
    position: relative;
    text-decoration: none;
    border: 1px solid transparent; /* Initial border setup */
  }

  .hover-image:hover {
    transform: translateY(-10px);
    transition: 0.3s all ease-in-out;
    border: 2px solid #FF166D;
  }

  .hover-image {
    max-width: 100%;
    height: 84px;
    border-radius: 8px;
    border: 2px solid transparent;
    transition: 0.3s all ease-in-out;
  }
  `]
})
export class HoverLinkImageComponent {
  @Input() link: string = '';
  @Input() imgSrc: string = '';
}
