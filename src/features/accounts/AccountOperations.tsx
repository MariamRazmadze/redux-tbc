import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, requestLoan, payLoan } from "./accountSlice";
import { Store } from "../../components/LoggedInHeader";
import { AppDispatch } from "../../store";
import BalanceDisplay from "./BalanceDisplay";
import styled from "styled-components";

const BalanceHeader = styled.div`
  background-color: #333;
  color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin-top: 3rem;
`;

const AccountButton = styled.button`
  background-color: #8e1ca5;
  color: white;
  align-items: center;
  border: 1px solid #8e1ca5;
  border-radius: 4px;
  font-weight: 500;
  justify-content: center;
  outline: none;
  line-height: 22px;
  font-size: 14px;
  margin-left: 10px;

  &:hover {
    background-color: #721684;
  }
`;

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState<number | null>(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState<number | null>(null);
  const [loanAmount, setLoanAmount] = useState<number | null>(null);

  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("GEL");
  const dispatch: AppDispatch = useDispatch();
  const {
    loan: currentLoan,
    loanPurpose: currentLoanPurpose,
    isLoading,
  } = useSelector((store: Store) => store.account);

  function handleDeposit() {
    if (!depositAmount) return;
    dispatch(deposit(depositAmount, currency));
    setDepositAmount(null);
    setCurrency("GEL");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount(null);
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount(null);
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div>
      <BalanceHeader>
        <h4>სულ ხელმისაწვდომი:</h4>
        <BalanceDisplay />
      </BalanceHeader>
      <div className="inputs">
        <div>
          <label>თანხის შეტანა</label>
          <input
            type="number"
            value={depositAmount || ""}
            onChange={(e) =>
              setDepositAmount(e.target.value ? +e.target.value : null)
            }
          />

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="GEL">₾</option>
            <option value="USD">$</option>
            <option value="EUR"> &euro;</option>
          </select>

          <AccountButton onClick={handleDeposit} disabled={isLoading}>
            {isLoading
              ? "კონვერტირდება..."
              : `თანხის შეტანა ${depositAmount !== null ? depositAmount : ""} `}
          </AccountButton>
        </div>

        <div>
          <label>თანხის გამოტანა</label>
          <input
            type="number"
            value={withdrawalAmount || ""}
            onChange={(e) =>
              setWithdrawalAmount(e.target.value ? +e.target.value : null)
            }
          />

          <AccountButton onClick={handleWithdrawal}>
            თანხის გამოტანა {withdrawalAmount}
          </AccountButton>
        </div>

        <div>
          <label>მოითხოვე სესხი</label>
          <input
            type="number"
            value={loanAmount || ""}
            onChange={(e) =>
              setLoanAmount(+e.target.value ? +e.target.value : null)
            }
            placeholder="რაოდენობა"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="მიზანი"
          />
          <AccountButton onClick={handleRequestLoan}>
            სესხის აღება
          </AccountButton>
        </div>
        {currentLoan > 0 && (
          <div>
            <span>
              სესხის დაფარვა ${currentLoan}({currentLoanPurpose})
            </span>
            <AccountButton onClick={handlePayLoan}>
              სესხის დაფარვა
            </AccountButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
