import logo from './logo.svg';
import './App.css';
import { getHelloWorld } from './services/index'
import {useEffect, useState} from "react";

function App() {

  const [serviceData, setServiceData] = useState();

  useEffect(() => {
    getHelloWorld().then((res) => {
      setServiceData(res.data);
      console.log(res.data);
    })
  }, [setServiceData])


  return (

    <div className="App">
      Welcome

      {serviceData.status}
    </div>
  );
}

export default App;
