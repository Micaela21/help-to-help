import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector} from "react-redux";
import store from "./Store/Index";
import NavBar from "./components/NavBar/NavBar";
import Banners from "./components/LandingPage/Banners.js";
import SearchResults from "./components/SearchBar/SearchResults.js";
import ProductFormAdd from "./components/ProductForm/ProductFormAdd";
import ProductsByCategory from "./components/CategoryDropdown/ProductsByCategory";
import BannersInfo from "./components/LandingPage/BannersInfo";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Products from "./components/Products/Products";
import NewCategoryForm from "./components/CategoryForm/NewCategoryForm";
import EditCategory from "./components/CategoryForm/EditCategory";
import AllCategories from "./components/CategoryForm/AllCategories";
import ProductsTable from "./components/ProductForm/ProductsTable";
import Carrito from "./components/Carrito/Carrito";
import EditProductForm from "./components/ProductForm/EditProductForm";
import DataTableAdmin from "./components/Admin/DataTableAdmin";
import UserOrders from "./components/UserView/UserOrders"
import "./App.css";
import UserForm from "./components/RegisterLogIn/UserForm";
import Index from "./components/RegisterLogIn/Index";
import AdminIndex from "./components/Admin/AdminIndex";
import GuestUserForm from "./components/GuestUserForm/GuestUserForm";
import OScatalogue from "./components/OS/OScatalogue";
import Checkout from "./components/CheckOut/CheckOut"
import PopuProducts from "./components/LandingPage/PopuProducts";
import ReviewForm from "./components/Review/ReviewForm"
import Footer from "./components/Footer/Footer";
import axios from 'axios'
import { getUser } from "./Actions/Actions";
import AllCategoriesFR from "./components/CategoryForm/AllCategoriesFR";


function App() {

  return (
      <BrowserRouter>
        <Switch>
          <Route path='/admin/:id' component={AdminIndex} />
          <Route path='/' component={NavBar}/>
        </Switch>
        <Route path='/search/:keyword' component={SearchResults}/>
        <Route exact path="/" component={Banners} />
        <Route exact path="/" component={BannersInfo} />
        <Route exact path="/" component={PopuProducts} />
        <Route path="/category/:name" component={ProductsByCategory}/>
        <Route path="/signup" component={Index} />
        <Route path='/logIn' component={Index} />
        <Route path='/productDetail/:id' component={ProductDetail}/>
        <Route path="/catalogue" component={Products}/>
        <Route path="/editProduct/:id" component={EditProductForm}/>
        <Route path="/add" component={ProductFormAdd} />
        <Route exact path="/cart" component={Carrito}/>
        <Route path="/categories" component={AllCategoriesFR} />
        <Route path="/editCategory/:id" component={EditCategory} />
        <Route path="/addCategory" component={NewCategoryForm} />
        <Route path="/:id/user"  component={UserOrders} />
        <Route path='/guest' component={GuestUserForm}/>
        <Route path='/donate' component={OScatalogue}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path='/products/:id/reviews' component={ReviewForm}/>
        <Route exact path="/" component={Footer} />
      </BrowserRouter>
  );
}

export default App;