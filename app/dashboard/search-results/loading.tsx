import { ProductBoxSkeleton } from "@/app/ui/skeletons";

export default function Loading() {
  return (
    <div className="flex gap-6 mt-8 justify-center w-full">
      <ProductBoxSkeleton />
      <ProductBoxSkeleton />
    </div>
  );
}
