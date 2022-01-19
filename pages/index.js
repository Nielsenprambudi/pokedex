
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from '../styles/Home.module.css';
import Layout from './layout/layout';
import Navbar from './layout/navbar';
import {Grid, Row, Col, Button} from 'rsuite';



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
const {loading, error, data} = useQuery(gqlQuery, {
  variables: gqlVariables
});
const [pokeData, setPokeData] = useState(data?.pokemons?.results);

  // useEffect(() => {
  //   getPokemon();
  // }, []);

  

  

  return (
    <div align="center">
      <Grid>
        <Row>  
          {
            pokeData.length > 0 &&
            pokeData.map((po, i) => {
              return (
                <Col key={i} xs={24} sm={24} md={8} lg={8}>
                  <img src={po?.image} alt={po?.name} layout="responsive"/>
                  <br></br>
                  <h3>{po?.name}</h3>
                  <br></br>
                  <Button color="yellow" appearance="subtle">Pokemon Detail</Button>
                </Col>
              )
            })
          }
        </Row>
      </Grid>
    
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
   <Layout>
     <Navbar/>
      {page}
   </Layout>
  )
}
