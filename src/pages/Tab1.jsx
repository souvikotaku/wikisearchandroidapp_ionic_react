import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import {Input,Card} from 'antd';
import {Row,Col,Button} from 'react-bootstrap';
// import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Link} from 'react-router-dom';



const Tab1 = () => {


  const [query, setQuery] = useState("");
  const [searchResults, setSearchresults] = useState([]);

  useEffect(() => {
    axios
      .post(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${query}
  `
      )
      .then((res) => {
        console.log(res.data.query.search);
        setSearchresults(res.data.query.search);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query]);




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wikisearch App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen  >
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <div style={{display:'flex',justifyContent:'center', position: 'fixed', backgroundColor:'white',width:'100%',paddingBottom:'2rem'}}>

          <Row style={{backgroundColor:'white',width:'100%'}}>
            <Col md={12} style={{display:'flex',justifyContent:'center',color:'black'}}>
            <p style={{marginTop:'10px',fontWeight:'bold'}}><i>Wikisearch</i></p>
            </Col>
            <Col md={12} style={{textAlign:'center'}}>
            <input 
            style={{width:'90%',height:'2.5rem',fontSize:'20px'}}
            onChange={(event) => {
            setQuery(event.target.value);
          }}/>
              </Col>
          </Row>
          
       
        </div>
        <div style={{padding: '1rem',backgroundColor:'white',marginTop:'7rem',height:'fit-content',marginBottom:'-9.5rem'}}>
          {searchResults.length > 0 ? (
            searchResults.map((result,i)=>{

              return(
                 <Card key={i} style={{display:'flex',justifyContent:'center',backgroundColor:'white',color:'black',paddingLeft:'10px',paddingRight:'10px',marginBottom:'10px',borderRadius:'5px',border:'2px solid lightgrey'}}>
                   <p style={{ fontWeight: "bold",marginTop:'5px' }}>{result.title}</p>
                  <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
                  <a target="_blank"  href={`https://en.wikipedia.org/?curid=${result.pageid}`}><Button className="btn-success" style={{width:'100%',marginBottom:'10px'}}>Read More</Button></a>
                 </Card>
              )
            })
          ) : (
            <>
          <div style={{display:'flex',justifyContent:'center',color:'black',height:'69.5vh'}}>
            <p>Search Something</p>
           </div>
           
           </>
           )}
        </div>
        <div style={{display:'flex',justifyContent:'center', position: 'fixed',backgroundColor:'white',width:'100%',bottom:'0px'}}  >
        <p style={{color:'black',fontWeight:'bold'}}>Made by Souvik Das</p>
        </div>
        
      </IonContent>

    </IonPage>
  );
};

export default Tab1;
