import DeviceInfo from 'react-native-device-info';
import {putReq} from '../Apis/Utils/Request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authServices from '../Apis/Services/UserAuth';
import {constants} from '../Components/Constant';
import showNotification from '../Components/Popup';
import {Platform} from 'react-native';

// Language: javascript
const getDeviceAttributes = async () => {
  console.log('I called');
  const userData = await AsyncStorage.getItem('Userdata');
  let userInfo = JSON.parse(userData);
  let user = userInfo?.uuid;
  const androidId = await DeviceInfo.getAndroidId();
  const apiLevel = await DeviceInfo.getApiLevel();
  const applicationName = DeviceInfo.getApplicationName();
  let baseOS = '';
  if (Platform.OS === 'ios') {
    baseOS = Platform.OS;
  } else {
    baseOS = await DeviceInfo.getBaseOs();
  }
  const buildId = await DeviceInfo.getBuildId();
  const batteryLevel = await DeviceInfo.getBatteryLevel();
  const bootloader = await DeviceInfo.getBootloader();
  let brand = DeviceInfo.getBrand();
  let buildNumber = DeviceInfo.getBuildNumber();
  let bundleId = DeviceInfo.getBundleId();
  let cameraPresent = await DeviceInfo.isCameraPresent();
  let carrier = await DeviceInfo.getCarrier();
  let codeName = await DeviceInfo.getCodename();
  let device = await DeviceInfo.getDevice();
  let deviceId = DeviceInfo.getDeviceId();
  let display = await DeviceInfo.getDisplay();
  let deviceName = await DeviceInfo.getDeviceName();
  let firstInstallTime = await DeviceInfo.getFirstInstallTime();
  let fingerprint = await DeviceInfo.getFingerprint();
  let fontScale = await DeviceInfo.getFontScale();
  let freeDiskStorage = await DeviceInfo.getFreeDiskStorage();
  let hardware = await DeviceInfo.getHardware();
  let host = await DeviceInfo.getHost();
  let ip_address = await DeviceInfo.getIpAddress();
  let installerPackageName = await DeviceInfo.getInstallerPackageName();
  let installReferrer = await DeviceInfo.getInstallReferrer();
  let instanceId = await DeviceInfo.getInstanceId();
  let lastUpdateTime = await DeviceInfo.getLastUpdateTime();
  if (
    lastUpdateTime == null ||
    lastUpdateTime == undefined ||
    lastUpdateTime == '' ||
    lastUpdateTime == 'null' ||
    lastUpdateTime == 'undefined' ||
    lastUpdateTime == ' ' ||
    lastUpdateTime == 'NaN' ||
    lastUpdateTime < 0
  ) {
    lastUpdateTime = 0;
  }
  let macAddress = await DeviceInfo.getMacAddress();
  let manufacturer = await DeviceInfo.getManufacturer();
  let maxMemory = await DeviceInfo.getMaxMemory();
  if (
    maxMemory == null ||
    maxMemory == undefined ||
    maxMemory == '' ||
    maxMemory == 'null' ||
    maxMemory == 'undefined' ||
    maxMemory == ' ' ||
    maxMemory == 'NaN' ||
    maxMemory < 0
  ) {
    maxMemory = 0;
  }
  let model = await DeviceInfo.getModel();
  let batteryState = 'null';
  //await DeviceInfo.getBatteryState();
  let lowPowerMode = false;
  //await DeviceInfo.isLowPowerModeEnabled();
  let product = await DeviceInfo.getProduct();
  let previewSdkInt = await DeviceInfo.getPreviewSdkInt();
  if (
    previewSdkInt == null ||
    previewSdkInt == undefined ||
    previewSdkInt == '' ||
    previewSdkInt == 'null' ||
    previewSdkInt == 'undefined' ||
    previewSdkInt == ' ' ||
    previewSdkInt == 'NaN' ||
    previewSdkInt < 0
  ) {
    previewSdkInt = 0;
  }
  let readableVersion = await DeviceInfo.getReadableVersion();
  let securityPatch = await DeviceInfo.getSecurityPatch();
  let systemName = await DeviceInfo.getSystemName();
  let systemVersion = await DeviceInfo.getSystemVersion();
  let tags = await DeviceInfo.getTags();
  let buildType = await DeviceInfo.getType();
  let totalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
  let totalMemory = await DeviceInfo.getTotalMemory();
  let isAirplaneMode = await DeviceInfo.isAirplaneMode();
  let isBatteryCharging = await DeviceInfo.isBatteryCharging();
  let isEmulator = await DeviceInfo.isEmulator();
  let isKeybordConnected = await DeviceInfo.isKeyboardConnected();
  let isPinOrFingerprint = await DeviceInfo.isPinOrFingerprintSet();
  let isTablet = await DeviceInfo.isTablet();
  let isTabletMode = await DeviceInfo.isTabletMode();
  let isLandscape = await DeviceInfo.isLandscape();
  let isMouseConnected = await DeviceInfo.isMouseConnected();
  let hasGMS = await DeviceInfo.hasGms();
  let hasHMS = await DeviceInfo.hasHms();
  let hasNotch = await DeviceInfo.hasNotch();
  let hasDynamicIsland = await DeviceInfo.hasDynamicIsland();
  let deviceType = await DeviceInfo.getDeviceType();
  let supportedABIS = await DeviceInfo.supportedAbis();
  let isLocationEnabled = await DeviceInfo.isLocationEnabled();
  let isHeadPhonesConnected = await DeviceInfo.isHeadphonesConnected();
  let brightness = await DeviceInfo.getBrightness();
  //let user = await DeviceInfo.getUserAgent();
  const deviceInfo = {
    androidId,
    aPILevel: apiLevel,
    applicationName,
    baseOS,
    batteryLevel,
    bootloader,
    brand,
    buildNumber,
    bundleId,
    cameraPresent,
    carrier,
    codeName,
    device,
    deviceId,
    display,
    deviceName,
    firstInstallTime,
    fingerprint,
    fontScale,
    freeDiskStorage,
    hardware,
    host,
    ip_address,
    installerPackageName,
    installReferrer,
    instanceId,
    lastUpdateTime,
    macAddress,
    manufacturer,
    maxMemory,
    model,
    batteryState,
    lowPowerMode,
    product,
    previewSdkInt,
    readableVersion,
    securityPatch,
    systemName,
    systemVersion,
    buildId,
    tags,
    buildType,
    totalDiskCapacity,
    totalMemory,
    isAirplaneMode,
    isBatteryCharging,
    isEmulator,
    isKeybordConnected,
    isPinOrFingerprint,
    isTablet,
    isTabletMode,
    isLandscape,
    isMouseConnected,
    hasGMS,
    hasHMS,
    hasNotch,
    hasDynamicIsland,
    deviceType,
    supportedABIS,
    isLocationEnabled,
    isHeadPhonesConnected,
    brightness,
    user,
  };
  console.log('deviceInfo', deviceInfo);
  //putReq('device', deviceInfo);
  await authServices
    .deviceInfo(deviceInfo)
    .then(resp => {
      if (resp?.data?.status == constants.Fourhundred) {
        // showNotification({
        //   type: 'danger',
        //   message: 'Edit Profile',
        //   description: resp?.data
        //       ? resp?.data?.message
        //       : 'Something went wrong',
        // });
      } else if (resp?.status == constants.TwoHundred) {
        // showNotification({
        //   type: 'success',
        //   message: 'Device Info',
        //   description: resp?.data
        //       ? resp?.data?.message
        //       : 'Something went wrong',
        // });
      }
    })
    .catch(err => {
      console.log(err);
      // setShowloder(false);
      // showNotification({
      //   type: 'danger',
      //   message: err.message ? err.message : 'Something went wrong',
      // });
    });
};

export default getDeviceAttributes;
