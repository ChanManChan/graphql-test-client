import React from 'react';

const PostPagination = ({ page, setPage, totalPages }) => {
  const pagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li class={`page-item ${i === page ? 'active' : ''}`}>
          <a class='page-link' onClick={() => setPage(i)}>
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };
  return (
    <nav>
      <ul class='pagination justify-content-center'>
        <li class={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <a class='page-link' onClick={() => setPage((cs) => --cs)}>
            Previous
          </a>
        </li>
        {pagination()}
        <li class={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <a class='page-link' onClick={() => setPage((cs) => ++cs)}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default PostPagination;
