#!/usr/bin/env python3
import rospy
import socket
from std_msgs.msg import Float32, Int32

s = socket.socket()
s.bind(('0.0.0.0', 8090))
s.listen(0)
threshold = 90
required_count = 20
current_count = 0
done = 0
def threshold_callback(data):
    global threshold
    threshold = data
    print("Threshold: ", threshold)

def count_callback(data):
    global required_count
    required_count = data
    print("Required Count: ", required_count)


def publisher(data):
    rospy.init_node('move_turtle', anonymous=True)
    pub = rospy.Publisher('/elbow', Float32, queue_size= 10)
    rospy.Subscriber('/threshold', Float32, threshold_callback)
    rospy.Subscriber('/count', Int32, count_callback)
    pub.publish(data)

while True:
    client, addr = s.accept()
    
    while not rospy.is_shutdown():
        content = client.recv(32)
        if len(content) == 0:
            break
        else:
            # Assuming the data received is a string representation of a float
            float_content = float(content.decode('utf-8'))
            print(float_content)
            # publisher(float_content)
        
        if (float_content > threshold):
            current_count += 1
            print("current count: ", current_count)
            if current_count == required_count :
                done = 1
                print("Exercise Complete")
                break

    # print("Closing connection")
    client.close()
    if done :
        break