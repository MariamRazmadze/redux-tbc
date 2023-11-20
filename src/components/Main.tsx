import AccountOperations from "../features/accounts/AccountOperations";
import LoggedInHeader from "./LoggedInHeader";

export default function Main() {
  return (
    <>
      <LoggedInHeader />
      <AccountOperations />
    </>
  );
}
