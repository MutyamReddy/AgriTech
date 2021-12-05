import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
    ForgottPassword,
    Login,
    PrivateRoute,
    Profile,
    Signup,
    UpdateProfile,
    Products,
    Navbar1,
    Cart,
    Checkout,
    Seeds,
} from "./components";
import "bootstrap/dist/css/bootstrap.min.css";

import { commerce } from "./lib/Commerce";
import Fertilizers from "./components/Products/Fertilizers";
import Pecticides from "./components/Products/Pecticides";

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);
    const [errorMessage, setErrormessage] = useState("");

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    };

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    };

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    };

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    };

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(
                checkoutTokenId,
                newOrder
            );

            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrormessage(error.data.error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <>
            <Router>
                <Navbar1 totalItems={cart.total_items} />

                <Switch>
                    <Route path="/seeds">
                        <Seeds
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    </Route>
                    <Route path="/fertilizers">
                        <Fertilizers
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    </Route>
                    <Route path="/pecticides">
                        <Pecticides
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    </Route>
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute
                        path="/update-profile"
                        component={UpdateProfile}
                    />
                    <Route
                        path="/forgot-password"
                        component={ForgottPassword}
                    />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute component={Products} exact path="/">
                        <Products
                            products={products}
                            onAddToCart={handleAddToCart}
                        />
                    </PrivateRoute>
                    <PrivateRoute path="/cart">
                        <Cart
                            cart={cart}
                            onUpdateCartQty={handleUpdateCartQty}
                            onRemoveFromCart={handleRemoveFromCart}
                            onEmptyCart={handleEmptyCart}
                        />
                    </PrivateRoute>
                    <PrivateRoute path="/checkout">
                        <Checkout
                            cart={cart}
                            onCheckout={handleCaptureCheckout}
                            order={order}
                            errorMessage={errorMessage}
                        />
                    </PrivateRoute>
                </Switch>
                {
                    // !(
                    //     location.pathname === "/signup" ||
                    //     location.pathname === "/login"
                    // ) && <Footer />
                }
            </Router>
        </>
    );
}

export default App;
