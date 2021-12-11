# 大数据分析与实践：大气污染分析

[TOC]

本项目数据来源和思考方向来自于[ChinaVis2021](http://naq.cicidata.top:10443/chinavis/opendata),采用前端可视化的方法对实际问题进行分析

## 数据

1. 使用公开数据集：[每日大气污染状况](http://naq.cicidata.top:10443/chinavis/opendata)。
2. 使用的大气污染数据集为中国科学院大气物理研究所等单位发布的中国高分辨率大气污染再分析数 据集，包括我国《环境空气质量标准》中的六项常规污染物的网格化数据。数据集为同化融合中国 环境监测总站（CNEMC）的国家环境空气质量监测网和嵌套网格空气质量预报模式（NAQPMS） 的再分析数据。
3. 采用的日均值数据详细信息如下：

|    时间范围    |                       2013 年-2018 年                        |
| :------------: | :----------------------------------------------------------: |
|  **空间范围**  |                           **中国**                           |
| **空间分辨率** |                         **15 公里**                          |
|  **位置变量**  |         **网格中心纬度（Lat）、网格中心经度（Lon）**         |
| **污染物变量** | **细颗粒物（PM2.5）、可吸入颗粒物（PM10）、臭氧（O3）、 一氧化碳 （CO）、二氧化硫（SO2）、二氧化氮（NO2）** |
|  **气象变量**  | **纬向风速（U）、经向风速（V）、温度（TEMP）、 相对湿度（RH）、地面气压 （PSFC）** |

**注**：2013 年以来，随着严格的清洁空气行动的实施，我国空气质量发生了显著变化

4. 原始数据集中变量的具体说明

| 变量名 |                             释义                             |
| :----: | :----------------------------------------------------------: |
| PM2.5  | 空气动力学直径小于 2.5 微米的颗粒物，单位：微克每立方米。 形成灰霾污染的关键污染物。 |
|   O3   |     臭氧，单位：微克每立方米。 光化学污染的关键污染物。      |
|  PM10  | 空气动力学直径小于 10 微米的颗粒物，单位：微克每立方米。 在环境空气中长期飘浮的悬浮微粒，对大气能见度影响很大。 |
|  SO2   | 二氧化硫，单位：微克每立方米。 PM2.5 的重要前体物之一，可在大气中被氧化 形成硫酸盐气溶胶。 |
|  NO2   | 二氧化氮，单位：微克每立方米。 PM2.5 和 O3 的重要前体物，一方面可在大气 中被氧化形成硝酸盐气溶胶，另一 方面参与大气光化学反应形成臭氧。 |
|   CO   | 一氧化碳，单位：微克每立方米。 含碳物质燃烧不完全时的产物，高浓度时能使 人出现不同程度中毒症状。 |
|   U    | 纬向风速，单位：米每秒。 影响大气污染物浓度变化的关键气象要素之一。 |
|   V    | 经向风速，单位：米每秒。 影响大气污染物浓度变化的关键气象要素之一。 |
|  TEMP  | 气温，单位：开尔文（K）。 影响大气污染物浓度变化的关键气象要素之一。 |
|   RH   | 相对湿度，指空气中水汽压与相同温度下饱和水汽压的百分比。 影响大气污染物 浓度变化的关键气象要素之一。 |
|  PSFC  | 地面气压，单位帕斯卡（Pa）。 影响大气污染物浓度变化的关键气象要素之一。 |
|  Lat   |                网格中心纬度（北纬），单位：°                 |
|  Lon   |                网格中心经度（东经），单位：°                 |

5. 数据集的大小在**3.23 GB**以上。

## 界面构成

### 首页

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212217704.png" alt="image-20211211212217704" style="zoom:50%;" />

首页由时间螺旋图和导航栏构成。

### 主页

![image-20211211212251287](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212251287.png)

主页有三个视图组成及悬浮窗口构成。 

左上为第一视图（全国空气质量热力图，全国风场图，模式聚类图）；

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212306309.png" alt="image-20211211212306309" style="zoom:25%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212335884.png" alt="image-20211211212335884" style="zoom:25%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212353767.png" alt="image-20211211212353767" style="zoom:25%;" />

右侧为第二视图（各省AQI热力图，省会城市各污染物面积图）；

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212412973.png" alt="image-20211211212412973" style="zoom:25%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212425030.png" alt="image-20211211212425030" style="zoom:25%;" />

左下为第三视图（污染物条形图，雷达图，各污染物散点图）；

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212439164.png" alt="image-20211211212439164" style="zoom:25%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212452013.png" alt="image-20211211212452013" style="zoom:25%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212514856.png" alt="image-20211211212514856" style="zoom:25%;" />

右侧为悬浮窗，进行跳转。

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212528570.png" alt="image-20211211212528570" style="zoom:50%;" />

### 归因分析

由三个可以互相跳转的页面构成，分别是：

各地区煤炭消耗量：

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212600646.png" alt="image-20211211212600646" style="zoom:25%;" />

各地区石油焦炭工业投资：

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212615589.png" alt="image-20211211212615589" style="zoom:25%;" />

各地区汽油消费量：

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212629863.png" alt="image-20211211212629863" style="zoom:25%;" />

### 污染预测

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211212720512.png" alt="image-20211211212720512" style="zoom:25%;" />

### READ ME

说明文档组成的页面

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211095657848.png" alt="image-20211211095657848" style="zoom:50%;" />

### 个人主页

小组成员信息

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211211105240747.png" alt="image-20211211105240747" style="zoom:50%;" />



## 交互逻辑

### 首页

1. 导航栏可以进行跳转
2. 时间螺旋图可以通过下方按键和地图省份进行交互。

### 主页

1. 左上第一视图（全国空气质量热力图，全国风场图，模式聚类图）；可以通过按键更换。
2. 左上第一视图（全国空气质量热力图，全国风场图，模式聚类图）与 右侧第二视图（各省AQI热力图，省会城市各污染物面积图）之间存在时间选择上的双向链接；与 左下第三视图（污染物条形图，雷达图，各污染物散点图）之间存在位置，时间的单向链接。通过点击省份地区及组件（日历，按键）进行交互
3. 右侧第二视图（各省AQI热力图，省会城市各污染物面积图）与 左下第三视图（污染物条形图，雷达图，各污染物散点图）之间存在位置，时间的单向链接以及污染物之间的双向链接，通过点击组件（坐标点，文字）进行交互。
4.  左下第三视图（污染物条形图，雷达图，各污染物散点图），通过下拉菜单进行交互。

### 悬浮窗

悬浮窗通过鼠标的移动与点击进行交互

### 归因分析

通过按键点击和鼠标移动进行交互

### 污染预测

通过按键进行交互
