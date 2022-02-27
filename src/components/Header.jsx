import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import './styles/Header.css';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;
    const allValues = [];
    expenses.forEach((expanse) => {
      const currencies = Object.values(expanse.exchangeRates);
      const quote = currencies.find((curr) => curr.code === expanse.currency).ask;
      allValues.push(expanse.value * quote);
    });
    const totalAmount = allValues.length > 0
      ? allValues.reduce((prev, crr) => crr + prev) : 0;
    return (
      <header>
        <h1>
          <span>SavingMoney</span>
          <span className="material-icons-outlined">payments</span>
        </h1>
        <div className="user-infos">
          <span className="email" data-testid="email-field">{userEmail}</span>
          <div className="total-expanse">
            <span>Despesas Totais: </span>
            <span data-testid="total-field">
              {totalAmount.toFixed(2)}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: Proptypes.string,
  expenses: Proptypes.arr,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
