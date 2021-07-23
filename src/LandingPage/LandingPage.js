import React from 'react';
import { TopNav } from './TopNav/TopNav';
import styles from './LandingPage.module.css';
import Typography from '@material-ui/core/Typography';

export function LandingPage() {
	return (
    <div className={styles['content-container']}>
      <TopNav />
      <Typography
        style={{ fontWeight: 600 }}
        align='center'
        variant='h2'
      >
        ReFood
      </Typography>
    </div>
	);
}