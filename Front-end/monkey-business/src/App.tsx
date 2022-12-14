import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Menu from './components/Menu'
import Blackjack from './components/Games/Blackjack'
import Dice from './components/Games/Dice'
import { isConstructorDeclaration } from 'typescript';
import { IUser } from './models/User';
import { AppService } from './services/app.service';
import axios from 'axios';

function App() {

    const appServie = new AppService();

    const[isUserLoggedIn, setLog] = useState<boolean>(false);
    const[game, setGame] = useState<string>("");
    const[view, setView] = useState<any>();
    const[user, setIUser] = useState<IUser>({
      userName:"",
      password:"",
      bananas:500
    });
    const[message, setMessage] = useState<string>("");

    async function verify(userName:string, password:string,e:React.ChangeEvent<HTMLFormElement>) {
      e.preventDefault();
      axios.get<IUser>(`http://monkeybusiness2-env.eba-6xppmvak.us-east-1.elasticbeanstalk.com/user/username?username=${userName}`)
            .then( response => {
              if(response.data){
                if(response.data.password === password){
                  console.log("success")
                  setMessage("")
                  setIUser(response.data)
                  setLog(true);
                } else {
                  console.log("incorrect password")
                  setMessage("Incorrect Username or Password")

                }
              } else {
                console.log("no data")
                setMessage("Incorrect Username or Password")
              }
            })      
    }

    if (isUserLoggedIn && game === "Blackjack"){
      return <Blackjack user={user} setIUser={setIUser} game={game} setGame={setGame}/>
    } else if (isUserLoggedIn && game === "Dice"){
      return <Dice user={user} setIUser={setIUser} game={game} setGame={setGame}/>
    }else if (!isUserLoggedIn) {
      return <Login 
        verify={verify} 
        message={message}
        setMessage={setMessage}/>
    } else {
      return <Menu 
        loginStatus={isUserLoggedIn} 
        setLog={setLog}
        game={game}
        setGame={setGame}
        user={user}
        setUSer={setIUser}

        />;
    }

    // if (isUserLoggedIn && game === "Blackjack"){
    //   <Blackjack/>
    // }
    // return (
    //   <div className="App">
    //    {view}
    //   </div>
    // );
}

export default App;
export function logIn(){}