function navbar() {
  return `<div id="navbar">
          <h1><a href="./index.html">Home</a></h1>
          <h1 class="search-link"><a href="./search.html">Search Food Recipes</a></h1>
        </div>`;
}

function searchbar() {
  return `<div id="search-box-div">
        <div>
          <h1>Find a Recipe</h1>
          <form id="search-form">
            <input type="text" placeholder="Search..." id="input-search" />
            <button type="button">Search</button>
          </form>
        </div>
        </div>`;
}

export { navbar, searchbar };
