import { useState, useEffect } from 'react'
import BasicButtons from './components/test.jsx'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import axios from 'axios';
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);
const theme = createTheme({
  typography: {
    fontFamily: ["quick"]
  }
})

const EGYPT_CITIES = [
  { name: 'القاهرة', lat: 30.03, lon: 31.23 },
  { name: 'الإسكندرية', lat: 31.20, lon: 29.92 },
  { name: 'الجيزة', lat: 30.01, lon: 31.21 },
  { name: 'أسوان', lat: 24.09, lon: 32.91 },
  { name: 'الأقصر', lat: 25.69, lon: 32.64 },
  { name: 'بورسعيد', lat: 31.26, lon: 32.30 },
  { name: 'السويس', lat: 29.97, lon: 32.55 },
  { name: 'الإسماعيلية', lat: 30.58, lon: 32.27 },
  { name: 'طنطا', lat: 30.79, lon: 31.00 },
  { name: 'المنصورة', lat: 31.04, lon: 31.38 }
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


  console.log(date)

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
        setDate(dayjs.utc().format('DD MMMM YYYY'))

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
            <div dir='rtl' style={{ display: "flex", gap: "20px", alignItems: "end", justifyContent: "space-evenly", borderBottom: "1px white solid" }}>

              <Autocomplete
                disablePortal
                options={EGYPT_CITIES}
                getOptionLabel={(option) => option.name}
                sx={{ width: 200, margin: "5px",color:"white" }}
                value={city}
                onChange={(e, selectedValue) => { setCity(selectedValue) }}
                renderInput={(params) => <TextField {...params} label="City" />}
                renderOption={(props, option) => {
                  const { key, ...rest } = props

                  return (
                    <li key={key} {...rest} style={{ color: "black" }}>
                      {option.name}
                    </li>
                  )
                }}

              />


              <Typography variant='h6'>{date}</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <div style={{ fontSize: "30px" }}>
                <FilterDramaIcon style={{ fontSize: "200px", color: "white" }} />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <img src={Temp.icon} />
                  <Typography variant='h1'>{Temp.number}</Typography>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Typography variant='h5'>{Temp.description}</Typography>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Typography variant='h5'>الكبرى:{Temp.max}  | الصغرى:{Temp.min}</Typography>
                </div>

              </div>

            </div>

          </div>
          <Button sx={{ color: "#fff", borderColor: "#ffff" }} variant="outlined" size="small">
            العربى
          </Button>
        </Container>
      </ThemeProvider>

    </div>
  )
}

export default App
