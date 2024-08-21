import { defineStore } from 'pinia'

const ccCardStore = defineStore('ccCardStore', {
  state: () => ({
    cards: [],
    ccAccounts: [],
    ccAccountFilter: '',
    cardFilter: '',
    loading: false,
    error: null,
    item: null,
    filter: '',
    cardColumns: [
      {
        id: 1,
        name: 'id',
        field: 'id',
        label: 'id',
        style: 'width: 28px; color: red'
      },
      {
        id: 2,
        name: 'bank_code',
        field: 'bank_code',
        label: 'Bank Code',
        style: 'width: 40px',
        sortable: true
      },
      {
        id: 3,
        name: 'bank_name',
        field: 'bank_name',
        label: 'Bank',
        style: 'width: 168px;font-weight: bold; color: midnightblue;font-size: 1em',
        align: 'left',
        sortable: true
      },
      {
        id: 4,
        name: 'card_code',
        field: 'card_code',
        label: 'Card Code',
        sortable: true,
        align: 'left'
      },
      {
        id: 5,
        name: 'card_name',
        field: 'card_name',
        label: 'Card Name',
        style: 'font-weight: bold; color: midnightblue;font-size: 1em',
        sortable: true,
        align: 'left'
      },
      {
        id: 6,
        name: 'card_count',
        field: 'card_count',
        label: '# of Cards',
        sortable: true,
        align: 'right'
      }
    ],
    ccAccountColumns: [
      // { id: 1, name: "id", field: "id", label: "Id", align: "end" },
      // { id: 2, name: 'client_id', field: 'client_id'.  label: 'Client Id' }
      { id: 4, name: 'xero_id', field: 'xero_id', label: 'Xero ID' },
      {
        id: 3,
        name: 'client_name',
        field: 'client_name',
        label: 'Name',
        align: 'left'
      },
      // , { id: 5, name: "client_code", field: "client_code",  label: "Client Code" }
      // , { id: 6, name: "first_name", field: "first_name",  label: "First Name" }
      // , { id: 7, name: "last_name", field: "last_name",  label: "Last" }
      {
        id: 8,
        name: 'card_name',
        field: 'card_name',
        label: 'Card',
        align: 'left'
      },
      // {
      //   id: 9,
      //   name: "card_status",
      //   field: "card_status",
      //   label: "Card Status",
      // },
      {
        id: 10,
        name: 'cc_status_desc',
        field: 'cc_status_desc',
        label: 'Status'
      },
      // { id: 11, name: "device", field: "device", label: "Device" },
      // { id: 12, name: "device_desc", field: "device_desc", label: "Device" },
      { id: 13, name: 'open_date', field: 'open_date', label: 'Open Date' },
      { id: 14, name: 'card_num', field: 'card_num', label: 'Card Num' },
      { id: 15, name: 'card_exp', field: 'card_exp', label: 'Card Exp' },
      // , { id: 14, name: "cc_login", field: "cc_login",  label: "Login"}
      // , { id: 15, name: "pwd", field: "pwd",  label: "Pssword" }
      // , { id: 16, name: "cc_card_info", field: "cc_card_info",  label: "CC Info" }
      // , { id: 17, name: "reconciled_on", field: "reconciled_on",  text : "Reconciled On" }
      // , { id: 18, name: "charged_on", field: "charged_on",  label: "Charged On" }
      {
        id: 19,
        name: 'credit_line',
        field: 'credit_line',
        label: 'Credit Line',
        align: 'right'
      }
    ]
  }),
  getters: {
    Cards: (state) => state.cards,
    HasCards: (state) => (state.cards && state.cards.length > 0 ? true : false),
    CardColumns: (state) => state.cardColumns,
    CardFilter: (state) => state.cardFilter,
    CcAccounts: (state) => state.ccAccounts,
    HasCcAccounts: (state) => (state.ccAccounts && state.ccAccounts.length > 0 ? true : false),
    CcAccountColumns: (state) => state.ccAccountColumns,
    CcAccountFilter: (state) => state.ccAccountFilter,
    CardNames: (state) => {
      return state.cards ? state.cards.map((item) => item.card_name) : null
    }
  },
  actions: {
    setFilter(newFilter: string) {
      this.filter = newFilter
    },
    getCardCode(cardName: string) {
      const card = this.cards.find((item) => item.card_name == cardName)
      return card ? card.card_code : null
    }
  }
})

export default ccCardStore
