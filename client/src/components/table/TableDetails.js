import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TableService } from "../../services";

const TableDetails = () => {
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

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography textAlign={"center"}> Table n°{tableNumber} </Typography>
        <Typography textAlign={"left"}>{tableInfo.statusOrder}</Typography>
      </CardContent>
    </Card>
  );
};
export default TableDetails;
