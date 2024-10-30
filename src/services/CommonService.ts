import { parseISO, parse, format, differenceInYears, endOfToday, isValid } from 'date-fns'

const datefns = {
  parseISO: parseISO,
  parse: parse,
  format: format,
  differenceInYears: differenceInYears,
  endOfToday: endOfToday,
  isValid: isValid
}

import type Address from '@/interfaces/common/Address'

export const filterTableRows = (rows: Array<any>, term: string) => {
  if (!Array.isArray(rows)) {
    return rows
  }
  return rows.filter((row, idx) => {
    const bFound = Object.entries(row).find(([k, v]) => String(v).indexOf(term) > -1)
    return bFound
  })
}

export const formatDate = (
  date: string | null,
  pattern: string = 'yyyy-MM-dd',
  fmt: string = 'MM/dd/yyyy'
): string => {
  if (date === undefined || date === null) return ''
  try {
    // console.log("formatDate", date, pattern, fmt);
    const dt: string = datefns.format(datefns.parse(date.slice(0, 10), pattern, 2), fmt)
    return dt
  } catch (error) {
    console.error(error)
    return date
  }
}

export const formatDateTime = (datetime: string, pattern: string = 'M/d/yyyy HH:mm'): string => {
  if (datetime === undefined || datetime === null) return ''
  try {
    const dt: Date = datefns.parseISO(datetime)
    return datefns.format(dt, pattern)
  } catch (error) {
    console.error(error)
    return ''
  }
}

