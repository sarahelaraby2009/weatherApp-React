import { useState,useEffect } from 'react'
import BasicButtons from './components/test.jsx'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import Button from '@mui/material/Button';
import axios from 'axios';

const theme = createTheme({
  typography: {
    fontFamily: ["quick"]
  }
})


function App() {
 const[Temp,setTemp]=useState(null)

  useEffect(() => {
     const controller = new AbortController();
  axios.get('https://api.openweathermap.org/data/2.5/weather?lat=30.03&lon=31.23&appid=93bda17f51e804e72fb5d3df7a9530b3',{signal: controller.signal})
    .then(function (response) {
      const getTemp=Math.round(response.data.main.temp-273.15)
      setTemp(getTemp)
      console.log(response);
    })
    .catch(function (error) {
      
      if(error.name==="CanceledError"){
        console.log("request canceled")
      }else{console.log(error);}
    })
    return () =>{
      console.log("cancelling")
      controller.abort()
    }
}, [])
  return (

    <div className='App' >
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm"  >

          <div style={{ backgroundColor: "#F7B731", padding: "5px",marginBottom:"10px", width: "auto", height: "auto" }}>
            <div dir='rtl' style={{ display: "flex", gap: "20px", alignItems: "end", justifyContent: "space-evenly", borderBottom: "1px white solid" }}>
              <Typography variant='h2'>القاهره</Typography>
               <Typography variant='h6'>5 مايو 2026 </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <div style={{fontSize:"30px"}}>
               <FilterDramaIcon style={{fontSize:"200px",color:"white"}}/>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", gap: "20px" }}>
                  <img src='vite.svg' />
                  <Typography variant='h1'>{Temp}</Typography>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Typography variant='h5'>Broken Clouds</Typography>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Typography variant='h5'>الكبرى:38  | الصغرى:25</Typography>
                </div>

              </div>

            </div>

          </div>
           <Button sx={{color:"#fff",borderColor:"#ffff"}} variant="outlined" size="small">
          العربى
        </Button>
        </Container>
      </ThemeProvider>

    </div>
  )
}

export default App
