export const SITE_IMAGES = {
  homeHero: {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=luxury%20modern%20residential%20estate%20in%20Lagos%2C%20warm%20golden%20hour%2C%20editorial%20real%20estate%20photography%2C%20cinematic%2C%20aspirational%2C%20high%20detail&image_size=landscape_16_9",
    alt: "Premium residential property exterior in Lagos at golden hour"
  },
  homeFounder: {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Nigerian%20female%20real%20estate%20advisor%20with%20confident%20warm%20presence%2C%20editorial%20portrait%2C%20soft%20cinematic%20lighting%2C%20luxury%20personal%20brand%20photography&image_size=portrait_4_3",
    alt: "Warm portrait of Chiamaka Sonia"
  },
  aboutFounderIntro: {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=elegant%20Nigerian%20female%20portrait%20close%20up%2C%20soft%20natural%20light%2C%20editorial%20luxury%20brand%20photography&image_size=square_hd",
    alt: "Portrait crop of Chiamaka Sonia"
  },
  aboutFounderStory: {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=warm%20editorial%20portrait%20of%20a%20Nigerian%20female%20real%20estate%20founder%2C%20soft%20natural%20light%2C%20luxury%20personal%20brand%20photography%2C%20cinematic&image_size=portrait_4_3",
    alt: "Founder portrait for the Savvy Homes story section"
  },
  servicesPropertySales: {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=beautiful%20luxury%20family%20home%20in%20Lagos%2C%20editorial%20real%20estate%20photography%2C%20warm%20light%2C%20cinematic%2C%20premium%20mood&image_size=landscape_16_9",
    alt: "Luxury family home exterior"
  },
  servicesLandSales: {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=prime%20land%20investment%20site%20in%20Nigeria%2C%20warm%20sunset%2C%20premium%20real%20estate%20landscape%20photography%2C%20cinematic%20open%20space&image_size=landscape_16_9",
    alt: "Prime land investment site"
  },
  servicesConsultation: {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=elegant%20property%20consultation%20scene%2C%20Nigerian%20real%20estate%20advisor%20with%20client%2C%20warm%20editorial%20photography%2C%20premium%20workspace&image_size=landscape_16_9",
    alt: "Property consultation setting with advisor and client"
  },
  servicesInspection: {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=property%20inspection%20scene%20inside%20a%20premium%20home%2C%20warm%20cinematic%20light%2C%20real%20estate%20editorial%20photography%2C%20high%20detail&image_size=landscape_16_9",
    alt: "Property inspection scene inside a premium home"
  },
  contactCoverage: {
    src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=modern%20Lagos%20skyline%20and%20premium%20residential%20district%2C%20warm%20cinematic%20light%2C%20luxury%20editorial%20photography&image_size=landscape_16_9",
    alt: "Lagos city and residential skyline"
  }
};

export function getSiteImage(key) {
  return SITE_IMAGES[key] ?? null;
}
