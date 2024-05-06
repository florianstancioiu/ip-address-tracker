import { component, html, createContext, useState } from '@pionjs/pion';
import { reset } from './reset.css';
import './components/Header';
import './components/Map';

export const ipContext = createContext({
  ip: '',
  setIp: () => {},
  locationData: {
    location: {
      lat: 44.43225,
      lng: 26.10626,
    },
  },
  setLocationData: () => {},
});

customElements.define('ip-provider', ipContext.Provider);

const App = () => {
  const [ip, setIp] = useState('');
  const [locationData, setLocationData] = useState({
    location: {
      lat: 44.43225,
      lng: 26.10626,
    },
  });

  return html`
    <style>
      ${reset}
    </style>
    <ip-provider .value=${{ ip, setIp, locationData, setLocationData }}>
      <div>
        <app-header></app-header>
        <app-map></app-map>
      </div>
    </ip-provider>
  `;
};

customElements.define('main-app', component(App));
