import { getDocumentsRoute } from "@/lib/routes";
import { dateConverter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteWarningModal from "./DeleteWarningModal";

interface DocumentsListProps {
  docs: any[];
}

const DocumentsList = ({ docs }: DocumentsListProps) => {
  return (
    <ul className="document-ul">
      {docs.map(({ id, metadata, createdAt }) => (
        <li key={id} className="document-list-item">
          <Link
            href={getDocumentsRoute(id)}
            className="flex flex-1 items-center gap-4"
          >
            <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
              <Image
                src={"/assets/icons/doc.svg"}
                alt="file"
                width={40}
                height={40}
              />
            </div>
            <div className="space-y-1">
              <p className="line-clamp-1">{metadata.title}</p>
              <p className="text=sm font-light text-blue-100">
                Last used: {dateConverter(createdAt)}
              </p>
            </div>
          </Link>
          
          <DeleteWarningModal roomId={id} />
        </li>
      ))}
    </ul>
  );
};

export default DocumentsList;
