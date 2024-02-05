let moviesContainer = document.getElementById(`movie-container`);

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
                        <h2 class="title">${movies[i].title}</h2>
                </a>        
                        <span class="description">${movies[i].released}</span>
                        <span class="description">${movies[i].genre}</span>
                        <span class="rating">Rating ${movies[i].rating}</span>   
            </div>
        `
        }
    });