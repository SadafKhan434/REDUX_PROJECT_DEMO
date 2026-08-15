import { useSelector } from 'react-redux';
import classes from './UserProfile.module.css';

const UserProfile = () => {
    const userId = useSelector((state) => state.auth.userId);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) return null;

    return (
        <main className={classes.profile}>
            <h1>My User Profile</h1>
            <div className={classes.details}>
                <p><strong>User ID:</strong> {userId}</p>
            </div>
        </main>
    );
};

export default UserProfile;
