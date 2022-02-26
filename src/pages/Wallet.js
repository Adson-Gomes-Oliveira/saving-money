import React from 'react';
import ExpensesPanel from '../components/ExpensesPanel';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <section className="wallet">
        <Header />
        <ExpensesPanel />
      </section>
    );
  }
}

export default Wallet;
