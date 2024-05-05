import { component, html } from '@pionjs/pion';
import { globals } from './globals.css';
import { reset } from './reset.css';

const App = () => {
  return html` <style>
      ${reset}
    </style>
    <h1>This is a test</h1>`;
};

customElements.define('main-app', component(App));
