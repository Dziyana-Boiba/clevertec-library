import { useTranslation } from 'react-i18next';

import IconFacebook from '../../assets/images/Icon_Facebook.svg';
import IconInstagram from '../../assets/images/Icon_Instagram.svg';
import IconLinkedin from '../../assets/images/Icon_linkedin.svg';
import IconVK from '../../assets/images/Icon_VK.svg';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className='footer-wrapper'>
        <span>&copy; 2020-2023 Cleverland. {t('main.ALL_RIGHTS_RESERVED')}.</span>
        <div className='footer-icons'>
          <img src={IconFacebook} alt='Facebook' />
          <img src={IconInstagram} alt='Instagram' />
          <img src={IconVK} alt='VK' />
          <img src={IconLinkedin} alt='LinkedIn' />
        </div>
      </div>
    </footer>
  );
};
