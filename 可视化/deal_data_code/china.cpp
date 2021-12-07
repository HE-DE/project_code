#include <bits/stdc++.h>
#include <io.h>
#include <direct.h>
using namespace std;
string Time;
string filename;
string province; 
vector<string> name;
struct ds
{
    float data[6];
    float AQI;
    string Time;
    string id;
};

int main()
{
    ifstream fg("dir.txt");
    string line1;
    vector<ds> dataline;
    while (getline(fg, line1))
    {
        istringstream readstr1(line1);
        string ss2;
        cout<<line1; 
        for (int j = 0; j < 6; j++)
        {
            getline(readstr1, ss2, '\\');
            if (j == 5)
            {
                filename = ss2;
            }
            if (j == 2)
            {
                province = ss2;
                cout<<province;
            }
        }
        if(filename.length()<28)
        {
            continue;
        }
        string temp = filename.substr(20,28);
        Time="";
        for (int i = 0; i < 8; i++)
        {
            Time += temp[i];
            if(i==3||i==5)
            {
                Time+="-";
            }

        }
        filename = line1;
        ifstream fp(filename);
        string line;
        getline(fp, line);
        int oo=0;
        ds aa;
        while (getline(fp, line))
        { //循环读取每行数据
            ds temp;
            oo+=1;
            string ss;
            istringstream readstr(line); // string数据流化
            temp.id=province;
            
            for (int j = 0; j < 16; j++)
            {
                getline(readstr, ss, ','); //循环读取数据
                
                if (j < 6)
                {
                    temp.data[j] = atof(ss.c_str());
                }
                else if(j==13)
                {
                    temp.AQI=atof(ss.c_str());
                }
            }
          aa=temp;
        }
        aa.Time=Time;
        dataline.emplace_back(aa);
        cout<<aa.AQI<<"\n";
    }
    ofstream outFile;
    string outfilename = "china.csv";
    outFile.open(outfilename);
    outFile << "PROVINCE,AQI,PM2_5,PM10,SO2,NO2,CO,O3,Time" << endl;

    for(int i=0;i<dataline.size();i++)
    {
        string rs = "";
        rs+=dataline[i].id;
        rs+=",";
        rs+=to_string(dataline[i].AQI);
        rs+=",";
        for (int k = 0; k < 6; k++)
        {
            rs += to_string(dataline[i].data[k]);
            rs += ",";
        }
        rs+=dataline[i].Time;
        outFile << rs << endl;
    }
    return 0;
}