let moviesContainer = document.getElementById(`movie-container`);

function fetchAndDisplayMovies() {
    fetch(`https://api.noroff.dev/api/v1/square-eyes`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            moviesContainer.innerHTML = ''; // Clear previous content
            result.forEach(movie => {
                let priceHTML;
                if (movie.onSale) {
                    priceHTML = `
                    <span class="regular-price">$${movie.price}</span>
                    <span>$${movie.discountedPrice}</span>
                    `;
                } else {
                    priceHTML = `
                    <span>$${movie.price}</span>
                    `;
                }
                moviesContainer.innerHTML += `
                    <div class="movie-container" data-genre="${movie.genre}">
                        <a href="product-page.html?id=${movie.id}" class="movie-link">
                            <div class="img-div">
                                <img src="${movie.image}" alt="poster">
                            </div>
                        </a>
                        <div class="info-div">
                            <h2 class="title">${movie.title}</h2>        
                            <span class="description">${movie.released}</span>
                            <span class="description">${movie.genre}</span>
                            <span class="rating">Rating ${movie.rating}</span>  
                            <span>${priceHTML}</span>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

function filterMovies(genre) {
    const movieContainers = document.querySelectorAll('.movie-container');
    movieContainers.forEach(container => {
        const movieGenre = container.dataset.genre;
        if (genre === 'All' || movieGenre === genre) {
            container.style.display = 'block'; // Display movies matching the selected genre or when 'All' is selected
        } else {
            container.style.display = 'none'; // Hide movies that don't match the selected genre
        }
    });
}

// Event listener for genre buttons
document.getElementById("btnContainer").addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const genre = event.target.textContent.trim();
        filterMovies(genre);
    }
});

// Fetch and display movies initially
fetchAndDisplayMovies();





/*let moviesContainer = document.getElementById(`movie-container`);

fetch(`https://api.noroff.dev/api/v1/square-eyes`)
    .then(response => response.json())
    .then(result => {
        let movies = result;
        console.log(result);
        for (let i = 0; i < movies.length; i++){
            moviesContainer.innerHTML += `
            <div data-nr="${i}" class="movie-container">
                <a href="product-page.html?id=${movies[i].id}" class="movie-link">
                    <div class="img-div">
                        <img src="${movies[i].image}" alt="poster">
                    </div>
                </a>
                <div class="info-div">
                    <h2 class="title">${movies[i].title}</h2>        
                    <span class="description">${movies[i].released}</span>
                    <span class="description">${movies[i].genre}</span>
                    <span class="rating">Rating ${movies[i].rating}</span>  
                    <span>Price ${movies[i].price}</span>
                </div>
            </div>
        `
        }
    });


function filterMovies(genre) {
    fetch(`https://api.noroff.dev/api/v1/square-eyes`)
        .then(response => response.json())
        .then(result => {
            let movies = result;
            const moviesContainer = document.getElementById('movies');
            moviesContainer.innerHTML = ''; // Clear previous content

            movies.forEach(movie => {
                if (genre === 'All' || movie.genre === genre) {
                    moviesContainer.innerHTML += `
                        <div class="movie-container">
                            <a href="product-page.html?id=${movie.id}" class="movie-link">
                                <div class="img-div">
                                    <img src="${movie.image}" alt="poster">
                                </div>
                            </a>
                            <div class="info-div">
                                <h2 class="title">${movie.title}</h2>        
                                <span class="description">${movie.released}</span>
                                <span class="description">${movie.genre}</span>
                                <span class="rating">Rating ${movie.rating}</span>  
                                <span>Price ${movie.price}</span>
                            </div>
                        </div>
                    `;
                }
            });
        });
}

document.getElementById("btnContainer").addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const genre = event.target.textContent.trim();
        filterMovies(genre);
    }
});*/


/*
function filterMovies (genre){
    const movieContainers = document.querySelectorAll(`#movie-container`);
    movieContainers.forEach(container => {
        const movieGenre = container.querySelector(`.genre`).textContent;
       if (movieGenre !== genre) {
           container.style.display = `none`;
       } else {
           container.style.display = `block`;
       }
    });
}

document.getElementById("btnContainer").addEventListener(`click`, function (event) {
    if (event.target.tagName === `BUTTON`) {
        const genre = event.target.textContent.trim();
        filterMovies(genre);
    }
});*/
