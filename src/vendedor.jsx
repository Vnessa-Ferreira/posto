import React, { useState, useEffect } from 'react';

const TelaVendedor = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [mensagem, setMensagem] = useState('');

    // Função para carregar produtos
    const carregarProdutos = async () => {
        try {
            const response = await fetch('/api/produtos');
            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    // Função para realizar a venda
    const realizarVenda = async () => {
        try {
            const response = await fetch('/api/vendas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ produtoId: parseInt(produtoId), quantidade: parseInt(quantidade) }),
            });

            const resultado = await response.json();
            setMensagem(resultado.message);
            carregarProdutos(); // Atualiza a lista de produtos após a venda
        } catch (error) {
            console.error('Erro ao realizar venda:', error);
            setMensagem('Erro ao realizar venda.');
        }
    };

    // Carrega os produtos ao iniciar o componente
    useEffect(() => {
        carregarProdutos();
    }, []);

    return (
        <div className="container" style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Tela do Vendedor</h1>
            <div id="produtos">
                <h2>Produtos Disponíveis</h2>
                {produtos.map(produto => (
                    <p key={produto.id}>
                        {produto.nome} - R$ {produto.preco} (Estoque: {produto.estoque})
                    </p>
                ))}
            </div>
            <div className="produto" style={{ marginBottom: '20px' }}>
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
                <button onClick={realizarVenda}>Vender</button>
            </div>
            {mensagem && <div id="mensagem">{mensagem}</div>}
        </div>
    );
};

export default TelaVendedor;