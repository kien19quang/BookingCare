import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import Select from 'react-select'
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import { dateFormat } from '../../../../utils';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            selectedGender: '',
            doctorId: '',
            timeType: '',

            genders: [],

            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.props.getRenderStart();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            if (this.props.genders.length > 0) {
                this.setState({
                    genders: this.buildDataGender(this.props.genders)
                })
            }
        }


        if (this.props.genders !== prevProps.genders) {
            if (this.props.genders.length > 0) {
                this.setState({
                    genders: this.buildDataGender(this.props.genders)
                })

            }
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            let { dataTime } = this.props;
            if (dataTime && !_.isEmpty(dataTime)) {
                let doctorId = dataTime.doctorID;
                this.setState({
                    doctorId: doctorId,
                    timeType: dataTime.timeType,
                })
            }
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;

        if (data && data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                obj.value = item.keyMap;
                result.push(obj);
            })
        }
        return result;
    }

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }


    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true,
        })
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            doctorID: this.state.doctorId,
            timeType: this.state.timeType,
            selectedGender: this.state.selectedGender.value,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Booking a new appointment success. Please confirm at your email!')
        }
        else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Booking a new appointment error!')
        }
        this.props.isCloseModal();
    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ?
                moment(dataTime.date, 'DD/MM/YYYY').format('dddd - DD/MM/YYYY') :
                moment(dataTime.date, 'DD/MM/YYYY').locale('en').format('ddd - MM/DD/YYYY');
            date = this.capitalizeFirstLetter(date);
            return `${time} - ${date}`
        }
        return <></>
    }

    buildDoctorName = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = language === LANGUAGES.VI ?
                `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` :
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name;
        }
        return '';
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        let { dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorID;
        }
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Sending to your email...'
                >

                </LoadingOverlay>
                <Modal
                    isOpen={this.props.isOpenModal}
                    toggle={this.props.isCloseModal}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className='left'>
                                <FormattedMessage id="patient.booking-modal.title" />
                            </span>
                            <span className='right'
                                onClick={this.props.isCloseModal}
                            >
                                <i className="fas fa-times"></i>
                            </span>
                        </div>

                        <div className="booking-modal-body">
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>



                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.fullName" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleOnchangeInput(e, 'fullName')}
                                    />
                                </div>

                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.phoneNumber" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                                    />
                                </div>

                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.email" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                    />
                                </div>

                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.address" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                    />
                                </div>

                                <div className="col-12 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.reason" />
                                    </label>
                                    <input type="text" className="form-control"
                                        value={this.state.reason}
                                        onChange={(e) => this.handleOnchangeInput(e, 'reason')}
                                    />
                                </div>

                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.date" />
                                    </label>

                                    <input type="text" value={dataTime.date} disabled className='form-control' />

                                </div>

                                <div className="col-6 form-group">
                                    <label>
                                        <FormattedMessage id="patient.booking-modal.gender" />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="booking-modal-footer">
                            <button className="btn btn-primary right"
                                onClick={() => this.handleConfirmBooking()}
                            >
                                <FormattedMessage id="patient.booking-modal.btnConfirm" />
                            </button>
                            <button className="btn btn-secondary left"
                                onClick={this.props.isCloseModal}
                            >
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);




