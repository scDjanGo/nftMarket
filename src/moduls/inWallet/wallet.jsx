import './style.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Wallet() {
    const [showBinance, setShowBinance] = useState(false)
    const [showMbank, setShowMbank] = useState(false)
    const [myToken, setMyToken] = useState(null)
    const [myProfile, setMyProfile] = useState(null)
    const [bError, setBError] = useState(false)

    useEffect(() => {
        const myAccount = JSON.parse(localStorage.getItem('myAccaunt'))
        if (myAccount) {
            setMyProfile(myAccount)
            setMyToken(myAccount.token)
        }
    }, [])

    async function sendBinance(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(`https://nftmarket.pythonanywhere.com/api/v1/binance/login/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Token ${myToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.data) {
                const updatedProfile = { ...myProfile, binance: data.data };
                localStorage.setItem('myAccaunt', JSON.stringify(updatedProfile));
                setMyProfile(updatedProfile);
                setShowBinance(prev => !prev)
            } else {
                setBError(true);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    }


    // const sendMbank = async (e) => {
    //     e.preventDefault()

    //     const form = new FormData(e.target)
    //     const formDate = {}
    //     for(let [key, value] of form) {
    //         formDate[key] = value
    //     }
    //     console.log(myToken);
    //     console.log(formDate);

    //     await fetch(`https://nftmarket.pythonanywhere.com/api/v1/mbank/login/`, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization' : `Token ${myToken}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formDate)
    //     }).then(res => console.log(res))
    //     .catch(err => console.error(err))
    // }


    async function sendMbank(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(`https://nftmarket.pythonanywhere.com/api/v1/mbank/login/`, {
                method: 'POST',
                headers: {
                    "Authorization": `Token ${myToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.data) {
                const updatedProfile = { ...myProfile, mbank: data.data };
                localStorage.setItem('myAccaunt', JSON.stringify(updatedProfile));
                setMyProfile(updatedProfile);
                setShowMbank(prev => !prev)
            } else {
                setBError(true);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    }


    return (
        <div className='wallet-container'>
            <div className={`modal-binance ${showBinance ? 'show' : ''}`}>
                <form className='form' onSubmit={sendBinance}>
                    <div onClick={() => setShowBinance(prev => !prev)}><p>|</p><p>|</p></div>
                    <input name='email' type="email" placeholder='Enter email' required />
                    <input name='password' type="password" placeholder='Enter password' required />
                    <p style={{ display: bError ? 'block' : 'none' }} className='error'>Error in login or password</p>
                    <span>
                        <button type="submit">
                            Submit
                        </button>
                    </span>
                </form>
            </div>

            <div className={`modal-mbank ${showMbank ? 'show' : ''}`}>
                <form className='form' onSubmit={sendMbank}>
                    <div onClick={() => setShowMbank(prev => !prev)}><p>|</p><p>|</p></div>
                    <input name='phone' type="tel" placeholder='Enter number' required />
                    <input name='password' type="password" placeholder='Enter password' required />
                    <span>
                        <button type="submit">
                            Submit
                        </button>
                    </span>
                </form>
            </div>

            <Link id='toBinancePage' className={`binance-button ${showBinance || showMbank ? 'none' : ''}`} onClick={() => myProfile && myProfile.binance ? null : setShowBinance(prev => !prev)} to={myProfile && myProfile.binance ? '/myWallet' : ''}>
                <img src="/wallet/binance.svg" alt="binance" />
                <h2>Binance</h2>
            </Link>
            <Link className={`mbank-button ${showBinance || showMbank ? 'none' : ''}`} onClick={() => myProfile && myProfile.mbank ? null : setShowMbank(prev => !prev)} to={myProfile && myProfile.mbank ? '/mbank' : ''} >
                <img src="/wallet/mbank.svg" alt="bybit" />
                <h2>MBANK</h2>
            </Link>
        </div>
    )
}

export { Wallet }
