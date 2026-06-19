import { HERO_MAC_BY_THEME, HERO_STICKER } from '../../config/heroAssets';
import styles from './HeroThemeBlock.module.css';

function HeroThemeBlock({ theme }) {
  const macSrc = HERO_MAC_BY_THEME[theme];

  if (!macSrc) {
    return null;
  }

  return (
    <div className={styles.scene}>
      <img src={HERO_STICKER} alt="" className={styles.sticker} />
      <img src={macSrc} alt="" className={styles.mac} />
    </div>
  );
}

export default HeroThemeBlock;
