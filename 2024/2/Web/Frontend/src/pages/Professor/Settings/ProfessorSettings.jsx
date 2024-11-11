import { useState } from 'react';
import Panel from '../../../components/Panel/Panel';
import Menu from '../../../components/Professor/TeacherMenu/TeacherMenu';
import styles from './ProfessorSettings.module.css';

const ProfessorSettings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleEmailNotificationToggle = () => {
    setIsEmailNotificationEnabled(!isEmailNotificationEnabled);
  };

  return (
    <div className={styles.teacherSettingContainer}>
      <div className={styles.teacherSettingMenu}>
        <Menu studentName={'Professora'} />
      </div>
      <div className={styles.teacherSettingMainContent}>
        <div className={styles.teacherSettingSideContents}>
          <Panel pageName="Portal do Professor" section="Início" color="#F66B0E" />
          <div className={styles.teacherSettingInfo}>
            <div className={styles.teacherSettingCardContainer}>
              <div className={styles.teacherSettingCard}>
                <div className={styles.settingCardInfo}>
                  <div className={styles.cardInfoTitle}>
                    <h3>Preferência de Idioma</h3>
                    <div className={styles.cardInfoLine}></div>
                  </div>
                  <div className={styles.cardInfoDescription}>
                    <p>Selecione o idioma para visualização de informações no sistema.</p>
                  </div>
                  <div className={styles.cardLanguageSelect}>
                    <select>
                      <option>Português (Brasil)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.teacherSettingCard}>
                <div className={styles.settingCardInfo}>
                  <div className={styles.cardInfoTitle}>
                    <h3>Alteração de Tema</h3>
                    <div className={styles.cardInfoLine}></div>
                  </div>
                  <div className={styles.cardInfoDescription}>
                    <p>Ative o modo escuro para aliviar a fadiga ocular.</p>
                  </div>
                </div>
                <div className={styles.settingToggleContainer}>
                  <label className={styles.settingSwitch}>
                    <input type="checkbox" checked={isDarkMode} onChange={handleDarkModeToggle} />
                    <span className={styles.settingSlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.teacherSettingCard}>
                <div className={styles.settingCardInfo}>
                  <div className={styles.cardInfoTitle}>
                    <h3>Notificação por E-mail</h3>
                    <div className={styles.cardInfoLine}></div>
                  </div>
                  <div className={styles.cardInfoDescription}>
                    <p>Ative essa preferência caso deseje receber notificações via e-mail institucional.</p>
                  </div>
                </div>
                <div className={styles.settingToggleContainer}>
                  <label className={styles.settingSwitch}>
                    <input
                      type="checkbox"
                      checked={isEmailNotificationEnabled}
                      onChange={handleEmailNotificationToggle}
                    />
                    <span className={styles.settingSlider}></span>
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

export default ProfessorSettings;
