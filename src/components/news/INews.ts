export interface INews {
  id: number;
  date: string | null;
  language: string;
  title: string;
  content: string;
  excerpt: string;
  excerptNonTransparent?: string;
  color?: string;
  image: {
    // there are more fields here, these are just the ones we might use
    id: number;
    width: number;
    height: number;
    filename_disk: string;
  } | null;
  isMeteo: boolean;
}
