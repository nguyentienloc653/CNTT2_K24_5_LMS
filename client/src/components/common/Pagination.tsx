type Props = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPage,
  onPageChange,
}: Props) {
  if (totalPage <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Prev
      </button>

      {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border
            ${page === currentPage ? "bg-orange-500 text-white" : ""}
          `}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
