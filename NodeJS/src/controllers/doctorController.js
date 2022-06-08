import doctorService from "../services/doctorService"


let getTopDoctorHome = async (req, res) => {
    let limit = req.body.limid;

    if (!limit) limit = 10

    try {
        let response = await doctorService.getTopDoctorHome(+ limit)

        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors()

        return res.status(200).json(doctors)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInfoDoctor(req.body)

        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        let infor = await doctorService.getDetailDoctor(req.query.id)

        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

let blukCreateSchedule = async (req, res) => {
    try {
        let response = await doctorService.blukCreateScheduleService(req.body)

        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let response = await doctorService.getScheduleByDateService(req.query.id, req.query.date)

        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getExtraInforDoctorByIdService(req.query.id)

        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getProfileDoctorByIdService(req.query.id)

        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

let getListPatientForDoctor = async (req, res) => {
    try {
        let response = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date)

        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

let sendRemedy = async (req, res) => {
    try {
        let response = await doctorService.sendRemedy(req.body)

        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the server"
        })
    }
}

module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    postInforDoctor,
    getDetailDoctorById,
    blukCreateSchedule,
    getScheduleByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    getListPatientForDoctor,
    sendRemedy
}