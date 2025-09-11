import React, { useState } from "react";
import "./paginator.css";

const Paginator = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    let baseClass = "paginator-cell";
    let activeClass = baseClass + " active";

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    function handleChangePage(page) {
        onPageChange(page);
    }
    function handlePreviousPage() {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    function handleNextPage() {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    return (
        <div className="paginator">
            <div className="paginator-cell" onClick={handlePreviousPage}>
                <i className="fi fi-rr-arrow-small-left"></i>
            </div>
            {pageNumbers.map((pageNumber) => (
                <div
                    key={pageNumber}
                    className={
                        currentPage === pageNumber ? activeClass : baseClass
                    }
                    onClick={() => handleChangePage(pageNumber)}
                >
                    {pageNumber}
                </div>
            ))}
            <div className="paginator-cell" onClick={handleNextPage}>
                <i className="fi fi-rr-arrow-small-right"></i>
            </div>
        </div>
    );
};

export default Paginator;
