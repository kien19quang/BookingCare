import db from "../models/index";
import _ from 'lodash'
require('dotenv').config();
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid'

let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`

    return result
}

const postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorID || !data.timeType ||
                !data.date || !data.fullName || !data.selectedGender || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }

            else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorID, token)
                });

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleid: 'R3',
                        address: data.address,
                        gender: data.selectedGender,
                        firstName: data.fullName
                    }
                })
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: "S1",
                            doctorId: data.doctorID,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save infor patient success",
                })
            }


        } catch (e) {
            reject(e);
        }
    })
}

const postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment success!'
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: "Appointment has been activated or does not exist"
                    })
                }
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    postBookAppointment,
    postVerifyBookAppointment
}