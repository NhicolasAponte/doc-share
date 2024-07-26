import AddDocumentButton from "@/components/AddDocumentButton";
import DocumentsList from "@/components/DocumentsList";
import Header from "@/components/Header";
import { SignInRoute } from "@/lib/routes";
import { getAllDocumentsByUserId } from "@/lib/server-actions/room.actions";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

// flex items-center gap-2 lg:gap-4
export default async function Home() {
  const user = await currentUser();
  if(!user) { redirect(SignInRoute.href) }
  //console.log('user', user)

  const documents = await getAllDocumentsByUserId(user.emailAddresses[0].emailAddress);
  return (
    <main className="home-container">
      <Header className="sticky let-0 top-0">
        <div className="">
          Notification
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      {documents.length > 0 ? (
        <div>
          <DocumentsList docs={documents}/>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumentButton email={user.emailAddresses[0].emailAddress} userId={user.id}/>
        </div>
      )}
    </main>
  );
}
