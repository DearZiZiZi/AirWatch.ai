const API_KEY = 'AIzaSyCg5P33MaA7ApX-ywfoTDvZGO3-aP-qWfk';
const genAI = new GoogleGenerativeAI(API_KEY);

async function getWeatherRecommendation(lat, lon) {
  console.log('Fetching weather recommendation for:', lat, lon);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `You are an AI weather assistant. Based on the following geolocation (latitude: ${lat}, longitude: ${lon}), provide:
  1. A brief description of the current weather conditions (temperature, sky conditions, wind).
  2. Air quality assessment.
  3. Probability of rain, strong wind, or extreme heat.
  4. Recommendations for outdoor activities and health precautions.
  Please format your response in HTML, using appropriate tags for headings and paragraphs. Keep the response concise but informative.`;

  try {
    const result = await model.generateContent(prompt);
    console.log('Gemini AI response received');
    return result.response; // Assuming response is the HTML content you need
  } catch (error) {
    console.error('Error calling Gemini AI:', error);
    throw new Error('Failed to get weather recommendation from AI');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const loadingDiv = document.getElementById('loading');
  const weatherInfoDiv = document.getElementById('weather-info');

  try {
    console.log('Getting user location...');
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        timeout: 10000, // 10 second timeout
        maximumAge: 0 // Force fresh location
      });
    });

    const { latitude, longitude } = position.coords;
    console.log('Location obtained:', latitude, longitude);

    const weatherRecommendation = await Promise.race([
      getWeatherRecommendation(latitude, longitude),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), 15000))
    ]);

    loadingDiv.style.display = 'none';
    weatherInfoDiv.style.display = 'block';
    weatherInfoDiv.innerHTML = weatherRecommendation;
  } catch (error) {
    console.error('Error:', error);
    loadingDiv.style.display = 'none';
    weatherInfoDiv.style.display = 'block';
    weatherInfoDiv.innerHTML = `<p>Error: ${error.message}. Please try again later or check your internet connection.</p>`;
  }
});
