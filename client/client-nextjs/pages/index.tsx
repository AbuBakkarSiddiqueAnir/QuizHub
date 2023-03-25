import { NextPage } from 'next';
import {HomeHero} from '../components'
 const Home:NextPage =()=> {
  return (
    <>

      <main>

      <HomeHero imageUrl={''} title={'Start with your confidendence'} subtitle={'When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.'} buttonText={"Try Now"} onButtonClick={()=>{}}/>

      </main>
    </>
  )
}

export default Home
