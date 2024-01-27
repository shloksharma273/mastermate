import cv2
import numpy as np
import cvzone
from cvzone.PoseModule import PoseDetector
import math

cap = cv2.VideoCapture("D:\deeplearning\practise\images\ehhhhhh.mp4")
pd=PoseDetector(trackCon=0.70,detectionCon=0.70)
counter = 0
direction = 0

def angles(lmlist,p1,p2,p3,p4,p5,p6,drawpoints):
    global counter
    global direction


    if len(lmlist)!=0:
        point1=lmlist[p1]
        point2=lmlist[p2]
        point3=lmlist[p3]
        point4=lmlist[p4]
        point5=lmlist[p5]
        point6=lmlist[p6]

        x1, y1 = point1[0], point1[1]
        x2, y2 = point2[0], point2[1]
        x3, y3 = point3[0], point3[1]
        x4, y4 = point4[0], point4[1]
        x5, y5 = point5[0], point5[1]
        x6, y6 = point6[0], point6[1]

        if drawpoints== True:
            cv2.circle(img,(x1,y1),5,(255,0,255),5)
            cv2.circle(img,(x2,y2),5,(255,0,255),5)
            cv2.circle(img,(x3,y3),5,(255,0,255),5)
            cv2.circle(img,(x4,y4),5,(255,0,255),5)
            cv2.circle(img,(x5,y5),5,(255,0,255),5)
            cv2.circle(img,(x6,y6),5,(255,0,255),5)
            cv2.line(img,(x1,y1),(x2,y2),(255,0,0),5) 
            cv2.line(img,(x2,y2),(x3,y3),(255,0,0),5) 
            cv2.line(img,(x4,y4),(x5,y5),(255,0,0),5) 
            cv2.line(img,(x5,y5),(x6,y6),(255,0,0),5) 
            cv2.line(img,(x1,y1),(x4,y4),(255,0,0),5) 


            
        lefthandangle = math.degrees(math.atan2(y3 - y2, x3 - x2) -
                                         math.atan2(y1 - y2, x1 - x2))

        righthandangle = math.degrees(math.atan2(y6 - y5, x6 - x5) -
                                          math.atan2(y4 - y5, x4 - x5))
            

        lefthandangle=int(np.interp(lefthandangle,[-30,180],[100,0]))
        righthandangle=int(np.interp(righthandangle,[34,173],[100,0]))
            # print(lefthandangle)
            # print(righthandangle)

        if lefthandangle>=70 and righthandangle>=70:
            if direction==0:
                    counter+=0.5
                    direction=1
        if lefthandangle<=70 and righthandangle<=70:
            if direction==1:
                    counter+=0.5
                    direction=0    
        cv2.rectangle(img, (0, 0), (120, 120), (255, 0, 0), -1)
        cv2.putText(img, str(int(counter)), (20, 70), cv2.FONT_HERSHEY_SCRIPT_SIMPLEX, 1.6, (0, 0, 255), 7)


while 1:
    ret, img=cap.read()
    if not ret:
        cap = cv2.VideoCapture("D:\deeplearning\practise\images\ehhhhhh.mp4")
        continue
    img=cv2.resize(img,(640,480))

    pd.findPose(img,draw=0)
    lmlist ,bbox=pd.findPosition(img,draw=0,bboxWithHands=0)

    angles(lmlist,11,13,15,12,14,16,drawpoints=1)

   
    

    
    cv2.imshow('frame',img)
    cv2.waitKey(1)