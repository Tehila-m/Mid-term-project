import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function Layout({ color = "info", size = "large" }) {
  const navigate = useNavigate()
  const buttons = [
    <Button key="one" onClick={() => navigate("/api/users")}>users</Button>,
    <Button key="two" onClick={()=> navigate("/api/posts")}>posts</Button>,
    <Button key="three" onClick={()=>navigate("/api/todos")}>todos</Button>,
  ]
  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        color={color}
        size={size}
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}

