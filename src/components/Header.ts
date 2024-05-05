import { component, html } from '@pionjs/pion';
import { headerStyle } from './Header.style';

const Header = () => {
  return html`
    <style>
      ${headerStyle}
    </style>
  `;
};

customElements.define('app-header', component(Header));
