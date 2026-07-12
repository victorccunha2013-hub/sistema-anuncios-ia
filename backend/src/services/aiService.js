// backend/src/services/aiService.js (Ajustado)

/**
 * Gera a imagem comercial utilizando o modelo de imagem do ecossistema ChatGPT.
 * @param {string} imagePrompt - O prompt detalhado gerado pelo GPT-4o
 * @returns {Promise<string>} - Retorna a URL da imagem gerada
 */
async function generateCommercialImage(imagePrompt) {
  try {
    console.log('Disparando geração de imagem via API do ChatGPT Images...');
    
    const response = await openai.images.generate({
      model: 'dall-e-3', // Este é o identificador técnico no SDK para o motor do ChatGPT Images
      prompt: imagePrompt,
      n: 1,
      size: '1024x1024', // Formato quadrado padrão para anúncios de feed
      quality: 'hd',     // 'hd' traz o nível de detalhamento e texturas do ChatGPT Plus
      style: 'vivid',    // 'vivid' gera cores mais dramáticas e chamativas para anúncios comerciais
    });

    // Captura a URL pública gerada
    const imageUrl = response.data[0].url;
    return imageUrl;

  } catch (error) {
    console.error('Erro ao gerar imagem na API:', error);
    throw error;
  }
}