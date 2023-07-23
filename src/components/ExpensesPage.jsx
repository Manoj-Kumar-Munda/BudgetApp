import React from "react";
import { deleteItem, fetchData } from "../helpers";
import { useLoaderData } from "react-router-dom";
import Table from "./Table";
import { toast } from "react-toastify";

export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

export async function expenseAction({ request }) {
  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try{
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      })
      return toast.success("Expense deleted");
    }catch(e){
      throw new Error("Problem in deleting your expense")
    }
  }
}
const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h2>
        Recent Expenses <small>({expenses.length} total)</small>
      </h2>
      <Table expenses={expenses} />
    </div>
  );
};

export default ExpensesPage;
