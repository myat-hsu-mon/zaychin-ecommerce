import MyanmerPhone from 'myanmar-phonenumber'
const isMmPhoneNumber = (phone) => {
  return MyanmerPhone.isValidMMPhoneNumber(phone)
}
export default isMmPhoneNumber