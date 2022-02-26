const getCurrencies = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const responseObject = await response.json();
  const prevCurrencies = Object.keys(responseObject);
  const currencies = prevCurrencies.filter((curr) => curr !== 'USDT');
  return currencies;
};

export default getCurrencies;
