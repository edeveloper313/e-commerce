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
import { heroProducts } from "@/types/data/Carosel.data";

import Link from "next/link";
import Image from "next/image";

const RightSideBar = () => {
  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    [],
  );
  return (
    <>
      <div className="col-span-12 md:col-span-9 h-full">
        <Carousel
          plugins={[plugin]}
          opts={{ loop: true }}
          className="w-full h-full rounded-lg overflow-hidden"
          onMouseEnter={() => plugin.stop?.()}
          onMouseLeave={() => plugin.play?.()}
        >
          <CarouselContent>
            {heroProducts.map((product) => (
              <CarouselItem key={product.id}>
                <div className="relative h-[400px] w-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay Text */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-12 text-white">
                    <h2 className="text-4xl font-bold mb-2">{product.title}</h2>
                    <p className="text-xl mb-6">{product.subTitle}</p>
                    <Link 
                      href={product.link}
                      className="bg-white text-black px-8 py-3 rounded-full w-fit font-bold hover:bg-gray-200 transition-colors shadow-lg"
                    >
                      Shop Now
                    </Link>
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
