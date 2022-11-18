import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { DiningService } from '../services';
import { Input, Button } from '@mui/material';

const StartPage = () => {
    const navigate = useNavigate();
    const tableNumber = 7;

    const container = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };

    const nav = useCallback(() => {
        const number = document.getElementById("customersCount");
        if (number !== null) {
            if (parseInt(number.value) > 0) {
                console.log(number.value);
                navigate(`/global-cart/${tableNumber}`);
                DiningService.openGlobalCart(tableNumber, number.value).then((response) => {
                    console.log(response);
                });
            } else {
                alert("Veuillez saisir un nombre de personnes valide");
            }
        }
    }, [navigate]);

    return (
        <div style={container}>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
                <Input id="customersCount" type="number" placeholder="Number of people" style={{ marginBottom: 30 }}></Input>
                <Button onClick={nav} variant="contained">Start ordering</Button>
            </div>
        </div >
    );
};

export default StartPage;