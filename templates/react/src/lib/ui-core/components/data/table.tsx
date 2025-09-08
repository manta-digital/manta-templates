import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

// Task 4.1: Table Root Component
const tableVariants = cva(
  "w-full caption-bottom text-sm border-collapse",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  className?: string;
  children: React.ReactNode;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, size, children, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(tableVariants({ size }), className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);

Table.displayName = "Table";

// Task 4.2: TableHeader Component  
const tableHeaderVariants = cva(
  "[&_tr]:border-b",
  {
    variants: {
      variant: {
        default: "bg-neutral-2",
        subtle: "bg-neutral-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableHeaderVariants> {
  className?: string;
  children: React.ReactNode;
}

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, variant, children, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(tableHeaderVariants({ variant }), className)}
      {...props}
    >
      {children}
    </thead>
  )
);

TableHeader.displayName = "TableHeader";

// Task 4.3: TableBody Component
const tableBodyVariants = cva(
  "[&_tr:last-child]:border-0",
  {
    variants: {
      striped: {
        true: "[&_tr:nth-child(odd)]:bg-transparent [&_tr:nth-child(even)]:bg-accent-3",
        false: "",
      },
      hoverable: {
        true: "[&_tr]:hover:bg-neutral-2 [&_tr]:transition-colors",
        false: "",
      },
    },
    defaultVariants: {
      striped: false,
      hoverable: true,
    },
  }
);

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement>,
    VariantProps<typeof tableBodyVariants> {
  className?: string;
  children: React.ReactNode;
}

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, striped, hoverable, children, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(tableBodyVariants({ striped, hoverable }), className)}
      {...props}
    >
      {children}
    </tbody>
  )
);

TableBody.displayName = "TableBody";

// Task 4.4: TableRow Component
const tableRowVariants = cva(
  "border-b border-neutral-6 transition-colors",
  {
    variants: {
      selected: {
        true: "bg-accent-3 hover:bg-accent-4",
        false: "",
      },
      clickable: {
        true: "cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
      clickable: false,
    },
  }
);

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {
  selected?: boolean;
  clickable?: boolean;
  className?: string;
  children: React.ReactNode;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, clickable, children, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableRowVariants({ selected, clickable }), className)}
      {...props}
    >
      {children}
    </tr>
  )
);

TableRow.displayName = "TableRow";

// Task 4.5: TableHead Component
const tableHeadVariants = cva(
  "h-10 px-2 text-left align-middle font-medium text-neutral-12 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  {
    variants: {
      sortable: {
        true: "cursor-pointer select-none hover:bg-neutral-3 transition-colors",
        false: "",
      },
    },
    defaultVariants: {
      sortable: false,
    },
  }
);

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    VariantProps<typeof tableHeadVariants> {
  sortable?: boolean;
  sorted?: "asc" | "desc" | null;
  onSort?: () => void;
  className?: string;
  children: React.ReactNode;
}

const TableHead = React.forwardRef<HTMLTableHeaderCellElement, TableHeadProps>(
  ({ className, sortable, sorted, onSort, children, ...props }, ref) => {
    const handleClick = React.useCallback(() => {
      if (sortable && onSort) {
        onSort();
      }
    }, [sortable, onSort]);

    const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
      if (sortable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        handleClick();
      }
    }, [sortable, handleClick]);

    return (
      <th
        ref={ref}
        className={cn(tableHeadVariants({ sortable }), className)}
        onClick={sortable ? handleClick : undefined}
        onKeyDown={sortable ? handleKeyDown : undefined}
        tabIndex={sortable ? 0 : undefined}
        role={sortable ? "button" : undefined}
        aria-sort={
          sorted === "asc" ? "ascending" : 
          sorted === "desc" ? "descending" : 
          sortable ? "none" : undefined
        }
        {...props}
      >
        <div className="flex items-center space-x-2">
          <span>{children}</span>
          {sortable && (
            <div className="flex flex-col">
              <div className={cn(
                "h-0 w-0 border-l-2 border-r-2 border-b-2 border-transparent",
                sorted === "asc" ? "border-b-accent-9" : "border-b-neutral-6"
              )} />
              <div className={cn(
                "h-0 w-0 border-l-2 border-r-2 border-t-2 border-transparent mt-0.5",
                sorted === "desc" ? "border-t-accent-9" : "border-t-neutral-6"
              )} />
            </div>
          )}
        </div>
      </th>
    );
  }
);

TableHead.displayName = "TableHead";

// Task 4.6: TableCell Component
const tableCellVariants = cva(
  "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center", 
        right: "text-right",
      },
      truncate: {
        true: "truncate max-w-0",
        false: "",
      },
    },
    defaultVariants: {
      align: "left",
      truncate: false,
    },
  }
);

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableDataCellElement>,
    VariantProps<typeof tableCellVariants> {
  align?: "left" | "center" | "right";
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
}

const TableCell = React.forwardRef<HTMLTableDataCellElement, TableCellProps>(
  ({ className, align, truncate, children, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ align, truncate }), className)}
      {...props}
    >
      {children}
    </td>
  )
);

TableCell.displayName = "TableCell";

// Task 4.7: Export all components and interfaces
export { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants
};