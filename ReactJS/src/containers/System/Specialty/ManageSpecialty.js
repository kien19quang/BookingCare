import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialty: '',
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


    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success("Add new specialty success!")
            this.setState({
                specialty: '',
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
                <div className="manage-specialty-container container">
                    <div className="ms-title">
                        Quản lí chuyên khoa
                    </div>

                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>
                                Tên chuyên khoa
                            </label>

                            <input type="text" className="form-control"
                                value={this.state.specialty}
                                onChange={(e) => this.handleOnChangeInput(e, 'specialty')}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>
                                Ảnh chuyên khoa
                            </label>

                            <input type="file" className="form-control-file"
                                onChange={(e) => this.handleOnChangeImage(e)}
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
                            <button className="btn-save-specialty btn btn-primary"
                                onClick={() => this.handleSaveNewSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);




