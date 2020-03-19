import { Component, h, Prop, State } from '@stencil/core';
import { modalController } from '@ionic/core';

declare var atlas: any;

@Component({
  tag: 'place-detail',
  styleUrl: 'place-detail.css'
})
export class PlaceDetail {

  @Prop() place: any;

  @State() map: any;

  componentDidLoad() {
    console.log(this.place);

    this.map = new atlas.Map('myMap', {
      center: [this.place.routablePoint.longitude, this.place.routablePoint.latitude],
      zoom: 12,
      language: 'en-US',
      authOptions: {
        authType: 'subscriptionKey',
        subscriptionKey: 'VbeIj_ih0IK742gP3pgb4FnCpoCFwg8-RIim9nXMj-4'
      }
    });
  }

  async close() {
    await modalController.dismiss();
  }

  async share(place) {
    if ((navigator as any).share) {
      await (navigator as any).share({
        title: place.name,
        text: `Check out ${place.name} at ${place.address.streetAddress}`,
        url: place.url,
      })
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.close()}>
              <ion-icon name="close"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,
      <ion-content>

        <div id="myMap"></div>

        <div id="placeInfo">
          <h2>{this.place.name}</h2>

          <p>{this.place.address.streetAddress}</p>

          <a href={`tel:${this.place.telephone}`}>Call</a>

          <div id="placeActions">
            <ion-button fill="outline">
              <ion-icon slot="start" name="navigate-outline"></ion-icon>
              Navigate
            </ion-button>

            <ion-button onClick={() => this.share(this.place)} color="secondary" fill="outline">
              <ion-icon slot="start" name="share-outline"></ion-icon>
              Share
            </ion-button>
          </div>
        </div>
      </ion-content>
    ];
  }
}
