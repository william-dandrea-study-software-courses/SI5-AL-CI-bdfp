import axios from "axios";

const tableUrl = "http://localhost:5301/table-resume/infos";

const getAllTables = () => axios.get(tableUrl);

const openTable = (tableNumber, people) => {
  const body = { numberOfPersons: people };

  const urlOpen = `http://localhost:5301/table-resume/${tableNumber}/open-table`;
  console.log(body);
  axios.post(urlOpen, body);
};

const serveTable = (preparationId) => {
  const urlServe = `http://localhost:5301/table-resume/${preparationId}/served`;
  return axios.post(urlServe);
};

const closeTable = (tableOrderId) => {
  const urlClose = `http://localhost:5301/table-resume/${tableOrderId}/pay-and-close-table`;
  axios.post(urlClose);
};

export const TableService = {
  getAllTables,
  openTable,
  closeTable,
  serveTable,
};
