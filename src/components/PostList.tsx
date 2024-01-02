"use client";

import PostListCard from "./PostListCard";
import GridSpinner from "./GridSpinner";
import usePosts from "@/hooks/usePosts";

export default function PostList() {
  const { posts, isLoading } = usePosts();

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      <ul>
        {posts &&
          posts.map((post, idx) => (
            <li key={post.id} className="mb-5">
              <PostListCard post={post} priority={idx < 2} />
            </li>
          ))}
      </ul>
    </section>
  );
}
