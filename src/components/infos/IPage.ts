export interface IPage {
  id: number;
  title: string;
  content: string;
  renderer: string | null;
  data: any;
  list_color: string;
  sub_page: boolean;
}
