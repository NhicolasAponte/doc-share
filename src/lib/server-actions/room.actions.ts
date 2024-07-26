"use server";
import { nanoid } from "nanoid";
import { liveblocks } from "@/lib/liveblocks";
import { revalidatePath } from "next/cache";
import { parseStringify } from "@/lib/utils";
import { getDocumentsRoute } from "../routes";


export async function getAllDocumentsByUserId(userId: string) {
  try {
    // all rooms were coming back empty 
    // turned out it was because on creation, we are passing the 
    // user email to be used as the user id in liveblocks
    const result = await liveblocks.getRooms({ userId: userId });
    console.log('result', result);
    const rooms = result.data;
    console.log('rooms', rooms);
    return parseStringify(rooms);
  }
  catch (error) {
    console.error(`Error occurred while getting all documents: `, error);
  }
}

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
      defaultAccesses: ['room:write'],
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

export async function getDocument({roomId, userId}: {roomId: string, userId: string} ) {
  try {
    const room = await liveblocks.getRoom(roomId);
    //NOTE TODO: Implement access control
    //const hasAccess = room.usersAccesses[userId]?.includes('room:write');
    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    // if (!hasAccess) {
    //   throw new Error("User is not authorized to have access to this document");
    // }

    return parseStringify(room);
  } catch (error) {
    console.error(`Error occurred while getting document: `, error);
  }
}

export async function updateDocument({roomId, metadata}: {roomId: string, metadata: RoomMetadata}) {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, {metadata});
    revalidatePath(getDocumentsRoute(roomId));
    return parseStringify(updatedRoom);
  }
  catch (error) {
    console.error(`Error occurred while updating document: `, error);
  }
}