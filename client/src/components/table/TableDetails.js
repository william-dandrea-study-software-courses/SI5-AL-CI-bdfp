import { Card, CardContent, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TableService } from "../../services";

const TableDetails = () => {
  let { tableId } = useParams();

  const [allTables, setAllTable] = useState([]);

  useEffect(() => {
    TableService.getAllTables().then((resp) => setAllTable(resp.data));
  }, [setAllTable]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography textAlign={"center"}> Table n°{tableId} </Typography>
        <Typography textAlign={"center"}>{allTables}</Typography>
      </CardContent>
    </Card>
  );
};
export default TableDetails;
