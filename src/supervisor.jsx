import React, { useState, useEffect } from 'react';

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
                body: JSON.stringify({ nome: nomeProduto, preco: parseFloat(precoProduto), estoque: parseInt(estoqueProduto) }),
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
        <div className="container" style={{ maxWidth: '800px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Tela do Supervisor</h1>
            <h2>Vendas Realizadas</h2>
            <table id="tabelaVendas" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Produto</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Quantidade</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Total</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda, index) => (
                        <tr key={index}>
                            <td>{venda.produtoId}</td> {/* Aqui você pode buscar o nome do produto */}
                            <td>{venda.quantidade}</td>
                            <td>R$ {venda.total}</td>
                            <td>{new Date(venda.data).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Adicionar Produto</h2>
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
            <button onClick={adicionarProduto}>Adicionar Produto</button>
            {mensagem && <div id="mensagem">{mensagem}</div>}
        </div>
    );
};

export default TelaSupervisor;