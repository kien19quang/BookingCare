import db from "../models/index";
import _, { reject } from 'lodash'
import e from "express";
require('dotenv').config();


let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.specialty || !data.imageBase64 || !data.contentHTML || !data.contentMarkdown) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                await db.Specialty.create({
                    image: data.imageBase64,
                    name: data.specialty,
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

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();

            if (data && data.length > 0) {
                data.map(item => {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
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

const getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let data;
                if (location === 'ALL') {
                    data = await db.Specialty.findOne({
                        where: { id: inputId },
                        attributes: ['contentHTML', 'contentMarkdown'],
                        include: [
                            {
                                model: db.Doctor_Infor,
                                where: { specialtyId: inputId }
                            }
                        ],
                        raw: false,
                        nest: true
                    })
                }
                else {
                    data = await db.Specialty.findOne({
                        where: { id: inputId },
                        attributes: ['contentHTML', 'contentMarkdown'],
                        include: [
                            {
                                model: db.Doctor_Infor,
                                where: {
                                    specialtyId: inputId,
                                    provinceId: location
                                }
                            }
                        ],
                        raw: false,
                        nest: true
                    })
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
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById
}