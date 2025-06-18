// interface PageProps {
//   params: { slug: string };
// }

// export default async function DynamicPageRoute({ params }: PageProps) {
//   const slug = params.slug;

//   return (
//     <div>
//       <h1>Slug: {slug}</h1>
//     </div>
//   );
// }

import { getPageBySlug } from "@/data/loader";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  params: Promise<{ slug: string }>
}


export default async function DynamicPageRoute({ params }: PageProps) {
  const slug = (await params).slug;
  const { blocks } = await loader(slug);
  return <BlockRenderer blocks={blocks} />;
}