// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

// --> ?name="bob" = event.queryStringParameters.name
// --> ?name="bob"&last_name = event.queryStringParameters.last_name

// --> ?access_key="123"&query=1234,1234&forecast_days=4

const axios = require('axios')

const handler = async (event) => {
  const { startingParams, categoryParams, id, page, searchQuery, gte, lte, gteAD, lteAD, isFirebase,
    firebaseMovieYear,firebaseCategory } = event.queryStringParameters;
  const apiEndpoints = []
  // const API_SECRET = process.env.API_SECRET
  // const FIREBASE_URL = process.env.FIREBASE_URL
  const API_SECRET = '8e6ba047d3bc0b9dddf8392f32410006'
  const FIREBASE_URL = 'https://film-city-6d3c6-default-rtdb.firebaseio.com/'

  if(!isFirebase){

    const url = `https://api.themoviedb.org/3/${startingParams}${id ? `/${id}` : ''}${categoryParams ? `/${categoryParams}` : ''}?api_key=${API_SECRET}&language=en-US&${gte ? `primary_release_date.gte=${gte}&` : ''}${lte ? `primary_release_date.lte=${lte}&` : ''}${gte ? `first_air_date.gte=${gteAD}&` : ''}${lte ? `first_air_date.gte.lte=${lteAD}&` : ''}language=en-US&${searchQuery ? `query=${searchQuery}&` : ''}${page ? `page=${page}` : ''}&include_adult=true`;
    // const url = `https://content.guardianapis.com/${category}?search?from-date=${currentDate}&page-size=10&show-fields=body%2Cthumbnail%2CshouldHideAdverts%2Cheadline%2C&show-elements=image&show-blocks=all&show-tags=contributor&api-key=${API_SECRET}`;
  
    try {
    
      const { data } = await axios.get(url)
  
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
  
    }catch(error){
      const {status, statusText, headers, data} = error.response;
  
      return{
        statusCode: status,
        body: JSON.stringify({status, statusText, headers, data})
      }
      
    }
  } else if (!firebaseCategory){


    const url = `${FIREBASE_URL}popularMoviesFor${firebaseMovieYear}.json`;
  try {
    
    const { data } = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  }catch(error){
    const {status, statusText, headers, data} = error.response;

    return{
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
    
  }

  } else{


    const url = `${FIREBASE_URL}popularTVShowsAiredIn2022.json`;
  try {
    
    const { data } = await axios.get(url);

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  }catch(error){
    const {status, statusText, headers, data} = error.response;

    return{
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
    
  }

  }

}

module.exports = { handler }
