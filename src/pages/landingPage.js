import React, { useState, useEffect, useMemo } from 'react';
import BackToTop from "react-back-to-top-button";
import { Link } from 'react-scroll';
import Axios from "axios";
import { FaApple, FaFacebookF, FaHome, FaInfo, FaInstagram, FaMusic, 
    FaPhoneAlt, FaSpotify, FaVideo, FaYoutube } from 'react-icons/fa';
import Moment from 'react-moment';
import Favicon from 'react-favicon';
import { toast } from 'toast-notification-alert';
import Pagination from '../pagination/pagination';
import Audio from "./bgAudio";
import {Helmet} from "react-helmet-async";
import $ from 'jquery'; 
import { slide as Menu } from 'react-burger-menu';

let PageSize = 6;
let currentDate = new Date();
let apiKey = "95b2a5a4-08b5-4b58-95dd-f0d0f334e588";

export default function LandingPage() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");

    const [navbar, setNavbar] = useState(false);
    const [allReleases, setAllReleases] = useState([]);
    let [allVideos, setAllVideos] = useState([]);
    let [searchVid, setSearchVid] = useState('');
    const [currentPageRls, setCurrentPageRls] = useState(1);
    const [currentPageVid, setCurrentPageVid] = useState(1);
    let [searchRls, setSearchRls] = useState('');

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const changeBackground = () => {
        if (window.scrollY >= 700) {
          setNavbar(true)
        } else {
          setNavbar(false)
        }
    }
    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground)
    });
    useEffect(async() => {
        const result_rls = await Axios.get('https://sofmusic-backend.herokuapp.com/release/allReleases');
        setAllReleases(result_rls.data);
      },[]);
      useEffect(async() => {
        const result_vid = await Axios.get('https://sofmusic-backend.herokuapp.com/video/allVideos');
        setAllVideos(result_vid.data);
      },[]);
    let reverseTab = [];
    for (let i = allReleases.length - 1; i >=0; i--) {
       reverseTab.push(allReleases[i]);
    }
    const currentRlsData = useMemo(() => {
        const firstPageIndex = (currentPageRls - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return reverseTab.slice(firstPageIndex, lastPageIndex);
      }, [currentPageRls, reverseTab]);
      let reverseTabV = [];
      for (let i = allVideos.length - 1; i >=0; i--) {
        reverseTabV.push({ytbVidUrl: allVideos[i].ytbVidUrl});
      }
      const currentVidData = useMemo(() => {
        const firstPageIndex = (currentPageVid - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return reverseTabV.slice(firstPageIndex, lastPageIndex);
      }, [currentPageVid, reverseTabV]);

      const sendMessage = async (e) => {
          e.preventDefault();
          try {
            const msgToSend = {
                fullName,
                email,
                content
            };
            if (email && fullName && content) {
                $.ajax("https://isitarealemail.com/api/email/validate?email=" +
                email,
    {
     crossDomain: true,
     headers: {
         Authorization: "Bearer " + apiKey
     }
    })
    .then(function responseHandler(data) {
        if (data.status === 'valid') {
            try {
                Axios.post(`https://sofmusic-backend.herokuapp.com/user/send-message`,
            msgToSend);
            toast.show({title: 'Message Sent Successfully!',
        position: 'topright', type: 'info'});
        setFullName("");
        setEmail("");
        setContent("");
            } catch (err) {
                toast.show({title: err.response.data.msg, position: 'topright', type: 'alert'});
            }
        } else {
            toast.show({title: "Email Not Valid!", position: 'topright', type: 'alert'});
        }
    });
            } else {
                toast.show({title: "Required Field(s)", position: 'topright', type: 'alert'});
            }
            
          } catch (err) {
            toast.show({title: err.response.data.msg, position: 'topright', type: 'alert'});
          }
      }
      const sendFeedback = async (e) => {
        e.preventDefault();
        try {
          const feedbackToSend = {
              fullName,
              email,
              content
          };
          if (email && fullName && content) {
            $.ajax("https://isitarealemail.com/api/email/validate?email=" +
            email,
            {
             crossDomain: true,
             headers: {
                 Authorization: "Bearer " + apiKey
             }
            })
            .then(function responseHandler(data) {
                if (data.status === 'valid') {
                    try {
                        Axios.post(`https://sofmusic-backend.herokuapp.com/user/send-feedback`,
                        feedbackToSend);
                    toast.show({title: 'Thank you for your Feedback 😊',
                position: 'topright', type: 'info'});
                setFullName("");
                setEmail("");
                setContent("");
                    } catch (err) {
                        toast.show({title: err.response.data.msg, position: 'topright', type: 'alert'});
                    }
                } else {
                    toast.show({title: "Email Not Valid!", position: 'topright', type: 'alert'});
                }
            });
          } else {
              toast.show({title: "Required Field(s)", position: 'topright', type: 'alert'});
          }
          
        } catch (err) {
          toast.show({title: err.response.data.msg, position: 'topright', type: 'alert'});
        }
    }
    function getAge(dateString) 
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}
    return (
<html>
<head>
    <meta charSet="utf-8"/>
    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <Helmet>
        <title>SoF Music</title>
        <meta name="description" content="All SoF Releases and Videos"/>
        <link rel="canonical" href="/" />
    </Helmet>
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900%7CMontserrat:400,500,700" 
    rel="stylesheet" type="text/css"/>
    <link href="./assets/css/lib/bootstrap.min.css" rel="stylesheet"/>
    <link href="./assets/css/plugins/plugins-combined.css" rel="stylesheet"/>
    <link href="./assets/css/style.css" rel="stylesheet"/>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <script src="./assets/js/lib/modernizr-min.js"></script>
</head>
<body id="home" className="preload">
    <Favicon url='https://sofmusic-backend.herokuapp.com/uploads/logoIcon.png'/>
<Audio/>
    <style>
    {`\
      .navbar-brand {\
        margin-top: 5px;\
      }\
      `}
    </style>
    
    <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
            <div className="navbar-header" align="left">
                <button type="button" data-toggle="collapse" className="btnBurger"
                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <Menu customBurgerIcon={ <img src="assets/images/burgerMenuSoF.png" /> }>
                    <a href="/" style={{fontFamily: 'mistral', fontSize: '70px', color: 'white', textDecoration: 'none'}}>SoF</a><br/><br/>
                    <Link to="home" activeClass="active" spy={true} smooth={true} style={{color: 'white', fontWeight: 'bold'}}>
                        <FaHome/> HOME
                    </Link><br/><br/>
                    <Link to="about" activeClass="active" spy={true} smooth={true} style={{color: 'white', fontWeight: 'bold'}}>
                        <FaInfo/> ABOUT
                    </Link><br/><br/>
                    <Link to="music" activeClass="active" spy={true} smooth={true} style={{color: 'white', fontWeight: 'bold'}}>
                        <FaMusic/> MUSIC
                    </Link><br/><br/>
                    <Link to="videos" activeClass="active" spy={true} smooth={true} style={{color: 'white', fontWeight: 'bold'}}>
                        <FaVideo/> VIDEOS
                    </Link><br/><br/>
                    <Link to="contact" activeClass="active" spy={true} smooth={true} style={{color: 'white', fontWeight: 'bold'}}>
                        <FaPhoneAlt/> CONTACT
                    </Link><br/><br/>
                    <span style={{display: 'flex', justifyContent: 'center'}}>
                    <a href="https://facebook.com/sof.ressaissi" target="_blank"
                            title="Facebook" style={{fontSize: '30px', color: 'white'}}><FaFacebookF/></a>&nbsp;&nbsp;&nbsp;
                            <a href="https://instagram.com/sofressaissi1" target="_blank"
                            title="Instagram" style={{fontSize: '30px', color: 'white'}}><FaInstagram/></a>&nbsp;&nbsp;&nbsp;
                            <a href="https://open.spotify.com/artist/0KWeLTjI6QZi9lwG85RDtr" 
                            target="_blank"
                            title="Spotify" style={{fontSize: '30px', color: 'white'}}><FaSpotify/></a>&nbsp;&nbsp;&nbsp;
                            <a href="https://deezer.com/us/artist/5834123" 
                            target="_blank"
                            title="Deezer" style={{fontSize: '30px', color: 'white'}}><FaMusic/></a>&nbsp;&nbsp;&nbsp;
                            <a href="https://music.apple.com/us/artist/sof/1499668890" 
                            target="_blank"
                            title="Apple Music" style={{fontSize: '30px', color: 'white'}}><FaApple/></a>&nbsp;&nbsp;&nbsp;
                            <a href="https://www.youtube.com/channel/UCcgel-5LhMbQidPenlK6bvw"
                            target="_blank" style={{fontSize: '30px', color: 'white'}}
                            title="YouTube"><FaYoutube/></a>
                    </span>
                    </Menu>
                </button>
                <a className="navbar-brand" href="/" style={{fontFamily: 'mistral', fontSize: '75px'}}>SoF</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                    <Link to="home" activeClass="active" spy={true} smooth={true}>
                        <FaHome/> HOME
                    </Link>
                    </li>
                    <li><Link to="about" activeClass="active" spy={true} smooth={true}>
                        <FaInfo/> ABOUT
                    </Link></li>
                    <li><Link to="music" activeClass="active" spy={true} smooth={true}>
                        <FaMusic/> MUSIC
                    </Link></li>
                    <li><Link to="videos" activeClass="active" spy={true} smooth={true}>
                        <FaVideo/> VIDEOS
                    </Link></li>
                    <li><Link to="contact" activeClass="active" spy={true} smooth={true}>
                        <FaPhoneAlt/> CONTACT
                    </Link></li>
                </ul>
            </div>
        </div>
    </nav>
    <style>
    {
        navbar ?
        <>
        {`\
      .navbar {\
        background-color: #9E002B;\
      }\
      `}
        </> : <>
        </>
      }
    </style>
    <header className="slider-bg" id="slider">
        <div className="container">
            <div className="row">
                <div className="col-md-12 clearfix">
                    <div className="slider-wrap">
                        <div className="">
                            <div className="header-slide">
                                <div className="hero-wrap">
                                    <div className="no-overflow">
                                        <div className="hero-block">
                                            <h1 className="hero-title">I don't say I'm Lyrical </h1>
                                            <h1 className="hero-text">A Friend she told me that</h1>
                                            <span className="attr"> SoF - EGO</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section className="section-padding about clearfix" id="about">
        <img src="assets/images/particles/triangle_1.svg" alt="triangle" className="particle pos_a" data-rellax-speed="2" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/triangle_1.svg" alt="triangle" className="particle pos_c" data-rellax-speed="2" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/triangle_4.svg" alt="triangle" className="particle pos_d" data-rellax-speed="1" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/triangle_5.svg" alt="triangle" className="particle pos_e" data-rellax-speed="3" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/circle_1.svg" alt="circle" className="particle pos_f" data-rellax-speed="4" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/circle_2.svg" alt="circle" className="particle pos_g" data-rellax-speed="2" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/circle_5.svg" alt="circle" className="particle pos_i" data-rellax-speed="1" data-rellax-percentage="0.5" />
        <div className="container">
            <div className="row">
                <div className="band-wrap">
                    <div className="col-md-8 col-md-pull">
                        <h2 className="section-title">SoF</h2>
                        <p className="section-subtitle">
                            Real Name: Sofien Ressaissi<br/>
                            Age: {getAge("06-11-1995")} Years Old<br/>
                            Country: Tunisia<br/>
                        </p>
                        <p className="section-subtitle-thin">
                            SoF is currently enrolling Web Development at <a href="https://esprit.tn" title="Private School of Engineering & Technology">ESPRIT</a> & Has been making music since 2019.<br/>
                            SoF does different styles of rap using English Language.<br/>
                            He wants to be different than artists in his country.<br/>
                            He loves challenging himself because for him it's not<br/>Easy
                            to write a rap song with a non-native language.<br/>
                            He believes Songwriting improves his english level.<br/>
                            In his music, he talked about himself, coronavirus,<br/>How 2020 was for him & many other topics...<br/>
                            Generally, the song title for him is the topic of it.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section className="admire clearfix" id="featured-album">
        <div className="object-fit-container">
            {
                reverseTabV.length > 0 ?
                <>
                <a href={reverseTabV[0].ytbVidUrl} className="audio-play-btn" data-playlist-id="10" title="Watch Video" target="_blank">
                {
                    reverseTab.length > 0 ?
                    <img src={reverseTab[0].releaseCover} className="img-responsive compact-img" alt={reverseTab[0].coverName}/> : 
                     <></>
                }
                
                <span className="flaticon-play-1 album-play-button"></span>
            </a>
                </> : <></>
            }
        </div>
        {
            reverseTab.length > 0 ?
            <>
            <div className="container">
            <div className="row">
                <div className="col-md-7 col-md-push-5">
                    <div className="admire-block">
                        <h3 className="admire-title">Latest Release</h3>
                        <h5 className="admire-subtitle">{reverseTab[0].releaseName} ({capitalizeFirstLetter(reverseTab[0].releaseType)}) | Released <Moment format="MMMM DD YYYY">{reverseTab[0].releaseDate}</Moment> </h5>
                        <p className="admire-subtitle02">
                            Stream "{reverseTab[0].releaseName}" on one of these digital platforms.
                        </p>
                        <a href={reverseTab[0].spLink} target="_blank" className="btn btn-danger" title="Spotify"><FaSpotify/></a>
                        <a href={reverseTab[0].dzLink} target="_blank" className="btn btn-danger" title="Deezer"><FaMusic/></a>
                        {
                            !reverseTab[0].amLink ?
                            <a target="_blank" 
                            className="btn btn-danger" title="Not Available Yet" style={{cursor: 'default', backgroundColor: 'rgba(158, 0, 43, 0.5)'}}><FaApple/></a> :
                             <a href={reverseTab[0].amLink} target="_blank" className="btn btn-danger" title="Apple Music"><FaApple/></a>   
                        }
                    </div>
                </div>
            </div>
        </div>
            </> : <>
            <div className="container">
            <div className="row">
                <div className="col-md-7 col-md-push-5">
                    <div className="admire-block">
                    <h3 className="admire-title">No Releases Are Available.</h3>
                    </div>
                </div>
            </div>
            </div>
            </>
        }
    </section>
    <section className="section-padding album" id="music">
        <img src="assets/images/particles/triangle_1.svg" alt="triangle" className="particle pos_c" data-rellax-speed="3" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/triangle_1.svg" alt="triangle" className="particle pos_b" data-rellax-speed="2" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/triangle_4.svg" alt="triangle" className="particle pos_d" data-rellax-speed="1" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/triangle_5.svg" alt="triangle" className="particle pos_e" data-rellax-speed="4" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/circle_1.svg" alt="circle" className="particle pos_a" data-rellax-speed="2" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/circle_2.svg" alt="circle" className="particle pos_f" data-rellax-speed="3" data-rellax-percentage="0.5" />
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="album-wrap">
                        <style>
                        {`\
        .searchRls {\
          border-radius: 10px;\
          height: 30px;\
          width: 300px;\
          margin-right: 2px;\
        }\
      `}
                        </style>
                        <h2 className="album-title"><span>MUSIC</span></h2><br/><br/><br/><br/><br/>
                        <div align = "right">
                        {
                            allReleases.length > 0 ?
                            <input type="text"
                        placeholder="Search Release" className="searchRls"
                   onChange={(e)=>setSearchRls(e.target.value)}/> :
                            <></>
                        }
                    </div><br/>
                    {
                        allReleases.length > 0 ?
                        <>
                            <div className="row">
                            {
                                currentRlsData.filter((item => {
                                    if (searchRls === "") {
                                        return item
                                    }else if(item.releaseName.toLowerCase().includes(searchRls.toLowerCase())){
                                        return item
                                    }
                                })).map((itemr) => (
                                    <>
                                    <div className="col-md-4">
                                <a className="album-cover" style={{cursor: 'default'}} title={itemr.releaseName}>
                                    <div className="atvImg">
                                        <img src={itemr.releaseCover} className="img-responsive" alt={itemr.coverName}/>
                                        <div className=" atvImg-layer" data-img={itemr.releaseCover}></div>
                                    </div>
                                </a>
                                <div className="album-block">
                                    <span className="album-block-title">{itemr.releaseName}</span>
                                    <p className="album-block-subtitle" style={{color: '#808080'}}>Released <Moment format="MMMM DD YYYY">
                                                                        {itemr.releaseDate}
                                                                    </Moment> | {capitalizeFirstLetter(itemr.releaseType)}</p>
                                        <a href = {itemr.spLink} title="Spotify" target = "_blank"><FaSpotify style={{color: '#9E002B'}}/></a>
                                        <span style={{pointerEvents: 'none'}}>&nbsp;&nbsp;</span>
                                        <a href = {itemr.dzLink} title="Deezer" target = "_blank"><FaMusic style={{color: '#9E002B'}}/></a>
                                        <span style={{pointerEvents: 'none'}}>&nbsp;&nbsp;</span>
                                        {
                                            !itemr.amLink ?
                                            <>
                                            <a target = "_blank" title="Not Available Yet"><FaApple style={{color: 'rgba(158, 0, 43, 0.5)', cursor: 'default'}}/></a>
                                            </> : <>
                                            <a href = {itemr.amLink} title="Apple Music" target = "_blank"><FaApple style={{color: '#9E002B'}}/></a>
                                            </>
                                        }
                                    
                                </div><br/><br/>
                            </div>
                                    </>
                                ))
                            }
                        </div>   
                        </> : 
                        <div align="center">
                            <span style={{color: '#000000', fontWeight: 'bold', fontSize: '2em'}}>
                                You Have No Releases.
                            </span>
                        </div>
                    }
                    </div>
                </div>
            </div>
        </div><br/>
        <Pagination
        className="pagination-bar"
        currentPage={currentPageRls}
        totalCount={reverseTab.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPageRls(page)}
      />
    </section>
    <section className="section-padding our-media has-parallax" id="videos">
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                    <h2 className="media-title"><span>VIDEOS</span></h2><br/><br/><br/>
                </div>
                <div className="btn-position">
                    <div className="">
                        <div className="tab-pane" id="video">
                        <div align = "right">
                        {
                            allVideos.length > 0 ?
                            <input type="text"
                        placeholder="Search Video" className="searchVid"
                   onChange={(e)=>setSearchVid(e.target.value)}/> : 
                             <></>
                        }
                    </div>
                            <div className="video-wrap">
                                <style>
                                {`\
        .searchVid {\
          border-radius: 10px;\
          height: 30px;\
          width: 300px;\
          margin-right: 20px;\
          margin-top: -50px;\
        }\
      `}
                                </style>
                                {
                                    allVideos.length > 0 ?
                                    <>
                                    {
                                    currentVidData.filter((item=>{
                                        if (searchVid === "") {
                                            return item
                                        }else if(item.ytbVidUrl.toLowerCase().includes(searchVid.toLowerCase())){
                                            return item
                                        }
                                    })).map((itemv) => (
                                        <>
                                        <div className="col-md-4">
                                    <div className="video-img-block">
                                            <iframe
                                                   width="350"
                                                   height="260"
                                                   src={`https://www.youtube.com/embed/${itemv.ytbVidUrl.replace('https://www.youtube.com/watch?v=','')}`}
                                                   frameBorder="0"
                                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                   allowFullScreen
                                                   title="Embedded youtube"/>
                                    </div><br/><br/>
                                </div>
                                        </>
                                    ))
                                }
                                    </> : <>You Have No Videos.</>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Pagination
        className="pagination-bar"
        currentPage={currentPageVid}
        totalCount={reverseTabV.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPageVid(page)}
      />
    </section>
    <section className="section-padding contact" id="contact">
        <img src="assets/images/particles/triangle_1.svg" alt="triangle" className="particle pos_a" data-rellax-speed="2" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/triangle_1.svg" alt="triangle" className="particle pos_c" data-rellax-speed="2" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/triangle_4.svg" alt="triangle" className="particle pos_d" data-rellax-speed="1" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/triangle_5.svg" alt="triangle" className="particle pos_e" data-rellax-speed="3" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/circle_1.svg" alt="circle" className="particle pos_f" data-rellax-speed="4" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/circle_2.svg" alt="circle" className="particle pos_g" data-rellax-speed="2" data-rellax-percentage="0.5" />
        <img src="assets/images/particles/circle_5.svg" alt="circle" className="particle pos_j" data-rellax-speed="1" data-rellax-percentage="0.5" />
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="contact-title"><span>CONTACT ME</span></h2>
                    <p className="contact-subtitle">
                        Feel free to send me a message below.
                    </p>
                </div>
                <div className="col-md-12">
                    <div className="contact-form">
                        <form className="form-signin" id="contact_form" onSubmit={sendMessage}>
                            <label className="sr-only">Email address</label>
                            <input type="text" id="name" name="fullName" onChange={(e) => setFullName(e.target.value)}
                            value={fullName} className="form-control form-width form-primary" placeholder="Full Name"/>
                            <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}
                            value={email} className="form-control form-width" placeholder="Email Address"/>
                            <textarea className="form-control form-comments" onChange={(e) => setContent(e.target.value)}
                            value={content} id="message" name="content" placeholder="Message"></textarea>
                            <div className="btn-wrap">
                                <button type="submit" className="btn btn-default" id="js-contact-btn"> SEND </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <footer className="section-padding has-parallax">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="subscribe-title"><span>FEEDBACK</span></h2>
                </div>
                <div className="col-md-12 clearfix">
                    <div className="contact-form subscribe-email">
                        <form className="form-signin" id="subscribeform" onSubmit={sendFeedback}>
                            <div className="subscribe-block">
                                <input type="text" id="fname" name="fullName" value={fullName}
                                className="form-control form-subscribe form-primary" 
                                placeholder="Full Name" onChange={(e) => setFullName(e.target.value)}/>
                                <input type="email" id="email" name="email" value={email}
                                className="form-control form-subscribe" 
                                placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
                                <textarea className="form-control form-subscribe" value={content}
                                id="message" name="content" onChange={(e) => setContent(e.target.value)}
                                placeholder="Leave Your Feedback"></textarea>
                            </div>
                            <div className="btn-wrap clearifx">
                                <button type="submit" className="btn btn-default btn-subscribe" id="js-subscribe-btn"> SEND </button>
                            </div>
                            <div id="js-subscribe-result" data-success-msg="Great! Please confirm your email to finish." data-error-msg="Oops! Something went wrong."></div>
                        </form>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="shape-line">
                        <img src="assets/images/shape-line.png" className="img-responsive" alt="svg-style-line"/>
                    </div>
                </div>
                <style>
                {`\
                 .social-icons ul li a:hover {\
                     color: #9E002B;\
                  }\
                `}
                {`\
                 .social-icons ul li a {\
                     font-size: 50px;\
                     color: white;\
                     border-radius: 35%;\
                  }\
                `}
                </style>
                <div className="col-md-12">
                    <div className="address">
                        <h4>Yeah</h4>
                        <h4>Uh</h4>
                        <h4>S  o  F</h4>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="shape-line">
                        <img src="assets/images/shape-line.png" className="img-responsive" alt="svg-style-line"/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="social-icons">
                        <ul>
                            <li><a href="https://facebook.com/sof.ressaissi" target="_blank"
                            title="Facebook"><FaFacebookF/></a></li>
                            <li><a href="https://instagram.com/sofressaissi1" target="_blank"
                            title="Instagram"><FaInstagram/></a></li>
                            <li><a href="https://open.spotify.com/artist/0KWeLTjI6QZi9lwG85RDtr" 
                            target="_blank"
                            title="Spotify"><FaSpotify/></a></li>
                            <li><a href="https://deezer.com/us/artist/5834123" 
                            target="_blank"
                            title="Deezer"><FaMusic/></a></li>
                            <li><a href="https://music.apple.com/us/artist/sof/1499668890" 
                            target="_blank"
                            title="Apple Music"><FaApple/></a></li>
                            <li><a href="https://www.youtube.com/channel/UCcgel-5LhMbQidPenlK6bvw"
                            target="_blank"
                            title="YouTube"><FaYoutube/></a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="shape-line">
                        <img src="assets/images/shape-line.png" className="img-responsive" alt="svg-style-line"/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="address">
                        <h5>Copyright © {currentDate.getFullYear()} SoF. All rights reserved.</h5>
                        <p>Developed by Sofien Ressaissi</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    
    <script src="assets/js/lib/jquery-1.12.0.min.js"></script>
    <script src="assets/js/lib/bootstrap.min.js"></script>
    <script src="assets/js/plugins/flexslider-min.js"></script>
    <script src="assets/js/plugins/slick.min.js"></script>
    <script src="assets/js/plugins/magnific-popup.min.js"></script>
    <script src="assets/js/plugins/parallax.js"></script>
    <script src="assets/js/plugins/rellax.min.js"></script>
    <script src="assets/js/plugins/atvimg.js"></script>
    <script src="assets/js/plugins/jquery.jplayer.min.js"></script>
    <script src="assets/js/plugins/jplayer.playlist.min.js"></script>
    <script src="assets/js/audio-player.js"></script>
    <script src="assets/js/validate.js"></script>
    <script src="assets/js/contact.js"></script>
    <script src="assets/js/subscribe.js"></script>
    <script src="assets/js/script.js"></script>
    <BackToTop
        showAt={6000}
        speed={1500}
        easing="easeInOutQuint"
      >
        <img src="assets/images/back-to-top.png" alt="Back to top" title="Back to Top"/>
      </BackToTop>
</body>

</html>
    )
}
