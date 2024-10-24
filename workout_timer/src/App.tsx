import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { showHelp } from 'yargs';
import { func } from 'prop-types';

function SetUpTimer({workoutTime, setWorkoutTime, restTime, setRestTime, reps, setReps, setShowTimer}:
  {workoutTime: number; setWorkoutTime: React.Dispatch<React.SetStateAction<number>>;
  restTime: number; setRestTime: React.Dispatch<React.SetStateAction<number>>;
  reps: number; setReps: React.Dispatch<React.SetStateAction<number>>; setShowTimer: React.Dispatch<React.SetStateAction<boolean>>;}){

  return (
  <div>
  <h1> Workout Timer </h1>
    <ul>
      <li>Workout Interval (seconds): <input value={workoutTime} onChange={e => setWorkoutTime(parseInt(e.target.value))}></input></li>
      <li>Rest Interval (seconds): <input value={restTime} onChange={e => setRestTime(parseInt(e.target.value))}></input></li>
      <li>Repetitions: <input value={reps} onChange={e => setReps(parseInt(e.target.value))}></input></li>
    </ul>
    <button onClick={e => setShowTimer(true)}>Start</button>
    </div>
  );
}

function Timer({workoutTime, restTime, reps, setShowTimer}:
  {workoutTime: number;
  restTime: number;
  reps: number;
  setShowTimer: React.Dispatch<React.SetStateAction<boolean>>}){
    const [currTime, setCurrTime] = useState<number>(8000);
    const [useWorkoutTime, setUseWorkoutTime] = useState<boolean>(true);
    const [completedReps, setCompletedReps] = useState<number>(0);

    let timer = Date.now();
    
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrTime((currTime) => {
          if (currTime > 0) {
            return currTime - 100;
          } else {
            if (useWorkoutTime) {
              setUseWorkoutTime(false);
              return workoutTime * 1000;
            } else {
              setCompletedReps((completedReps) => completedReps + 1); 
              setUseWorkoutTime(true);
              return restTime * 1000;
            }
          }
        });
      }, 100);
    
      return () => clearInterval(intervalId);
    }, [useWorkoutTime, workoutTime, restTime, completedReps]);
    
    function reset(){
      setCompletedReps(0);
      setCurrTime(8000);
    }

    function returnToEdit(){
      setShowTimer(false);
      reset();
    }
  


    return (
      <div>
        {reps <= completedReps ? <div><h1>Good job!</h1><button onClick={(e)=>returnToEdit()}>Edit Times</button> 
        <button onClick={reset}>Reset</button></div> :
        <div><h1>{completedReps} of {reps} Repetitions Completed</h1>
        <h1><span style={{ fontSize: '100px' }}> {Math.floor(currTime / 1000)}</span> 
        <sup>{currTime % 1000 / 100}</sup> </h1></div>}
      </div>
    );

}

function App() {
  const [workoutTime, setWorkoutTime] = useState<number>(1);
  const [restTime, setRestTime] = useState<number>(1);
  const [reps, setReps] = useState<number>(1);
  const [showTimer, setShowTimer] = useState<boolean>(false);

  return (
    <div className="App">
      <header className="App-header">
      {showTimer ? <Timer workoutTime={workoutTime} setShowTimer={setShowTimer} restTime={restTime} reps={reps}/> : <SetUpTimer workoutTime={workoutTime} setWorkoutTime={setWorkoutTime}
      restTime={restTime} setRestTime={setRestTime} reps={reps} setReps={setReps} setShowTimer={setShowTimer} />}
        
       
      
      </header>
    </div>
  );
}

export default App;
