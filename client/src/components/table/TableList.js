import { Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import TableCard from "./TableCard";
import { TableService } from "../../services/TableService";

const TableList = observer(() => {
  const [allTables, setAllTables] = useState([]);
  const [isAllTableLoading, setIsAllTableLoading] = useState([]);

  useEffect(() => {
    setIsAllTableLoading(true);
    TableService.getAllTables()
      .then((resp) => setAllTables(resp.data))
      .finally(() => setIsAllTableLoading(false));
  }, [setAllTables, setIsAllTableLoading]);

  console.log(allTables);

  return (
    <div>
      <Typography textAlign={"center"} marginBottom={2}>
        Liste des tables
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {allTables.map((x) => (
          <Grid item xs={6} key={x.tableNumber}>
            <TableCard tableInfo={x} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
});

export default TableList;
