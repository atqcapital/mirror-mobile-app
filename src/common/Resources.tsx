import { Dimensions } from 'react-native'
import { EdgeInsets } from 'react-native-safe-area-context/lib/typescript/src/SafeArea.types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Clipboard from '@react-native-community/clipboard'

export const Fonts = {
  medium: 'MirrorRounded-Medium',
  book: 'MirrorRounded-Book',
  light: 'MirrorRounded-Light',
  bold: 'MirrorRounded-Bold',
}

export const Colors = {
  darkBackground: '#1b1b1d',
  darkGrey: '#2c2c2e',
  darkGreyTwo: '#222224',
  darkGreyThree: '#161617',
  darkGreyFour: '#131314',
  black: '#1f1f1f',
  greyishBrown: '#555555',
  brownishGrey: '#6b6b6b',
  veryLightPink: '#cccccc',
  veryLightPinkTwo: '#eaeaea',
  white: '#ffffff',
  brightTeal: '#00edc7',
  brightTealTransparent: '#00edc766',
  aquamarine: '#01e0bc',
  sea: '#329f87',
  darkGreenBlue: '#296d60',
  dark: '#1f3b36',
  brightPink: '#ff00bd',

  dummyup: 'rgb(9,9,10)',
  dummydown: 'rgb(40,40,42)',
}

export const lotties = {
  main: require('../../assets/lotties/Mirror_splash.json'),
  loading: require('../../assets/lotties/Mirror_loading.json'),
}

export const Images = {
  btnBackB: require('../../assets/images/btnBackB.png'),
  btnForwardB: require('../../assets/images/btnForwardB.png'),
  btnBackW: require('../../assets/images/btnBackW.png'),
  btnForwardW: require('../../assets/images/btnForwardW.png'),
  btnClose16W: require('../../assets/images/btnClose16W.png'),
  btnCloseB10: require('../../assets/images/btnCloseB10.png'),
  btnCloseB12: require('../../assets/images/btnCloseB12.png'),
  btnCloseG10: require('../../assets/images/btnCloseG10.png'),
  btnCloseW10: require('../../assets/images/btnCloseW10.png'),
  btnCloseW12: require('../../assets/images/btnCloseW12.png'),
  btnResetG: require('../../assets/images/btnResetG.png'),
  btnResetW: require('../../assets/images/btnResetW.png'),
  iconBuyG: require('../../assets/images/iconBuyG.png'),
  iconCreditCard: require('../../assets/images/iconCreditCard.png'),
  iconDecrease: require('../../assets/images/iconDecrease.png'),
  iconDecreaseB: require('../../assets/images/iconDecreaseB.png'),
  iconEqualsW: require('../../assets/images/iconEqualsW.png'),
  iconError: require('../../assets/images/iconError.png'),
  iconExchange: require('../../assets/images/iconExchange.png'),
  iconFavactive: require('../../assets/images/fav-active.png'),
  iconFavbase: require('../../assets/images/fav-base.png'),
  iconFavdefault: require('../../assets/images/fav-default.png'),
  iconHistoryW: require('../../assets/images/iconHistoryW.png'),
  iconIncrease: require('../../assets/images/iconIncrease.png'),
  iconIncreaseB: require('../../assets/images/iconIncreaseB.png'),
  iconMinusB: require('../../assets/images/iconMinusB.png'),
  iconMultiplicationB: require('../../assets/images/iconMultiplicationB.png'),
  iconMultiplicationG: require('../../assets/images/iconMultiplicationG.png'),
  iconNoticeB: require('../../assets/images/iconNoticeB.png'),
  iconNoticeW: require('../../assets/images/iconNoticeW.png'),
  iconPlusG: require('../../assets/images/iconPlusG.png'),
  iconQuestion: require('../../assets/images/iconQuestion.png'),
  iconSearch: require('../../assets/images/iconSearch.png'),
  iconSearchErase: require('../../assets/images/iconSearchErase.png'),
  iconSending: require('../../assets/images/iconSending.png'),
  iconSettingW: require('../../assets/images/iconSettingW.png'),
  iconSort: require('../../assets/images/iconSort.png'),
  iconSort2x: require('../../assets/images/iconSort2x.png'),
  iconSupport: require('../../assets/images/iconSupport.png'),
  iconSwitch: require('../../assets/images/iconSwitch.png'),
  iconWalletW: require('../../assets/images/iconWalletW.png'),
  next: require('../../assets/images/next.png'),
  prev: require('../../assets/images/prev.png'),

  onboarding01: require('../../assets/images/imgOnboarding01.png'),
  onboarding02: require('../../assets/images/imgOnboarding02.png'),
  onboarding03: require('../../assets/images/imgOnboarding03.png'),
  onboarding04: require('../../assets/images/imgOnboarding04.png'),
  onboarding05: require('../../assets/images/imgOnboarding05.png'),

  faceid: require('../../assets/images/faceid.png'),
  touchid: require('../../assets/images/touchid.png'),

  apple: require('../../assets/images/apple2.png'),
  google: require('../../assets/images/google2.png'),
  facebook: require('../../assets/images/facebook2.png'),

  biometrics: require('../../assets/images/biometrics.png'),
  details: require('../../assets/images/details.png'),
  language: require('../../assets/images/language.png'),
  password: require('../../assets/images/password.png'),
  privacy: require('../../assets/images/privacy.png'),
  version: require('../../assets/images/version.png'),

  logout: require('../../assets/images/logout.png'),

  btnSwapG24: require('../../assets/images/btnSwapG24.png'),
  btnSwapG26: require('../../assets/images/btnSwapG26.png'),
  chevronR10G: require('../../assets/images/chevronR10G.png'),
  chevronR11G: require('../../assets/images/chevronR11G.png'),
  iconWalletG18: require('../../assets/images/iconWalletG18.png'),

  btnExpandOpenB: require('../../assets/images/btnExpandOpenB.png'),
  btnExpandOpenG: require('../../assets/images/btnExpandOpenG.png'),
  iconCheckB: require('../../assets/images/iconCheckB.png'),
  switch_off: require('../../assets/images/switch_off.png'),
  switch_on: require('../../assets/images/switch_on.png'),

  logoKrt: require('../../assets/images/logoKrt.png'),
  logoMnt: require('../../assets/images/logoMnt.png'),
  logoSdt: require('../../assets/images/logoSdt.png'),
  logoUst: require('../../assets/images/logoUst.png'),
  logoLuna: require('../../assets/images/logoLuna.png'),

  iconCharge: require('../../assets/images/iconCharge.png'),
  iconMirror28: require('../../assets/images/iconMirror28.png'),

  LogoSimplex: require('../../assets/images/logoSimplex.png'),
  logoBtc: require('../../assets/images/logoBtc.png'),
  logoEth: require('../../assets/images/logoEth.png'),
  logoMoonpay: require('../../assets/images/logoMoonpay.png'),
  logoTransak: require('../../assets/images/logoTransak.png'),
  logoUsdc: require('../../assets/images/logoUsdc.png'),
  logoUsdt: require('../../assets/images/logoUsdt.png'),
}

export function getSafeLayoutInsets(): EdgeInsets {
  let insets = useSafeAreaInsets()
  return insets
}

export function windowSize(): { width: number; height: number } {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
}

export function setClipboard(text: string) {
  Clipboard.setString(text)
}

export async function pasteClipboard() {
  return await Clipboard.getString()
}
