import { component, html, useEffect, useContext } from '@pionjs/pion';
import { mapStyle } from './Map.style';
import { reset } from '../reset.css';
import { ipContext } from '../app';

const Map = (element: HTMLElement) => {
  const { locationData } = useContext(ipContext);

  useEffect(() => {
    const mapDiv = element.shadowRoot!.querySelector('#map');

    // @ts-ignore
    const map = L.map(mapDiv).setView(
      [locationData.location.lat, locationData.location.lng],
      13
    );

    // @ts-ignore
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, [locationData.ip]);

  return html`
    <style>
      ${reset}
      ${mapStyle}
    </style>
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      crossorigin=""
    />
    <div class="wrapper">
      <div id="map"></div>
    </div>
  `;
};

customElements.define('app-map', component(Map));
