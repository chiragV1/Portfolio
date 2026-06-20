import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import PageTracker from "@/components/ui/PageTracker";
import { connectDB } from "@/lib/mongodb";
import PortfolioData, { IExperienceEntry, IEducationEntry, ISkillCategory, IProfile } from "@/lib/models/PortfolioData";

async function getPortfolioData() {
  try {
    await connectDB();
    const data = await PortfolioData.findOne().lean();
    return data ?? null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const portfolio = await getPortfolioData();

  const experience = portfolio?.experience as IExperienceEntry[] | undefined;
  const education = portfolio?.education as IEducationEntry[] | undefined;
  const skills = portfolio?.skills as ISkillCategory[] | undefined;
  const profile = portfolio?.profile as IProfile | undefined;

  return (
    <>
      <CursorGlow />
      <PageTracker />
      <Navbar />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Services />
        <Projects />
        <Experience experience={experience} education={education} />
        <Skills skills={skills} />
        <Testimonials />
        <Contact />
      </main>
      <Footer profile={profile} />
    </>
  );
}
