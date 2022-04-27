import Head from 'next/head';

export default offlinePage = () => (
    <div>
        <Head>
            <title>pokedex is offline</title>
        </Head>
        <h1 style={{textAlign: 'center'}}>
            I am sorry, it looks like you are in offline mode please check your internet connection or your flight mode
        </h1>

    </div>
)