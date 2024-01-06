import { type Member, members as membersSrc } from "./members";
import { type News, news as newsSrc } from "./news";
import {
  type Publication,
  publications as publicationsSrc,
} from "./publications";
import "./global.css";

type NewsQuery = {
  slug?: string;
  year?: number;
};

export async function news(query: NewsQuery): Promise<News[]> {
  return newsSrc
    .filter((news) => (query.slug ? news.slug === query.slug : true))
    .filter((news) =>
      query.year
        ? query.year == new Date(news.frontmatter.timestamp).getUTCFullYear()
        : true,
    );
}

type MembersQuery = {
  username?: string;
};

export async function members(query: MembersQuery): Promise<Member[]> {
  return membersSrc.filter((member) =>
    query.username ? member.username === query.username : true,
  );
}

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
