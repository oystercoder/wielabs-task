
/**
 ** *resources used: chatgpt to rectify errors, youtube to understand cheerio.
 */
 
import * as cheerio from "cheerio";
import { YC, Job, Founder } from "./way";

/**
 * Extracts company data from the provided Cheerio instance.
 * @param $ The Cheerio instance representing the parsed HTML.
 * @returns A Promise resolving to a YCCompany object representing the extracted company data.
 */
export async function ecd($: cheerio.CheerioAPI): Promise<YC> {
    return new Promise(async (resolve, reject) => {
        // Select the main card containing company data
        const card = $(".ycdc-card");
        // Find all div elements within the card
        const r = card.find("div");
        // Extract the company name from the first div element
        const Name = r.eq(0).text();
        // Extract the founded date from the second div element's nested span
        const founded = r.eq(1).find("span").eq(1).text();
        // Extract the team size from the second div element's nested span
        const teamSize = r.eq(1).find("span").eq(3).text();
        // Extract the location from the second div element's nested span
        const location = r.eq(1).find("span").eq(5).text();
        // Extract founders data using the extractFounders function
        const founders = ef($);
        // Extract launch link using the extractLaunchLink function
        const launchLink = extractLaunchLink($);
        
        // Resolve the promise with the extracted company data
        resolve({
            name: Name,
            founded: founded,
            teamSize: parseInt(teamSize),
            location: location,
            founders: founders,
            launchPosts: { link: launchLink },
        });
    });
}

/**
 * Extracts job data from the provided Cheerio instance.
 * @param $ The Cheerio instance representing the parsed HTML.
 * @returns A Promise resolving to an array of Job objects representing the extracted job data.
 */
export function ej($: cheerio.CheerioAPI): Promise<Job[]> {
  return new Promise((resolve, reject) => {
      // Find all section elements in the HTML
      const sections = $("section");
      // Initialize an empty array to store job data
      const jobs: Job[] = [];
      
      // Iterate over each section
      sections.each((index, section) => {
          // Find all job card elements within the current section
          const jobCards = $(section).find("div").eq(0).find(".flex-grow.space-y-5");

          // Iterate over each job card
          jobCards.each((index, jobCard) => {
              // Extract role from the job card
              const role = $(jobCard).find(".ycdc-with-link-color a").text();
              // Extract location from the job card
              const location = $(jobCard).parent().find(".list-item").first().text();

              // Push extracted job data to the jobs array
              jobs.push({
                  role: role,
                  location: location,
              });
          });
      });

      // Resolve the promise with the extracted job data
      resolve(jobs);
  });
}

/**
 * Extracts founders data from the provided Cheerio instance.
 * @param $ The Cheerio instance representing the parsed HTML.
 * @returns An array of Founder objects representing the extracted founders data.
 */
function ef($: cheerio.CheerioAPI): Founder[] {
    // Select all elements with the class "leading-snug"
    const founderCard = $(".leading-snug");
    // Initialize an empty array to store founder data
    const founders: Founder[] = [];
    // Iterate over each founder element
    founderCard.each((index, element) => {
        // Extract founder name from the element
        const name = $(element).find(".font-bold").text();
        // Create a new Founder object with the extracted name
        const founder: Founder = { name: name };
        // Select all links within the element
        const links = $(element).find(".mt-1.space-x-2");

        // Iterate over each link
        links.find("a").each((index, element) => {
            // Extract link title and href attributes
            const title = $(element).attr("title");
            const href = $(element).attr("href");
            // If both title and href exist, add them to the founder object
            if (title && href) {
                const linkName = title.split(" ")[0];
                founder[linkName] = href;
            }
        });
        // Push the founder object to the founders array
        founders.push(founder);
    });

    // Return the array of founder data
    return founders;
}

/**
 * Extracts the launch link from the provided Cheerio instance.
 * @param $ The Cheerio instance representing the parsed HTML.
 * @returns The extracted launch link.
 */
function extractLaunchLink($: cheerio.CheerioAPI): string {
    // Find all section elements in the HTML
    const Sections = $("section");
    // Iterate over each section
    for (let i = 0; i < Sections.length; i++) {
        // Find the header text of the current section
        const header = Sections.eq(i).find("h3").eq(0).text();
        // If the header text matches "Company Launches", extract the launch link
        if (header === "Company Launches") {
            const A_s = Sections.eq(i).find("a");
            const launchL: string = "https://www.ycombinator.com" + A_s.eq(0).attr("href");
            return launchL;
        }
    }
    // If no launch link is found, return an empty string
    return "";
}
