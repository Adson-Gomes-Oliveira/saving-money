export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';
export const CHANGE_PANEL_STATE = 'CHANGE_PANEL_STATE';
export const RESET_PANEL_STATE = 'RESET_PANEL_STATE';

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

export const editExpanse = (expense) => ({
  type: EDIT_EXPENSE,
  payload: {
    expense,
    isEditing: true,
  },
});

export const changePanelState = (change) => ({
  type: CHANGE_PANEL_STATE,
  change,
});

export const resetState = (original) => ({
  type: RESET_PANEL_STATE,
  original,
});

export const saveEditedExpense = (editedExpense) => ({
  type: SAVE_EDIT_EXPENSE,
  editedExpense,
});
