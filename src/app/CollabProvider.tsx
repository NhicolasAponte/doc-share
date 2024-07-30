"use client";
import React from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";
import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentUsers } from "@/lib/server-actions/user.actions";
import { useUser } from "@clerk/nextjs";

const CollabProvider = ({ children }: { children: React.ReactNode }) => {

  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider 
      authEndpoint={"/api/liveblocks-auth"}
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const clerkUser = await getClerkUsers({ userIds: [] });
        const docUsers = await getDocumentUsers(
          roomId,
          clerkUser?.emailAddresses[0].emailAddress,
          text,
        );

        return docUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default CollabProvider;
