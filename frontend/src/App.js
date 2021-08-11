import {BrowserRouter, Switch,Route,Redirect} from 'react-router-dom';
import Home from "./pages/Home/Home.jsx";
import Navigation from './components/shared/Navigation/Navigation'
import './App.css'
import Authenticate from './pages/Authenticate/Authenticate.jsx';
import Activate from './pages/Activate/Activate.jsx';
import Rooms from './pages/Rooms/Rooms.jsx'
import {useSelector} from 'react-redux'
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh.js';
import Loader from './components/shared/Loader/Loader.jsx';



function App() {

  //Created a custom hook
  const {loading} = useLoadingWithRefresh();
  
  return ( 
    loading ?  (
      <Loader message=" Loading, please wait..." />
    ) : (
    <BrowserRouter>
  <Navigation/>
    <Switch>
      <GuestRoute path="/" exact><Home/></GuestRoute>
      <GuestRoute path="/authenticate"><Authenticate/></GuestRoute>
      <SemiProtectedRoute path="/activate"><Activate/></SemiProtectedRoute>
      <ProtectedRoute path="/rooms"><Rooms/></ProtectedRoute>
    </Switch>
  </BrowserRouter>
  )
  )
}

const GuestRoute = ({children,...rest}) => {
  const {isAuth} = useSelector((state) => state.auth);
  return (
    <Route {...rest} render={({location}) => {
    return  isAuth ? 
      <Redirect to ={
        {
          pathname: '/rooms',
          state: { from: location}
        } 
      }/>
      :
      (
        children
      )
    }}></Route>
  );
}


const SemiProtectedRoute = ({children,...rest}) => {
  const {user,isAuth} = useSelector((state) => state.auth);
  return (
    <Route {...rest} render={({location}) => {
      return (
        !isAuth ? (
          <Redirect to={{
            pathname: '/',
            state: {from: location}
          }}/>
        ) :
        isAuth && !user.activated ?
        (children) : 
        <Redirect to={{
          pathname: '/rooms',
          state: {from: location}
        }}/>
      )
    }}>

    </Route>
  )
}

const ProtectedRoute = ({children,...rest}) => {
  const {user,isAuth} = useSelector((state) => state.auth);
  return (
    <Route {...rest} render={({location}) => {
      return (
        !isAuth ? (
          <Redirect to={{
            pathname: '/',
            state: {from: location}
          }}/>
        ) :
        isAuth && !user.activated ?
        <Redirect to={{
          pathname: '/activate',
          state: {from: location}
        }}/> : 
       (children)
      )
    }}>
    </Route>
  )
}

export default App;
