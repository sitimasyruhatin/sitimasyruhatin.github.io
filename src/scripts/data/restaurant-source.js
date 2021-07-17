/* eslint-disable no-else-return */
import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

const RestaurantSource = {
  async listRestaurant() {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANT);
    if (!response.ok) {
      return { hasError: true };
    } else {
      const responseJson = await response.json();
      return { hasError: false, data: responseJson };
    }
  },

  async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    if (!response.ok) {
      return { hasError: true };
    } else {
      const responseJson = await response.json();
      return { hasError: false, data: responseJson };
    }
  },

  async searchRestaurant(query) {
    const response = await fetch(API_ENDPOINT.SEARCH(query));
    if (!response.ok) {
      return { hasError: true };
    } else {
      const responseJson = await response.json();
      return { hasError: false, data: responseJson };
    }
  },
  async sendReview(review) {
    const response = await fetch(API_ENDPOINT.SEND_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY,
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) {
      return { hasError: true };
    } else {
      const responseJson = await response.json();
      return { hasError: false, data: responseJson };
    }
  },
};

export default RestaurantSource;
