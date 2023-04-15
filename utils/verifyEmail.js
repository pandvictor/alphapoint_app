export default validateEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};


var a = {
  email: 'asad@gmail.com',
  uuid: '346f6436-5465-4b83-8a47-0702d0a19c78',
  access_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0Mjg4MzQ3LCJpYXQiOjE2NjQyODQ3NDcsImp0aSI6IjkwYzUwNmIyYWExMjQ0NWY5YWQ0OGE4MzlmNWQ5ZmE1IiwidXNlcl9pZCI6IjM0NmY2NDM2LTU0NjUtNGI4My04YTQ3LTA3MDJkMGExOWM3OCJ9.NF7L3R8cnOFRm4fytl4-kpMWucy5SdVW2Ms-AramyAU',
  refresh_token:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2Njg3Njc0NywiaWF0IjoxNjY0Mjg0NzQ3LCJqdGkiOiI0NjU5OGYzMDU3YTU0YmYwODY0NWUzMmVhMGE2YTIyNSIsInVzZXJfaWQiOiIzNDZmNjQzNi01NDY1LTRiODMtOGE0Ny0wNzAyZDBhMTljNzgifQ.vWQQn5ExphDjv6ZmzHrPpgc6aLRf2D3Xf8x00OO2z6k',
  idenfy_verification_status: true,
  user_first_login: false,
};