import { client } from './sanity';

export type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, email, name, username, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(name: string, username: string) {
  return client.fetch(
    `*[_type == "user" && name == "${name}"][0] {
      ...,
      "id": _id,
      following[] -> {username, image},
      followers[] -> {username, image},
      "bookmarks": bookmarks[] -> _id
    }`
  );
}
