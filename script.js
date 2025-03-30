// Add event listener to the form
document.getElementById("calcForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Stop the form from reloading the page

  // Get the user's input (arithmetic operation)
  const query = document.getElementById("query").value;

  // API URL from Astra Langflow (from cURL)
  const apiUrl =
    "https://cors-anywhere.herokuapp.com/https://api.langflow.astra.datastax.com/lf/dba738d8-811d-4aba-ade7-e771b393b659/api/v1/run/4df5aa5c-a0b2-49a3-8469-b824de51da93?stream=false";

  // API Token generated from Astra (from cURL)
  const apiToken = "AstraCS:BRZvYMoGgBwKtWsYyRcImLcr:342dd29f468688fa3a3002447f0a6430f46eeeffba43a3afc5a09739b5e4ec29"; // <-- Replace this with the correct token

  // Create request body in the format Langflow expects
  const requestBody = {
    input_value: query, // User input (arithmetic operation)
    output_type: "chat",
    input_type: "chat",
    tweaks: {}, // No tweaks for now
  };

  // Debugging - Log important info to the console
  console.log("API URL:", apiUrl);
  console.log("API Token:", apiToken);
  console.log("Request Body:", requestBody);

  // Send API request to Langflow agent using fetch()
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiToken}`, // Send token for authentication
    },
    body: JSON.stringify(requestBody), // Send input data
  })
    .then((response) => {
      console.log("Response Status:", response.status);
      if (!response.ok) {
        throw new Error("Error calling API.");
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      console.log("API Response:", data);
      // Check if response has 'output' key and display result
      if (data && data.hasOwnProperty("output")) {
        document.getElementById("result").innerHTML =
          "Result: " + data.output;
      } else {
        document.getElementById("result").innerHTML =
          "Invalid operation or no result.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("result").innerHTML =
        "Error: Could not get a valid response.";
    });
});
