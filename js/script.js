const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPage: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "65e30862953539f5222ae7b5126050d8",
    apiUrl: "https://api.themoviedb.org/3/",
  },
};

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

 async function fetchAPIData(endpoint){
   const API_KEY = global.api.apiKey;
   const API_URL = global.api.apiUrl;

   showSpinner();

   const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

   const data = await response.json();
  //  console.log(data);

   hideSpinner();
   return data;
}

function initSwiper() {
    const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      breakpoints: {
        500: {
          slidesPerView: 2,
        },
        700: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }

async function displaySlider(){
    const {results} = await fetchAPIData('/movie/now_playing');

    results.forEach((movie) => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
        `;

        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    });
}

function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    });
}

async function displayPopularMovies(){
 const { results } = await fetchAPIData('movie/popular'); 
    
   results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path?
              `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`:
              `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`
            }
        </a>
       
       <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
       </div>
    `;
    
    document.querySelector('#popular-movies').appendChild(div);
    
   });
};

async function displayPopularShows(){
  const { results } = await fetchAPIData('tv/popular'); 
    
  results.forEach((show) => {
   const div = document.createElement('div');
   div.classList.add('card');
   div.innerHTML = `
       <a href="movie-details.html?id=${show.id}">
           ${
            show.poster_path?
             `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.title}" />`:
             `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.title}" />`
           }
       </a>
      
      <div class="card-body">
         <h5 class="card-title">${show.name}</h5>
         <p class="card-text">
             <small class="text-muted">Release: ${show.first_air_date}</small>
           </p>
      </div>
   `;
   
   document.querySelector('#popular-shows').appendChild(div);
   
  });
};

function init() {
  // Router  
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      // call function
      break;
    case "/tv-details.html":
      // call function
      break;
    case "/search.html":
      // call function
      break;
  }
//nav heading highlighter

    highlightActiveLink();
    
}

document.addEventListener('DOMContentLoaded', init);
