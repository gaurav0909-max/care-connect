import { Client, Account } from "appwrite";

const NEXT_PUBLIC_ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT || "";
const NEXT_PUBLIC_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "";

// Validate required environment variables
if (!NEXT_PUBLIC_ENDPOINT || !NEXT_PUBLIC_PROJECT_ID) {
  console.error("Missing required Appwrite environment variables:");
  if (!NEXT_PUBLIC_ENDPOINT) console.error("- NEXT_PUBLIC_ENDPOINT is not set");
  if (!NEXT_PUBLIC_PROJECT_ID) console.error("- NEXT_PUBLIC_PROJECT_ID is not set");
}

// Browser-compatible Appwrite client for authentication
const client = new Client()
  .setEndpoint(NEXT_PUBLIC_ENDPOINT)
  .setProject(NEXT_PUBLIC_PROJECT_ID);

// Account service for authentication operations
export const account = new Account(client);

export { client };
