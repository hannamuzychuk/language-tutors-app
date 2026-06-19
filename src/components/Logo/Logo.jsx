import styles from './Logo.module.css';

const LOGO_BY_THEME = {
  gray: '/logo/logo_quest.png',
  yellow: '/logo/logo_login.png',
  green: '/logo/logo_login.png',
  blue: '/logo/logo_login.png',
  coral: '/logo/logo_login.png',
  orange: '/logo/logo_login.png',
};

function Logo({ theme }) {
  const src = LOGO_BY_THEME[theme] ?? '/logo/logo_login.png';

  return (
    <img
      src={src}
      alt=""
      width={28}
      height={28}
      className={styles.logo}
    />
  );
}

export default Logo;
