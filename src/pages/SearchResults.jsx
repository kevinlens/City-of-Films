//BUILT-IN REACT HOOKS
import React, { useEffect, useState } from 'react';
import DuplicatesExterminator from '../Dry_Functions/DuplicatesExterminator';
//ROUTING
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

//RTK QUERY
import { useFetchMoviesWithUserSearchQueryQuery } from '../store/reduxStore/fetch/fetchApi';
import { useFetchTVShowsWithUserSearchQueryQuery } from '../store/reduxStore/fetch/fetchTVShowsApi';

//STYLING
import styles from './SearchResults.module.scss';
import RatingPercentage from '../components/UI/RatingPercentage/RatingPercentage';

import { useContext } from 'react';
import FormOfEntertainmentContext from '../store/contextStore/FormOfEntertainment-Context';

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

  const { data: tvShowDataSet } = useFetchTVShowsWithUserSearchQueryQuery({
    searchQuery,
  });

  const { currentFormIsMovies } = useContext(FormOfEntertainmentContext);

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
  }, [moviesDataSet, tvShowDataSet]);

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
    if (moviesDataSet && tvShowDataSet && hasLoaded != true) {
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
  }, [
    moviesDataSet,
    itemOffset,
    itemsPerPage,
    hasLoaded,
    screenSize,
    tvShowDataSet,
  ]);

  const fetchUrl = async () => {
    setListOfMovies([]);
    let totalPages;
    if (currentFormIsMovies) {
      totalPages = moviesDataSet.total_pages;
    } else {
      totalPages = tvShowDataSet.total_pages;
    }

    const fetchTotalPages = async (index) => {
      let pageNumber = index + 1;
      let data;
      if (currentFormIsMovies) {
        data = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&query=${searchQuery}&page=${pageNumber}&include_adult=true`
        );
      } else {
        data = await fetch(
          `https://api.themoviedb.org/3/search/tv?api_key=8e6ba047d3bc0b9dddf8392f32410006&language=en-US&page=${pageNumber}&query=${searchQuery}&include_adult=true`
        );
      }
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
    list.forEach((item) => {
      let reassignedArray = item.results;
      entireList.push(...reassignedArray);
    });
    setListOfMovies(DuplicatesExterminator(entireList));
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
          to={`/details/${currentFormIsMovies ? 'movies' : 'tvShows'}/${
            item.id
          }`}
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
            <p className='pt-2 text-xl'>
              {item.title ? item.title : item.name}
            </p>
            <p className='text-sm'>
              {formatDate(
                item.release_date ? item.release_date : item.first_air_date
              )}
            </p>
          </div>
        </Link>
      );
    });
  }

  return (
    <>
      {listOfMovies.length > 0 ? (
        <div>
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
        </div>
      ) : (
        // <div className='pt-96 h-[50rem] text-white text-4xl text-center bg-slate-300'>
        //   <div>Could Not Find Search Results</div>
        // </div>
        <div className='relative'>
          <img className='h-full w-full' src='/assets/images/NotFound.jpg' />
          <div className='absolute lg:top-80 -lg:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-white'>
          <p className='text-center text-4xl'>Sooooowie~~~</p>
          <div className=''>Search Results Not Found :(</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;
