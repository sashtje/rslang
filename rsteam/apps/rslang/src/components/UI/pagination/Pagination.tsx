import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/index';

const Pagination = ({page, group, setPage, wordsPagPerPage}) => {
  let basePath = `/textbook/${group}/`;

  const {isAuth, setIsAuth} = useContext(AuthContext);

  useEffect(() => {
    basePath = `/textbook/${group}/`;
  }, [group]);

  const returnClassLearned = (isAuth, wordsPagPerPage, pageNum, classRes) => {
    if (isAuth && wordsPagPerPage[pageNum - 1] === 20) {
      return `${classRes} pagination__link_is_learned`;
    }
    return classRes;
  };

  return (
    <div className={`pagination pagination_is_${group}`}>
      {
        (page < 5) 
        ? <div className='pagination__container'>
            <Link
              className={page === 1 ? 
                'pagination__link pagination__left-arrow pagination__link_is_disabled' 
                :
                'pagination__link pagination__left-arrow'}
              to={`${basePath}${page - 1}`}
              onClick={() => {setPage(page - 1)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg>
            </Link>
             {/* pagination__link_is_learned */}
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 1, page === 1 ?
                'pagination__link pagination__link_is_active'
              : 'pagination__link')}
              to={basePath + 1}
              onClick={() => {setPage(1)}}
            >1</Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 2, page === 2 ?
                'pagination__link pagination__link_is_active'
              : 'pagination__link')}
              to={basePath + 2}
              onClick={() => {setPage(2)}}
            >2</Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 3, page === 3 ?
                'pagination__link pagination__link_is_active'
              : 'pagination__link')}
              to={basePath + 3}
              onClick={() => {setPage(3)}}
            >3</Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 4, page === 4 ?
                'pagination__link pagination__link_is_active'
              : 'pagination__link')}
              to={basePath + 4}
              onClick={() => {setPage(4)}}
            >4</Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 5, 'pagination__link')}
              to={basePath + 5}
              onClick={() => {setPage(5)}}
            >5</Link>
            <div className='pagination__gap'>...</div>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 30, 'pagination__link')}
              to={basePath + 30}
              onClick={() => {setPage(30)}}
            >30</Link>
            <Link
              className='pagination__link pagination__right-arrow'
              to={`${basePath}${page + 1}`}
              onClick={() => {setPage(page + 1)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg>
            </Link>
          </div>

        : (page > 4 && page < 27)
        ? <div className='pagination__container'>
            <Link
              className='pagination__link pagination__left-arrow'
              to={`${basePath}${page - 1}`}
              onClick={() => {setPage(page - 1)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
              </svg>
            </Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 1, 'pagination__link')}
              to={basePath + 1}
              onClick={() => {setPage(1)}}
            >1</Link>
            <div className='pagination__gap'>...</div>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, page - 1, 'pagination__link')}
              to={basePath + (page - 1)}
              onClick={() => {setPage(page - 1)}}
            >{page - 1}</Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, page, 'pagination__link pagination__link_is_active')}
              to={basePath + page}
              onClick={() => {setPage(page)}}
            >{page}</Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, page + 1, 'pagination__link')}
              to={basePath + (page + 1)}
              onClick={() => {setPage(page + 1)}}
            >{page + 1}</Link>
            <div className='pagination__gap'>...</div>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 30, 'pagination__link')}
              to={basePath + 30}
              onClick={() => {setPage(30)}}
            >30</Link>
            <Link
              className='pagination__link pagination__right-arrow'
              to={`${basePath}${page + 1}`}
              onClick={() => {setPage(page + 1)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
              </svg>
            </Link>
          </div>

        : <div className='pagination__container'>
            <Link
              className='pagination__link pagination__left-arrow'
              to={`${basePath}${page - 1}`}
              onClick={() => {setPage(page - 1)}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
              </svg>
            </Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 1, 'pagination__link')}
              to={basePath + 1}
              onClick={() => {setPage(1)}}
            >1</Link>
            <div className='pagination__gap'>...</div>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 26, 'pagination__link')}
              to={basePath + 26}
              onClick={() => {setPage(26)}}
            >26</Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 27, page === 27 ?
                'pagination__link pagination__link_is_active'
              : 'pagination__link')}
              to={basePath + 27}
              onClick={() => {setPage(27)}}
            >27</Link>
            <Link
              className={returnClassLearned(isAuth,wordsPagPerPage, 28, page === 28 ?
                'pagination__link pagination__link_is_active'
              : 'pagination__link')}
              to={basePath + 28}
              onClick={() => {setPage(28)}}
            >28</Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 29, page === 29 ?
                'pagination__link pagination__link_is_active'
              : 'pagination__link')}
              to={basePath + 29}
              onClick={() => {setPage(29)}}
            >29</Link>
            <Link
              className={returnClassLearned(isAuth, wordsPagPerPage, 30, page === 30 ?
                'pagination__link pagination__link_is_active'
              : 'pagination__link')}
              to={basePath + 30}
              onClick={() => {setPage(30)}}
            >30</Link>
            <Link
              className={page === 30 ? 
                'pagination__link pagination__right-arrow pagination__link_is_disabled' 
                :
                'pagination__link pagination__right-arrow'}
              to={`${basePath}${page + 1}`}
              onClick={() => {setPage(page + 1)}}
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