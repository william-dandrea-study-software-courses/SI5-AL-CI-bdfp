import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { TableService } from "../../services";
import TableCard from "./TableCard";
import { Grid, Typography } from "@mui/material";

const TableList = observer(() => {
    const [allTables, setAllTables] = useState([]);

    useEffect(() => {
        TableService.getAllTables().then(resp => setAllTables(resp.data));
    }, [setAllTables]);

    const handleChange = () => {
        TableService.getAllTables().then(resp => setAllTables(resp.data));
    }

    return (
        <div>
            <Typography textAlign={"center"} marginBottom={2}>Liste des tables</Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {allTables.map((x, index) =>
                    <Grid item xs={6} key={index}>
                        <TableCard tableInfo={x} handleChange={handleChange} />
                    </Grid>
                )}
            </Grid>
        </div>

    )
}
)

export default TableList;