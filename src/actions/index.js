export const SAVE_EMAIL = 'SAVE_EMAIL';

export const storeEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: {
    email,
  },
});
