/*
@copyright : ToXSL Technologies Pvt. Ltd. < www.toxsl.com >
@author    : Shiv Charan Panjeta < shiv@toxsl.com >

All Rights Reserved.
Proprietary and confidential :  All information contained here in is, and remains
the property of ToXSL Technologies Pvt. Ltd. and it's partners.
Unauthorized copying of this file, via any medium is strictly prohibited.
*/

// authentation routes name
export const userSignupRoute = "/users/api/accounts/signup";
export const userLoginRoute = "/users/api/accounts/login";
export const refreshTokenRoute = "/users/api/token/refresh";

export const forgotPassword = "/users/api/accounts/forget_password_otp";
export const verifyOtp = "/users/api/accounts/forget_password_otp_verification";
export const resetPassword = "/users/api/accounts/forget_password_reset";

export const idenfyRoute = "/pods/api/redirect/idenfy";

export const getVehicleTypesRoute = "/users/api/vehicle_choices";
export const AddVehicleRoute = "/users/api/questions/";
export const getUserProfileRoute = "/users/api/accounts/profile/";
export const updateProfileRoute = "/users/api/accounts/profile/update/";
export const deleteProfileRoute = "/users/api/accounts/profile/delete/";

export const homeScreenRoute = "/pods/api/list";
export const podsList = "/pods/api/pod_locations/";
export const podDetailsRoute = "/pods/api/pod/";

export const openPodDoor = "/pods/api/pod/";

export const usageHistory = "/pods/api/usage_history/";
export const getUnreadNotification = "/users/api/accounts/unread_notification";
export const markReadUnread = "/users/api/accounts/update_notification/";
export const getLatestTermsRoute = "/users/api/accounts/terms/latest/";

export const getDeviceInfo = "users/api/accounts/sessionsignin/";

export const getSpotsInfo = "/spots/api/pod/";
export const userVerificationPod = "/spots/api/verify/";
export const userSetPod = "/spots/api/get_access";
