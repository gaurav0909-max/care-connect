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

// Initialize Appwrite client
const client = new sdk.Client();
client
    .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
    .setProject(NEXT_PUBLIC_PROJECT_ID!)
    .setKey(NEXT_PUBLIC_API_KEY!);

// Export Appwrite SDK services
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
