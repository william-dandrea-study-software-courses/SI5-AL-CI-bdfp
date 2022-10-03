import axios from "axios";

const tablesUrl="http://localhost:3001/tables"

const getAllTables = () => axios.get(tablesUrl)

export const TableService = {
    getAllTables
}