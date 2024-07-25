import CollaborativeRoom from "@/components/CollaborativeRoom";
import { HomeRoute, SignInRoute } from "@/lib/routes";
import { getDocument } from "@/lib/server-actions/room.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Document({ params: {id}}: SearchParamProps) {
    const user = await currentUser();
    if (!user) {
        redirect(SignInRoute.href)
    }
    const doc = await getDocument({ roomId: id, userId: user.emailAddresses[0].emailAddress });

    if(!doc) redirect(HomeRoute.href);

    //NOTE TODO: check user permissions
    return (
        <main className="flex flex-col w-full items-center"> 
            <CollaborativeRoom roomId={id} roomMetadata={doc.metadata}/>
        </main>
    )
}