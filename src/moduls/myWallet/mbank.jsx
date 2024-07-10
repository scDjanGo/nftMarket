import './style.scss'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Mbank() {
    const [me, setMe] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [replenish, setReplenish] = useState(false)

    useEffect(() => {
        const myAccaunt = JSON.parse(localStorage.getItem('myAccaunt'));

        if (myAccaunt && myAccaunt.id) {
            fetch(`https://nftmarket.pythonanywhere.com/api/v1/users/${myAccaunt.id}`)
                .then(res => res.json())
                .then(data => {
                    setMe(data);
                    setFetching(false)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            console.error('No account information found or account ID is missing.');
        }
    }, []);

    localStorage.setItem('walletType', 'mbank')

    const toReplenish = async (e) => {
        e.preventDefault()

        const form = new FormData(e.target)
        const formData = {}
        for (let [key, value] of form) {
            formData[key] = value
        }

        const myAccaunt = JSON.parse(localStorage.getItem('myAccaunt'));
        fetch(`https://nftmarket.pythonanywhere.com/api/v1/get_money_mbank/${myAccaunt.mbank.id}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${myAccaunt.token}`,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(data => {
                localStorage.setItem('myAccaunt', JSON.stringify(data))
                document.getElementById('toMyProdile')
                    .click()
                setTimeout(() => {
                    const cashId = document.getElementById('cashId')
                    cashId.lastElementChild.innerHTML = `Your balance is replenished with ${formData.money} ETH`
                    cashId.classList.add('on')
                }, 500)

                setTimeout(() => {
                    const cashId = document.getElementById('cashId')
                    cashId.classList.remove('on')
                }, 3000)
            })
            .catch(err => console.error(err))
    }

    return (
        <div className='myWallet-container'>
            {fetching ?
                <div className='loading'>
                    <p>loading</p>
                    <img src="/marketplaceModule/loading.svg" alt="" />
                </div>
                :
                <>

                    <div className={`replenish ${replenish ? 'on' : ''}`} onClick={(e) => setReplenish(prev => !prev)}>
                        <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => toReplenish(e)}>
                            <img className='close' src="/header-items/exit.svg" alt="exit" onClick={(e) => setReplenish(prev => !prev)} />
                            <input name='money' min={0.01} type="number" placeholder='Amount to fill in ETH' required step="any" />
                            <button>Transfer money</button>
                        </form>
                    </div>

                    <div className='wallet'>
                        <div className="wallet-about">
                            <div className="content">
                                <h2><img src="/wallet/mbank.svg" alt="bybit" />MBank</h2>
                                <img src={me.mbank.avatar} alt="avatar" />
                                <div className='names'><h2>{me.first_name}</h2><h2>{me.last_name}</h2></div>
                                <p className='email'>{me.email}</p>
                                <p className='number'>{me.phone}</p>
                                <div className='cash'>
                                    <h3>{me.mbank.price} ETH</h3>
                                    <button onClick={(e) => setReplenish(prev => !prev)}>Replenish balance<img src="/wallet/cash.svg" alt="cash" /></button>
                                </div>
                            </div>
                            <Link className='choose-wallet' to={`/wallet`}>
                                Choose wallet
                            </Link>
                        </div>
                    </div>
                </>}
        </div>
    )
}

export { Mbank }