import { defineStore } from 'pinia'
import type AdmUser from '@/interfaces/admin/AdmUser'
import type AdmSetting from '@/interfaces/admin/AdmSetting'
interface State {
  [abbrev: string]: string
}

const states: State = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
}

const statesDropDown = Object.keys(states).map((k: string) => {
  return { label: states[k], value: k }
})

const mapSettingsToOptions = (settings: AdmSetting[], prefix: string) => {
  return settings.length > 0
    ? settings
        .filter((item: AdmSetting) => item.prefix === prefix)
        .map((item) => {
          return {
            label: item.keyvalue ? item.keyvalue : item.keyname,
            value: item.keyname
          }
        })
    : []
}

const admStore = defineStore('admStore', {
  state: () => ({
    hasLoadedSettings: false,
    users: [] as AdmUser[],
    user: { id: 0 } as AdmUser,
    admSettings: [] as AdmSetting[],
    admSetting: { id: 0 } as AdmSetting,
    prefixName: '' as string,
    filter: '' as string,
    admSettingsCols: [
      { id: 1, name: 'id', field: 'id', label: 'Id', align: 'right' },
      { id: 2, name: 'prefix', field: 'Prefix', align: 'left' },
      {
        id: 3,
        name: 'keyname',
        field: 'keyname',
        label: 'Key Name',
        align: 'left'
      },
      {
        id: 4,
        name: 'keyvalue',
        field: 'keyvalue',
        label: 'Key Value',
        align: 'left'
      },
      {
        id: 4,
        name: 'display_rank',
        field: 'display_rank',
        label: 'Rank',
        align: 'right',
        sortable: true
      }
    ],
    loading: false as boolean,
    error: null,
    states: states as State
  }),
  getters: {
    HasUsers: (state) => state.users && state.users.length > 0,
    Users: (state) => state.users,
    AuthUser: (state) => state.user,
    HasSettings: (state) =>
      state.hasLoadedSettings && state.admSettings && state.admSettings.length > 0,
    Settings: (state) => state.admSettings,
    SettingsByPrefix: (state) => {
      return (prefix: string) => {
        if( !state.admSetting) {
          return state.admSetting
        }
        return state.admSettings.length > 0
          ? state.admSettings.filter((item: AdmSetting) => item.prefix === prefix)
          : state.admSettings
      }
    },
    PrefixOptions: (state) => {
      return mapSettingsToOptions(state.admSettings, '__prefix__')
    },
    PrefixSettingOptions: (state) => {
      return (prefix: string) => mapSettingsToOptions(state.admSettings, prefix)
    },
    PrefixSettingOptionsWithBlank: (state) => {
      return (prefix: string) => {
        const admRetval = mapSettingsToOptions(state.admSettings, prefix)
        const noneItem = { label: '--None--', value: '' }
        admRetval.sort((a, b) => (a.label > b.label ? 1 : -1))
        admRetval.unshift(noneItem)
        return admRetval
      }
    },
    AdmSetting: (state) => state.admSetting,
    PrefixName: (state) => state.prefixName,
    States: () =>
      Object.keys(states).map((k: string) => {
        return { label: states[k], value: k }
      }),
    AdmSettingsCols: (state) => state.admSettingsCols
  },
  actions: {
    setAdmUsers(newUsers: AdmUser[]) {
      this.users = newUsers
    },
    setAdmUser(newUser: AdmUser) {
      this.user = newUser
    },
    setAdmSettings(admSettings: AdmSetting[]) {
      this.admSettings = admSettings
    },
    getAdmSetting(id: number) {
      this.admSetting = this.admSettings.find((item) => item.id == id) || this.admSetting
    },
    setPrefixName(name: string) {
      this.prefixName = name
    },
    assignAuthUser(authUser: AdmUser) {
      Object.assign(this.user, authUser)
    },
    assignAdmSetting(admSetting: AdmSetting) {
      Object.assign(this.admSetting, admSetting)
    },
    getSettingsByPrefix(prefix: string) {
      return this.SettingsByPrefix(prefix)
    },
    getKeynameByPrefixAndKeyvalue(prefix: string, keyvalue: string) {
      const foundItem = this.admSettings.find(
        (item) => item.prefix === prefix && item.keyvalue === keyvalue
      )
      return foundItem ? foundItem.keyname : undefined
    },
    getKeyvalueByPrefixAndKeyname(prefix: string, keyname: string) {
      const foundItem = this.admSettings.find(
        (item: AdmSetting) => item.prefix === prefix && item.keyname === keyname
      )
      return foundItem ? foundItem.keyvalue : undefined
    }
  }
})

export { states, statesDropDown }
export default admStore
