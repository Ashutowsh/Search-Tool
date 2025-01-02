import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

/**
 * Generate embeddings for a given text using Hugging Face's Inference API.
 * @param {string} text - The text to generate embeddings for.
 * @returns {Promise<number[]>} - The embedding vector.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const response = await hf.featureExtraction({
      model: 'sentence-transformers/all-MiniLM-L6-v2', // Specify your model
      inputs: text,
    });
    if (!Array.isArray(response)) {
      throw new Error('Unexpected response format from Hugging Face API.');
    }
    return response as number[];
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}
