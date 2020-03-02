import { IonButtons, IonContent, IonHeader, IonSegment, IonSegmentButton, IonLabel, IonRow, IonCol, IonGrid,
  IonMenuButton, IonPage, IonTitle, IonToolbar, IonItem, IonCheckbox } from '@ionic/react';
import React, {useState} from 'react';
import './Page.css';

const Page: React.FC<any> = ({ match, setAppData, appData }) => {
  const ampmSplitTime = 14;
  const [ampmselected, setAmpmSelected] = useState(new Date().getHours() < ampmSplitTime ? "amTasks" : "pmTasks");

  const dateString = new Date().toLocaleDateString("en-us");
  if (!appData[dateString])
    return <IonPage></IonPage>;

  const checked = (e: any) => {
    setAppData((v:any) => {
      v[dateString][ampmselected].forEach((task: any) => {if (task.name === e.detail.value) task.value = e.detail.checked})
      return {...v};
    })
  }
  const ampmChanged = (e: any) => {
    if (e.detail && e.detail.value)
      setAmpmSelected(e.detail.value)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar mode="ios">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{new Intl.DateTimeFormat('en-US', {weekday: "long", month: "long", year: "numeric", day: "numeric"}).format(new Date())}</IonTitle>
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
