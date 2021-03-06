setTimeout(function(){
	var dom = document.getElementById("pieChart");
	    var myChart = echarts.init(dom);
	    var app = {};
	
	    var option;
	
	    var app_name = ["哔哩哔哩", "抖音", "QQ", "明日方舟", '小黑盒', '微信', '浏览器','百度网盘','我的侠客','美团外卖','掌上英雄联盟','支付宝'];//app名称
	    var app_time = [1151, 479, 253, 237, 235, 127, 48,44,36,22,14,11];//app使用时间，与y轴的值一一对应，单位：分钟
	//     for(var i=0;i<app_time.length;i++)
	// 	{
	// 		app_time[i]=Math.log(app_time[i]);
	// 	}
	
	    option = {
	      tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	          type: 'shadow'
	        }
	      },
	      title:{
	        left:"center",
	        top:"3%",
	        text:"app使用时间"
	      },
	      grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	      },
	      xAxis: {
			name:'时间(min)',
			nameLocation:"middle",
			nameTextStyle: {//字体样式
			            padding: 5 //距离坐标位置的距离
			      },
	        type: 'log',
	        min:1,
	        logBase:3,
			data:app_time
	      },
	      yAxis: {
	        type: 'category',
	        data: app_name
	      },
	      series: [
	        {
	          name: 'totalTime',
	          type: 'bar',
	          stack: 'total',
	          label: {
	            show: true
	          },
	          data: app_time
	        },
	      ]
	    };
	
	    if (option && typeof option === 'object') {
	      myChart.setOption(option);
	    }
},2000)