import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserRedux.scss"
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"
import adminReducer from '../../../store/reducers/adminReducer';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';





class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            postionArr: [],
            previewImgURL: '',
            isOpen: false,



            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            roleid: "",
            position: "",
            avatar: "",


            action: ""
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getRoleStart()
        this.props.getPositionStart()
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;


            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: this.props.roleRedux,
                roleid: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ""
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                postionArr: this.props.positionRedux,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ""
            })
        }


        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPosition = this.props.positionRedux;
            this.setState({
                id: "",
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                roleid: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
                phoneNumber: "",
                previewImgURL: "",
            })
        }

    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    onChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }


    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ["email", "password", "firstName", "lastName",
            "phoneNumber", "address", "gender", "roleid", "position"]

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) {
            return;
        }

        let { action } = this.state;

        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editUserRedux({
                id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleid: this.state.roleid,
                positionId: this.state.position,
                phoneNumber: this.state.phoneNumber,
                avatar: this.state.avatar
            })
            this.setState({
                action: CRUD_ACTIONS.CREATE
            })
        }
        else {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleid: this.state.roleid,
                positionId: this.state.position,
                phoneNumber: this.state.phoneNumber,
                avatar: this.state.avatar
            })
        }


    }


    handleEditUserFromParent = (user) => {
        let imageBase64 = "";
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }

        this.setState({
            id: user.id,
            email: user.email,
            password: "Hard Code",
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            gender: user.gender,
            roleid: user.roleid,
            position: user.positionId,
            phoneNumber: user.phoneNumber,
            previewImgURL: imageBase64,
            avatar: "",
            action: CRUD_ACTIONS.EDIT,
        })
    }


    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positionArr = this.state.postionArr;

        let { email, password, firstName, lastName,
            phoneNumber, address, gender, roleid, position, avatar
        } = this.state;

        console.log(this.state);
        return (
            <>
                <div className="user-redux-container">
                    <div className="title">
                        Learn React-redux with kinwang
                    </div>

                    <div className="user-redux-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <FormattedMessage id="manage-user.add" />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.email" />
                                    </label>
                                    <input type="email"
                                        className='form-control'
                                        value={email}
                                        onChange={(e) => this.onChangeInput(e, 'email')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.password" />
                                    </label>
                                    <input type='password'
                                        className='form-control'
                                        value={password}
                                        onChange={(e) => this.onChangeInput(e, 'password')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.firstName" />
                                    </label>
                                    <input type='text'
                                        className='form-control'
                                        value={firstName}
                                        onChange={(e) => this.onChangeInput(e, 'firstName')}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.lastName" />
                                    </label>
                                    <input type='text'
                                        className='form-control'
                                        value={lastName}
                                        onChange={(e) => this.onChangeInput(e, 'lastName')}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.phoneNumber" />
                                    </label>
                                    <input type='text'
                                        className='form-control'
                                        value={phoneNumber}
                                        onChange={(e) => this.onChangeInput(e, 'phoneNumber')}

                                    />
                                </div>
                                <div className="col-9">
                                    <label>
                                        <FormattedMessage id="manage-user.address" />
                                    </label>
                                    <input type='text'
                                        className='form-control'
                                        value={address}
                                        onChange={(e) => this.onChangeInput(e, 'address')}
                                    />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.gender" />
                                    </label>
                                    <select name="" id="" className="form-control"
                                        onChange={(e) => this.onChangeInput(e, 'gender')}
                                        value={gender}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.role" />
                                    </label>
                                    <select name="" id="" className="form-control"
                                        onChange={(e) => this.onChangeInput(e, 'roleid')}
                                        value={roleid}
                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.position" />
                                    </label>
                                    <select name="" id="" className="form-control"
                                        onChange={(e) => this.onChangeInput(e, 'position')}
                                        value={position}
                                    >
                                        {positionArr && positionArr.length > 0 &&
                                            positionArr.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.image" />
                                    </label>

                                    <div className='img-block'>
                                        <label className='label-upload' htmlFor="previewImg" >
                                            <input type="file" id="previewImg"
                                                hidden
                                                onChange={(e) => this.handleOnChangeImage(e)}
                                            />
                                            <FormattedMessage id="manage-user.upload" />
                                            <i className="fas fa-upload"></i>
                                        </label>
                                        <div className="preview-image"
                                            style={{
                                                backgroundImage: `url(${this.state.previewImgURL})`
                                            }}
                                            onClick={() => this.openPreviewImage()}
                                        >

                                        </div>
                                    </div>
                                </div>

                                <div className='col-12'>
                                    <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                        onClick={this.handleSaveUser}
                                    >
                                        {this.state.action === CRUD_ACTIONS.EDIT ?
                                            <FormattedMessage id="manage-user.edit" /> :
                                            <FormattedMessage id="manage-user.save" />
                                        }

                                    </button>
                                </div>

                                <div className="col-12 mb-5">
                                    <TableManageUser
                                        handleEditUserFromParent={this.handleEditUserFromParent}
                                        action={this.state.action}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>



                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.position,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
        //processLogout: () => dispatch(actions.processLogout()),
        //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
