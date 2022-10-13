import React, { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { TableService } from "../../services/TableService";

const TableCard = observer(({ tableInfo }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleRedirect = useCallback(
    (path) => {
      console.log(path);
      navigate(path);
    },
    [navigate]
  );

  const handleOrder = useCallback(() => {
    navigate("/" + tableInfo.tableOrderId + "/menu");
  }, [navigate, tableInfo]);

  const handlePopOpen = () => {
    setOpen(true);
  };

  const handlePopClose = () => {
    setOpen(false);
  };

  const handleCloseTable = useCallback(() => {
    TableService.closeTable(tableInfo.tableOrderId);
    // window.location.reload(true);
  }, [tableInfo]);

  console.log(tableInfo);

  return (
    <Card
      variant="outlined"
      style={{ backgroundColor: tableInfo.isTaken ? blue[300] : "" }}
    >
      <CardContent
        onClick={() => handleRedirect("/tables/" + tableInfo.tableNumber)}
      >
        <Typography textAlign={"center"}>
          Table n°{tableInfo.tableNumber}
        </Typography>
      </CardContent>
      <CardActions>
        {tableInfo.isTaken ? (
          <ButtonGroup variant="contained">
            <Button size="small" color={"info"} onClick={() => handleOrder()}>
              Order
            </Button>
            <Button
              size="small"
              color={"error"}
              onClick={() => handleCloseTable()}
            >
              {" "}
              Close{" "}
            </Button>
          </ButtonGroup>
        ) : (
          <div>
            <Button
              size="small"
              color={"success"}
              variant="contained"
              onClick={() => handlePopOpen()}
            >
              {" "}
              Open{" "}
            </Button>
            <Dialog open={open} onClose={() => handlePopClose()}>
              <DialogTitle> Open table </DialogTitle>
              <DialogContent>
                <DialogContentText>How much gest will eat ?</DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="guestsNumber"
                  label="Number of guest"
                  type="number"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handlePopClose()}>Cancel</Button>
                <Button
                  onClick={() => {
                    const guests = parseInt(
                      document.getElementById("guestsNumber").value
                    );
                    TableService.openTable(tableInfo.tableNumber, guests);
                    handlePopClose();
                    handleRedirect("/tables/" + tableInfo.tableNumber);
                  }}
                >
                  Open table
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </CardActions>
    </Card>
  );
});

export default TableCard;
