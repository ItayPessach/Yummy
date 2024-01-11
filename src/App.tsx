import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import Explore from '@/pages/explore/Explore'
import UploadPost from '@/pages/upload-post/UploadPost'
import Layout from '@/components/Layout'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#00C2E8'
    },
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Layout />}>
          <Route path='explore' element={<Explore />} />
          <Route path='upload' element={<UploadPost />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )}

export default App
