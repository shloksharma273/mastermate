#!/usr/bin/env python3
import rospy
import socket
from std_msgs.msg import Float32

s = socket.socket()
s.bind(('0.0.0.0', 8090))
s.listen(0)

def publisher(data):
    rospy.init_node('move_turtle', anonymous=True)
    pub = rospy.Publisher('/data', Float32, queue_size= 10)
    pub.publish(data)

while True:
    client, addr = s.accept()

    while True:
        content = client.recv(32)
        if len(content) == 0:
            break
        else:
            # Assuming the data received is a string representation of a float
            float_content = float(content.decode('utf-8'))
            print(float_content)
            publisher(float_content)

    print("Closing connection")
    client.close()
