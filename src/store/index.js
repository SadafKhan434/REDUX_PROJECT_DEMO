import { configureStore, createSlice } from '@reduxjs/toolkit';

// Keep your existing counterSlice, expensesSlice, and authSlice EXACTLY as they are...
const initialCounterState = { counter: 0, showCounter: true };
const counterSlice = createSlice({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment(state) { state.counter++; },
        decrement(state) { state.counter--; },
        increase(state, action) { state.counter = state.counter + action.payload; },
        decrease(state, action) { state.counter = state.counter - action.payload; },
        toogleCounter(state) { state.showCounter = !state.showCounter; }
    }
});

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: { items: [] },
    reducers: {
        setExpenses(state, action) { state.items = action.payload; },
        addExpense(state, action) { state.items.push(action.payload); },
        deleteExpense(state, action) { state.items = state.items.filter(item => item.id !== action.payload); }
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

// 👇 SIMPLE THEME REDUCER (Add this)
const themeSlice = createSlice({
    name: 'theme',
    initialState: { isDark: false, isPremium: false },
    reducers: {
        activatePremium(state) {
            state.isPremium = true;
            state.isDark = true; // Instantly switch to dark mode on click
        },
        toggleTheme(state) {
            state.isDark = !state.isDark; // Switch between true/false
        }
    }
});

// Add it to your store configuration object
const store = configureStore({
    reducer: { 
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
        expenses: expensesSlice.reducer,
        theme: themeSlice.reducer // 👈 Registered here
    }
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export const expensesActions = expensesSlice.actions; 
export const themeActions = themeSlice.actions; // 👈 Export actions

export default store;
