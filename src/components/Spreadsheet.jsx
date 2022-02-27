import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/Spreadsheet.css';

class Spreadsheet extends Component {
  render() {
    const { expenseStored } = this.props;
    console.log(expenseStored);
    return (
      <table className="spreadsheet">
        <thead>
          <tr className="columns" role="row">
            <th role="columnheader" scope="col">Descrição</th>
            <th role="columnheader" scope="col">Tag</th>
            <th role="columnheader" scope="col">Método de pagamento</th>
            <th role="columnheader" scope="col">Valor</th>
            <th role="columnheader" scope="col">Moeda</th>
            <th role="columnheader" scope="col">Câmbio utilizado</th>
            <th role="columnheader" scope="col">Valor convertido</th>
            <th role="columnheader" scope="col">Moeda de conversão</th>
            <th role="columnheader" scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenseStored.map((exp) => {
            const { description, tag, method,
              currency, value, exchangeRates } = exp;
            return (
              <tr className="rows" key={ exp.id } role="row">
                <td role="cell">{description}</td>
                <td role="cell">{tag}</td>
                <td role="cell">{method}</td>
                <td role="cell">{parseFloat(value).toFixed(2)}</td>
                <td role="cell">{exchangeRates[currency].name.split('/')[0]}</td>
                <td role="cell">{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
                <td role="cell">
                  {parseFloat(value * exchangeRates[currency].ask).toFixed(2)}
                </td>
                <td role="cell">Real</td>
                <td role="cell">E/D</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Spreadsheet.propTypes = {
  expenseStored: PropTypes.arr,
}.isRequired;

const mapStateToProps = (state) => ({
  expenseStored: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Spreadsheet);
