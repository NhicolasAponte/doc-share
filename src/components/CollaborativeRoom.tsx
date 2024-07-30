"use client";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React, { useRef, useState } from "react";
import Loader from "./Loader";
import { Editor } from "./editor/Editor";
import ActiveCollaborators from "./ActiveCollaborators";
import { Input } from "./ui/input";
import Image from "next/image";
import { updateDocument } from "@/lib/server-actions/room.actions";
import ShareModal from "./ShareModal";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(roomMetadata.title);
  //console.log(roomMetadata);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      // console.log("xxxxx handleEnterKey xxxxxx");
      updateTitleHandler();
    }
  }

  async function updateTitleHandler() {
    // console.log("xxxxx updateTitleHandler xxxxxx");
    setEditing(false);
    let updatedDocument;
    if (title !== roomMetadata.title) {
      setLoading(true);
      const newMetadata = { ...roomMetadata, title };
      updatedDocument = await updateDocument({ roomId, metadata: newMetadata });
    }
    // console.log("xxxxx updated document xxxxxx");
    // console.log(typeof updatedDocument);
    // console.log(updatedDocument);
    updatedDocument && setLoading(false);
  }

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {editing && !loading ? (
                <Input
                  className="document-title-input"
                  type="text"
                  value={title}
                  ref={inputRef}
                  placeholder="Untitled document"
                  onChange={(event) => setTitle(event.target.value)}
                  onKeyDown={handleEnterKey}
                  disabled={!editing}
                  onBlur={updateTitleHandler}
                />
              ) : (
                <h1>{title}</h1>
              )}
              {currentUserType === "editor" && !editing && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="Edit"
                  width={24}
                  height={24}
                  onClick={() => setEditing(true)}
                  className="pointer"
                />
              )}

              {currentUserType !== "editor" && !editing && (
                <p className="view-only-tag">View Only</p>
              )}

              {loading && <p className="text-sm text-blue-100/50">saving...</p>}
            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />

              <ShareModal
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />

              <SignedOut>
                <SignInButton />
              </SignedOut>
              
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
