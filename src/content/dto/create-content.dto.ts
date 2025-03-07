enum ContentType {
  MOVIE = 'MOVIE',
  SERIES = 'SERIES',
  DOCUMENTARY = 'DOCUMENTARY',
  OTHER = 'OTHER',
}

export class CreateContentDto {
  title: string;
  release_year: string;
  description: string;
  duration: number;
  trailer_url: string;
  average_rating: number;
  is_available: boolean;
  country_of_origin: number;
  content_type: ContentType;
}
