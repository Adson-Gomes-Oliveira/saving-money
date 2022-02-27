import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/ExpensesPanel.css';
import getCurrencies from '../services/currencyAPI';
import { storeExpenses } from '../actions';

const INPUT_TAG_INITIAL = 'Alimentação';

class ExpensesPanel extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: 0,
      inputCurrency: 'USD',
      inputMethod: 'Dinheiro',
      inputTag: INPUT_TAG_INITIAL,
      inputDesc: '',
      disableButton: true,
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      const { inputValue, inputDesc } = this.state;
      const verifyLength = [inputValue, inputDesc];
      this.setState({
        disableButton: verifyLength.includes(''),
      });
    });
  };

  handleClick = async () => {
    const { inputValue, inputCurrency, inputMethod, inputTag, inputDesc } = this.state;
    const { saveExpanses, expensesLength } = this.props;
    const getData = await getCurrencies();
    const exchange = getData[1];

    const expense = {
      id: expensesLength,
      value: inputValue,
      description: inputDesc,
      currency: inputCurrency,
      method: inputMethod,
      tag: inputTag,
      exchangeRates: exchange,
    };

    saveExpanses(expense);
    this.setState({
      inputValue: 0,
      inputCurrency: 'USD',
      inputMethod: 'Dinheiro',
      inputTag: INPUT_TAG_INITIAL,
      inputDesc: '',
      disableButton: true,
    });
  };

  render() {
    const { currencies } = this.props;
    const { inputValue, inputDesc, disableButton,
      inputCurrency, inputMethod, inputTag } = this.state;
    return (
      <section>
        <form className="panel-add-expenses">
          <label htmlFor="value">
            <span>Valor:</span>
            <input
              name="inputValue"
              id="value"
              type="number"
              data-testid="value-input"
              className="value"
              onChange={ this.handleChange }
              value={ inputValue }
            />
          </label>

          <label htmlFor="inputCurrency">
            <span>Moeda:</span>
            <select
              id="inputCurrency"
              name="inputCurrency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ inputCurrency }
            >
              {currencies.map((currency) => (
                <option
                  key={ currency }
                  data-testid={ currency }
                  value={ currency }
                >
                  {currency}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="inputMethod">
            <span>Metódo de Pagamento:</span>
            <select
              id="inputMethod"
              name="inputMethod"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ inputMethod }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="inputTag">
            <span>Tag:</span>
            <select
              id="inputTag"
              name="inputTag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ inputTag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="desc">
            <span>Descrição:</span>
            <input
              id="desc"
              name="inputDesc"
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ inputDesc }
            />
          </label>

          <button
            type="button"
            disabled={ disableButton }
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}

ExpensesPanel.propTypes = {
  currencies: Proptypes.arr,
  saveExpanses: Proptypes.func,
  expensesLength: Proptypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expensesLength: state.wallet.expenses.length,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpanses: (expense) => dispatch(storeExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesPanel);
