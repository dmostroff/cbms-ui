export class AdmSettingModel {
  constructor(prefix = "SYS", keyname = null, display_rank = 1) {
    this.id = 0;
    this.prefix = prefix;
    this.keyname = keyname;
    this.keyvalue = null;
    this.display_rank = display_rank;
  }

  static {
    this.prefixPrefix = "__prefix__";
    this.prefixName = "Prefix";
  }
}
