
import './App.css';

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './component/home';
import EditWorkerDialog from './component/editWorker';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />}>
            <Route path={"/worker"} elementment={<EditWorkerDialog/>}></Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
