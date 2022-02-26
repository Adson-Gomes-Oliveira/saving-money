import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/Header.css';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
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
            <span data-testid="total-field">R$0</span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
