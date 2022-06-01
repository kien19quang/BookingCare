import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl'
import { getProfileDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format'
import _ from 'lodash';
import moment from 'moment';


class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            })
        }
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date = language === LANGUAGES.VI ?
                moment(dataTime.date, 'DD/MM/YYYY').format('dddd - DD/MM/YYYY') :
                moment(dataTime.date, 'DD/MM/YYYY').locale('en').format('ddd - MM/DD/YYYY');
            date = this.capitalizeFirstLetter(date);
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.priceBooking" />
                    </div>
                </>
            )
        }
        return <></>
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, dataTime } = this.props;
        let nameVi = "";
        let nameEn = "";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }
        console.log(dataTime)
        return (
            <>
                <div className="profile-doctor-container">
                    <div className="intro-doctor">
                        <div className="content-left">
                            <img src={(dataProfile && dataProfile.image) || ""} alt="" className="doctor-img" />
                        </div>

                        <div className="content-right">
                            <div className="content-right-up">
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>

                            <div className="content-right-down">
                                {isShowDescriptionDoctor === true ?
                                    <>
                                        {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                            <span>
                                                {dataProfile.Markdown.description}
                                            </span>
                                        }
                                    </>
                                    :
                                    <>
                                        {this.renderTimeBooking(dataTime)}
                                    </>
                                }

                            </div>
                        </div>

                    </div>
                    <div className="price">
                        <FormattedMessage id="patient.extra-infor-doctor.price" />
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ?
                            <NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix='VND'
                                className='currency'
                            />
                            : ""}

                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ?

                            < NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix='$'
                                className='currency'
                            />
                            : ""}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);




