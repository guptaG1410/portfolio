import { About } from "@/components/about/About";
import { Achievements } from "@/components/achievements/Achievements";
import { Contact } from "@/components/contact/Contact";
import { Education } from "@/components/education/Education";
import { Engineering } from "@/components/engineering/Engineering";
import { Experience } from "@/components/experience/Experience";
import { Hero } from "@/components/hero/Hero";
import { Projects } from "@/components/projects/Projects";
import { Skills } from "@/components/skills/Skills";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Engineering />
      <Achievements />
      <Education />
      <Contact />
    </>
  );
}
