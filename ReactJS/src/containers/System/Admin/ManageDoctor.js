import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from "react-select";
import { getDetailInforDoctor } from '../../../services/userService';



const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Lưu thông tin vào bảng Markdown
            contentMarkdown: "",
            contentHTML: "",
            selectedDoctor: "",
            description: "",
            listDoctors: [],
            hasOldData: false,

            // Lưu thông tin vào bảng Doctor_infor
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: "",
            specialtyId: "",

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfo();
    }

    buildDataInputSelect = (inputData, type) => {
        let res = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.valueVi} VND`;
                    let labelEn = `${item.valueEn} USD`
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = item.keyMap
                    res.push(obj)
                })
            }
            else if (type === 'SPECIALTY' || type === 'CLINIC') {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.label = item.name
                    obj.value = item.id
                    res.push(obj)
                })
            }
            else {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                    let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn
                    obj.label = language === LANGUAGES.VI ? labelVi : labelEn
                    obj.value = type === 'USERS' ? item.id : item.keyMap
                    res.push(obj)
                })
            }
        }

        return res
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')

            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }


    handleSaveContentMarkdown = () => {


        let { hasOldData } = this.state;
        this.props.saveDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value

        })

    }


    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
        let res = await getDetailInforDoctor(selectedDoctor.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic = '', nameClinic = '', note = '', paymentId = '',
                priceId = '', provinceId = '', specialtyId = '', clinicId = '',
                selectedPrice = '', selectedPayment = '',
                selectedProvince = '', selectedSpecialty = '', selectedClinic;


            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic
                nameClinic = res.data.Doctor_Infor.nameClinic
                note = res.data.Doctor_Infor.note

                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId;
                })

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId;
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId;
                })

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId;
                })

                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId;
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            })
        }
        else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }
    };

    handleChangeSelectDoctorInfor = (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }


    render() {
        let { hasOldData } = this.state;
        console.log("check state : ", this.state);
        return (
            <>
                <div className="manage-doctor-container container">
                    <div className="manage-doctor-title">
                        <FormattedMessage id="admin.manage-doctor.title" />
                    </div>

                    <div className='more-infor'>
                        <div className="content-left form-group">
                            <label >
                                <FormattedMessage id="admin.manage-doctor.select-doctor" />
                            </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                            />
                        </div>

                        <div className="content-right form-group">
                            <label >
                                <FormattedMessage id="admin.manage-doctor.intro" />
                            </label>
                            <textarea className='form-control'
                                onChange={(e) => this.handleOnChangeText(e, 'description')}
                                value={this.state.description}
                            >

                            </textarea>
                        </div>
                    </div>

                    <div className="doctor-infor-form row">
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.price" />
                            </label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                                name="selectedPrice"
                            />
                        </div>

                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.payment" />
                            </label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                                name="selectedPayment"
                            />

                        </div>

                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.province" />
                            </label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                                name="selectedProvince"
                            />

                        </div>


                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.nameClinic" />
                            </label>
                            <input type="text" className='form-control'
                                onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>

                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.addressClinic" />
                            </label>
                            <input type="text" className='form-control'
                                onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}
                                value={this.state.addressClinic}
                            />

                        </div>

                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.note" />
                            </label>
                            <input type="text" className='form-control'
                                onChange={(e) => this.handleOnChangeText(e, 'note')}
                                value={this.state.note}
                            />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.specialty" />
                            </label>

                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listSpecialty}
                                placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                                name="selectedSpecialty"
                            />
                        </div>

                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="admin.manage-doctor.select-clinic" />
                            </label>

                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listClinic}
                                placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                                name="selectedClinic"
                            />
                        </div>
                    </div>

                    <div className="manage-doctor-editor">
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>




                    <button
                        className={hasOldData === false ? "save-content-doctor btn-primary" : "save-content-doctor btn-warning"}
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        {hasOldData === true ?
                            <FormattedMessage id="admin.manage-doctor.save" /> :
                            <FormattedMessage id="admin.manage-doctor.add" />
                        }
                    </button>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        saveDoctor: (data) => dispatch(actions.saveDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
