import axios from 'axios';
import './style.scss';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWas } from '../dataContext/dataContext';

function GetSatrted() {
    const { setWas } = useWas();
    const myAccaunt = JSON.parse(localStorage.getItem('myAccaunt'));

    const isToken = (res) => {
        let sad = res.data.some(item => item.key === myAccaunt.token);
        setWas(sad);
    };


    useEffect(() => {
        if (myAccaunt) {
            axios.get('https://nftmarket.pythonanywhere.com/api/v1/tokens/')
                .then(response => isToken(response))
                .catch(error => {
                    console.error('Error fetching tokens:', error);
                })
        }
    }, []);

    return (
        <div className='getSatrted-container'>

            <div className="getStarted-left">
                <h1><p>Discover</p><span> digital art & <br /></span><span> Collect NFTs</span></h1>
                <p>
                    “NFT Marketplace” : Platform for Buying and Selling Unique Digital Assets, Opening New Opportunities in the World of Arts, Technologies and Investments.</p>
                <Link to={myAccaunt ? 'marketplace' : 'createAccount'} className='getStart'>
                    <img src="/getStarted/rocket.png" alt="rocket" />
                    <p>get Started</p>
                </Link>
                <div className="schedule">
                    <div>
                        <h2>240k+</h2>
                        <p>Total Sale</p>
                    </div>
                    <div>
                        <h2>100k+</h2>
                        <p>Auctions</p>
                    </div>
                    <div>
                        <h2>240k+</h2>
                        <p>Artists</p>
                    </div>
                </div>
            </div>

            <Link to={'marketplace'} className="getStarted-right">
                <img src="/getStarted/bigImage.png" alt="img" />
                <div>
                    <h2>Space Walking</h2>
                    <div className="userAvatar">
                        <div>
                            <img src="/getStarted/avatar.png" alt="avatar" />
                            <p>Animakid</p>
                        </div>
                    </div>
                </div>
            </Link>

            <Link to={myAccaunt ? 'marketplace' : 'createAccount'} className='media-button'>
                    <img src="/getStarted/rocket.png" alt="rocket" />
                    <p>get Started</p>
                </Link>


            <div className="schedule-media">
                <div>
                    <h2>240k+</h2>
                    <p>Total Sale</p>
                </div>
                <div>
                    <h2>100k+</h2>
                    <p>Auctions</p>
                </div>
                <div>
                    <h2>240k+</h2>
                    <p>Artists</p>
                </div>
            </div>
        </div>
    )
}

export default GetSatrted