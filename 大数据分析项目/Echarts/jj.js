const input = document.querySelector("#date");
input.addEventListener("input", change);
var year;
var month;
var day;
//获取日期
var date = document.querySelector("input[type='date']");
var ymd = date.value;
year = ymd[0] + ymd[1] + ymd[2] + ymd[3];
month = ymd[5] + ymd[6];
day = ymd[8] + ymd[9];
year = window.localStorage.year;
month = window.localStorage.mon;
day = window.localStorage.day;
date.value = year + "-" + month + "-" + day;
window.localStorage.year = year;
window.localStorage.mon = month;
window.localStorage.day = day;
console.log(date.value);
var filepath =
  "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/wind_csv/" +
  year +
  month +
  "/wind-" +
  year +
  month +
  day +
  "00.csv";
console.log(filepath);
var a = Promise.resolve(d3.csv(filepath));

a.then(function (result) {
  console.log(result);
  console.log(result.length);
  var data = [];
  for (var i = 0; i < result.length; i++) {
    data.push([
      result[i]["lon"],
      result[i]["lat"],
      result[i]["U"],
      result[i]["V"],
      Math.sqrt(
        result[i]["U"] * result[i]["U"] + result[i]["V"] * result[i]["V"]
      ),
    ]);
  }
  console.log(data);

  // 基于准备好的 dom ，初始化 echarts 实例
  var myChart = echarts.init(document.getElementById("main"));

  var maxMag = 32.1547;
  var minMag = 0;

  var trajectory = [];
  let series2 = [
    {
      type: "flowGL",
      coordinateSystem: "bmap",
      data: data,
      supersampling: 4,
      particleType: "line",
      particleDensity: 128,
      particleSpeed: 1,
      //gridWidth: windData.nx,
      //gridHeight: windData.ny,
      itemStyle: {
        opacity: 0.7,
      },
    },
    // {
    //     type: 'scatter',
    //     coordinateSystem: 'bmap',
    //     symbol: 'image://./feiting.svg',
    //     symbolOffset: [0, 0],
    //     symbolSize: 20,
    //     symbolRotate: 45,
    //     hoverAnimation: true,
    //     data: trajectory,
    // }
  ];

  trajectory.forEach(function (element, index) {
    if (index < trajectory.length - 1) {
      let endNum = index + 1;
      series2.push({
        type: "lines",
        coordinateSystem: "bmap", // 线连接，  只需要起点和终点坐标
        zlevel: 2,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: "image://./feiting.svg",
          symbolSize: 20,
        },
        lineStyle: {
          normal: {
            color: "red",
            width: 3,
            opacity: 0.99,
            curveness: 0,
          },
        },
        data: [
          {
            coords: [
              [trajectory[index][0], trajectory[index][1]],
              [trajectory[endNum][0], trajectory[endNum][1]],
            ],
          },
        ],
      });
      // console.log([ [trajectory[index][0], trajectory[index][1]],[trajectory[endNum][0],trajectory[endNum][1]]])
    }
  });
  myChart.setOption({
    title: {
      text: "全国风场图",
      left: "center",
      textStyle: {
        color: "#fff",
      },
    },
    visualMap: {
      left: "right",
      min: minMag,
      max: maxMag,
      dimension: 4,
      inRange: {
        // color: ['green', 'yellow', 'red']
        color: [
          "#313695",
          "#4575b4",
          "#74add1",
          "#abd9e9",
          "#e0f3f8",
          "#ffffbf",
          "#fee090",
          "#fdae61",
          "#f46d43",
          "#d73027",
          "#a50026",
        ],
      },
      realtime: false,
      calculable: true,
      textStyle: {
        color: "#fff",
      },
    },
    bmap: {
      center: [110, 38],
      zoom: 5,
      roam: true,
      mapStyle: {
        styleJson: [
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#031628",
            },
          },
          {
            featureType: "land",
            elementType: "geometry",
            stylers: {
              color: "#000102",
            },
          },
          {
            featureType: "highway",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#000000",
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry.stroke",
            stylers: {
              color: "#0b3d51",
            },
          },
          {
            featureType: "local",
            elementType: "geometry",
            stylers: {
              color: "#000000",
            },
          },
          {
            featureType: "railway",
            elementType: "geometry.fill",
            stylers: {
              color: "#000000",
            },
          },
          {
            featureType: "railway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#08304b",
            },
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              lightness: -70,
            },
          },
          {
            featureType: "building",
            elementType: "geometry.fill",
            stylers: {
              color: "#000000",
            },
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: {
              color: "#857f7f",
            },
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#000000",
            },
          },
          {
            featureType: "building",
            elementType: "geometry",
            stylers: {
              color: "#022338",
            },
          },
          {
            featureType: "green",
            elementType: "geometry",
            stylers: {
              color: "#062032",
            },
          },
          {
            featureType: "boundary",
            elementType: "all",
            stylers: {
              color: "#465b6c",
            },
          },
          {
            featureType: "manmade",
            elementType: "all",
            stylers: {
              color: "#022338",
            },
          },
          {
            featureType: "label",
            elementType: "all",
            stylers: {
              visibility: "off",
            },
          },
        ],
      },
    },
    series: series2,
  });
});

