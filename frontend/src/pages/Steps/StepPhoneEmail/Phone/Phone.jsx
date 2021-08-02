import React,{useState} from 'react'
import Card from '../../../../components/shared/Card/Card'
import Button from '../../../../components/shared/Button/Button'
import TextInput from '../../../../components/shared/TextInput/TextInput'
import styles from '../StepPhoneEmail.module.css'
import {sendOtp} from '../../../../http/index'
import {useDispatch} from 'react-redux'
import {setOtp} from '../../../../store/authSlice'

function Phone({onNext}) {

    const [phoneNumber,setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    async function submit(){
        //Request Server
        const {data} = await sendOtp({phone: phoneNumber});
        dispatch(setOtp({phone: data.phone, hash: data.hash}));
        onNext();
    }

    return (
        <Card title="Enter your Phone Number" icon="phone">
            <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
         <div>
             <div className={styles.actionButtonWrap}>
             <Button text="Next" icon="arrow-forward" onClick={submit}></Button>
             </div>
             <p className={styles.bottomParagraph}>
                 By entering your number, you're agreeing to our Terms of Service and Privacy Policy. Thanks!
             </p>
         </div>
             </Card>
    )
}

export default Phone
