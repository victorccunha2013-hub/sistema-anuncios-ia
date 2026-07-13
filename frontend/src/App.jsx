import React, { useState } from 'react'
import './index.css'

function App() {
  const [prompt, setPrompt] = useState('')

  return (
    <div style={{
      width: '100%',
      maxWidth: '550px',
      backgroundColor: '#1e293b',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
      border: '1px solid #334155'
    }}>
      <header style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#38bdf8' }}>
          AdsGen <span style={{ color: '#fff' }}>AI</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Crie anúncios de alta conversão em segundos usando inteligência artificial.
        </p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'col', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500', color: '#cbd5e1' }}>
            O que você deseja anunciar?
          </label>
          <input 
            type="text" 
            placeholder="Ex: Curso de programação para iniciantes..." 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              padding: '14px 16px',
              borderRadius: '8px',
              border: '1px solid #475569',
              backgroundColor: '#0f172a',
              color: '#fff',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
        </div>

        <button style={{
          padding: '14px',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#38bdf8',
          color: '#0f172a',
          fontWeight: '600',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          marginTop: '8px'
        }}>
          Gerar Cópia do Anúncio
        </button>
      </main>
    </div>
  )
}

export default App