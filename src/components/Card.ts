import { component, html } from '@pionjs/pion';
import { cardStyle } from './Card.style';
import { reset } from '../reset.css';

const Card = () => {
  return html`
    <style>
      ${reset}
      ${cardStyle}
    </style>
    <div class="wrapper">
      <div class="inner-wrapper">
        <div class="item">
          <p class="title">IP Address</p>
          <p class="sub-title">192.212.174.101</p>
        </div>
        <div class="item">
          <p class="title">Location</p>
          <p class="sub-title">Brooklyn, NY 10001</p>
        </div>
        <div class="item">
          <p class="title">Timezone</p>
          <p class="sub-title">UTC -05:00</p>
        </div>
        <div class="item">
          <p class="title">ISP</p>
          <p class="sub-title">SpaceX Starlink</p>
        </div>
      </div>
    </div>
  `;
};

customElements.define('app-card', component(Card));
