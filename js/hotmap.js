function hotmap() {
  window.location.replace("../index.html");
}

function windmap() {
  window.localStorage.year = year;
  window.localStorage.mon = month;
  window.localStorage.day = day;
  window.location.replace("./Echarts/echartsnglobal-wind.html");
}