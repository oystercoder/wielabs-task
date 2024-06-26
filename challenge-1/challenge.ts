/**
 * The entry point function. This will download the given dump file, extract/decompress it,
 * parse the CSVs within, and add the data to a SQLite database.
 * This is the core function you'll need to edit, though you're encouraged to make helper
 * functions!
 */

//code from chatgpt+references from stackoverflow

import knex from "knex";
import { downloadFile } from './download';
import { extract } from './extract';
import { initializeDatabase } from './database';
import { processCSV } from './manage';


import * as zlib from 'zlib';

import * as tar from 'tar';


export async function processDataDump() {
const downloadPath: string = './tmp/dump.tar.gz';
await downloadFile('https://fiber-challenges.s3.amazonaws.com/dump.tar.gz', downloadPath);
const extractionPath = './tmp/extracted';

await function extract(downloadPath: string, extractionPath: string): Promise<void> {
  // Create the extraction directory if it doesn't exist
  if (!fs.existsSync(extractionPath)) {
      fs.mkdirSync(extractionPath);
  }

  // Create a promise to track the extraction process
  return new Promise<void>((resolve, reject) => {
      // Create a read stream for the downloaded file
      const readStream = fs.createReadStream(downloadPath);

      // Pipe the read stream through the decompression (gunzip) stream
      const decompressStream = zlib.createGunzip();

      // Pipe the decompression stream through the untar stream
      const extractStream = tar.extract({
          cwd: extractionPath // Extract files to the specified directory
      });

      // Handle errors during the extraction process
      extractStream.on('error', (err: Error) => {
          reject(new Error('Error extracting file: ' + err.message));
      });

      // Listen for the 'finish' event to know when extraction is complete
      extractStream.on('finish', () => {
          console.log('Extraction complete');
          resolve(); // Resolve the promise when extraction is complete
      });

      // Start the extraction process
      readStream.pipe(decompressStream).pipe(extractStream);
  });
}
await initializeDatabase();
await function processCSV(filePath: string, tableName: string): Promise<void> {
  // Create a stream for reading the CSV file
  const stream = fs.createReadStream(filePath);

  // Create a knex instance for SQLite3
  const knexInstance = knex({
    client: "sqlite3",
    connection: {
      filename: "out/database.sqlite", // Adjust the path as needed
    },
    useNullAsDefault: true,
  });

  // Use a streaming API to read the CSV and insert rows into the database
  let batchInsertArray: any[] = [];
  const batchSize = 100;

  stream
    .pipe(fastcsv.parse({ headers: true }))
    .on("data", async (data) => {
      batchInsertArray.push(data);

      if (batchInsertArray.length >= batchSize) {
        await insertBatchIntoTable(knexInstance, tableName, batchInsertArray);
        batchInsertArray = [];
      }
    })
    .on("end", async () => {
      if (batchInsertArray.length > 0) {
        await insertBatchIntoTable(knexInstance, tableName, batchInsertArray);
      }
      console.log('${tableName} CSV file successfully processed.');
    })
    .on("error", (error) => {
      console.error("Error parsing CSV:", error);
    });

  // Return a promise to handle asynchronous behavior
  return new Promise<void>((resolve, reject) => {
    stream.on("error", reject);
    stream.on("end", resolve);
  });
}

async function insertBatchIntoTable(
  knexInstance: any,
  tableName: string,
  batchInsertArray: any[]
) {
  try {
    await knexInstance.batchInsert(tableName, batchInsertArray);
  } catch (error) {
    console.error("Error inserting batch:", error);
  }
}

// Paths to CSV files


// Process organization CSV


const customerCSVPath = "tmp\\extracted\\dump\\customers.csv";
const organizationCSVPath = "tmp\\extracted\\dump\\organizations.csv";
 // Process customer CSV
 await processCSV(customerCSVPath, "customers");
 // Process organization CSV
 await processCSV(organizationCSVPath, "organizations");
  /**
   * Put your code here!
   */
}
 
