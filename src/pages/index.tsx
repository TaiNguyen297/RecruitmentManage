import { HomeContent } from "@/components/features/home";
import { SEO } from "@/configs/seo.config";
import { DefaultSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <DefaultSeo {...SEO} />
      <HomeContent />
    </>
  );
}
