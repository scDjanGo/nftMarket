import './style.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MyProfile() {
    const [me, setMe] = useState(JSON.parse(localStorage.getItem('myAccaunt')));
    const [nfts, setNfts] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [toShowEdit, setToShowEdit] = useState(false);
    const [fileName, setFileName] = useState('Choose avatar');
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorPassword, setErrorPassword] = useState(null);
    const [eP, setEP] = useState('');
    const [onCash, setOnCash] = useState(false)
    const [passwordd, setPasswordd] = useState({
        password1: '',
        password2: '',
    });
    const [baseImage64, setBaseImage64] = useState('');

    const [reqDataValue, setReqDataValue] = useState({
        password1: '',
        first_name: '',
        last_name: '',
        email: '',
        password2: '',
        phone: '',
        bio: '',
    });

    useEffect(() => {
        if (me && me.id) {
            setReqDataValue({
                ...reqDataValue,
                first_name: me.first_name,
                last_name: me.last_name,
                email: me.email,
                phone: me.phone || '',
                bio: me.bio || '',
            });
            fetch('https://nftmarket.pythonanywhere.com/api/v1/nfts/')
                .then(res => res.json())
                .then(data => {
                    setNfts(data.results.filter(user => user.user.id === me.id));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [me]);

    const formObj = async (event) => {
        event.preventDefault();

        if (reqDataValue.password1 !== reqDataValue.password2) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setErrorMessage('');

        const formElem = document.getElementById('createAccaunt-form');
        const formData = new FormData(formElem);
        formData.append('avatar', baseImage64);
        try {
            const response = await axios.patch(`https://nftmarket.pythonanywhere.com/api/v1/redactor_profile/${me.id}/`, formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                    "Authorization": `Token ${me.token}`
                },
            });
            localStorage.setItem('myAccaunt', JSON.stringify(response.data, null, 1));
            document.getElementById('toHome').click();
            setFileName('Choose avatar');
            console.log(response);
        } catch (error) {
            console.error('Error submitting the form:', error);
            if (error.response && error.response.data) {
                setErrorMessage(`Error: ${JSON.stringify(error.response.data)}`);
            } else {
                setErrorMessage('An error occurred while submitting the form. Please try again.');
            }
        }
    };

    const editPassword = async (e) => {
        e.preventDefault();

        const { password1, password2 } = passwordd;

        if (password1 !== password2) {
            setEP('Passwords do not match.');
            return;
        }

        const form = new FormData(document.getElementById('rePassword'));
        const formEditPassword = {};
        for (let [key, value] of form) {
            formEditPassword[key] = value;
        }
        console.log(formEditPassword);

        axios.patch(`https://nftmarket.pythonanywhere.com/api/v1/redactor_profile/${me.id}/`, formEditPassword, {
            headers: {
                'Content-type': 'multipart/form-data',
                "Authorization": `Token ${me.token}`
            },
        }).then(res => {
            setErrorPassword('Password updated successfully');
            setPasswordd({
                password1: '',
                password2: '',
            });
        }).catch(err => setErrorPassword('Error some input.'));
    };

    const handlePassword = (e) => {
        setPasswordd({
            ...passwordd,
            [e.target.name]: e.target.value,
        });
    };

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
        setBaseImage64(loadEvent.target.result);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        if (file) {
            setFileName(file.name);
            setFile(file);
        } else {
            setFileName('Choose avatar');
        }
    };

    const handleChange = (e) => {
        setReqDataValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleButtonClick = () => {
        document.getElementById('avatar').click();
    };

    const itemsPerPage = 12;
    const totalPages = Math.ceil(nfts?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, nfts?.length);
    const currentItems = nfts?.slice(startIndex, endIndex) || [];

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };


    useEffect(() => {
        const cashFlag = document.getElementById('cashId');
        if (cashFlag) {
            cashFlag.classList.remove('add');
        }
    }, [onCash]);

    return (
        <>
            {me ? (
                <div className='userAbout-container'>
                    <div className={`edit-profile ${toShowEdit ? 'toShowEdit' : ''}`}>
                        <form id='createAccaunt-form' onSubmit={formObj} onClick={(e) => { e.stopPropagation(); }}>
                            <img onClick={(e) => { setToShowEdit(prev => !prev); }} className='close' src="/header-items/exit.svg" alt="exit" />
                            <div>
                                <label htmlFor="first_name">
                                    <img src="/createAccaunt/user.png" alt="user" />
                                    <input
                                        name='first_name'
                                        type="text"
                                        placeholder='New first name'
                                        required
                                        value={reqDataValue.first_name}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label htmlFor="last_name">
                                    <img src="/createAccaunt/user.png" alt="user" />
                                    <input
                                        name='last_name'
                                        type="text"
                                        placeholder='New last name'
                                        required
                                        value={reqDataValue.last_name}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>

                            <div>
                                <label htmlFor="email">
                                    <img src="/createAccaunt/message.png" alt="email" />
                                    <input
                                        name='email'
                                        type="email"
                                        placeholder='New email Address'
                                        required
                                        value={reqDataValue.email}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label htmlFor="phone">
                                    <img style={{ opacity: '0.5' }} src="/createAccaunt/phone.svg" alt="phone" />
                                    <input
                                        name='phone'
                                        type="tel"
                                        placeholder='New phone number'
                                        required
                                        value={reqDataValue.phone}
                                        onChange={handleChange}
                                        pattern='[0-9+]+'
                                    />
                                </label>
                            </div>

                            <label htmlFor="bio" className='bio'>
                                <img src="/createAccaunt/user.png" alt="user" />
                                <input
                                    name='bio'
                                    type="text"
                                    placeholder='New bio'
                                    required
                                    value={reqDataValue.bio}
                                    onChange={handleChange}
                                />
                            </label>

                            {errorMessage && <p className='error-message'>{errorMessage.slice(0, 100)}</p>}

                            <div>
                                <label className='avatar-label'>
                                    <button type="button" className="custom-file-button" onClick={handleButtonClick} required>
                                        <img src="/createAccaunt/user.png" alt="avatar" />
                                        {fileName}
                                    </button>
                                    <input
                                        id="avatar"
                                        type="file"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </label>

                                <button type='submit'>
                                    Edit profile
                                </button>
                            </div>
                        </form>

                        <form id='rePassword' onSubmit={editPassword}>
                            <h2>Edit password</h2>
                            <label htmlFor="password">
                                <input name='password' type="text" placeholder='Enter your password.' required />
                            </label>
                            <div>
                                <label htmlFor="password1">
                                    <input name='password1' type="password" placeholder='New password' required onChange={handlePassword} />
                                </label>
                                <label htmlFor="password2">
                                    <input name='password2' type="password" placeholder='Repeat new password.' required onChange={handlePassword} />
                                </label>
                            </div>
                            {eP && <p>{eP}</p>}
                            {errorPassword && <p>{errorPassword}</p>}
                            <button>Edit password</button>
                        </form>
                    </div>

                    <div className="userAbout-header">
                        <div id='cashId' className={`cash ${onCash && 'on'}`}>
                            <img onClick={() => {setOnCash(prev => !prev)}} src="/wallet/cross.svg" alt="cross" />
                            <p></p>
                        </div>
                        <div className='user-images'>
                            <img src="/userAbout/backImg.png" alt="background" />
                            <img className='myAvatar' src={me.avatar} alt="avatar" />
                        </div>
                        <div className='about'>
                            <div className="stonks">
                                <div className='names'>
                                    <p>Name</p>
                                    <div><h2>{me.first_name}</h2><h2>{me.last_name}</h2></div>
                                </div>
                            </div>
                            <p className='bio'>
                                <span className='zag'>Bio</span>
                                <span className='con'>{me.bio}</span>
                            </p>
                            <div className='email'>
                                <span>Email</span>
                                <p>{me.email}</p>
                            </div>


                            <div className='email'>
                                <span>Cash</span>
                                <p>{me.cash} ETH</p>
                            </div>

                            <div className="update">
                                <button onClick={(e) => setToShowEdit(prev => !prev)}>
                                    Edit profile
                                </button>
                            </div>
                        </div>
                    </div>

                    {nfts && nfts.length > 0 ? (
                        <div className='marketplace-carts'>
                            <div className='nft-about'>
                                <p>My NFT's</p>
                                <Link to='/addNewNFT'>Add NFT</Link>
                            </div>

                            {currentItems.length > 0 ? (
                                <div className="carts">
                                    {currentItems.map((cart, index) => (
                                        <Link to={`/nftProfile/${cart.token}`} key={index} className="cart">
                                            <div className='img-container'>
                                                <img src={cart.image} alt="NFT" />
                                            </div>
                                            <div className="cartAbout">
                                                <h2>{cart.name}</h2>
                                                <div className='cartCreator'>
                                                    <img src={cart.user.avatar} alt="avatar" />
                                                    <h5>{cart.user.first_name}</h5>
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
                                    <h2>You don't have an NFT</h2>
                                    <Link to='/addNewNFT'>Add NFT</Link>
                                </div>
                            )}
                            {totalPages > 1 && (
                                <div className='pagination'>
                                    <button className={`prev ${currentPage === 1 ? 'none' : ''}`} onClick={handlePreviousPage} disabled={currentPage === 1}>
                                        <img style={{ transform: 'rotate(180deg)' }} src="/marketplaceModule/next.svg" alt="prev" />
                                    </button>
                                    <span>Page {currentPage} of {totalPages}</span>
                                    <button className={`next ${currentPage === totalPages ? 'none' : ''}`} onClick={handleNextPage} disabled={currentPage === totalPages}>
                                        <img src="/marketplaceModule/next.svg" alt="next" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='emptyPageSearch'>
                            <h2>You don't have an NFT</h2>
                            <Link to='/addNewNFT'>Add NFT</Link>
                        </div>
                    )}
                </div>
            ) : (
                <div className='loading'>
                    <p>Loading</p>
                    <img src="/marketplaceModule/loading.svg" alt="" />
                </div>
            )}
        </>
    );
}

export { MyProfile };
