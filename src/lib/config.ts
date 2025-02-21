export const navigation = {
  legal: [
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'DMCA', href: '/dmca' },
    { name: 'Terms of Service', href: '/termsofservice' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  quickMenu: [
    { name: 'Abgerny Incredibox', href: 'abgerny-incredibox' },
    { name: 'Sprunki Phase', href: 'phase' },
    { name: 'Sprunki Retake', href: 'sprunki-retake' },
    { name: 'Sprunki Rejoyed', href: 'sprunki-rejoyed' },
    { name: 'Sprunki Phase 0', href: 'sprunki-phase-0' },
    { name: 'Sprunki Phase 1', href: 'sprunki-phase-1' },
    { name: 'Sprunki Phase 2', href: 'sprunki-phase-2' },
    { name: 'Sprunki Phase 3', href: 'sprunki-phase-3' },
    { name: 'Sprunki Phase 4', href: 'sprunki-phase-4' },
    { name: 'Sprunki Phase 5', href: 'sprunki-phase-5' },
    { name: 'Sprunki Phase 6', href: 'sprunki-phase-6' },
    { name: 'Sprunki Phase 7', href: 'sprunki-phase-7' },
    { name: 'Sprunki Phase 8', href: 'sprunki-phase-8' },
    { name: 'fisch script', href: 'https://fischzone.com/fisch-script' },
    { name: 'Sprunki Phase 9', href: 'sprunki-phase-9' },
    { name: 'Sprunki Phase 10', href: 'sprunki-phase-10' },
    { name: 'Sprunki Phase 11', href: 'sprunki-phase-11' },
    { name: 'Sprunki Phase 12', href: 'sprunki-phase-12' },
    { name: 'fisch', href: 'https://fischzone.com' },
    { name: 'Sprunki Phase 13', href: 'sprunki-phase-13' },
    { name: 'Sprunki Mastered', href: 'sprunki-mastered' },
    { name: 'Sprunki X Rejecz', href: 'sprunki-x-rejecz' },
    { name: 'Jujutsu infinite', href: 'hhttp://jujutsuinfinite.im' },
    { name: 'Incredibox Mustard', href: 'incredibox-mustard' },
    { name: 'Incredibox V1', href: 'incredibox-v1' },
    { name: 'Incredibox V2', href: 'incredibox-v2' },
    { name: 'Incredibox V3', href: 'incredibox-v3' },
    { name: 'fisch codes', href: 'https://fischzone.com/fisch-codes' },
    { name: 'Incredibox V4', href: 'incredibox-v4' },
    { name: 'Incredibox V5', href: 'incredibox-v5' },
    { name: 'Incredibox V6', href: 'incredibox-v6' },
    { name: 'Incredibox V7', href: 'incredibox-v7' },
    { name: 'Incredibox V8', href: 'incredibox-v8' },
    { name: 'Sprunki Christmas Modded', href: 'sprunki-christmas-modded' },
    { name: 'Sprunki But Its Christmas', href: 'sprunki-but-its-christmas' },
    
    // { name: 'Cookie Clicker Unblocked', href: 'https://cookieclickerunblocked.site' },
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
