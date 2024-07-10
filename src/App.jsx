import './index.scss';

import { Routes, Route, } from 'react-router-dom';
import { WasProvider } from './moduls/dataContext/dataContext';
import useScrollToTop from './moduls/scrollTop/scrollTop';


import { HomePage } from './moduls/homePage/homePage';


import CreateAccaunt from './moduls/createAccaunt/createAccaunt'
import SignIn from './moduls/signIn/signIn'

import { UserAbout } from './moduls/userProfile/userAbout/userAbout';
import { NftProfile } from './moduls/NFTprofile/nftprofile';
import { Layout } from './moduls/layout/layout';
import { MarketplaceModule } from './moduls/marketplaceModule/marketplaceModule';
import { Categories } from './moduls/categories/categories';
import { Ranking } from './moduls/ranking/ranking';
import { Wallet } from './moduls/inWallet/wallet';
import { MyWallet } from './moduls/myWallet/myWallet';
import { Mbank } from './moduls/myWallet/mbank';
import { MyProfile } from './moduls/myProfile/myProfile';
import { AddNFT } from './moduls/addNFT/addNFT';
import { Buy } from './moduls/buy/buy';

function App() {
  useScrollToTop()

  return (
    <WasProvider>
      <div className="App">
        <div>
          <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<HomePage />} />
              <Route path='ranking' element={<Ranking />} />
              <Route path='marketplace' element={<MarketplaceModule />} />
              <Route path='category' element={<Categories />}>
                <Route path=':category' element={<Categories />} />
              </Route>
              <Route path='signIn' element={<SignIn />} />
              <Route path='createAccount' element={<CreateAccaunt />} />
              <Route path='wallet' element={<Wallet />} />
              <Route path='myWallet' element={<MyWallet />} />
              <Route path='mbank' element={<Mbank/>}/>
              <Route path='myProfile' element={<MyProfile />} />
              <Route path='addNewNFT' element={<AddNFT />} />
              <Route path='buy' element={<Buy />}>
                <Route path=':token' element={<Buy />} />
              </Route>
              <Route path='nftProfile' element={<NftProfile />} >
                <Route path=':token' element={<NftProfile />} />
              </Route>
              <Route path='userAbout' element={<UserAbout />}>
                <Route path=':id' element={<UserAbout />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </WasProvider>
  );
}

export default App;
