import { useCallback, useEffect, useState } from "react";
import { BarChart3, Filter } from "lucide-react";
import type { IFilters } from "./lib/types";
import { useTokenMutation } from "./redux/features/auth/authApi";
import { useAppDispatch } from "./redux/hooks";
import { setUser } from "./redux/features/auth/authSlice";
import { useGetSalesQuery } from "./redux/features/sales/salesApi";
import { Button } from "./components/ui/button";
import FiltersPanel from "./components/FiltersPanel";
import SalesDashboard from "./components/SalesDashboard";
import SalesChart from "./components/SalesChart";
import SalesTable from "./components/SalesTable";

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

  const handleFiltersChange = useCallback((newFilters: Partial<IFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      after: "",
      before: "",
    }));
  }, []);

  const handleSort = useCallback((sortBy: "date" | "price") => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder:
        prev.sortBy === sortBy
          ? prev.sortOrder === "asc"
            ? "desc"
            : "asc"
          : "asc",
      after: "",
      before: "",
    }));
  }, []);

  const handleNextPage = useCallback(() => {
    if (salesData?.pagination.after) {
      setFilters((prev) => ({
        ...prev,
        after: salesData.pagination.after,
        before: "",
      }));
    }
  }, [salesData]);

  const handlePrevPage = useCallback(() => {
    if (salesData?.pagination.before) {
      setFilters((prev) => ({
        ...prev,
        before: salesData.pagination.before,
        after: "",
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        after: "",
        before: "",
      }));
    }
  }, [salesData]);

  

  const isFirstPage = filters.after === "" && filters.before === "";
  const hasNextPage = !!salesData?.pagination.after;
  const hasPrevPage = !isFirstPage;

  if (isLoading) {
    return;
  }

  return (
    <main className="min-h-screen container px-4 mx-auto bg-background">
      <div className="flex gap-5 flex-col md:flex-row justify-between py-10">
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
      <SalesDashboard salesData={salesData}></SalesDashboard>
      <div className="my-10 grid grid-cols-1  xl:grid-cols-2 gap-10">
        <SalesTable
          data={salesData.results.Sales}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSort={handleSort}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
        <SalesChart data={salesData.results.TotalSales} />
      </div>
    </main>
  );
}

export default App;
