import { Fragment } from "react";
import { useSelector } from "react-redux";
import Counter from "./component/Counter";
import Header from "./component/Header";
import Auth from "./component/Auth";
import UserProfile from "./component/UserProfile";
import ExpenseTracker from "./component/ExpenseTracker";

function App() {
  const isAuth = useSelector(state => state.auth.isLoggedIn);
  
  // 🌓 Read dark mode true/false state from your new theme reducer
  const isDark = useSelector(state => state.theme.isDark);

  return (
    <div style={{ 
      backgroundColor: isDark ? '#1a1a1a' : '#ffffff', 
      color: isDark ? '#ffffff' : '#000000',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <Header />
      
      {!isAuth && <Auth />}
      
      {isAuth && (
        <Fragment>
          <UserProfile />
          <ExpenseTracker />
        </Fragment>
      )}
      
      <Counter /> 
    </div>
  );
}

export default App;
