import { cropImage } from "./utils/imageUtils";

export const navigation = {
  legal: [
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'DMCA', href: '/dmca' },
    { name: 'Terms of Service', href: '/termsofservice' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  cropImageMeun: [
    { name: 'Crop image circle', href: '/crop-image-circle' },
    { name: 'Crop image heart', href: '/crop-image-heart' },
    { name: 'Crop image square', href: '/crop-image-square' },
    { name: 'Crop image creative', href: '/crop-image-creative' },
  ],
  convertMenu: [
    { name: 'Convert webp to jpg', href: '/convert-webo-to-jpg' },
    { name: 'Convert webp to png', href: '/convert-webp-to-png' },
    { name: 'Convert svg to png', href: '/convert-svg-to-png' },
    { name: 'Convert jpg to webp', href: '/convert-jpg-to-webp' },
  ],
};



const buildConfig = () => {
    // const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
    return {
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      googleId: process.env.NEXT_PUBLIC_GOOGLE_ID || "",
      limit: process.env.NEXT_PUBLIC_PAGE_LIMIT || 30,
      r2AccountId: process.env.R2_ACCOUNT_ID || "",
      r2AccessKeyId: process.env.R2_ACCESS_KEY_ID || "",
      r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
      r2AuthToken: process.env.R2_AUTH_TOKEN || "",
    };
};
  
export const config = buildConfig();
