import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='my'>
        <Head>
          <meta name='description' content='Grocery delivery in Myanmar' />
          <meta name='version' content='v2'/>
          <meta
            name='keywords'
            content='grocery, grocery yangon, grocery myanmar'
          />
          <meta name='theme-color' content='#eaedef' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id='loading' style={{ display: 'none' }}>
            <div className='loading'>
              <div className='logo'>
                <div className='logo-bg' />
                <img src={'/imgs/zaychin-logo.svg'} />
              </div>
              <span>အလုပ်လုပ်နေသည်...</span>
            </div>
          </div>
        </body>
      </Html>
    )
  }
}

export default MyDocument
