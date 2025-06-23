import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils"; // Assuming you have a utility for className merging (like shadcn/ui's cn)

type DataTableProps = {
  header: string[];
  body: string[][];
  isColumnWidthEqual?: boolean;
};

export const DataTable = ({
  header,
  body,
  isColumnWidthEqual = false,
}: DataTableProps) => {
  // Calculate equal width percentage based on number of columns
  const columnWidth = isColumnWidthEqual ? `${100 / header.length}%` : undefined;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {header.map((column) => (
            <TableHead
              className={cn("text-center", isColumnWidthEqual && "table-equal-column")}
              style={{ width: columnWidth }}
              key={column}
            >
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {body.map((row, rowIndex) => (
          <TableRow key={row[0] || rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell
                className={cn("text-center", isColumnWidthEqual && "table-equal-column")}
                style={{ width: columnWidth }}
                key={`${cell}-${cellIndex}`}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};