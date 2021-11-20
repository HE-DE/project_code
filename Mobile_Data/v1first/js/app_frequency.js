setTimeout(function() {
	var app_fre = Promise.resolve(d3.csv("https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/data_for_mobile/applications_foreground.csv"))
	app_fre.then(function (raw_data) {
	  var all_data = [];//{app_name,app_type,app_freq}
	  var app_name = [];
	  var app_freq = [];
	
	  for (var i = 0; i < raw_data.length; i++) {
	    if (app_name.indexOf(raw_data[i]["application_name"]) < 0)//第一次碰到该app
	    {
	      app_name.push(raw_data[i]["application_name"])
	      all_data.push({
	        app_name: raw_data[i]["application_name"],
	        app_type: raw_data[i]["is_system_app"],
	        app_freq: 1
	      })
	    }
	    else {
	      var index = all_data.findIndex((all_data) => all_data.app_name === raw_data[i]["application_name"]);
	      all_data[index]["app_freq"]++;
	    }
	  }
	  //console.log(all_data)
	
	  app_name = [];
	  for (var i = 0; i < all_data.length; i++) {
	    if (all_data[i]["app_type"] == "0") {
	      app_name.push(all_data[i]["app_name"]);
	      app_freq.push(all_data[i]["app_freq"]);
	    }
	  }
	  //console.log(app_name);
	  //console.log(app_freq)
	
	
	  var dom = document.getElementById("apChart");
	  var myChart = echarts.init(dom);
	  var app = {};
	
	  var option;
	
	
	  option = {
	    title: {
	      left: 'center',
	      text: 'app使用频率'
	    },
	    toolbox: {
	      feature: {
	        dataZoom: {
	          yAxisIndex: 'none'
	        },
	        restore: {},
	        saveAsImage: {}
	      }
	    },
	    xAxis: {
	      type: 'category',
	      data: app_name,
	      splitNumber: app_name.length,
	      axisLabel: {
	        interval: 0,
	        formatter: function (value) {
	          return value.split("").join("\n");
	        }
	      },
	
	    },
	    yAxis: {
	      type: 'value'
	    },
	    tooltip: {
	      formatter: '{b}\n{c}'
	    },
	
	    series: [
	      {
	        type: 'line',
	        data: app_freq,
	        label:{
	          show:true,
	          fontSize:10,
	        }
	
	
	      }
	    ]
	  };
	
	
	  if (option && typeof option === 'object') {
	    myChart.setOption(option);
	  }
	
	
	})
}, 2500);