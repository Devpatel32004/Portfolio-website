import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { VaultSection } from "@/components/sections/vault-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ExtrasSection } from "@/components/sections/extras-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/sections/footer";
import { LoadingScreen } from "@/components/loading-screen";

export default function Home() {
  return (
    <LoadingScreen>
      <div className="bg-[#08080b]">
        <ScrollProgress />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <VaultSection />
          <SkillsSection />
          <TestimonialsSection />
          <ExtrasSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LoadingScreen>
  );
}
