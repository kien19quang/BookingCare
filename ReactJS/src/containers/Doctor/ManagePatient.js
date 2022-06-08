import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { LANGUAGES, dateFormat } from "../../utils"
import { FormattedMessage } from 'react-intl'
import DatePicker from "../../components/Input/DatePicker"
import moment from 'moment';
import { toast } from 'react-toastify';
import { getAllPatientForDoctor, postSendRemedy } from '../../services/userService';
import RemedyModal from './RemedyModal';
import LoadingOverlay from 'react-loading-overlay';


class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            dataPatient: {},
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let id = user.user.id;
        let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let res = await getAllPatientForDoctor({
            doctorId: id,
            date: formattedDate
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }

    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }


    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRemedy({
            ...dataChild,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Remedy success!')
            this.closeRemedyModal();
            await this.getDataPatient();
        }
        else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Something wrongs....')
            console.log("Error send remedy : ", res);
        }
    }


    render() {
        let { dataPatient } = this.state;
        let { language } = this.props;
        return (
            <>


                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Sending to your email...'
                >
                    <div className="manage-patient-container container">
                        <div className="m-p-title">
                            Quản lí bệnh nhân khám bệnh
                        </div>

                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>
                                    Chọn ngày khám
                                </label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                            </div>

                            <div className="col-12 table-manage-patient">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Họ và tên</th>
                                            <th>Thời gian</th>
                                            <th>Giới tính</th>
                                            <th>Địa chỉ</th>
                                        </tr>

                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ?
                                                    item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                                let gender = language === LANGUAGES.VI ?
                                                    item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{time}</td>
                                                        <td>{gender}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td className='Patient-btn'>
                                                            <button className='btn btn-primary mp-btn-confirm'
                                                                onClick={() => this.handleConfirm(item)}
                                                            >
                                                                Xác nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: "center" }}>
                                                    No Data
                                                </td>
                                            </tr>
                                        }


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <RemedyModal
                        isOpenModal={this.state.isOpenRemedyModal}
                        isCloseModal={this.closeRemedyModal}
                        dataModal={this.state.dataModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);




