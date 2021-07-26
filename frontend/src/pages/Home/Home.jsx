import React from 'react'
import styles from './Home.module.css'
import {Link,useHistory} from 'react-router-dom'
import Card from '../../components/shared/Card/Card'
import Button from '../../components/shared/Button/Button'

const Home = () => {

  const signInLink = {
    color: '#0077ff',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '10px'
  };

  const history = useHistory();
  
  function startRegister(){
    history.push('/register');
  }

    return (
       <div className={styles.cardWrapper}>
          <Card title="Welcome to Codershouse!" icon="logo">
          <p className={styles.text}>
               We're working hard to get Codershouse ready for everyone! While 
               we wrap up the finishing project touches, we're adding people gradually
                to make sure nothing breaks
           </p>
         <Button onClick={startRegister} text="Get your username" icon="arrow-forward"></Button>
           <div className={styles.signinWrapper}>
               <span className={styles.hasInvite}>Have an invite text?</span>
               <Link to ="/login" style={signInLink}>Sign In</Link>
           </div>
             </Card>
       </div>
    );
}

export default Home
