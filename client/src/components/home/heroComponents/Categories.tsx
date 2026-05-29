import { categoriesData } from "@/types/data/Carosel.data";
import { ChevronRight } from "lucide-react";
import React from "react";

const categories = () => {
  return (
    <>
      <div className="hidden md:block col-span-3 border rounded-lg bg-white overflow-hidden">
        <ul className="py-2">
          {categoriesData.map((cat, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer text-sm font-medium"
            >
              {cat}
              <ChevronRight size={14} className="text-gray-400" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default categories;
