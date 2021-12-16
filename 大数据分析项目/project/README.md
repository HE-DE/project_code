# 大数据分析实践：大气污染分析



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

## 空气质量指标---AQI

**空气质量指标**（英语：**A**ir **Q**uality **I**ndex, **AQI**）、**空气质量指数**是定量描述空气质量状况的非线性无量纲指数。其数值越大、等级和类别越高、颜色越深，代表空气污染状况越严重，对人体的健康危害也就越大。

AQI计算方法及首要污染物确定方法参照如下：

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214163602315.png" alt="image-20211214163602315" style="zoom:80%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214163631435.png" alt="image-20211214163631435" style="zoom:80%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214163649994.png" alt="image-20211214163649994" style="zoom:80%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214163755252.png" alt="image-20211214163755252" style="zoom:80%;" />

## 大气污染分析

### 时间螺旋图分析（创新）

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214150931426.png" alt="image-20211214150931426" style="zoom:50%;" />

从2013年AQI螺旋图及地理热力图中可以分析得出，以安徽省为例，全年污染较为严重的情况出现在第一季度和第四季度，考虑到安徽省地理位置，我们猜想AQI的升高和居民取暖相关。

从地理热力图中可以看到，全年污染较为严重的省份集中在华北，华东，华南地区，这与中国人口分布符合，可以推断出，人口因素影响空气质量。

### 大气污染源分析

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214151744361.png" alt="image-20211214151744361" style="zoom:50%;" />

<center>1（全国热力图 2013.02.10）</center>

如图1 所示，在2013年2月10日中国春节这一天，中国公布有不同程度的大气污染，为了明确该日的主要大气污染源，我们在大气污染可视化系统中对大气污染成因进行分析。

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214151859342.png" alt="image-20211214151859342" style="zoom:50%;" />

<center>2（山东省热力图 2013.02.10）</center>

我们选定其中一个污染较重的省（例如山东），根据颜色分析出山东省内西南（济南附近）污染高，东北污染较少。然后在右侧出现的图上选择一个数据点，便会出现不同污染物浓度的直方图以及主要污染物。我们选择不同的数据点，可以看到PM2.5为普遍首要污染物，且除CO外（CO的浓度单位为微克/立方米，与其他污染物浓度度量不同，因此不考虑在内），PM10浓度最高，如图（3）。

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214152157455.png" alt="image-20211214152157455" style="zoom:50%;" />

<center>3（污染物浓度直方图）</center>

我们分析形成上述状况的原因如下：（1）人为原因：PM10主要来自污染源的直接排放，2013 年的济南正处于建设高峰期，大量钢铁企业和建筑工地的扬尘会增加 PM10的浓度；（2）地势原因：济南三面环山，雾霾难以消散。（3）气候原因：东北部沿海区域（威海，烟台）因为空气流通且环保要求严格等原因污染较轻；

以及通过散点图来查看不同污染物的相关性如图（4，5），我们发现除O3之外的污染物均互相具有不同程度的正相关，但是O3与其他污染物尤其是NO2具有相当明显的负相关，我们将于后续分析这种现象成因；

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214152332782.png" alt="image-20211214152332782" style="zoom:50%;" />

<center>4（O3-PM2.5）</center>

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214152359824.png" alt="image-20211214152359824" style="zoom:50%;" />

<center>5（O3-NO2）</center>

### 大气污染时空态势分析

#### 时间分析

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214152537449.png" alt="image-20211214152537449" style="zoom:50%;" />

<center>6 （污染物浓度变化-济南13-18 PM2.5）</center>

我们选择山东省济南市进行分析，如图6展示了不同污染物浓度的时间变化,由此图可以看出PM2.5浓度在逐年的递减；我们猜测是因为13年中国发布十三五计划，国家致力于环境整治的原因；后续我们选择17年进行更深分析，查看17年内PM2.5的浓度变化如图7，我们分析其原因有三部分：（1）人为原因：冬季大量化石燃料的燃烧，取暖导致；（2）地势原因：济南三面环山，雾霾难以消散。秋冬季节的大气扩散条件差，天气进入回温状态，冷大气弱。地面风速较小，利于污染物和水汽累积，导致污染加重；（3）气候原因：冬季的夜晚陆地温度，下降快，近地大气温度低，在无风天气，大气会形成下部温度低、上部温度高的气温结构，因此冬季的大量燃煤会造成济南附近夜晚大气严重污染。

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214152634614.png" alt="image-20211214152634614" style="zoom:50%;" />

