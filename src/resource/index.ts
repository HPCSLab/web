import { type Member, members as membersSrc } from "./members";
import { type News, news as newsSrc } from "./news";
import {
  type Publication,
  publications as publicationsSrc,
} from "./publications";

type NewsQuery = {
  slug?: string;
};

export async function news(query: NewsQuery): Promise<News[]> {
  if (query.slug) {
    const found = newsSrc.find((news) => news.slug === query.slug);
    return found ? [found] : [];
  } else {
    return newsSrc;
  }
}

type MembersQuery = {
  username?: string;
};

export async function members(query: MembersQuery): Promise<Member[]> {
  if (query.username) {
    const found = membersSrc.find(
      (member) => member.username === query.username,
    );
    return found ? [found] : [];
  } else {
    return membersSrc;
  }
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
