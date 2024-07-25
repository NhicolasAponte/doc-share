"use client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Loader from "./Loader";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";

// NOTE TODO: get id for room from query params
// TODO: style for div wrapping active collaborators
// className="flex w-full flex-1 justify-end gap-2 sm:gap-3"
const CollaborativeRoom = ({
  roomId,
  roomMetadata,
}: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div className="flex w-fit items-center justify-center gap-2">
              <p className="document-title">Temp doc title</p>
            </div>
            <div>
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
