import './style.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'



function Trending() {
    const myAccaunt = JSON.parse(localStorage.getItem('myAccaunt'));
    const [fetching, setFetching] = useState(true)
    const [me, setMe] = useState(false)
    const [nfts, setNfts] = useState(null);

    useEffect(() => {

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
        }
    }, [])

    useEffect(() => {
        if (me && me.id) {
            fetch('https://nftmarket.pythonanywhere.com/api/v1/nfts/')
                .then(res => res.json())
                .then(data => {
                    setNfts(data.results.filter(user => user.user.id === me.id).slice(0, 4));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [me]);

    return (
        <div className="myPage-container">

            {me ? (
                fetching ?
                    <div className='loading'>
                        <p>loading</p>
                        <img src="/marketplaceModule/loading.svg" alt="" />
                    </div>
                    :
                    <>
                        <div className="myPage-inner">

                            <div className="myPage">
                                <Link to={'/myProfile'}>You'r page</Link>
                            </div>
                            {nfts && nfts.length > 0 ? (
                                <div className="nfts">
                                    {nfts.map((nft, index) => (
                                        <div key={index}>
                                            <Link to={`/nftProfile/${nft.token}`}>
                                                <img src={nft.image} alt="NFT" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='emptyPageSearch'>
                                    <h2>You don't have an NFT</h2>
                                    <Link to='/addNewNFT'>Add NFT</Link>
                                </div>
                            )}


                            <div className="about">
                                <div className="logo"><img src={me.avatar} alt="avatar" /></div>

                                <div className="name">
                                    <h2>{me.first_name}</h2>
                                </div>
                            </div>

                            <div className="bio">
                                <span>Bio</span>
                                <p>{me.bio}</p>
                            </div>
                        </div>
                    </>) :
                <>
                    <div className='noMyPage'>
                        <h2>Register or log in to further surf the market</h2>
                        <div>
                            <Link to={'createAccount'}>Sign Up</Link>
                            <Link to={'/signIn'}>Sign In</Link>
                        </div>
                    </div>
                </>}

        </div>
    )
}

export default Trending