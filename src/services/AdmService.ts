import { getActivePinia } from 'pinia'
import apiService from './apiService'
import type User from '@/interfaces/common/User'
import type AdmUser from '@/interfaces/admin/AdmUser'
import type AdmSetting from '@/interfaces/admin/AdmSetting'
import type Ping from '@/interfaces/admin/Ping'
import admStore from '@/stores/AdmStore'

const myAdmStore = (getActivePinia()) ? admStore() : null;

const ping = async (): Promise<any> => {
  return (await apiService.get('ping')) as Ping
}
const getUsers = async () => {
  const admUsers = (await apiService.get('auth/users')) as AdmUser[]
  myAdmStore.setAdmUsers(admUsers)
}
const getUser = async (id: number) => {
  const admUser = (await apiService.get(`auth/user/${id}`)) as AdmUser
  myAdmStore.setAdmUser(admUser)
}
const postUser = async (postData: User) => {
  const admUser = (await apiService.post(`auth/user/${postData.id}`, postData)) as AdmUser
  myAdmStore.setAdmUser(admUser)
}
const deleteUser = async (id: number) => {
  const admUser = await apiService.delete(`auth/user/${id}`)
  myAdmStore.deleteAdmUser(id)
}
const getSettings = async (): Promise<AdmSetting[]> => {
  const admSettings = (await apiService.get('adm/settings')) as AdmSetting[]
  myAdmStore.setAdmSettings(admSettings)
  return admSettings
}
const getSetting = async (id: number) => {
  const admSetting = (await apiService.get(`adm/settings/${id}`)) as AdmSetting
  myAdmStore.getAdmSetting(id)
}
const postSetting = async (postData: AdmSetting) => {
  const admSetting = (await apiService.post(`adm/settings/${postData.id}`, postData)) as AdmSetting
  myAdmStore.setAdmSetting(admSetting)
}
const deleteSetting = async (id: number) => {
  await apiService.delete(`adm/setting/${id}`)
  myAdmStore.deleteAdmSetting(id)
}

const getKeyValue = ( keyname: string, adm_settings: AdmSetting[]): string => {
  const found = adm_settings.find((item: AdmSetting) => item.keyname == keyname)
  return ( found) ? found.keyvalue : keyname
}

const admService = {
  ping: ping,
  getUsers: getUsers,
  getUser: getUser,
  postUser: postUser,
  deleteUser: deleteUser,
  getSettings: getSettings,
  getSetting: getSetting,
  postSetting: postSetting,
  deleteSetting: deleteSetting,
  hasLoadedSettings: () => myAdmStore.HasSettings,
  getSettingsByPrefix: (prefix: string) => myAdmStore.getSettingsByPrefix(prefix),
  PrefixSettingOptions: myAdmStore.PrefixSettingOptions,
  PrefixSettingOptionsWithBlank: myAdmStore.PrefixSettingOptionsWithBlank,
  getKeyValue: getKeyValue
}

export default admService
