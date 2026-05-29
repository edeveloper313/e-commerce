import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      <Skeleton className="h-10 w-64 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-64 w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex justify-between items-center mt-4">
               <Skeleton className="h-6 w-16" />
               <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-full mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
