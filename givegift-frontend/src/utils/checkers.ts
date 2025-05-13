export const checkPrice = (minPrice: number, maxPrice: number, newPrice: [number, number]) => {
  let [newStartPrice, newEndPrice] = newPrice;

  if (newEndPrice < newStartPrice) {
    newStartPrice = newEndPrice - 1;
  }

  return [
    newStartPrice < minPrice ? minPrice : newStartPrice,
    newEndPrice > maxPrice ? maxPrice : newEndPrice,
  ];
};

export const checkZoom = (minScale: number, maxScale: number, newScale: number) => {
  if (minScale > newScale) {
    newScale = minScale;
  } else if (newScale > maxScale) {
    newScale = maxScale;
  }
  return newScale
};

export const isAuthError = (error: { status: number; }) => {
  return error && error.status === 401;
};

export const isObjectEmpty = (object: {}) => {
  return Object.keys(object).length === 0;
};
