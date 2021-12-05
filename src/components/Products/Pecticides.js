import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Product from "./Product/Product";
import useStyles from "./styles";

const Pecticides = ({ products, onAddToCart }) => {
    const classes = useStyles();
    const EmptyPage = () => (
        <Typography variant="h5">
            Currently Pecticides are not available for Your region
        </Typography>
    );

    const Pecticides = products.map((product) =>
        product.categories.map(
            (name) =>
                name.name === "Pecticides" && (
                    <Grid item xs={10} sm={6} md={4} lg={3}>
                        <Product onAddToCart={onAddToCart} product={product} />
                    </Grid>
                )
        )
    );

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {Pecticides ? Pecticides : <EmptyPage />}
            </Grid>
        </main>
    );
};

export default Pecticides;
