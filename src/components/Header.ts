import { component, html } from '@pionjs/pion';
import { headerStyle } from './Header.style';
import { reset } from '../reset.css';
import './Search';
import './Card';

const Header = () => {
  return html`
    <style>
      ${reset}
      ${headerStyle}
    </style>
    <div class="wrapper">
      <app-search></app-search>
      <app-card></app-card>
    </div>
  `;
};

customElements.define('app-header', component(Header));
