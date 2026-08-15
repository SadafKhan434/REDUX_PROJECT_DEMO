import { Fragment } from "react";
import { useSelector } from "react-redux";
import Counter from "./component/Counter";
import Header from "./component/Header";
import Auth from "./component/Auth";
import UserProfile from "./component/UserProfile";
import ExpenseTracker from "./component/ExpenseTracker";

function App() {
  
  const isAuth = useSelector(state => state.auth.isLoggedIn);

  return (
    <Fragment>
      <Header />
      
      {!isAuth && <Auth />}
      
      {isAuth && (
        <Fragment>
          <UserProfile />
          <ExpenseTracker />
        </Fragment>
      )}
      
      <Counter /> 
    </Fragment>
  );
}

export default App;
