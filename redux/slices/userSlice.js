import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: '',
    isSignedIn: false,
    accounts: [],
    lastTransactions: [],
    transactions: [],
    miniBudgetPlan: {},
    budgetPlans: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name
            state.email = action.payload.email;
            state.isSignedIn = action.payload.isSignedIn;
        },
        setAccounts: (state, action) => {
            state.accounts = action.payload.accounts
        },
        setLastTransactions: (state, action) => {
            state.lastTransactions = action.payload.lastTransactions
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload.transactions
        },
        setMiniBudgetPlan: (state, action) => {
            state.miniBudgetPlan = action.payload.miniBudgetPlan
        },
        setBudgetPlans: (state, action) => {
            state.budgetPlans = action.payload.budgetPlans
        }
    }
})

export const { setUser, setAccounts, setLastTransactions, setTransactions, setBudgetPlans, setMiniBudgetPlan } = userSlice.actions;

//Selectors
export const selectUser = (state) => state.user

export default userSlice.reducer;