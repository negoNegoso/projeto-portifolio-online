import { useState } from 'react';
import Panel from '../../../components/Panel/Panel';
import Menu from '../../../components/Academy/AcademyMenu/AcademyMenu';
import styles from './AcademySettings.module.css';

const AcademySettings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleEmailNotificationToggle = () => {
    setIsEmailNotificationEnabled(!isEmailNotificationEnabled);
  };

  return (
    <div className={styles.academySettingContainer}>
      <div className={styles.academySettingMenu}>
        <Menu academyName={'Academy'} />
      </div>
      <div className={styles.academySettingMainContent}>
        <div className={styles.academySettingSideContents}>
          <Panel pageName="Portal Acadêmico" section="Início" color="#F66B0E" />
          <div className={styles.academySettingInfo}>
            <div className={styles.academySettingCardContainer}>
              <div className={styles.academySettingCard}>
                <div className={styles.settingacademyCardInfo}>
                  <div className={styles.cardInfoacademyTitle}>
                    <h3>Preferência de Idioma</h3>
                    <div className={styles.cardInfoacademyLine}></div>
                  </div>
                  <div className={styles.cardInfoacademyDescription}>
                    <p>Selecione o idioma para visualização de informações no sistema.</p>
                  </div>
                  <div className={styles.cardacademyLanguageSelect}>
                    <select>
                      <option>Português (Brasil)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.academySettingCard}>
                <div className={styles.settingacademyCardInfo}>
                  <div className={styles.cardInfoacademyTitle}>
                    <h3>Alteração de Tema</h3>
                    <div className={styles.cardInfoacademyLine}></div>
                  </div>
                  <div className={styles.cardInfoacademyDescription}>
                    <p>Ative o modo escuro para aliviar a fadiga ocular.</p>
                  </div>
                </div>
                <div className={styles.settingacademyToggleContainer}>
                  <label className={styles.settingacademySwitch}>
                    <input type="checkbox" checked={isDarkMode} onChange={handleDarkModeToggle} />
                    <span className={styles.settingacademySlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.academySettingCard}>
                <div className={styles.settingacademyCardInfo}>
                  <div className={styles.cardInfoacademyTitle}>
                    <h3>Notificação por E-mail</h3>
                    <div className={styles.cardInfoacademyLine}></div>
                  </div>
                  <div className={styles.cardInfoacademyDescription}>
                    <p>Ative essa preferência caso deseje receber notificações via e-mail institucional.</p>
                  </div>
                </div>
                <div className={styles.settingacademyToggleContainer}>
                  <label className={styles.settingacademySwitch}>
                    <input
                      type="checkbox"
                      checked={isEmailNotificationEnabled}
                      onChange={handleEmailNotificationToggle}
                    />
                    <span className={styles.settingacademySlider}></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademySettings;
