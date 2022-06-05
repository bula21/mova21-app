export interface IActivity {
  id: number;
  date_updated: string;
  date_created: string;
  is_permanent: boolean;
  date: string;
  status: string;
  category: 'walk-in' | 'rover' | 'all';
  title_de: string;
  title_fr: string;
  title_it: string;
  location_de: string;
  location_fr: string;
  location_it: string;
  opening_hours_de: string;
  opening_hours_fr: string;
  opening_hours_it: string;
  description_de: string;
  description_fr: string;
  description_it: string;
}
