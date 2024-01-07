import { HomeUser } from "@/model/user";
import useSWR from "swr";

async function updateBookmark(postId: string, bookmark: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then(res => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/me");

  const setBookmark = (postId: string, bookmark: boolean) => {
    if (!user) return;
    const bookmarks = user?.bookmarks ?? [];
    const newUser = {
      ...user,
      bookmarks: bookmark
        ? [...bookmarks, postId]
        : bookmarks.filter(b => b !== postId),
    };

    return mutate(updateBookmark(postId, bookmark), {
      optimisticData: newUser, // 즉각적으로 UI를 업데이트 되도록
      populateCache: false,
      revalidate: false,
      rollbackOnError: true, // 네트워크상 문제가 생겨 백엔드에 업데이트가 안되었다면 에러 true
    });
  };

  return { user, isLoading, error, setBookmark };
}
