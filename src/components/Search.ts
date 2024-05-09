import { component, html, useContext, useEffect } from '@pionjs/pion';
import { searchStyle } from './Search.style';
import { reset } from '../reset.css';
import { ipContext } from '../app';

const Search = () => {
  const { ip, setIp, setLocationData } = useContext(ipContext);

  useEffect(async () => {
    const apiKey = 'at_SwtYifMWjcF7GCNWzRmkivTf1L0ow';

    const response = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`
    );
    const data = await response.json();

    setLocationData(data);
  }, [ip]);

  return html`
    <style>
      ${reset}
      ${searchStyle}
    </style>
    <div class="wrapper">
      <h1>IP Address Tracker</h1>

      <div class="input-wrapper">
        <input
          value=${ip}
          @change=${(event: Event) => {
            const target = event.target as HTMLInputElement;

            setIp(target!.value);
          }}
          placeholder="Search for any valid IP address"
        />
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
