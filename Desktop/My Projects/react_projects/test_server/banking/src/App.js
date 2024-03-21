import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Customers from './components/Customers';
import Viewcustomer from './components/Viewcustomer';
import Transactcustomer from './components/Transactcustomer';
import Newtransaction from './components/Newtransaction';
import Viewtransactions from './components/Viewtransactions';
import Header from './components/Header';
import Homepage from './components/Homepage';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/customers" element={<Customers />} />
          <Route path="/viewcustomer" element={<Viewcustomer />} />
          <Route path ="/selectcustomer" element={<Transactcustomer />} />
          <Route path= "/newtransaction" element={<Newtransaction />}/>
          <Route path="/viewtransactions" element={<Viewtransactions />} />
        </Routes>
    </Router>
  );
}

export default App;
