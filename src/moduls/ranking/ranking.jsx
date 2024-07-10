import './style.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Ranking() {
    const [users, setUsers] = useState([]);
    const [countNft, setCountNft] = useState({});
    const [nfts, setNfts] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetch(`https://nftmarket.pythonanywhere.com/api/v1/users/`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data.slice(0, 15).sort((a, b) => b.cash - a.cash));
                setFetching(false);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetch('https://nftmarket.pythonanywhere.com/api/v1/nfts/')
            .then(res => res.json())
            .then(res => {
                setNfts(res.results);
            })
            .catch(err => console.error(err));
    }, []);


    useEffect(() => {
        if (nfts) {
            const countNFTsPerUser = () => {
                const result = {};

                nfts.forEach(nft => {
                    const userId = nft.user.id;

                    if (result[userId]) {
                        result[userId]++;
                    } else {
                        result[userId] = 1;
                    }
                });

                setCountNft(result);
            };

            countNFTsPerUser();
        }
    }, [nfts]);

    return (
        <div className="ranking-container">
            <div className="ranking-header">
                <h2>Top Creators</h2>
                <p>Check out top ranking NFT artists on the NFT Marketplace.</p>
            </div>

            <div className='tag-names'>
                <p><span>#</span>Artist</p>
                <div>
                    <p>NFTs</p>
                    <p>Volume</p>
                </div>
            </div>
            
            <div className="sRanking-container">
                {fetching ?
                    <div className='loading'>
                        <p>loading</p>
                        <img src="/marketplaceModule/loading.svg" alt="loading" />
                    </div>
                    : <>
                        {users.map((user, index) => (
                            <Link to={`/userAbout/${user.id}`} key={user.id} className='user'>
                                <div className="userInfo">
                                    <div className="number">{index + 1}</div>
                                    <img src={user.avatar} alt="avatar" />
                                    <h2>{user.first_name} {user.last_name}</h2>
                                </div>
                                <div className="static">
                                    <p className="sold">{countNft[user.id] || 0} pcs</p>
                                    <div className="volume">{user.cash} ETH</div>
                                </div>
                            </Link>
                        ))}
                    </>
                }
            </div>
        </div>
    );
}

export { Ranking };
