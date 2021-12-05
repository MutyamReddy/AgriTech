import React, { useEffect, useState } from "react";
import {
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    CircularProgress,
    Divider,
    Button,
} from "@material-ui/core";

import useStyles from "./styles";
import AdressForm from "../AdressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/Commerce";
import { useHistory } from "react-router-dom";

const steps = ["Shipping Adress", "Payment Details"];

const Checkout = ({ cart, onCheckout, order, errorMessage }) => {
    const history = useHistory();
    const [activestep, setActivestep] = useState(0);
    const classes = useStyles();
    const [checkoutToken, setCheckouttoken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: "cart",
                });

                setCheckouttoken(token);
            } catch (error) {
                history.push("/");
            }
        };

        generateToken();
    }, [cart, history]);

    let ConfirmationForm = () =>
        order.customer ? (
            <>
                <div>
                    <Typography variant="h5">
                        Your Order is Succesfull,Thank you{" "}
                        {order.customer.firstname}.
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">Order Ref:</Typography>
                </div>
                <br />
                <Button
                    variant="outlined"
                    type="button"
                    onClick={() => history.push("/")}
                >
                    Continue Shopping
                </Button>
            </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress />
            </div>
        );

    if (errorMessage) {
        <>
            <Typography variant="h5">Error:{errorMessage}</Typography>
            <br />
            <Button
                variant="outlined"
                type="button"
                onClick={() => history.push("/")}
            >
                Go to Home
            </Button>
        </>;
    }

    const Form = () =>
        activestep === 0 ? (
            <AdressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                shippingData={shippingData}
                checkoutToken={checkoutToken}
                nextStep={nextStep}
                backStep={previousStep}
                onCheckout={onCheckout}
            />
        );

    const nextStep = () =>
        setActivestep((prevActiveStep) => prevActiveStep + 1);
    const previousStep = () =>
        setActivestep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    };

    return (
        <>
            <div className={classes.toolbar}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" align="center">
                            Checkout
                        </Typography>
                        <Stepper
                            activeStep={activestep}
                            className={classes.stepper}
                        >
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activestep === steps.length ? (
                            <ConfirmationForm />
                        ) : (
                            checkoutToken && <Form />
                        )}
                    </Paper>
                </main>
            </div>
        </>
    );
};

export default Checkout;
