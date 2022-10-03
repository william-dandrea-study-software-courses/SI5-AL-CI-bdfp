import React from "react";
import { observer } from 'mobx-react-lite';

const TableCard = observer((
    {tableInfo}) => {

    return (
        <div>{tableInfo.number}</div>
    )
})

export default TableCard;