import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  // "as string" ya fallback || "" dena behtar hai
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID , 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ,
  apiVersion: "2024-01-01",
  useCdn: true, // CDN use karne se request fast hoti hai
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);