import { SAVE_EXPENSE } from '../actions';
import { ERROR_CURRENCY_REQ,
  LOADING, SUCESS_CURRENCY_REQ } from '../actions/requestCurrencies';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOADING:
    return {
      ...state,
      loading: true,
    };

  case SUCESS_CURRENCY_REQ:
    return {
      ...state,
      currencies: state.currencies.concat(action.payload.currencies),
      loading: false,
    };

  case ERROR_CURRENCY_REQ:
    return {
      ...state,
      error: action.error,
    };

  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.concat(action.payload.expenseSaved),
    };

  default:
    return state;
  }
};

export default wallet;
