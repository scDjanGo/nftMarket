import axios from 'axios'
import './style.scss'
import { useState } from 'react'
import { json } from 'react-router-dom'


function SignIn() {
    const [errorPost, setErrorPost] = useState(null)

    const [emailAdress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')

    function formObj(event) {
        const formElem = document.getElementById('signIn-form')
        const formData = new FormData(formElem)

        const form = {}
        formData.forEach((value, key) => {
            form[key] = value
        })

        const login = async (e) => {
            try {
                const response = await axios.post('https://nftmarket.pythonanywhere.com/api/v1/auth/login/', form)
                setErrorPost(null)
                document.getElementById('toHome').click()
                localStorage.setItem('myAccaunt', JSON.stringify(response.data))
            } catch (error) {
                console.error(error);
                setErrorPost(error)
            }
        }
        login()

        setEmailAddress('');
        setPassword('');
    }


    return (
        <div className='signIn-container'>
            <div className='img-container'>
                <img src="/createAccaunt/img1.png" alt="img" />
                <img src="/createAccaunt/img2.png" alt="img" />
                <img src="/createAccaunt/img3.png" alt="img" />
            </div>
            <div className="signIn-content">
                <div className="texts">
                    <h2>
                        login to account
                    </h2>
                    <p>Login to your account and continue creating, <br /> buying and collecting NFTs
                    </p>
                </div>

                <form id='signIn-form' action="" onSubmit={(e) => { e.preventDefault(); formObj() }}>

                    <label htmlFor="email">
                        <img src="/createAccaunt/message.png" alt="email" />
                        <input name='email' type="email" placeholder='Email Address' required value={emailAdress} onChange={(e) => setEmailAddress(e.target.value)} />
                    </label>

                    <label htmlFor="password">
                        <img src="/createAccaunt/lock.png" alt="lock" />
                        <input name='password' type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    {
                        errorPost ? <p className='error'>Incorrect login or password</p> : <></>
                    }

                    <button type='submit'>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignIn