import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import "./MedicalFacility.scss"

import pathImage from '../../../assets/images/Medical Facility/benhvienchoray.jpg'

class MedicalFacility extends Component {



    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }

        return (
            <div className='section-wrapper section-medical-facility'>
                <div className="section-container">

                    <div className="section-header">
                        <div className="section-title">
                            Cơ sở y tế nổi bật
                        </div>

                        <button className="section-btn">Xem thêm</button>
                    </div>

                    <div className="section-slider">
                        <Slider {...settings}>
                            <div className='section-block'>
                                <img src={pathImage} alt="" className='section-img' />
                                <h3 className='section-img-title'>Bệnh viện Chợ Rẫy</h3>
                            </div>
                            <div className='section-block'>
                                <img src={pathImage} alt="" className='section-img' />
                                <h3 className='section-img-title'>Bệnh viện Chợ Rẫy</h3>
                            </div>
                            <div className='section-block'>
                                <img src={pathImage} alt="" className='section-img' />
                                <h3 className='section-img-title'>Bệnh viện Chợ Rẫy</h3>
                            </div>
                            <div className='section-block'>
                                <img src={pathImage} alt="" className='section-img' />
                                <h3 className='section-img-title'>Bệnh viện Chợ Rẫy</h3>
                            </div>
                            <div className='section-block'>
                                <img src={pathImage} alt="" className='section-img' />
                                <h3 className='section-img-title'>Bệnh viện Chợ Rẫy</h3>
                            </div>
                            <div className='section-block'>
                                <img src={pathImage} alt="" className='section-img' />
                                <h3 className='section-img-title'>Bệnh viện Chợ Rẫy</h3>
                            </div>
                            <div className='section-block'>
                                <img src={pathImage} alt="" className='section-img' />
                                <h3 className='section-img-title'>Bệnh viện Chợ Rẫy</h3>
                            </div>
                            <div className='section-block'>
                                <img src={pathImage} alt="" className='section-img' />
                                <h3 className='section-img-title'>Bệnh viện Chợ Rẫy</h3>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
