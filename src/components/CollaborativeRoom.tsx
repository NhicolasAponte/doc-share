'use client';
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Loader from "./Loader";
import { Editor } from "./editor/Editor";

// NOTE TODO: get id for room from query params
// style div className="collaborative-room"
// uncomment lines in globals.css
const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<Loader />}>
        <div>
            {/* <Header>
                <div className="flex w-fit items-center justify-center gap-2">
                    <p className="document-title">Share</p>
                </div>
            </Header> */}
          <Header>
            <div className="">
              <p className="document-title">Temp doc title</p>
            </div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
