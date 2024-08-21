import { formatDate, formatDateTime } from "src/services/commonService";

export class CreditBuildModel {
  constructor(clientPerson) {
    // super(null);
    this.id = null;
    this.client_id = clientPerson.id;
    this.client_name = clientPerson.first_name + " " + clientPerson.last_name;
    this.bank_name = null;
    this.account_login = null;
    this.account_pwd = null;
    this.start_date = null;
    this.end_date = null;
    this.bank_account = null;
    this.payment_date = null;
    this.reconciled_on = null;
    this.applied_on = null;
    this.notes = null;
    this.task = null;
    this.credit_info = null;
    this.recorded_on = null;
  }
  sanitize() {
    return CreditBuildModel.sanitizeData(this);
  }

  static sanitizeData = (item) => {
    ["start_date", "end_date", "reconciled_on", "applied_on"].forEach(
      (member) => (item[member] = formatDate(item[member]))
    );
    item.recorded_on = formatDateTime(item.recorded_on);
    return item;
  };
}
