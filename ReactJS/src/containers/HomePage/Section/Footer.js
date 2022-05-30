import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss'
import { FormattedMessage } from 'react-intl';



class Footer extends Component {



    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }

        return (
            <div className='section-footer'>
                <div className="footer-license">
                    <p>
                        &copy; 2022 Hỏi Dân IT với Eric. More information, please visit his youtube channel.
                        <a target='_blank' href="https://www.youtube.com/watch?v=21tjOW8BvB4&list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI">
                            &#8594; Click here &#8592;
                        </a>
                    </p>
                </div>

            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
