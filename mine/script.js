const input = document.getElementById("name");
const btn = document.getElementById("submit");
const holding = document.getElementById("holder");
const loadingBar = document.getElementById("spinner");
async function getUserCountry(params) {
  const getCountry = input.value.trim();
//   holding.innerHTML = "";
  loadingBar.style.display = "block";
  holding.innerHTML = ""
  if (!getCountry) {
    holding.innerHTML = "<i>Please enter a valid a country name</i>";
    loadingBar.style.display = "none";
  } else {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${getCountry}?fullText=true`
    );
    const result = await response.json();
    if (!result) {
     holding.innerHTML = "<i>Please enter a valid a country name</i>";
    //   loadingBar.style.display = "none";
    } else {
      const country = result[0];
      const flagUrl = country.flags ? country.flags.png : "default-flag.png";
      const htmlTemplate = `  <div class="main-content" id="holder">
            <div class="image-side">
                <img src="${flagUrl}" alt="">
                <p>${country.name.common}</p>
            </div>
            <div class="about-country">
                <h2>Capital:${
                  country.capital ? country.capital[0] : "Not available"
                }</h2>
                <h2>Continent:${
                  country.continents ? country.continents[0] : "Not available"
                }</h2>
                <h2>Population:${
                  country.population ? country.population : "Not available"
                }</h2>
                <h2>Currency:${
                  country.currencies
                    ? Object.values(country.currencies)[0].name
                    : "N/A"
                }- ${
        country.currencies ? Object.values(country.currencies)[0].symbol : "N/A"
      } </h2>
                <h2>Common Language:${
                  country.languages ? Object.values(country.languages) : "N/A"
                }</h2>
            </div>
        </div>`;
      holding.innerHTML = htmlTemplate;
    }
    loadingBar.style.display = "none";
  }
}
btn.addEventListener("click", getUserCountry);

// 09033811283
