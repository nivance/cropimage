
export const navigation = {
  legal: [
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Terms of Service', href: '/termsofservice' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  convertMenu: [
    { name: 'Convert webp to jpg', href: '/convert-webp-to-jpg' },
    { name: 'Convert heic to jpg', href: '/convert-heic-to-jpg' },
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
      support_formates: process.env.SUPPORT_FORMATES || "JPG, JPEG, PNG, BMP, GIF, WEBP",
    };
};
  
export const config = buildConfig();
