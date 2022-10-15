/* eslint-disable no-undef */
import { Button, ButtonGroup, Divider, Grid, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TableService } from "../../services";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import OrderPreparationCard from "./OrderPreparationCard";

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

      <Typography textAlign={"right"}>
        {tableInfo.statusOrder === "ORDER_READY_TO_BE_DELIVERED_TO_TABLE"
          ? "ready to be served"
          : tableInfo.statusOrder === "ORDER_IN_PROGRESS"
          ? "order in preparation"
          : "no order"}
      </Typography>

      <Typography textAlign={"center"} marginBottom={2}>
        Liste des preparations en cours
      </Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {tableInfo.preparations?.map((item) => (
          <Grid item xs={12} key={item.preparation_id}>
            <OrderPreparationCard preparation={item}></OrderPreparationCard>
          </Grid>
        ))}
      </Grid>
      <Divider></Divider>
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
