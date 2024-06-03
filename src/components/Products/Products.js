import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";

import { useAuth } from "../../contexts/AuthContext";

const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();
    const { currentUser } = useAuth();

    return (
        <>
            {currentUser ? (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Grid container justify="center" spacing={4}>
                        {products.map((product) => (
                            <Grid item xs={10} sm={6} md={4} lg={3}>
                                <Product
                                    key={product.id}
                                    product={product}
                                    onAddToCart={onAddToCart}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </main>
            ) : (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Grid container justify="center" spacing={4}>
                        {products.map((product) => (
                            <Grid item xs={10} sm={6} md={4} lg={3}>
                                <Product
                                    key={product.id}
                                    product={product}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </main>
            )}
        </>
    );
};

export default Products;
