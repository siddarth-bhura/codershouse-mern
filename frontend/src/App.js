import {BrowserRouter, Switch,Route} from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import Navigation from './components/shared/Navigation/Navigation'
import './App.css'
import Register from "./pages/Register/Register.jsx"
import Login from './pages/Login/Login.jsx'

function App() {
  return <BrowserRouter>
  <Navigation/>
    <Switch>
      <Route path="/" exact><Home/></Route>
      <Route path = "/register"><Register/></Route>
      <Route path = "/login"><Login/></Route>
    </Switch>
  </BrowserRouter>
}

export default App;
