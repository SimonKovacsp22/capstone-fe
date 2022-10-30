import { Box, Typography } from '@mui/material';
import React from 'react';
import { TwitterIcon, LinkedInIcon } from './SvgIcons';
import './styles-team.css';

function TeamMember({ firstName, lastName, emp, twitter, linkedIn, right, imgUrl }) {
  return (
    <div
      className={`${right ? 'team_members_container_left' : 'team_members_container_right'}`}
      style={{
        // eslint-disable-next-line quotes
        backgroundImage: ` url(${imgUrl})`,
      }}
    >
      <div className={`${right ? 'team_member_info_container_right' : 'team_member_info_container_left'}`}>
        <Typography sx={{ color: 'black', fontSize: '2.75rem', letterSpacing: '0.225rem', lineHeight: '1.1', marginBottom: '.75rem' }}>
          {firstName}<br /> {lastName}
        </Typography>
        <Typography sx={{ color: '#D62323', fontSize: '1.5em', letterSpacing: '.125rem', marginBottom: '1rem' }}>
          {emp}
        </Typography>
        <Typography sx={{ fontSize: '1rem', color: 'black', lineHeight: '1.7', marginBottom: '1rem' }}>
          Phil co-founded Mixd with Mike Danford
          in 2004 and now<br /> guides the company&apos;s
          technical direction. As an expert in<br /> usability and user centred design, he has led large-scale UX<br /> projects, focussing on speed of innovation, usability and<br /> service design in the NHS and other public sectors.
        </Typography>
        <Typography sx={{ fontSize: '1rem', color: 'black', lineHeight: '1.7', marginBottom: '2rem', display: { xs: 'none', sm: 'block' } }}>
          You could describe Phil as an obsessive road cyclist, former<br /> outdoor pursuits instructor and owner of a dog called<br /> Surprise.
        </Typography>
        <div>
          <Box sx={{ gap: '1rem', alignItems: 'center', display: { xs: 'none', md: 'flex' }, mb: { xs: '2rem' } }}>
            <div className="team_twitter_bg_circle"><TwitterIcon />
            </div>
            <Typography color="#017BB5" sx={{ fontSize: '1.5em', letterSpacing: '.125rem' }}> @{twitter}</Typography>
          </Box>
          <Box display="flex" sx={{ gap: '1rem', alignItems: 'center' }}><LinkedInIcon />
            <Typography color="#017BB5" sx={{ fontSize: '1.5em', letterSpacing: '.125rem' }}>
              /{linkedIn}
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
}

function Team() {
  return (
    <Box>
      <div className="team_divider">
        <Typography
          sx={{
            fontSize: { xs: '2.4rem' },
            color: '#2E3A4F',
            letterSpacing: '.125em',
            textAlign: 'center',
          }}
        >
          MEET THE TEAM
        </Typography>
      </div>
      <div className="team_container">
        <TeamMember
          firstName="PHIL"
          lastName="SHACKLETON"
          emp="FOUNDER & CEO"
          right
          twitter="PHILSHACK"
          linkedIn="PHILSHACKLETON"
          imgUrl="https://www.mixd.co.uk/content/uploads/2022/02/phil-large.jpg"
        />
        <TeamMember
          firstName="MIKE"
          lastName="DANFORD"
          emp="FOUNDER & CTO"
          right={false}
          twitter="M_DANFORD"
          linkedIn="MIKEDANFORD"
          imgUrl="https://www.mixd.co.uk/content/uploads/2017/03/mike-large.jpg"
        />
        <TeamMember
          firstName="ALEX"
          lastName="SIMONDS"
          emp="ACCOUNT MANAGER"
          right
          twitter="ALEXXX"
          linkedIn="ALEXSIMONDS"
          imgUrl="https://www.mixd.co.uk/content/uploads/2022/02/alex-large.jpg"
        />

      </div>
    </Box>
  );
}
export default Team;
