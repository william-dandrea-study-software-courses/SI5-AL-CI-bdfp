import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { DiningService } from "../../services";
import TableCard from "./TableCard";
import { Grid, Typography } from "@mui/material";

const TableList = observer(() => {
    const [allTables, setAllTables] = useState([]);

    useEffect(() => {
        DiningService.getAllTables().then(resp => setAllTables(resp.data));
    }, [setAllTables]);

    const handleChange = () => {
        DiningService.getAllTables().then(resp => setAllTables(resp.data));
    }

    return (
        <div>
            <Typography textAlign={"center"} marginBottom={2}>Tables list</Typography>
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