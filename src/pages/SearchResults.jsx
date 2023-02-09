//BUILT-IN REACT HOOKS
import React, { useEffect, useState } from 'react';

//ROUTING
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useFetchMoviesWithUserSearchQueryQuery } from '../store/reduxStore/fetch/fetchApi';
const SearchResults = () => {
  const params = useParams();
  const searchQuery = params.userSearchValue;

  const { data: moviesDataSet } = useFetchMoviesWithUserSearchQueryQuery({
    searchQuery,
  });

  // TODO: See how many pages there are from the first page execution API Call (Page 1)
  // TODO: If user clicks on next page button / 2-3-4 page button it should make an fetch back data with the page number
  // ! What you could do is make separate API calls based on user click
  // ! of next page
  const itemsPerPage = 10;
  const [listOfMovies, setListOfMovies] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  // We start with an empty list of items
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    setHasLoaded(false);
    setCurrentItems(null);
    setPageCount(0);
    setItemOffset(0);
  }, [params]);

  useEffect(() => {
    if (moviesDataSet && hasLoaded != true) {
      fetchUrl();
    }

    let sortedMovies = [...listOfMovies];
    sortedMovies.sort(
      (a, b) => parseFloat(b.vote_count) - parseFloat(a.vote_count)
    );
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(sortedMovies.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(sortedMovies.length / itemsPerPage));
    console.log('🍑🍑🍑🍑', listOfMovies);
  }, [moviesDataSet, itemOffset, itemsPerPage, hasLoaded]);

  const fetchUrl = async () => {
    console.log('🍇🍇🍇🍇', moviesDataSet);
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
    const list = await Promise.all(
      Array.from({ length: totalPages }, (_, index) => fetchTotalPages(index))
    );

    let entireList = [];

    list.map((item) => {
      let reassignedArray = item.results;
      entireList.push(...reassignedArray);
    });

    console.log('🐳🐳🐳🐳', entireList);
    setListOfMovies(entireList);
    setHasLoaded(true);
  };

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % listOfMovies.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  let movies = [];

  if (currentItems) {
    currentItems.map((item, index) => {
      movies.push(
        <section key={index}>
          {item.title}
          <img
            className='w-52'
            loading='lazy'
            onError={(e) => {
              e.currentTarget.src =
                'https://gravatar.com/avatar/418738537ab04bae411c5001438c99ca?s=400&d=robohash&r=x';
            }}
            src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            alt='Image 2'
          />
        </section>
      );
    });
  }

  return (
    <>
      <div className='flex'>{movies}</div>
      <ReactPaginate
        className='flex'
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
