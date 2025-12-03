import { useEffect, useState } from "react";
import { BarChart3, Filter } from "lucide-react";
import type { IFilters } from "./lib/types";
import { useTokenMutation } from "./redux/features/auth/authApi";
import { useAppDispatch } from "./redux/hooks";
import { setUser } from "./redux/features/auth/authSlice";
import { useGetSalesQuery } from "./redux/features/sales/salesApi";
import { Button } from "./components/ui/button";
import FiltersPanel from "./components/FiltersPanel";

function App() {
  const [showFilters, setShowFilters] = useState(false);

  const [tokenApi] = useTokenMutation();
  const dispatch = useAppDispatch();

  const [filters, setFilters] = useState<IFilters>({
    startDate: "2025-01-01",
    endDate: "2025-02-01",
    priceMin: "",
    email: "",
    phone: "",
    sortBy: "date",
    sortOrder: "asc",
    after: "",
    before: "",
  });
 const { data: salesData, isLoading } = useGetSalesQuery(filters);
  const handleFiltersChange = (newFilters: Partial<IFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      after: "",
      before: "",
    }));
  };

 

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await tokenApi({
          tokenType: "frontEndTest",
        }).unwrap();
        const token = res?.token;
        const expire = res?.expire;
        dispatch(setUser({ expire, token }));
      } catch (error: unknown) {
        console.error(error);
      }
    };
    getToken();
  }, [tokenApi, dispatch]);

  if (isLoading) {
    return;
  }

  return (
    <main className="min-h-screen container px-4 mx-auto bg-background">
      <div className="flex gap-5 flex-col md:flex-row justify-between py-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <BarChart3 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Sales Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Analyze your sales data with filters, charts, and detailed tables
            </p>
          </div>
        </div>
        {/*  Toggle Button  */}
        <Button onClick={() => setShowFilters(!showFilters)}>
          <Filter size={18} />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      <FiltersPanel
        showFilters={showFilters}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      ></FiltersPanel>
    </main>
  );
}

export default App;
