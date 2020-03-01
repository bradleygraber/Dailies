import {Theme} from '../theme/themeGenerator';
import {amTasks, pmTasks} from './tasks';
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
  let tempAppData = localData.value ? JSON.parse(localData.value) : {[new Date().toLocaleDateString("en-us")]: {amTasks:[...amTasks], pmTasks:[...pmTasks]}};
  tempAppData = tempAppData[new Date().toLocaleDateString("en-us")] ? tempAppData : {...tempAppData, [new Date().toLocaleDateString("en-us")]: {amTasks:[...amTasks], pmTasks:[...pmTasks]}};
  setAppData(tempAppData);
}
export const saveAppData = async (appData: any)=> {
  Storage.set({key: "comBradleyGraberDailiesAppData", value: JSON.stringify(appData)});
}
