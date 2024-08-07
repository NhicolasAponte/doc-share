export const HomeRoute = {
    href: "/",
}

export const SignInRoute = {
    href: "/sign-in",
}

export const SignOutRoute = {
    href: "/sign-out",
}

export const DocumentsRoute = {
    href: "/documents",
}

export function getDocumentsRoute( roomId: string ) {
    return `${DocumentsRoute.href}/${roomId}`;
}