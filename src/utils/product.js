  export const isLiked = (likes, userId) => likes.some(id => id === userId);

  export const clacDiscountPrice = (price, discount) => {
    return Math.round(price - price*discount / 100)
  }

  export const createMarkUp = (textToHtml) => {
    return {__html: textToHtml}
  }