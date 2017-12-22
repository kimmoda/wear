
const defaultState = {
  products: [],
  colors: [],
  filterColor: [],
  inputValue: "",
  toggledFilterClass: [],
  minPrice: 20,
  maxPrice: 49,
  filterPrice: [],
  favoriteProducts: [],
  favoriteProductsId: [],
};

const reducer = (state = defaultState, action) => {
  if (action.type === "ADD_SEARCH") {
    return {...state, inputValue: action.inputValue}
  }
  if (action.type === "ADD_PRODUCTS") {
    return {...state, products: [...action.products]}
  }
  if (action.type === "ADD_COLORS") {
    return {...state, colors: [...action.colors]}
  }
  if (action.type === "ADD_FILTER_COLOR") {
    return {...state, filterColor: [...state.filterColor, action.filterColor]}
  }
  if (action.type === "TOGGLE_CLASS_COLOR") {
    return {...state, toggledFilterClass: [...state.toggledFilterClass, action.toggledFilterClass]}
  }
  if (action.type === "CLEAR_FILTER_COLORS") {
    return {...state, filterColor: [], toggledFilterClass: []}
  }
  if (action.type === "MAX_PRICE") {
    return {...state, maxPrice: action.maxPrice}
  }
  if (action.type === "MIN_PRICE") {
    return {...state, minPrice: action.minPrice}
  }
  if (action.type === "PRICE_FILTER") {
    return {...state, filterPrice: [action.min, action.max]  }
  }
  if (action.type === "ADD_TO_FAVOURITE_LIST") {
    return {...state, favoriteProductsId: [...state.favoriteProductsId, action.product.id], favoriteProducts: [...state.favoriteProducts, action.product]  }
  }
  return state;
}

export default reducer
