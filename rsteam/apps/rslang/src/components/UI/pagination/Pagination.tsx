import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Pagination = () => {
  const getPageNumber = () => {
    const path = window.location.pathname;
    const pN = +path.split('/').slice(-1)[0];
    return pN;
  };
  const getBasePath = () => {
    const path = window.location.pathname;
    const bP = path.split('/').slice(0, -1).join('/');
    return bP + '/';
  };
  const [pageNumber, setPageNumber] = useState(getPageNumber());
  const [basePath, setBasePath] = useState(getBasePath());

  const getPrevPagePath = () => {
    return basePath + (pageNumber - 1);
  };

  const getNextPagePath = () => {
    return basePath + (pageNumber + 1);
  };

  const onChangePage = (number) => {
    setPageNumber(number);
  };

  const getClass = () => {
    if (basePath.includes('a1')) {
      return 'a1';
    }
    if (basePath.includes('a2')) {
      return 'a2';
    }
    if (basePath.includes('b1')) {
      return 'b1';
    }
    if (basePath.includes('b2')) {
      return 'b2';
    }
    if (basePath.includes('c1')) {
      return 'c1';
    }
    if (basePath.includes('c2')) {
      return 'c2';
    }
    return 'hard';
  };

  return (
    <div className={`pagination pagination_is_${getClass()}`}>
      {
        (pageNumber < 5) 
        ? <div className='pagination__container'>
            <Link
              className='pagination__link pagination__left-arrow pagination__link_is_disabled'
              to={getPrevPagePath()}
              onClick={() => {onChangePage(pageNumber - 1)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg>
            </Link>
            <Link
              className='pagination__link pagination__link_is_learned'
              to={basePath + 1}
              onClick={() => {onChangePage(1)}}
            >1</Link>
            <Link
              className='pagination__link'
              to={basePath + 2}
              onClick={() => {onChangePage(2)}}
            >2</Link>
            <Link
              className='pagination__link'
              to={basePath + 3}
              onClick={() => {onChangePage(3)}}
            >3</Link>
            <Link
              className='pagination__link'
              to={basePath + 4}
              onClick={() => {onChangePage(4)}}
            >4</Link>
            <Link
              className='pagination__link'
              to={basePath + 5}
              onClick={() => {onChangePage(5)}}
            >5</Link>
            <div className='pagination__gap'>...</div>
            <Link
              className='pagination__link'
              to={basePath + 30}
              onClick={() => {onChangePage(30)}}
            >30</Link>
            <Link
              className='pagination__link pagination__right-arrow'
              to={getNextPagePath()}
              onClick={() => {onChangePage(pageNumber + 1)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg>
            </Link>
          </div>
        : (pageNumber > 4 && pageNumber < 27)
        ? <div className='pagination__container'>
            <Link
              className='pagination__link pagination__left-arrow'
              to={getPrevPagePath()}
              onClick={() => {onChangePage(pageNumber - 1)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
              </svg>
            </Link>
            <Link
              className='pagination__link'
              to={basePath + 1}
              onClick={() => {onChangePage(1)}}
            >1</Link>
            <div className='pagination__gap'>...</div>
            <Link
              className='pagination__link'
              to={basePath + (pageNumber - 1)}
              onClick={() => {onChangePage(pageNumber - 1)}}
            >{pageNumber - 1}</Link>
            <Link
              className='pagination__link pagination__link_is_active'
              to={basePath + pageNumber}
              onClick={() => {onChangePage(pageNumber)}}
            >{pageNumber}</Link>
            <Link
              className='pagination__link'
              to={basePath + (pageNumber + 1)}
              onClick={() => {onChangePage(pageNumber + 1)}}
            >{pageNumber + 1}</Link>
            <div className='pagination__gap'>...</div>
            <Link
              className='pagination__link'
              to={basePath + 30}
              onClick={() => {onChangePage(30)}}
            >30</Link>
            <Link
              className='pagination__link pagination__right-arrow'
              to={getNextPagePath()}
              onClick={() => {onChangePage(pageNumber + 1)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg>
            </Link>
          </div>
        : <div className='pagination__container'>
            <Link
              className='pagination__link pagination__left-arrow'
              to={getPrevPagePath()}
              onClick={() => {onChangePage(pageNumber - 1)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
              </svg>
            </Link>
            <Link
              className='pagination__link'
              to={basePath + 1}
              onClick={() => {onChangePage(1)}}
            >1</Link>
            <div className='pagination__gap'>...</div>
            <Link
              className='pagination__link'
              to={basePath + 26}
              onClick={() => {onChangePage(26)}}
            >26</Link>
            <Link
              className='pagination__link'
              to={basePath + 27}
              onClick={() => {onChangePage(27)}}
            >27</Link>
            <Link
              className='pagination__link'
              to={basePath + 28}
              onClick={() => {onChangePage(28)}}
            >28</Link>
            <Link
              className='pagination__link'
              to={basePath + 29}
              onClick={() => {onChangePage(29)}}
            >29</Link>
            <Link
              className='pagination__link'
              to={basePath + 30}
              onClick={() => {onChangePage(30)}}
            >30</Link>
            <Link
              className='pagination__link pagination__right-arrow'
              to={getNextPagePath()}
              onClick={() => {onChangePage(pageNumber + 1)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg>
            </Link>
          </div>
        }
    </div>
  );
};

export default Pagination;