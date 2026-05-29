import CategoryShowcase from "@/components/home/categorytShowCase/CategorysShowCase";
import Featured from "@/components/home/featured/Featured";
import Hero from "@/components/home/Hero";

export default function page() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <Featured/>
    </>
  );
}
