import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGES } from "../../../utils"
import { getExtraInforDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format'
import { FormattedMessage } from 'react-intl'



class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if (this.props.IdFromParent) {
            let res = await getExtraInforDoctorById(this.props.IdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.IdFromParent !== prevProps.IdFromParent) {
            let res = await getExtraInforDoctorById(this.props.IdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state
        let { language } = this.props;
        return (
            <>
                <div className="doctor-extra-infor-container">
                    <div className="content-up">
                        <div className='text-address'>
                            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                        </div>
                        <div className='name-clinic'>{extraInfor && extraInfor.nameClinic}</div>
                        <div className='detail-address'>{extraInfor && extraInfor.addressClinic}</div>
                    </div>

                    <div className="content-down">
                        {isShowDetailInfor === false &&
                            <div className='title-price'>
                                <FormattedMessage id="patient.extra-infor-doctor.price" />
                                {language === LANGUAGES.VI ?
                                    <NumberFormat
                                        value={extraInfor && extraInfor.priceTypeData && extraInfor.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix='VND'
                                        className='currency'
                                    /> :

                                    <NumberFormat
                                        value={extraInfor && extraInfor.priceTypeData && extraInfor.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix='$'
                                        className='currency'
                                    />
                                }
                                <span className='show-hide'
                                    onClick={() => this.showHideDetailInfor(true)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.detail" />
                                </span>
                            </div>
                        }


                        {isShowDetailInfor === true &&
                            <>
                                <div className='title-price'>
                                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                                </div>
                                <div className='price-infor'>
                                    <div className='price-text'>
                                        <span>
                                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                                        </span>
                                        <span>
                                            {language === LANGUAGES.VI ?
                                                <NumberFormat
                                                    value={extraInfor && extraInfor.priceTypeData && extraInfor.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix='VND'
                                                /> :

                                                <NumberFormat
                                                    value={extraInfor && extraInfor.priceTypeData && extraInfor.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix='$'
                                                />
                                            }
                                        </span>
                                    </div>

                                    <div className='note'>
                                        {extraInfor && extraInfor.note}
                                    </div>
                                </div>
                                <div className='payment'>
                                    <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                    {
                                        extraInfor && extraInfor.paymentTypeData &&
                                        language === LANGUAGES.VI && extraInfor.paymentTypeData.valueVi
                                    }

                                    {
                                        extraInfor && extraInfor.paymentTypeData &&
                                        language === LANGUAGES.EN && extraInfor.paymentTypeData.valueEn
                                    }
                                </div>
                                <span className='show-hide'
                                    onClick={() => this.showHideDetailInfor(false)}>Ẩn bảng giá</span>
                            </>

                        }

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);




