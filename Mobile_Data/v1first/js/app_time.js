setTimeout(function(){
	var dom = document.getElementById("pieChart");
	    var myChart = echarts.init(dom);
	    var app = {};
	
	    var option;
	
	    var app_name = ["A", "B", "C", "D", 'E', 'F', 'G'];//app名称
	    var app_time = [320, 302, 301, 334, 390, 330, 320];//app使用时间，与y轴的值一一对应，单位：分钟
	    
	
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
	        type: 'value'//app使用时间，单位：分钟
	      },
	      yAxis: {
	        type: 'category',
	        data: app_name
	        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']//app名称
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
	          // data: [320, 302, 301, 334, 390, 330, 320]//app使用时间，与y轴的值一一对应，单位：分钟
	        },
	      ]
	    };
	
	    if (option && typeof option === 'object') {
	      myChart.setOption(option);
	    }
},2000)