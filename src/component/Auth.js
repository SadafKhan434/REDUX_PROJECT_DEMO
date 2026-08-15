import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import classes from './Auth.module.css';
import { authActions } from '../store/index';

const Auth = () => {
    const dispatch = useDispatch();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    const loginHandler = async (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        const firebaseApiKey = 'AIzaSyCbIQIMC1ofR4zskI4qdRDwir8X-r_PfKw'; 
        let url;

        
        if (isLoginMode) {
            url = `https://googleapis.com{firebaseApiKey}`;
        } else {
            url = `https://googleapis.com{firebaseApiKey}`;
        }

        setIsLoading(true);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            setIsLoading(false);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Authentication failed!');
            }

            const data = await response.json();

            dispatch(
                authActions.login({
                    token: data.idToken,
                    userId: data.localId,
                })
            );

        } catch (error) {
            setIsLoading(false);
            alert(error.message);
        }
    };

    return (
        <main className={classes.auth}>
            <section>
                <h2>{isLoginMode ? 'Login' : 'Create Account'}</h2>
                <form onSubmit={loginHandler}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Email Address</label>
                        <input type='email' id='email' ref={emailInputRef} required />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' ref={passwordInputRef} minLength="6" required />
                    </div>
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : isLoginMode ? 'Login' : 'Sign Up'}
                    </button>
                    
                    <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
                        {isLoginMode ? 'Create new account' : 'Login with existing account'}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Auth;
