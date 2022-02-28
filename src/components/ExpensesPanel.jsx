import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/ExpensesPanel.css';
import getCurrencies from '../services/currencyAPI';
import { changePanelState, resetState,
  saveEditedExpense, storeExpenses } from '../actions';

class ExpensesPanel extends Component {
  handleEditClick = () => {
    const { initialStates, idEdit, dispatchToEdit,
      expenseState, resetStateWithObject } = this.props;
    expenseState.forEach((exp) => {
      if (exp.id === idEdit) {
        exp.value = initialStates.inputValue;
        exp.description = initialStates.inputDesc;
        exp.currency = initialStates.inputCurrency;
        exp.method = initialStates.inputMethod;
        exp.tag = initialStates.inputTag;
      }
    });
    dispatchToEdit(expenseState);

    const initialStateObject = {
      edit: false,
      inputValue: 0,
      inputCurrency: 'USD',
      inputMethod: 'Dinheiro',
      inputTag: 'Transporte',
      inputDesc: '',
    };
    resetStateWithObject(initialStateObject);
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    const { dispatchChange } = this.props;
    const change = {
      input: name,
      value,
    };
    dispatchChange(change);
  };

  handleClick = async () => {
    const { initialStates, saveExpanses,
      expensesLength, resetStateWithObject } = this.props;
    const getData = await getCurrencies();
    const exchange = getData[1];

    const expense = {
      id: expensesLength,
      value: initialStates.inputValue,
      description: initialStates.inputDesc,
      currency: initialStates.inputCurrency,
      method: initialStates.inputMethod,
      tag: initialStates.inputTag,
      exchangeRates: exchange,
    };
    saveExpanses(expense);

    const initialStateObject = {
      edit: false,
      inputValue: 0,
      inputCurrency: 'USD',
      inputMethod: 'Dinheiro',
      inputTag: 'Alimentação',
      inputDesc: '',
    };
    resetStateWithObject(initialStateObject);
  };

  render() {
    const { currencies, isEditing, initialStates } = this.props;
    return (
      <section
        className="control-panel"
        style={ isEditing ? { backgroundColor: '#436444' } : null }
      >
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
              value={ initialStates.inputValue }
            />
          </label>

          <label htmlFor="inputCurrency">
            <span>Moeda:</span>
            <select
              id="inputCurrency"
              name="inputCurrency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ initialStates.inputCurrency }
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
              value={ initialStates.inputMethod }
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
              value={ initialStates.inputTag }
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
              value={ initialStates.inputDesc }
            />
          </label>
        </form>
        <div className="buttons">
          {isEditing ? (
            <button
              type="button"
              onClick={ this.handleEditClick }
              className="edit-btn"
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ this.handleClick }
              className="add-btn"
            >
              Adicionar despesa
            </button>
          )}
        </div>
      </section>
    );
  }
}

ExpensesPanel.propTypes = {
  currencies: PropTypes.arr,
  saveExpanses: PropTypes.func,
  expensesLength: PropTypes.number,
  initialStates: PropTypes.shape,
  isEditing: PropTypes.bool,
  dispatchChange: PropTypes.func,
  resetStateWithObject: PropTypes.func,
  dispatchToEdit: PropTypes.func,
  idEdit: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expensesLength: state.wallet.expenses.length,
  initialStates: state.controlPanel,
  isEditing: state.controlPanel.edit,
  idEdit: state.controlPanel.expenseID,
  expenseState: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpanses: (expense) => dispatch(storeExpenses(expense)),
  dispatchChange: (value) => dispatch(changePanelState(value)),
  resetStateWithObject: (object) => dispatch(resetState(object)),
  dispatchToEdit: (object) => dispatch(saveEditedExpense(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesPanel);
