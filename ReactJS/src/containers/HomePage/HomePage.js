import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import Footer from './Section/Footer';



import "./HomePage.scss"

class HomePage extends Component {

    render() {
        return (
            <div className=''>
                <HomeHeader isShowBanner={true} />
                <Specialty />
                <MedicalFacility />
                <OutstandingDoctor />
                <HandBook />
                <About />
                <Footer />
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
