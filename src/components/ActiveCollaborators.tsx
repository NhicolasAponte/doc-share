import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";
import React from "react";

const ActiveCollaborators = () => {
  const others = useOthers();
  const collaborators = others.map((other) => {
    return other.info;
  });

  return (
    <ul>
      {collaborators.map((collaborator) => (
        <li key={collaborator.id}>
          <Image
            src={collaborator.avatar}
            alt={collaborator.name}
            width={24}
            height={24}
            className="inline-block size-8 rounded-full ring-2 ring-dark-100"
            style={{ border: `3px solid ${collaborator.color}` }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ActiveCollaborators;
