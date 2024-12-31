import Comments from "@/components/Comments/Comments";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { fullBlog } from "@/sanity/lib/interface";
import { PortableText } from "next-sanity";
import Image from "next/image";

// Function to fetch data based on the slug
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

// Page component receiving the params as a Promise type
export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params and extract the slug
  const { slug } = await params;

  // Fetch the data based on the slug
  const data: fullBlog = await getData(slug);

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

      <div className="my-10 prose prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
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

      <Comments postId={""} />
    </div>
  );
}
