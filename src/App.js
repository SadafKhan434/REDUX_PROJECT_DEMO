import { Fragment } from "react";
import { useSelector } from "react-redux";
import Counter from "./component/Counter";
import Header from "./component/Header";
import Auth from"./component/Auth";
import UserProfile from "./component/UserProfile";
function App(){
   const isAuth = useSelector(state=>state.auth.isAuthenticated)
return(
  <Fragment>
    <Header/>
    {!isAuth &&<Auth/>}
    {isAuth && <UserProfile/>}
  <Counter/>
  </Fragment>
)
}

export default App;