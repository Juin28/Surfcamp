import { getHomePage } from "@/data/loader";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ContentList } from "@/components/ContentList";
import { BlogCard } from "@/components/BlogCardClient";

async function loader() {
  const data = await getHomePage();
  if (!data) notFound();
  // console.log("Data fetched from loader:", data);

  return { ...data.data };
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data?.blocks || [];
  return (
    <div>
      <BlockRenderer blocks={blocks} />
      <div className="container">
        <ContentList
          headline="Featured Articles"
          path="api/articles"
          component={BlogCard}
          featured
        />
      </div>
    </div>
  );
}
