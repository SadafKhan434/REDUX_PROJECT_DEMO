import { useSelector, useDispatch } from 'react-redux';
import classes from './Header.module.css';
import { authActions } from '../store/index';

const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isLoggedIn);

    const logoutHandler = () => {
        dispatch(authActions.logout());
    };

    return (
        <header className={classes.header}>
            <h1>Expense Tracker</h1>
            {isAuth && (
                <nav>
                    <ul>
                        <li><a href="/expenses">Dashboard</a></li>
                        <li><a href="/analytics">Analytics</a></li>
                        <li><button onClick={logoutHandler}>Logout</button></li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;
