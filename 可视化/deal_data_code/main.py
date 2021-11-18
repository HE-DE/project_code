import requests
import pandas as pd
import importlib,sys
importlib.reload(sys)
import os
f1=pd.read_csv('CN-2013010100.csv')

i=1
for root,dirs,files in os.walk("./data"):
    for file in files:
        filepath=os.path.join(root,file)
        f2 = pd.read_csv(filepath)
        file_data = [f2, f1]
        train = pd.concat(file_data, axis=1)
        train.to_csv(filepath, index=None)
        i=i+1
    print("finshed",i)