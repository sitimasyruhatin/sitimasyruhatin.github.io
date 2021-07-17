/* eslint-disable no-undef */
const assert = require('assert');

const titleLiked = 'Bring Your Phone Cafe';

Feature('Write Review');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('write a review in Bring Your Phone Cafe', async ({ I }) => {
  // 1. make sure the list of favorite restaurants is not empty
  I.seeElement('.card__title a');
  const restaurants = await I.grabTextFromAll('#restaurants .card__title a');
  // 2. go to Bring Your Phone Cafe detail page
  restaurants.forEach((restaurant, indexRestaurant) => {
    if (restaurant === titleLiked) {
      const targetRestaurant = locate('#restaurants .card__title a').at(indexRestaurant + 1);
      I.click(targetRestaurant);
    }
  });
  const reviewerName = 'Jessica Camelia';
  const reviewerMessage = 'The restaurant is clean, and the food is not too expensive';
  // 3. Fill form name
  I.seeElement('#review-name');
  I.fillField('#review-name', reviewerName);
  // 4. Fill form message
  I.seeElement('#review-message');
  I.fillField('#review-message', reviewerMessage);
  // 5. Send review
  I.seeElement('#send-review');
  I.click('#send-review');
  // 6. See the reviews that have been sent
  I.seeElement('#customer-review .review-item');
  const totalReview = await I.grabNumberOfVisibleElements('#customer-review .review-item');
  const reviewsName = await I.grabTextFromAll('#customer-review .customer-name');
  const reviewsMessage = await I.grabTextFromAll('#customer-review p');
  const reviews = [];
  for (let i = 0; i < totalReview; i += 1) {
    const review = {
      name: reviewsName[i],
      message: reviewsMessage[i],
    };
    reviews.push(review);
  }
  assert.strictEqual(reviews[reviews.length - 1].name, reviewerName);
  assert.strictEqual(reviews[reviews.length - 1].message, reviewerMessage);
});
