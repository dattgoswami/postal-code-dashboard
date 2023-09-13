const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();

    switch (endpoint) {
      case "/api/report":
        return data.report;
      case "/api/cities":
        return data.cities;
      default:
        throw new Error("Unknown endpoint");
    }
  } catch (error) {
    return { error: error.message || "Something went wrong" };
  }
}

export default fetchData;
