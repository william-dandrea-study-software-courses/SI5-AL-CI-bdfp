import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { TableService } from "../../services";
import TableCard from "./TableCard";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TableList = observer(() => {
    const [allTables, setAllTables] = useState([]);
    const [isAllTableLoading, setIsAllTablesLoading] = useState(false)

    useEffect(() => {
        setIsAllTablesLoading(true);
        TableService.getAllTables()
            .then(resp => setAllTables(resp.data))
            .finally(() => setIsAllTablesLoading(false));
    }, [setAllTables, setIsAllTablesLoading]);

    return (
        <div>
            <Typography textAlign={"center"} marginBottom={2}>Liste des tables</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {allTables.map(x =>
                    <Grid item xs={6}>
                        <TableCard tableInfo={x} />
                    </Grid>
                )}
            </Grid>
        </div>

    )
}
)

export default TableList;