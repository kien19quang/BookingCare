import db from "../models/index";
import _, { reject } from 'lodash'
require('dotenv').config();
import emailService from './emailService'


const postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            if (!data.email ||
                !data.doctorID ||
                !data.timeType ||
                !data.date ||
                !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }

            else {
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: "https://www.facebook.com/kien19quang"
                });

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleid: 'R3'
                    }
                })
                if (user && user[0] && user[1] === true) {
                    res = await db.Booking.create({
                        statusId: "S1",
                        doctorId: data.doctorID,
                        patientId: user[0].id,
                        date: data.date,
                        timeType: data.timeType,
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

module.exports = {
    postBookAppointment
}