<center>7（污染物浓度变化-济南17 PM2.5）</center>

#### 空间分析

**整体空间分析**

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214152914156.png" alt="image-20211214152914156" style="zoom:50%;" />

<center>8（热力图2013.01.01）</center>

如图（8）所示，我国的大气污染主要以图中线为界，该线接近于黑河—腾冲线（人口分布线），红线左边（西部与西北部地区） 常年空气质量优良，而红线右边常常空气质量较差。其中东侧普遍人口众多经济发达，并且西侧乌鲁木齐区城市群的聚类结果与东部相似，而人烟稀少的青藏高原区域普遍空气质量较好，这印证了空气污染与人口数量和经济水平具有较大的关系.

**季节性空间分析**

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214153041571.png" alt="image-20211214153041571" style="zoom:67%;" />

从图10,11,12,13中可以发现，我国空气污染范围冬季春季较大，秋季较小，夏季最小。在一年间，东部污染范围从整个华北区域，中部区域，南部区域向京津冀集中，十月份再次扩大；西部区域范围从冬季的乌鲁木齐城市群扩展到春季的塔里木盆地，内蒙古西部然后再收缩到乌鲁木齐城市群和吐鲁番盆地。其中新疆地区的异常我们将于后续分析；

### 大气污染物传输模式

#### 新疆污染分析

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214153402354.png" alt="image-20211214153402354" style="zoom:50%;" />

<center>13（污染物浓度直方图）</center>

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214153703508.png" alt="image-20211214153703508" style="zoom:50%;" />

<center>14（污染物浓度直方图）</center>

在季节性分析时，新疆地区的异常时间态势勾起人的好奇心；我们对比查看1月和四月的污染物浓度如图13，14可以对比发现，PM2.5和PM10的浓度有所升高，由于其所处地理位置为塔里木盆地中的坦克拉马干沙漠，我们推测时由于风沙引起的污染；因此，我们对比了一月和四月的风向图如图15，16，很明显可以看到在一月时塔里木盆地风力较弱，四月时风力较强且为东风；再结合新疆地形图17，塔里木盆地三面环山，东风吹进后在盆地中盘旋形成沙尘暴等恶劣天气；

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214153818835.png" alt="image-20211214153818835" style="zoom:50%;" />

<center>15（风向图 1月）</center>

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214153755113.png" alt="image-20211214153755113" style="zoom:45%;" />

<center>16（风向图 4月）</center>

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214153913438.png" alt="image-20211214153913438" style="zoom:50%;" />

<center>17 （新疆地形图）</center>

后续我们查询了相关的文献得知，多年来，新疆大气环境污染特征为：沙尘——煤烟混合型污染，全疆城市采暖期的污染以煤烟为主；非采暖期以沙尘为主。沙尘天气多发生在沙漠或半干旱地区，是典型的大气颗粒物沉降现象，它作为一种流动的大面积污染源，会加剧大气污染. 新疆的塔里木盆地西部等地是沙尘天气频发的重灾区。而影响新疆大气污染时空态势的主要因素为气候特征和地形特征。全疆荒漠广布，气候变化剧烈，月较差大，年较差也大，冬季寒冷漫长，夏季炎热短促：春季锋面气旋活跃，升温快，多大风，加之荒漠厂布，沙尘物质丰富，形成了多风沙的季节，成为沙尘污染；冬季寒冷且漫长，冷空气在盆地中堆积，大气层结稳定，逆温现象普通存在。且逆温层深厚，持续时间长，阻碍了大气污染物的扩散而使其严重超标，形成了城市大气煤烟污染加重。

### 污染物相关性分析

在进行大气污染源分析时，我们发现臭氧与其他污染物均成不同程度的负相关，现在我们进一步分析这种现象成因；

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214154116434.png" alt="image-20211214154116434" style="zoom:50%;" />

<center>18 （污染物浓度时间变化 济南 13-18 NO2）</center>

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214154146442.png" alt="image-20211214154146442" style="zoom:50%;" />

<center>19 （污染物浓度时间变化 济南 13-18 O3）</center>

