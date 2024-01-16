import {
  type Publication,
  publications as publicationsSrc,
} from "./publications";
import "./global.css";

type PublicationQuery = {
  year?: number;
  slug?: string;
};

export async function publications(
  query: PublicationQuery,
): Promise<Publication[]> {
  return publicationsSrc
    .filter((pub) => (query.year ? pub.year == query.year : true))
    .filter((pub) => (query.slug ? pub.slug == query.slug : true));
}
