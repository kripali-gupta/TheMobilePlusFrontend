import React, { useEffect } from 'react';
import CategoryInterface from './components/category/CategoryInterface';
import OutletInterface from './components/outlets/OutletInterface';
import BrandInterface from './components/brand/BrandInterface';
import DisplayAll from './components/category/DisplayAll';
import DisplayAllCat from './components/category/DisplayAllCat'
import DisplayAllBrand from './components/brand/DisplayAllBrand'
import DisplayAllOutlets from './components/outlets/DisplayAllOutlets'
import ModelInterface from './components/model/ModelInterface'
import DisplayAllModel from './components/model/DisplayAllModel'
import SignIn from './components/admin/SignIn'
import Dashboard from './components/admin/Dashboard';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ProductInterface from './components/product/ProductInterface';
import DisplayAllProduct from './components/product/DisplayAllProduct'
import Vendorlogin from './components/vendorlogin/Login';
import VendorDashboard from './components/vendorlogin/VendorDashboard'
import ProductPicture from './components/productpicture/ProductPicture'
import DisplayProductPicture from './components/productpicture/DisplayProductPicture'
import MainPage from './components/clientview/MainPage'
import FirstPage from './components/clientview/FirstPage'
import StockInventory from './components/product/StockInventory'
import ViewListofProducts from './components/clientview/ViewListofProducts'
import ProductView from './components/clientview/ProductView'
import CategoriesTreeView from './components/clientview/CategoriesTreeView'
import AddPin from './components/pin/AddPin'
import DisplayAllPin from './components/pin/DisplayAllPin'
import ShowCart from './components/clientview/ShowCart'
import UserLogin from './components/userlogin/UserLogin'
import ShowCarWithAddress from './components/clientview/ShowCartWithAddres'
import PaymentGateway from './components/clientview/PaymentGateway'
import ViewListofBrandProducts from './components/clientview/ViewListofBrandProducts'
import MyAccount from './components/clientview/MyAccount'
import FAQ from './components/clientview/FAQ'
import ContactUs from './components/clientview/ContactUs'
import AboutUs from './components/clientview/AboutUs';
import OrderHistory from './components/clientview/OrderHistory';
import ShopByCategory from './components/clientview/ShopByCategory';
import ViewListofModelProducts from './components/clientview/ViewListofModelProducts'
import ViewListofSearchProducts from './components/clientview/ViewListofSearchProducts'




function App(props) {
 
  

  
  return (
    <div>
      <Router>
        <Route exact strict component={SignIn} path="/Signin" history={props.history} />
        <Route exact strict component={Dashboard} path="/Dashboard" history={props.history} />
        <Route exact strict component={CategoryInterface} path="/CategoryInterface" history={props.history} />
        <Route exact strict component={DisplayAllCat} path="/DisplayAllCat" history={props.history} />
        <Route exact strict component={OutletInterface} path="/OutletInterface" history={props.history} />
        <Route exact strict component={DisplayAllOutlets} path="/DisplayAllOutlets" history={props.history} />
        <Route exact strict component={BrandInterface} path="/BrandInterface" history={props.history} />
        <Route exact strict component={DisplayAllBrand} path="/DisplayAllBrand" history={props.history} />
        <Route exact strict component={ModelInterface} path="/ModelInterface" history={props.history} />
        <Route exact strict component={DisplayAllModel} path="/DisplayAllModel" history={props.history} />
        <Route exact strict component={ProductInterface} path="/ProductInterface" history={props.history} />
        <Route exact strict component={DisplayAllProduct} path="/DisplayAllProduct" history={props.history} />
        <Route exact strict component={Vendorlogin} path="/Vendorlogin" history={props.history} />
        <Route exact strict component={VendorDashboard} path="/VendorDashboard" history={props.history} />
        <Route exact strict component={ProductPicture} path="/ProductPicture" history={props.history} />
        <Route exact strict component={DisplayProductPicture} path="/DisplayProductPicture" history={props.history} />
        <Route exact strict component={MainPage} path="/MainPage" history={props.history} />
        <Route exact strict component={UserLogin} path="/UserLogin" history={props.history} />
        <Route exact strict component={FirstPage} path="/" history={props.history} />
        <Route exact strict component={ViewListofProducts} path="/ViewListofProducts/:cid" history={props.history} />
        <Route exact strict component={ProductView} path="/ProductView/:pid" history={props.history} />
        <Route exact strict component={StockInventory} path="/StockInventory" history={props.history} />
        <Route exact strict component={CategoriesTreeView} path="/CategoriesTreeView" history={props.history} />
        <Route exact strict component={AddPin} path="/AddPin" history={props.history} />
        <Route exact strict component={DisplayAllPin} path="/DisplayAllPin" history={props.history} />
        <Route exact strict component={ShowCart} path="/ShowCart" history={props.history} />
        <Route exact strict component={ShowCarWithAddress} path="/ShowCartWithAddress" history={props.history} />
        <Route exact strict component={PaymentGateway} path="/PaymentGateway" history={props.history} />
        <Route exact strict component={ViewListofBrandProducts} path="/ViewListofBrandProducts/:bid" history={props.history} />
        <Route exact strict component={MyAccount} path="/MyAccount" history={props.history} />
        <Route exact strict component={FAQ} path="/NeedHelp" history={props.history} />
        <Route exact strict component={ContactUs} path="/ContactUs" history={props.history} />
        <Route exact strict component={AboutUs} path="/AboutUs" history={props.history} />
        <Route exact strict component={OrderHistory} path="/OrderHistory" history={props.history} />
        <Route exact strict component={ShopByCategory} path="/ShopByCategory" history={props.history} />
        <Route exact strict component={ViewListofModelProducts} path="/ViewListofModelProducts/:mid" history={props.history} />
        <Route exact strict component={ViewListofSearchProducts} path="/ViewListofSearchProducts/:search" history={props.history} />
      </Router>

    </div>
  );
}

export default App;
