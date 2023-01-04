import WarningIcon from '@mui/icons-material/Warning';
import { Typography } from '@mui/material';
import './server-announcment.css';

function ServerAnnouncment() {
  return (
    <div className="server-announcment-padding">
      <div className="successCheckout_container server-announcment">
        <div className="successCheckout_title_container server-announcment_title_container">
          <WarningIcon sx={{ height: '2rem', width: '2rem', color: '#ff9800' }} />
          <h4>Server is sleeping</h4>
        </div>

        <Typography variant="subtitle1" sx={{ paddingInline: { xs: '0', sm: '2rem' }, marginBlockEnd: { xs: '0', sm: '1rem' }, marginBlockStart: { xs: '1rem', sm: 0 } }}>
          In order to deacrease costs the server is in sleep mode and it takes some time (20s) for it to wake up. Then the responses come fast.
        </Typography>

      </div>
    </div>
  );
}

export default ServerAnnouncment;
