
import React, { useCallback, useEffect } from "react";
import { observer } from 'mobx-react-lite';
import { Box, Button, Card, CardActions, CardContent, Typography, Modal, Input } from "@mui/material";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router";
import { TableService } from "../../services";
import Bill from "./Bill";

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

const TableCard = observer((props) => {
    const navigate = useNavigate();
    const [openTableModal, setOpenTableModal] = React.useState(false);
    const setTrueOpenTableModal = () => setOpenTableModal(true);
    const setFalseOpenTableModal = () => setOpenTableModal(false);
    const [closeTableModal, setCloseTableModal] = React.useState(false);
    const setTrueCloseTableModal = () => setCloseTableModal(true);
    const setFalseCloseTableModal = () => setCloseTableModal(false);

    const openTable = useCallback(() => {
        const number = document.getElementById("customersCount");
        if (number !== null) {
            if (parseInt(number.value) > 0) {
                TableService.openTable({
                    tableNumber: props.tableInfo.number,
                    customersCount: parseInt(number.value)
                }).then(resp => navigate("/takeOrder/" + resp.data._id));
            } else {
                alert("Veuillez saisir un nombre de personnes valide");
            }
        }
    }, [navigate, props.tableInfo])

    const closeTable = useCallback(() => {
        TableService.closeTable(props.tableInfo.tableOrderId)
            .then(() => {
                setFalseCloseTableModal();
                props.handleChange();
            });
    }, [props.tableInfo]);

    const navTableOrders = useCallback((info) => {
        if (info.taken && info.tableOrderId != null) {
            navigate(`/table-orders/${info.tableOrderId}`);
        }
    }, [navigate]);

    return (
        <Card variant="outlined" style={{ backgroundColor: (props.tableInfo.taken ? orange["A100"] : "") }}>
            <CardContent onClick={() => navTableOrders(props.tableInfo)}>
                <Typography textAlign={"center"}>Table n°{props.tableInfo.number} </Typography>
            </CardContent>
            <CardActions>
                {props.tableInfo.taken ? <Button size="small" color={"success"} onClick={() => navigate("/takeOrder/" + props.tableInfo.tableOrderId)}>Add orders</Button>
                    : <Button size="small" color={"success"} onClick={setTrueOpenTableModal}>Open</Button>}
                {props.tableInfo.taken ? <Button size="small" color={"error"} onClick={setTrueCloseTableModal}>Close</Button> : null}
            </CardActions>
            <Modal
                open={openTableModal}
                onClose={setFalseOpenTableModal}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Nombre de personnes à la table :
                    </Typography>
                    <Input type="number" id="customersCount" placeholder="Nombre de personnes" />
                    <Button onClick={openTable}>Valider</Button>
                </Box>
            </Modal>
            <Modal
                open={closeTableModal}
                onClose={setFalseCloseTableModal}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Facture de la table :
                    </Typography>
                    <Bill tableOrderId={props.tableInfo.tableOrderId} />
                    <Button onClick={closeTable}>Payer</Button>
                </Box>
            </Modal>
        </Card >


    )
})

export default TableCard;