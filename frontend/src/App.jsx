import React from 'react'
import './index.css'

function App() {
  return (
    <div>
      <div className="bg-gradient"></div>

      {/* NAVBAR SUPERIOR */}
      <nav className="navbar">
        <div className="brand">
          Adworkspace
        </div>
        
        <div className="nav-links">
          <a href="#" className="nav-link">Produtos</a>
          <a href="#" className="nav-link">Preços</a>
          <button className="btn btn-primary">
            Entrar
          </button>
        </div>
      </nav>

      {/* HERO SECTION CENTRAL */}
      <main className="hero-container">
        <h1 className="hero-title">
          A nova maneira de criar <br /> 
          <span className="text-blue">anúncios com IA</span>
        </h1>
        
        <p className="hero-subtitle">
          Transforme as suas ideias em campanhas prontas para o seu negócio com a liberdade de personalizar cada detalhe.
        </p>

        <button className="btn btn-large">
          Comece já
        </button>
        
        <p className="footer-text">
          Comece grátis. Não é necessário cartão de crédito.
        </p>
      </main>
    </div>
  )
}

export default App