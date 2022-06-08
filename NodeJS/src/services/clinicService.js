import db from "../models/index";
import _, { reject } from 'lodash'
import e from "express";
require('dotenv').config();


let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.clinic || !data.imageBase64 || !data.address || !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                await db.Clinic.create({
                    image: data.imageBase64,
                    name: data.clinic,
                    address: data.address,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll();

            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }

            resolve({
                errCode: 0,
                data: data
            })
        } catch (e) {
            reject(e);
        }
    })
}

const getDetailClinicById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data = await db.Clinic.findOne({
                    where: { id: inputId },
                    attributes: ['name', 'address', 'contentHTML', 'contentMarkdown']
                })

                if (data) {
                    let doctorClinic = [];

                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId']
                    })

                    data.doctorClinic = doctorClinic;
                }
                else {
                    data = {};
                }

                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createClinic,
    getAllClinic,
    getDetailClinicById
}