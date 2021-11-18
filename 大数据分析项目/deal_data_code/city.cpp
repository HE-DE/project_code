#include <bits/stdc++.h>
#include <io.h>
#include <direct.h>
using namespace std;
vector<string> path;
vector<string> p2;
vector<string> name;
struct ds
{
    string m;
    string dengji;
    float aqi;
    float data[6];
    string geo[3];
};
float caculate(int HI, int LI, int HB, int LB, float C)
{
    float ans = 0;
    ans = ((HI - LI) * 1.0 / (HB - LB)) * (C - LB) + LI;
    return ans;
}

float IQIAP(float d, int index)
{
    float ans;
    if (index == 0)
    {
        if (d >= 0 && d < 35)
        {
            ans = caculate(50, 0, 35, 0, d);
        }
        else if (d >= 35 && d < 75)
        {
            ans = caculate(100, 50, 75, 35, d);
        }
        else if (d >= 75 && d < 115)
        {
            ans = caculate(150, 100, 115, 75, d);
        }
        else if (d >= 115 && d < 150)
        {
            ans = caculate(200, 150, 150, 115, d);
        }
        else if (d >= 150 && d < 250)
        {
            ans = caculate(300, 200, 250, 150, d);
        }
        else if (d >= 250 && d < 350)
        {
            ans = caculate(400, 300, 350, 250, d);
        }
        else if (d >= 350 && d <= 500)
        {
            ans = caculate(500, 400, 500, 350, d);
        }
        return ans;
    }
    else if (index == 1)
    {
        if (d >= 0 && d < 50)
        {
            ans = caculate(50, 0, 50, 0, d);
        }
        else if (d >= 50 && d < 150)
        {
            ans = caculate(100, 50, 150, 50, d);
        }
        else if (d >= 150 && d < 250)
        {
            ans = caculate(150, 100, 250, 150, d);
        }
        else if (d >= 250 && d < 350)
        {
            ans = caculate(200, 150, 350, 250, d);
        }
        else if (d >= 350 && d < 420)
        {
            ans = caculate(300, 200, 420, 350, d);
        }
        else if (d >= 420 && d < 500)
        {
            ans = caculate(400, 300, 500, 420, d);
        }
        else if (d >= 500 && d <= 600)
        {
            ans = caculate(500, 400, 600, 500, d);
        }
        return ans;
    }
    else if (index == 2)
    {
        if (d >= 0 && d < 50)
        {
            ans = caculate(50, 0, 50, 0, d);
        }
        else if (d >= 50 && d < 150)
        {
            ans = caculate(100, 50, 150, 50, d);
        }
        else if (d >= 150 && d < 475)
        {
            ans = caculate(150, 100, 475, 150, d);
        }
        else if (d >= 475 && d < 800)
        {
            ans = caculate(200, 150, 800, 475, d);
        }
        else if (d >= 800 && d < 1600)
        {
            ans = caculate(300, 200, 1600, 800, d);
        }
        else if (d >= 1600 && d < 2100)
        {
            ans = caculate(400, 300, 2100, 1600, d);
        }
        else if (d >= 2100 && d <= 2620)
        {
            ans = caculate(500, 400, 2620, 2100, d);
        }
        return ans;
    }
    else if (index == 3)
    {
        if (d >= 0 && d < 40)
        {
            ans = caculate(50, 0, 40, 0, d);
        }
        else if (d >= 40 && d < 80)
        {
            ans = caculate(100, 50, 80, 40, d);
        }
        else if (d >= 80 && d < 180)
        {
            ans = caculate(150, 100, 180, 80, d);
        }
        else if (d >= 180 && d < 280)
        {
            ans = caculate(200, 150, 280, 180, d);
        }
        else if (d >= 280 && d < 565)
        {
            ans = caculate(300, 200, 565, 280, d);
        }
        else if (d >= 565 && d < 750)
        {
            ans = caculate(400, 300, 750, 565, d);
        }
        else if (d >= 750 && d <= 940)
        {
            ans = caculate(500, 400, 940, 750, d);
        }
        return ans;
    }
    else if (index == 4)
    {
        if (d >= 0 && d < 2)
        {
            ans = caculate(50, 0, 2, 0, d);
        }
        else if (d >= 2 && d < 4)
        {
            ans = caculate(100, 50, 4, 2, d);
        }
        else if (d >= 4 && d < 14)
        {
            ans = caculate(150, 100, 14, 4, d);
        }
        else if (d >= 14 && d < 24)
        {
            ans = caculate(200, 150, 24, 14, d);
        }
        else if (d >= 24 && d < 36)
        {
            ans = caculate(300, 200, 36, 24, d);
        }
        else if (d >= 36 && d < 48)
        {
            ans = caculate(400, 300, 48, 36, d);
        }
        else if (d >= 60 && d <= 48)
        {
            ans = caculate(500, 400, 60, 48, d);
        }
        return ans;
    }
    else if (index == 5)
    {
        if (d >= 0 && d < 30)
        {
            ans = caculate(50, 0, 300, 0, d);
        }
        else if (d >= 300 && d < 480)
        {
            ans = caculate(100, 50, 480, 300, d);
        }
        else if (d >= 480 && d < 645)
        {
            ans = caculate(150, 100, 645, 480, d);
        }
        else if (d >= 645 && d < 795)
        {
            ans = caculate(200, 150, 795, 645, d);
        }
        else if (d >= 795 && d < 2400)
        {
            ans = caculate(300, 200, 2400, 795, d);
        }
        else if (d >= 2400 && d < 3000)
        {
            ans = caculate(400, 300, 3000, 2400, d);
        }
        else if (d >= 3000 && d <= 3600)
        {
            ans = caculate(500, 400, 3600, 3000, d);
        }
        return ans;
    }
    return -1;
}

