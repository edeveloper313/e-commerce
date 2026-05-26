import Categories from "@/components/home/heroComponents/Categories";
import RightSideBar from "./heroComponents/RightSideBar";
export default function Hero() {
  return (
    <section className="container mx-auto mt-4 px-4">
      <div className="grid grid-cols-12 gap-4 h-[400px]">
      {/* LEFT SIDE: Category Menu (Visible on Desktop) */}
        <Categories />
        {/* RIGHT SIDE: Carousel (New Products) */}
        <RightSideBar />
      </div>
    </section>
  );
}
