import './style.scss';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MarketplaceModule() {
    const searchNFTRef = useRef(null);
    const [fetching, setFetching] = useState(true);
    const [defArr, setDefArr] = useState([]);
    const [nfts, setNfts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch('https://nftmarket.pythonanywhere.com/api/v1/nfts/')
            .then(res => res.json())
            .then(res => {
                setNfts(res.results);
                setDefArr(res.results);
            })
            .finally(() => {
                setFetching(false);
            });
    }, []);

    const handleShow = () => {
        const searchValue = searchNFTRef.current.value.toLowerCase();
        if (searchValue) {
            setNfts(
                defArr.filter(cart =>
                    cart.user.first_name.toLowerCase().includes(searchValue) ||
                    cart.name.toLowerCase().includes(searchValue)
                )
            );
            setCurrentPage(1)
        } else {
            setNfts(defArr);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleShow();
        }
    };

    const itemsPerPage = 24;
    const totalPages = Math.ceil(nfts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = nfts.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div className="marketpalceModuleForImg">
            {fetching ? (
                <div className='loading'>
                    <p>loading</p>
                    <img src="/marketplaceModule/loading.svg" alt="" />
                </div>
            ) : (
                <div className='marketpalceModule-container'>
                    <div className='marketpalceModule-header'>
                        <h2>Browse Marketplace</h2>
                        <p>Browse through more than 50k NFTs on the <br /> NFT Marketplace.</p>
                    </div>
                    <div className='input-container'>
                        <input
                            id='searchNFT'
                            type="text"
                            placeholder='Search your favourite NFTs'
                            ref={searchNFTRef}
                            onKeyPress={handleKeyPress}
                        />
                        <img onClick={handleShow} src="/marketplaceModule/magnifyingGlass.png" alt="glass" />
                    </div>

                    {currentItems.length > 0 ? (
                        <>
                            <div className='marketplace-carts'>
                                {currentItems.map((cart, index) => (
                                    <Link to={`/nftProfile/${cart.token}`} key={index} className="cart">
                                        <div className='img-container'>
                                            <img src={cart.image} alt="img" />
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

                            <div className={`pagination ${nfts.length < itemsPerPage ? 'none' : ''}`}>
                                <button className={`prev ${currentPage === 1 ? 'none' : ''}`} onClick={handlePreviousPage} disabled={currentPage === 1}>
                                    <img style={{ transform: 'rotate(180deg)' }} src="/marketplaceModule/next.svg" alt="prev" />
                                </button>
                                <span>Page {currentPage} of {totalPages}</span>
                                <button className={`next ${currentPage === totalPages ? 'none' : ''}`} onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    <img src="/marketplaceModule/next.svg" alt="next" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className='emptyPageSearch'>
                            <h2>There are no NFTs matching your search.</h2>
                            <p>Check back later.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export { MarketplaceModule };
