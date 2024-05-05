import { component, html } from '@pionjs/pion';
import { searchStyle } from './Search.style';

const Search = () => {
  return html`
    <style>
      ${searchStyle}
    </style>
  `;
};

customElements.define('app-search', component(Search));
