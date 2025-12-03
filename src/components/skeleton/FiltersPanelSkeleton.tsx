import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FiltersPanelSkeleton = () => {
  return (
    <Card className="mb-10">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-5 w-24" />
        </CardTitle>
        <Skeleton className="h-8 w-20" />
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default FiltersPanelSkeleton;
