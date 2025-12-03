"use client";

import { Filter, RotateCcw } from "lucide-react";
import type { IFilters } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IFiltersPanelProps {
  filters: IFilters;
  showFilters: boolean;
  onFiltersChange: (filters: Partial<IFilters>) => void;
}

export default function FiltersPanel({
  filters,
  onFiltersChange,
  showFilters,
}: IFiltersPanelProps) {
  const handleReset = () => {
    onFiltersChange({
      startDate: "",
      endDate: "",
      priceMin: "",
      email: "",
      phone: "",
    });
  };

  if (!showFilters) return null;

  return (
    <Card className="mb-10">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter size={18} /> Filters
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex items-center gap-2"
        >
          <RotateCcw size={16} /> Reset
        </Button>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
          <div className="space-y-1">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={filters.startDate}
              onChange={(e) => onFiltersChange({ startDate: e.target.value })}
            />
          </div>

         
          <div className="space-y-1">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={filters.endDate}
              onChange={(e) => onFiltersChange({ endDate: e.target.value })}
            />
          </div>

         
          <div className="space-y-1">
            <Label htmlFor="priceMin">Min Price</Label>
            <Input
              id="priceMin"
              type="number"
              placeholder="e.g. 100"
              value={filters.priceMin}
              onChange={(e) => onFiltersChange({ priceMin: e.target.value })}
            />
          </div>

         
          <div className="space-y-1">
            <Label htmlFor="email">Customer Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.com"
              value={filters.email}
              onChange={(e) => onFiltersChange({ email: e.target.value })}
            />
          </div>

        
          <div className="space-y-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              value={filters.phone}
              onChange={(e) => onFiltersChange({ phone: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
