import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';


//contract "0xe7b861c335cc1dd63ac4770e0766fade251eaa30"
function App() {
  const [post, setPost] = useState("");
  const [key, setKey] = useState("EndoCCiGAvRuKTauk4FOcoNcW5oyrpDY");
  const [nfts, setNfts] = useState();


  function getKey() {
    axios.get('https://thentic.tech/api/key', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      setKey(response.data)
    })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {

    const body = {
      key: key,
      chain_id: 97,
    };

    axios.get('https://thentic.tech/api/nfts', {
      params: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      setNfts(response.data.nfts)

    }).catch((error) => {
      console.log(error)
    })

  }, [key]);

  const handleChange = (event) => {
    setPost(event.target.value);
  };

  async function mint() {
    const body = {
      key: key,
      chain_id: 97,
      contract: '0xe7b861c335cc1dd63ac4770e0766fade251eaa30',
      nft_id: nfts.filter((nft) => { return nft.status === "success" }).length,
      nft_data: JSON.stringify({ post: post, color: "orange" }),
      to: "0x682dD2a003Efea6EDA036B40BC5847217688017D",
    };
    console.log(body.nft_id)

    axios.post('https://thentic.tech/api/nfts/mint', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)

      //new tab 
      window.open(response.data.transaction_url, '_blank', 'noopener,noreferrer');
    })
      .catch((error) => {
        console.log(error)
      })
  }




  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "100vh" }}>
      <div style={{ textAlign: "center", fontSize: "2em", padding: 10 }}>
        <h1>MINERVA</h1>
      </div>


      <div style={{ paddingInline: "10%" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: "1.2em", marginBottom: 30 }}>
          <b>Collection: &nbsp; </b>   {key}
          &nbsp;
          <Button size='small' color="primary" variant="contained" onClick={() => { getKey() }}>get random</Button>
        </div>
        <TextField
          label="Type your post"
          variant="outlined"
          value={post}
          onChange={handleChange}
          fullWidth
        />
        <Button color="primary" variant="contained" onClick={() => { mint(); console.log("mint") }} fullWidth>MINT</Button>
        <br></br>
        {nfts &&
          nfts.map((nft) => (
            nft.status === "success" &&
            <div key={nft.request_id} style={{ border: `30px solid ${JSON.parse(nft.data).color}`, paddingBlock: 20 }}>
              {JSON.parse(nft.data).post}
            </div>

          ))
        }
      </div>

    </div>
  );
}

export default App;


/*
//deploy contract
 const body = {
      key: 'EndoCCiGAvRuKTauk4FOcoNcW5oyrpDY',
      chain_id: 97,
      name: 'MINERVA',
      short_name: 'MINERVA',
    };


    axios.post('https://thentic.tech/api/nfts/contract', body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)
      
    })
      .catch((error) => {
        console.log(error)
      })

*/


/*
//get deployed contracts
 const body = {
      key: 'EndoCCiGAvRuKTauk4FOcoNcW5oyrpDY',
      chain_id: 97,
    };


    axios.get('https://thentic.tech/api/contracts', {
      params: body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response)

    })
      .catch((error) => {
        console.log(error)
      })

*/