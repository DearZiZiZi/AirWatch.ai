chrome.runtime.onInstalled.addListener(() => {
    console.log("AirWatch AI Extension Installed");
  });
  
  async function fetchAirQualityData() {
    const response = await fetch('https://api.open-meteo.com/v1/forecast', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer AIzaSyCg5P33MaA7ApX-ywfoTDvZGO3-aP-qWfk'
      }
    });
  
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch air quality data");
      return null;
    }
  }
  
  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "getAirQuality") {
      const airQualityData = await fetchAirQualityData();
      sendResponse({ data: airQualityData });
    }
    return true;
  });
  
// Функция для получения местоположения пользователя
function getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Геолокация не поддерживается вашим браузером.");
    }
  }
  
  // Функция для обработки успешного получения местоположения
  function showPosition(position) {
    // Получаем широту и долготу
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Делаем что-нибудь с полученными координатами (например, отправляем их на сервер или используем для запроса погоды)
    console.log("Широта: " + latitude);
    console.log("Долгота: " + longitude);
  
    // Вызываем функцию для получения погоды (например, getWeatherData(latitude, longitude))
    // ...
  }
  
  // Функция для обработки ошибки при получении местоположения
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Пользователь запретил доступ к геолокации.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Информация о местоположении недоступна.");
        break;
      case error.TIMEOUT:
        alert("Превышен тайм-аут при определении местоположения.");
        break;
      case error.UNKNOWN_ERROR:
        alert("Произошла неизвестная ошибка.");
        break;
    }
  }