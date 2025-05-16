import { create } from "zustand";
import { authClient } from "src/lib/auth-client";
import { selectUserModel } from '@client-portal/db'
import { Session, User } from "better-auth/types";

type UserStore = {
    user: selectUserModel | User | null,
    session: Session | null,
    getUserSession: () => Promise<{ user: User, session: Session }>,
    logout: () => void,
    emailLogin: (email: string, password: string) => Promise<{ user: User | null, session: Session | null, }>,
    socialGoogleLogin: () => Promise<void>,
    emailSignup: ({ name, email, password, phoneNumber }
        : { name: string, email: string, password: string, phoneNumber: string }) => Promise<void>,
}
export const userStore = create<UserStore>((set, get) => ({
    user: null,
    session: null,
    getUserSession: async () => {
        const { data } = await authClient.getSession()
        set({ user: data?.user, session: data?.session })
        return { user: data?.user as User, session: data?.session as Session }
    },
    logout: async () => {

        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    console.log("logged out successfully")
                    set({ user: null, session: null })
                },
                onError: (ctx) => {
                    console.log("failed to logout user")
                    console.log(ctx.error.message)
                    get().getUserSession()
                }

            }
        })
    },

    emailSignup: async ({ name, email, password, phoneNumber }) => {
        await authClient.signUp.email({
            email: email,
            password: password,
            name: name,
            phoneNumber: phoneNumber,
        }, {
            onError(ctx) {
                console.log('error happened');
                console.log(ctx);
            },
            onSuccess() {
                console.log("successful signup")
            },
        })
    },

    emailLogin: async (email: string, password: string) => {

        const { error } = await authClient.signIn.email({
            email: email,
            password: password,
        }, {
            onError(ctx) {
                console.log('successful login');
                console.log(ctx);
            },
            onSuccess: () => {
                console.log("successful login")
            },
        })
        if (error) {
            return { user: null, session: null }
        }
        await get().getUserSession()
        return { user: get().user, session: get().session }
    },
    socialGoogleLogin: async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: import.meta.env.VITE_FRONTEND_URL
        },
            {
                onError: (ctx) => {
                    console.log(ctx.error.message)
                    return;
                }
            })
        console.log(data)
    },
}))
