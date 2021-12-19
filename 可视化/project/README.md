# 可视化：大气污染分析

## 项目目录结构

```markdown
D:.
│  index.html
│  README.md
│  tree.txt
│  
├─.idea
│      .gitignore
│      modules.xml
│      project.iml
│      vcs.xml
│      workspace.xml
│      
├─css
│      bootstrap-theme.css
│      bootstrap-theme.css.map
│      bootstrap-theme.min.css
│      bootstrap-theme.min.css.map
│      bootstrap.css
│      bootstrap.css.map
│      bootstrap.min.css
│      bootstrap.min.css.map
│      chart_style.css
│      cind.css
│      d3-tip.min.css
│      daohang.css
│      example.css
│      footer&cbl.css
│      geo.css
│      login.css
│      overwindow.css
│      register.css
│      setmeal.css
│      style.css
│      templet.css
│      
├─Echarts
│  │  echartsnglobal-wind.html
│  │  feiting.png
│  │  feiting.svg
│  │  jj.js
│  │  LICENSE
│  │  README.md
│  │  
│  ├─.idea
│  │  │  learn-Echarts-master.iml
│  │  │  modules.xml
│  │  │  workspace.xml
│  │  │  
│  │  └─inspectionProfiles
│  │          profiles_settings.xml
│  │          Project_Default.xml
│  │          
│  ├─asset
│  │  │  global-wind.js
│  │  │  global-wind.json
│  │  │  life-expectancy-table.js
│  │  │  life-expectancy-table.json
│  │  │  wind-2013010100.csv
│  │  │  wind-2013010100.js
│  │  │  xianggang.js
│  │  │  
│  │  └─map
│  │      ├─js
│  │      │  │  china-contour.js
│  │      │  │  china.js
│  │      │  │  world.js
│  │      │  │  
│  │      │  └─province
│  │      │          anhui.js
│  │      │          aomen.js
│  │      │          beijing.js
│  │      │          chongqing.js
│  │      │          fujian.js
│  │      │          gansu.js
│  │      │          guangdong.js
│  │      │          guangxi.js
│  │      │          guizhou.js
│  │      │          hainan.js
│  │      │          hebei.js
│  │      │          heilongjiang.js
│  │      │          henan.js
│  │      │          hubei.js
│  │      │          hunan.js
│  │      │          jiangsu.js
│  │      │          jiangxi.js
│  │      │          jilin.js
│  │      │          liaoning.js
│  │      │          neimenggu.js
│  │      │          ningxia.js
│  │      │          qinghai.js
│  │      │          shandong.js
│  │      │          shanghai.js
│  │      │          shanxi.js
│  │      │          shanxi1.js
│  │      │          sichuan.js
│  │      │          taiwan.js
│  │      │          tianjin.js
│  │      │          xianggang.js
│  │      │          xinjiang.js
│  │      │          xizang.js
│  │      │          yunnan.js
│  │      │          zhejiang.js
│  │      │          
│  │      └─json
│  │          │  china-cities.json
│  │          │  china-contour.json
│  │          │  china.json
│  │          │  world.json
│  │          │  
│  │          └─province
│  │                  anhui.json
│  │                  aomen.json
│  │                  beijing.json
│  │                  chongqing.json
│  │                  fujian.json
│  │                  gansu.json
│  │                  guangdong.json
│  │                  guangxi.json
│  │                  guizhou.json
│  │                  hainan.json
│  │                  hebei.json
│  │                  heilongjiang.json
│  │                  henan.json
│  │                  hubei.json
│  │                  hunan.json
│  │                  jiangsu.json
│  │                  jiangxi.json
│  │                  jilin.json
│  │                  liaoning.json
│  │                  neimenggu.json
│  │                  ningxia.json
│  │                  qinghai.json
│  │                  shandong.json
│  │                  shanghai.json
│  │                  shanxi.json
│  │                  shanxi1.json
│  │                  sichuan.json
│  │                  taiwan.json
│  │                  tianjin.json
│  │                  xianggang.json
│  │                  xinjiang.json
│  │                  xizang.json
│  │                  yunnan.json
│  │                  zhejiang.json
│  │                  
│  ├─lib
│  │      bmap.min.js
│  │      echarts-gl.min.js
│  │      echarts.min.js
│  │      jquery-3.4.1.min.js
│  │      jquery.min.js
│  │      
│  └─theme
│          infographic.js
│          macarons.js
│          roma.js
│          shine.js
│          vintage.js
│          
├─js
│      bootstrap.js
│      bootstrap.min.js
│      chart.js
│      d3-path.v1.min.js
│      d3-v6-tip.js
│      d3.min.js
│      d3.v5.min.js
│      echarts.js
│      get_parmater.js
│      get_proname.js
│      hotmap.js
│      hp.js
│      index.js
│      index1.js
│      index2.js
│      index3.js
│      jquery-1.11.3.js
│      jquery-2.1.1.min.js
│      min_chart.js
│      mouseclick.js
│      mouseclick3.js
│      overwindows.js
│      predict.js
│      templet.js
│      upload.js
│      whole.js
│      
├─lib
│  │  papyrus.png
│  │  res.json
│  │  
│  ├─data
│  │  │  china.json
│  │  │  exanple.json
│  │  │  templet.json
│  │  │  主要城市年度数据-经济.csv
│  │  │  主要城市年度数据-经济.json
│  │  │  分省季度数据-生产.json
│  │  │  分省季度数据-生产总值.csv
│  │  │  分省季度数据-生产总值.json
│  │  │  
│  │  └─chart_data
│  │          2013.csv
│  │          2014.csv
│  │          2015.csv
│  │          2016.csv
│  │          2017.csv
│  │          2018.csv
│  │          china.csv
│  │          china.geo.json
│  │          
│  ├─fonts
│  │      glyphicons-halflings-regular.eot
│  │      glyphicons-halflings-regular.svg
│  │      glyphicons-halflings-regular.ttf
│  │      glyphicons-halflings-regular.woff
│  │      glyphicons-halflings-regular.woff2
│  │      
│  ├─geo_pro_json
│  │      anhui.json
│  │      aomen.json
│  │      beijing.json
│  │      chongqing.json
│  │      fujian.json
│  │      gansu.json
│  │      guangdong.json
│  │      guangxi.json
│  │      guizhou.json
│  │      hainan.json
│  │      hebei.json
│  │      heilongjiang.json
│  │      henan.json
│  │      hubei.json
│  │      hunan.json
│  │      jiangsu.json
│  │      jiangxi.json
│  │      jilin.json
│  │      liaoning.json
│  │      neimenggu.json
│  │      ningxia.json
│  │      qinghai.json
│  │      shandong.json
│  │      shanghai.json
│  │      shangxi.json
│  │      shanxi.json
│  │      sichuan.json
│  │      taiwan.json
│  │      tianjin.json
│  │      xianggang.json
│  │      xinjiang.json
│  │      xizang.json
│  │      yunnan.json
│  │      zhejiang.json
│  │      
│  ├─img
│  │      1.png
│  │      900px-Octicons-mark-github.svg.png
│  │      background.png
│  │      globe.png
│  │      home-gear-line.png
│  │      qifeiye.png
│  │      white-circle-emoji-clipart-md.png
│  │      
│  └─svg
│          mind.png
│          各污染物之间相关性散点图.svg
│          地理区域划分.svg
│          相关系数热力图.svg
│          经济区域划分.svg
│          
└─page
        cluster.html
        geo_pro.html
        hotmap_for_country.html
        line-race_meitan.html
        line-race_shiyou.html
        line_race_qiyou.html
        mainpage.html
        mainpage2.html
        min_pic.html
        pdfshow.html
        personpage.html
        predict.html
        radarchart.html
        scatterchart.html
        
```

