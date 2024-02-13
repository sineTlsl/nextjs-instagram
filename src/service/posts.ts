import { SimplePost } from '@/model/posts';
import { client, urlFor } from './sanity';

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comments": count(comments),
    "id": _id,
    "createdAt": _createdAt
`;

export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
          || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
          | order(_createdAt desc){
          ${simplePostProjection}
        }`,
    )
    .then(mapPosts);
}

export async function getPost(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0] {
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username, 
      comments[]{ 
        comment, "username": author->username, "image": author->image
      },
      "id": _id,
      "createdAt": _createdAt
    }`,
    )
    .then(post => ({ ...post, image: urlFor(post.image) }));
}

/** 사용자가 포스팅한 API */
export async function getPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc) {
        ${simplePostProjection}
      }`,
    )
    .then(mapPosts);
}

/** 사용자가 좋아요를 누른 API */
export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc) {
        ${simplePostProjection}
      }`,
    )
    .then(mapPosts);
}

/** 사용자가 저장한 포스트들 API */
export async function getSavedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
        | order(_createdAt desc){
          ${simplePostProjection}
        }`,
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

/** 포스트 좋아요 */
export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

/** 포스트 좋아요 취소 */
export async function disLikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref == "${userId}"]`])
    .commit();
}

/** 댓글 추가 */
export async function addComment(
  postId: string,
  userId: string,
  comment: string,
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: { _ref: userId, _type: 'reference' },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
