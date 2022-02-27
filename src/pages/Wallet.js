import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { requestCurrencies } from '../actions/requestCurrencies';
import ExpensesPanel from '../components/ExpensesPanel';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Spreadsheet from '../components/Spreadsheet';

class Wallet extends React.Component {
  componentDidMount() {
    const { chargeCurrencies } = this.props;
    chargeCurrencies();
  }

  render() {
    const { isLoading } = this.props;
    return (
      <section className="wallet">
        <Header />
        { isLoading ? <Loading /> : <ExpensesPanel /> }
        <Spreadsheet />
      </section>
    );
  }
}

Wallet.propTypes = {
  chargeCurrencies: Proptypes.func,
  isLoading: Proptypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  isLoading: state.wallet.loading,
});

const mapDispatchToProps = (dispatch) => ({
  chargeCurrencies: () => dispatch(requestCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
