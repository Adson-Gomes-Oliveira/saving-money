import getCurrencies from '../services/currencyAPI';

export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const storeExpanse = () => async (dispatch) => {
  try {
    const getData = await getCurrencies();
  } catch (error) {
    
  }
}
