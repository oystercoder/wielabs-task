/**
 * Represents the response data structure that might be returned from an API or data source.
 */
//used chatgpt to rectify errors.
export interface responseData {
  "Company Name": string; // The name of the company
  "YC URL": string; // The URL of the company on the Y Combinator website
}

/**
 * Represents the structure of a founder.
 */
export interface Founder {
  name: string; // The name of the founder
  [key: string]: string; // Additional properties (key-value pairs) of type string can be added dynamically
}

/**
 * Represents the structure of a job.
 */
export interface Job {
  role: string; // The role of the job
  location: string; // The location of the job
  url?: string; // (Optional) The URL associated with the job
}

/**
 * Represents the structure of a launch post.
 */
export interface LaunchPost {
  title?: string; // (Optional) The title of the launch post
  link: string; // The link to the launch post
}

/**
 * Represents the structure of a Y Combinator company.
 */
export interface YC {
  name: string; // The name of the company
  url?: string; // (Optional) The URL of the company
  founded?: string; // (Optional) The founding date of the company
  teamSize?: number; // (Optional) The size of the company's team
  location?: string; // (Optional) The location of the company
  founders?: Founder[]; // (Optional) The founders of the company
  jobs?: Job[]; // (Optional) The jobs available at the company
  launchPosts?: LaunchPost; // (Optional) The launch posts associated with the company
}
