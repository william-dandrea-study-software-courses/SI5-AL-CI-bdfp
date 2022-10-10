import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { TableService } from "../../services/TableService";

const TableCard = observer(({ tableInfo }) => {
  const navigate = useNavigate();

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
              onClick={() => TableService.closeTable(tableInfo.tableOrderId)}
            >
              {" "}
              Close{" "}
            </Button>
          </ButtonGroup>
        ) : (
          <Button
            size="small"
            color={"success"}
            variant="contained"
            onClick={() => TableService.openTable(tableInfo.tableNumber, 4)}
          >
            {" "}
            Open{" "}
          </Button>
        )}
      </CardActions>
    </Card>
  );
});

export default TableCard;
