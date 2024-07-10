import './style.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useWas } from '../dataContext/dataContext'

function Header() {
    const [openMenu, setOpenMenu] = useState(false);
    const [hWas, setHWas] = useState(null);
    const [walletType, setWalletType] = useState(null)
    const myAccaunt = JSON.parse(localStorage.getItem('myAccaunt'));
    const { was } = useWas();

    const isWas = (res) => {
        if (myAccaunt.id === res.id && myAccaunt.email === res.email) {
            setHWas(res);
        }
    };

    useEffect(() => {
        if (myAccaunt && myAccaunt.id) {
            const storedWalletType = localStorage.getItem('walletType');
            setWalletType(storedWalletType);
            fetch(`https://nftmarket.pythonanywhere.com/api/v1/users/${myAccaunt.id}/`)
                .then(res => res.json())
                .then(data => {
                    isWas(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, []);

    let toPath;
    switch (walletType) {
        case 'binance':
            toPath = '/myWallet';
            break;
        case 'mbank':
            toPath = '/mbank';
            break;
        default:
            toPath = '/wallet';
    }

    return (
        <div className='header-container'>
            <Link to={`/`}>
                <div className={`zag ${openMenu ? 'active' : ''}`} id='toHome'>
                    <div>
                        <img src="/header-items/Storefront.png" alt="StoreFront" />
                        <img src="/header-items/home.svg" alt="home" />
                    </div>
                    <h2>NFT Market</h2>
                </div>
            </Link>

            <div className='header-buttons'>
                <Link to={'marketplace'}><img src="/header-items/market.svg" alt="market" /> Marketplace</Link>
                <Link to={'ranking'}><img src="/header-items/ranking.svg" alt="ranking" /> Rankings</Link>
                {
                    (was || hWas) ? (
                        <>
                            <Link to={toPath}><img src="/header-items/wallet.svg" alt="wallet" />Wallet</Link>
                            <Link id='toMyProdile' to="myProfile"><img src="/header-items/User.png" alt="user" />Profile</Link>
                        </>
                    ) : (
                        <>
                            <Link id='toCreateAcc' to="createAccount"><img src="/header-items/User.png" alt="user" />Sign Up</Link>
                            <Link to="signIn"><img src="/header-items/User.png" alt="user" />Sign In</Link>
                        </>
                    )
                }
            </div>

            <div className='burger-menu'>
                <div className={`poloski ${openMenu ? 'active' : ''}`} onClick={() => setOpenMenu(prev => !prev)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`exit ${openMenu ? 'active' : ''}`} onClick={() => setOpenMenu(prev => !prev)}>
                    <div className='close-button'>
                        <div className="left">|</div>
                        <div className="right">|</div>
                    </div>
                    <div className='r-m'>
                        <Link to={'marketplace'}>Marketplace</Link>
                        <Link to={'ranking'}>Rankings</Link>
                    </div>

                    <div className='sign-UI'>

                        {
                            (was || hWas) ?
                                <>
                                    <Link to={toPath}>Wallet</Link>
                                    <Link to={`myProfile`}>Profile</Link>
                                </>
                                :
                                <>
                                    <Link to={`createAccount`}>Sign Up</Link>
                                    <Link to={`signIn`}>Sign In</Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Header;
