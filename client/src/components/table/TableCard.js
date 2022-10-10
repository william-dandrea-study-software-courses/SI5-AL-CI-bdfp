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
import axios from "axios";

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

  const openTablehandler = useCallback((path) => {
    axios
      .post(path, {
        numberOfPersons: 4,
      })
      .then(function (response) {
        console.log(response);
      })
      .then(function (error) {
        console.log(error);
      });
  });

  console.log(tableInfo)

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
            <Button size="small" color={"error"}>
              {" "}
              Close{" "}
            </Button>
          </ButtonGroup>
        ) : (
          <Button size="small" color={"success"} variant="contained">
            {" "}
            Open{" "}
          </Button>
        )}
      </CardActions>
    </Card>
  );
});

export default TableCard;
