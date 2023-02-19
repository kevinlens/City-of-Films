//BUILT-IN REACT HOOKS
import React, { useEffect, useState } from 'react';
import DuplicatesExterminator from '../Dry_Functions/DuplicatesExterminator';
//ROUTING
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useFetchMoviesWithUserSearchQueryQuery } from '../store/reduxStore/fetch/fetchApi';
//STYLING
import styles from './SearchResults.module.scss';
import RatingPercentage from '../components/UI/RatingPercentage/RatingPercentage';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const SearchResults = () => {
  const params = useParams();
  const searchQuery = params.userSearchValue;

  const { data: moviesDataSet } = useFetchMoviesWithUserSearchQueryQuery({
    searchQuery,
  });

  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [listOfMovies, setListOfMovies] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  //for resetting everything when user searches for new movies
  useEffect(() => {
    setHasLoaded(false);
    setCurrentItems(null);
    setPageCount(0);
    setItemOffset(0);
    setCurrentPage(0);
  }, [moviesDataSet]);

  //for detecting user window resize
  useEffect(() => {
    function handleResize() {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // * This is to get a consistent image portrayal without empty spaces
    if (screenSize.width >= 1500) {
      setItemsPerPage(10);
    } else {
      setItemsPerPage(12);
    }
    // Ensures movie data is fetched and has finished loading
    if (moviesDataSet && hasLoaded != true) {
      fetchUrl();
    }

    let sortedMovies = [...listOfMovies];
    sortedMovies.sort(
      (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
    );
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(sortedMovies.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(sortedMovies.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesDataSet, itemOffset, itemsPerPage, hasLoaded, screenSize]);

  const fetchUrl = async () => {
    setListOfMovies([]);
    let totalPages = moviesDataSet.total_pages;

    const fetchTotalPages = async (index) => {
      let pageNumber = index + 1;
      let data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&query=${searchQuery}&page=${pageNumber}&include_adult=true`
      );
      let movieData = await data.json();
      return movieData;
      // const rawMovies = [...movieData.results];
      // setListOfMovies((currentSetOfMovies) => [
      //   ...currentSetOfMovies,
      //   ...rawMovies,
      // ]);
    };

    // for (let index = 1; index <= totalPages; index++) {
    //   await fetchTotalPages(index);
    // }

    // * fetches all url at once as each url is limited to 20 array elements
    const list = await Promise.all(
      Array.from({ length: totalPages }, (_, index) => fetchTotalPages(index))
    );
    let entireList = [];

    // * merge all array elements
    list.map((item) => {
      let reassignedArray = item.results;
      entireList.push(...reassignedArray);
    });
    setListOfMovies(DuplicatesExterminator(entireList))
    setHasLoaded(true);
  };

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listOfMovies.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  let movies = [];
  if (currentItems) {
    currentItems.map((item, index) => {
      movies.push(
        <Link
          to={`/details/${currentFormIsMovies ? 'movies': 'tvShows'}/${item.id}`}
          className='w-72 font-sourcePoppinsRegular text-white relative'
          key={index}
        >
          <div className='absolute w-44 top-0'>
            <RatingPercentage rating={item.vote_average} />
          </div>
          <div>
            <img
              className='rounded-2xl'
              loading='lazy'
              onError={(e) => {
                e.currentTarget.src = '/assets/images/NotAvailable.png';
              }}
              src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
              alt='Image 2'
            />
            <p className='pt-2 text-xl'>{item.title}</p>
            <p className='text-sm'>{formatDate(item.release_date)}</p>
          </div>
        </Link>
      );
    });
  }

  return (
    <>
      <div className='grid grid-cols-autoFill wrap overflow-hidden justify-center pt-32 -1xl:gap-4 -lxl:gap-0 -sxl:gap-8'>
        {movies}
      </div>
      <ReactPaginate
        className={`${styles.pagination} flex`}
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel='< previous'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        forcePage={currentPage}
        nextLinkClassName='page-link'
        breakLabel='...'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default SearchResults;
