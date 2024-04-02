// // import * as fs from "fs";
// // import * as fastcsv from "fast-csv";
// // import * as path from "path";
// // import knex from "knex";

// // export async function processCSV(filePath: string, tableName: string): Promise<void> {
// //   // Create a stream for reading the CSV file
// //   const stream = fs.createReadStream(filePath);

// //   // Create a knex instance for SQLite3
// //   const knexInstance = knex({
// //     client: "sqlite3",
// //     connection: {
// //       filename: "out/database.sqlite", // Adjust the path as needed
// //     },
// //     useNullAsDefault: true,
// //   });

// //   // Use a streaming API to read the CSV and insert rows into the database
// //   let batchInsertArray: any[] = [];
// //   const batchSize = 100;

// //   stream
// //     .pipe(fastcsv.parse({ headers: true }))
// //     .on("data", async (data) => {
// //       batchInsertArray.push(data);

// //       if (batchInsertArray.length >= batchSize) {
// //         await insertBatchIntoTable(knexInstance, tableName, batchInsertArray);
// //         batchInsertArray = [];
// //       }
// //     })
// //     .on("end", async () => {
// //       if (batchInsertArray.length > 0) {
// //         await insertBatchIntoTable(knexInstance, tableName, batchInsertArray);
// //       }
// //       console.log(`${tableName} CSV file successfully processed.`);
// //       await knexInstance.destroy(); // Close the knex connection
// //     })
// //     .on("error", (error) => {
// //       console.error("Error parsing CSV:", error);
// //     });

// //   // Return a promise to handle asynchronous behavior
// //   return new Promise<void>((resolve, reject) => {
// //     stream.on("error", reject);
// //     stream.on("end", resolve);
// //   });
// // }

// // async function insertBatchIntoTable(
// //   knexInstance: any,
// //   tableName: string,
// //   batchInsertArray: any[]
// // ) {
// //   try {
// //     await knexInstance.batchInsert(tableName, batchInsertArray);
// //   } catch (error) {
// //     console.error("Error inserting batch:", error);
// //   }
// // }

// // // Paths to CSV files
// // const customerCSVPath = "tmp\\extracted\\dump\\customers.csv";
// // const organizationCSVPath = "tmp\\extracted\\dump\\organizations.csv";

// // // Process organization CSV
// // processCSV(customerCSVPath, "customers");
// // processCSV(organizationCSVPath, "organizations");


// import * as fs from "fs";
// import * as fastcsv from "fast-csv";
// import * as path from "path";
// import knex from "knex";

// export async function processCSV(filePath: string, tableName: string): Promise<void> {
//   // Create a stream for reading the CSV file
//   const stream = fs.createReadStream(filePath);

//   // Create a knex instance for SQLite3 with connection pooling
//   const knexInstance = knex({
//     client: "sqlite3",
//     connection: {
//       filename: "out/database.sqlite", // Adjust the path as needed
//     },
//     useNullAsDefault: true,
//     pool: { min: 0, 
//       max: 10 ,
//        // Maximum time to wait for a connection to become available (in milliseconds)
      
//       // propagateCreateError: false, // Whether to propagate errors that occur during connection creation
//     }, // Example pool configuration, adjust as needed
//   });

//   // Use a streaming API to read the CSV and insert rows into the database
//   let batchInsertArray: any[] = [];
//   const batchSize = 100;

//   stream
//     .pipe(fastcsv.parse({ headers: true }))
//     .on("data", async (data) => {
//       batchInsertArray.push(data);

//       if (batchInsertArray.length >= batchSize) {
//         await insertBatchIntoTable(knexInstance, tableName, batchInsertArray);
//         batchInsertArray = [];
//       }
//     })
//     .on("end", async () => {
//       if (batchInsertArray.length > 0) {
//         await insertBatchIntoTable(knexInstance, tableName, batchInsertArray);
//       }
//       console.log(`${tableName} CSV file successfully processed.`);
//       await knexInstance.destroy(); // Close the knex connection
//     })
//     .on("error", (error) => {
//       console.error("Error parsing CSV:", error);
//     });

//   // Return a promise to handle asynchronous behavior
//   return new Promise<void>((resolve, reject) => {
//     stream.on("error", reject);
//     stream.on("end", resolve);
//   });
// }

// async function insertBatchIntoTable(
//   knexInstance: any,
//   tableName: string,
//   batchInsertArray: any[]
// ) {
//   try {
//     await knexInstance.batchInsert(tableName, batchInsertArray);
//   } catch (error) {
//     console.error("Error inserting batch:", error);
//   }
// }

// // Paths to CSV files
// const customerCSVPath = "tmp\\extracted\\dump\\customers.csv";
// const organizationCSVPath = "tmp\\extracted\\dump\\organizations.csv";

// // Process organization CSV
// await processCSV(customerCSVPath, "customers");
// await processCSV(organizationCSVPath, "organizations");


// import * as fs from "fs";
// import * as fastcsv from "fast-csv";
// import * as path from "path";
// import knex from "knex";

// async function processCSV(filePath: string, tableName: string): Promise<void> {
//   // Create a stream for reading the CSV file
//   const stream = fs.createReadStream(filePath);

//   // Create a knex instance for SQLite3
//   const knexInstance = knex({
//     client: "sqlite3",
//     connection: {
//       filename: "out/database.sqlite", // Adjust the path as needed
//     },
//     pool: {
//         min: 2,  // Minimum number of connections in the pool
//         max: 10, // Maximum number of connections in the pool
//       },
//     useNullAsDefault: true,
//   });

//   // Use a streaming API to read the CSV and insert rows into the database
//   let batchInsertArray: any[] = [];
//   const batchSize = 200;

//   stream
//     .pipe(fastcsv.parse({ headers: true }))
//     .on("data", async (data) => {
//       batchInsertArray.push(data);

//       if (batchInsertArray.length >= batchSize) {
//         await insertBatchIntoTable(knexInstance, tableName, batchInsertArray);
//         batchInsertArray = [];
//       }
//     })
//     .on("end", async () => {
//       if (batchInsertArray.length > 0) {
//         await insertBatchIntoTable(knexInstance, tableName, batchInsertArray);
//       }
//       console.log(`${tableName} CSV file successfully processed.`);
//     })
//     .on("error", (error) => {
//       console.error("Error parsing CSV:", error);
//     });

//   // Return a promise to handle asynchronous behavior
//   return new Promise<void>((resolve, reject) => {
//     stream.on("error", reject);
//     stream.on("end", resolve);
//   });
// }

// async function insertBatchIntoTable(
//   knexInstance: any,
//   tableName: string,
//   batchInsertArray: any[]
// ) {
//   try {
//     await knexInstance.batchInsert(tableName, batchInsertArray);
//   } catch (error) {
//     console.error("Error inserting batch:", error);
//   }
// }

// // Paths to CSV files
// const customerCSVPath = "tmp\\extracted\\dump\\customers.csv";
// const organizationCSVPath = "tmp\\extracted\\dump\\organizations.csv";

// // Process organization CSV
// processCSV(customerCSVPath, "customers");
// processCSV(organizationCSVPath, "organizations");




import * as fs from "fs";
import * as fastcsv from "fast-csv";
import * as path from "path";
import knex from "knex";

export async function processCSV(filePath: string, tableName: string): Promise<void> {
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
const customerCSVPath = "tmp\\extracted\\dump\\customers.csv";
const organizationCSVPath = "tmp\\extracted\\dump\\organizations.csv";

// Process organization CSV
processCSV(customerCSVPath, "customers");
processCSV(organizationCSVPath, "organizations");

