"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";
import { heroProducts } from "@/types/data/CaroselData";

const RightSideBar = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );

  return (
    <>
      <div className="col-span-12 md:col-span-9 h-full">
        <Carousel
          plugins={[plugin.current]}
          opts={{ loop: true }}
          className="w-full h-full rounded-lg overflow-hidden"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.play}
        >
          <CarouselContent>
            {heroProducts.map((product) => (
              <CarouselItem key={product.id}>
                <div className="relative h-[400px] w-full">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                  {/* Overlay Text */}
                  <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-12 text-white">
                    <h2 className="text-4xl font-bold mb-2">{product.title}</h2>
                    <p className="text-xl mb-4">{product.subTitle}</p>
                    <button className="bg-white text-black px-6 py-2 rounded-md w-fit font-semibold">
                      Shop Now
                    </button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Carousel Buttons */}
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </>
  );
};

export default RightSideBar;
