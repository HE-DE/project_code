function mouseclick(event, d) {
  window.localStorage.id=d["id"];
  window.localStorage.AQI=d["AQI"];
  window.localStorage.CO=d["CO(毫克每立方米)"];
  window.localStorage.MP=d["Major pollutants"];
  window.localStorage.NO2=d["NO2(微克每立方米)"];
  window.localStorage.O3=d["O3(微克每立方米)"];
  window.localStorage.PM2=d["PM2.5(微克每立方米)"]
  window.localStorage.PM10=d["PM10(微克每立方米)"]
  window.localStorage.SO2=d["SO2(微克每立方米)"]
}
