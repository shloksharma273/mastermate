import cv2
import mediapipe as mp
import numpy as np
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
from cvzone.PoseModule import PoseDetector
import math



cap = cv2.VideoCapture(0)
pd=PoseDetector(trackCon=0.70,detectionCon=0.70)


def angles(lmlist,p1,p2,p3,p4,p5,p6,drawpoints):

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
            cv2.circle(image,(x1,y1),5,(255,0,255),5)
            cv2.circle(image,(x2,y2),5,(255,0,255),5)
            cv2.circle(image,(x3,y3),5,(255,0,255),5)
            cv2.circle(image,(x4,y4),5,(255,0,255),5)
            cv2.circle(image,(x5,y5),5,(255,0,255),5)
            cv2.circle(image,(x6,y6),5,(255,0,255),5)
            cv2.line(image,(x1,y1),(x2,y2),(255,0,0),5) 
            cv2.line(image,(x2,y2),(x3,y3),(255,0,0),5) 
            cv2.line(image,(x4,y4),(x5,y5),(255,0,0),5) 
            cv2.line(image,(x5,y5),(x6,y6),(255,0,0),5) 
            cv2.line(image,(x1,y1),(x4,y4),(255,0,0),5) 



# Curl counter variables
counter = 0 
stage = None
def calculate_angle(a,b,c):
    a = np.array(a) # First
    b = np.array(b) # Mid
    c = np.array(c) # End
    
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    
    if angle >180.0:
        angle = 360-angle
        
    return angle 

## Setup mediapipe instance
with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        ret, frame = cap.read()
        
        # Recolor image to RGB
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image.flags.writeable = False
      
        # Make detection
        results = pose.process(image)
    
        # Recolor back to BGR
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
        
        # Extract landmarks
        try:
            landmarks = results.pose_landmarks.landmark
            
            # Get coordinates
            shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
            elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
            wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
            
            # Calculate angle
            angle = calculate_angle(shoulder, elbow, wrist)
            
            # Visualize angle
            cv2.putText(image, str(angle), 
                           tuple(np.multiply(elbow, [640, 480]).astype(int)), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                                )
            
            # Curl counter logic
            if angle > 160:
                stage = "down"
            if angle < 30 and stage =='down':
                stage="up"
                counter +=1
               
                       
        except:
            pass
        image=cv2.flip(image,1)
        # Render curl counter
        # Setup status box
        cv2.rectangle(image, (0,0), (120,120), (255,0,0), -1)
        
        # Rep data
        
        cv2.putText(image, str(counter), 
                    (10,60), 
                    cv2.FONT_HERSHEY_SCRIPT_SIMPLEX, 1.6, (255,255,255), 2)
        
        pd.findPose(image,draw=0)
        lmlist ,bbox=pd.findPosition(image,draw=0,bboxWithHands=0)
        angles(lmlist,11,13,15,12,14,16,drawpoints=1)
                                
        
        cv2.imshow('Curl Counter', image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()