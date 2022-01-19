import Head from "next/head";
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

const centeringImage = css`
  display: block;
  margin-left: auto;
  margin-right: auto;

`

export default function Layout({children}) {
    return (
        <>
            <Head>
                <title>Pokemon, Gotta Catch'em All</title>
                <meta
                name="description"
                content="Pokedex for data to hunt the pokemon"
                />
            </Head>
            <img css={centeringImage}  src="https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png" width="25%" alt="pokemon logo text png" />
            <main>{children}</main>
        </>
    )
}