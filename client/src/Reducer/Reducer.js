import {
  DELETE_CATEGORY,
  DELETE_PRODUCT,
  GET_BY_KEYWORD,
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORIES,
  GET_PRODUCTS_DETAIL,
  NEW_CATEGORY,
  UPDATE_CATEGORY,
  EDIT_PRODUCT,
  CREATE_PRODUCT,
  EDIT_PRODUCT_CATEGORY,
  DELETE_PRODUCT_CATEGORY,
  CREATE_ORDER,
  CREATE_USER,
  CART,
  OS_USER,
  CREATE_REVIEWS,
  GET_USER,
  SUMA_TOTAL
} from "../Actions/Actions";

const initialState = {
  getProductsByCategory: [],
  getCategories: [],
  getAllProducts: [],
  getProductsDetail: {},
  getProductsByKeyword: [],
  getNewProduct: {},
  newUser: '',
  cart: [],
  osUser: [],
  setReviews: [],
  getUser: {},
  total: 0,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    // Productos por categoria
    case GET_PRODUCTS_BY_CATEGORIES:
      return {
        ...state,
        getProductsByCategory: action.payload,
      };
    // Todos las categorias
    case GET_CATEGORIES:
      return {  
        ...state,
        getCategories: action.payload,
      };
    // Todos los productos
    case GET_PRODUCTS:
      return {
        ...state,
        getAllProducts: action.payload,
      };
    // Detalle de producto
    case GET_PRODUCTS_DETAIL:
      return {
        ...state,
        getProductsDetail: action.payload,
      };
    // Producto por palabra clave
    case GET_BY_KEYWORD:
      return {
        ...state,
        getProductsByKeyword: action.payload,
      };
    // Borrar un producto
    case DELETE_PRODUCT:
      return {
        ...state,
        getAllProducts: state.getAllProducts.filter(
          (obj) => obj.id !== action.payload
        ),
      };
    // Borrar una categoria
    case DELETE_CATEGORY:
      return {
        ...state,
        getCategories: state.getCategories.filter(
          (category) => category.id !== action.payload
        ),
      };
    // Actualizar una categoria
    case UPDATE_CATEGORY:
      return { ...state };
    // Nueva categoria
    case NEW_CATEGORY:
      return { ...state };
    // Editar Producto
    case EDIT_PRODUCT:
      return {
        ...state,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        getNewProduct: action.payload,
      };
    case EDIT_PRODUCT_CATEGORY:
      return {
        ...state,
      };
    case DELETE_PRODUCT_CATEGORY:
      return {
        ...state,
      };
    case CREATE_ORDER:
      return {
        ...state
      }
    case CREATE_USER:
      return {
        ...state,
        newUser: action.payload
      }
    case CART:
      return {
        ...state,
        cart: action.payload
      }
    case OS_USER:
      return {
        ...state,
        osUser: action.payload
      }
    case CREATE_REVIEWS:
      return {  
        ...state,
        setReviews: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        getUser: action.payload,
      }
    case SUMA_TOTAL:
      return {
        ...state,
        total: action.payload === null ? (state.total = 0) : 
        (action.payload + state.total)
      }
    default:
      return state;
  }
};

export default Reducer;
