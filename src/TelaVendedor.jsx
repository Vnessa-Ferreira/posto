import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const TelaVendedor = () => {
  const produtosFixos = [
    { id: 1, nome: 'Gasolina Comum (litro)', preco: 5.49, estoque: 1000 },
    { id: 2, nome: 'Etanol (litro)', preco: 3.89, estoque: 800 },
    { id: 3, nome: 'Diesel S10 (litro)', preco: 4.79, estoque: 1200 },
    { id: 4, nome: 'Óleo de Motor', preco: 24.90, estoque: 60 },
    { id: 5, nome: 'Água Mineral 500ml', preco: 2.50, estoque: 200 },
    { id: 6, nome: 'Refrigerante Lata', preco: 4.00, estoque: 150 },
    { id: 7, nome: 'Café Expresso', preco: 3.00, estoque: 100 },
    { id: 8, nome: 'Limpador de Para-brisa', preco: 12.00, estoque: 40 },
    { id: 9, nome: 'Pastilha de Freio', preco: 45.00, estoque: 30 },
    { id: 10, nome: 'Bateria 60Ah', preco: 320.00, estoque: 10 },
  ];

  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    setProdutos(produtosFixos);
  }, []);

  const realizarVenda = () => {
    const id = parseInt(produtoId);
    const qtd = parseInt(quantidade);
    const index = produtos.findIndex((p) => p.id === id);

    if (index !== -1 && qtd > 0 && produtos[index].estoque >= qtd) {
      const novosProdutos = [...produtos];
      novosProdutos[index].estoque -= qtd;
      setProdutos(novosProdutos);
      setMensagem(`✅ Venda realizada: ${qtd}x ${novosProdutos[index].nome}`);
    } else {
      setMensagem('❌ Produto inválido ou estoque insuficiente.');
    }

    setProdutoId('');
    setQuantidade('');
  };

  return (
    <div className="dashboard-container">
      <div className="section">
        <h1 className="section-title">Vendedor</h1>
      </div>

      <div className="section">
        <h2 className="section-title">Produtos Disponíveis</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>R$ {produto.preco.toFixed(2)}</td>
                <td>{produto.estoque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section-title">Realizar Venda</h2>
        <div className="form-grid">
          <input
            type="number"
            placeholder="ID do Produto"
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <button className="button-primary" onClick={realizarVenda}>
            Vender
          </button>
        </div>
      </div>

      {mensagem && <div className="message">{mensagem}</div>}
    </div>
  );
};

export default TelaVendedor;
