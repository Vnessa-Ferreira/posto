import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const TelaSupervisor = () => {
  const [vendas, setVendas] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [estoqueProduto, setEstoqueProduto] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Função para carregar vendas
  const carregarVendas = async () => {
    try {
      const response = await fetch('/api/vendas');
      const data = await response.json();
      setVendas(data);
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
    }
  };

  // Função para adicionar produto
  const adicionarProduto = async () => {
    try {
      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nomeProduto,
          preco: parseFloat(precoProduto),
          estoque: parseInt(estoqueProduto),
        }),
      });

      const resultado = await response.json();
      setMensagem(resultado.message);
      carregarVendas(); // Atualiza a lista de vendas após adicionar um produto
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      setMensagem('Erro ao adicionar produto.');
    }
  };

  // Carrega as vendas ao iniciar o componente
  useEffect(() => {
    carregarVendas();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="section">
        <h1 className="section-title">Supervisor</h1>
      </div>

      <div className="section">
        <h2 className="section-title">Vendas Realizadas</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Total</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda, index) => (
              <tr key={index}>
                <td>{venda.produtoId}</td>
                <td>{venda.quantidade}</td>
                <td>R$ {venda.total}</td>
                <td>{new Date(venda.data).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Adicionar Produto</h2>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço"
            value={precoProduto}
            onChange={(e) => setPrecoProduto(e.target.value)}
          />
          <input
            type="number"
            placeholder="Estoque"
            value={estoqueProduto}
            onChange={(e) => setEstoqueProduto(e.target.value)}
          />
          <button className="button-primary" onClick={adicionarProduto}>
            Adicionar Produto
          </button>
        </div>
      </div>

      {mensagem && <div className="message">{mensagem}</div>}
    </div>
  );
};

export default TelaSupervisor;
