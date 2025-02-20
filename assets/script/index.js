import { navbar, searchbar } from "../../module/navbar.js";
import {
  getdataServer,
  getdataRandom,
  showDatainSearch,
} from "../../server/js/fetchData.js";

// Render the navbar and search bar
document.getElementById("navbar").innerHTML = navbar();
document.getElementById("search-container").innerHTML = searchbar();

// Fetch random recipes on page load
getdataRandom();

// Add debounce functionality to search input
let timer;
function debounce(func, delay) {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(func, delay);
}

// Fetch data from API based on user input
async function getdataFromAPI() {
  try {
    let nameF = document.getElementById("input-search").value;
    if (!nameF.trim()) return; // Prevent empty searches

    let data = await getdataServer(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameF}`
    );

    localStorage.setItem("myfoodR", JSON.stringify(data));
    window.open("./search.html", "_self");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Attach event listener for search with debounce
document.getElementById("search-form").addEventListener("keyup", () => {
  debounce(getdataFromAPI, 1000);
});
