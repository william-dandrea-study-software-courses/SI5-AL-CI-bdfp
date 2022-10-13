import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TableService } from "../../services";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import OrderCard from "./OrderCard";

const TableDetails = () => {
  const navigate = useNavigate();
  let { tableNumber } = useParams();
  const [tableInfo, setTableInfo] = useState([]);

  useEffect(() => {
    TableService.getAllTables().then((resp) => {
      for (let table of resp.data) {
        if (table.tableNumber === parseInt(tableNumber)) {
          setTableInfo(table);
        }
      }
    });
  }, [setTableInfo, tableNumber]);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleOrder = useCallback(() => {
    navigate("/" + tableInfo.tableOrderId + "/menu");
  }, [navigate, tableInfo]);

  return (
    <div>
      <div style={{ position: "absolute" }} onClick={() => handleGoBack()}>
        <ArrowBackIosIcon />
      </div>
      <Typography textAlign={"center"} marginBottom={2}>
        Table n°{tableNumber}
      </Typography>
      <Typography textAlign={"center"} marginBottom={2}>
        Liste des commandes
      </Typography>
      <Typography textAlign={"right"}>
        {tableInfo.statusOrder === "ANY_ORDER"
          ? "no order placed"
          : "order progressing"}
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {tableInfo.lines?.map((item) => (
          <Grid item xs={6} key={item.itemShortName}>
            <OrderCard orderInfo={item} />
          </Grid>
        ))}
      </Grid>
      {tableInfo.isTaken ? (
        <ButtonGroup>
          <Button
            variant="contained"
            color={"success"}
            onClick={() => handleOrder()}
          >
            {" "}
            Place order
          </Button>
          <Button variant="outlined" color={"error"}>
            {" "}
            Bill{" "}
          </Button>
        </ButtonGroup>
      ) : (
        ""
      )}
    </div>
  );
};
export default TableDetails;
