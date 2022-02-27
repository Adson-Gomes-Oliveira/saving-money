export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const storeEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});

export const storeExpenses = (expense) => ({
  type: SAVE_EXPENSE,
  payload: {
    expenseSaved: {
      id: expense.id,
      value: expense.value,
      description: expense.description,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      exchangeRates: expense.exchangeRates,
    },
  },
});

export const deleteExpanse = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: {
    expenseId,
  },
});
