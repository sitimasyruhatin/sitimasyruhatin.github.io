import FavoriteRestaurant from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate, createErrorTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <section>
      <div class="container">
        <div id="search-restaurant" class="section__container">
          <h1 class="section__title" tabindex="0">
            <span>Your Favorite Restaurants</span>
          </h1>
          <div id="restaurants">
            <div class="loader-container">
              <div class="loader"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    `;
  },

  // Fungsi ini akan dipanggil setelah render()
  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurants');
    const fetchRestaurant = await FavoriteRestaurant.getAllRestaurants();
    if (fetchRestaurant.hasError) {
      restaurantContainer.innerHTML = createErrorTemplate;
    } else if (fetchRestaurant.length === 0) {
      restaurantContainer.innerHTML = '<div class="error-container"><img data-src="./images/no-data.svg" class="img-fluid lazyload" alt="No Restaurant Available Illustration"/><h1>No Restaurant Available</h1></div>';
    } else {
      let restaurantCard = '';
      fetchRestaurant.forEach((restaurant) => {
        restaurantCard += createRestaurantItemTemplate(restaurant);
      });
      restaurantContainer.innerHTML = `<div class="card">${restaurantCard}</div>`;
    }
  },
};

export default Favorite;
