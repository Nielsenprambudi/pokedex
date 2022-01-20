
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {seeDetail} from './store/slice/detail';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import styles from '../styles/Home.module.css';
import Layout from './layout/layout';
import NavbarLayout from './layout/navbar';
import { Search, PeopleExpand, ArrowUp } from '@rsuite/icons/lib/icons';
import {Grid, Row, Col, IconButton, Badge, Modal,
  Button, Container, Divider, Loader} from 'rsuite';
import { removePokemon } from './store/slice/mylist';
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
  @media (max-width: 768px) {
    background-color: #c7a008;
  }
`

const centerModal = css`
  text-align: center;
  align: center;
  overflow: hidden;
  word-wrap: break-word;
`

const getImage = css`
  width: 10%;
  @media (max-width: 1024px) {
    width: 20%;
  };
  @media (max-width: 768px) {
    width: 30%;
  };
  @media (max-width: 425px) {
    width: 100%;
  }
`

export default function Myownedlist() {


const router = useRouter();
const dispatch = useDispatch();
const [open, setOpen] = useState(false);
const myPoke = useSelector((state) => state.mylist);
const [pokeName, setPokeName] = useState("");
const [pokeImg, setPokeImg] = useState("");
const [catchStatus, setCatchStatus] = useState(null);

const releasePoke = (i) => {
  dispatch(removePokemon(i));
}

const onCloseModal = () => {
  setPokeName("");
  setPokeImg("");
  setOpen(false);
  setCatchStatus(null);
};


const getIntoDetail = (pdata) => {
  dispatch(seeDetail(pdata));
  router.push(`/detail?name=${pdata?.name}`);
}




  

  

  return (
    <Container>

        <Modal full size="xs" open={open} onClose={() => onCloseModal()}>
          <Modal.Header>
            <Modal.Title css={centerModal}>
              {
                catchStatus === false ?
                `${pokeName} escaped!` :
                catchStatus == true ?
                `catched ${pokeName}!` : null
              }
            </Modal.Title>
            
          </Modal.Header>
          <Modal.Body css={centerModal}>
            {
              pokeImg != "" &&
              // <Image loader={pokeImg} src={pokeImg} width={200} height={200}/>
              <img src={pokeImg} css={getImage}/>
            }
          </Modal.Body>

        </Modal>
        <div align="center">
          <h3 css={morePokemonHeader}>
              Exploring my {myPoke?.length} pokemons
          </h3>
          <Divider></Divider>

         
            <Grid>
              <Row>  
                {
                  myPoke.length > 0 &&
                  myPoke?.map((po, i) => {
                    const pokeload = ({src}) => {
                      return `${po?.image}`;
                    };
                    return (
                      <Col key={i} xs={24} sm={12} md={8} lg={6}>

                        <div css={pokeCard}>
                          <Image loader={pokeload} src={po?.image} alt={po?.name} width={200} height={200}/>
                          <br></br>
                          <h5>{po?.nickname}</h5>
                          <br></br>
                          <p>{po?.name}</p>
                          <br></br>
                            <Row>
                              <Col style={{marginTop: 5}} xs={24} sm={24} md={12} lg={12}>
                                <IconButton onClick={() => releasePoke(i)} icon={<PeopleExpand/>} color="red" appearance="primary">Remove</IconButton>
                              </Col>
                              <Col style={{marginTop: 5}} xs={24} sm={24} md={12} lg={12}>
                                <IconButton onClick={() => getIntoDetail(po)} icon={<Search/>} color="green" appearance="primary">Detail</IconButton>
                              </Col>
                            </Row>
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
              
            </Grid>
        
        </div>

    </Container>
  )
}

Myownedlist.getLayout = function getLayout(page) {
  return (
   <Layout>
     <NavbarLayout/>
      {page}
   </Layout>
  )
}
