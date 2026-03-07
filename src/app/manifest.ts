import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "lateowl",
    short_name: "lateowl",
    description: "lateowl - Your Flashcard Learning App",
    start_url: "/",
    display: "standalone",
    display_override: ["standalone"],
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait",
    scope: "/",
    lang: "en",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
