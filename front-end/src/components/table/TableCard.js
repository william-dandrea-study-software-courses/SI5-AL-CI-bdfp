
import React, { useCallback } from "react";
import { observer } from 'mobx-react-lite';
import { Box, Button, Card, CardActions, CardContent, Typography, Modal, Input } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router";
import { TableService } from "../../services";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
};

const TableCard = observer((
    { tableInfo }) => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const validateOpen = useCallback(() => {
        const number = document.getElementById("customersCount");

        if (number !== null) {
            if (parseInt(number.value) > 0) {
                TableService.openTable({
                    tableNumber: tableInfo.number,
                    customersCount: parseInt(number.value)
                }).then(resp => navigate("/takeOrder/" + resp.data._id));
            } else {
                alert("Veuillez saisir un nombre de personnes valide");
            }

        }
    }, [navigate, tableInfo])

    const navTableOrders = useCallback((info) => {
        if (info.taken && info.tableOrderId != null) {
            navigate(`/table-orders/${info.tableOrderId}`);
        }
    }, [navigate]);

    return (
        <Card variant="outlined" style={{ backgroundColor: (tableInfo.taken ? orange["A100"] : "") }}>
            <CardContent onClick={() => navTableOrders(tableInfo)}>
                <Typography textAlign={"center"}>Table n°{tableInfo.number} </Typography>
            </CardContent>
            <CardActions>
                {tableInfo.taken ? <Button size="small" color={"success"} onClick={() => navigate("/takeOrder/" + tableInfo.tableOrderId)}>Add orders</Button>
                    : <Button size="small" color={"success"} onClick={handleOpen}>Open</Button>}
                {tableInfo.taken ? <Button size="small" color={"error"}>Close</Button> : null}
            </CardActions>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Nombre de personne à la table :
                    </Typography>
                    <Input id="customersCount" type="number" />
                    <Button onClick={validateOpen}>Valider</Button>
                </Box>
            </Modal>
        </Card >


    )
})

export default TableCard;