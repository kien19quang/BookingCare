import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }


    handleChangLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.user.roleid;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }

        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* nút logout */}
                <div className="content-right">
                    <div className="welcome">
                        <FormattedMessage id="home-header.Welcome" />
                        {(userInfo && userInfo.user.firstName) && userInfo.user.lastName ?
                            `${userInfo.user.firstName} ${userInfo.user.lastName}!` : ""}
                    </div>

                    <div className="languages">
                        <span className={this.props.language === LANGUAGES.VI ? "language-vi active" : "language-vi"}
                            onClick={() => this.handleChangLanguage(LANGUAGES.VI)}>VN</span>
                        <span className={this.props.language === LANGUAGES.EN ? "language-en active" : "language-en"}
                            onClick={() => this.handleChangLanguage(LANGUAGES.EN)}>EN</span>
                    </div>

                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
