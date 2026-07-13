import React, { useState } from 'react'
import './index.css'

function App() {
  // Estado para controlar qual tela está ativa: 'home', 'login' ou 'register'
  const [currentScreen, setCurrentScreen] = useState('home')
  
  // Estados para os campos do formulário
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleAuthSubmit = (e) => {
    e.preventDefault()
    // Aqui no futuro conectaremos a API do backend
    alert(`Dados enviados para a tela de ${currentScreen === 'login' ? 'Login' : 'Cadastro'}!`)
  }

  return (
    <div>
      <div className="bg-gradient"></div>

      {/* NAVBAR SUPERIOR - Visível em todas as telas ou clicável para voltar */}
      <nav className="navbar">
        <div className="brand" style={{ cursor: 'pointer' }} onClick={() => setCurrentScreen('home')}>
          Adworkspace
        </div>
        
        {currentScreen === 'home' && (
          <div className="nav-links">
            <a href="#" className="nav-link">Produtos</a>
            <a href="#" className="nav-link">Preços</a>
            <button className="btn btn-primary" onClick={() => setCurrentScreen('login')}>
              Entrar
            </button>
          </div>
        )}
      </nav>

      {/* RENDERIZAÇÃO CONDICIONAL DE TELAS */}
      <main className="hero-container">
        
        {/* 1. TELA PRINCIPAL (HOME) */}
        {currentScreen === 'home' && (
          <>
            <h1 className="hero-title">
              A nova maneira de criar <br /> 
              <span className="text-blue">anúncios com IA</span>
            </h1>
            <p className="hero-subtitle">
              Transforme as suas ideias em campanhas prontas para o seu negócio com a liberdade de personalizar cada detalhe.
            </p>
            <button className="btn btn-large" onClick={() => setCurrentScreen('register')}>
              Comece já
            </button>
            <p className="footer-text">
              Comece grátis. Não é necessário cartão de crédito.
            </p>
          </>
        )}

        {/* 2. TELA DE LOGIN */}
        {currentScreen === 'login' && (
          <div className="auth-container">
            <button className="btn-back" onClick={() => setCurrentScreen('home')}>
              ← Voltar para o início
            </button>
            <h2 className="auth-title">Acesse sua conta</h2>
            <p className="auth-subtitle">Bem-vindo de volta ao Adworkspace</p>
            
            <form onSubmit={handleAuthSubmit}>
              <div className="form-group">
                <label>E-mail</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="seu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-large" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '10px' }}>
                Entrar
              </button>
            </form>
            
            <p className="auth-switch">
              Não tem uma conta? 
              <span className="auth-link" onClick={() => setCurrentScreen('register')}>Cadastre-se</span>
            </p>
          </div>
        )}

        {/* 3. TELA DE CADASTRO (CRIAR CONTA) */}
        {currentScreen === 'register' && (
          <div className="auth-container">
            <button className="btn-back" onClick={() => setCurrentScreen('home')}>
              ← Voltar para o início
            </button>
            <h2 className="auth-title">Crie sua conta</h2>
            <p className="auth-subtitle">Comece a gerar anúncios com IA gratuitamente</p>
            
            <form onSubmit={handleAuthSubmit}>
              <div className="form-group">
                <label>Nome Completo</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Seu nome" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="seu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="Crie uma senha forte" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-large" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '10px' }}>
                Criar Conta
              </button>
            </form>
            
            <p className="auth-switch">
              Já possui uma conta? 
              <span className="auth-link" onClick={() => setCurrentScreen('login')}>Fazer Login</span>
            </p>
          </div>
        )}

      </main>
    </div>
  )
}

export default App