import { AllRoutes } from "./routes/routes";
import {SnackbarProvider} from "notistack";

function App() {
  return (
      <div className="App">
        <header className="App-header"></header>
          <SnackbarProvider>
              <AllRoutes />
          </SnackbarProvider>
      </div>
  );
}

export default App;