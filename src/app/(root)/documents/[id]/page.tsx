import CollaborativeRoom from "@/components/CollaborativeRoom";
import { HomeRoute, SignInRoute } from "@/lib/routes";
import { getDocument } from "@/lib/server-actions/room.actions";
import { getClerkUsers } from "@/lib/server-actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Document({ params: {id}}: SearchParamProps) {
    // get current user from clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
        // redirect if user is not authenticated
        redirect(SignInRoute.href)
    }
    // get document from liveblocks
    const doc = await getDocument({ roomId: id, userId: clerkUser.emailAddresses[0].emailAddress });
    // redirect if document does not exist
    if(!doc) redirect(HomeRoute.href);

    // create an array of user ids from the usersAccesses object: { [user id]: [permissions] }
    // NOTE: this seems like a good way to keep the user permissions dynamic 
    const userIds = Object.keys(doc.usersAccesses)
    // console.log('xxxx userIds xxxx');
    // console.log(userIds);
    // // get user data for all the users in the document 
    const users = await getClerkUsers({ userIds })
    // console.log('xxxx clerk users xxxx', users);
    const usersData = users.map((user: User) => ({
        ...user,
        userType: doc.usersAccesses[user.email]?.includes('room:write') ? 'editor' : 'viewer'
    }))

    const currentUserType = doc.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer'

    return (
        <main className="flex flex-col w-full items-center"> 
            <CollaborativeRoom roomId={id} roomMetadata={doc.metadata} users={usersData} currentUserType={currentUserType}/>
        </main>
    )
}