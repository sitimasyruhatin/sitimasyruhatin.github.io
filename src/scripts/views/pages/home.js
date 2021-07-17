import RestaurantSource from '../../data/restaurant-source';
import { createErrorTemplate, createRestaurantItemTemplate } from '../templates/template-creator';

const ListRestaurant = {
  async render() {
    return `
    <section id="hero" class="hero">
      <div class="hero__inner">
        <div class="container">
        <h1 class="hero__title" tabindex="0">Discover restaurants near you.</h1>
        <div class="hero__search">
          <form>
            <input
            id="search-form"
            class="form-control"
            placeholder="Search restaurant"
            autocomplete="off"
            />
            <button id="button-cancel" class="btn btn-cancel" aria-label="Cancel search">
              <i class="fa fa-times"></i>
            </button>
            <button id="search-button" class="btn btn-primary" aria-label="Search restaurant">
              <i class="fa fa-search"></i>
            </button>
          </form>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div id="search-restaurant" class="section__container">
          <h1 class="section__title" tabindex="0">
            <span>List Restaurants</span>
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

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const searchButton = document.querySelector('#search-button');
    const buttonCancel = document.querySelector('#button-cancel');
    const searchForm = document.querySelector('#search-form');

    this._initRestaurant();
    searchButton.addEventListener('click', (event) => {
      event.preventDefault();
      if (searchForm.value) {
        this._searchRestaurant(searchForm.value);
      }
    });

    searchForm.addEventListener('keydown', (event) => {
      if (searchForm.value) {
        buttonCancel.style.display = 'unset';
        if (event.key === 'Enter') {
          event.preventDefault();
          this._searchRestaurant(searchForm.value);
        }
      } else {
        buttonCancel.style.display = 'none';
      }
    });

    buttonCancel.addEventListener('click', (event) => {
      event.preventDefault();
      buttonCancel.style.display = 'none';
      searchForm.value = '';
      this._initRestaurant();
    });
  },

  async _initRestaurant() {
    const restaurantContainer = document.querySelector('#restaurants');
    const fetchRestaurant = await RestaurantSource.listRestaurant();
    if (fetchRestaurant.hasError) {
      restaurantContainer.innerHTML = createErrorTemplate;
    } else {
      restaurantContainer.innerHTML = `<div class="card">${this._renderRestaurants(fetchRestaurant.data.restaurants)}</div>`;
    }
  },

  async _searchRestaurant(query) {
    const searchResult = document.querySelector('#search-restaurant');
    const restaurantContainer = document.querySelector('#restaurants');
    restaurantContainer.innerHTML = '';
    const searchRestaurant = await RestaurantSource.searchRestaurant(query);
    if (searchRestaurant.hasError) {
      restaurantContainer.innerHTML = createErrorTemplate;
    } else if (searchRestaurant.data.founded === 0) {
      restaurantContainer.innerHTML = `<div class="search-result">${searchRestaurant.data.founded} Search result for <span>${query}<span></div><div class="error-container><img data-src="./images/no-data.svg" class="img-fluid lazyload" alt="No Restaurant Available Illustration"/><h1>No Restaurant Available</h1></div>`;
      searchResult.scrollIntoView({ behavior: 'smooth' });
    } else {
      restaurantContainer.innerHTML = `<div class="search-result">${searchRestaurant.data.founded} Search result for <span>${query}<span></div><div class="card">${this._renderRestaurants(searchRestaurant.data.restaurants)}</div>`;
      searchResult.scrollIntoView({ behavior: 'smooth' });
    }
  },

  _renderRestaurants(restaurants) {
    let restaurantCard = '';
    restaurants.forEach((restaurant) => {
      restaurantCard += createRestaurantItemTemplate(restaurant);
    });
    return restaurantCard;
  },
};

export default ListRestaurant;
