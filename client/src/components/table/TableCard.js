  return (
import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const TableCard = observer(({ tableInfo }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (path) => {
      console.log(path);
      navigate(path);
    },
    [navigate]
  );

  return (
    <Card
      variant="outlined"
      style={{ backgroundColor: tableInfo.isTaken ? blue[300] : "" }}
      onClick={() => handleClick("/tables/" + tableInfo.tableNumber)}
    >
      <CardContent>
        <Typography textAlign={"center"}>
          Table n°{tableInfo.tableNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color={"success"}>
          {" "}
          Open{" "}
        </Button>
        <Button size="small" color={"error"}>
          {" "}
          Close{" "}
        </Button>
      </CardActions>
    </Card>
  );
});

export default TableCard;
