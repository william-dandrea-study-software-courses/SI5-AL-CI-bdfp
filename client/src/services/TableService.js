import axios from "axios";

const tableUrl = "http://localhost:5301/table-resume/infos";

const getAllTables = () => axios.get(tableUrl);

const openTable = (tableNumber, people) => {
  const body = { numberOfPersons: people };

  const url = `http://localhost:5301/table-resume/${tableNumber}/open-table`;
  console.log(url);
  console.log(body);
  axios.post(url, body);
};

const closeTable = (tableOrderId) => {
  const url = `http://localhost:5301/table-resume/${tableOrderId}/pay-and-close-table`;
  console.log(url);
  axios.post(url);
};

export const TableService = {
  getAllTables,
  openTable,
  closeTable,
};
