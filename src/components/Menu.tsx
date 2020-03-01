import {
  IonContent, IonSelect, IonSelectOption,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { today, mailSharp, calendar, paperPlaneSharp } from 'ionicons/icons';
import { themePack, Theme } from '../theme/themeGenerator';
import './Menu.css';

interface MenuProps extends RouteComponentProps {
  selectedPage: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Today',
    url: '/page/Today',
    iosIcon: today,
    mdIcon: mailSharp
  },
  {
    title: 'History',
    url: '/page/History',
    iosIcon: calendar,
    mdIcon: paperPlaneSharp
  },
];


const Menu: React.FunctionComponent<MenuProps> = ({ selectedPage, theme, setTheme }) => {
  const themeSelectionChanged = (e: any) => {
    setTheme(themePack.filter(prop => prop.name === e.detail.value)[0]);
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Dailies</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={selectedPage === appPage.title ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonItem>
          <IonLabel>Theme</IonLabel>
          <IonSelect value={theme.name} interface="popover" onIonChange={themeSelectionChanged} >
            {themePack.map((t, index) => {
              return <IonSelectOption key={index} value={t.name}>{t.name}</IonSelectOption>;
            })}
          </IonSelect>
        </IonItem>

      </IonContent>
    </IonMenu>
  );
};

export default withRouter(Menu);
