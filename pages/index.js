
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from '../styles/Home.module.css';
import Layout from './layout/layout';
import NavbarLayout from './layout/navbar';
import { Search, PeopleExpand } from '@rsuite/icons/lib/icons';
import {Grid, Row, Col, IconButton, Badge,
  Button, Container, Divider, Loader} from 'rsuite';
/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react';

const morePokemonHeader = css`
  font-style: italic;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: lighter
`;

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

const pokeCard = css`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #c7a008;
    animation: ${bounce} 1s ease;
  }
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

// const gqlVariables = {
//   limit: 16,
//   offset: 1,
// };
const [limitData, setLimitData ] = useState(16);
const {loading, error, data} = useQuery(gqlQuery, {
  variables: {
    limit: limitData,
    offset: 1
  }
});

const getMorePokemon = (length) => {
  setLimitData(length + 16);
}




  

  

  return (
    <Container>

     
        <div align="center">
          <h3 css={morePokemonHeader}>
            {
              loading ?
              `Waiting Calculating Pokemons...` :
              `Exploring ${data?.pokemons?.results.length} from ${data?.pokemons?.count} Pokemons`
            }
          </h3>
          <Divider></Divider>

          {
            loading ?
            <Loader center content="Getting Pokemon..." vertical size="lg"/> :
            <Grid>
              <Row>  
                {
                  data?.pokemons?.results.length > 0 &&
                  data?.pokemons?.results.map((po, i) => {
                    const pokeload = ({src}) => {
                      return `${po?.image}`;
                    };
                    return (
                      <Col key={i} xs={24} sm={12} md={8} lg={6}>

                        <div css={pokeCard}>
                          <Badge content={`Have 1`}>
                            <Image loader={pokeload} src={po?.image} alt={po?.name} width={200} height={200}/>
                          </Badge>
                          <br></br>
                          <h5>{po?.name}</h5>
                          <br></br>
                            <Row>
                              <Col style={{marginTop: 5}} xs={24} sm={24} md={12} lg={12}>
                                <IconButton icon={<PeopleExpand/>} color="red" appearance="primary">Catch</IconButton>
                              </Col>
                              <Col style={{marginTop: 5}} xs={24} sm={24} md={12} lg={12}>
                                <IconButton icon={<Search/>} color="green" appearance="primary">Detail</IconButton>
                              </Col>
                            </Row>
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
              {
                data?.pokemons?.results.length < data?.pokemons.count &&
                <Button color="blue" appearance='primary' onClick={() => getMorePokemon(data?.pokemons?.results.length)}>
                  Load More Pokemon..
                </Button>
              }
            </Grid>
          }
        
        </div>

    </Container>
  )
}

Home.getLayout = function getLayout(page) {
  return (
   <Layout>
     <NavbarLayout/>
      {page}
   </Layout>
  )
}
