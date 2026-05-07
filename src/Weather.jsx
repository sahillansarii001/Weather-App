import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;

      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );

      setWeather(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error Fetching Weather Data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-3xl p-8 shadow-2xl border border-slate-700">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Weather Now
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={handleChange}
            className="flex-1 bg-[#334155] text-white placeholder-gray-400 p-4 rounded-2xl outline-none"
          />

          <button
            onClick={fetchWeather}
            className="bg-cyan-400 text-black px-5 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Go
          </button>
        </div>

        {weather && (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {weather.name}
                </h2>

                <p className="text-slate-300 mt-1 capitalize">
                  {weather.weather[0].description}
                </p>
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </div>

            <div className="mt-8 text-center">
              <h1 className="text-7xl font-bold text-white">
                {Math.round(weather.main.temp)}°
              </h1>

              <p className="text-slate-400 mt-2">
                Feels like {Math.round(weather.main.feels_like)}°C
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-[#334155] p-4 rounded-2xl text-center">
                <p className="text-slate-400 text-sm">Humidity</p>

                <h3 className="text-2xl text-white font-bold mt-1">
                  {weather.main.humidity}%
                </h3>
              </div>

              <div className="bg-[#334155] p-4 rounded-2xl text-center">
                <p className="text-slate-400 text-sm">Wind Speed</p>

                <h3 className="text-2xl text-white font-bold mt-1">
                  {weather.wind.speed} km/h
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
