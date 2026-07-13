import React, { useState } from 'react'
import { supabase } from './supabaseClient'
import './index.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')
  
  // Estados para os campos do formulário
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  
  // Estados para controlar a visibilidade da senha (macaquinho)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Estados de loading e feedbacks
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const clearForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setName('')
    setShowPassword(false)
    setShowConfirmPassword(false)
    setMessage({ type: '', text: '' })
  }

  // Lógica de Cadastro
  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    if (password !== confirmPassword) {
      setLoading(false)
      setMessage({ type: 'error', text: 'As senhas inseridas não coincidem!' })
      return
    }

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
      setMessage({ type: 'success', text: 'Cadastro realizado! Verifique seu e-mail para confirmar e ativar sua conta.' })
    }
  }

  // Lógica de Login
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
    }
  }

  return (
    <div>
      {/* BACKGROUND DEGRADE */}
      <div className="bg-gradient"></div>

      {/* COMPONENTE DE BOLHAS ANIMADAS */}
      <div className="bubbles-container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      {/* NAVBAR SUPERIOR */}
      <nav className="navbar">
        <div className="brand" style={{ cursor: 'pointer' }} onClick={() => { setCurrentScreen('home'); clearForm(); }}>
          Adworkspace
        </div>
        
        {currentScreen === 'home' && (
          <div className="nav-links">
            <a href="#" className="nav-link">Produtos</a>
            <a href="#" className="nav-link">Preços</a>
            <button className="btn btn-primary" onClick={() => { setCurrentScreen('login'); clearForm(); }}>
              Entrar
            </button>
          </div>
        )}
      </nav>

      {/* CONTAINER CENTRAL */}
      <main className="hero-container">
        
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

        {/* 1. HOME (SEM MENCIONAR GRATUIDADE) */}
        {currentScreen === 'home' && (
          <>
            <h1 className="hero-title">
              A nova maneira de criar <br /> 
              <span className="text-blue">anúncios com IA</span>
            </h1>
            <p className="hero-subtitle">
              Transforme as suas ideias em campanhas de alta conversão prontas para o seu negócio com total liberdade de personalização.
            </p>
            <button className="btn btn-large" onClick={() => { setCurrentScreen('register'); clearForm(); }}>
              Criar minha conta
            </button>
            <p className="footer-text">
              Desbloqueie o poder da Inteligência Artificial aplicada ao marketing digital.
            </p>
          </>
        )}

        {/* 2. LOGIN */}
        {currentScreen === 'login' && (
          <div className="auth-container">
            <button className="btn-back" onClick={() => { setCurrentScreen('home'); clearForm(); }}>
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
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    className="form-input" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? '🙈' : '🐵'}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-large" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '10px' }}>
                {loading ? 'Carregando...' : 'Entrar'}
              </button>
            </form>
            
            <p className="auth-switch">
              Ainda não possui acesso? 
              <span className="auth-link" onClick={() => { setCurrentScreen('register'); clearForm(); }}>Cadastre-se</span>
            </p>
          </div>
        )}

        {/* 3. CADASTRO */}
        {currentScreen === 'register' && (
          <div className="auth-container">
            <button className="btn-back" onClick={() => { setCurrentScreen('home'); clearForm(); }}>
              ← Voltar para o início
            </button>
            <h2 className="auth-title">Crie sua conta</h2>
            <p className="auth-subtitle">Faça seu registro para começar a gerar campanhas otimizadas</p>
            
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
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    className="form-input" 
                    placeholder="Crie uma senha forte" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? '🙈' : '🐵'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirmar Senha</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    className="form-input" 
                    placeholder="Digite a senha novamente" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    title={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showConfirmPassword ? '🙈' : '🐵'}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-large" style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '10px' }}>
                {loading ? 'Processando...' : 'Confirmar Cadastro'}
              </button>
            </form>
            
            <p className="auth-switch">
              Já possui uma credencial de acesso? 
              <span className="auth-link" onClick={() => { setCurrentScreen('login'); clearForm(); }}>Fazer Login</span>
            </p>
          </div>
        )}

      </main>
    </div>
  )
}

export default App