import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import Loader from "../Loader/Loader";

export default function CategorySlider() {
         
  function getAllCategories(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

 const {data, isLoading}=useQuery('categorySlider', getAllCategories);
 console.log('data', data);
 if(isLoading){
  return < Loader/>
 }

    var settings={
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>

        {data.data.data.map((category, idx)=> <div key={idx}>
         
         <img style={{height:'200px'}} src={category.image} alt={category.name}  className="w-100"/>
         <h4 className="text-center text-main">{category.name}</h4>


        </div>
        
        
        
        )}
      
    </Slider>
  );
}