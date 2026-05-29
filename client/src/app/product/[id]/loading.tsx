import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* IMAGE SECTION SKELETON */}
        <div className="flex gap-4">
          <div className="flex flex-col w-24 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-md" />
            ))}
          </div>
          <div className="flex-1 aspect-[3/4]">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        </div>

        {/* INFO SECTION SKELETON */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full" />
            <div className="pt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          <div className="flex items-center gap-4 py-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>

          <div className="flex items-center gap-4 pt-6">
            <Skeleton className="h-12 w-32 rounded-lg" />
            <Skeleton className="h-12 flex-1 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
