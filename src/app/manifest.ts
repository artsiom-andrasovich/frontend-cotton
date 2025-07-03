import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cotton",
    short_name: "Cotton",
    description: "Cotton - Your Flashcard Learning App",
    start_url: "/auth/sign-in",
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
        purpose: "any",
        sizes: "576x576",
        src: "maskable_icon.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "48x48",
        src: "maskable_icon_x48.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "72x72",
        src: "maskable_icon_x72.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "96x96",
        src: "maskable_icon_x96.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "128x128",
        src: "maskable_icon_x128.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "192x192",
        src: "maskable_icon_x192.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "384x384",
        src: "maskable_icon_x384.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "maskable_icon_x512.png",
        type: "image/png",
      },
    ],
  };
}
