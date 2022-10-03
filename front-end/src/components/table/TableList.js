import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {TableService} from "../../services";
import TableCard from "./TableCard";

const TableList = observer(() => {
    const [allTables, setAllTables] = useState([]);
    const [isAllTableLoading, setIsAllTablesLoading] = useState(false)


    useEffect(() => {
        setIsAllTablesLoading(true);
        TableService.getAllTables()
            .then( resp => setAllTables(resp.data))
            .finally(() => setIsAllTablesLoading(false));
    }, [setAllTables, setIsAllTablesLoading]);

    console.log(allTables);
    return (
        <div>
            {allTables.map(x => <TableCard tableInfo={x}/>)}
        </div>
    )
    }
)

export default TableList;