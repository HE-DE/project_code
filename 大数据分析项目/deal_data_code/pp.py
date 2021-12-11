import os
f=open("dir.txt","a")
for root,dirs,files in os.walk("D:\\data_vis\\DATA_FOR_PROJECT\\country"):
    for file in files:
        f.writelines(os.path.join(root,file)+"\n")
        