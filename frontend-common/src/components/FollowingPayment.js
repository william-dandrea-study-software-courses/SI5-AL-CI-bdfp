import {useParams} from "react-router-dom";
import {Button, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {DiningService} from "../services";


const FollowingPayment = () => {

    const { tableNumber } = useParams();
    const [globalCart, setGlobalCart] = useState(null);
    const [tableBill, setTableBill] = useState(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            DiningService.getGlobalCart(tableNumber).then(result => {
                setGlobalCart(result.data)

                DiningService.getTableBill(result.data.table_bill_id).then(r => {
                    setTableBill(r.data);
                })
            }).catch(e => {
                console.log(e)
            })
        }, 1 * 1000) // in milliseconds
        return () => clearInterval(intervalId);

    }, [setGlobalCart, tableNumber, setTableBill])


    const payForEveryone = useCallback((tableBillId) => {
        console.log("Pay for everyone")
        DiningService.payBillForEveryone(tableBillId).then(result => {
            setTableBill(result.data);
        })
    }, [setTableBill, tableNumber, tableBill])

    const payForMe = useCallback((tableBillId, userId) => {
        console.log(userId)

        DiningService.payBillForMe(tableBillId, userId).then(result => {
            setTableBill(result.data);
            console.log(result)
        })
    }, [setTableBill, tableNumber, tableBill])

    return (

        tableBill != null
            ?
            <Card>
                <Typography gutterBottom variant="h5" align="center">Following payment</Typography>

                <CardContent>
                    <Typography align="left" variant="h6">Amount left to pay : {tableBill.remaining_amount_to_be_paid} EUR</Typography>
                    <Button onClick={() => payForEveryone(tableBill._id)}>Pay for everyone</Button>

                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {tableBill.user_bills.map((value, index) => (
                            <ListItem key={index} disableGutters secondaryAction={<Typography>{value.remaining_amount_to_be_paid} EUR</Typography>}>
                                <ListItemText primary={`Person ${value.user_id}`}/>
                                <Button onClick={() => payForMe(tableBill._id, value.user_id)}>Pay for me</Button>
                            </ListItem>
                        ))}
                    </List>

                </CardContent>
            </Card>
            : <div></div>
    )
}


export default FollowingPayment;
