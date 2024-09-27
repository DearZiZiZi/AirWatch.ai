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