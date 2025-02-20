// Function to generate the navigation bar
function navbar() {
  return `<div style="display: flex; justify-content: flex-start; gap: 20px; width: 100%; padding-left: 20px;">
            <h1><a href="./index.html">Home</a></h1>
            <h1><a href="./search.html">Search Food Recipes</a></h1>
          </div>
          <div>
          </div>`;
}

// Function to generate the search bar
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

// Function to fetch data from the server
const getdataServer = async (url) => {
  try {
    let res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Function to fetch random category data
async function getdataRandom() {
  try {
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    
    let data = await res.json();
    showRandomData(data.categories);
  } catch (error) {
    console.error("Error fetching random data:", error);
  }
}

// Function to display random categories (excluding Pork)
const showRandomData = (data) => {
  let container = document.getElementById("random_div");
  container.innerHTML = ""; // Clear previous content

  let filteredData = data.filter((ele) => ele.strCategory !== "Pork");

  let content = filteredData.map((ele) => `
    <div class="category-card">
      <img src="${ele.strCategoryThumb}" alt="${ele.strCategory}" />
      <h2>${ele.strCategory}</h2>
      <p>${ele.strCategoryDescription.slice(0, 100)}...</p>
    </div>
  `).join("");

  container.innerHTML = content;
};

// Function to display search results
async function showDatainSearch(data) {
  let container = document.getElementById("results-container");
  container.innerHTML = ""; // Clear previous results

  if (!data.meals) {
    container.innerHTML = "<p>No recipes found. Try another search!</p>";
    return;
  }

  let content = data.meals.map((ele) => `
    <div class="meal-card">
      <div><img src="${ele.strMealThumb}" alt="${ele.strMeal}" /></div>
      <div>
        <h1>${ele.strMeal}</h1>
        <h2>Category: ${ele.strCategory}</h2>
        <h3>Ingredients: ${ele.strIngredient1}, ${ele.strIngredient2}</h3>
        <p><strong>Instructions:</strong> ${ele.strInstructions.slice(0, 300)}...</p>
        <h3><a href="${ele.strYoutube}" target="_blank">Watch Video</a></h3>
      </div>
    </div>
  `).join("");

  container.innerHTML = content;
}

// Export functions
export { navbar, searchbar, getdataServer, getdataRandom, showDatainSearch };
