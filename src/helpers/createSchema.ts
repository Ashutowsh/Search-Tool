import { db } from "@/db";
import { sql } from 'drizzle-orm';

export async function createDynamicSchema(schemaName: string, tableName: string, attributes: Array<{ name: string; type: string; constraints?: string }>) {
    // Step 1: Create schema if not exists
    try {
        const createSchemaSQL = `CREATE SCHEMA IF NOT EXISTS ${schemaName};`;
        await db.execute(sql.raw(createSchemaSQL));

        // Step 2: Build the table creation SQL
        const columnsSQL = attributes
            .map(attr => `${attr.name} ${attr.type} ${attr.constraints || ''}`.trim())
            .join(', ');
        const createTableSQL = `CREATE TABLE ${schemaName}.${tableName} (${columnsSQL});`;

        // Step 3: Execute the table creation SQL
        await db.execute(sql.raw(createTableSQL));

        console.log(`Schema ${schemaName} and table ${tableName} created successfully.`);
    } catch (error : any) {
        console.log(error);
    }
}
