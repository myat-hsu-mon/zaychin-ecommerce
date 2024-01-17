import Img from '../components/Img'
import styles from '../scss/StopSite.module.scss'
export default function StopSite() {
  return (
    <div className={styles.container}>
      <div>Zay Chin website အား ပြန်လည်ပြင်ဆင်နေပါသဖြင့် ခေတ္တရပ်ထားပါသည်။</div>
      <div>လူကြီးမင်း၏အော်ဒါများကို Application တွင် မှာယူနိုင်ပါသည် ။</div>
      {/* <a href='https://api.zaychin.com'>Application ရယူရန် ဤနေရာကိုနှိပ်ပါ</a> */}
      <div className={styles.subContainer}>
        <a href='https://play.google.com/store/apps/details?id=com.zaychin'  style={{ flex: .5 }}>
          <Img src='https://api.zaychin.com/frontend/play-store.png' alt='Download Zay Chin on Google Store' />
        </a>
        <a href='https://itunes.apple.com/us/app/zay-chin/id1420150360'  style={{ flex: .5 }}>
          <Img src='https://api.zaychin.com/frontend/app-store.png' alt='Download Zay Chin on App Store' />
        </a>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <a href='https://zaychin.sgp1.digitaloceanspaces.com/apks/zaychin-latest.apk' target='_blank'  style={{ flex: 1 }}>
          Download APK
        </a>
      </div>
      
    </div>
  )
}
