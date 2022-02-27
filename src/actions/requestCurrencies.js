import getCurrencies from '../services/currencyAPI';

export const LOADING = 'LOADING';
export const SUCESS_CURRENCY_REQ = 'SUCESS_CURRENCY_REQ';
export const ERROR_CURRENCY_REQ = 'ERROR_CURRENCY_REQ';

const loadingReq = () => ({
  type: LOADING,
});

const currencySuccess = (currencies) => ({
  type: SUCESS_CURRENCY_REQ,
  payload: {
    currencies,
  },
});

const currenciesError = (error) => ({
  type: ERROR_CURRENCY_REQ,
  error,
});

export const requestCurrencies = () => async (dispatch) => {
  dispatch(loadingReq());
  try {
    const getData = await getCurrencies();
    const currencies = getData[0];
    dispatch(currencySuccess(currencies));
  } catch (error) {
    dispatch(currenciesError(error));
  }
};
