import { liveblocks } from "@/lib/liveblocks";
import { SignInRoute } from "@/lib/routes";
import { getUserColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect(SignInRoute.href);
  }

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  // Get the current user from your database
  const user = {
    id: id,
    info: {
      id: id,
      email: emailAddresses[0].emailAddress,
      name: `${firstName} ${lastName}`,
      avatar: imageUrl,
      color: getUserColor(id), //"#FF0000",
    },
  };

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.email,
      groupIds: [], // Optional
    },
    { userInfo: user.info }
  );

  return new Response(body, { status });
}
