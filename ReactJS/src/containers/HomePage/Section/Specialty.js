import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router'

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }


    handleViewDetailSpecialty = (specialty) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${specialty.id}`);
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

        let { dataSpecialty } = this.state;
        return (
            <div className='section-wrapper section-specialty'>
                <div className="section-container">

                    <div className="section-header">
                        <div className="section-title">
                            <FormattedMessage id="homepage.specialty-popular" />
                        </div>

                        <button className="section-btn">
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>

                    <div className="section-slider">
                        <Slider {...settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='section-block'
                                            key={index}
                                            onClick={() => this.handleViewDetailSpecialty(item)}
                                        >
                                            <img src={item.image} alt={`Khoa ${item.name}`} className='section-img' />
                                            <h3 className='section-img-title'>{item.name}</h3>
                                        </div>
                                    )
                                })
                            }


                        </Slider>
                    </div>
                </div >
            </div >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
