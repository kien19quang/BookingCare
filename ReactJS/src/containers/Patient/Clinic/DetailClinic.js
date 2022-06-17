import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss'
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailClinicById({
                id: id
            })

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty(data)) {
                    let arr = data.Doctor_Infors;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }


                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        let { language } = this.props;
        return (
            <>
                <HomeHeader />
                <div className="detail-clinic-container ">

                    <div className="description-clinic">
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <>
                                <div className="name-clinic">
                                    {dataDetailClinic.name}
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.contentHTML }}>

                                </div>
                            </>
                        }
                    </div>



                    <div className="detail-clinic-body">


                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className="each-doctor" key={index}>
                                        <div className="dt-content-left">
                                            <div className="profile-doctor">
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowDescriptionDoctor={true}
                                                    isShowLinkDetail={true}
                                                    isShowPrice={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);




