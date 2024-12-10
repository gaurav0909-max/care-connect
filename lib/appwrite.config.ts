import * as sdk from "node-appwrite";

export const {
    NEXT_PUBLIC_ENDPOINT,
    NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_BUCKET_ID,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
} = process.env;

// Log for debugging
console.log("Endpoint:", NEXT_PUBLIC_ENDPOINT);
console.log("Project ID:", NEXT_PUBLIC_PROJECT_ID);
console.log("API Key:", NEXT_PUBLIC_API_KEY);

// Initialize Appwrite client
const client = new sdk.Client();
client
    .setEndpoint(NEXT_PUBLIC_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(NEXT_PUBLIC_PROJECT_ID || "6756abad000e1f266e54")
    .setKey(NEXT_PUBLIC_API_KEY || "standard_310bd2e8b6157394a9e036e86a2d59e963a636ecaa3571302645aa711f1efc65d919cc8f8cdecf9fbbb575234775a2e7a13f78428958da8f8484d271694bcb9e1b9a22fb66ac321312f03eb49ac75b82d2955bb5a31a4d8ec374af68658f4c072ecc026dd8842af88bb90858a3b4b17db2f90e2fba4f78f472c6701cf55fe35d");

// Export Appwrite SDK services
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
