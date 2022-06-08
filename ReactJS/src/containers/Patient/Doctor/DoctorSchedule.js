import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from "moment"
import localization from 'moment/locale/vi'
import { LANGUAGES, dateFormat } from "../../../utils"
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl'
import BookingModal from './Modal/BookingModal';


class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {},
        }
    }


    async componentDidMount() {
        let allDays = this.getArrDays();
        if (this.props.IdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.IdFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }


        this.setState({
            allDays: allDays,
        })


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDays();
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.IdFromParent !== prevProps.IdFromParent) {
            let allDays = this.getArrDays();
            let res = await getScheduleDoctorByDate(this.props.IdFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (this.props.language === LANGUAGES.VI) {
                if (i == 0) {
                    let labelVi2 = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${labelVi2}`;
                    obj.label = today;
                }
                else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    obj.label = this.capitalizeFirstLetter(labelVi);
                }
            }
            else {
                if (i == 0) {
                    let labelEn2 = moment(new Date()).format('DD/MM');
                    let today = `Today - ${labelEn2}`;
                    obj.label = today;
                }
                else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM");
                }
            }
            obj.value = moment(new Date()).add(i, 'days').format(dateFormat.SEND_TO_SERVER);

            arrDate.push(obj);
        }

        return arrDate;
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.IdFromParent && this.props.IdFromParent !== -1) {
            let id = this.props.IdFromParent;
            let date = e.target.value;
            let res = await getScheduleDoctorByDate(id, date);


            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data
                })
            }
        }



    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvalableTime } = this.state;
        let { language } = this.props
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="all-available-time">
                        <div className="text-calendar">
                            <span>
                                <i className="fas fa-calendar-alt"></i>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>

                        <div className="time-content">
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-content-calendar'>
                                        {allAvalableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button key={index}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })
                                        }
                                    </div>

                                    <div className="book-free">
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className='far fa-hand-point-up'></i>
                                            <FormattedMessage id="patient.detail-doctor.book-free" />
                                        </span>
                                    </div>

                                </>
                                :
                                <div className='notify-empty'>
                                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <BookingModal
                    isOpenModal={this.state.isOpenModalBooking}
                    isCloseModal={this.closeBookingModal}
                    dataTime={this.state.dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);




