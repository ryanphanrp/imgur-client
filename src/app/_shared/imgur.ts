export interface Image {
  id: string;
  title: string;
  description: string;
  datetime: number;
  type: string;
  animated: boolean;
  width: number;
  height: number;
  size: number;
  views: number;
  bandwidth: number;
  deletehash: string;
  name: string;
  section: string;
  link: string;
  gifv: string;
  mp4: string;
  mp4_size: number;
  looping: boolean;
  favorite: boolean;
  nsfw: boolean;
  vote: string;
  in_gallery: boolean;
}

export interface IProgress {
  preview: string;
  title: string;
  percentage: number;
  show: boolean;
  status: string;
}

export interface IAlbum {
  id: string;
  title: string;
  description: string;
  cover: string;
  nsfw: boolean;
  images_count: number;
  privacy: boolean;
  images?: Image[];
}