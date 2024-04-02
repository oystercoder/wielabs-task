

import * as fs from 'fs';
import * as path from 'path';
import knex from 'knex';

const OUT_FOLDER_PATH = path.join(process.cwd(), 'out');

function ensureOutDirectoryExists() {
    try {
        fs.mkdirSync(OUT_FOLDER_PATH, { recursive: true });
    } catch (error) {
        console.error('Error creating directory:', error);
    }
}

export async function initializeDatabase() {
    ensureOutDirectoryExists();

    const db = knex({
        client: 'sqlite3',
        connection: {
            filename: path.join(OUT_FOLDER_PATH, 'database.sqlite'),
        },
        pool: {
            min: 2,  // Minimum number of connections in the pool
            max: 10, // Maximum number of connections in the pool
        },
        useNullAsDefault: true,
    });

    try {
        await createTables(db);
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        await db.destroy();
    }
}

async function createTables(db: any) {
    await db.schema.createTable('customers', (table: any) => {
        table.increments('Index').primary();
        table.string('Customer Id');
        table.string('First Name');
        table.string('Last Name');
        table.string('Company');
        table.string('City');
        table.string('Country');
        table.string('Phone 1');
        table.string('Phone 2');
        table.string('Email');
        table.string('Subscription Date');
        table.string('Website');
    });

    await db.schema.createTable('organizations', (table: any) => {
        table.increments('Index').primary();
        table.string('Organization Id');
        table.string("Name");
        table.string("Website");
        table.string("Country");
        table.string("Description");
        table.bigInteger("Founded");
        table.string("Industry");
        table.bigInteger("Number of employees");
        
    });
}

initializeDatabase();