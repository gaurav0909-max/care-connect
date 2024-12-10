import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

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
