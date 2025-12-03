import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SalesDashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="flex items-center gap-4 py-8 px-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
        </Card>
      ))}
    </div>
  );
}
export default SalesDashboardSkeleton;