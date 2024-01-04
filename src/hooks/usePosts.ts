import { SimplePost } from "@/model/posts";
import useSWR, { useSWRConfig } from "swr";

async function updateLike(id: string, like: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then(res => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>("/api/posts");

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter(item => item !== username),
    };
    const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts, // 즉각적으로 UI를 업데이트 되도록
      populateCache: false,
      revalidate: false,
      rollbackOnError: true, // 네트워크상 문제가 생겨 백엔드에 업데이트가 안되었다면 에러 true
    });
  };

  return { posts, isLoading, error, setLike };
}
