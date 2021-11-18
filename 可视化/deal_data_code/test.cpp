/*
输入：初步处理后的文件
输出：以省为单位
*/

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include<map>
using namespace std;
struct ds{
    float data[11];
    string ll[2];
    string geo[3];
};
int main(){
    vector<ds> data_line;
    ifstream fp("D:\\DA-code\\CN-Reanalysis-daily-2013010100.csv"); //定义声明一个ifstream对象，指定文件路径
    string line;
    getline(fp,line); //跳过列名，第一行不做处理
    while (getline(fp,line)){ //循环读取每行数据
        ds temp;
        string ss;
        istringstream readstr(line); //string数据流化
        //将一行数据按'，'分割
        for(int j = 0;j < 17;j++){ //可根据数据的实际情况取循环获取
            getline(readstr,ss,','); //循环读取数据
            if(j<11)
            {
                temp.data[j]=atof(ss.c_str());
            }
            else if(j<13)
            {
                temp.ll[j-11]=ss;
            }
            else if(j>=14)
            {
                temp.geo[j-14]=ss;
            }
        }
        data_line.emplace_back(temp);
    }
    vector<ds> result;
    int j=0;
    map<string,int> duiying;
    for(int i=0;i<data_line.size();i++)
    {
        if(data_line[i].geo[0]=="[]"||data_line[i].geo[0]=="中华人民共和国")
        {
            continue;
        }
        else
        {
            if(duiying.count(data_line[i].geo[0])==0)
            {
                duiying.insert(make_pair(data_line[i].geo[0],j));
                j++;
                result.emplace_back(data_line[i]);
            }
            else
            {
                auto it=duiying.find(data_line[i].geo[0]);
                int index=it->second;
                for(int t=0;t<11;t++)
                {
                    result[index].data[t]+=data_line[i].data[t];
                }
            }
        }
    }
    
    ofstream outFile;
    outFile.open("D:\\DA-code\\deal-pro-data\\CN-Reanalysis-daily-2013010100.csv");
    outFile<<"PM2.5(微克每立方米),PM10(微克每立方米),SO2(微克每立方米),NO2(微克每立方米),CO(毫克每立方米),O3(微克每立方米),lat,lon,province"<<endl;
    for(int i=0;i<result.size();i++)
    {
        string rs="";
        for(int j=0;j<6;j++)
        {
            rs+=to_string(result[i].data[j]);
            rs+=",";
        }
        rs+=result[i].ll[0];
        rs+=",";
        rs+=result[i].ll[1];
        rs+=",";
        rs+=result[i].geo[0];
        outFile<<rs<<endl;
    }
    return 0;
}