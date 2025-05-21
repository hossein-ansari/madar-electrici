import React, { useState } from 'react';
import { Box, TextField, Typography, ToggleButton, ToggleButtonGroup, Slider, Card, CardContent, InputAdornment, useMediaQuery } from '@mui/material';

const LED_VOLTAGE_DROP = 2;

const CircuitBoard: React.FC = () => {
  const [resistor1, setResistor1] = useState<number>(330);
  const [resistor2, setResistor2] = useState<number>(330);
  const [mode, setMode] = useState<'series' | 'parallel'>('series');
  const [batteryVoltage, setBatteryVoltage] = useState<number>(9);
  const isMobile = useMediaQuery('(max-width:600px)');

  let totalResistance = 0;
  if (mode === 'series') {
    totalResistance = resistor1 + resistor2;
  } else {
    totalResistance = (resistor1 * resistor2) / (resistor1 + resistor2);
  }
  const current = totalResistance > 0 ? (batteryVoltage - LED_VOLTAGE_DROP) / totalResistance : 0;

  return (
    <Box sx={{ minHeight: '90vh', bgcolor: '#f7fafd', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Vazirmatn, Tahoma, Arial', width: '100%', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <Card sx={{ boxShadow: 4, borderRadius: 4, m: isMobile ? 1 : 3, bgcolor: '#fff', width: '100%', maxWidth: isMobile ? '100%' : 700, boxSizing: 'border-box' }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 2 : 3, alignItems: 'center' }}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(_, value) => value && setMode(value)}
              sx={{ mb: 1 }}
            >
              <ToggleButton value="series" sx={{ fontFamily: 'Vazirmatn, Tahoma, Arial', fontWeight: 'bold', px: 4 }}>سری</ToggleButton>
              <ToggleButton value="parallel" sx={{ fontFamily: 'Vazirmatn, Tahoma, Arial', fontWeight: 'bold', px: 4 }}>موازی</ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: isMobile ? 'stretch' : 'center',
              width: '100%'
            }}>
              <TextField
                label="مقاومت R1 (اهم)"
                type="number"
                value={resistor1}
                onChange={e => setResistor1(Number(e.target.value))}
                sx={{ width: isMobile ? '100%' : 120 }}
                inputProps={{ min: 1 }}
              />
              <TextField
                label="مقاومت R2 (اهم)"
                type="number"
                value={resistor2}
                onChange={e => setResistor2(Number(e.target.value))}
                sx={{ width: isMobile ? '100%' : 120 }}
                inputProps={{ min: 1 }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'stretch' : 'center', minWidth: isMobile ? '100%' : 200 }}>
                <Typography sx={{ fontFamily: 'Vazirmatn, Tahoma, Arial', mb: 1, fontWeight: 'bold', textAlign: isMobile ? 'right' : 'center' }}>ولتاژ باتری (ولت)</Typography>
                <Slider
                  min={1}
                  max={24}
                  step={1}
                  value={batteryVoltage}
                  onChange={(_, v) => setBatteryVoltage(Number(v))}
                  sx={{ width: isMobile ? '100%' : 140 }}
                  valueLabelDisplay="auto"
                />
                <TextField
                  type="number"
                  value={batteryVoltage}
                  onChange={e => {
                    let v = Number(e.target.value);
                    if (v < 1) v = 1;
                    if (v > 24) v = 24;
                    setBatteryVoltage(v);
                  }}
                  sx={{ width: isMobile ? '100%' : 80, mt: 1 }}
                  inputProps={{ min: 1, max: 24 }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">V</InputAdornment>,
                  }}
                />
              </Box>
            </Box>
            <Box sx={{
              mt: isMobile ? 2 : 4,
              mb: 2,
              background: 'linear-gradient(135deg, #e0e7ef 0%, #f5f7fa 100%)',
              borderRadius: 3,
              boxShadow: 2,
              p: isMobile ? 1 : 2,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              overflowX: 'auto',
              boxSizing: 'border-box'
            }}>
              <svg
                viewBox="0 0 600 250"
                width="100%"
                height={isMobile ? 200 : 250}
                style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 8, maxWidth: '100%', height: 'auto', display: 'block', boxSizing: 'border-box' }}
                preserveAspectRatio="xMidYMid meet"
              >
                <rect x="0" y="0" width="600" height="250" fill="#fff" />
                <text x="30" y="80" fontSize={isMobile ? 18 : 28} fontFamily="Vazirmatn, Tahoma, Arial" fill="#222">{batteryVoltage}V</text>
                <line x1="60" y1="60" x2="60" y2="120" stroke="#000" strokeWidth="3" />
                <line x1="70" y1="70" x2="70" y2="110" stroke="#000" strokeWidth="7" />
                <line x1="70" y1="90" x2="120" y2="90" stroke="#000" strokeWidth="3" />
                <line x1="60" y1="90" x2="30" y2="90" stroke="#000" strokeWidth="3" />
                {mode === 'series' ? (
                  <>
                    <line x1="120" y1="90" x2="200" y2="90" stroke="#000" strokeWidth="3" />
                    <polyline points="200,90 210,80 220,100 230,80 240,100 250,80 260,100 270,90" fill="none" stroke="#000" strokeWidth="3" />
                    <text x="210" y="70" fontSize={isMobile ? 10 : 16} fontFamily="Vazirmatn, Tahoma, Arial" fill="#222">R1</text>
                    <text x="210" y="60" fontSize={isMobile ? 9 : 14} fontFamily="Vazirmatn, Tahoma, Arial" fill="#222">{resistor1} Ω</text>
                    <line x1="270" y1="90" x2="320" y2="90" stroke="#000" strokeWidth="3" />
                    <polyline points="320,90 330,80 340,100 350,80 360,100 370,80 380,100 390,90" fill="none" stroke="#000" strokeWidth="3" />
                    <text x="330" y="70" fontSize={isMobile ? 10 : 16} fontFamily="Vazirmatn, Tahoma, Arial" fill="#222">R2</text>
                    <text x="330" y="60" fontSize={isMobile ? 9 : 14} fontFamily="Vazirmatn, Tahoma, Arial" fill="#222">{resistor2} Ω</text>
                    <line x1="385" y1="90" x2="470" y2="90" stroke="#000" strokeWidth="3" />
                    <circle cx="490" cy="90" r={isMobile ? 15 : 25} stroke="#000" strokeWidth="3" fill="none" />
                    <line x1="515" y1="90" x2="540" y2="90" stroke="#000" strokeWidth="3" />
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#000" />
                      </marker>
                    </defs>
                    <line x1="540" y1="90" x2="540" y2="180" stroke="#000" strokeWidth="3" />
                    <line x1="540" y1="180" x2="60" y2="180" stroke="#000" strokeWidth="3" />
                    <line x1="60" y1="180" x2="60" y2="120" stroke="#000" strokeWidth="3" />
                  </>
                ) : (
                  <>
                    <line x1="120" y1="90" x2="220" y2="60" stroke="#000" strokeWidth="3" />
                    <polyline points="220,60 230,50 240,70 250,50 260,70 270,50 280,70 290,60" fill="none" stroke="#000" strokeWidth="3" />
                    <text x="230" y="40" fontSize={isMobile ? 10 : 16} fontFamily="Vazirmatn, Tahoma, Arial" fill="#222">R1</text>
                    <text x="230" y="30" fontSize={isMobile ? 9 : 14} fontFamily="Vazirmatn, Tahoma, Arial" fill="#222">{resistor1} Ω</text>
                    <line x1="120" y1="90" x2="220" y2="120" stroke="#000" strokeWidth="3" />
                    <polyline points="220,120 230,110 240,130 250,110 260,130 270,110 280,130 290,120" fill="none" stroke="#000" strokeWidth="3" />
                    <text x="230" y="150" fontSize={isMobile ? 10 : 16} fontFamily="Vazirmatn, Tahoma, Arial" fill="#222">R2</text>
                    <text x="230" y="160" fontSize={isMobile ? 9 : 14} fontFamily="Vazirmatn, Tahoma, Arial" fill="#222">{resistor2} Ω</text>
                    <line x1="290" y1="60" x2="390" y2="90" stroke="#000" strokeWidth="3" />
                    <line x1="290" y1="120" x2="390" y2="90" stroke="#000" strokeWidth="3" />
                    <circle cx="490" cy="90" r={isMobile ? 15 : 25} stroke="#000" strokeWidth="3" fill="none" />
                    <line x1="385" y1="90" x2="470" y2="90" stroke="#000" strokeWidth="3" />
                    <line x1="515" y1="90" x2="540" y2="90" stroke="#000" strokeWidth="3" />
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto" markerUnits="strokeWidth">
                        <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#000" />
                      </marker>
                    </defs>
                    <line x1="540" y1="90" x2="540" y2="180" stroke="#000" strokeWidth="3" />
                    <line x1="540" y1="180" x2="60" y2="180" stroke="#000" strokeWidth="3" />
                    <line x1="60" y1="180" x2="60" y2="120" stroke="#000" strokeWidth="3" />
                  </>
                )}
              </svg>
            </Box>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Vazirmatn, Tahoma, Arial', fontWeight: 'bold', color: '#1976d2', fontSize: isMobile ? 16 : 22 }}>
                جریان مدار: <b>{current.toFixed(3)} آمپر</b>
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontFamily: 'Vazirmatn, Tahoma, Arial', fontSize: isMobile ? 12 : 16 }}>
                ( ولت، مقاومت کل:  {totalResistance} اهم)
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CircuitBoard; 