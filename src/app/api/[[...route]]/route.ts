import { Hono } from 'hono';
import { getEmbedding } from '@/helpers/getEmbeddings';
import { db } from '@/db';
import { articlesTable } from '@/db/schema';
import { cosineSimilarity } from '@/helpers/cosineSimilarity';

const app = new Hono();

app.get('/search', async (c) => {
  const query = c.req.query('q');
  if (!query) {
    return c.json({ error: 'Query parameter "q" is required' }, 400);
  }

  try {
    // Generate the embedding for the query
    const queryEmbedding = await getEmbedding(query);

    // Retrieve all documents and their embeddings
    const docs = await db.select(a).all();

    // Calculate similarity scores
    const similarities = docs.map((doc) => ({
      ...doc,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding),
    }));

    // Sort by similarity in descending order
    similarities.sort((a, b) => b.similarity - a.similarity);

    // Return the top 5 most similar documents
    const topDocs = similarities.slice(0, 5).map((doc) => ({
      id: doc.id,
      content: doc.content,
      similarity: doc.similarity,
    }));

    return c.json(topDocs);
  } catch (error) {
    console.error('Error during search:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
