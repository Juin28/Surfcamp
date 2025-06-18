import { getHomePage } from "@/data/loader";
import { notFound } from "next/navigation";
import { BlockRenderer } from "@/components/BlockRenderer";

async function loader() {
  const data = await getHomePage();
  if (!data) notFound();
  console.log("Data fetched from loader:", data);

  return { ...data.data };
}

export default async function HomeRoute() {
  const data = await loader();
  const blocks = data?.blocks || [];
  console.log("Data loaded:", data);
  console.log("Blocks:", blocks[0]);
  return <BlockRenderer blocks={blocks} />;
}
