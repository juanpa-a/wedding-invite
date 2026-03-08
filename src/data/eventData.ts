import yaml from "yaml";
import esSource from "./event.yml?raw";
import enSource from "./event.en.yml?raw";
import ptSource from "./event.pt.yml?raw";

export interface HeroContent {
  tagline: string;
  title: string;
  description: string;
  weekday: string;
  dateDisplay: string;
  location: string;
}

export interface StoryContent {
  chapterLabel: string;
  heading: string;
  body: string;
  imageAsset?: string;
  imageAlt: string;
  highlights: string[];
}

export interface ExpandableSection {
  title: string;
  items: string[];
}

export interface ExpandableDetail {
  text: string;
  sections: ExpandableSection[];
}

export type ScheduleDetail = string | ExpandableDetail;

export interface ScheduleEvent {
  number: string;
  label: string;
  title: string;
  description: string;
  details: ScheduleDetail[];
}

export interface ScheduleContent {
  eyebrow: string;
  title: string;
  description: string;
  events: ScheduleEvent[];
}

export interface CardContent {
  imageAlt?: string;
  title: string;
  description?: string;
  href?: string;
}

export interface GalleryImage {
  asset: string;
  alt: string;
}

export interface GalleryContent {
  eyebrow: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

export interface FavoritePlace {
  name: string;
  favoriteDe: "vale" | "juanpa";
  description?: string;
  recommendedDish?: string;
  instagram?: string;
}

export interface FavoriteCategory {
  id: string;
  label: string;
  places: FavoritePlace[];
}

export interface FavoritesContent {
  title: string;
  description: string;
  categories: FavoriteCategory[];
}

export interface CountdownContent {
  label: string;
  heading: string;
  message: string;
  target: string;
  location: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface LodgingPlace {
  name: string;
  badge?: string;
  description: string;
  address: string;
  website?: string;
  phone?: string;
  priceRange: string;
  note?: string;
  highlight?: boolean;
}

export interface LodgingContent {
  title: string;
  description: string;
  places: LodgingPlace[];
}

export interface EventContent {
  hero: HeroContent;
  story: StoryContent;
  schedule: ScheduleContent;
  gallery: GalleryContent;
  cards: CardContent[];
  favorites: FavoritesContent;
  lodging: LodgingContent;
  countdown: CountdownContent;
}

const sources: Record<string, string> = { es: esSource, en: enSource, pt: ptSource };
const parsed: Partial<Record<string, EventContent>> = {};

export function getEventData(locale: "es" | "en" | "pt" = "es"): EventContent {
  if (!parsed[locale]) {
    parsed[locale] = yaml.parse(sources[locale]) as EventContent;
  }
  return parsed[locale]!;
}
