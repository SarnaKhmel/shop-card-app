import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "Blorem 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor tempor risus at vehicula. Maecenas tempus molestie ex, aliquam sodales est fringilla vitae. Phasellus ultrices.",
      price: 7.5,
      image: "https://picsum.photos/200",
      size: { width: 100, height: 100 },
      weight: "200g",
    },
    {
      id: 2,
      title: "Alorem 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor tempor risus at vehicula. Maecenas tempus molestie ex, aliquam sodales est fringilla vitae. Phasellus ultrices.",
      price: 19.5,
      image: "https://picsum.photos/200",
      size: { width: 100, height: 100 },
      weight: "200g",
    },
    {
      id: 3,
      title: "CLorem 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor tempor risus at vehicula. Maecenas tempus molestie ex, aliquam sodales est fringilla vitae. Phasellus ultrices.",
      price: 99.99,
      image: "https://picsum.photos/200",
      size: { width: 100, height: 100 },
      weight: "200g",
    },
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};
export default shopReducer;
