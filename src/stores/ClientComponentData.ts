const clientComponentData = {
  clients: {
    title: 'Clients',
    columns: [
      {
        id: 1,
        value: 'id',
        key: 'id',
        title: 'id',
        sortable: true,
        // classes: 'id-column'
      },
      {
        id: 2,
        value: 'client_code',
        key: 'client_code',
        title: 'Code',
        sortable: true
      },
      {
        id: 3,
        value: 'last_name',
        key: 'last_name',
        title: 'Last Name',
        align: 'left',
        sortable: true
      },
      {
        id: 4,
        value: 'first_name',
        key: 'first_name',
        title: 'First Name',
        align: 'left',
        sortable: true
      },
      // { id: 5, value: "middle_name", key: "middle_name", title: "Mnamedle Name" },
      {
        id: 6,
        key: 'dob',
        title: 'DoB',
        style: 'width: 20px; color: #0000FF',
        align: 'center',
        format: (value: string, row: any) => {
          try {
            const dt = new Date(value)
            return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`
          } catch (error) {
            return value
          }
        }
      },
      // { id: 7, value: "gender", key: "gender", title: "Gender" },
      // { id: 8, value: "ssn", key: "ssn", title: "Ssn" },
      // { id: 9, value: "mmn", key: "mmn", title: "Mmn" },
      { id: 10, key: 'email', title: 'Email', align: 'left' },
      // { id: 11, value: "pwd", key: "pwd", title: "Pwd" },
      // { id: 12, value: "phone", key: "phone", title: "Phone" },
      // { id: 13, value: "income", key: "income", title: "Income" },
      // { id: 14, value: "phone_cell", key: "phone_cell", title: "Phone Cell" },
      // { id: 15, value: "phone_official", key: "phone_official", title: "Phone Official" },
      // { id: 16, key: "client_status", title: "Status" },
      {
        id: 16,
        key: 'client_status_desc',
        title: 'Status',
        style: 'width: 68px;',
        align: 'center'
      },
      // { id: 17, value: "client_info", key: "client_info", title: "Client Info" },
      // { id: 18, value: "recorded_on", key: "recorded_on", title: "Recorded On" },
      {
        id: 30,
        value: 'actions',
        title: 'Actions',
        key: '',
        align: 'center'
      }
    ],
    getUrl: 'clients',
    postUrl: 'clients/0',
    deleteUrl: 'client'
  },
  client: {
    title: 'Client',
    getUrl: 'client',
    postUrl: 'client/0',
    deleteUrl: 'client'
  },
  person: {
    title: 'Client Person',
    getUrl: 'client/person',
    postUrl: 'client/person/0',
    deleteUrl: 'client/person',
    childRoute: 'person'
  },
  address: {
    title: 'Client Address',
    columns: [
      { id: 1, value: 'id', key: 'id', title: 'Id', classes: 'id-column' },
      // { id: 2, value: 'client_code', key: 'client_code'.  title: 'Client Code' },
      { id: 3, value: 'is_current', key: 'is_current', title: 'Is Current' },
      {
        id: 4,
        value: 'street_address',
        key: 'street_address',
        title: 'Address',
        align: 'left'
      },
      { id: 6, value: 'city', key: 'city', title: 'City', align: 'left' },
      { id: 7, value: 'state', key: 'state', title: 'State', align: 'left' },
      { id: 8, value: 'zip', key: 'zip', title: 'Zip' },
      // { id: 9, value: "country", key: "country",  title: "Country" },
      // , { id: 12, value: 'recorded_on', key: 'recorded_on'.  title: 'Recorded On' }
      {
        id: 20,
        value: 'actions',
        key: 'actions',
        title: 'Actions',
        sortable: false
      }
    ],
    getUrl: 'client/address',
    postUrl: 'client/address/0',
    deleteUrl: 'client/address',
    childRoute: 'address'
  },

  cc_account: {
    title: 'CC Account',
    columns: [
      { id: 1, value: 'id', key: 'id', title: 'Id', classes: 'id-column' },
      // , { id: 2, value: 'client_id', key: 'client_id'.  title: 'Client Id' }
      // , { id: 3, value: "client_name", key: "client_name",  title: "Name" }
      {
        id: 4,
        value: 'xero_id',
        key: 'xero_id',
        title: 'Xero ID',
        align: 'left',
        sortable: true
      },
      // , { id: 5, value: "client_code", key: "client_code",  title: "Client Code" }
      // , { id: 6, value: "first_name", key: "first_name",  title: "First Name" }
      // , { id: 7, value: "last_name", key: "last_name",  title: "Last" }
      {
        id: 8,
        value: 'card_name',
        key: 'card_name',
        title: 'Card',
        align: 'left',
        sortable: true
      },
      // , { id: 9, value: "card_status", key: "card_status",  title: "Card Status"}
      {
        id: 10,
        value: 'cc_status_desc',
        key: 'cc_status_desc',
        title: 'Status',
        align: 'left',
        sortable: true
      },
      // , { id: 11, value: "device", key: "device",  title: "Device"}
      {
        id: 12,
        value: 'device_desc',
        key: 'device_desc',
        title: 'Device',
        align: 'left'
      },
      {
        id: 13,
        value: 'open_date',
        key: 'open_date',
        title: 'Open Date',
        align: 'left',
        sortable: true
      },
      // , { id: 14, value: "cc_login", key: "cc_login",  title: "Login"}
      // , { id: 15, value: "pwd", key: "pwd",  title: "Pssword" }
      // , { id: 16, value: "cc_card_info", key: "cc_card_info",  title: "CC Info" }
      // , { id: 17, value: "reconciled_on", key: "reconciled_on",  text : "Reconciled On" }
      // , { id: 18, value: "charged_on", key: "charged_on",  title: "Charged On" }
      {
        id: 19,
        value: 'credit_line',
        key: 'credit_line',
        title: 'Credit Line',
        align: 'right',
        sortable: true,
        format: (value: any, row) => {
          try {
            if (typeof value === 'number') {
              return value.toLocaleString()
            } else {
              return value
            }
          } catch (error) {
            return value
          }
        }
      },
      // , { id: 20, value: "due_on", key: "due_on",  title: "Due On" }
      // , { id: 21, value: "bonus_to_spend", key: "bonus_to_spend",  title: "Bonus" }
      // , { id: 22, value: "bonus_spend_by", key: "bonus_spend_by",  title: "Bonus Spend By" }
      // , { id: 23, value: "bonus_spent", key: "bonus_spent",  title: "Bonus Spent" }
      // , { id: 24, value: "ccaccount_info", key: "ccaccount_info",  title: "Account Info" }
      // , { id: 25, value: "task", key: "task",  title: "Tesk" }
      {
        id: 26,
        value: 'in_charge',
        key: 'in_charge',
        title: 'In Charge',
        align: 'left',
        sortable: true
      },
      // , { id: 27, value: "notes", key: "notes",  title: "Notes" }
      // , { id: 28, value: "recorded_on", key: "recorded_on",  title: "Recorded On" }
      {
        id: 30,
        value: 'actions',
        key: 'actions',
        title: 'Actions',
        sortable: false
      }
    ],
    getUrl: 'cc/accounts',
    postUrl: 'cc/account/0',
    deleteUrl: 'cc/account',
    childRoute: 'ccaccount'
  },
  checking: {
    title: 'Checking',
    columns: [
      { id: 1, value: 'id', key: 'id', title: 'Id', classes: 'id-column' },
      { id: 2, value: 'xero_id', key: 'xero_id', title: 'Xero Id' },
      // , { id: 3, value: 'client_id', key: 'client_id'.  title: 'Client Id' }
      {
        id: 4,
        value: 'name_on_account',
        key: 'name_on_account',
        title: 'Name on Acct',
        align: 'left'
      },
      // {
      //   id: 5,
      //   value: "account_status",
      //   key: "account_status",
      //   title: "Account Status",
      // },
      {
        id: 6,
        key: 'account_status_desc',
        title: 'Checking Status',
        style: 'width: 68px;',
        align: 'left'
      },
      {
        id: 7,
        value: 'device',
        key: 'device',
        title: 'Device',
        align: 'left'
      },
      { id: 8, value: 'open_date', key: 'open_date', title: 'Open Date' },
      // , { id: 9, value: 'login', key: 'login'.  title: 'Account Login' }
      // , { id: 10, value: 'pwd', key: 'pwd'.  title: 'Account Pwd' }
      { id: 11, value: 'bank', key: 'bank', title: 'Bank', align: 'left' },
      {
        id: 12,
        value: 'routing',
        key: 'routing',
        title: 'Rount #',
        align: 'left'
      },
      {
        id: 13,
        value: 'account',
        key: 'account',
        title: 'Account #',
        align: 'left'
      },
      // , { id: 14, value: 'member_number', key: 'member_number'.  title: 'Member' }
      // , { id: 15, value: 'debit_card_num', key: 'debit_card_num'.  title: 'Debit Card Num' }
      // , { id: 16, value: 'debit_card_exp', key: 'debit_card_exp'.  title: 'Debit Card Exp' }
      // , { id: 17, value: 'debit_card_cvv', key: 'debit_card_cvv'.  title: 'Debit Card CVV' }
      // , { id: 18, value: 'debit_card_pin', key: 'debit_card_pin'.  title: 'Debit Card PIN' }
      {
        id: 19,
        value: 'reconciled_on',
        key: 'reconciled_on',
        title: 'Reconciled On'
      },
      // , { id: 20, value: 'zelle', key: 'zelle'.  title: 'Zelle' }
      // , { id: 21, value: 'wise', key: 'wise'.  title: 'Wise' }
      // , { id: 22, value: 'wise_device', key: 'wise_device'.  title: 'Wise Device' }
      // , { id: 23, value: 'checking_info', key: 'checking_info'.  title: 'Checking Info' }
      // , { id: 24, value: 'task', key: 'task'.  title: 'Task' }
      // , { id: 25, value: 'notes', key: 'notes'.  title: 'Notes' }
      // , { id: 26, value: 'recorded_on', key: 'recorded_on'.  title: 'Recorded On' }
      {
        id: 30,
        value: 'actions',
        key: 'actions',
        title: 'Actions',
        sortable: false
      }
    ],
    getUrl: 'client/checkings',
    postUrl: 'client/checking/0',
    deleteUrl: 'client/checking',
    childRoute: 'checking'
  },
  credit_line_history: {
    title: 'Credit Line History',
    columns: [
      {
        id: 1,
        value: 'id',
        key: 'id',
        title: 'Id',
        classes: 'id-column'
      },
      // , { id: 2, value: 'client_id', key: 'client_id'.  title: 'Client Id' }
      // , { id: 3, value: 'client_code', key: 'client_code'.  title: 'Client Code' }
      // , { id: 4, value: 'card_id', key: 'card_id'.  title: 'Card Id' }
      { id: 5, value: 'xero_id', key: 'xero_id', title: 'Xero Id' },
      {
        id: 6,
        value: 'cl_date',
        key: 'cl_date',
        title: 'Date',
        format: (value: string, row) => {
          try {
            const dt = new Date(value)
            return `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`
          } catch (error) {
            return value
          }
        }
      },
      {
        id: 7,
        value: 'amount',
        key: 'amount',
        title: 'Amount',
        format: (value: string, row) => {
          try {
            return parseFloat(value).toPrecision(2)
          } catch (error) {
            return error + ':' + value
          }
        }
      },
      // { id: 8, value: "cl_status", key: "cl_status", title: "Status" },
      {
        id: 8,
        value: 'cl_status_desc',
        key: 'cl_status_desc',
        title: 'CL Status'
      },
      // { id: 9, value: "notes", key: "notes", title: "Notes" },
      { id: 10, value: 'cl_info', key: 'cl_info', title: 'Info' },
      {
        id: 11,
        value: 'recorded_on',
        key: 'recorded_on',
        title: 'Recorded On'
      },
      {
        id: 19,
        value: 'actions',
        key: 'actions',
        title: 'Actions',
        sortable: false
      }
    ],
    getUrl: 'client/creditlines',
    postUrl: 'client/creditline/0',
    deleteUrl: 'client/creditline',
    childRoute: 'creditline'
  },
  credit_report: {
    title: 'Credit Report',
    columns: [
      {
        id: 1,
        value: 'id',
        key: 'id',
        title: 'Id',
        classes: 'id-column'
        // style: "width: 48px; color: #000000; background-color: #DDDDDD",
      },
      // { id: 2, value: "client_id", key: "client_id",  title: "Client Id" },
      {
        id: 3,
        value: 'credit_bureau',
        key: 'credit_bureau',
        title: 'Credit Bureau',
        align: 'left'
      },
      { id: 4, value: 'login', key: 'login', title: 'Login', align: 'left' },
      // { id: 23, value: "recorded_on", key: "recorded_on",  title: "Recorded On" },
      {
        id: 30,
        value: 'actions',
        key: 'actions',
        title: 'Actions',
        sortable: false
      }
    ],
    getUrl: 'client/creditreports',
    postUrl: 'client/creditreport/0',
    deleteUrl: 'client/creditreport',
    childRoute: 'creditreport'
  },
  client_israel: {
    title: 'Client Israel Information',
    columns: [
      {
        id: 1,
        value: 'id',
        key: 'id',
        title: 'Id',
        classes: 'id-column'
      },
      // , { id: 2, value: 'client_id', key: 'client_id'.  title: 'Client Id' }
      {
        id: 3,
        value: 'client_code',
        key: 'client_code',
        title: 'Client Code'
      },
      { id: 4, value: 'bank', key: 'bank', title: 'Bank' },
      { id: 5, value: 'branch', key: 'branch', title: 'Branch' },
      { id: 6, value: 'account', key: 'account', title: 'Account #' },
      // , { id: 7, value: 'iban', key: 'iban'.  title: 'IBAN' }
      // , { id: 8, value: 'iban_name', key: 'iban_name'.  title: 'IBAN Name' }
      { id: 9, value: 'address', key: 'address', title: 'Address' },
      { id: 10, value: 'city', key: 'city', title: 'City' },
      { id: 11, value: 'zip', key: 'zip', title: 'Zip' },
      // , { id: 12, value: 'phone', key: 'phone'.  title: 'Phone' }
      // , { id: 13, value: 'notes', key: 'notes'.  title: 'Notes' }
      // , { id: 14, value: 'recorded_on', key: 'recorded_on'.  title: 'Recorded On' }
      {
        id: 19,
        value: 'actions',
        key: 'actions',
        title: 'Actions',
        sortable: false
      }
    ],
    getUrl: 'client/israels',
    postUrl: 'client/israel/0',
    deleteUrl: 'client/israel',
    childRoute: 'israelinfo'
  },
  loan: {
    title: 'Loan',
    columns: [
      { id: 1, value: 'id', key: 'id', title: 'Id', classes: 'id-column' },
      // { id: 2, value: "client_id", key: "client_id",  title: "Client Id" },
      { id: 3, value: 'xero_id', key: 'xero_id', title: 'Xero' },
      // { id: 4, value: "client_code", key: "client_code",  title: "Client Code" },
      // { id: 5, value: "first_name", key: "first_name",  title: "First Name" },
      // { id: 6, value: "last_name", key: "last_name",  title: "Last Name" },
      { id: 7, value: 'card_name', key: 'card_name', title: 'Card' },
      { id: 8, value: 'loan_status', key: 'loan_status', title: 'Status' },
      // { id: 9, value: "device", key: "device",  title: "Device" },
      // { id: 10, value: "open_date", key: "open_date",  title: "Open Date" },
      // { id: 11, value: "login", key: "login",  title: "Login" },
      // { id: 12, value: "pwd", key: "pwd",  title: "Pwd" },
      {
        id: 13,
        value: 'loan_number',
        key: 'loan_number',
        title: 'Loan Number'
      },
      {
        id: 14,
        value: 'reconciled_on',
        key: 'reconciled_on',
        title: 'Reconciled On'
      },
      {
        id: 15,
        value: 'credit_line',
        key: 'credit_line',
        title: 'Credit Line',
        align: 'end'
      },
      // { id: 16, value: "autopay_account", key: "autopay_account",  title: "Autopay Account" },
      { id: 17, value: 'due_on', key: 'due_on', title: 'Due On' },
      // { id: 18, value: "loan_type", key: "loan_type",  title: "Type" },
      // { id: 19, value: "maturity_on", key: "maturity_on",  title: "Maturity On" },
      // { id: 20, value: "loan_info", key: "loan_info",  title: "Loan Info" },
      // { id: 21, value: "task", key: "task",  title: "Task" },
      // { id: 22, value: "notes", key: "notes",  title: "Notes" },
      // { id: 23, value: "recorded_on", key: "recorded_on",  title: "Recorded On" },
      {
        id: 30,
        value: 'actions',
        key: 'actions',
        title: 'Actions',
        sortable: false
      }
    ],
    getUrl: 'client/loans',
    postUrl: 'client/loan/0',
    deleteUrl: 'client/loan',
    childRoute: 'loan'
  }
}

const clientLeftNavItems = Object.keys(clientComponentData)
  .filter((k) => !['clients', 'client'].includes(k))
  .map((item: string) => {
    return { value: item, title: clientComponentData[item]['title'] }
  })

const getClientComponentData = (section) => {
  const sectionName = section in clientComponentData ? section : 'clients'
  return clientComponentData[sectionName]
}
const getSectionMember = (section, member) => {
  const sectionData = getClientComponentData(section)
  return sectionData && member in sectionData ? sectionData[member] : null
}
const getRouteName = (section: string) => getSectionMember(section, 'childRoute')
const getPostUrl = (section) => getSectionMember(section, 'postUrl')
const getDeleteUrl = (section) => getSectionMember(section, 'deleteUrl')
const getTitle = (section) => getSectionMember(section, 'title')
const getChildRoute = (section) => getSectionMember(section, 'childRoute')
const getTableColumns = (section) => getSectionMember(section, 'columns')

const ccd = {
  getClientComponentData : getClientComponentData,
  getRouteName : getRouteName,
  getPostUrl : getPostUrl,
  getDeleteUrl : getDeleteUrl,
  getTitle : getTitle,
  getChildRoute : getChildRoute,
  getTableColumns : getTableColumns,
  clientComponentData : clientComponentData,
  clientLeftNavItems : clientLeftNavItems
}

export default ccd
