import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // Adjust import based on your project structure
import { useGetMaterialListQuery } from "@/lib/features/material/materialApiSlice";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

function MaterialTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useGetMaterialListQuery(currentPage);


  if (isLoading) return (
    <>
      {[...Array(10)].map((_, index) => (
        <TableRow key={index} >
          <TableCell><Skeleton className="h-6 w-24" /></TableCell>
          <TableCell><Skeleton className="h-6 w-32" /></TableCell>
          <TableCell><Skeleton className="h-6 w-32" /></TableCell>
          <TableCell><Skeleton className="h-6 w-24" /></TableCell>
          <TableCell><Skeleton className="h-6 w-32" /></TableCell>
          <TableCell><Skeleton className="h-6 w-32" /></TableCell>
        </TableRow>
      ))}
    </>
  );
  if (error) return <p>Error: {error.message}</p>;

  const purchases = data?.material_purchase_list?.data || [];
  const totalPages = data?.material_purchase_list?.last_page || 1;

  return (
    <>
      <Table className="border text-center border-white border-separate border-spacing-y-0 border-spacing-x-1">
        <TableHeader>
          <TableRow className="bg-[#2563EB99] hover:bg-[#2563EB99]">
            <TableHead className="text-white text-center">ITEMS</TableHead>
            <TableHead className="text-white text-center">STORE</TableHead>
            <TableHead className="text-white text-center">Runner's Name</TableHead>
            <TableHead className="text-white text-center">Amount</TableHead>
            <TableHead className="text-white text-center">CARD NO.</TableHead>
            <TableHead className="text-white text-center">TRANSACTION DATE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((obj) => (
            <TableRow key={obj.id} className="even:bg-white odd:bg-[#2563EB1A]">
              <TableCell className="font-medium">{obj.line_item_name}</TableCell>
              <TableCell>{obj.store}</TableCell>
              <TableCell>{obj.runners_name}</TableCell>
              <TableCell>{obj.amount}</TableCell>
              <TableCell>{obj.card_number}</TableCell>
              <TableCell>{new Date(obj.transaction_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter>
        <TableRow className="bg-white">
          <TableCell colSpan={6} className="text-center">
            <Pagination>
              <PaginationContent className="bg-blue-100 p-2 rounded-lg flex justify-center">
                <PaginationItem>
                  <PaginationPrevious
                    className={`bg-blue-500 text-white rounded-l-md px-4 py-2 cursor-pointer ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                      }`}

                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink
                      className={`mx-1 rounded-md cursor-pointer px-3 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-blue-200 text-blue-700'}`}
                      onClick={() => setCurrentPage(index + 1)}
                      active={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={`bg-blue-500 text-white rounded-r-md px-4 py-2 cursor-pointer ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
      </TableFooter>
    </>
  );
}

export default MaterialTable;