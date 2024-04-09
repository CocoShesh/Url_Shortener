import { z } from "zod";
import { generateShortLink } from "../Api/Shortener";

export const UserInputSchema = z.object({
  long_url: z
    .string()
    .nonempty("Please enter a valid URL")
    .refine(async value => {
      // Check if the URL matches the pattern of a shortened URL
      const isShortenedUrl = value.match(/^https?:\/\/t\.ly\/[a-zA-Z0-9]+$/);
      if (isShortenedUrl) {
        throw new Error("This URL has already been shortened.");
      }

      return true;
    }, "Please enter a valid URL."),
});
