import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: 0,
            roleid: 0
        }
    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardCode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                roleid: user.roleid
            })
        }
    }

    toggle = () => {
        this.props.toggle();
    }


    handleSection = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'roleid'];
        let isValid = true;
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid
    }

    handleAddNewUser = () => {
        this.hanleResetInput();
        let isValid = this.checkValidateInput()
        if (isValid) {
            this.props.createNewUser(this.state)
        }
    }

    hanleResetInput = () => {
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: 0,
            roleid: 0
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.editUser(this.state)
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"
            >
                <ModalHeader className='model-header' toggle={() => { this.toggle() }}>
                    Edit a new user
                </ModalHeader>
                <ModalBody className='model-container'>
                    <div className="container">
                        <div className="form-control">
                            <label>Email</label>
                            <input type="text"
                                disabled
                                value={this.state.email}
                                onChange={(e) => this.handleOnChangeInput(e, 'email')}
                            />
                        </div>
                        <div className="form-control">
                            <label>Password</label>
                            <input type="password"
                                disabled
                                value={this.state.password}
                                onChange={(e) => this.handleOnChangeInput(e, 'password')}
                            />
                        </div>
                        <div className="form-control">
                            <label>First Name</label>
                            <input type="text"
                                value={this.state.firstName}
                                onChange={(e) => this.handleOnChangeInput(e, 'firstName')}
                            />
                        </div>
                        <div className="form-control">
                            <label>Last Name</label>
                            <input type="text"
                                value={this.state.lastName}
                                onChange={(e) => this.handleOnChangeInput(e, 'lastName')}
                            />
                        </div>
                        <div className="form-control" style={{ width: '100%' }}>
                            <label>Address</label>
                            <input type="text"
                                value={this.state.address}
                                onChange={(e) => this.handleOnChangeInput(e, 'address')}
                            />
                        </div>
                        <div className="form-control">
                            <label>Phone Number</label>
                            <input type="text"
                                value={this.state.phoneNumber}
                                onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                            />
                        </div>
                        <div className="form-control-2-5">
                            <label for="gender">Sex</label>
                            <select id="gender" name="gender" onChange={(e) => this.handleSection(e, 'gender')}>
                                <option value="0" disabled selected>Choose...</option>
                                <option value="1" >Male</option>
                                <option value="0" >Female</option>
                            </select>
                        </div>
                        <div className="form-control-2-5">
                            <label for="roleid">Role</label>
                            <select name="roleid" id="roleId" onChange={(e) => this.handleSection(e, 'roleid')}>
                                <option value="0" disabled selected>Choose...</option>
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Patient</option>
                            </select>
                        </div>
                    </div>


                </ModalBody >
                <ModalFooter >
                    <Button
                        className='px-3'
                        color="primary"
                        onClick={this.handleSaveUser}
                    >
                        Save Changes
                    </Button>
                    {' '}
                    <Button
                        className='px-3'
                        onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal >

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
