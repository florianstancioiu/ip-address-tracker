import { component, html } from '@pionjs/pion';
import { reset } from './reset.css';
import './components/Header';
import './components/Map';

const App = () => {
  return html`
    <style>
      ${reset}
    </style>
    <div>
      <app-header />
      <app-map />
    </div>
  `;
};

customElements.define('main-app', component(App));
