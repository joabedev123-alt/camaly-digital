import { Link } from "react-router-dom";
import { Section, SectionHeader } from "@/components/system/Section";
import { Stagger, StaggerItem } from "@/components/system/Reveal";
import { Icon } from "@/components/system/Icon";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export const RelatedProjects = ({
  projects,
  eyebrow = "Projetos relacionados",
  title = ["Trabalhos reais", "nesse formato."],
  tone = "soft",
}: {
  projects: Project[];
  eyebrow?: string;
  title?: string[];
  tone?: "base" | "soft";
}) => {
  if (!projects.length) return null;
  return (
    <Section tone={tone}>
      <SectionHeader
        align="split"
        eyebrow={eyebrow}
        title={title}
        action={
          <Link to="/portfolio" className="link-arrow">
            Ver todo o portfólio <Icon name="arrow-right" />
          </Link>
        }
      />
      <Stagger className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <StaggerItem key={p.slug}>
            <ProjectCard project={p} compact />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
};
