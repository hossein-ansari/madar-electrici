import React from 'react';
import Draggable from 'react-draggable';
import { Box, Typography } from '@mui/material';

interface ResistorProps {
  value: number;
  position: { x: number; y: number };
  onDragStop: (data: { x: number; y: number }) => void;
}

const Resistor: React.FC<ResistorProps> = ({ value, position, onDragStop }) => {
  return (
    <Draggable
      position={position}
      onStop={(_, data) => onDragStop(data)}
      bounds="parent"
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100px',
          height: '40px',
          backgroundColor: '#f0f0f0',
          border: '2px solid #666',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'move',
          '&:hover': {
            backgroundColor: '#e0e0e0',
          },
        }}
      >
        <Typography variant="body2">{value}Ω</Typography>
      </Box>
    </Draggable>
  );
};

export default Resistor; 