import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctor,
    getAllSpecialty

} from '../../services/userService';
import { toast } from 'react-toastify';



// Gender
export const fetchGenderStart = () => {
    return async (dispatch, setState) => {
        try {
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('Fetch gender start error : ', e);
        }
    }
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
});


// Role

export const fetchRoleStart = () => {
    return async (dispatch, setState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('Fetch gender start error : ', e);
        }
    }
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});


// Position

export const fetchPositionStart = () => {
    return async (dispatch, setState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('Fetch gender start error : ', e);
        }
    }
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});


export const createNewUser = (data) => {
    return async (dispatch, setState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user success")
                dispatch(createUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                alert(res.errMessage);
                dispatch(createUserFailed());
            }
        } catch (e) {
            dispatch(createUserFailed());
            console.log('Fetch create new user start error : ', e);
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,

})



export const fetchAllUserStart = () => {
    return async (dispatch, setState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {

                dispatch(fetchAllUserSuccess(res.users))
            } else {
                toast.error("Fetch all users error!")
                dispatch(fetchAllUserFailed());
            }
        } catch (e) {
            toast.error("Fetch all users error!")
            dispatch(fetchAllUserFailed());
            console.log('Fetch gender start error : ', e);
        }
    }
};


export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})




export const deleteUser = (userId) => {
    return async (dispatch, setState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete a new user success")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Delete a new user error!")
                dispatch(createUserFailed());
            }
        } catch (e) {
            toast.error("Delete a new user error!")
            dispatch(deleteUserFailed());
            console.log('Fetch create new user start error : ', e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})


export const editUser = (data) => {
    return async (dispatch, setState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update a new user success")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("Update a new user error!")
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Update a new user error!")
            dispatch(editUserFailed());
            console.log('Fetch update new user start error : ', e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})



export const fetchTopDoctor = () => {
    return async (dispatch, setState) => {
        try {
            let res = await getTopDoctorHomeService('4');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('Fetch doctor start error : ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, setState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (e) {
            console.log('Fetch get all doctor start error : ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}

export const saveDoctor = (data) => {
    return async (dispatch, setState) => {
        try {
            let res = await saveDetailDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Save Infor Detail Doctor Success")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    data: res.data
                })
            }
            else {
                toast.error("Save Infor Detail Doctor Error")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            toast.error("Save Infor Detail Doctor Error")
            console.log('Fetch save doctor start error : ', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}


export const fetchAllScheduleTime = () => {
    return async (dispatch, setState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (e) {
            console.log('Fetch get all doctor start error : ', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}


export const getRequiredDoctorInfo = () => {
    return async (dispatch, setState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty()

            if (
                resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            }
            else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('Fetch doctor infor start error : ', e);
        }
    }
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
});

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
});