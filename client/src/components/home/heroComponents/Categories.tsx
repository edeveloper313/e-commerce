import { categoriesData } from "@/types/data/Carosel.data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const categories = () => {
  return (
    <>
      <div className="hidden md:block col-span-3 border rounded-lg bg-white overflow-hidden">
        <ul className="py-2">
          {categoriesData.map((cat, index) => (
            <Link
              key={index}
              href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`} // Space ko dash (-) se badal diya
              className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer text-sm font-medium"
            >
              {cat}
              <ChevronRight size={14} className="text-gray-400" />
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default categories;
