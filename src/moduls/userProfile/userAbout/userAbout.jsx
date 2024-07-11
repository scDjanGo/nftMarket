import './style.scss';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'



function UserAbout() {
    const [user, setUser] = useState(false)
    const [userNfts, setUserNfts] = useState(false)
    const [fetching, setFetching] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        if (!id) return
        fetch(`https://nftmarket.pythonanywhere.com/api/v1/users/${id}`).then(res => {
            return res.json()
        }).then(res => {
            setUser(res)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setFetching(false)
        })

    }, [id])

    useEffect(() => {
        if (user && user.id) {
            fetch('https://nftmarket.pythonanywhere.com/api/v1/nfts/')
                .then(res => res.json())
                .then(data => {
                    setUserNfts(data.results.filter(useR => useR.user.id === user.id));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [user]);

    return (

        <div className='userAbout-container'>
            {fetching ?
                <div className='loading'>
                    <p>loading</p>
                    <img src="/marketplaceModule/loading.svg" alt="" />
                </div> : <>
                    <div className="userAbout-header">
                        <div className='user-images'>
                            <img src="/userAbout/backImg.png" alt="img" />
                            <img src={user.avatar} alt="avatar" />
                        </div>
                        <div className='about'>
                            <h2>{user.first_name}</h2>

                            <p className='b-l'>
                                Bio
                            </p>
                            <p className='comment'>
                                {user.bio}
                            </p>
                        </div>
                    </div>

                    <div className="chooseCat">
                        <Link><p>Other NFT's from this creator</p></Link>
                    </div>



                    {userNfts && userNfts.length > 0 ? (
                        <div className='userCreated-container'>

                            {userNfts.map((cart, index) => (
                                <Link to={`/nftProfile/${cart.token}`} key={index} className="cart">
                                    <div className='img-container'>
                                        <img src={cart.image} alt="img" />
                                    </div>
                                    <div className="cartAbout">
                                        <h2>{cart.name}</h2>
                                        <div className='cartCreator'>
                                            <img src={cart.user.avatar} alt="avatar" />
                                            <h5>{cart.user.first_name }</h5>
                                        </div>
                                        <div className='price'>
                                            <div>
                                                <span>Price</span>
                                                <p>{cart.price} ETH</p>
                                            </div>

                                            <button>
                                                <p>Detailed View</p>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className='emptyPageSearch'>
                            <h2>The user does not have an NFT</h2>
                        </div>
                    )}
                </>}
        </div>
    )
}

export { UserAbout }