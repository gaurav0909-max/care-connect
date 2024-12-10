import { ID, Query } from "node-appwrite";
import { DATABASE_ID, databases, NEXT_PUBLIC_BUCKET_ID, NEXT_PUBLIC_ENDPOINT, NEXT_PUBLIC_PROJECT_ID, PATIENT_COLLECTION_ID, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file"
import fs from 'fs';
import path from 'path';
export const createUser = async (user: CreateUserParams) => {
    try {
        // Create new user
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone, // Use empty string if phone is undefined
            undefined,
            user.name
        );

        return parseStringify(newUser);

    } catch (error: any) {
        if (error?.code === 409) {
            console.warn("User already exists, fetching existing user...");
            const existingUsers = await users.list([
                Query.equal("email", [user.email]),
            ]);

            return existingUsers.users[0];
        }

        console.error("An error occurred while creating a new user:", error.message || error);
        throw error; // Re-throw error for higher-level handling
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user)
    } catch (error) {
        console.log('error', error)
    }
}

export const registerPatient = async ({ identificationDocument, ...patient }
    : RegisterUserParams) => {
    try {
        let file;
        if (identificationDocument) {
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blogFile') as Blob,
                identificationDocument?.get('fileName') as string,
            )

            file = await storage.createFile(NEXT_PUBLIC_BUCKET_ID!, ID.unique(), inputFile)
        }

        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/
                files/${file?.$id}/view?project=${NEXT_PUBLIC_PROJECT_ID}`,
                ...patient
            }
        )

        return parseStringify(newPatient)
    } catch (error) {
        console.log(error)
    }
}
