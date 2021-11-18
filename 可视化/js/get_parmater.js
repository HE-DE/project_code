function get_par(proname) {
  if (proname == "heilongjiang.json") {
    var cen = [126.642464, 45.756967];
    var tra = [300, 600];
    var sca = 2500;
  } else if (proname == "jilin.json") {
    var cen = [125.3245, 43.886841];
    var tra = [300, 300];
    var sca = 3000;
  } else if (proname == "liaoning.json") {
    var cen = [123.429096, 41.796767];
    var tra = [300, 220];
    var sca = 3500;
  } else if (proname == "neimenggu.json") {
    var cen = [111.670801, 40.818311];
    var tra = [420, 490];
    var sca = 1500;
  } else if (proname == "xinjiang.json") {
    var cen = [87.617733, 43.792818];
    var tra = [500, 300];
    var sca = 2000;
  } else if (proname == "gansu.json") {
    var cen = [103.823557, 36.058039];
    var tra = [510, 400];
    var sca = 2500;
  } else if (proname == "ningxia.json") {
    var cen = [106.278179, 38.46637];
    var tra = [200, 130];
    var sca = 5000;
  } else if (proname == "shangxi.json") {
    var cen = [108.948024, 34.263161];
    var tra = [280, 540];
    var sca = 4500;
  } else if (proname == "shanxi.json") {
    var cen = [112.549248, 37.857014];
    var tra = [280, 300];
    var sca = 4500;
  } else if (proname == "hebei.json") {
    var cen = [114.502461, 38.045474];
    var tra = [180, 500];
    var sca = 4500;
  } else if (proname == "beijing.json") {
    var cen = [116.418757, 39.917544];
    var tra = [240, 400];
    var sca = 13000;
    sip = 50;
  } else if (proname == "tianjin.json") {
    var cen = [117.195907, 39.118327];
    var tra = [240, 480];
    var sca = 18000;
    sip = 80;
  } else if (proname == "shandong.json") {
    var cen = [117.000923, 36.675807];
    var tra = [180, 200];
    var sca = 4500;
  } else if (proname == "henan.json") {
    var cen = [113.665412, 34.757975];
    var tra = [270, 200];
    var sca = 4500;
  } else if (proname == "qinghai.json") {
    var cen = [101.778916, 36.623178];
    var tra = [680, 200];
    var sca = 3000;
  } else if (proname == "xizang.json") {
    var cen = [91.132212, 29.660361];
    var tra = [560, 400];
    var sca = 2500;
  } else if (proname == "sichuan.json") {
    var cen = [104.065735, 30.659462];
    var tra = [540, 350];
    var sca = 4500;
  } else if (proname == "chongqing.json") {
    var cen = [108.380246, 30.807807];
    var tra = [290, 160];
    var sca = 5000;
  } else if (proname == "hubei.json") {
    var cen = [108.380246, 30.807807];
    var tra = [50, 300];
    var sca = 4500;
  } else if (proname == "anhui.json") {
    var cen = [117.283042, 31.86119];
    var tra = [250, 300];
    var sca = 4500;
  } else if (proname == "jiangsu.json") {
    var cen = [118.767413, 32.041544];
    var tra = [220, 300];
    var sca = 4500;
  } else if (proname == "zhejiang.json") {
    var cen = [120.153576, 30.287459];
    var tra = [220, 100];
    var sca = 5000;
  } else if (proname == "shanghai.json") {
    var cen = [121.490317, 31.222771];
    var tra = [200, 200];
    var sca = 13000;
    sip = 50;
  } else if (proname == "jiangxi.json") {
    var cen = [115.892151, 28.676493];
    var tra = [220, 150];
    var sca = 5000;
  } else if (proname == "hunan.json") {
    var cen = [112.982279, 28.19409];
    var tra = [380, 200];
    var sca = 5000;
  } else if (proname == "guizhou.json") {
    var cen = [106.713478, 26.578343];
    var tra = [330, 300];
    var sca = 5000;
  } else if (proname == "yunnan.json") {
    var cen = [102.712251, 25.040609];
    var tra = [440, 400];
    var sca = 4500;
  } else if (proname == "guangxi.json") {
    var cen = [108.320004, 22.82402];
    var tra = [350, 400];
    var sca = 4500;
  } else if (proname == "guangdong.json") {
    var cen = [113.280637, 23.125178];
    var tra = [350, 240];
    var sca = 4500;
  } else if (proname == "fujian.json") {
    var cen = [119.306239, 26.075302];
    var tra = [350, 240];
    var sca = 4500;
  } else if (proname == "taiwan.json") {
    var cen = [121.509062, 25.044332];
    var tra = [200, 100];
    var sca = 4500;
  } else if (proname == "hainan.json") {
    var cen = [110.33119, 20.031971];
    var tra = [200, 100];
    var sca = 2500;
  }
  return [cen,tra,sca];
}
