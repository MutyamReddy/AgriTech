import React from "react";

import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link, useHistory } from "react-router-dom";

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
    const classes = useStyles();
    const history = useHistory();

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your Cart,
            <Link to="/" className={classes.link}>
                go to home and add some
            </Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexGrow: "1",
                    flexWrap: "wrap",
                    paddingTop: "15px",
                    paddingBottom: "0px",
                    marginBottom: "0px",
                }}
                justify="center"
                conatiner
                spacing={4}
            >
                {cart.line_items.map((item) => (
                    <Grid item xs={10} sm={6} md={4} lg={3} key={item.id}>
                        <CartItem
                            item={item}
                            onUpdateCartQty={onUpdateCartQty}
                            onRemoveFromCart={onRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal:{cart.subtotal.formatted_with_symbol}
                </Typography>
                <div style={{ paddingBottom: "10px", marginTop: "0px" }}>
                    <Button
                        size="large"
                        className={classes.emptyButton}
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => onEmptyCart()}
                    >
                        Empty Cart
                    </Button>
                    <Button
                        size="large"
                        className={classes.checkoutButton}
                        type="button"
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push("/checkout")}
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    );

    if (!cart.line_items) return "Loading...";

    return (
        <>
            <Container>
                <div className={classes.toolbar} />
                <Typography className={classes.title} variant="h3">
                    Your Shopping Cart
                </Typography>
                {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
            </Container>
        </>
    );
};

export default Cart;
