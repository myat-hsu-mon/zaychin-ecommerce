import { RecoilRoot } from 'recoil'
import Router from 'next/router'
import firebase from 'firebase/app'
import 'firebase/analytics'
import '../scss/App.scss'
import Startup from '../components/Startup'

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyD6_bsI1Dfls2UQH7E1MiW54Xmbnb96MY0',
    projectId: 'zaychin-96f98',
    appId: '1:376848267166:web:010b9578b33325cab1488f',
    measurementId: 'G-JN88BBPW6Y',
  })

  firebase.analytics()
}

if (process.env.NODE_ENV === 'production') {
  console.log = () => { }
  console.warn = () => { }
  console.error = () => { }
}

Router.onRouteChangeStart = () => {
  document.getElementById('loading').style.display = 'block'
}

Router.onRouteChangeComplete = (url) => {
  document.getElementById('loading').style.display = 'none'
}

Router.onRouteChangeError = () => {
  document.getElementById('loading').style.display = 'none'
}

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Startup>
        <Component {...pageProps} />
      </Startup>
    </RecoilRoot>
  )
}

export default MyApp
