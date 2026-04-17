import {
  RemixiconComponentType,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiMailLine,
  RiTwitterFill
} from "@remixicon/react";

export type SocialDetails = {
  name: string;
  logo?: RemixiconComponentType;
  baseUrl?: string;
  personalUrl?: string;
};

export const SOCIAL_DATA: Record<string, SocialDetails> = {
  'github': {
    name: 'GitHub',
    logo: RiGithubFill,
    baseUrl: "https://github.com/",
    personalUrl: "https://github.com/puzzlesremixed"
  },
  'linkedin': {
    name: 'LinkedIn',
    logo: RiLinkedinBoxFill,
    baseUrl: "https://linkedin.com/",
    personalUrl: "https://linkedin.com/in/vanamira/"
  },
  'twitter': {
    name: 'Twitter',
    logo: RiTwitterFill,
    baseUrl: "https://twitter.com/",
    personalUrl: "https://twitter.com/puzzlesremixed"
  },
  'instagram': {
    name: 'Instagram',
    logo: RiInstagramFill,
    baseUrl: "https://instagram.com/",
    personalUrl: "https://instagram.com/puzzlesremixed"
  },
  'email': {
    name: 'E-mail',
    logo: RiMailLine,
    personalUrl: "mailto:puzzlesremixed@proton.me"
  },
};
