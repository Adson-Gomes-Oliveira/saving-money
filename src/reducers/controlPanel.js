import { CHANGE_PANEL_STATE, EDIT_EXPENSE,
  RESET_PANEL_STATE, SAVE_EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  edit: false,
  inputValue: 0,
  inputCurrency: 'USD',
  inputMethod: 'Dinheiro',
  inputTag: 'Alimentação',
  inputDesc: '',
};

const controlPanel = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EDIT_EXPENSE:
    return {
      ...state,
      edit: action.payload.isEditing,
      inputValue: action.payload.expense.value,
      inputCurrency: action.payload.expense.currency,
      inputMethod: action.payload.expense.method,
      inputTag: action.payload.expense.tag,
      inputDesc: action.payload.expense.description,
      expenseID: action.payload.expense.id,
    };

  case CHANGE_PANEL_STATE:
    return {
      ...state,
      [action.change.input]: action.change.value,
    };

  case RESET_PANEL_STATE:
    return {
      ...state,
      edit: action.original.edit,
      inputValue: action.original.inputValue,
      inputCurrency: action.original.inputCurrency,
      inputMethod: action.original.inputMethod,
      inputTag: action.original.inputTag,
      inputDesc: action.original.inputDesc,
    };

  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      edit: false,
    };

  default:
    return state;
  }
};

export default controlPanel;
