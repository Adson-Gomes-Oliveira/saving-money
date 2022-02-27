import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './styles/Spreadsheet.css';

class Spreadsheet extends Component {
  render() {
    return (
      <table className="spreadsheet">
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
      </table>
    );
  }
}

export default Spreadsheet;
