import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss'
import { FormattedMessage } from 'react-intl';



class About extends Component {



    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }

        return (
            <div className='section-about'>
                <div className="about-header">
                    Truyền thông nói gì về Chanel Hỏi Dân IT
                </div>

                <div className="about-content">
                    <div className="content-left">
                        <iframe width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/21tjOW8BvB4"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>

                    <div className="content-right">
                        <p>
                            Nếu như trong bài N4, các bạn đã biết về sản phẩm đạt được khi kết thúc khóa học fullstack SERN này. (SQL, Express, React và Node.js). Vậy khi chạy môi trường production, liệu nó có gì khác ?
                            Điểm khác biệt ở đây chính là chúng ta sẽ xử lý API, database với môi trường thực tế, làm thật, triển khai thật. Và đặc biệt hơn nữa là mình sẽ 'nhúng' luôn chatbot vào website của chúng ta.
                        </p>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
