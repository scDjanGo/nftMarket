import './style.scss'

import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'


function Buy() {
    const { token } = useParams()
    const [fetching, setFetching] = useState(true)
    const [nft, setNft] = useState(null)
    const myToken = JSON.parse(localStorage.getItem('myAccaunt')).token


    useEffect(() => {
        fetch(`https://nftmarket.pythonanywhere.com/api/v1/nfts/${token}`).then(res => {
            return res.json()
        }).then(res => {
            setNft(res)
        }).finally(() => {
            setFetching(false)
        })

    }, [])

    const getBuy = async (e) => {
        fetch(`https://nftmarket.pythonanywhere.com/api/v1/nft_buy/${nft.token}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${myToken}`,
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
        .then(data => {

            if(data.error) {
                alert("You don't have enough funds.")
            }else {
                const goBack = document.getElementById('buyToback')
                goBack.click()
            }
            const goBack = document.getElementById('buyToback')
            goBack.click()
        })
        .catch(err => console.error(err))
    }


    return (
        <div className="buy-container">
            {fetching ?
                <div className='loading'>
                    <p>loading</p>
                    <img src="/marketplaceModule/loading.svg" alt="" />
                </div>
                :
                <>
                    <div className='buy'>
                        <Link id='buyToback' to={`/nftProfile/${nft.token}`}>Go Back</Link>
                        <div className='nft'>
                            <div className='img'><img src={nft.image} alt="img" /></div>
                            <h2 className='name'>{nft.name}</h2>
                            <p className='description' dangerouslySetInnerHTML={{ __html: nft.description }} />

                            <button onClick={getBuy}>Buy:<p className='price'>{nft.price} ETH</p></button>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export { Buy }