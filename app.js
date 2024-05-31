"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

window.addEventListener("load", initApp); // When the page is loaded, run initApp function

// Function to initialize the Web App
async function initApp() {
  console.log("initApp: app.js is running 🎉"); // Log to the console that the app is running
  const projects = await getProjects(); // Corrected the function name
  console.log(projects);
  // displayProjects(projects);
  displayProjectsGrid(projects);
}

// Function to fetch projects data from the WordPress API
async function getProjects() {
  // Fetch data from the specified API endpoint
  const response = await fetch("https://wordpressexam.poolofdesign.dk/wp-json/wp/v2/projects?acf_format=standard");
  // Parse the response data as JSON
  const data = await response.json();
  // Return the parsed data
  return data;
}

// Function to display projects in a grid layout
function displayProjectsGrid(projects) {
  // Select the grid container element
  const projectsGrid = document.querySelector("#project-grid");
  
  // Iterate over each project in the fetched data
  for (const project of projects) {
    // Insert each project into the grid container using template literals
    projectsGrid.insertAdjacentHTML(
      "beforeend",
      `    
    <article class="grid-item">
      <img src="${project.acf.image}" alt="${project.title.rendered}"></img>
      <h2>${project.title.rendered}</h2>
      <p>${project.acf.description}</p>
    </article>
    `
    );
  }
}
