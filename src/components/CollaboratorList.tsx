import React, { useState } from "react";
import Image from "next/image";
import AccessTypeSelector from "./AccessTypeSelector";
import { Button } from "./ui/button";

const Collaborator = ({
  collaborator,
  creatorId,
}: {
  collaborator: User;
  creatorId: string;
}) => {
  const [userType, setUserType] = useState<UserType>(
    collaborator.userType || "viewer"
  );
  const [loading, setLoading] = useState(false);
  const shareDocumentHandler = async () => {};
  const deleteCollaboratorHandler = async (email: string) => {};
  return (
    <div className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="rounded-full size-9"
        />
        <div>
          <p className="line-clamp-1 text-sm font-semibold leading-4 text-white">
            {collaborator.name}
            <span className="text-10-regular pl-2 text-blue-100">
              {loading && "loading..."}
            </span>
          </p>
          <p className="text-sm font-light text-blue-100">
            {collaborator.email}
          </p>
        </div>
      </div>
      {collaborator.id !== creatorId ? ( //NOTE: change back to ===
        <span className="">Owner</span>
      ) : (
        <div>
          <AccessTypeSelector
            userType={userType}
            setUserType={setUserType}
            // onClickHandler={setLoading}
          />
          <Button type="button" onClick={() => deleteCollaboratorHandler(collaborator.email)}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

interface CollaboratorListProps {
  collaborators: User[];
  roomId: string;
  creatorId: string;
  userInfo: User;
}

const CollaboratorList = ({
  collaborators,
  roomId,
  creatorId,
  userInfo,
}: CollaboratorListProps) => {
  // collaborator id, collaborator email


  // li className="flex items-center justify-between gap-2 py-3"
  return (
    <div className="my-2 space-y-2">
      <ul>
        {collaborators.map((collaborator) => (
          <li key={collaborator.id} className="">
            <Collaborator collaborator={collaborator} creatorId={creatorId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollaboratorList;
