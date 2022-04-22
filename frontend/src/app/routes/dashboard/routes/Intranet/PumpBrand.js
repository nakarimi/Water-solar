import React from 'react';
import Slider from "react-slick";
import axios from 'axios';

const PumpBrand = ({pumpBrands}) => {

  const options = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    marginRight: 10,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: false
        }
      }, 
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  return (
    <Slider className="slick-app-frame" {...options} >
        {pumpBrands.map((data,index) => {
            return <div class="slick-slide-item">
            <div className="brand-logo">
                <div className="brand-logo-inner">
                <img src={`${axios.defaults.baseURL}brand/pumpbrand/${data.image}`} alt="Clients"/>
                </div>
            </div>
            </div>  
        })} 
      
    </Slider>
  );
};


export default PumpBrand;