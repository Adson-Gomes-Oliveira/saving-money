import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/ExpensesPanel.css';

class ExpensesPanel extends Component {
  render() {
    const { currencies } = this.props;
    const currencyOptions = currencies.map((currency) => (
      <option
        key={ currency }
        data-testid={ currency }
        value={ currency }
      >
        {currency}
      </option>
    ));
    return (
      <section>
        <form className="panel-add-expenses">
          <label htmlFor="value">
            <span>Valor:</span>
            <input id="value" type="number" data-testid="value-input" className="value" />
          </label>

          <label htmlFor="currency">
            <span>Moeda:</span>
            <select data-testid="currency-input">
              {currencyOptions}
            </select>
          </label>

          <label htmlFor="method">
            <span>Metódo de Pagamento:</span>
            <select data-testid="method-input">
              <option value="money">Dinheiro</option>
              <option value="credit">Cartão de crédito</option>
              <option value="debit">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            <span>Tag:</span>
            <select data-testid="tag-input">
              <option value="food">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transportation">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>

          <label htmlFor="desc">
            <span>Descrição:</span>
            <input type="text" data-testid="description-input" />
          </label>

          <button type="button">Adicionar despesa</button>
        </form>
      </section>
    );
  }
}

ExpensesPanel.propTypes = {
  currencies: Proptypes.arr,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, null)(ExpensesPanel);
