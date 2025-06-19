"use server";
import { z } from "zod";
import { subscribeService } from "./services";

const subscribeSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function subscribeAction(prevState: any, formData: FormData) {
    console.log("Our first server action");
    const email = formData.get("email");

    const validatedFields = subscribeSchema.safeParse({
        email: email,
    });

    if (!validatedFields.success) {
        console.dir(validatedFields.error.flatten().fieldErrors, { depth: null });

        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            strapiErrors: null,
        }
    }

    // If validation passes, proceed with the subscription service by hitting the API
    const responseData = await subscribeService(validatedFields.data.email);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            errorMessage: "Oops! Something went wrong, please try again later.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            errorMessage: "Failed to subscribe, please try again later.",
        }
    }

    return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        errorMessage: null,
        successMessage: "Successfully subscribed!",
    }

    console.log(email, "Our email input from form")
}