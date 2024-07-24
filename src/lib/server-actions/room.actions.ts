"use server";
import { nanoid } from "nanoid";
import { liveblocks } from "@/lib/liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "@/lib/utils";

export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email: email,
      title: "Untitled Document",
    };

    const userPermissions: RoomAccesses = {
      [email]: ["room:write"],
    };
    // creating a room also creates a document since 
    // we wrapped the document creation logic in the room creation logic
    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses: userPermissions,
      defaultAccesses: [],
      //   groupsAccesses: {
      //     "my-group-id": ["room:write"],
      //   },
    });

    revalidatePath('/');
    return parseStringify(room);
  } catch (error) {
    console.error(`Error occurred while creating document: `, error);
  }
};
