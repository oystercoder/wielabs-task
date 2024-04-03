//code from chatgpt
import { CheerioCrawler } from "crawlee";
import { ecd, ej } from "./derive";
import { YC, Job } from "./way";

export async function sp(url: string[]): Promise<YC[]> {
  // Array to hold scraped data
  const sd: YC[] = [];

  //configure the crawler
  const crawler = new CheerioCrawler({
    requestHandler: async ({ response, $ }) => {
      //funtion call to handle the extraction logic
      const companyData = await ecd($);
      sd.push({ ...companyData, url: response.url });
    },

    // handle failed request
    failedRequestHandler({ request }) {
      console.log(request.url, "failed");
    },
  });

 await crawler.run(url);

  return sd;
}

export async function scrapeJob(
  url: string[]
): Promise<{ [key: string]: Job[] }[]> {
  // Initialize an array to store scraped data for each URL
  let sc: { 
    [key: string]: Job[] 
  }[] = [];
  // Create a new CheerioCrawler instance
  const crawler = new CheerioCrawler({
    requestHandler: async ({ response, $ }) => {
      //funtion call to handle the extraction logic
      const jobData = await ej($);
      // Handle each request
      const data: { 
        [key: string]: Job[]
      } = {};
      data[response.url] = jobData;
       // Push the scraped job data to the array
      sc.push(data);
    },

    // handle failed request
    failedRequestHandler({ request }) {
      console.log(request.url, "failed");
    },
  });

   // Run the crawler for each URL asynchronously
  await crawler.run(url);

    // Return the array of scraped job data

  return sc;
}
