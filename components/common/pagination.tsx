"use client";

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  Pagination as UIPagination,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <UIPagination>
      <PaginationContent>
        <PaginationItem>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            className={`pagination-button ${
              currentPage === 1 ? "disabled" : ""
            }`}
          >
            Previous
          </button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => {
          const pageIndex = index + 1;
          return (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === pageIndex}
                onClick={() => onPageChange(pageIndex)}
              >
                {pageIndex}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
            className={`pagination-button ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            Next
          </button>
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
};

export default Pagination;
