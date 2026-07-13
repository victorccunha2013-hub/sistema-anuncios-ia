import React from 'react'
import './index.css'

function App() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="bg-gradient"></div>

      {/* NAVBAR SUPERIOR */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 80px',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 10
      }}>
        <div style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-1px' }}>
          AdsWorkspace<span style={{ color: '#3b82f6' }}>.com</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Produtos</a>
          <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>Preços</a>
          <button style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '10px 25px',
            borderRadius: '25px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            transition: '0.3s'
          }}>
            Entrar
          </button>
        </div>
      </nav>

      {/* HERO SECTION CENTRAL */}
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <h1 style={{
          fontSize: '72px',
          fontWeight: '800',
          lineHeight: '1.1',
          marginBottom: '24px',
          maxWidth: '900px'
        }}>
          A nova maneira de criar <br /> 
          <span style={{ color: '#3b82f6' }}>anúncios com IA</span>
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: '#94a3b8',
          marginBottom: '40px',
          maxWidth: '700px',
          lineHeight: '1.6'
        }}>
          Transforme suas ideias em campanhas prontas para o seu negócio com a liberdade de personalizar cada detalhe.
        </p>

        <button style={{
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          padding: '18px 45px',
          borderRadius: '40px',
          fontSize: '18px',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
          transition: '0.3s'
        }}>
          Comece já
        </button>
        
        <p style={{ marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
          Comece grátis. Não é necessário cartão de crédito.
        </p>
      </main>
    </div>
  )
}

export default App