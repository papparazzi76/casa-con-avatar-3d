
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ValuatorLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Main Valuation Card */}
      <Card className="border overflow-hidden">
        <div className="p-6 border-b bg-muted/20">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-5 w-1/2 mt-2" />
        </div>
        
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-28 w-full rounded-lg" />
            <div className="grid grid-cols-3 gap-4 mt-2">
              <Skeleton className="h-20 rounded-md" />
              <Skeleton className="h-20 rounded-md" />
              <Skeleton className="h-20 rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Placeholder for additional cards */}
      <Card className="border overflow-hidden">
        <div className="p-4 border-b">
          <Skeleton className="h-6 w-1/2" />
        </div>
        <CardContent className="p-4">
          <Skeleton className="h-40 w-full rounded-lg" />
          <div className="space-y-3 mt-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b">
                <div>
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-32 mt-1" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
