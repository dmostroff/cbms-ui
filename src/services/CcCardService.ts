import apiService from '@/services/ApiService'

const getCards = async () => {
  const cards = await apiService.get('creditcards')
  return cards
}

const getCcAccounts = async () => {
  const ccAccounts = await apiService.get('creditcard/accounts')
  return ccAccounts
}

const ccCardService = {
  getCards: getCards,
  getCcAccounts: getCcAccounts
}

export default ccCardService
