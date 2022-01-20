
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Layout from './layout/layout';
import NavbarLayout from './layout/navbar';
import { Search, PeopleExpand, ArrowUp } from '@rsuite/icons/lib/icons';
import {Grid, Row, Col, IconButton, Badge, Modal,
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

export default function Detail() {
const gqlQuery = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      message
      status
    }
  }`;
const router = useRouter();
const [name, setName ] = useState(router?.query?.name);
const {loading, error, data} = useQuery(gqlQuery, {
  variables: {
    name: name
  }
});
const [open, setOpen] = useState(false);
const [pokeName, setPokeName] = useState("");
const [pokeImg, setPokeImg] = useState("");
const [catchStatus, setCatchStatus] = useState(null);
console.log("get data detail", data, router?.query?.name);

useEffect(() => {
  setName(router?.query?.name);
}, [router?.query?.name]);

const getMorePokemon = (length) => {
  setLimitData(length + 16);
};

const catchPoke = (po) => {
  setPokeName(po?.name);
  setPokeImg(po?.image);
  setOpen(true);
  setCatchStatus(Math.random() < 0.5);
}

const onCloseModal = () => {
  setPokeName("");
  setPokeImg("");
  setOpen(false);
  setCatchStatus(null);
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
          

          <h1>detail pokemon</h1>
        
        </div>

    </Container>
  )
}

Detail.getLayout = function getLayout(page) {
  return (
   <Layout>
     <NavbarLayout/>
      {page}
   </Layout>
  )
}
