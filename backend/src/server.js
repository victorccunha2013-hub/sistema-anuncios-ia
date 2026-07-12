// src/server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Multer para salvar temporariamente os uploads na pasta /uploads
const upload = multer({ dest: 'uploads/' });

// Rota principal que o Frontend vai chamar
app.post('/api/ads/generate', upload.single('image'), async (req, res) => {
  try {
    const briefing = req.body.briefing;
    const imageFile = req.file; // Contém o caminho temporário, tamanho, formato, etc.

    if (!imageFile || !briefing) {
      return res.status(400).json({ error: 'Imagem e briefing são obrigatórios.' });
    }

    console.log('--- Novo pedido recebido ---');
    console.log('Briefing do usuário:', briefing);
    console.log('Arquivo salvo temporariamente em:', imageFile.path);

    // [AQUI VAI ENTRAR A CHAMADA DA API DE VISÃO DO GPT]
    // Próximo passo: Ler essa imagem com o GPT, extrair as características do produto 
    // e fundir com o briefing do cliente para gerar o prompt perfeito de imagem.

    // Resposta temporária para o frontend não ficar travado
    res.status(200).json({ 
      success: true, 
      message: 'Dados recebidos no servidor. Pronto para chamar as APIs de IA.' 
    });

  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});