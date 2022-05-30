import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss'
import { FormattedMessage } from 'react-intl';
import { handleLoginAPI } from '../../services';
import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            Username: '',
            Password: '',
            errMessage: ''
        }
    }

    handleUsername = (e) => {
        this.setState({
            Username: e.target.value
        })
    }

    handlePassword = (e) => {
        this.setState({
            Password: e.target.value
        })
    }

    handleSubmit = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginAPI(this.state.Username, this.state.Password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                await this.props.userLoginSuccess(data.user)

            }
        } catch (e) {
            console.log(e)
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
    }

    handleKeyDown = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            this.handleSubmit()
        }
    }


    render() {
        return (
            <>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content">
                            <div className="col-12 text-center text-login">Login</div>
                            <div className="col12 form-group">
                                <label >Username:</label>
                                <input type="text"
                                    placeholder='Enter your username...'
                                    className='form-control'
                                    value={this.state.Username}
                                    onChange={(e) => this.handleUsername(e)}
                                />
                            </div>
                            <div className="col12 form-group">
                                <label >Password:</label>
                                <input type='password'
                                    placeholder='Enter your password...'
                                    className='form-control'
                                    value={this.state.Password}
                                    onChange={(e) => this.handlePassword(e)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                />
                            </div>
                            <div className="col-12" style={{ color: 'red' }}>{this.state.errMessage}</div>
                            <button onClick={this.handleSubmit}>Login</button>

                            <div className="col-12">
                                <span>Forgot your password?</span>
                            </div>
                            <div className="col-12 text-center">
                                <span className='text-center'>Or sign in with:</span>
                            </div>
                            <div className="col-12 social-login">
                                <i className="fab fa-facebook-f icon-facebook"></i>
                                <i className="fab fa-google icon-google"></i>
                            </div>
                        </div>
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
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
