import Comments from "@/components/Comments/Comments";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { fullBlog } from "@/sanity/lib/interface";
import { PortableText } from "next-sanity";
import { BlogArticleProps } from "@/sanity/lib/interface";
import Image from "next/image";

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}' ]{
  "currentSlug": slug.current,
    title,
    content,
    titleImage
}[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({ params }: BlogArticleProps) {
  const data: fullBlog = await getData(params.slug);
  console.log(data);
  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Ayesha Abdul Qadir - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-semibold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt={data.title}
        priority
        className="rounded-lg mt-8 border-slate-950 "
      />

      <div className=" my-10 prose prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText
          value={data.content}
          components={{
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc ml-6">{children}</ul>
              ),
              number: ({ children }) => (
                <ol className="list-decimal ml-6">{children}</ol>
              ),
            },
            listItem: {
              bullet: ({ children }) => <li className="mb-2">{children}</li>,
            },
          }}
        />
      </div>

      <Comments postId={params.slug} />
    </div>
  );
}
