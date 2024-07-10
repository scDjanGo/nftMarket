import './style.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function TopCreators() {

    const [number, setNumber] = useState(0)
    const [users, setUsers] = useState()
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        fetch(`https://nftmarket.pythonanywhere.com/api/v1/users/`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                setUsers(data.slice(0, 15).sort((a, b) => b.cash - a.cash))
                setFetching(prev => !prev)
            })
            .catch(err => console.error(err))
    }, [])

    const nums = () => {
        setNumber(prev => prev + 1)

        return number
    }

    return (
        <div className='topCreators-container'>
            <div className='topCreators-header'>
                <div>
                    <h2>Top Creators</h2>
                    <p>Checkout Top Rated Creators on the NFT <br /> Marketplace</p>
                </div>

                <Link to={'ranking'} className='toRanking'>
                    <img src="/topCreators/rocket.png" alt="rocket" />
                    <span>View Rankings</span>
                </Link>
            </div>

            {fetching ?
                <div className='loading'>
                    <p>loading</p>
                    <img src="/marketplaceModule/loading.svg" alt="" />
                </div>
                :
                <div className="creators">

                    {users.map((user, index) => (

                        <Link to={`/userAbout/${user.id}`} key={user.id} className='creator'>
                            <div className="number">{index + 1}</div>
                            <div>
                                <div className="number-inner">{index + 1}</div>
                                <img src={user.avatar} alt="avatar" />
                            </div>
                            <div className='texts'>
                                <h2>{user.first_name}</h2>
                                <div className='text'>
                                    <span>Total ETH: </span>
                                    <p> {user.cash} ETH</p>
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
            }

            <Link to={'ranking'} className='media-button'>
                <img src="/topCreators/rocket.png" alt="rocket" />
                <p>View Rankings</p>
            </Link>
        </div>
    )
}

export default TopCreators