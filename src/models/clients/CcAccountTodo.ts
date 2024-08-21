import type CcAccountTodo from '@/interfaces/clients/CcAccountTodo'
import ClientDataModel from "src/models/clients/ClientDataModel";

export default class CcAccountTodoModel extends CientDataModel implements CcAccountTodo {
  constructor(indata = null) {
    super(null);
    this.cc_account_id = null;
    this.task = null;
    this.description = null;
    this.assigned_to = null;
    this.task_status = null;
    this.due_on = null;
    if (indata) {
      Object.assign(this, indata);
    }
  }
}
