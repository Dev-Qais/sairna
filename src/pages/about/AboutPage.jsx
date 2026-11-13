import AboutHero from "./components/AboutHero";
import AboutStory from "./components/AboutStory";

function AboutPage() {
  return (
    <main className="w-full bg-[var(--bg)]">
      <AboutHero />
      <AboutStory />
    </main>
  );
}

export default AboutPage;
