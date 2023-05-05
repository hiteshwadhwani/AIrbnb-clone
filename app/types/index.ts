import {User} from '@prisma/client'

export type SafeUser = Omit<User, "emailverified" | "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
    emailverified: string | null
}