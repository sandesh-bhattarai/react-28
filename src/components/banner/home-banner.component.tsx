import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";

// TODO: Remove once developed
import axiosInstance from "../../config/axios.config";



const HomeBannerComponent = () => {
    var settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };
    const [data, setData] = useState([] as any[])

    const getBannerForHomePage = async () => {
        try {
            const response: any = await axiosInstance.get("/banner/home-list");
            setData(response.result)
        } catch(exception) {

        }
    }
    useEffect(() => {
        // getBannerForHomePage()
        // setInterval(() => {
        getBannerForHomePage()
        // }, 5000)
    }, [])

    return (<>
        <div className="bg-white">
            <div className="relative isolate ">
                <Slider {...settings}>
                    {
                        data && data.map((banner: any, ind: number) => (
                            <div key={ind}>
                                <a href={banner.link} target="_blank">
                                    <img src={import.meta.env.VITE_IMAGE_URL+"/uploads/banners/"+banner.image} crossOrigin="anonymous" alt=""/>
                                </a>
                            </div>
                        ))
                    }                    
                </Slider>
            </div>
        </div>
    </>)
}

export default HomeBannerComponent