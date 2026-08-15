import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload;
        },
        decrease(state, action) {
            state.counter = state.counter - action.payload;
        },
        toogleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});


const expensesSlice = createSlice({
    name: 'expenses',
    initialState: { items: [] },
    reducers: {
        setExpenses(state, action) {
            state.items = action.payload;
        },
        addExpense(state, action) {
            state.items.push(action.payload);
        },
        deleteExpense(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        }
    }
});


const initialAuthState = {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userId = action.payload.userId;

        
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userId', action.payload.userId);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.userId = null;

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        }
    }
});


const store = configureStore({
    reducer: { 
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
        expenses: expensesSlice.reducer 
    }
});


export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export const expensesActions = expensesSlice.actions; 

export default store;
