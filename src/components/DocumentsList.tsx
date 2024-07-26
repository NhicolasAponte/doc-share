import { getDocumentsRoute } from "@/lib/routes";
import Link from "next/link";
import React from "react";

interface DocumentsListProps {
  docs: any[];
}

const DocumentsList = ({ docs }: DocumentsListProps) => {
  return (
    <ul>
      {docs.map((doc) => (
        <li key={doc.id}>
          <Link href={getDocumentsRoute(doc.id)}>
            <div className="border p-4">
              <h2>{doc.metadata.title}</h2>
              <p>{doc.metadata.email}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DocumentsList;
