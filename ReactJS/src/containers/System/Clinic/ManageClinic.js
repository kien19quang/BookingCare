import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss'
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewClinic } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinic: '',
            address: '',
            imageBase64: '',
            contentHTML: '',
            contentMarkdown: '',

        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleOnChangeImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleOnChangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState
        })
    }


    handleSaveNewClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.errCode === 0) {
            toast.success("Add new clinic success!")
            this.setState({
                clinic: '',
                address: '',
                imageBase64: '',
                contentHTML: '',
                contentMarkdown: '',
            })
        }
        else {
            toast.error('Something wrongs...')
        }
    }


    render() {
        return (
            <>
                <div className="manage-clinic-container container">
                    <div className="ms-title">
                        Quản lí phòng khám
                    </div>

                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>
                                Tên phòng khám
                            </label>

                            <input type="text" className="form-control"
                                value={this.state.clinic}
                                onChange={(e) => this.handleOnChangeInput(e, 'clinic')}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                Ảnh phòng khám
                            </label>

                            <input type="file" className="form-control-file"
                                onChange={(e) => this.handleOnChangeImage(e)}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                Địa chỉ phòng khám
                            </label>

                            <input type="text" className="form-control"
                                value={this.state.address}
                                onChange={(e) => this.handleOnChangeInput(e, 'address')}
                            />
                        </div>

                        <div className="col-12 mt-4">
                            <MdEditor
                                style={{ height: '500px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                        </div>


                        <div className="col-12">
                            <button className="btn-save-clinic btn btn-primary"
                                onClick={() => this.handleSaveNewClinic()}
                            >
                                Xác nhận
                            </button>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);




