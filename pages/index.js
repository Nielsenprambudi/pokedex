
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from '../styles/Home.module.css';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

const centeringImage = css`
  display: block;
  margin-left: auto;
  margin-right: auto;

`

export default function Home() {
  const gqlQuery = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }`;

const gqlVariables = {
  limit: 2,
  offset: 1,
};
const [test, setTest] = useState([]);
const {loading, error, data} = useQuery(gqlQuery, {
  variables: gqlVariables
});
// const {loading, error, data} = useQuery(EXCHANGE_RATES);
console.log("check data", data, loading)

  // useEffect(() => {
  //   getPokemon();
  // }, []);

  

  

  return (
    <div align="center">

      <img css={centeringImage}  src="https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png" width="100%" alt="pokemon logo text png" />

    

      <br></br>
      <iframe 
        src='https://gfycat.com/ifr/AppropriateDismalEsok?controls=0&showinfo=0' 
        frameborder='0' 
        scrolling='no' 
        allowfullscreen 
        width='640' 
        height='229'
      >
      </iframe>

    
    </div>
  )
}
