"use client";

import { useRouter } from "next/navigation";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const router = useRouter();
  const ITEM_PER_PAGE = 4;
  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="pagination">
      <button
        disabled={!hasPrev}
        className="pagination__button"
        onClick={() => {
          changePage(page - 1);
        }}>
        Précedent
      </button>
      <div className="pagination__pages">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                className={`pagination__pages__page ${
                  page === pageIndex ? "pagination__pages__page--active" : ""
                }`}
                onClick={() => {
                  changePage(pageIndex);
                }}>
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        disabled={!hasNext}
        className="pagination__button"
        onClick={() => {
          changePage(page + 1);
        }}>
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
