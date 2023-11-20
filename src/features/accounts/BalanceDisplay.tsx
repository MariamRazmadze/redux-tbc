import { useSelector } from "react-redux";
import { Store } from "../../components/LoggedInHeader";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "GEL",
  }).format(value);
}

function BalanceDisplay() {
  const balance = useSelector((state: Store) => state.account.balance);

  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
