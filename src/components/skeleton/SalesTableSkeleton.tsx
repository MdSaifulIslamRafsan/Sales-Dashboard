import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SalesTableSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-36" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <div className="grid grid-cols-5 border-b p-3">
            {[...Array(5)].map((_, idx) => (
              <Skeleton key={idx} className="h-4 w-20" />
            ))}
          </div>

          <div>
            {[...Array(7)].map((_, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-5 p-3 border-b items-center"
              >
                {[...Array(5)].map((_, colIdx) => (
                  <Skeleton key={colIdx} className="h-4 w-24" />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  );
};
export default SalesTableSkeleton;
