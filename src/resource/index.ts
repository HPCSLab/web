import { type Member, members as membersSrc } from "./members";
import {
  type Publication,
  publications as publicationsSrc,
} from "./publications";
import "./global.css";

type MembersQuery = {
  username?: string;
};

export async function members(query: MembersQuery): Promise<Member[]> {
  return membersSrc.filter((member) =>
    query.username ? member.username === query.username : true
  );
}

type PublicationQuery = {
  year?: number;
  slug?: string;
};

export async function publications(
  query: PublicationQuery
): Promise<Publication[]> {
  return publicationsSrc
    .filter((pub) => (query.year ? pub.year == query.year : true))
    .filter((pub) => (query.slug ? pub.slug == query.slug : true));
}
