"use server";
import { nanoid } from "nanoid";
import { liveblocks } from "@/lib/liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "@/lib/utils";
import { getDocumentsRoute } from "../routes";
import { redirect } from "next/navigation";

export async function getAllDocumentsByUserId(userId: string) {
  try {
    // all rooms were coming back empty
    // turned out it was because on creation, we are passing the
    // user email to be used as the user id in liveblocks
    const result = await liveblocks.getRooms({ userId: userId });
    // console.log('result', result);
    const rooms = result.data;
    // console.log('rooms', rooms);
    return parseStringify(rooms);
  } catch (error) {
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
      email: email, //NOTE TODO: this should be updated to creatorEmail
      title: "Untitled Document",
    };
    // usersAccesses is an object with keys as user ids and values as an array of permissions
    // the user id is the email address of the user
    // each key in the object represents a user and the value is an array of permissions
    const userPermissions: RoomAccesses = {
      // [user email]: [permissions]
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

    revalidatePath("/");
    return parseStringify(room);
  } catch (error) {
    console.error(`Error occurred while creating document: `, error);
  }
};

export async function getDocument({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  try {
    const room = await liveblocks.getRoom(roomId);
    //NOTE TODO: Implement access control
    //const hasAccess = room.usersAccesses[userId]?.includes('room:write');
    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAccess) {
      throw new Error("User is not authorized to have access to this document");
    }

    return parseStringify(room);
  } catch (error) {
    console.error(`Error occurred while getting document: `, error);
  }
}

export async function updateDocument({
  roomId,
  metadata,
}: {
  roomId: string;
  metadata: RoomMetadata;
}) {
  try {
    const updatedRoom = await liveblocks.updateRoom(roomId, { metadata });
    revalidatePath(getDocumentsRoute(roomId));
    return parseStringify(updatedRoom);
  } catch (error) {
    console.error(`Error occurred while updating document: `, error);
  }
}
/**
 * This function takes a roomId and deletes the document with the 
 * corresponding roomId using the liveblocks API
 * @param roomId: string 
 */
export async function deleteDocument(roomId: string) {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    console.error(`Error occurred while deleting document: `, error);
  }
}

export async function updateDocumentAccess({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) {
  try {
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    };
    const room = await liveblocks.updateRoom(roomId, { usersAccesses });

    if (room) {
      //NOTE TODO: send notification
    }

    revalidatePath(getDocumentsRoute(roomId));
    return parseStringify(room);
  } catch (error) {
    console.error(`Error occurred while updating document access: `, error);
  }
}

export async function deleteCollaborator(roomId: string, email: string) {
  try {
    const room = await liveblocks.getRoom(roomId);
    console.log("room", room.metadata);
    if (room) {
      if (room.metadata.email === email) {
        //metadata.email is the email of creator of the document
        throw new Error("Cannot delete the creator of the document");
      }
      const usersAccesses = room.usersAccesses;
      console.log("usersAccesses", usersAccesses);
      delete usersAccesses[email];
      console.log("usersAccesses", usersAccesses);
      const updatedRoom = await liveblocks.updateRoom(roomId, {
        usersAccesses,
      });

      revalidatePath(getDocumentsRoute(roomId));
      return parseStringify(updatedRoom);
    }
  } catch (error) {
    console.error(`Error occurred while deleting collaborator: `, error);
  }
}
