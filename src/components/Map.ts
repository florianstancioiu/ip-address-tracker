import { component, html } from '@pionjs/pion';
import { mapStyle } from './Map.style';

const Map = () => {
  return html`
    <style>
      ${mapStyle}
    </style>
  `;
};

customElements.define('app-map', component(Map));
