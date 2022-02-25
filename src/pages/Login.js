import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeEmail } from '../actions';
import './styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      inputPwd: '',
      disableButton: true,
    };
  }

  handleClick = () => {
    const { inputEmail } = this.state;
    const { saveEmail, history } = this.props;
    saveEmail(inputEmail);
    history.push('/carteira');
  };

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({ [name]: value }, () => {
      const { inputEmail, inputPwd } = this.state;
      const verifyEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const verifyPassword = 6;

      this.setState({
        disableButton: !(
          verifyEmail.test(inputEmail) && inputPwd.length >= verifyPassword
        ),
      });
    });
  };

  render() {
    const { inputEmail, inputPwd, disableButton } = this.state;
    return (
      <section className="login">
        <form>
          <h1>
            <span>SavingMoney</span>
            <span className="material-icons-outlined">payments</span>
          </h1>
          <div className="login-area">
            <label htmlFor="email-input">
              <input
                type="email"
                id="email-input"
                name="inputEmail"
                data-testid="email-input"
                onChange={ this.handleChange }
                value={ inputEmail }
                placeholder="Digite seu email"
              />
            </label>
            <label htmlFor="password-input">
              <input
                type="password"
                id="password-input"
                name="inputPwd"
                data-testid="password-input"
                onChange={ this.handleChange }
                value={ inputPwd }
                placeholder="Digite uma senha de 6 ou mais digítos."
              />
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ disableButton }
            >
              Entrar
            </button>
          </div>
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(storeEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
