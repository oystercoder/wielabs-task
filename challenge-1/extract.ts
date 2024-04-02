import * as fs from 'fs';
import * as zlib from 'zlib';
import * as tar from 'tar';
import * as path from 'path';

export async function extract(downloadPath: string, extractionPath: string): Promise<void> {
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




