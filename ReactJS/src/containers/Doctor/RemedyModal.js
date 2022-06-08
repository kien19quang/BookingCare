import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss'
import { LANGUAGES } from '../../utils';
import { FormattedMessage } from 'react-intl'
import { Modal } from 'reactstrap';
import _ from 'lodash';
import Select from 'react-select'
import { toast } from 'react-toastify';
import moment from 'moment';
import { CommonUtils } from "../../utils"


class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64
            })
        }
    }


    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }

    render() {
        let { isOpenModal, isCloseModal, dataModal } = this.props;
        let { email } = this.state;
        return (
            <>
                <Modal
                    isOpen={isOpenModal}
                    toggle={isCloseModal}
                    className={'remedy-modal-container'}
                    size='md'
                    centered
                >
                    <div className="remedy-modal-content">
                        <div className="remedy-modal-header">
                            <span className='left'>
                                Gửi hóa đơn khám bệnh
                            </span>
                            <span className='right'
                                onClick={this.props.isCloseModal}
                            >
                                <i className="fas fa-times"></i>
                            </span>


                        </div>

                        <div className="remedy-modal-body">
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>
                                        Email bệnh nhân
                                    </label>
                                    <input type="text" className="form-control" value={email}
                                        onChange={(e) => this.handleOnChangeEmail(e)}
                                    />
                                </div>

                                <div className="col-6 form-group">
                                    <label>
                                        Chọn file đơn thuốc
                                    </label>
                                    <input type="file" className="form-control-file"
                                        onChange={(e) => this.handleOnChangeImage(e)}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="remedy-modal-footer">
                            <button className="btn btn-primary right"
                                onClick={() => this.handleSendRemedy()}
                            >
                                <FormattedMessage id="patient.booking-modal.btnConfirm" />
                            </button>
                            <button className="btn btn-secondary left"
                                onClick={this.props.isCloseModal}
                            >
                                <FormattedMessage id="patient.booking-modal.btnCancel" />
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);




