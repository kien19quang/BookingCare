import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./MedicalFacility.scss"
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router'


class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinics: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    }


    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }
        let { dataClinics } = this.state;
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
                            {dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <div className='section-block'
                                            key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >
                                            <img src={item.image} alt={item.name} className='section-img' />
                                            <h3 className='section-img-title'>{item.name}</h3>
                                        </div>
                                    )
                                })
                            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
