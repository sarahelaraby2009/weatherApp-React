import { useState, useEffect } from 'react'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
// MUI IMPORTS
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// Axios Import
import axios from 'axios';
// DAYJS IMPORTS
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/ar'
import 'dayjs/locale/en'
dayjs.extend(utc);
// I18 IMPORTS
import i18next from './i18n'
import { useTranslation } from 'react-i18next';


const theme = createTheme({
  typography: {
    fontFamily: ["quick", "sans-serif"].join(",")
  }
})

const EGYPT_CITIES = [
  { key: 'cairo', lat: 30.03, lon: 31.23 },
  { key: 'alex', lat: 31.20, lon: 29.92 },
  { key: 'giza', lat: 30.01, lon: 31.21 },
  { key: 'aswan', lat: 24.09, lon: 32.91 },
  { key: 'luxor', lat: 25.69, lon: 32.64 },
  { key: 'portsaid', lat: 31.26, lon: 32.30 },
  { key: 'suez', lat: 29.97, lon: 32.55 },
  { key: 'ismailia', lat: 30.58, lon: 32.27 },
  { key: 'tanta', lat: 30.79, lon: 31.00 },
  { key: 'mansoura', lat: 31.04, lon: 31.38 }
]

function App() {
  const [Temp, setTemp] = useState({
    number: null,
    min: null,
    max: null,
    description: "",
    icon: null
  })
  const [city, setCity] = useState(EGYPT_CITIES[0])
  const [date, setDate] = useState("")
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar"

  const handleLanguageClick = () => {
    if (i18n.language === "ar") {
      i18n.changeLanguage("en")
    } else {
      i18n.changeLanguage("ar")
    }
  }

  useEffect(() => {
    setDate(dayjs().locale(i18n.language).format("DD MMMM YYYY"))
  }, [i18n.language])

  useEffect(() => {
    const controller = new AbortController();
    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=93bda17f51e804e72fb5d3df7a9530b3`,
      { signal: controller.signal }
    )
      .then(function (response) {
        const data = response.data
        if (!data.weather || data.weather.length === 0) return
        const getTemp = Math.round(data.main.temp - 273.15)
        const min = Math.round(data.main.temp_min - 273.15)
        const max = Math.round(data.main.temp_max - 273.15)
        const description = data.weather?.[0]?.description || ""
        const icon = data.weather?.[0]?.icon || ""
        setTemp({ number: getTemp, min, max, description, icon: `https://openweathermap.org/img/wn/${icon}@2x.png` })
      })
      .catch(function (error) {
        if (error.name !== "CanceledError") console.log(error)
      })
    return () => controller.abort()
  }, [city])

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" disableGutters sx={{ px: { xs: 0, sm: 2 } }}>
          <div className="weather-card">

            {/* ── HEADER: city picker + date ── */}
            <div className="card-header" dir={isRtl ? "rtl" : "ltr"}>
              <Autocomplete
                disablePortal
                options={EGYPT_CITIES}
                getOptionLabel={(option) => t(`cities.${option.key}`)}
                className="city-select"
                sx={{ width: { xs: '100%', sm: 200 } }}
                value={city}
                onChange={(e, selectedValue) => { if (selectedValue) setCity(selectedValue) }}
                renderInput={(params) => <TextField {...params} label={isRtl ? "المدينة" : "City"} />}
                renderOption={(props, option) => {
                  const { key, ...rest } = props
                  return (
                    <li key={key} {...rest} style={{ color: "#1a1a2e", fontFamily: "quick, sans-serif" }}>
                      {t(`cities.${option.key}`)}
                    </li>
                  )
                }}
              />
              <Typography className="date-text">{date}</Typography>
            </div>

            {/* ── BODY: icon + temperature ── */}
            <div className="card-body" dir={isRtl ? "ltr" : "rtl"}>
              <div className="weather-icon-wrap">
                <FilterDramaIcon className="cloud-icon" />
                <Typography className="weather-condition">
                  {Temp.description ? t(Temp.description.toLowerCase()) : "—"}
                </Typography>
              </div>

              <div className="temp-block" dir={isRtl ? "rtl" : "ltr"}>
                <div className="temp-row">
                  {Temp.icon && <img src={Temp.icon} alt="weather icon" className="weather-img" />}
                  <Typography className="temp-number">
                    {Temp.number !== null ? Temp.number : "--"}
                  </Typography>
                  <span className="temp-unit">°C</span>
                </div>

                {Temp.max !== null && (
                  <div className="minmax-row">
                    <div className="minmax-item">
                      <Typography className="minmax-label">{t("max")}</Typography>
                      <Typography className="minmax-value">{Temp.max}°</Typography>
                    </div>
                    <div className="divider" />
                    <div className="minmax-item">
                      <Typography className="minmax-label">{t("min")}</Typography>
                      <Typography className="minmax-value">{Temp.min}°</Typography>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── FOOTER: language toggle ── */}
            <div className="card-footer">
              <Button onClick={handleLanguageClick} className="lang-btn" variant="outlined" size="small">
                {isRtl ? "English" : "عربى"}
              </Button>
            </div>

          </div>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
