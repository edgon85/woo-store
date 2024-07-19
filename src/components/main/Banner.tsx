import Link from 'next/link';
import { BtnBuyNow } from './BtnBuyNow';
import { WaveComplexSVG, WaveSVG } from '../ui';
import styles from './Banner.module.css';

export const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.backgroundImage}>
        <div className={styles.overlay} />
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <div className="md:hidden">
            <WaveComplexSVG />
          </div>
          <div className="hidden md:block">
            <WaveSVG />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h1 className="text-2xl md:text-3xl mb-3">
          Convierte tu closet en efectivo
        </h1>
        <BtnBuyNow />
        <Link href="/" className="text-xs text-cerise-red-600">
          ¿Cómo funciona?
        </Link>
      </div>
    </div>
  );
};
