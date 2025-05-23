
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PropertyGrid } from "../PropertyGrid";
import { searchProperties } from "@/services/property";
import { PropertySearchLoading } from "./PropertySearchLoading";
import { PropertySearchError } from "./PropertySearchError";
import { PropertySearchEmpty } from "./PropertySearchEmpty";

export function PropertySearchResults() {
  const [searchParams] = useSearchParams();
  
  // Build search parameters for the query
  const queryParams: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });
  
  // Perform the search using the service
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["properties", queryParams],
    queryFn: async () => {
      try {
        console.log("Executing property search with parameters:", queryParams);
        const result = await searchProperties(queryParams);
        console.log(`Search result: ${result?.length || 0} properties`);
        return result;
      } catch (err) {
        console.error("Error in property search:", err);
        throw err;
      }
    },
  });
  
  if (isLoading) {
    return <PropertySearchLoading />;
  }

  if (error) {
    console.error("Error displayed to user:", error);
    return <PropertySearchError onRetry={() => {}} />;
  }

  if (!properties || properties.length === 0) {
    return <PropertySearchEmpty />;
  }

  return <PropertyGrid properties={properties} />;
}
