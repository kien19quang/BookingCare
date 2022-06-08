require('dotenv').config();
import nodemailer from 'nodemailer'


let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Kiên Quang 👻" <kien92quang@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lệnh khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend),
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div>
            <b>Thời gian : ${dataSend.time}</b>
        </div>
        <div>
            <b>Bác sĩ : ${dataSend.doctorName}</b>
        </div>

        <p>
            Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới 
            để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh
        </p>
        <div>   
            <a href = ${dataSend.redirectLink} target = "_blank">
                Click here... 
            </a> 
        </div>

        <div>Xin chân thành cảm ơn !</div>
    `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}</>
        <p>You received this email because you booked an online medical appointment on BookingCare</p>
        <p>Information to order medical examination:</p>
        <div>
            <b>Time : ${dataSend.time}</b>
        </div>
        <div>
            <b>Doctor : ${dataSend.doctorName}</b>
        </div>

        <p>
        If the above information is true, please click on the link below to 
        confirm and complete the medical appointment booking procedure.
        </p>
        <div>   
            <a href = ${dataSend.redirectLink} target = "_blank">
                Click here... 
            </a> 
        </div>

        <div>Sincerely thanks !</div>
    `
    }
    return result
}


let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_APP, // generated ethereal user
                    pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Kiên Quang 👻" <kien92quang@gmail.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lệnh khám bệnh", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend),
                attachments: [
                    {
                        filename: `Remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            });

            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh xong tại BookingCare</p>
    
        <p>
            Thông tin đơn thuốc, hóa đơn được gửi trong file đính kèm.
        </p>


        <div>Xin chân thành cảm ơn !</div>
    `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear name ${dataSend.patientName}</>
        <p>You received this email because you booked an online medical appointment on BookingCare</p>
        
        <p>
            Information on prescriptions and invoices is sent in the attached file.
        </p>

        <div>Sincerely thanks !</div>
    `
    }
    return result
}

module.exports = {
    sendSimpleEmail,
    sendAttachment
}