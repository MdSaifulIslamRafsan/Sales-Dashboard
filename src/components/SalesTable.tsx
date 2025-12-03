import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { ISale } from "@/lib/types";
import { Button } from "./ui/button";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface SalesTableProps {
  data: ISale[];
  sortBy: "date" | "price";
  sortOrder: "asc" | "desc";
  onSort: (sortBy: "date" | "price") => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

 const SalesTable = ({
  data,
  sortBy,
  sortOrder,
  onSort,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
}: SalesTableProps) => {
  const getSortIcon = (column: "date" | "price") => {
    if (sortBy !== column) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              Sales Records
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[290px]">
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8 data-[state=open]:bg-accent"
                      onClick={() => onSort("date")}
                    >
                      Date
                      {getSortIcon("date")}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8 data-[state=open]:bg-accent"
                      onClick={() => onSort("price")}
                    >
                      Price
                      {getSortIcon("price")}
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((sale) => (
                  <TableRow key={sale?._id}>
                    <TableCell className="font-medium">{sale?._id}</TableCell>
                    <TableCell>{sale?.customerEmail}</TableCell>
                    <TableCell>{sale?.customerPhone}</TableCell>
                    <TableCell>
                      {" "}
                      {new Date(sale.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </TableCell>
                    <TableCell>{sale?.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="flex items-center justify-end mt-4 gap-4">
          <Button size="sm" onClick={onPrevPage} disabled={!hasPrevPage}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button size="sm" onClick={onNextPage} disabled={!hasNextPage}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SalesTable;