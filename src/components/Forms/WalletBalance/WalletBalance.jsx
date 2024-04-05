import React, { useState } from "react";
import { useSnackbar } from "notistack";
import Button from "../../Button/Button.jsx";
import styles from "./WalletBalance.module.css";

const WalletBalance = ({ setIsOpen, setBalance }) => {
  const [income, setIncome] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(income) < 0) {
      enqueueSnackbar("Income cannot be 0", { variant: "warning" });
      setIsOpen(false);
      return;
    }

    setBalance((prev) => prev + Number(income));
    setIsOpen(false);
  };

  return (
    <div className={styles.formWrapper}>
      <h3>Add Balance</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Income Amount"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
        />
        <Button type="submit" style="primary" shadow>
          Add Balance
        </Button>
        <Button style="secondary" shadow handleClick={() => setIsOpen(false)}>
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default WalletBalance;
