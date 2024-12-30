import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { infoTable } from '@/db/schema';
import { db } from '@/db';

export async function insertData(title: string, content: string) {
  const id = uuidv4();

  const user = {
    id: id,
    title: title,
    content: content,
  };

  await db.insert(infoTable).values(user);
  console.log(`Inserted article: ${title}`);
}