export const getDate = (date: string | null, pattern: string = 'M/d/yyyy') => {
  if (!date) return null
  try {
    const retval = datefns.parse(date, pattern, 1)
    console.log('getDate', date, retval)
    return retval
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getAge = (date: string, format="MM/dd/yyyy") => {
  let retval = 0
  try {
    const dt: Date = datefns.parse(date, format, 1)
    retval = datefns.isValid(dt) ? datefns.differenceInYears(datefns.endOfToday(), dt) : 0
    console.log('getAge', retval)
  } catch (error) {
    console.error(error)
  }
  return retval
}

export const formatCurrency = (amount: number) => {
  if (!amount || isNaN(amount)) {
    return ''
  }
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
}

export const formatCurrencyInput = (amount: number | String): String => {
  if (typeof amount == 'number') {
    return formatCurrency(amount)
  }
  if (!(typeof amount === 'string' || amount instanceof String)) {
    return ''
  }
  try {
    const amount1: number = parseFloat(amount.replace(/[^\d\\.]/, ''))
    return formatCurrency(amount1)
  } catch (error: any) {
    console.error(error)
    return ''
  }
}

export const sleep = (time: number | undefined): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const getFormData = (data: any[]): FormData => {
  const formData = new FormData()
  data.forEach((value, idx) => {
    formData.append(idx.toString(), value)
  })
  return formData
}

export const clone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

type Item = { [key: string]: any }

export const upsert = (itemArray: Item[], newItem: Item, idcol: string = 'id'): void => {
  let itemidx = -1
  if (Array.isArray(itemArray)) {
    itemArray.forEach((item, idx) => {
      if (item[idcol] === newItem[idcol]) {
        itemidx = idx
      }
    })
    if (itemidx > -1) {
      itemArray[itemidx] = newItem
    } else {
      itemArray.push(newItem)
    }
    // console.log('upsert', itemidx, itemArray);
  } else {
    console.error('itemArray is not an array', itemArray, newItem)
  }
}

// requestResponse: (response) => {
//   let retval = { rc: -9, msg: "No response", data: null };
//   if (!response || response == null) {
//     return retval;
//   }
//   console.log(response);
//   if (typeof response == "string") {
//     retval = response;
//   } else if (typeof response == "object" && "data" in response) {
//     retval = response.data;
//   }
//   return retval;
// },

export const getResponseDataIfSuccess = (response: { rc: number; data: any }): any => {
  return 'rc' in response && 'data' in response && response.rc === 1 ? response.data : undefined
}

interface VueInstance {
  $emit(event: string, ...args: any[]): void
}

export const emitSaveForm = (vm: VueInstance, response: { rc: number; data: any }): boolean => {
  if ('rc' in response && response.rc > 0 && 'data' in response) {
    const dat =
      Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : response.data
    vm.$emit('saveForm', dat)
    return true
  }
  return false
}

export const transformDate = (datetime: string | null): string | null => {
  return datetime ? datetime.replace('T', ' ').replace('Z', '') : null
}

export const todayDateTime = (): string => {
  return format(new Date(), 'P, p')
}

export const numberWithCommas = (num: string): string => {
  return parseFloat(num.replace(/\D+/g, '')).toLocaleString()
  // Uncomment below if you want to retain the original approach
  // return num ? num.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num;
}
export const formatPhone = (phone: string | null): string => {
  if (!phone) {
    return ''
  }
  let retval = phone.replace(/\D+/g, '').replace(/^1/, '')
  retval = retval
    .split('')
    .map((x, idx) => (idx % 3 === 0 && idx > 0 && idx < 7 ? '-' + x : x))
    .join('')
    .slice(0, 12)
  return (phone.match(/^1/) ? '1-' : '') + retval
}

export const formatSSN = (ssn: string | null): string => {
  if (!ssn) {
    return ''
  }
  ssn = ssn.replace(/\D+/g, '')
  return ssn
    .split('')
    .map((x, idx) => (3 == idx || 5 == idx ? '-' + x : x))
    .join('')
    .slice(0, 11)
  // const rp = /(\d{3})(\d{2})(\d{4})/g;
  // return ssn.replace(/[^\d]/g, '').replace(rp, '$1-$2-$3');
}

export const formatCreditCardNumber = (cc: string | null): string => {
  if (!cc) {
    return ''
  }
  cc = cc.replace(/\D+/g, '')
  const retval = cc
    .split('')
    .map((x, idx) => (4 == idx || 8 == idx || 12 == idx || 16 == idx ? '-' + x : x))
    .join('')
    .slice(0, 19)
  return retval
}

export const formatZip = (zip: string | null): string => {
  if (!zip) {
    return ''
  }
  const retzip = zip.replace(/\D+/g, '')
  return retzip
    .split('')
    .map((x, idx) => (5 == idx ? '-' + x : x))
    .join('')
    .slice(0, 10)
    .replace(/-$/, '')
}

export const formatAddress = (item: Address | null): string => {
  if (!item) {
    return ''
  }
  const address = [item.street_address, item.city, item.state ? ', ' + item.state : '', item.zip]
    .join(' ')
    .replace('  ', ' ')
  return address.replace(' ,', ',')
}

/* valid functions */
export const isValidZip = (zip: string | null): boolean => {
  if (!zip) {
    return false
  }
  return zip.match(/\d{5}/) != null || zip.match(/\d{5}-\d{4}/) != null
}

export const isValidCcExp = (cardExp: string | null, cardNum: string): [boolean, string] => {
  let isError: [boolean, string] = [false, 'Card Exp: ']
  if (!cardExp && cardNum) {
    isError = [true, 'Card Expiration Date is required.']
  } else if (cardExp) {
    const re = /(\d{1,2})\/(\d{1,2})/
    const m = cardExp.match(re)
    if (m) {
      const month = parseInt(m[1])
      const year = parseInt(m[2])
      const thisYear = new Date().getFullYear() % 100
      if (month < 1 || month > 12) {
        isError[0] = true
        isError[1] += 'Month must be 1-12'
      }
      if (year < thisYear || year > thisYear + 10) {
        isError[0] = true
        isError[1] += ' Year must be within ten years'
      }
    }
  }
  return isError
}

export const isValidDate = (dt: string, date_fmt: string = 'MM/dd/yyyy'): boolean => {
  return isValid(parse(dt, date_fmt, new Date()))
}

// JSON manipulation functions
export const getJsonData = (
  parent: Record<string, any>,
  childKey: string,
  defaultData: any = null
): any => {
  return parent && childKey in parent ? parent[childKey] : defaultData
}

export const setJsonData = (
  parent: Record<string, any>,
  parentKey: string,
  childKey: string,
  data: any
): void => {
  if (!parent[parentKey]) {
    parent[parentKey] = {}
  }
  parent[parentKey][childKey] = data
}

interface Setting {
  value: string
  text: string
}

export const getSettingDescription = (settings: Setting[], keyname: string): string => {
  if (Array.isArray(settings) && settings.length > 0) {
    const res = settings.filter((el) => el.value === keyname)
    const txt = res.length > 0 ? res[0].text : keyname
    return txt
  }
  return keyname
}

//   filterTableRowsz(rows, term) {
//     return rows.filter((row, idx) => {
//       const bFound = Object.entries(row).find(
//         ([k, v]) => String(v).indexOf(term) > -1
//       );
//       return bFound;
//     });
//   },
// };

export default { sleep, getFormData, clone, upsert }
export * as cs from './commonService'
