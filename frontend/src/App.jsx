import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import './index.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  
  // Estados para os campos do formulário e feedback
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  // Função para lidar com o Cadastro
  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    })

    setLoading(false)
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: 'Cadastro realizado! Verifique seu e-mail para confirmar a conta.' })
    }
  }

  // Função para lidar com o Login
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)
    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: `Conectado com sucesso! Usuário: ${data.user.email}` })
      // No futuro, aqui redirecionamos para o painel de criação de anúncios
    }
  }

  return (
    <div>
      <div className="bg-gradient"></div>

      {/* NAVBAR SUPERIOR */}
      <nav className="navbar">
        <div className="brand" style={{ cursor: 'pointer' }} onClick={() => { setCurrentScreen('home'); setMessage({ type: '', text: '' }); }}>
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

      {/* RENDERIZAÇÃO CONDICIONAL */}
      <main className="hero-container">
        
        {/* mensagens de erro ou sucesso */}
        {message.text && (
          <div style={{
            padding: '12px 20px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: '600',
            backgroundColor: message.type === 'error' ? '#ef444422' : '#22c55e22',
            border: `1px solid ${message.type === 'error' ? '#ef4444' : '#22c55e'}`,
            color: message.type === 'error' ? '#f87171' : '#4ade80',
            maxWidth: '420px',
            width: '100%',
            textAlign: 'center'
          }}>
            {message.text}
          </div>
        )}

        {/* 1. HOME */}
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

        {/* 2. LOGIN */}
        {currentScreen === 'login' && (
          <div className="auth-container">
            <button className="btn-back" onClick={() => { setCurrentScreen('home'); setMessage({ type: '', text: '' }); }}>
              ← Voltar para o início
            </button>
            <h2 className="auth-title">Acesse sua conta</h2>
            <p className="auth-subtitle">Bem-vindo de volta ao Adworkspace</p>
            
            <form onSubmit={handleLogin}>
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
              <button type="submit" disabled={loading} className="btn btn-large" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '10px' }}>
                {loading ? 'Carregando...' : 'Entrar'}
              </button>
            </form>
            
            <p className="auth-switch">
              Não tem uma conta? 
              <span className="auth-link" onClick={() => { setCurrentScreen('register'); setMessage({ type: '', text: '' }); }}>Cadastre-se</span>
            </p>
          </div>
        )}

        {/* 3. CADASTRO */}
        {currentScreen === 'register' && (
          <div className="auth-container">
            <button className="btn-back" onClick={() => { setCurrentScreen('home'); setMessage({ type: '', text: '' }); }}>
              ← Voltar para o início
            </button>
            <h2 className="auth-title">Crie sua conta</h2>
            <p className="auth-subtitle">Comece a gerar anúncios com IA gratuitamente</p>
            
            <form onSubmit={handleRegister}>
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
              <button type="submit" disabled={loading} className="btn btn-large" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '10px' }}>
                {loading ? 'Criando...' : 'Criar Conta'}
              </button>
            </form>
            
            <p className="auth-switch">
              Já possui uma conta? 
              <span className="auth-link" onClick={() => { setCurrentScreen('login'); setMessage({ type: '', text: '' }); }}>Fazer Login</span>
            </p>
          </div>
        )}

      </main>
    </div>
  )
}

export default App