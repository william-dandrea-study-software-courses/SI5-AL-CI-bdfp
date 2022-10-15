import axios from "axios";

const preparationsUrl = "http://localhost:3002/preparations"

const getPreparationsStarted = (tableNumber) => axios.get(preparationsUrl + "?tableNumber=" + tableNumber + "&state=preparationStarted");

const getPreparationsReady = (tableNumber) => axios.get(preparationsUrl + "?tableNumber=" + tableNumber + "&state=readyToBeServed");

const takenToTable = (preparationsId) => axios.post(preparationsUrl + "/" + preparationsId + "/takenToTable");

export const KitchenService = {
    getPreparationsStarted,
    getPreparationsReady,
    takenToTable
}