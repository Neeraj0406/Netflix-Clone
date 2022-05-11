import React, { useContext } from "react";
import "./app.css";
import Home from "./pages/home/Home";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import NotFound from "./pages/notFound/NotFound";
import { AuthContext } from "./context/authContext/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Listlist from "./pages/listList/Listlist";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          <Route element={<ProtectedRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users" element={<UserList />} />
            <Route exact path="/user/:userId" element={<User />} />
            <Route exact path="/newUser" element={<NewUser />} />
            <Route exact path="/movies" element={<ProductList />} />
            <Route exact path="/product/:productsId" element={<Product />} />
            <Route exact path="/newProduct" element={<NewProduct />} />
            <Route exact path="/lists" element={<Listlist />} />
            <Route exact path="/list/:listsId" element={<List />} />
            <Route exact path="/newList" element={<NewList />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
