$(document).ready(function () {
  $("#searchInput").autocomplete({
    source: function (request, response) {
      const apiKey = "251850820c91d73ea09c8ade0d21f2b5";
      const query = request.term;
      $.ajax({
        url: `https://api.themoviedb.org/3/search/movie`,
        data: {
          api_key: apiKey,
          query: query,
        },
        success: function (data) {
          const movieTitles = data.results.map((movie) => movie.title);
          response(movieTitles);
        },
      });
    },
    minLength: 2, // Minimum characters before autocomplete suggestions start
  });

  $("#searchButton").on("click", function () {
    const searchTerm = $("#searchInput").val();
    if (searchTerm.trim() !== "") {
      searchMovies(searchTerm);
    }
  });

  function searchMovies(query) {
    const apiKey = "251850820c91d73ea09c8ade0d21f2b5";
    const accessToken =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTE4NTA4MjBjOTFkNzNlYTA5YzhhZGUwZDIxZjJiNSIsInN1YiI6IjY1NWM1NDQwYjU0MDAyMTRkMDcxNzc2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZYRon72N93kszdVqvbdM3qTtyBdL9uLP4NHCo4zTthk";

    $.ajax({
      url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      dataType: "json",
      success: function (response) {
        displayMovies(response.results);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching data:", error);
      },
    });
  }

  function displayMovies(movies) {
    const movieContainer = $("#movieContainer");
    movieContainer.empty();

    if (movies.length === 0) {
      movieContainer.append("<p>No movies found</p>");
    } else {
      movies.forEach(function (movie) {
        const movieInfo = $('<div class="movie"></div>');
        const posterPath = movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/150"; // Use a placeholder image if no poster available

        const image = $("<img>")
          .attr("src", posterPath)
          .attr("alt", `${movie.title} Poster`);
        const info = $('<div class="movie-info"></div>');
        info.append(`<h2>${movie.title}</h2>`);
        info.append(`<p>${movie.overview}</p>`);

        movieInfo.append(image);
        movieInfo.append(info);

        movieContainer.append(movieInfo);
      });
    }
  }
});
