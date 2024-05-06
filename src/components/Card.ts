import { component, html, useContext } from '@pionjs/pion';
import { cardStyle } from './Card.style';
import { reset } from '../reset.css';
import { ipContext } from '../app';

const Card = () => {
  const { locationData } = useContext(ipContext);

  return html`
    <style>
      ${reset}
      ${cardStyle}
    </style>
    <div class="wrapper">
      <div class="inner-wrapper">
        <div class="inner-wrapper-2">
          <div class="item">
            <p class="title">IP Address</p>
            <p class="sub-title">${locationData?.ip}</p>
          </div>
          <div class="item">
            <p class="title">Location</p>
            <p class="sub-title">
              ${locationData?.location?.city},
              ${locationData?.location?.country}
            </p>
          </div>
          <div class="item">
            <p class="title">Timezone</p>
            <p class="sub-title">${locationData?.location?.timezone}</p>
          </div>
          <div class="item">
            <p class="title">ISP</p>
            <p class="sub-title">${locationData?.isp}</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

customElements.define('app-card', component(Card));