## 运行方式

1. 通过梯子连接外网（由于数据托管在[GitHub](https://github.com/HE-DE/DATA_FOR_PROJECT)上，为保持较好的体验建议翻墙）

2. 将项目克隆到本地通过**WebStorm**在浏览器中打开

3. 自编写文件具体解释：

   HTML文件

   |          文件名          |           内容作用            |
   | :----------------------: | :---------------------------: |
   |        index.html        |   首页，整个项目的入口文件    |
   |      mainpage.html       |        主页的基本架构         |
   |      mainpage2.html      |    归因分析页面的基本架构     |
   |       cluster.html       |    主页中模式聚类图的页面     |
   |       geo_pro.html       | 主页中各省份具体AQI热力图页面 |
   | hotmap_for_country.html  |   主页中全国AQI热力地图页面   |
   |  line-race_meitan.html   |    归因分析煤炭消费量页面     |
   |  line-race_shiyou.html   |   归因分析焦炭石油工业页面    |
   |   line_race_qiyou.html   |     归因分析汽油消费页面      |
   |       min_pic.html       |     主页中初始条形图页面      |
   |       pdfshow.html       |          READ ME页面          |
   |     personpage.html      |           个人主页            |
   |       predict.html       |         污染预测页面          |
   |     radarchart.html      |     主页中初始雷达图页面      |
   |    scatterchart.html     |     主页中初始散点图页面      |
   | echartsnglobal-wind.html |       主页中风场图页面        |

   JavaScript文件

   |     文件名      |                内容作用                |
   | :-------------: | :------------------------------------: |
   |      jj.js      |               风场图绘制               |
   |    chart.js     |             时间螺旋图绘制             |
   | get_parmater.js |        进行视图间链接时获取参数        |
   | get_proname.js  |      进行视图间链接时获取省份名称      |
   |    hotmap.js    |           进行页面跳转的逻辑           |
   |      hp.js      |           首页打字机显示逻辑           |
   |    index.js     |              首页显示函数              |
   |    index1.js    |           主页全国热力图绘制           |
   |    index2.js    |             各省热力图绘制             |
   |    index3.js    |             模式聚类图绘制             |
   |  min_chart.js   |       条形图，雷达图，散点图绘制       |
   |  mouseclick.js  |   各省热力图中的鼠标点击事件（传参）   |
   | mouseclick3.js  | 各省热力图的鼠标点击事件（折线图绘制） |
   | overwindows.js  |        悬浮窗点击及移动出现逻辑        |
   |   predict.js    |             污染物预测绘制             |
   |    whole.js     |         时间螺旋图地图数据转化         |

   CSS文件

   |     文件名      |      内容作用      |
   | :-------------: | :----------------: |
   |   daohang.css   |   首页导航栏样式   |
   | chart_style.css | 时间螺旋图图表样式 |
   |    cind.css     |  各按键及线条样式  |
   |     geo.css     |    提示窗口样式    |
   | overwindow.css  |     悬浮窗样式     |

5. 引入的库及其他模板类型文件

   引入的文件包括：

   |         文件名          |                        作用                        |
   | :---------------------: | :------------------------------------------------: |
   |      bootstrap.css      |                   引入bootstrap                    |
   |    bootstrap.min.css    |                   引入bootstrap                    |
   |   bootstrap-theme.css   |                   引入bootstrap                    |
   | bootstrap-theme.min.css |                   引入bootstrap                    |
   |       example.css       |                    首页相关样式                    |
   |     footer&cbl.css      |                    首页相关样式                    |
   |       templet.css       |                    首页相关样式                    |
   |        style.css        |                    首页相关样式                    |
   |       setmeal.css       |                    首页相关样式                    |
   |     d3-tip.min.css      |                  悬浮窗的基本样式                  |
   |        ./Echarts        | 该文件夹引入jQuery及Echart绘制风图，同时有相关样式 |
   |      bootstrap.js       |                   引入bootstrap                    |
   |    bootstrap.min.js     |                   引入bootstrap                    |
   |         d3.*.js         |              引入D3作为绘图的主要工具              |
   |       echarts.js        |                     引入Echart                     |
   |       jquery*.js        |              引入jQuery进行变量的处理              |
   |       templet.js        |                    首页模板引入                    |

   其他数据及图片等均放置于对应文件夹下（./Echarts,./lib）。包括各省地理数据，字体图片，部分图像的原始数据。

## 运行及编译

1. 通过科学上网的方法~~翻墙~~进行网络访问（由于数据均在[GitHub](https://github.com/HE-DE/DATA_FOR_PROJECT)上托管，为保持良好使用体验请科学上网）。
2. 将项目克隆到本地，使用**WebStorm**运行**index.html**

## 附录

项目的GitHub地址为：https://github.com/HE-DE/project_code/tree/main/%E5%8F%AF%E8%A7%86%E5%8C%96

项目中其他文件夹内容简介：

1. ./LSTM：使用LSTM模型进行未来30天预测的代码
2. ./deal_data_code：项目初始阶段使用python，c++对数据进行处理的代码（由于某些变量处理时手动迭代，因此此处只列出最后一种情况的源码）
3. ./svg：使用Tableau绘制的进行初步探究的静态图像



## 开发工具

**Vscode+WebStorm**

