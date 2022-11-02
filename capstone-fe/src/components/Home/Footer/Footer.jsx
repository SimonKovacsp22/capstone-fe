import { Button, Typography, useMediaQuery } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CallIcon from '@mui/icons-material/Call';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RoomOutlined from '@mui/icons-material/RoomOutlined';

function Footer() {
  const isXl = useMediaQuery('(max-width:1400px)');
  return (

    <div className="home_footer_container">
      <div className="home_footer_section">
        <Typography sx={{ marginBottom: '1rem', fontSize: `${isXl ? '1rem' : '1.5rem'}`, color: 'white' }}>Important Information</Typography>
        <Typography sx={{ marginBottom: '1rem', color: 'white' }}>
          About our company
        </Typography>
        <Typography sx={{ marginBottom: '1rem', color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
          Terms of business
        </Typography>
        <Typography sx={{ marginBottom: '1rem', color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
          Privacy protection
        </Typography>
        <Typography sx={{ marginBottom: '1rem', color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
          How to shop
        </Typography>
        <Typography sx={{ marginBottom: '1rem', color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
          Commercia terms
        </Typography>
        <Typography sx={{ marginBottom: '1rem', color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
          Contact
        </Typography>
      </div>
      <div className="home_footer_section">
        <Typography sx={{ marginBottom: '1rem', fontSize: `${isXl ? '1rem' : '1.5rem'}`, color: 'white' }}>Contact Information</Typography>
        <div className="home_footer_icon_and_text">
          <RoomOutlined sx={{ color: '#e6b45e', fontSize: '1.8rem' }} />
          <Typography sx={{ marginBottom: `${isXl ? '1rem' : '1.5rem'}`, color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
            <b>GAMAJA</b> Heizung s.r.o.<br />Golianovo 403
          </Typography>
        </div>
        <div className="home_footer_icon_and_text">
          <CallIcon sx={{ color: '#e6b45e' }} />
          <Typography sx={{ marginBottom: `${isXl ? '1rem' : '1.5rem'}`, color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
            <b>Phone:</b><br /> +421 923 456 789
          </Typography>
        </div>
        <div className="home_footer_icon_and_text">
          <SupportAgentIcon sx={{ color: '#e6b45e', fontSize: '1.7rem' }} />
          <Typography sx={{ marginBottom: `${isXl ? '1rem' : '1.5rem'}`, color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
            <b>Support</b><br /> Monday to Friday 8 a.m. - 4 p.m. <br />
            Registered users only
          </Typography>
        </div>
      </div>
      <div className="home_footer_section">
        <Typography sx={{ marginBottom: '1rem', fontSize: `${isXl ? '1rem' : '1.5rem'}`, color: 'white' }}>Why Us</Typography>
        <div className="home_footer_icon_and_text_nogap">
          <CheckIcon sx={{ color: '#e6b45e', fontSize: `${isXl ? '1rem' : '1.3rem'}` }} />
          <Typography sx={{ marginBottom: `${isXl ? '1rem' : '1.5rem'}`, color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
            More than 20 years of expirience
          </Typography>
        </div>
        <div className="home_footer_icon_and_text_nogap">
          <CheckIcon sx={{ color: '#e6b45e', fontSize: `${isXl ? '1rem' : '1.3rem'}` }} />
          <Typography sx={{ marginBottom: `${isXl ? '1rem' : '1.5rem'}`, color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
            Proffesional help and consulting
          </Typography>
        </div>
        <div className="home_footer_icon_and_text_nogap">
          <CheckIcon sx={{ color: '#e6b45e', fontSize: `${isXl ? '1rem' : '1.3rem'}` }} />
          <Typography sx={{ marginBottom: `${isXl ? '1rem' : '1.5rem'}`, color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
            Pre and post warranty service
          </Typography>
        </div>
        <div className="home_footer_icon_and_text_nogap">
          <CheckIcon sx={{ color: '#e6b45e', fontSize: `${isXl ? '1rem' : '1.3rem'}` }} />
          <Typography sx={{ marginBottom: `${isXl ? '1rem' : '1.5rem'}`, color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
            Educated and proffesional staff
          </Typography>
        </div>
        <div className="home_footer_icon_and_text_nogap">
          <CheckIcon sx={{ color: '#e6b45e', fontSize: `${isXl ? '1rem' : '1.3rem'}` }} />
          <Typography sx={{ marginBottom: `${isXl ? '1rem' : '1.5rem'}`, color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
            30 days money back guarantee
          </Typography>
        </div>

      </div>
      <div className="home_footer_section">
        <Typography sx={{ marginBottom: '1rem', fontSize: `${isXl ? '1rem' : '1.5rem'}`, color: 'white' }}>
          Newsletter
        </Typography>
        <Typography sx={{ marginBottom: `${isXl ? '1rem' : '1.5rem'}`, color: 'white', fontSize: `${isXl ? '.7rem' : '1rem'}` }}>
          Subscribe to recieve news and updates<br />
          about sales, actions and opportunities
        </Typography>
        <input className="home_footer_input" placeholder="E-mail address" />
        <Button
          className="home_footer_button"
          sx={{ textTransform: 'none',
            backgroundColor: '#e6b45e',
            color: '#2E3A4F',

            marginTop: `${isXl ? '1rem' : '1.5rem'}`,
            '&:hover': {
              opacity: '.8',
              backgroundColor: '#e6b45e',
            } }}
        >Subscribe
        </Button>
      </div>
    </div>
  );
}

export default Footer;
