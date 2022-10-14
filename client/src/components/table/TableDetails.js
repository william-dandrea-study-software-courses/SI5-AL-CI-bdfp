/* eslint-disable no-undef */
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TableService } from "../../services";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AutorenewIcon from "@mui/icons-material/Autorenew";
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

  const handleServed = useCallback(() => {
    tableInfo.readyToBeServedPreparationsId?.map((id) => {
      TableService.serveTable(id);
    });
  }, [tableInfo]);

  const handleRefresh = useCallback(() => {
    window.location.reload(true);
  }, []);

  return (
    <div>
      <div style={{ position: "left" }} onClick={() => handleGoBack()}>
        <ArrowBackIosIcon />
      </div>
      <div style={{ position: "right" }} onClick={() => handleRefresh()}>
        <AutorenewIcon />
      </div>
      <Typography textAlign={"center"} marginBottom={2}>
        Table n°{tableNumber}
      </Typography>
      <Typography textAlign={"center"} marginBottom={2}>
        Liste des commandes
      </Typography>
      <Typography textAlign={"right"}>
        {tableInfo.statusOrder === "ORDER_READY_TO_BE_DELIVERED_TO_TABLE"
          ? "ready to be served"
          : tableInfo.statusOrder === "ORDER_IN_PROGRESS"
          ? "order in preparation"
          : "no order"}
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
      {tableInfo.statusOrder === "ORDER_READY_TO_BE_DELIVERED_TO_TABLE" ? (
        <Button
          variant="contained"
          color={"error"}
          onClick={() => handleServed()}
        >
          {" "}
          Serve{" "}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
export default TableDetails;
