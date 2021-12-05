import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Product from "./Product/Product";
import useStyles from "./styles";

const Seeds = ({ products, onAddToCart }) => {
    const classes = useStyles();

    const EmptyPage = () => (
        <Typography variant="h5">
            Currently Seeds are not available for Your region
        </Typography>
    );

    const seeds = products.map((product) =>
        product.categories.map(
            (name) =>
                name.name === "Seeds" && (
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
                {seeds ? seeds : <EmptyPage />}
            </Grid>
        </main>
    );
};

export default Seeds;
