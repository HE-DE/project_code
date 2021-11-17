#include <bits/stdc++.h>
#include <io.h>
#include <direct.h>
using namespace std;
vector<string> path;
vector<string> p2;
vector<string> name;
struct ds
{
    float data[6];
    string Time;
};

int main()
{
    ifstream fg("D:\\DA-code\\dir.txt");
    string line1;
    while (getline(fg, line1))
    {
        istringstream readstr1(line1);
        string ss2;
        for (int j = 0; j < 5; j++)
        {
            getline(readstr1, ss2, '\\'); //循环读取数据
            if (j == 3)
            {
                p2.emplace_back(ss2);
            }
            if (j == 4)
            {
                name.emplace_back(ss2);
            }
        }
        string ss1;
        getline(readstr2, ss1);
        path.emplace_back(ss1);
    }
    for (int pp = 0; pp < path.size(); pp++)
    {
        vector<ds> data_line;
        ifstream fp(path[pp]); //定义声明一个ifstream对象，指定文件路�?
        string line;
        getline(fp, line); //跳过列名，第一行不做处�?
        while (getline(fp, line))
        { //循环读取每行数据
            ds temp;
            string ss;
            istringstream readstr(line); //string数据流化
            //将一行数据按'�?'分割
            for (int j = 0; j < 17; j++)
            {                              //可根据数据的实际情况取循环获�?
                getline(readstr, ss, ','); //循环读取数据
                if (j < 11)
                {
                    temp.data[j] = atof(ss.c_str());
                }
                else if (j < 12)
                {
                    temp.lat = ss;
                }
                else if (j < 13)
                {
                    temp.lon = ss;
                }
                else if (j >= 14)
                {
                    temp.geo[j - 14] = ss;
                }
            }
            data_line.emplace_back(temp);
        }
        vector<ds> result;
        for (int i = 0; i < data_line.size(); i++)
        {
            result.emplace_back(data_line[i]);
        }

        for (int i = 0; i < result.size(); i++)
        {
            vector<float> I = IAQI(result[i].data);
            int index;
            float ans = -1;
            for (int j = 0; j < I.size(); j++)
            {
                if (I[j] > ans)
                {
                    ans = I[j];
                    index = j;
                }
            }
            float aqi = I[index];
            result[i].aqi = aqi;
            if (index == 0)
            {
                result[i].m = "PM2.5";
            }
            else if (index == 1)
            {
                result[i].m = "PM10";
            }
            else if (index == 2)
            {
                result[i].m = "SO2";
            }
            else if (index == 3)
            {
                result[i].m = "NO2";
            }
            else if (index == 4)
            {
                result[i].m = "CO";
            }
            else if (index == 5)
            {
                result[i].m = "O3";
            }
        }

        // ofstream outFile;
        // string pdir = "D:\\DA-code\\city\\" + p2[pp] + "\\";
        // if (_access(pdir.c_str(), 0) == -1)
        // {
        //     _mkdir(pdir.c_str());
        // }
        // string ppp = "D:\\DA-code\\city\\" + p2[pp] + "\\" + name[pp];
        // outFile.open(ppp);
        // outFile << "PM2.5(微克每立方米),PM10(微克每立方米),SO2(微克每立方米),NO2(微克每立方米),CO(毫克每立方米),O3(微克每立方米),U(m/s),V(m/s),TEMP(K),RH(%),PSFC(Pa),lat,lon,AQI,Major pollutants,id" << endl;
        // for (int i = 0; i < result.size(); i++)
        // {
        //     string rs = "";
        //     for(int j=0;j<11;j++)
        //     {
        //         rs+=to_string(result[i].data[j]);
        //         rs+=",";
        //     }
        //     rs+=result[i].lat;
        //     rs+=",";
        //     rs+=result[i].lon;
        //     rs+=",";
        //     rs+=to_string(result[i].aqi);
        //     rs+=",";
        //     rs+=result[i].m;
        //     rs+=",";
        //     rs+=to_string(i);
        //     outFile << rs << endl;
        // }
        // cout << "finished"
        //      << " " << pp << "\n";

        for (int i = 0; i < result.size(); i++)
        {
            if (result[i].geo[0] == "安徽省")
            {
                result[i].geo[0] = "anhui";
            }
            else if (result[i].geo[0] == "澳门特别行政区")
            {
                result[i].geo[0] = "aomen";
            }
            else if (result[i].geo[0] == "北京市")
            {
                result[i].geo[0] = "beijing";
            }
            else if (result[i].geo[0] == "重庆市")
            {
                result[i].geo[0] = "chongqing";
            }
            else if (result[i].geo[0] == "福建省")
            {
                result[i].geo[0] = "fujian";
            }
            else if (result[i].geo[0] == "甘肃省")
            {
                result[i].geo[0] = "gansu";
            }
            else if (result[i].geo[0] == "广东省")
            {
                result[i].geo[0] = "guangdong";
            }
            else if (result[i].geo[0] == "广西壮族自治区")
            {
                result[i].geo[0] = "guangxi";
            }
            else if (result[i].geo[0] == "贵州省")
            {
                result[i].geo[0] = "guizhou";
            }
            else if (result[i].geo[0] == "海南省")
            {
                result[i].geo[0] = "hainan";
            }
            else if (result[i].geo[0] == "河北省")
            {
                result[i].geo[0] = "hebei";
            }
            else if (result[i].geo[0] == "黑龙江省")
            {
                result[i].geo[0] = "heilongjiang";
            }
            else if (result[i].geo[0] == "河南省")
            {
                result[i].geo[0] = "henan";
            }
            else if (result[i].geo[0] == "湖北省")
            {
                result[i].geo[0] = "hubei";
            }
            else if (result[i].geo[0] == "湖南省")
            {
                result[i].geo[0] = "hunan";
            }
            else if (result[i].geo[0] == "江苏省")
            {
                result[i].geo[0] = "jiangsu";
            }
            else if (result[i].geo[0] == "江西省")
            {
                result[i].geo[0] = "jiangxi";
            }
            else if (result[i].geo[0] == "吉林省")
            {
                result[i].geo[0] = "jilin";
            }
            else if (result[i].geo[0] == "辽宁省")
            {
                result[i].geo[0] = "liaoning";
            }
            else if (result[i].geo[0] == "内蒙古自治区")
            {
                result[i].geo[0] = "neimenggu";
            }
            else if (result[i].geo[0] == "宁夏回族自治区")
            {
                result[i].geo[0] = "ningxia";
            }
            else if (result[i].geo[0] == "青海省")
            {
                result[i].geo[0] = "qinghai";
            }
            else if (result[i].geo[0] == "山东省")
            {
                result[i].geo[0] = "shandong";
            }
            else if (result[i].geo[0] == "上海市")
            {
                result[i].geo[0] = "shanghai";
            }
            else if (result[i].geo[0] == "山西省")
            {
                result[i].geo[0] = "shanxi";
            }
            else if (result[i].geo[0] == "陕西省")
            {
                result[i].geo[0] = "shangxi";
            }
            else if (result[i].geo[0] == "四川省")
            {
                result[i].geo[0] = "sichuan";
            }
            else if (result[i].geo[0] == "台湾省")
            {
                result[i].geo[0] = "taiwan";
            }
            else if (result[i].geo[0] == "天津市")
            {
                result[i].geo[0] = "tianjin";
            }
            else if (result[i].geo[0] == "香港特别行政区")
            {
                result[i].geo[0] = "xianggang";
            }
            else if (result[i].geo[0] == "新疆维吾尔自治区")
            {
                result[i].geo[0] = "xinjiang";
            }
            else if (result[i].geo[0] == "西藏自治区")
            {
                result[i].geo[0] = "xizang";
            }
            else if (result[i].geo[0] == "云南省")
            {
                result[i].geo[0] = "yunnan";
            }
            else if (result[i].geo[0] == "浙江省")
            {
                result[i].geo[0] = "zhejiang";
            }else{
                continue;
            }
            ofstream outFile;
            string pdir = "D:\\DA-code\\city\\" + result[i].geo[0] + "\\" + p2[pp] + "\\";
            if (_access(pdir.c_str(), 0) == -1)
            {
                _mkdir(pdir.c_str());
            }
            string ppp = "D:\\DA-code\\city\\" + result[i].geo[0] + "\\" + p2[pp] + "\\" + name[pp];
            if (_access(ppp.c_str(), 0) == -1)
            {
                outFile.open(ppp);
                outFile << "PM2.5(微克每立方米),PM10(微克每立方米),SO2(微克每立方米),NO2(微克每立方米),CO(毫克每立方米),O3(微克每立方米),U(m/s),V(m/s),TEMP(K),RH(%),PSFC(Pa),lat,lon,AQI,Major pollutants,id" << endl;
            }else
            {
                outFile.open(ppp,ios::app);
            }
            string rs = "";
            for (int k = 0; k < 11; k++)
            {
                rs += to_string(result[i].data[k]);
                rs += ",";
            }
            rs += result[i].lat;
            rs += ",";
            rs += result[i].lon;
            rs += ",";
            rs += to_string(result[i].aqi);
            rs += ",";
            rs += result[i].m;
            rs += ",";
            rs += to_string(i);
            outFile << rs << endl;
        }
        cout << "finished"
             << " " << pp << "\n";
    }
    return 0;
}