import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.tbcbank.ge/v1/exchange-rates/commercial/",
  headers: { apikey: "I3Rz8QXBVPofKtucsenkW7g2n7aDwqBg" },
});

interface State {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

interface LoanPayload {
  amount: number;
  purpose: string;
}

const initialState: State = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action: PayloadAction<number>) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action: PayloadAction<number>) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount: number, purpose: string) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action: PayloadAction<LoanPayload>) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
    reset: () => initialState,
  },
});

export function deposit(amount: number, currency: string) {
  if (currency === "GEL") return { type: "account/deposit", payload: amount };
  return async function (dispatch: Dispatch) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await axiosInstance.get(
      `convert?amount=${amount}&from=${currency}&to=gel`
    );
    const data = await res.data;
    console.log("data", data);
    const converted = data.value;
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export const {
  withdraw,
  requestLoan,
  payLoan,
  reset: resetAccount,
} = accountSlice.actions;
export default accountSlice.reducer;
