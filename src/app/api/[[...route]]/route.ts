import { Hono } from 'hono';
import { db } from '@/db';
import { getEmbedding } from '@/helpers/getEmbeddings';
import { articlesTable } from '@/db/schema';

const app = new Hono();

// API endpoint for searching articles semantically
app.post('/search', async (c) => {
  try {
    // Get the query from the request body
    const { query } = await c.req.json();
    
    if (!query) {
      return c.json({ error: "Query parameter is required" }, 400);
    }

    // Step 1: Get embedding for the query
    const queryEmbedding = await getEmbedding(query);

    // Step 2: Fetch all articles from the database
    const articles = await db.select().from(articlesTable);

    // Step 3: Calculate the cosine similarity between the query embedding and article embeddings
    // Since embeddings are stored in the database, we should compute the similarity here (for simplicity)
    const articleScores = articles.map((article) => {
      const articleEmbedding = JSON.parse(article.embedding);  // Assuming embeddings are stored as JSON in DB
      const similarity = cosineSimilarity(queryEmbedding, articleEmbedding);
      return { ...article, similarity };
    });

    // Step 4: Sort articles by similarity score in descending order
    articleScores.sort((a, b) => b.similarity - a.similarity);

    // Step 5: Return the top results
    const topResults = articleScores.slice(0, 5);  // Return top 5 results
    return c.json(topResults);

  } catch (error) {
    console.error("Error during semantic search:", error);
    return c.json({ error: "An error occurred while processing the search request." }, 500);
  }
});

// Cosine Similarity Function (used for comparing embeddings)
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Start the app
app.fire();
