/* eslint-disable no-nested-ternary */
import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <article class="card__items">
    <div class="card__header">
      <img
        class="card__image lazyload"
        data-src="${restaurant.pictureId ? CONFIG.BASE_SMALL_IMAGE_URL + restaurant.pictureId : '/images/image-placeholder.webp'}"
        alt = "${restaurant.name} Images"
        onerror="this.src='/images/image-placeholder.webp';"
      />
    </div>
    <div class="card__content">
      <h1 class="card__title"><a href="${`/#/detail/${restaurant.id}`}">${restaurant.name}</a></h1>
      <p class="card__description">${restaurant.description.substring(0, 40)}...</p>
      <div class="card__footer">
        <div class="card__footer-item">
          <i class="material-icons">location_on</i>
          <span>${restaurant.city}</span>
        </div>
        <div class="card__footer-item">
           <i class="material-icons">star</i>
          <span>${restaurant.rating}</span>
        </div>
      </div>
    </div>
  </article>
  `;

const createRestaurantDetailTemplate = (restaurant, isMobile) => `
  <div class="detail-header">
    <div class="header__image" style="background-image: url('${isMobile ? restaurant.pictureId ? CONFIG.BASE_SMALL_IMAGE_URL + restaurant.pictureId : '/images/image-placeholder.webp' : restaurant.pictureId ? CONFIG.BASE_MEDIUM_IMAGE_URL + restaurant.pictureId : '/images/image-placeholder.webp'}')">
      <span id="likeButtonContainer" class="header__like"></span>
    </div>
    <div class="header__info">
      <div>
        <h1 class="header__title">${restaurant.name}</h1>
        <p class="header__categories">
        <i class="material-icons">local_dining</i>
          ${restaurant.categories.map((category) => category.name).join(', ')}
        </p>
        <p class="header__address">
          <i class="material-icons">location_on</i>
          ${restaurant.address}, ${restaurant.city}</p>
      </div>
      <div class="header__rating shadow">
        <div class="rating">${restaurant.rating}</div>
        <div class="review">
          ${restaurant.customerReviews.length} <span>Reviews</span>
        </div>
      </div>
    </div>
  </div>
  <div class="detail-section">
    <h2 class="detail-section__title">
      About Restaurant
    </h2>
    <p class="detail-section__description">${restaurant.description}</p>
  </div>
  <div class="detail-section">
    <h2 class="detail-section__title">
      Menu
    </h2>
    <div class="detail-section__menu">
      <div class="sub-menu">
        <h3 class="sub-menu__title">Food</h3>
        <ul>
          ${restaurant.menus.foods.map((food) => `
          <li>
            <span>${food.name}</span>
            <span class="price">IDR ${Math.floor(Math.random() * 20) + 10}k</span>
          </li>`).join('')}
        </ul>
      </div>
      <div class="sub-menu">
        <h3 class="sub-menu__title">Drink</h3>
        <ul>
          ${restaurant.menus.drinks.map((drink) => `
          <li>
            <span>${drink.name}</span>
            <span class="price">IDR ${Math.floor(Math.random() * 10) + 1}k</span>
          </li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
  <div class="detail-section">
    <h2 class="detail-section__title">
      ${restaurant.customerReviews.length} Review(s)
    </h2>
    <div class="detail-section__review">
      <div id="customer-review">
      </div>
      <div class="review-form">
        <h3>Send Your Review</h3>
        <form id="review-form">
          <div class="form-group">
            <label for="review-name">Your Name</label>
            <input id="review-name" class="form-control" autocomplete="off" required />
          </div>
          <div class="form-group">
            <label for="review-message">Your Review</label>
            <textarea id="review-message" class="form-control" rows="3" required></textarea>
          </div>
          <div class="send-button">
              <button id="send-review" class="btn btn-primary" aria-label="Send review">Send</button>
            </div>
        </form>
      </div>
    </div>
  </div>
  `;

const createCustomerReviews = (reviews) => `
  ${reviews.map((customer) => `
    <div class="review-item">
      <div class="review-header">
        <div class="profile-image">
          <img
            data-src="/images/profile-image-placeholder.svg"
            class="img-fluid lazyload"
            alt="Profile Image"
          />
        </div>
        <div>
          <h3 class="customer-name">${customer.name}</h3>
          <span class="date">${customer.date}</span>
        </div>
      </div>
      <p class="review-body wrap">
        ${customer.review}
      </p>
    </div>`).join('')}
`;

const createRestaurantLoadingTemplate = `
${(function fun() {
    let restaurantCard = '';
    for (let index = 0; index < 8; index += 1) {
      restaurantCard += '<article class="card__items"><div class="card__header" style="background-color: lightgrey"></div><div class="card__content"><h1 class="card__title loading"></h1><p class="card__description loading"></p><div class="card__footer loading"></div></div></article>';
    }
    return restaurantCard;
  }())}
`;

const createRestaurantDetailLoadingTemplate = `
  <div class="detail-header">
      <div class="header__image" style="background-color: lightgrey">
      </div>
      <div class="detail-section">
        <p class="detail-section__description loading"></p>
        <p class="detail-section__description loading"></p>
      </div>
    <div class="detail-section">
      <h2 class="detail-section__title">
        About Restaurant
      </h2>
      <p class="detail-section__description loading"></p>
      <p class="detail-section__description loading"></p>
      <p class="detail-section__description loading"></p>
      <p class="detail-section__description loading"></p>
    </div>
    <div class="detail-section">
      <h2 class="detail-section__title">
        Menu
      </h2>
      <div class="detail-section__menu">
        <div class="sub-menu">
          <ul>
            <li class="loading"></li>
            <li class="loading"></li>
            <li class="loading"></li>
            <li class="loading"></li>
          </ul>
        </div>
        <div class="sub-menu">
          <ul>
            <li class="loading"></li>
            <li class="loading"></li>
            <li class="loading"></li>
            <li class="loading"></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="detail-section">
      <h2 class="detail-section__title">
        Review(s)
      </h2>
      <p class="detail-section__description loading"></p>
      <p class="detail-section__description loading"></p>
      <p class="detail-section__description loading"></p>
      <p class="detail-section__description loading"></p>
    </div>
`;

const createErrorTemplate = `
  <div div class="error-container" >
    <img data-src="./images/server-error.svg" class="img-fluid lazyload" alt="Server Error Illustration"/> 
    <h1>An error has occured.<br> Please try again later.</h1>
    <a href="#" class="btn btn-primary">Go To Home Page</a>
  </div>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button button aria-label="like this restaurant" id = "likeButton" class="btn like not-active">
    <i class="material-icons">favorite_border</i>
  </button>
  `;

const createLikedButtonTemplate = () => `
  <button button aria-label="unlike this restaurant" id = "likeButton" class="btn like active">
    <i class="material-icons">favorite</i>
  </button>
  `;

export {
  createRestaurantItemTemplate, createRestaurantDetailTemplate, createCustomerReviews,
  createLikeRestaurantButtonTemplate, createLikedButtonTemplate, createErrorTemplate, createRestaurantLoadingTemplate, createRestaurantDetailLoadingTemplate,
};
