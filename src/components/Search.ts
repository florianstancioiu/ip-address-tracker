import { component, html } from '@pionjs/pion';
import { searchStyle } from './Search.style';
import { reset } from '../reset.css';

const Search = () => {
  return html`
    <style>
      ${reset}
      ${searchStyle}
    </style>
    <div class="wrapper">
      <h1>IP Address Tracker</h1>

      <div class="input-wrapper">
        <input placeholder="Search for any IP address or domain" />
        <svg
          class="input-chevron-right"
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H43C51.2843 0 58 6.71573 58 15V43C58 51.2843 51.2843 58 43 58H0V0Z"
            fill="black"
          />
          <path d="M26 23L32 29L26 35" stroke="white" stroke-width="3" />
        </svg>
      </div>
    </div>
  `;
};

customElements.define('app-search', component(Search));
