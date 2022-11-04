import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

// ...
export default function Posts() {
  const { posts } = useLoaderData() as unknown as LoaderData;
  return (
    <main className="flex w-screen flex-col items-center justify-center rounded border bg-gray-400 text-white">
      <h1 className="text-lg">Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="admin" className="p-5 text-red-600 underline">
        Admin
      </Link>
    </main>
  );
}
