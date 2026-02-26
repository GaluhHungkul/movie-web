import { DefaultUser } from "next-auth"

export type UserFE = DefaultUser & {
    isSubscribe?: boolean;
    subscribePlanTitle?: string | "Basic Plan" | "Standard Plan" | "Premium Plan" | undefined | null
} | null
