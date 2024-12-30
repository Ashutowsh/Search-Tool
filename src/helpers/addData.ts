import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { articlesTable } from '@/db/schema';
import { db } from '@/db';
import { articlesData } from '@/constants';

async function insertData(title: string, content: string) {
  const id = uuidv4();

  const user = {
    id: id,
    title: title,
    content: content,
  };

  await db.insert(articlesTable).values(user);
  console.log(`Inserted article: ${title}`);
}

export const insertArticles = async () => {
    await Promise.all(
      articlesData.map(async (article) => {
        await insertData(article.title, article.content);
      })
    );
    console.log("All articles inserted!");
  };
  
  insertArticles();