import {Theme} from '../theme/themeGenerator';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export const getUserPrefs = async (setTheme: (theme: Theme) => void) => {
  let userPrefs = await Storage.get({ key: 'comBradleyGraberDailiesTheme' });
  let userTheme:Theme = userPrefs.value ? JSON.parse(userPrefs.value) : {name: ""};
  if (userTheme.name !== "")
    setTheme(userTheme);
}
export const saveUserPrefs = async (theme: Theme) => {
  Storage.set({key: "comBradleyGraberDailiesTheme", value: JSON.stringify(theme)});
}

export const getAppData = async (setAppData: (appData: any) => void) => {
  let localData = await Storage.get({ key: 'comBradleyGraberDailiesAppData' });
  if (localData.value) {
    setAppData(JSON.parse(localData.value));
  }
}

export const saveAppData = async (appData: any)=> {
  Storage.set({key: "comBradleyGraberDailiesAppData", value: JSON.stringify(appData)});
}
