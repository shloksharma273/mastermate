#!/usr/bin/env python3
import rospy
from std_msgs.msg import Float32

def publisher(data):
    rospy.init_node('move_turtle', anonymous=True)
    pub = rospy.Publisher('/elbow', Float32, queue_size= 10)
    pub.publish(data)

i = 0.0

while not rospy.is_shutdown() :
        i+= 1
        publisher(i) 
        print(i)
        rospy.sleep(1)
        if ( i > 20):
            break 