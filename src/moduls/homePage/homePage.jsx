import GetSatrted from '../getStarted/getSatrted'
import Trending from '../trending/trending'
import TopCreators from '../topCreators/topCreators'
import Browse from '../browse/browse'
import HightLight from '../hightlight/hightlight'
import HowItWork from '../howItWork/howItWork'
import EnterEmail from '../enterEmail/enterEmail'


function HomePage() {


    return (
        <div className='container-homePage'>
          <GetSatrted  />
          <Trending />
          <TopCreators />
          <Browse />
          <HightLight />
          <HowItWork />
          <EnterEmail />
        </div>
    )
}

export {HomePage}