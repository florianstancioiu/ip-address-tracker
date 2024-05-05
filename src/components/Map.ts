import { component, html } from '@pionjs/pion';
import { mapStyle } from './Map.style';
import { reset } from '../reset.css';

const Map = () => {
  return html`
    <style>
      ${reset}
      ${mapStyle}
    </style>
  `;
};

customElements.define('app-map', component(Map));
