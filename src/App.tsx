/** @format */

import React from 'react'
import { Container, Typography, CssBaseline } from '@mui/material'
import CircuitBoard from './components/CircuitBoard'

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Typography variant='h3' component='h1' sx={{ my: 4, textAlign: 'center' }}>
          شبیه‌ ساز مدار
          <span style={{ fontSize: '20px' }}>استاد : مریم صادقی</span>
        </Typography>
        <CircuitBoard />
      </Container>
    </React.Fragment>
  )
}

export default App
