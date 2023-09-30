import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Formik, Field } from "formik";
import { useMediaQuery } from "react-responsive";
import { date, object, string } from "yup";

import { toggleTransactionModalOpen } from "../../redux/global/global-slice";
import { selectIsTransactionModalOpen } from "../../redux/global/global-selectors";
import { getCategories } from "../../redux/categories/categories-operations";
import { selectCategories } from "../../redux/categories/categories-selectors";
import { addTransaction } from "../../redux/transactions/transactions-operations";
import { getTransactions } from "../../redux/transactions/transactions-operations";
import { selectToken } from "../../redux/auth/auth-selectors";
import { selectId } from "../../redux/auth/auth-selectors";
import { getCurrentUser } from "../../redux/user/user-operations";

import DateComponent from "./DateComponent/DateComponent";
import SelectComponent from "./SelectComponent/SelectComponent.jsx";
import css from "./AddTransaction.module.css";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const TRANSACTION_TYPE = {
  EXPENSE: "EXPENSE",
  INCOME: "INCOME",
};

const defaultState = {
  type: TRANSACTION_TYPE.EXPENSE,
  categoryId: null,
  amount: "",
  date: new Date(),
  comment: " ",
};

export const AddTransaction = () => {
  const isTransactionModalOpen = useSelector(selectIsTransactionModalOpen);
  const categories = useSelector(selectCategories);
  const token = useSelector(selectToken);
  const [transactionState, setTransactionState] = useState(defaultState);
  const id = useSelector(selectId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isTransactionModalOpen) return;

    if (!Array.isArray(categories) || categories.length === 0) {
      dispatch(getCategories());
    }
  }, [isTransactionModalOpen, categories, dispatch]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(toggleTransactionModalOpen());
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        dispatch(toggleTransactionModalOpen());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const handleCheckboxChange = (e) => {
    if (transactionState.type === TRANSACTION_TYPE.EXPENSE) {
      setTransactionState((prev) => ({
        ...prev,
        type: TRANSACTION_TYPE.INCOME,
      }));
      e.target.removeAttribute("checked", "true");
    } else {
      setTransactionState((prev) => ({
        ...prev,
        type: TRANSACTION_TYPE.EXPENSE,
      }));
      e.target.setAttribute("checked", "true");
    }
  };

  const handleSelectChange = (categoryId) => {
    setTransactionState((prev) => ({ ...prev, categoryId }));
  };

  const handleDateChange = (selectedDate) => {
    setTransactionState((prev) => ({ ...prev, date: selectedDate._d }));
  };

  const handleSubmit = (values, actions) => {
    const { amount, comment } = values;
    const month = transactionState.date.getMonth() + 1;
    const year = transactionState.date.getFullYear();

    let selectedCategoryName = "Income";

    if (transactionState.type === TRANSACTION_TYPE.EXPENSE) {
      const selectedCategory = categories.find(
        (el) => el.id === transactionState.categoryId
      );

      selectedCategoryName = capitalizeFirstLetter(selectedCategory.category);
    }

    const formData = {
      category: selectedCategoryName,
      type: transactionState.type === TRANSACTION_TYPE.INCOME ? true : false,
      date: transactionState.date,
      month,
      year,
      comment,
      amount: Number(amount),
      owner: id,
    };

    dispatch(addTransaction(formData));
    setTransactionState((prev) => ({
      ...prev,
      type: TRANSACTION_TYPE.EXPENSE,
    }));
    actions.resetForm();
    dispatch(toggleTransactionModalOpen());
    dispatch(getTransactions({ token }));
    dispatch(getCurrentUser({ token }));
  };

  let validationSchema = object({
    amount: string()
      .required("Amount is required")
      .max(16, "Must be 16 characters maximum"),
    date: date()
      .required("Required")
      .default(() => new Date()),
    type: string().required("Required"),
  });

  return (
    <Formik
      initialValues={transactionState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      onChange={({ nextValues }) => {
        setTransactionState((prev) => ({ ...prev, nextValues }));
      }}
    >
      <div className={css.modalForm}>
        {" "}
        {isTransactionModalOpen && (
          <div className={css.overlay} onClick={handleBackdropClick}>
            <div className={css.modalContainer}>
              <h2 className={css.mainTitle}>Add transaction</h2>
              <div className={css.modalContainerTransaction}>
                <div className={css.switcher} style={{ position: "relative" }}>
                  <span
                    className={
                      transactionState.type === TRANSACTION_TYPE.INCOME
                        ? css.income
                        : ""
                    }
                  >
                    Income
                  </span>
                  <label className={css.switcherWrapper}>
                    <Field
                      type="checkbox"
                      name="type"
                      onChange={handleCheckboxChange}
                      className={css.switcherCheckbox}
                      checked={
                        transactionState.type === TRANSACTION_TYPE.EXPENSE
                          ? true
                          : false
                      }
                    />
                    <span className={css.switcherToggle}></span>
                  </label>
                  <span
                    className={
                      transactionState.type === TRANSACTION_TYPE.EXPENSE
                        ? css.expense
                        : ""
                    }
                  >
                    Expense
                  </span>
                </div>
                {transactionState.type === TRANSACTION_TYPE.EXPENSE && (
                  <div className={css.categoryWrapper}>
                    <label>
                      <Field
                        className={css.select}
                        name="category"
                        placeholder="Select a category"
                        component={SelectComponent}
                        options={categories.map((option) => ({
                          value: option.id,
                          label: option.category,
                        }))}
                        onChange={(option) => {
                          handleSelectChange(option.value);
                        }}
                      />
                    </label>
                  </div>
                )}
                <div className={css.amountDateWrapper}>
                  <div className={css.amountWrapper}>
                    <label>
                      <Field
                        type="number"
                        placeholder="0.00"
                        name="amount"
                        className={css.amount}
                      />
                    </label>
                  </div>
                  <div className={css.dateWrapper}>
                    <label>
                      <Field
                        as="date"
                        component={DateComponent}
                        className={css.date}
                        name="date"
                        dateFormat="DD.MM.YYYY"
                        timeFormat={false}
                        value={transactionState.date}
                        onChange={handleDateChange}
                      />
                    </label>
                  </div>
                </div>
                <Field
                  className={css.textarea}
                  rows={isMobile ? "5" : "1"}
                  type="text"
                  placeholder="Comment"
                  name="comment"
                />
                <div className={css.buttonContainer}>
                  <button title="add" className={css.button} type="submit">
                    ADD
                  </button>
                  <button
                    title="cancel"
                    className={css.button}
                    onClick={() => {
                      dispatch(toggleTransactionModalOpen());
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Formik>
  );
};
