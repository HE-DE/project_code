import os
f=open("dir.txt","a")
for root,dirs,files in os.walk("D:\\DA-code\\city\\xinjiang"):
    for file in files:
        f.writelines(os.path.join(root,file)+"\n")