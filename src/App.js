import logo from './logo.svg';
import './App.css';
import Login from './Login';
import {Route, Routes} from 'react-router-dom';
import HomePage from './HomePage';
import Todolists from './Todolists';

function App() {
  return (
    // <Login/>
    // <Routes>
    //   <Route exact path="/" Component={Todolists}/>
    // </Routes>
    <Todolists/>
  );
}

export default App;
