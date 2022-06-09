import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutstandingDoctor.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./OutstandingDoctor.scss"
import pathImage from "../../../assets/images/Outstanding Doctor/doctor.jpg"
import * as actions from "../../../store/actions"
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router'


class OutstandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }



    componentDidMount() {
        this.props.loadTopDoctors();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }


    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    }


    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        }

        let { arrDoctors } = this.state
        let { language } = this.props
        return (
            <div className='section-wrapper section-outstanding-doctor'>
                <div className="section-container">

                    <div className="section-header">
                        <div className="section-title">
                            <FormattedMessage id="homepage.outstanding-doctor" />
                        </div>

                        <button className="section-btn">
                            <FormattedMessage id="homepage.more-infor" />
                        </button>
                    </div>

                    <div className="section-slider">
                        <Slider {...settings}>

                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((item, index) => {
                                    let imageBase64 = "";
                                    if (item.image) {
                                        imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div className='section-block doctor-block'
                                            key={index}
                                            onClick={() => this.handleViewDetailDoctor(item)}
                                        >
                                            <img src={imageBase64} alt="" className='section-img doctor-img' />
                                            <h3 className='section-img-title doctor-title'>
                                                {language === LANGUAGES.VI ? nameVi : nameEn}
                                            </h3>
                                            <span className='doctor-sub-title'>Da liễu</span>
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
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
