


import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

export async function downloadFile(fileUrl: string, downloadPath: string) {
    // Ensure the directory exists
    mkdirp.sync(path.dirname(downloadPath));

    // Create a write stream to save the downloaded file
    const fileStream: fs.WriteStream = fs.createWriteStream(downloadPath);

    // Send an HTTP GET request to the file URL
    const request = https.get(fileUrl, (response) => {
        // Pipe the response stream to the file stream
        response.pipe(fileStream);

        // Log a message when the download is complete
        response.on('end', () => {
            console.log('Download complete');
            // Proceed to Step 2: Decompression and Extraction
        });
    }).on('error', (err: Error) => {
        // Log any errors that occur during the download
        console.error('Error downloading file:', err.message);
    });
}
const downloadPath: string = './tmp/dump.tar.gz';
downloadFile('https://fiber-challenges.s3.amazonaws.com/dump.tar.gz', downloadPath);