我们选择与O3相关性最强的NO2作为对照，查看浓度时间变化图（），可以看到其负相关具体表现为冬季NO2浓度高，O3浓度低；夏季NO2浓度低O3浓度高。后经查阅相关资料得知，在阳光的照射下，氮氧化物NOX与挥发性有机物VOCs（Volatile Organic Compounds）在阳光照射下会生成O3，而夏季光照时间长且强烈，导致NOX大量转变成O3。但是同时我们也看到虽然NO2等污染物浓度逐年下降，但是O3呈逐年上升的趋势，经查阅O3与PM2.5都为二次污染物，其前体污染物均有 VOCs，但是，目前我国VOCs污染防治基础较为薄弱，存在排放基数不清、法规标准不健全、控制技术应用滞后、环境监管不到位等诸多问题。因此，如何切合我国的实际全面开展VOCs污染防治，是一项刻不容缓、艰巨复杂的任务。

### 模式聚类

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214154316490.png" alt="image-20211214154316490" style="zoom:50%;" />

<center>20（2013-1-1全国污染模式聚类）</center>

我们使用K-means方法对所有数据（污染物数据和气象数据）对所有地区分为五类，如图20；较为明显的，我们可以看到其中中等蓝类普遍为经济发达，人口众多的区域（东部沿海，四川盆地。乌鲁木齐城市群）；红色类普遍为青藏高原地区；深蓝类普遍邻近浅蓝色类，即普遍靠近山脉地形，处于山坡地带，其中位于青海省的大面积淡橙位于柴达木盆地以及右侧的河流沿岸区域，河流众多，人口相对较多。另外两类处于地势平缓的平原地区，其大多数为连续大面积区域。

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214154459832.png" alt="image-20211214154459832" style="zoom:50%;" />

### 归因分析

为探究以上大气污染态势的形成原因，我们猜想经济发展水平具有极大的影响。因此，我们从国家统计局获取了各地区煤炭消费量，石油焦碳工业投资，汽油消费量的相关数据进行分析。并将其按时间及地区可视化出来。

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214155007719.png" alt="image-20211214155007719" style="zoom:30%;" />

<center>21（各地区煤炭消费量）</center>

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214155106758.png" alt="image-20211214155106758" style="zoom:30%;" />

<center>22（各地区石油焦碳工业投资）</center>

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214155158224.png" alt="image-20211214155158224" style="zoom:30%;" />

<center>23（各地区汽油消费量）</center>

从图21，22中可以看出，山东省作为全国工业大省，煤炭消耗量和石油焦碳工业投资位居全国前列。从17年起，山西省煤炭消耗量超过山东，猜想山东省开始进行能源结构调整。

从图23中可以看出，四川省汽油消费量占据全国第一，可以推测出四川省的汽车保有量较高；同时从污染热力地图中可以看出，四川省污染集中在成都市及其周边，可以推断出，四川省经济结构以成都市为支柱。

## **大气污染预测**

为进一步探究大气污染态势未来发展，我们使用LSTM神经网络进行时序数据的预测，以60天为窗口，13-18年AQI数据作为训练集进行训练，并对19年前30天的污染指数（AQI）进行预测，由于数据较多，我们选取了长沙市等具有地区代表性的城市进行预测。以长沙市为例，如图24所示，一月份的污染指数仍然很高，大部分时间处于中度污染以上。证明环境治理政策仍需要进一步推进。

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214162718185.png" alt="image-20211214162718185" style="zoom:33%;" />

<center>24（长沙市19年前30天AQI预测）</center>

## 最终版本的改进

### 1. 页面布局

与初版相比，将主页集成三个主要页面并添加交互逻辑，能够更加全面的进行分析。

**旧版**

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214164741077.png" alt="image-20211214164741077" style="zoom:25%;" />

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214164800250.png" alt="image-20211214164800250" style="zoom:25%;" />

**新版：**

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20211214164841770.png" alt="image-20211214164841770" style="zoom:25%;" />

### 2. 添加更加复杂的交互逻辑

新版中的交互逻辑比旧版本中的更加复杂，不仅有单向链接，也有双向链接，并且可以在一个视图中显示出来。

### 3. 添加更为丰富的分析图像

与旧版相比，去掉了静态侧边栏及其中的静态图像，改用更加丰富的表达形式，例如：雷达图，散点图，风场图，模式聚类图等。

### 4. 建立新的页面跳转逻辑

整个项目分为首页，主页，归因分析，污染预测，READ ME，个人主页等几个页面，通过悬浮窗口和导航栏进行跳转。

### 5. 修改颜色编码和背景配色

采用更加科学的[热力图](https://colorbrewer2.org/#type=sequential&scheme=OrRd&n=7)及[背景配色方案](https://color.adobe.com/zh/explore/)，从用户视角进行修改，更加具有观赏性。