vector<float> IAQI(float d[])
{
    vector<float> ans;
    for (int i = 0; i < 6; i++)
    {
        float aa = IQIAP(d[i], i);
        ans.emplace_back(aa);
    }
    return ans;
}

string AQI(float d)
{
    if (d >= 0 && d <= 50)
    {
        return "一级";
    }
    else if (d > 50 && d <= 100)
    {
        return "二级";
    }
    else if (d > 100 && d <= 150)
    {
        return "三级";
    }
    else if (d > 150 && d <= 200)
    {
        return "四级";
    }
    else if (d > 200 && d <= 300)
    {
        return "五级";
    }
    else if (d > 300)
    {
        return "六级";
    }
    return " ";
}

int main()
{
    ifstream fg("D:\\DA-code\\dir.txt");
    string line1;
    while (getline(fg, line1))
    {
        istringstream readstr1(line1);
        istringstream readstr2(line1);
        string ss2;
        for (int j = 0; j < 5; j++)
        {                                 //可根据数据的实际情况取循环获取
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
        ifstream fp(path[pp]); //定义声明一个ifstream对象，指定文件路径
        string line;
        getline(fp, line); //跳过列名，第一行不做处理
        while (getline(fp, line))
        { //循环读取每行数据
            ds temp;
            string ss;
            istringstream readstr(line); //string数据流化
            //将一行数据按'，'分割
            for (int j = 0; j < 17; j++)
            {                              //可根据数据的实际情况取循环获取
                getline(readstr, ss, ','); //循环读取数据
                if (j < 6)
                {
                    temp.data[j] = atof(ss.c_str());
                }
                else if (j >= 14)
                {
                    temp.geo[j - 14] = ss;
                }
            }
            data_line.emplace_back(temp);
        }
        vector<ds> result;
        int j = 0;
        map<string, int> duiying;
        map<string, int> temp;
        for (int i = 0; i < data_line.size(); i++)
        {
            if (data_line[i].geo[0] == "[]" || data_line[i].geo[0] == "中华人民共和国")
            {
                continue;
            }
            else
            {
                if (duiying.count(data_line[i].geo[0]) == 0)
                {
                    temp.insert(make_pair(data_line[i].geo[0], 1));
                    duiying.insert(make_pair(data_line[i].geo[0], j));
                    j++;
                    result.emplace_back(data_line[i]);
                }
                else
                {
                    auto it = duiying.find(data_line[i].geo[0]);
                    auto tit = temp.find(data_line[i].geo[0]);
                    tit->second += 1;
                    int index = it->second;
                    for (int t = 0; t < 6; t++)
                    {
                        result[index].data[t] += data_line[i].data[t];
                    }
                }
            }
        }
        for (int i = 0; i < result.size(); i++)
        {
            string city = result[i].geo[0];
            auto tit = temp.find(city);
            auto it = duiying.find(city);
            int index = it->second;
            int tt = tit->second;
            for (int t = 0; t < 6; t++)
            {
                result[index].data[t] /= tt;
            }
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
                result[i].dengji = AQI(aqi);
            }
            else if (index == 1)
            {
                result[i].m = "PM10";
                result[i].dengji = AQI(aqi);
            }
            else if (index == 2)
            {
                result[i].m = "SO2";
                result[i].dengji = AQI(aqi);
            }
            else if (index == 3)
            {
                result[i].m = "NO2";
                result[i].dengji = AQI(aqi);
            }
            else if (index == 4)
            {
                result[i].m = "CO";
                result[i].dengji = AQI(aqi);
            }
            else if (index == 5)
            {
                result[i].m = "O3";
                result[i].dengji = AQI(aqi);
            }
        }

        ofstream outFile;
        string pdir = "D:\\DA-code\\deal-p-data\\" + p2[pp] + "\\";
        if (_access(pdir.c_str(), 0) == -1)
        {
            _mkdir(pdir.c_str());
        }
        string ppp = "D:\\DA-code\\deal-p-data\\" + p2[pp] + "\\" + name[pp];
        outFile.open(ppp);
        outFile << "province,首要污染物,PM2.5,PM10,SO2,NO2,CO,O3" << endl;
        for (int i = 0; i < result.size(); i++)
        {
            string rs = "";
            rs += result[i].geo[0];
            rs += ",";
            rs+=result[i].m;
            rs+=",";
            for(int j=0;j<5;j++)
            {
                rs+=to_string(result[i].data[j]);
                rs+=",";
            }
            rs+=to_string(result[i].data[5]);
            outFile << rs << endl;
        }
        cout << "finished"
             << " " << pp << "\n";
    }
    return 0;
}