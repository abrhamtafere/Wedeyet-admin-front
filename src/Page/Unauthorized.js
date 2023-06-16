
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',

}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>


      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Typography variant="h2" paragraph>
          401
          </Typography>
          <Typography variant="h2" paragraph>
            Sorry, you are Unauthorized!
          </Typography>
          <Typography variant="h3" paragraph>
           Please request to the Super Admin to access
          </Typography>

      

          <Box
            component="img"
            src="https://th.bing.com/th/id/OIP.le6OGfeOYPxiQgZnkkZz4QHaES?pid=ImgDet&rs=1"
            sx={{ height: 230,width:240, mx: 'auto', borderRadius:"50%", my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large"sx={{color:"white",bgcolor:"#61CE70"}} component={RouterLink}>
            Go to Home
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
