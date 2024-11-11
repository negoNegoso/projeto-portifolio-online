import { useState } from 'react';
import Panel from '../../../components/Panel/Panel';
import Menu from '../../../components/Student/Menu/Menu';
import styles from './StudentSettings.module.css';

const StudentSettings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleEmailNotificationToggle = () => {
    setIsEmailNotificationEnabled(!isEmailNotificationEnabled);
  };

  return (
    <div className={styles.studentSettingContainer}>
      <div className={styles.studentSettingMenu}>
        <Menu studentName={'Ana Clara'} />
      </div>
      <div className={styles.studentSettingMainContent}>
        <div className={styles.studentSettingSideContents}>
          <Panel pageName="Painel do Aluno" section="Início" color="#F66B0E" />
          <div className={styles.studentSettingInfo}>
            <div className={styles.studentSettingCardContainer}>
              <div className={styles.studentSettingCard}>
                <div className={styles.settingStudentCardInfo}>
                  <div className={styles.cardInfoStudentTitle}>
                    <h3>Preferência de Idioma</h3>
                    <div className={styles.cardInfoStudentLine}></div>
                  </div>
                  <div className={styles.cardInfoStudentDescription}>
                    <p>Selecione o idioma para visualização de informações no sistema.</p>
                  </div>
                  <div className={styles.cardStudentLanguageSelect}>
                    <select>
                      <option>Português (Brasil)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.studentSettingCard}>
                <div className={styles.settingStudentCardInfo}>
                  <div className={styles.cardInfoStudentTitle}>
                    <h3>Alteração de Tema</h3>
                    <div className={styles.cardInfoStudentLine}></div>
                  </div>
                  <div className={styles.cardInfoStudentDescription}>
                    <p>Ative o modo escuro para aliviar a fadiga ocular.</p>
                  </div>
                </div>
                <div className={styles.settingStudentToggleContainer}>
                  <label className={styles.settingStudentSwitch}>
                    <input type="checkbox" checked={isDarkMode} onChange={handleDarkModeToggle} />
                    <span className={styles.settingStudentSlider}></span>
                  </label>
                </div>
              </div>

              <div className={styles.studentSettingCard}>
                <div className={styles.settingStudentCardInfo}>
                  <div className={styles.cardInfoStudentTitle}>
                    <h3>Notificação por E-mail</h3>
                    <div className={styles.cardInfoStudentLine}></div>
                  </div>
                  <div className={styles.cardInfoStudentDescription}>
                    <p>Ative essa preferência caso deseje receber notificações via e-mail institucional.</p>
                  </div>
                </div>
                <div className={styles.settingStudentToggleContainer}>
                  <label className={styles.settingStudentSwitch}>
                    <input
                      type="checkbox"
                      checked={isEmailNotificationEnabled}
                      onChange={handleEmailNotificationToggle}
                    />
                    <span className={styles.settingStudentSlider}></span>
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

export default StudentSettings;
