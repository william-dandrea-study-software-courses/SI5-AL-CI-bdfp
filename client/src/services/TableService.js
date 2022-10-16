import axios from "axios";
import {BehaviorSubject} from "rxjs";

const tableUrl = "http://localhost:5301/table-resume/infos";

const tables$ = new BehaviorSubject(null)

const getAllTables = () => {
  return new Promise((resolve, reject) => {
    axios.get(tableUrl).then(tables => {
      tables$.next(tables.data);
      console.log(tables.data);
      resolve(tables.data);
    }).catch(error => {
      reject(error);
    })
  });
}

const openTable = (tableNumber, people) => {
  const body = { numberOfPersons: people };
  const urlOpen = `http://localhost:5301/table-resume/${tableNumber}/open-table`;

  return new Promise((resolve, reject) => {
    axios.post(urlOpen, body).then(tables => {
      tables$.next(tables.data);
      console.log(tables.data);
      resolve(tables.data);
    }).catch(error => {
      reject(error);
    })
  });
};

const serveTable = (preparationId) => {
  const urlServe = `http://localhost:5301/table-resume/${preparationId}/served`;

  return new Promise((resolve, reject) => {
    axios.post(urlServe).then(tables => {
      tables$.next(tables.data);
      console.log(tables.data);
      resolve(tables.data);
    }).catch(error => {
      reject(error);
    })
  });
};

const closeTable = (tableOrderId) => {
  const urlClose = `http://localhost:5301/table-resume/${tableOrderId}/pay-and-close-table`;

  return new Promise((resolve, reject) => {
    axios.post(urlClose).then(tables => {
      tables$.next(tables.data);
      console.log(tables.data);
      resolve(tables.data);
    }).catch(error => {
      reject(error);
    })
  });
};

const updateTablesObservable = (tables) => {
  tables$.next(tables);
}

export const TableService = {
  getAllTables,
  openTable,
  closeTable,
  serveTable,
  tables$,
  updateTablesObservable
};
