// src/components/CreateAdForm.jsx
import React, { useState } from 'react';

export default function CreateAdForm() {
  const [file, setFile] = useState(null);
  const [briefing, setBriefing] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !briefing) return alert('Por favor, envie a foto e digite o briefing!');

    setLoading(true);
    
    // Usamos FormData para conseguir enviar arquivos binários (imagens) via requisição
    const formData = new FormData();
    formData.append('image', file);
    formData.append('briefing', briefing);

    try {
      const response = await fetch('http://localhost:3000/api/ads/generate', {
        method: 'POST',
        body: formData, // Envia para o seu backend
      });

      const data = await response.json();
      console.log('Resultado do Backend:', data);
      alert('Processamento iniciado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar Novo Anúncio com IA</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de Upload da Foto do Produto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Foto Real do Produto</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <p className="text-gray-600">
              {file ? `Selecionado: ${file.name}` : "Arraste a foto do produto aqui ou clique para buscar"}
            </p>
          </div>
        </div>

        {/* Campo do Briefing */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">O que você quer no anúncio?</label>
          <textarea
            value={briefing}
            onChange={(e) => setBriefing(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            placeholder="Ex: Quero uma garrafa térmica preta em um cenário de academia moderno, iluminação dramática. Destacar que mantém gelado por 24h."
          />
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Processando IA (Aguarde)...' : 'Gerar Criativo'}
        </button>
      </form>
    </div>
  );
}