import Menu from './components/Menu';
import Page from './pages/Page';
import React, { useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import applyTheme, { defaultTheme, Theme } from './theme/themeGenerator';


/* Theme variables */
import './theme/variables.css';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const getUserPrefs = async (setTheme: (theme: Theme) => void)=>{
  let userPrefs = await Storage.get({ key: 'comBradleyGraberDailiesTheme' });
  let userTheme:Theme = userPrefs.value ? JSON.parse(userPrefs.value) : {name: ""};
  if (userTheme.name !== "")
    setTheme(userTheme);
}
const saveUserPrefs = async (theme: any)=> {
  Storage.set({key: "comBradleyGraberDailiesTheme", value: JSON.stringify(theme)});
}

const App: React.FC = () => {

  const [selectedPage, setSelectedPage] = useState('');
  const [theme, setTheme] = useState(defaultTheme);
  const [appColors, setAppColors] = useState({});

  console.log(appColors);
  useEffect(() => {
    getUserPrefs(setTheme);
  }, []);

  useEffect(() => {
    saveUserPrefs(theme);
    let newColors:any = applyTheme(theme);

    setAppColors(newColors);
  }, [theme]);


  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu selectedPage={selectedPage} {...{theme, setTheme}}/>
          <IonRouterOutlet id="main">
            <Route path="/page/:name" render={(props) => {
              setSelectedPage(props.match.params.name);
              return <Page {...props} />;
            }} exact={true} />
            <Route path="/" render={() => <Redirect to="/page/Inbox" />} exact={true} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
