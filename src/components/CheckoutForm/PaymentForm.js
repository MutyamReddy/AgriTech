import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
    Elements,
    CardElement,
    ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const stripePromise = loadStripe("...");

const PaymentForm = ({
    checkoutToken,
    onCheckout,
    shippingData,
    nextStep,
    backStep,
}) => {
    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.log(error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {
                    firstname: shippingData.firstname,
                    email: shippingData.email,
                },
                shipping: {
                    name: "Primary",
                    adress: shippingData.adress,
                    city: shippingData.city,
                    state: shippingData.subDivision,
                    pincode: shippingData.pincode,
                },
                fullfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: "stripe",
                    stripe: {
                        payment_method_id: paymentMethod.id,
                    },
                },
            };

            onCheckout(checkoutToken.id, orderData);
            nextStep();
        }
    };

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
                Payment Method
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elemets, stripe }) => (
                        <form
                            onSubmit={(e) => handleSubmit(e, elemets, stripe)}
                        >
                            <CardElement />
                            <br />
                            <br />
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Button variant="outlined" onClick={backStep}>
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!stripe}
                                    color="primary"
                                >
                                    Pay{" "}
                                    {
                                        checkoutToken.live.subtotal
                                            .formatted_with_symbol
                                    }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    );
};

export default PaymentForm;
