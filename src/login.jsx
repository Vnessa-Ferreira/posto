import React, { useState } from 'react';
import './login.css';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === 'supervisor' && senha === '123') {
      setMensagem('✅ Bem-vindo, Supervisor!');
      setTimeout(() => {
        onLogin('supervisor');
      }, 1500); // espera 1.5 segundos antes de redirecionar
    }
    else if (usuario === 'vendedor' && senha === '123') {
      setMensagem('✅ Bem-vindo, Vendedor!');
      setTimeout(() => {
        onLogin('vendedor');
      }, 1500); 
    } else {
      setMensagem('❌ Usuário ou senha inválidos!');
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">Entrar</button>
        </form>
        {mensagem && <p className="login-message">{mensagem}</p>}
      </div>
    </div>
  );
}

export default Login;

