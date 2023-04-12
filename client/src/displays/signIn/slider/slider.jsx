import React, { Component } from "react";
// import {connect} from 'react-redux';
// import { FormattedMessage} from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slider.css';
import camry from '../image/camry.png' ;
import cross from '../image/cross.png' ;
import altis from '../image/altis.png' ;
import rav4 from '../image/rav4.png' ;
import hillux from '../image/hillux.png' ;
import vios from '../image/vios.png' ;
import fortuner from '../image/fortuner.png' ;

export default class AutoPlayMethods extends Component {
    constructor(props) {
      super(props);
      this.play = this.play.bind(this);
      this.pause = this.pause.bind(this);
    }
    play() {
      this.slider.slickPlay();
    }
    pause() {
      this.slider.slickPause();
    }
    render() {
      const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed:2000,
        // responsive: [
        //     {
        //       breakpoint: 1025,
        //       settings: {
        //         slidesToShow: 3,
        //       },
        //     },
        //     {
        //       breakpoint: 480,
        //       settings: {
        //         slidesToShow: 1,
        //         arrows: false,
        //         infinite: false,
        //       },
        //     },
        //   ],
      };
      return (
        <div className="image-slider">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
             <div className="image">
               <img src={camry} alt="" />
             </div>
             <div className="image">
               <img src={cross} alt="" />
             </div>
             <div className="image">
               <img src={fortuner} alt="" />
             </div>
             <div className="image">
               <img src={altis}  alt="" />
             </div>
             <div className="image">
               <img src={vios} alt="" />
             </div>
             <div className="image">
               <img src={hillux}  alt="" />
             </div>
           </Slider>
        </div>
        // <div className="image-slider">
        //   <Slider ref={slider => (this.slider = slider)} {...settings}>
        //     <div className="image">
        //       <img src={camry} alt="" />
        //     </div>
        //     <div className="image">
        //       <img src={cross} alt="" />
        //     </div>
        //     <div className="image">
        //       <img src={camry} alt="" />
        //     </div>
        //     <div className="image">
        //       <img src={cross}  alt="" />
        //     </div>
        //     <div className="image">
        //       <img src={camry} alt="" />
        //     </div>
        //     <div className="image">
        //       <img src={cross}  alt="" />
        //     </div>
        //   </Slider>
        //   <div style={{ textAlign: "center" }}>
        //     <button className="button" onClick={this.play}>
        //       Play
        //     </button>
        //     <button className="button" onClick={this.pause}>
        //       Pause
        //     </button>
        //   </div>
        // </div>
      );
    }
  }