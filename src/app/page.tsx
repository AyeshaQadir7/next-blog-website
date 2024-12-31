import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { simpleBlogCard } from "@/sanity/lib/interface";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc){
  title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage,
}`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  // console.log(data);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 my-20 gap-5">
        {data.map((post, idx) => (
          <Card
            key={idx}
            className="border-neutral-300 dark:border-neutral-800"
          >
            <Image
              src={urlFor(post.titleImage).url()}
              alt="image"
              width={500}
              height={500}
              className="rounded-t-xl h-[200px] object-cover"
            />

            <CardContent className="mt-5">
              <h2 className="text-lg line-clamp-2 font-bold">{post.title}</h2>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                {post.smallDescription}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
