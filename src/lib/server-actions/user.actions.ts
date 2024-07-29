'use server'

import { clerkClient } from "@clerk/nextjs/server";
import { parseStringify } from "../utils";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
    try {
        const { data } = await clerkClient().users.getUserList({
            emailAddress: userIds
        })

        const users = data.map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.emailAddresses[0].emailAddress,
            avatar: user.imageUrl,
        }))

        //const sortedUsers = users.sort((a, b) => a.id.localeCompare(b.id))

        const sortedUsers = userIds.map((email) => users.find((user) => user.email === email))

        return parseStringify(sortedUsers)
    }
    catch (error) {
        console.error(`Error occurred while fetching clerk users: `, error);
    }
}