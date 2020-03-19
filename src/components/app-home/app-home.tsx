import { Component, h, State } from '@stencil/core';
import { search } from '../../services/api';
import { modalController } from '@ionic/core';

import '@pwabuilder/pwainstall';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @State() places: any[];
  @State() onDual: boolean;

  async componentDidLoad() {
    this.places = await search('restraunts');

    this.onDual = window.matchMedia('(spanning: single-fold-vertical)').matches || window.matchMedia('(spanning: single-fold-horizontal)').matches;

    if (this.onDual) {
      await this.moreInfo(this.places[0]);
    }
  }

  async handleSearch(event) {
    console.log(event.detail.value);

    if (event.detail.value && event.detail.value.length > 1) {
      this.places = await search(event.detail.value);
    }
    else {
      this.places = await search('restraunts');
    }
  }

  async moreInfo(place) {
    const displayedModal = await modalController.getTop();

    if (displayedModal) {
      displayedModal.dismiss();

      const modal = await modalController.create({
        component: 'place-detail',
        componentProps: {
          place
        }
      });
      await modal.present();
    }
    else {
      const modal = await modalController.create({
        component: 'place-detail',
        componentProps: {
          place
        }
      });
      await modal.present();
    }
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
          <ion-title>LocalSearch</ion-title>

          <ion-buttons slot="end">
            <ion-button color="primary" fill="clear">
              <ion-icon name="settings-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>

        <ion-toolbar id="mobileSearch">
          <ion-searchbar placeholder="Restraunts" onIonChange={(event) => this.handleSearch(event)} debounce={500}></ion-searchbar>
        </ion-toolbar>
      </ion-header>,

      <ion-content>

        <img id="graphic" src="/assets/graphic.svg"></img>

        <ion-searchbar onIonChange={(event) => this.handleSearch(event)} debounce={500} id="mainSearch" placeholder="Restraunts"></ion-searchbar>

        <ion-list id="mainList" lines="none">
          {
            this.places ? this.places.map((place) => {
              return (
                <ion-card>
                  <ion-card-header>
                    <ion-card-title>{place.name}</ion-card-title>

                    <ion-card-subtitle>{place.address.streetAddress}</ion-card-subtitle>
                  </ion-card-header>

                  <ion-item>
                    <ion-buttons slot="end">
                      <ion-button onClick={() => this.share(place)} color="secondary">
                        <ion-icon slot="start" name="share-outline"></ion-icon>
                          Share
                      </ion-button>

                      <ion-button onClick={() => this.moreInfo(place)} color="primary">
                        <ion-icon slot="start" name="navigate-outline"></ion-icon>
                        More Info
                      </ion-button>
                    </ion-buttons>
                  </ion-item>
                </ion-card>
              )
            }) :
              (() => {
                return [
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Loading...</ion-card-title>
                      <ion-card-subtitle><ion-skeleton-screen></ion-skeleton-screen></ion-card-subtitle>

                      <ion-item>

                      </ion-item>
                    </ion-card-header>
                  </ion-card>,
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Loading...</ion-card-title>
                      <ion-card-subtitle><ion-skeleton-screen></ion-skeleton-screen></ion-card-subtitle>

                      <ion-item>

                      </ion-item>
                    </ion-card-header>
                  </ion-card>,
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Loading...</ion-card-title>
                      <ion-card-subtitle><ion-skeleton-screen></ion-skeleton-screen></ion-card-subtitle>

                      <ion-item>

                      </ion-item>
                    </ion-card-header>
                  </ion-card>
                ]

              })()
          }
        </ion-list>

        <pwa-install>Install LocalSearch</pwa-install>
      </ion-content>
    ];
  }
}
