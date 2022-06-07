import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyById } from '../../../services/userService';
import _ from 'lodash';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [31, 30, 29],
            dataDetailSpecialty: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })
            console.log(res);
            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailSpecialty: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { arrDoctorId, dataDetailSpecialty } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="detail-specialty-container ">

                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.contentHTML }}>

                            </div>
                        }
                    </div>

                    <div className="detail-specialty-body">
                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className="each-doctor" key={index}>
                                        <div className="dt-content-left">
                                            <div className="profile-doctor">
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                />
                                            </div>
                                        </div>

                                        <div className="dt-content-right">
                                            <div className="doctor-schedule">
                                                <DoctorSchedule
                                                    IdFromParent={item}
                                                />
                                            </div>

                                            <div className="doctor-extra-infor">
                                                <DoctorExtraInfor
                                                    IdFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);




