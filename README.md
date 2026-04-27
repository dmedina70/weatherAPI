
# Weather Forecast App

A simple weather forecast web application built with **Node.js**, **Express**, and **JavaScript** that retrieves real-time weather data from the **OpenWeather API** and displays it in a clean user interface.

## Features

- Search weather forecast by **city and state**
- Displays **temperature forecasts**
- Shows **5 upcoming forecast entries**
- Uses **OpenWeather API**
- Backend built with **Node.js and Express**
- Frontend built with **HTML, CSS, and JavaScript**
- Uses **environment variables** to securely store API keys

---

## Technologies Used

- Node.js
- Express.js
- JavaScript (Fetch API)
- HTML5
- CSS3
- OpenWeather API
- dotenv

---

## Project Structure

```
WeatherAPI
│
├── app.js        # Express server and API route
├── main.js       # Frontend logic and API requests
├── index.html    # User interface
├── styles.css    # Styling
└── README.md     # Project documentation
```

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/dmedina70/WeatherAPI.git
```

2. Navigate to the project folder

```bash
cd WeatherAPI
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file in the root directory

```
api_key=YOUR_OPENWEATHER_API_KEY
```

5. Start the server

```bash
node app.js
```

---

## Usage

1. Open your browser
2. Navigate to

```
http://localhost:3000
```

3. Enter a **city and state**
4. Click **Get Forecast**
5. View the upcoming weather forecast

---

## Example API Request

```
GET /search?city=Orlando&state=FL
```

Example Response:

```json
{
  "list": [
    {
      "main": {
        "temp": 298.15
      }
    }
  ]
}
```

---

## Future Improvements

- Display weather **icons**
- Add **humidity and wind speed**
- Improve **UI design**
- Add **error handling and validation**
- Deploy the application online

---

## Author

**Deric Medina**

GitHub:  
https://github.com/dmedina70

---

## License

This project is open source and available under the **MIT License**.
