import React,{useState} from 'react'
import Phone from './Phone/Phone.jsx'
import Email from './Email/Email.jsx'
import styles from './StepPhoneEmail.module.css'

const phoneEmailMap  = {
    phone: Phone,
    email: Email
}

const StepPhoneEmail = ({onNext}) => {
   const [type,setType] = useState('phone');

   const Component = phoneEmailMap[type];

   return (
       <>
        <div className={styles.cardWrapper}>
            <div>
                <div className={styles.buttonWrap}>
                    <button className={`${styles.tabButton}${type === 'phone' ? styles.active : ''}`} onClick= {() => setType('phone')}>
                        <img src="/images/phone-white.png" alt="phone-alt" />
                    </button>
                    <button className={`${styles.tabButton}${type === 'email' ? styles.active : ''}`} onClick= {() => setType('email')}>
                    <img src="/images/mail-white.png" alt="email-alt" />
                    </button>
                </div>
                <Component onNext={onNext}/>
            </div>
        </div>
       
       </>
   )
}

export default StepPhoneEmail
