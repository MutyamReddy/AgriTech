import React, { useEffect, useState } from "react";
import {
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
    Typography,
} from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "./CustomTextFiled";
import { commerce } from "../../lib/Commerce";
import { useHistory } from "react-router-dom";

const AdressForm = ({ checkoutToken, next }) => {
    const history = useHistory();
    const methods = useForm();
    const [shippingCountry, setShippingCountry] = useState();
    const [subDivisions, setSubDivisions] = useState([]);
    const [subDivision, setSubDivision] = useState();

    const shippingSubDivisions = Object.entries(
        subDivisions
    ).map(([code, name]) => ({ id: code, label: name }));

    const fetchShippingCountry = async (checkoutTokenId) => {
        const {
            countries,
        } = await commerce.services.localeListShippingCountries(
            checkoutTokenId
        );
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubDivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
            countryCode
        );

        setSubDivisions(subdivisions);
        setSubDivision(Object.keys(subdivisions)[0]);
    };

    useEffect(() => {
        fetchShippingCountry(checkoutToken.id);
    }, [checkoutToken]);

    useEffect(() => {
        if (shippingCountry) fetchSubDivisions(shippingCountry);
    }, [shippingCountry]);

    return (
        <>
            <Typography variant="h6" gutterBottom align="center">
                Shipping Adress
            </Typography>
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit((data) =>
                        next({ ...data, subDivision })
                    )}
                >
                    <Grid
                        container
                        spacing={3}
                        style={{ paddingBottom: "30px" }}
                    >
                        <FormInput
                            required
                            name="firstname"
                            label="First Name"
                        />
                        <FormInput required name="mobileno" label="Cell no" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="adress" label="Adress" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="pincode" label="Pincode" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Select State</InputLabel>
                        <Select
                            value={subDivision}
                            fullWidth
                            onChange={(e) => setSubDivision(e.target.value)}
                        >
                            {shippingSubDivisions.map((subdiv) => (
                                <MenuItem key={subdiv.id} value={subdiv.id}>
                                    {subdiv.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <br />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => history.push("/cart")}
                        >
                            Back to Cart
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                        >
                            Proceed
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
};

export default AdressForm;
