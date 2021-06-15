import axios from "axios";
export const GET_PRODUCTS_BY_CATEGORIES = "GET_PRODUCTS_BY_CATEGORIES";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_PRODUCTS_DETAIL = "GET_PRODUCTS_DETAIL";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_BY_KEYWORD = "GET_BY_KEYWORD";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const NEW_CATEGORY = "NEW_CATEGORY";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const EDIT_PRODUCT_CATEGORY = "EDIT_PRODUCT_CATEGORY";
export const DELETE_PRODUCT_CATEGORY = "DELETE_PRODUCT_CATEGORY";
export const CREATE_ORDER = 'CREATE_ORDER'
export const CREATE_USER = 'CREATE_USER'
export const CART = 'CART'
export const OS_USER = 'OS_USER'
export const CREATE_REVIEWS = 'CREATE_REVIEWS'
export const GET_USER = 'GET_USER'
export const SUMA_TOTAL = 'SUMA_TOTAL'

//Accion para obtener productos por categoria
export function getProductsByCategory(categories) {
  console.log(categories)
  return (dispatch) => {
    axios
      .get(`http://localhost:3001/products/category/${categories}`)
      .then((response) => {
        
        dispatch({
          type: "GET_PRODUCTS_BY_CATEGORIES",
          payload: response.data,
        });
      });
  };
 
}

//Accion para obtener todas las categorias
export function getCategories() {
  return (dispatch) => {
    return axios.get("http://localhost:3001/products/getCategory").then((json) => {
      dispatch({
        type: "GET_CATEGORIES",
        payload: json.data,
      });
    });
  };
}

//Accion para obtener todos los productos
export function getProducts() {
  return (dispatch) => {
    return axios.get("http://localhost:3001/products").then((json) => {
      dispatch({
        type: "GET_PRODUCTS",
        payload: json.data,
      });
    });
  };
}

//Accion para obtener el detalle de producto
export function getProductsDetail(id) {
  return (dispatch) => {
    axios.get(`http://localhost:3001/products/${id}`).then((json) => {
      dispatch({ type: "GET_PRODUCTS_DETAIL", payload: json.data });
    });
  };
}

//Accion para obtener productos por palabra clave
export function getProductsByKeyword(keyword) {
  return (dispatch) => {
    return axios
      .get(`http://localhost:3001/products/search?keyword=${keyword}`)
      .then((products) =>
        dispatch({
          type: "GET_BY_KEYWORD",
          payload: products.data,
        })
      );
  };
}

//Accion para borrar productos
export function deleteProduct(id) {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:3001/products/${id}`)
      .then((response) => {
        dispatch({
          type: "DELETE_PRODUCT",
          payload: response.data.id,
        });
      });
  };
}

//Accion para borrar categorias
export function deleteCategory(id) {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:3001/products/category/${id}`)
      .then((response) => {
        dispatch({
          type: "DELETE_CATEGORY",
          payload: response.data.id,
        });
      });
  };
}

//Accion para actualizar categorias
export function updateCategory(id, obj) {
  return (dispatch) => {
    return axios
      .put(`http://localhost:3001/products/category/${id}`, obj)
      .then((response) => {
        console.log(response);
        dispatch({
          type: "UPDATE_CATEGORY",
        });
      });
  };
}

//Accion para crear categorias
export function newCategory(obj) {
  return (dispatch) => {
    return axios
      .post("http://localhost:3001/products/category", obj)
      .then((response) => {
        console.log(response);
        dispatch({
          type: "NEW_CATEGORY",
        });
      });
    }
  }


//Accion para editar Producto
export function editProduct(id, body) {
  return (dispatch) => {
    axios
      .put(`http://localhost:3001/products/${id}`, body)
      .then((response) => {
        dispatch({
          type: "EDIT_PRODUCT",
          payload: response.data.id,
        });
      });
  };
}

//Accion para crear producto
export function createProduct(body) {
  return (dispatch) => {
    axios
      .post("http://localhost:3001/products", body)
      .then((response) => {
        dispatch({
          type: "CREATE_PRODUCT",
          payload: response.data,
        });
      });
  };
}

// Accion para editar producto
export function editProductCategory(idProducto, idCategoria) {
  return (dispatch) => {
    axios
      .post(
        `http://localhost:3001/products/${idProducto}/category/${idCategoria}`
      )
      .then(() => {
        dispatch({
          type: "EDIT_PRODUCT_CATEGORY",
        });
      })
      .catch((err) => alert(err));
  };
}

//Accion para borrar producto de categoria
export function deleteProductCategory(idProducto, idCategoria) {
  return (dispatch) => {
    axios
      .delete(
        `http://localhost:3001/products/${idProducto}/category/${idCategoria}`
      )
      .then(() => {
        dispatch({
          type: "DELETE_PRODUCT_CATEGORY",
        });
      })
      .catch((err) => alert(err));
  };
}

export function createUser(obj){
  return (dispatch) => {
    axios.post(`http://localhost:3001/users`,obj)
    .then(response => {
      dispatch({
        type: 'CREATE_USER',
        payload: response.data.id
      })
    })
  }
}

export function createOrder(idUser,obj){
  return (dispatch) => {
    axios.post(`http://localhost:3001/users/${idUser}/cart`,obj)
    .then(response => {
      dispatch({
        type: 'CREATE_ORDER',
        payload: response.data.products
      })
    })
  }
}

//Editar cantidad de producto en una orden

export function editQuantity(userId, body) {
  return (dispatch) => {
    axios
      .put(`http://localhost:3001/users/${userId}/cart`, body)
      .then((response) => {
        dispatch({
          type: "EDIT_QUANTITY_ORDERLINE",
          payload: response.data
        });
      });
  };
}


export function cart(idUser){
  return (dispatch) => {
    axios.get(`http://localhost:3001/users/${idUser}/cart`)
      .then(response => {
        console.log(response)
        dispatch ({
          type: 'CART',
          payload: (response.data[0].products ? response.data[0].products : null)
        })
      })
  }
}

export function osUser(){
  return (dispatch) => {
    axios.get("http://localhost:3001/users/os")
    .then(response => {
      dispatch({
        type:'OS_USER',
        payload: response.data
      })
    })
  }
}

//Accion para crears Reviews
export function createReviews(id, obj) {
  return (dispatch) => {
    axios.post(`http://localhost:3001/products/${id}/reviews`, obj)
    .then((json) => {
      dispatch({ 
        type: 'CREATE_REVIEWS', 
        payload: json.data 
      });
    });
  };
}

export const getUser = () => {
  const authAxios = axios.create({
      baseURL: `http://localhost:3001`,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    if(authAxios){
      console.log(authAxios)
      return dispatch => {
        authAxios.get('/auth/me')
        .then(response => {
          console.log(response)
          dispatch({
            type: 'GET_USER',
            payload: response.data
          })
        })
      }
    }
}

export const sumaTotal = (subTot) => {
  return {
      type: 'SUMA_TOTAL',
      payload: subTot
  }
}



