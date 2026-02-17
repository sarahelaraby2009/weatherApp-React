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
    fontFamily: ["quick"]
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
  const [locale,setLocale]=useState("ar")
  console.log(t("cities.cairo"))

  console.log(date)
  const handleLanguageClick= ()=> {
    if(i18n.language=="ar"){
       i18n.changeLanguage("en")
    }
    else if(i18n.language=="en"){
       i18n.changeLanguage("ar")
    }
  }
  useEffect(() => {
        setDate(dayjs().locale(i18n.language).format("DD MMMM YYYY"))
  },[i18n.language])
  useEffect(() => {
    const controller = new AbortController();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=93bda17f51e804e72fb5d3df7a9530b3`, { signal: controller.signal })
      .then(function (response) {
        const data = response.data
        if (!data.weather || data.weather.length === 0) return
        const getTemp = Math.round(response.data.main.temp - 273.15)
        const min = Math.round(response.data.main.temp_min - 273.15)
        const max = Math.round(response.data.main.temp_max - 273.15)
        const description = data.weather?.[0]?.description || ""
        const icon = data.weather?.[0]?.icon || ""
        setTemp({ number: getTemp, min, max, description, icon: `https://openweathermap.org/img/wn/${icon}@2x.png` })

        console.log(response.data);
      })
      .catch(function (error) {

        if (error.name === "CanceledError") {
          console.log("request canceled")
        } else { console.log(error); }
      })
    return () => {
      console.log("cancelling")
      controller.abort()
    }
  }, [city])
  return (

    <div className='App' >
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm"  >

          <div style={{ backgroundColor: "#F7B731", padding: "5px", marginBottom: "10px", width: "auto", height: "auto",borderRadius:"20px" }}>
            <div dir={i18n.language=="ar" ? "rtl" : "ltr"} style={{ display: "flex", gap: "20px", alignItems: "end", justifyContent: "space-evenly", borderBottom: "1px white solid" }}>

              <Autocomplete
                disablePortal
                options={EGYPT_CITIES}
                getOptionLabel={(option) => t(`cities.${option.key}`)}
                sx={{ width: 200, margin: "5px",color:"white" }}
                value={city}
                onChange={(e, selectedValue) => { setCity(selectedValue) }}
                renderInput={(params) => <TextField {...params} label="City" />}
                renderOption={(props, option) => {
                  const { key, ...rest } = props

                  return (
                    <li key={key} {...rest} style={{ color: "black" }}>
                      {t(`cities.${option.key}`)}
                    </li>
                  )
                }}

              />


              <Typography  variant='h6'>{date}</Typography>
            </div>
            <div dir={i18n.language=="en" ? "rtl" : "ltr"} style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <div style={{ fontSize: "30px" }}>
                <FilterDramaIcon style={{ fontSize: "200px", color: "white" }} />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <img src={Temp.icon} />
                  <Typography variant='h1'>{Temp.number}</Typography>
                </div>
                <div dir={i18n.language=="ar" ? "rtl" : "ltr"} style={{ marginBottom: "10px" }}>
                  <Typography variant='h5'>{t(Temp.description.toLowerCase())}</Typography>
                </div>
                <div dir={i18n.language=="ar" ? "rtl" : "ltr"} style={{ marginBottom: "10px" }}>
                  <Typography sx={{fontSize:"12px"}}>{t("max")}:{Temp.max}  | {t("min")}:{Temp.min}</Typography>
                </div>

              </div>

            </div>

          </div>
          <Button onClick={handleLanguageClick} sx={{ color: "#fff", borderColor: "#ffff" }} variant="outlined" size="small">
            {i18n.language=="ar" ? "انجليزى" : "Arabic"}
          </Button>
        </Container>
      </ThemeProvider>

    </div>
  )
}

export default App
