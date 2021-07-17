/* eslint-disable no-undef */
const assert = require('assert');

const titleLiked = 'Bring Your Phone Cafe';

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.see('No Restaurant Available', '.error-container');
});

Scenario('liking a restaurant called Bring Your Phone Cafe', async ({ I }) => {
  // 1. make sure the list of favorite restaurants is empty
  I.see('No Restaurant Available', '.error-container');
  // 2. go to home page
  I.amOnPage('/');
  I.seeElement('.card__title a');
  const restaurants = await I.grabTextFromAll('#restaurants .card__title a');
  // 3. liking restaurant with the name 'Bring Your Phone Cafe'
  restaurants.forEach((restaurant, indexRestaurant) => {
    if (restaurant === titleLiked) {
      // +1 because XPath expects first element to have index 1
      const targetRestaurant = locate('#restaurants .card__title a').at(indexRestaurant + 1);
      I.click(targetRestaurant);
      I.seeElement('#likeButton');
      I.click('#likeButton');
    }
  });
  // 4. go to favorite page
  I.amOnPage('/#/favorite');

  I.seeElement('.card__title a');

  const likedRestaurants = await I.grabTextFromAll('#restaurants .card__title a');
  // 5. check the favorite restaurants with the name Bring Your Phone Cafe
  likedRestaurants.forEach((restaurant, indexRestaurant) => {
    if (restaurant === titleLiked) {
      assert.strictEqual(likedRestaurants[indexRestaurant], titleLiked);
    }
  });
});

Scenario('unliking a restaurant called Bring Your Phone Cafe', async ({ I }) => {
  // 1. make sure the list of favorite restaurants is empty
  I.see('No Restaurant Available', '.error-container');
  // 2. go to home page
  I.amOnPage('/');
  I.seeElement('.card__title a');
  const restaurants = await I.grabTextFromAll('#restaurants .card__title a');
  // 3. click detail restaurant named Bring Your Phone Cafe from home page and then like the restaurant
  restaurants.forEach((restaurant, indexRestaurant) => {
    if (restaurant === titleLiked) {
      const targetRestaurant = locate('#restaurants .card__title a').at(indexRestaurant + 1);
      I.click(targetRestaurant);
      I.seeElement('#likeButton');
      I.click('#likeButton');
      I.seeElement('#likeButton.active');
    }
  });
  // 4. go to favorite page
  I.amOnPage('/#/favorite');

  I.seeElement('.card__title a');

  const likedRestaurants = await I.grabTextFromAll('#restaurants .card__title a');

  // 5. click detail restaurant named Bring Your Phone Cafe from favorite page and then unlike the restaurant
  likedRestaurants.forEach((restaurant, indexRestaurant) => {
    if (restaurant === titleLiked) {
      const targetRestaurantLiked = locate('#restaurants .card__title a').at(indexRestaurant + 1);
      I.click(targetRestaurantLiked);
      I.seeElement('#likeButton');
      I.click('#likeButton');
      I.seeElement('#likeButton.not-active');
    }
  });
  // 6. go to favorite page
  I.amOnPage('/#/favorite');
  // 7. make sure the list of favorite restaurants is empty
  I.see('No Restaurant Available', '.error-container');
  // 8. go to home page
  I.amOnPage('/');
  // 9. make sure the button like is not active
  restaurants.forEach((restaurant, indexRestaurant) => {
    if (restaurant === titleLiked) {
      const targetRestaurant = locate('#restaurants .card__title a').at(indexRestaurant + 1);
      I.click(targetRestaurant);
      I.seeElement('#likeButton.not-active');
    }
  });
});
