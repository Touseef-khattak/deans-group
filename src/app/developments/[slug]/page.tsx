import { notFound } from "next/navigation";
import TopUtilityBar from "@/components/sections/TopUtilityBar";
import MainNav from "@/components/sections/MainNav";
import Footer from "@/components/sections/Footer";
import SectorPanel from "@/components/sections/SectorPanel";
import ProjectGalleryHero from "@/components/sections/developments/ProjectGalleryHero";
import ProjectStats from "@/components/sections/developments/ProjectStats";
import { PROJECT_DETAILS, getProjectDetail } from "@/lib/projectDetails";

export function generateStaticParams() {
  return PROJECT_DETAILS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectDetail(slug);
  if (!project) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <TopUtilityBar />
      <MainNav />
      <ProjectGalleryHero project={project} />
      <ProjectStats project={project} />
      <SectorPanel
        number="01"
        tag="Overview"
        title="A closer look"
        description={project.story.paragraph}
        image={project.story.image}
        imageAlt={project.story.imageAlt}
      />
      <Footer />
    </main>
  );
}
