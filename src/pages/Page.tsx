import { IonButtons, IonContent, IonHeader, IonSegment, IonSegmentButton, IonLabel, IonRow, IonCol, IonGrid,
  IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonCheckbox, IonIcon, IonButton } from '@ionic/react';
import React, {useState} from 'react';
import './Page.css';
import { arrowBackCircleOutline, arrowForwardCircleOutline } from 'ionicons/icons';
import {amTasks, pmTasks} from '../data/tasks';

const Page: React.FC<any> = ({ match, setAppData, appData }) => {
  const ampmSplitTime = 14;
  const daySplitTime = 2;

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);

  const [ampmselected, setAmpmSelected] = useState(new Date().getHours() < ampmSplitTime ? "amTasks" : "pmTasks");
  const [visibleDate, setVisibleDate] = useState(new Date().getHours() >= daySplitTime ? today : yesterday);
  const [blockInput, setBlockInput] = useState(false);

  const dateString = visibleDate.toLocaleDateString("en-us");

  const checked = (e: any) => {
    if (blockInput)
      return;

    setAppData((v:any) => {
      console.log(v);
      v[dateString][ampmselected].forEach((task: any) => {if (task.name === e.detail.value) task.value = e.detail.checked})
      return {...v};
    })
  }
  const ampmChanged = (e: any) => {
    if (e.detail && e.detail.value)
      setAmpmSelected(e.detail.value)
  }

  const setVisibleDateWithBlocking = async (change: number) => {
    await setBlockInput(true);
    await setVisibleDate(v => {
      v.setDate(v.getDate() + change);
      return new Date(v);
    });
    setBlockInput(false);
  };
  const dateChanged = (e: any) => {
    if (e.currentTarget.id === "dateBack") {
      setVisibleDateWithBlocking(-1);
    }
    if (e.currentTarget.id === "dateForward") {
      setVisibleDateWithBlocking(1);
    }
  }

  if (!appData[dateString]) {
    setAppData((v:any) => {return {...v, [dateString]: {amTasks: [...amTasks], pmTasks: [...pmTasks]}}});
    return <IonPage></IonPage>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButton id="dateBack" slot="start" fill="clear" class="ion-no-margin ion-padding-horizontal" onClick={dateChanged}>
            <IonIcon slot="icon-only" icon={arrowBackCircleOutline} />
          </IonButton>
          <IonButton id="dateForward" slot="end" fill="clear" class={visibleDate.toLocaleDateString("en-us") === new Date().toLocaleDateString("en-us") ? "ion-no-margin ion-padding-horizontal ion-hide" : "ion-no-margin ion-padding-horizontal"} onClick={dateChanged}>
            <IonIcon slot="icon-only" icon={arrowForwardCircleOutline} />
          </IonButton>
          <IonTitle>{new Intl.DateTimeFormat('en-US', {weekday: "long", month: "long", year: "numeric", day: "numeric"}).format(visibleDate)}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSegment onIonChange={ampmChanged} mode="ios" value={ampmselected}>
          <IonSegmentButton value="amTasks">
            <IonLabel>AM Tasks</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pmTasks">
            <IonLabel>PM Tasks</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <IonGrid class={ampmselected==="amTasks" ? "" : "ion-hide"}><IonRow>
            {appData[dateString].amTasks.map((task: any, index: any) => {
              return (
                <IonCol key={task.name}>
                <IonItem >
                  <IonLabel>{task.name}</IonLabel>
                  <IonCheckbox slot="end" value={task.name} checked={task.value} onIonChange={checked}/>
                </IonItem></IonCol>)
            })}
        </IonRow></IonGrid>
        <IonGrid class={ampmselected==="pmTasks" ? "" : "ion-hide"}><IonRow>
            {appData[dateString].pmTasks.map((task: any, index: any) => {
              return (
                <IonCol key={task.name}>
                <IonItem>
                  <IonLabel>{task.name}</IonLabel>
                  <IonCheckbox slot="end" value={task.name} checked={task.value} onIonChange={checked} />
                </IonItem></IonCol>)
            })}
        </IonRow></IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Page;
