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

  return (
    <div className='pagination'>
      {
        (pageNumber < 5) 
        ? <div className='pagination__container'>
            <Link
              className='pagination__link pagination__left-arrow'
              to={getPrevPagePath()}
              onClick={() => {onChangePage(pageNumber - 1)}}>
                <img src="./assets/svg/textbook/left-arrow.svg" alt="prev page" />
            </Link>
            <Link
              className='pagination__link'
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
              <img src="./assets/svg/textbook/right-arrow.svg" alt="next page" />
            </Link>
          </div>
        : (pageNumber > 4 && pageNumber < 27)
        ? <div className='pagination__container'>
            <Link
              className='pagination__link pagination__left-arrow'
              to={getPrevPagePath()}
              onClick={() => {onChangePage(pageNumber - 1)}}
            >
              <img src="./assets/svg/textbook/left-arrow.svg" alt="prev page" />
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
              className='pagination__link'
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
              <img src="./assets/svg/textbook/right-arrow.svg" alt="next page" />
            </Link>
          </div>
        : <div className='pagination__container'>
            <Link
              className='pagination__link pagination__left-arrow'
              to={getPrevPagePath()}
              onClick={() => {onChangePage(pageNumber - 1)}}
            >
              <img src="./assets/svg/textbook/left-arrow.svg" alt="prev page" />
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
              <img src="./assets/svg/textbook/right-arrow.svg" alt="next page" />
            </Link>
          </div>
        }
    </div>
  );
};

export default Pagination;