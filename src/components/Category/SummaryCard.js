
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography,  useTheme, } from '@mui/material';
import Iconify from '../../Utils/Iconify';
import { tokens } from "../../theme";

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: 80,
  height:80,
  justifyContent: 'center',
  marginBottom: 10,
}));

// ----------------------------------------------------------------------

SummaryCard.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
export default function SummaryCard({ title, total, icon, color = 'primary', sx, ...other }) {
    
  
const theme = useTheme();
const colors = tokens(theme.palette.mode);
  return (
    <Card
      sx={{
        py: 3,
        boxShadow: 0,
        textAlign: 'center',
        color:  colors.grey[500],
        bgcolor:  colors.white[100],
        borderRadius:"10px",
        ...sx,
      }}
      {...other}
    >
      <StyledIcon
        sx={{
          color: colors.orange[500],
          backgroundImage: 
            `linear-gradient(135deg, ${alpha(colors.greenAccent[500], 0)} 0%, ${alpha(
                colors.grey[100],
              0.09
            )} 100%)`,
        }}
      >
   
        <Iconify icon={icon} width={40} height={40} />
      </StyledIcon>

      <Typography variant="h4">{title}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {total} Sub-category
      </Typography>
    </Card>
  );
}
