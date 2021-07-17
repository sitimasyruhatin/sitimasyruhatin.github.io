import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import {
  createCustomerReviews,
  createErrorTemplate,
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate, createRestaurantDetailLoadingTemplate, createRestaurantLoadingTemplate,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
    <div class="container">
      <div class="detail-page">
        <section>
          <div id="detail-restaurant" class="detail-restaurant">
          ${createRestaurantDetailLoadingTemplate}
          </div>
        </section>
        <aside>
          <h1 class="section__title" tabindex="0">
            <span>You May Also Like</span>
          </h1>
          <div id="other-restaurant" class="other-restaurant">
          ${createRestaurantLoadingTemplate}
          </div>
        </aside>
      </div>
    </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const fetchRestaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#detail-restaurant');
    this._renderOtherRestaurant(url.id);

    if (fetchRestaurant.hasError) {
      restaurantContainer.innerHTML = createErrorTemplate;
    } else {
      // eslint-disable-next-line max-len
      let isMobile;
      if (window.innerWidth < 600) {
        isMobile = true;
      } else {
        isMobile = false;
      }
      restaurantContainer.innerHTML = await createRestaurantDetailTemplate(
        fetchRestaurant.data.restaurant, isMobile,
      );
      this._renderCustomerReviews(fetchRestaurant.data.restaurant.customerReviews);
      const reviewName = document.querySelector('#review-name');
      const reviewMessage = document.querySelector('#review-message');
      const submitForm = document.querySelector('#review-form');

      submitForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const review = {
          id: fetchRestaurant.data.restaurant.id,
          name: reviewName.value,
          review: reviewMessage.value,
        };
        const reviewResult = await RestaurantSource.sendReview(review);
        this._renderCustomerReviews(reviewResult.data.customerReviews);
        reviewName.value = '';
        reviewMessage.value = '';
      });

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteRestaurantIdb,
        restaurant: {
          id: fetchRestaurant.data.restaurant.id,
          name: fetchRestaurant.data.restaurant.name,
          pictureId: fetchRestaurant.data.restaurant.pictureId,
          description: fetchRestaurant.data.restaurant.description,
          city: fetchRestaurant.data.restaurant.city,
          rating: fetchRestaurant.data.restaurant.rating,
        },
      });
    }
  },

  async _renderCustomerReviews(customerReviews) {
    const reviewContainer = document.querySelector('#customer-review');
    reviewContainer.innerHTML = await createCustomerReviews(customerReviews);
  },

  async _renderOtherRestaurant(restaurantId) {
    const restaurantContainer = document.querySelector('#other-restaurant');
    const fetchRestaurant = await RestaurantSource.listRestaurant();
    if (fetchRestaurant.hasError) {
      restaurantContainer.innerHTML = createErrorTemplate;
    } else {
      restaurantContainer.innerHTML = `<div class="other-restaurant">${this._renderRestaurants(
        fetchRestaurant.data.restaurants,
        restaurantId,
      )}</div>`;
    }
  },

  _renderRestaurants(restaurants, restaurantId) {
    let restaurantCard = '';
    let showFour = 0;
    restaurants.forEach((restaurant) => {
      if (restaurant.id !== restaurantId && showFour < 4) {
        restaurantCard += createRestaurantItemTemplate(restaurant);
        showFour += 1;
      }
    });
    return restaurantCard;
  },
};

export default Detail;
