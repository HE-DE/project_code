function get_proname() {
  var proname = Array.from(window.localStorage.name.split(","));
  if (proname == "安徽省") {
    proname = "anhui.json";
  } else if (proname == "澳门特别行政区") {
    proname = "aomen.json";
  } else if (proname == "北京市") {
    proname = "beijing.json";
  } else if (proname == "重庆市") {
    proname = "chongqing.json";
  } else if (proname == "福建省") {
    proname = "fujian.json";
  } else if (proname == "甘肃省") {
    proname = "gansu.json";
  } else if (proname == "广东省") {
    proname = "guangdong.json";
  } else if (proname == "广西壮族自治区") {
    proname = "guangxi.json";
  } else if (proname == "贵州省") {
    proname = "guizhou.json";
  } else if (proname == "海南省") {
    proname = "hainan.json";
  } else if (proname == "河北省") {
    proname = "hebei.json";
  } else if (proname == "黑龙江省") {
    proname = "heilongjiang.json";
  } else if (proname == "河南省") {
    proname = "henan.json";
  } else if (proname == "湖北省") {
    proname = "hubei.json";
  } else if (proname == "湖南省") {
    proname = "hunan.json";
  } else if (proname == "江苏省") {
    proname = "jiangsu.json";
  } else if (proname == "江西省") {
    proname = "jiangxi.json";
  } else if (proname == "吉林省") {
    proname = "jilin.json";
  } else if (proname == "辽宁省") {
    proname = "liaoning.json";
  } else if (proname == "内蒙古自治区") {
    proname = "neimenggu.json";
  } else if (proname == "宁夏回族自治区") {
    proname = "ningxia.json";
  } else if (proname == "青海省") {
    proname = "qinghai.json";
  } else if (proname == "山东省") {
    proname = "shandong.json";
  } else if (proname == "上海市") {
    proname = "shanghai.json";
  } else if (proname == "山西省") {
    proname = "shanxi.json";
  } else if (proname == "陕西省") {
    proname = "shangxi.json";
  } else if (proname == "四川省") {
    proname = "sichuan.json";
  } else if (proname == "台湾省") {
    proname = "taiwan.json";
  } else if (proname == "天津市") {
    proname = "tianjin.json";
  } else if (proname == "香港特别行政区") {
    proname = "xianggang.json";
  } else if (proname == "新疆维吾尔自治区") {
    proname = "xinjiang.json";
  } else if (proname == "西藏自治区") {
    proname = "xizang.json";
  } else if (proname == "云南省") {
    proname = "yunnan.json";
  } else if (proname == "浙江省") {
    proname = "zhejiang.json";
  }
  return proname;
}
