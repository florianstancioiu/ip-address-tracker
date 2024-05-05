import { component, html } from '@pionjs/pion';
import { cardStyle } from './Card.style';
import { reset } from '../reset.css';

const Card = () => {
  return html`
    <style>
      ${reset}
      ${cardStyle}
    </style>
  `;
};

customElements.define('app-card', component(Card));
