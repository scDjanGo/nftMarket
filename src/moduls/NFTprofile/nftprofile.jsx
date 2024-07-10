import './style.scss'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function NftProfile() {
    const myAccaunt = JSON.parse(localStorage.getItem('myAccaunt'))
    const div = useRef()
    const [fetching, setFetching] = useState(true)
    const { token } = useParams()
    const [nft, setNft] = useState(null)
    const [userNft, setUserNft] = useState([])
    const [minted, setMinted] = useState('')
    const [ifMe, setIfMe] = useState(null)
    const [editButton, setEditButton] = useState(true)
    const [delButton, setdelButton] = useState(true)
    const [editNft, setEditNft] = useState({
        price: '',
        description: '',
    })

    const Top = (e) => {
        setNft(e)

        window.scrollTo({
            top: '0',
            behavior: 'smooth'
        })
    }


    useEffect(() => {
        fetch(`https://nftmarket.pythonanywhere.com/api/v1/nfts/${token}`).then(res => {
            return res.json()
        }).then(res => {
            setNft(res)
            setEditNft({
                price: res.price,
                description: res.description.replace(/<\/?[^>]+(>|$)/g, "").replace('&nbsp;', ''),
            })
            const date = new Date(res.created_at);
            const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            setMinted(formattedDate);
        }).finally(() => {
            setFetching(false)
        })

    }, [])


    useEffect(() => {
        if (nft && nft.user && nft.user.id) {
            fetch(`https://nftmarket.pythonanywhere.com/api/v1/nfts/?user.id=${nft.user.id}`)
                .then(response => response.json())
                .then(data => {
                    setUserNft(data.results.filter(elem => elem.user.id === nft.user.id && elem.token !== nft.token))
                    const me = JSON.parse(localStorage.getItem('myAccaunt'))
                    if (me.id === nft.user.id) {
                        setIfMe(true)
                    } else {
                        setIfMe(false)
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [nft]);

    const handleChange = (e) => {
        setEditNft((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const sumbitToEdit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const formEdit = {};
        for (let [key, value] of form) {
            formEdit[key] = value;
        }

        let user = localStorage.getItem('myAccaunt')
        if (!user) return
        user = JSON.parse(user)
        fetch(`https://nftmarket.pythonanywhere.com/api/v1/nfts/${nft.token}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formEdit)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const delFunc = async (e) => {
        e.preventDefault()

        let user = localStorage.getItem('myAccaunt')
        if (!user) return
        user = JSON.parse(user)

        fetch(`https://nftmarket.pythonanywhere.com/api/v1/nfts/${nft.token}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${user.token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => {
            document.getElementById('toMyProdile')
                .click()
                setTimeout(() => {
                    const cashId = document.getElementById('cashId')
                    cashId.lastElementChild.innerHTML = `NFT has been removed`
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
        !fetching ?
            <div ref={div} className='nftProfile-container'>
                {
                    fetching
                        ?
                        <div className='loading'>
                            <p>loading</p>
                            <img src="/marketplaceModule/loading.svg" alt="" />
                        </div>
                        :
                        <>
                            <div className={`edit-nft `}>
                                <div className='edit-container'>
                                    <div className={`edit ${editButton ? '' : 'on'}`}>
                                        <form id='edit' onSubmit={(e) => sumbitToEdit(e)}>
                                            <img onClick={(e) => { setEditButton(prev => !prev) }} className='close' src="/header-items/exit.svg" alt="exit" />
                                            <img className='nft-image' src={nft.image} alt="nft-img" />
                                            <p>Price</p>
                                            <input name='price' type="text" placeholder='New NFT price' value={editNft.price} onChange={handleChange} required />
                                            <p>Description</p>
                                            <input name='description' type="text" placeholder='New NFT description' value={editNft.description} onChange={handleChange} />
                                            <button>
                                                Edit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>


                            <div className={`del-nft `}>
                                <div className={`del-container ${delButton ? '' : 'on'}`}>
                                    <div className={`del`}>
                                        <h2>Are you sure you want to delete this NFT?</h2>
                                        <img onClick={(e) => { setdelButton(prev => !prev) }} className='close' src="/header-items/exit.svg" alt="exit" />
                                        <img className='nft-image' src={nft.image} alt="nft-img" />
                                        <div>
                                            <span>Name</span>
                                            <p>{nft.name}</p>
                                            <span>Price</span>
                                            <p>{editNft.price} ETH</p>
                                            <span>Description</span>
                                            <p dangerouslySetInnerHTML={{ __html: nft.description }} />
                                        </div>
                                        <button onClick={delFunc}>Delete</button>
                                    </div>
                                </div>
                            </div>

                            <div className='img-container'>
                                <img className='nftImg' src={nft.image} alt="img" />
                            </div>
                            <div className="discription">

                                <div className='zag'>
                                    <h2>{nft.name}</h2>
                                    <p>Minted on {minted}</p>
                                </div>

                                <Link to={myAccaunt ? `/buy/${nft.token}` : '/createAccount'} className={`buy-nft ${ifMe ? '' : 'notMe'}`}>
                                    <button>Buy: {nft.price} ETH</button>
                                </Link>

                                <div className={`buy-nft ${ifMe ? 'notMe' : ''}`}>
                                    <button onClick={(e) => { setEditButton(prev => !prev) }}>Edit NFT</button>
                                    <button onClick={(e) => { setdelButton(prev => !prev) }}>Delete NFT</button>
                                </div>

                                <div className='creator'>
                                    <p>Created By</p>
                                    <div>
                                        <img src="/nftProfile/avatar.png" alt="avatar" />
                                        <p>{nft.user.first_name}</p>
                                    </div>
                                </div>

                                <div className="discription-text">
                                    <span>Description</span>

                                    <p dangerouslySetInnerHTML={{ __html: nft.description }} />
                                </div>

                                <div className="tags">
                                    <span>
                                        Tags
                                    </span>
                                    <div>
                                        {nft.tags.map((tag, index) => (
                                            <p key={index}>{tag.name}</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="more">
                                    <p>More from this artist</p>
                                    <Link to={ifMe ? '/myProfile' : `/userAbout/${nft.user.id}`}>
                                        <img src="/nftProfile/arrow.png" alt="ethernet" />
                                        <p>Go To Artist Page</p>
                                    </Link>
                                </div>

                                {userNft.length > 0 ? (
                                    <div className='nfts'>
                                        {userNft.map((elem, index) => (
                                            <Link onClick={(e) => Top(elem)} key={index} className="cart">
                                                <div className='cartImg-container'>
                                                    <img src={elem.image} alt="img" />
                                                </div>
                                                <div className="cartAbout">
                                                    <h2>{elem.name}</h2>
                                                    <div className='cartCreator'>
                                                        <img style={{ borderRadius: '5px' }} src={elem.user.avatar} alt="avatar" />
                                                        <h5>{elem.user.first_name}</h5>
                                                    </div>
                                                    <div className='price'>
                                                        <div>
                                                            <span>Price</span>
                                                            <p>{elem.price} ETH</p>
                                                        </div>

                                                        <button>
                                                            <p>Detailed View</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>) :
                                    <div className='emptyPageSearch'>
                                        <h2>The user does not have any other NFTs,</h2>
                                        <p>Check back later.</p>
                                    </div>}


                                <Link className='media-button' to={ifMe ? '/myProfile' : `/userAbout/${nft.user.id}`}>
                                    <img src="/nftProfile/arrow.png" alt="ethernet" />
                                    <p>Go To Artist Page</p>
                                </Link>

                            </div>
                        </>}
            </div>
            :

            <div className='loading'>
                <p>Loading...</p>
                <img src="/marketplaceModule/loading.svg" alt="Loading" />
            </div>
    )
}

export { NftProfile }
