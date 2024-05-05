import { component, html } from '@pionjs/pion';
import { cardStyle } from './Card.style';

const Card = () => {
  return html`
    <style>
      ${cardStyle}
    </style>
  `;
};

customElements.define('app-card', component(Card));
