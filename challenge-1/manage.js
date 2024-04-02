"use strict";
// import * as fs from "fs";
// import * as fastcsv from "fast-csv";
// import * as path from "path";
// import knex from "knex";
Object.defineProperty(exports, "__esModule", { value: true });
// async function processCSV(filePath: string, tableName: string): Promise<void> {
//   // Create a stream for reading the CSV file
//   const stream = fs.createReadStream(filePath);
//   // Create a knex instance for SQLite3
//   const knexInstance = knex({
//     client: "sqlite3",
//     connection: {
//       filename: "out/database.sqlite", // Adjust the path as needed
//     },
//     useNullAsDefault: true,
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
var knex_1 = require("knex");
var path_1 = require("path");
var fs_1 = require("fs");
var databaseDirectory = path_1.default.resolve(__dirname, "out");
if (!fs_1.default.existsSync(databaseDirectory)) {
    fs_1.default.mkdirSync(databaseDirectory);
}
function initializeDatabase() {
    var db = (0, knex_1.default)({
        client: "sqlite3",
        connection: {
            filename: path_1.default.resolve(__dirname, "out/database.sqlite")
        },
        useNullAsDefault: true
    });
    return createTables(db)
        .then(function () {
        console.log("Tables created successfully");
    })
        .catch(function (error) {
        console.error("Error creating tables:", error);
    });
}
function createTables(db) {
    return db.schema.createTable("customers", function (table) {
        table.increments("Index").primary();
        table.string("Customer Id");
        table.string("First Name");
        table.string("Last Name");
        table.string("Company");
        table.string("City");
        table.string("Country");
        table.string("Phone 1");
        table.string("Phone 2");
        table.string("Email");
        table.string("Subscription Date");
        table.string("Website");
    })
        .then(function () {
        return db.schema.createTable("organizations", function (table) {
            table.increments("Index").primary();
            table.string("Organization Id");
            table.string("Name");
            table.string("Website");
            table.string("Country");
            table.string("Description");
            table.bigInteger("Founded");
            table.string("Industry");
            table.bigInteger("Number of employees");
        });
    });
}
initializeDatabase().catch(function (error) {
    console.error("Error initializing database:", error);
});
