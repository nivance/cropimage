import { config } from "@/lib/config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${config.baseUrl}/sitemap.xml`,
  }
}