function change(event) {
  //获取日期
  date = document.querySelector("input[type='date']");
  ymd = date.value;
  year = ymd[0] + ymd[1] + ymd[2] + ymd[3];
  month = ymd[5] + ymd[6];
  day = ymd[8] + ymd[9];
  window.localStorage.year = year;
  window.localStorage.mon = month;
  window.localStorage.day = day;
  filepath =
    "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/wind_csv/" +
    year +
    month +
    "/wind-" +
    year +
    month +
    day +
    "00.csv";
  console.log(filepath);
  a = Promise.resolve(
    d3.csv(
      filepath
    )
  );

  a.then(function (result) {
    console.log(result);
    console.log(result.length);
    var data = [];
    for (var i = 0; i < result.length; i++) {
      data.push([
        result[i]["lon"],
        result[i]["lat"],
        result[i]["U"],
        result[i]["V"],
        Math.sqrt(
          result[i]["U"] * result[i]["U"] + result[i]["V"] * result[i]["V"]
        ),
      ]);
    }
    console.log(data);

    // 基于准备好的 dom ，初始化 echarts 实例
    var myChart = echarts.init(document.getElementById("main"));

    var maxMag = 32.1547;
    var minMag = 0;

    var trajectory = [];
    let series2 = [
      {
        type: "flowGL",
        coordinateSystem: "bmap",
        data: data,
        supersampling: 4,
        particleType: "line",
        particleDensity: 128,
        particleSpeed: 1,
        //gridWidth: windData.nx,
        //gridHeight: windData.ny,
        itemStyle: {
          opacity: 0.7,
        },
      },
      // {
      //     type: 'scatter',
      //     coordinateSystem: 'bmap',
      //     symbol: 'image://./feiting.svg',
      //     symbolOffset: [0, 0],
      //     symbolSize: 20,
      //     symbolRotate: 45,
      //     hoverAnimation: true,
      //     data: trajectory,
      // }
    ];

    trajectory.forEach(function (element, index) {
      if (index < trajectory.length - 1) {
        let endNum = index + 1;
        series2.push({
          type: "lines",
          coordinateSystem: "bmap", // 线连接，  只需要起点和终点坐标
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: "image://./feiting.svg",
            symbolSize: 20,
          },
          lineStyle: {
            normal: {
              color: "red",
              width: 3,
              opacity: 0.99,
              curveness: 0,
            },
          },
          data: [
            {
              coords: [
                [trajectory[index][0], trajectory[index][1]],
                [trajectory[endNum][0], trajectory[endNum][1]],
              ],
            },
          ],
        });
        // console.log([ [trajectory[index][0], trajectory[index][1]],[trajectory[endNum][0],trajectory[endNum][1]]])
      }
    });
    myChart.setOption({
      title: {
        text: "全国风场图",
        left: "center",
        textStyle: {
          color: "#fff",
        },
      },
      visualMap: {
        left: "right",
        min: minMag,
        max: maxMag,
        dimension: 4,
        inRange: {
          // color: ['green', 'yellow', 'red']
          color: [
            "#313695",
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026",
          ],
        },
        realtime: false,
        calculable: true,
        textStyle: {
          color: "#fff",
        },
      },
      bmap: {
        center: [110, 38],
        zoom: 5,
        roam: true,
        mapStyle: {
          styleJson: [
            {
              featureType: "water",
              elementType: "all",
              stylers: {
                color: "#031628",
              },
            },
            {
              featureType: "land",
              elementType: "geometry",
              stylers: {
                color: "#000102",
              },
            },
            {
              featureType: "highway",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry.fill",
              stylers: {
                color: "#000000",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry.stroke",
              stylers: {
                color: "#0b3d51",
              },
            },
            {
              featureType: "local",
              elementType: "geometry",
              stylers: {
                color: "#000000",
              },
            },
            {
              featureType: "railway",
              elementType: "geometry.fill",
              stylers: {
                color: "#000000",
              },
            },
            {
              featureType: "railway",
              elementType: "geometry.stroke",
              stylers: {
                color: "#08304b",
              },
            },
            {
              featureType: "subway",
              elementType: "geometry",
              stylers: {
                lightness: -70,
              },
            },
            {
              featureType: "building",
              elementType: "geometry.fill",
              stylers: {
                color: "#000000",
              },
            },
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: {
                color: "#857f7f",
              },
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: {
                color: "#000000",
              },
            },
            {
              featureType: "building",
              elementType: "geometry",
              stylers: {
                color: "#022338",
              },
            },
            {
              featureType: "green",
              elementType: "geometry",
              stylers: {
                color: "#062032",
              },
            },
            {
              featureType: "boundary",
              elementType: "all",
              stylers: {
                color: "#465b6c",
              },
            },
            {
              featureType: "manmade",
              elementType: "all",
              stylers: {
                color: "#022338",
              },
            },
            {
              featureType: "label",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
          ],
        },
      },
      series: series2,
    });
  });
}
