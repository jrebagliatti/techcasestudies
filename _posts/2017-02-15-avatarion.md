---
layout: post
title: "Using robots and an IoT solution, Avatarion helps sick children stay connected"
author: "Ronnie Saurenmann, Ken Casada"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-04-04
categories: [IoT]
color: "blue"
image: "images/avatarion/feat_avatarkids.jpg"
excerpt: Avatarion Technology is running a pilot project that helps hospitalized children stay in touch with home and school through the use of robots. It needed a way to collect telemetry data from the robots and interact with them remotely. Working with Microsoft, they turned to an IoT solution using IoT Hub, Stream Analytics, and Power BI.  
language: [English]
verticals: [Health]
geolocation: [Europe]
#permalink: /<page-title>.html
---

![Logo]({{ site.baseurl }}/images/avatarion/avatarion_logo.png)

Avatarion Technology creates custom solutions for robots. It develops applications for humanoid robots by providing customers with a complete infrastructure to work and interact with these robots. Its most successful solution is Avatar Kids, a unique, worldwide project that enables children and teens to remain in contact with their home and school environments during long-term hospital stays.

On the technical side, the solution consists of an Azure IoT Hub acting as a telemetry data collector, remote control, and assets management tool. Azure Stream Analytics is also part of the solution, used as a real-time error-management and alarm system. It also generates statistical data about robot usage, location, hours of function, robot behavior, charging cycles, and successful and failed interactions. Cloud storage in the form of Azure SQL Database is used to save all telemetry data for further analysis. Microsoft Power BI provides the cockpit dashboard for both Avatarion and its customers and helps them to gain key insights into what works well and what needs to be improved in the product. 

![Description of the image]({{ site.baseurl }}/images/avatarion/avatarkids.jpg)

**Key technologies used**

- Pepper and Nao humanoid robots
- NAOqi OS
- Azure IoT Hub
- Azure Stream Analytics
- Azure SQL Database
- Microsoft Power BI
- Xamarin
- Azure Machine Learning
- QnA Maker
- Python
 
**The core team**

Avatarion:

- Jean Christophe Gostanian – CEO
- Tobias Kiefer – CTO
- Jessica Eichberg – Developer

Microsoft Switzerland:

- Ronnie Saurenmann – Technical Evangelist
- Ken Casada – Technical Evangelist

![Description of the image]({{ site.baseurl }}/images/avatarion/peppergroup.jpg)

## Customer profile ##

[Avatarion Technology AG](http://www.avatarion.ch) is a Swiss startup that specializes in creating humanoid robots based on vertically complete solutions that provide customers with a new and innovative way to work and interact with their robots. Its areas of expertise are healthcare, education, retail, and events. It works with two types of robots from SoftBank Robotics: Nao and Pepper.

## Problem statement ##

Avatarion is currently running a worldwide pilot project, Avatar Kids, which enables youths between ages 4 and 18 to remain in contact with their familiar environments at school and home during a long hospital stay. The Avatar robot Nao functions as the link between the young patient and the patient's school or family. The pilot currently involves six hospitals and 25 robots, and numbers are growing every day.

Right now Avatarion does not have any telemetry data from the robots and is not able to interact with them remotely. As a result, it's not possible for Avatarion and the customers to get insights into the use and functioning of the robots. 

That's why the company needs a cockpit solution that displays data in near real time about the robot usage, eventual interaction errors, battery status, location, and more. The IoT solution must provide the key missing piece that proves how effective these robots are for sick children.

![Description of the image]({{ site.baseurl }}/images/avatarion/problem.jpg)
 
## Solution and steps ##

During our hackfest with Avatarion, we came up with an architecture and a first implementation from data ingestion to data analysis in the cloud. Our goal was to have secure, bidirectional communication with the robots that allows for the collection of telemetry data but also for remotely sending commands to the robots in an easy and efficient way.

![Description of the image]({{ site.baseurl }}/images/avatarion/architecture.jpg)

## Technical delivery ##

### Security details

Although telemetry data is not considered to be super sensitive, we still wanted to avoid any unauthorized access to the data. In contrast, messages sent from the cloud to the robots are sensitive and therefore must be secured in order to avoid any possible robot hijacking. IoT Hub provides all required security mechanisms to allow safe and easy-to-implement bidirectional communication between the cloud and the connected devices.

Robots are being deployed within corporate networks that are usually protected with a firewall, so in order to communicate with the robots from the cloud and back, the HTTP protocol has been used. In this solution we make use of HTTPS-encrypted endpoints provided by IoT Hub.

The key security requirement consists of making sure that robots receive messages only from Avatarion IoT hub instances and that these messages are addressed to them. In order to accomplish this, we rely on the authentication and authorization mechanism offered by IoT Hub, which is implemented in the following way: A unique primary key is issued to every robot. This key is securely stored within the robot and used to generate SAS tokens, which are used for every communication between the robot and the IoT hub. This ensures that the robot is the only recipient of the addressed message and, together with the unique URL and the HTTPS endpoint of IoT hub, that nobody can send malicious messages. This solution also allows IoT hub to uniquely identify the specific robot sending the telemetry message.

*Sending a message to the robot through Device Explorer*

![Description of the image]({{ site.baseurl }}/images/avatarion/sending.png)

### Device used 

**Nao**

![Description of the image]({{ site.baseurl }}/images/avatarion/nao.jpg)

Nao is small with pleasantly rounded features. It is friendly, cute, 58 centimeters tall, and can help with the development and progress of science and technology education. From primary school and special education to research, Nao assists school children, university students, and researchers.

Nao has numerous sensors in its robotic head, hands, and feet, as well as its sonars, enable it to perceive its environment and get its bearings. With its four directional microphones and loudspeakers, Nao interacts with humans in a completely natural manner by listening and speaking. Nao is also equipped with two cameras that film its environment in high resolution, helping it to recognize shapes and objects.

**Pepper**

![Description of the image]({{ site.baseurl }}/images/avatarion/pepper.jpg)

Pepper is the first personal and emotional humanoid robot designed by SoftBank Robotics that is capable of recognizing principal human emotions and adapting its behavior to the mood of its interlocutor. Pepper is a social robot able to converse, recognize faces and react to emotions, and move autonomously.

Pepper is equipped with numerous sensors: two ultrasound transmitters and receivers, six laser sensors, and three obstacle detectors placed in its legs. These sensors provide it with information about the distance of nearby objects (a range of 3 meters), in addition to its three cameras (two RGB cameras and one 3D camera placed in its head). Another sensor within the battery indicates its level of charge as well as its temperature. Pepper also has tactile sensors in its hands, which are used when it plays games or interacts socially.

Both robots are based on the same OS (NAOqi), which is a Linux derivative; they provide Wi-Fi connectivity, which makes it possible to use Python code to send messages directly from the robot to the cloud. In addition, the robots are equipped with tablets and mobile phones and a custom companion application provides additional services to the robot and the user. In our case, these applications are built using Xamarin. 

### Device messages sent

For the data ingestion, we decided to use Azure IoT Hub, a perfect fit for our needs. In fact, the secure bidirectional communication is key to our implementation. Additionally, the easy configuration and maintenance are important aspects for such a solution. Only a platform as a service (PaaS) IoT solution such as Azure IoT Hub allows us to save precious resources. No more time is wasted in setting up web endpoints, queues, and so on. Microsoft takes care of all the patching and finetuning of the various components, with no upfront hardware investments required. Having a global market means an all-day, every-day business.

IoT Hub allows us to easily decouple the message ingestion process from the storage and analysis one. This simplifies maintenance but also makes it possible to evolve the different components of the solution in an independent manner. Thanks to the IoT message retention functionality, we can make changes without interrupting the production environment or losing any messages.

*IoT Hub receiving the first messages*

![Description of the image]({{ site.baseurl }}/images/avatarion/iothub.png)

For the first implementation, we decided to use three different types of message. A first one containing error information will be sent by the robot every time an issue arises. 

Errors JSON message, in particular the joint status:

    09/02/2017 13:35:27> Device: [python-test-device], Data:[{"diagnosis": "[0L, ['HeadPitch', 'HeadYaw', 'LAnklePitch', 'LAnkleRoll', 'LElbowRoll', 'LElbowYaw', 'LHipPitch', 'LHipRoll', 'LHipYawPitch', 'LKneePitch', 'LShoulderPitch', 'LShoulderRoll', 'LWristYaw', 'RAnklePitch', 'RAnkleRoll', 'RElbowRoll', 'RElbowYaw', 'RHipPitch', 'RHipRoll', 'RKneePitch', 'RShoulderPitch', 'RShoulderRoll', 'RWristYaw']]", "msg_type": "error", "datetime": "2017-02-09T13:35:28.925774"}]
    09/02/2017 13:35:36> Device: [python-test-device], Data:[{"life_state": "disabled", "focused_activity": "", "msg_type": "state", "system_version": "2.1.4.13", "ip_address": "192.168.8.1", "battery_charging": false, "battery_charge": 88, "cpu": "25.7904", "wifi_name": "wifiname", "datetime": "2017-02-09T13:35:37.256762"}]

The second one, containing the status of the robot, is sent once every minute. This message contains information such as battery status, CPU usage, and activities currently being executed.

Telemetry JSON message:

    09/02/2017 13:35:18> Device: [python-test-device], Data:[{"life_state": "disabled", "focused_activity": "", "msg_type": "state", "system_version": "2.1.4.13", "ip_address": "192.168.8.1", "battery_charging": false, "battery_charge": 88, "cpu": "25.7645", "wifi_name": "wifiname", "datetime": "2017-02-09T13:35:19.369717"}]
    09/02/2017 13:35:22> Device: [python-test-device], Data:[{"life_state": "disabled", "focused_activity": "", "msg_type": "state", "system_version": "2.1.4.13", "ip_address": "192.168.8.1", "battery_charging": false, "battery_charge": 88, "cpu": "25.7723", "wifi_name": "wifiname", "datetime": "2017-02-09T13:35:23.499632"}]

The third message, which is generated by the companion mobile devices, contains the successful or failed user interaction. In this particular example, we have integrated QnA Maker to allow the robots to have a human-like conversation about the most frequently asked questions. In this message, we send the question, the suggested answer, and the score coming from the QnA Maker engine. This message is sent every time an interaction occurs.

Dialog message:

    09/02/2017 13:29:49> Device: [tablet], Data:[{"question":"What can you never eat for breakfast?","answer":"Dinner.","msg_type":"qna","score":1.0,"datetime":"2017-02-09T13:29:48.541994+01:00"}]
    09/02/2017 13:29:49> Device: [tablet], Data:[{"question":"How can you lift an elephant with one hand?","answer":"It is not a problem, since you will never find an elephant with one hand.","msg_type":"qna","score":1.0,"datetime":"2017-02-09T13:29:48.53919+01:00"}]
    09/02/2017 13:29:49> Device: [tablet], Data:[{"question":"If it took eight men ten hours to build a wall, how long would it take four men to build it?","answer":"No time at all it is already built.","msg_type":"qna","score":1.0,"datetime":"2017-02-09T13:29:46.503404+01:00"}]

There is also a message sent from a tool (such as the Device Explorer) to the robots, which contains a predefined command that the robot is able to execute. This allows us to execute remote troubleshooting and maintenance activities, such as changing parameters or issuing a reboot.

Command message, including the delivery notification:

    Sent to Device ID: [python-test-device], Message:"rest", message Id: 752b2aae-299f-4289-bf95-6fcc3d660a80
    Message Feedback status: "Success", Description: "Success", Original Message Id: 752b2aae-299f-4289-bf95-6fcc3d660a80

Considering that we do not have any control of the network and in particular of the firewall where the robots are located, we cannot use protocols such as MQTT or AMQP; instead, we need to use the HTTP polling mechanism offered by IoT Hub. The polling mechanism is not meant to be used by thousands of devices every minute because you would then incur the HTTP throttling protection limit from IoT Hub (current limit: 1,000 requests/min/unit). In our case, we don't expect to have thousands of robots, so we can easily use this polling mechanism each minute without issue.

To be able to receive multiple commands without waiting for the 1-minute polling interval, after the first message is received we change the polling interval on the robot from 1 minute to 5 seconds for the next 10 minutes.    

### SDKs used, languages, and more

The robots can be extended through Python. There is a Python SDK for Azure IoT but it requires installation of modules on the robot, which we want to avoid in order to keep a lean deployment. That's why we decided to use the IoT REST API directly from our Python solution. We have modified the available Microsoft sample by including the message-receiving function.

The following code contains all message-sending, message-receiving, and message-acknowledgment functions:

```python

    """
    Module Name:  d2cMsgSender.py
    Project:  IoTHubRestSample
    Copyright (c) Microsoft Corporation.
    
       
    This source is subject to the Microsoft Public License.
    See http://www.microsoft.com/en-us/openness/licenses.aspx#MPL
    All other rights reserved.
    
    THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, 
    EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED 
    WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
    """
    
    import base64
    import hmac
    import hashlib
    import time
    import requests
    import urllib
    
    class D2CMsgSender:
    
    API_VERSION = '2016-02-03'
    TOKEN_VALID_SECS = 10
    TOKEN_FORMAT = 'SharedAccessSignature sig=%s&se=%s&sr=%s'
    
    def __init__(self, connectionString=None):
        if connectionString != None:
            iotHost, keyName, keyValue = [sub[sub.index('=') + 1:] for sub in connectionString.split(";")]
            self.iotHost = iotHost
            self.keyName = keyName
            self.keyValue = keyValue
            
    def _buildExpiryOn(self):
        return '%d' % (time.time() + self.TOKEN_VALID_SECS)
    
    def _buildIoTHubSasToken(self, deviceId):
        resourceUri = '%s/devices/%s' % (self.iotHost, deviceId)
        targetUri = resourceUri.lower()
        expiryTime = self._buildExpiryOn()
        toSign = '%s\n%s' % (targetUri, expiryTime)
        key = base64.b64decode(self.keyValue.encode('utf-8'))
        signature = urllib.quote(
            base64.b64encode(
                hmac.HMAC(key, toSign.encode('utf-8'), hashlib.sha256).digest()
            )
        ).replace('/', '%2F')
        return self.TOKEN_FORMAT % (signature, expiryTime, targetUri)
    
    def sendD2CMsg(self, deviceId, message):
        sasToken = self._buildIoTHubSasToken(deviceId)
        global log
        log.info("SAS TOKEN " + str(sasToken))
        url = 'https://%s/devices/%s/messages/events?api-version=%s' % (self.iotHost, deviceId, self.API_VERSION)
        r = requests.post(url, headers={'Authorization': sasToken}, data=message)
        return r.text, r.status_code
        
    def getD2CMsg(self, deviceId):
        sasToken = self._buildIoTHubSasToken(deviceId)
        url = 'https://%s/devices/%s/messages/devicebound?api-version=%s' % (self.iotHost, deviceId, self.API_VERSION)
        r = requests.get(url, headers={'Authorization': sasToken})
        #return r.text, r.status_code
        return r
        
    def completeD2CMsg(self, etag):
        sasToken = self._buildIoTHubSasToken(deviceId)
        url = 'https://%s/devices/%s/messages/devicebound/%s?api-version=%s' % (self.iotHost, deviceId, etag, self.API_VERSION)
        global log
        log.info(url)
        r = requests.delete(url, headers={'Authorization': sasToken})
        return r
        
    def rejectD2CMsg(self, etag):
        sasToken = self._buildIoTHubSasToken(deviceId)
        url = 'https://%s/devices/%s/messages/devicebound/%s?reject&api-version=%s' % (self.iotHost, deviceId, etag, self.API_VERSION)
        global log
        log.info(url)
        r = requests.delete(url, headers={'Authorization': sasToken})
        return r

    d2cMsgSender = None
 
    connectionString = "HostName=xxxxxxx.azure-devices.net;DeviceId=python-test-device;SharedAccessKey=xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    deviceId = 'python-test-device'
    log = None
    
    def init(logger):
    global d2cMsgSender
    global log
    d2cMsgSender = D2CMsgSender(connectionString)
    log = logger
    #print d2cMsgSender.getD2CMsg(deviceId)
    
    def send(message):
    return d2cMsgSender.sendD2CMsg(deviceId, message)
    
    def get():
    return d2cMsgSender.getD2CMsg(deviceId)
    
    def complete(etag):
    return d2cMsgSender.completeD2CMsg(etag)
    
    def reject(etag):
    return d2cMsgSender.rejectD2CMsg(etag)

```
For the Xamarin code that runs on the tablet, we simply use the wizard provided by Visual Studio ("Add Connected Services" feature), which adds all the required libraries and generates the code construct needed to interact with IoT Hub.

This is the modified code generated by the wizard:

```cs

    using System;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.Azure.Devices.Client;
    using IotTest;
    
    static class AzureIoTHub
    {
       
	    const string deviceConnectionString = "HostName=xxxxx.azure-devices.net;DeviceId=tablet;SharedAccessKey=xxxxxxxxxxxxxxxxxxxxxxxxx";
	        
	    public static async Task SendDeviceToCloudMessageAsync(IotPayload pl)
	    {
		    var deviceClient = DeviceClient.CreateFromConnectionString(deviceConnectionString, TransportType.Http1);
		    
		    var str = Newtonsoft.Json.JsonConvert.SerializeObject(pl);
		    var message = new Message(Encoding.ASCII.GetBytes(str));
		    
		    await deviceClient.SendEventAsync(message);
	    }
    
    
    }

	public class IotPayload
	{
		public String question { get; set; }
		public String answer{ get; set; }
		public String msg_type { get; set; }
		public double score{ get; set; }
		public DateTime datetime { get; set; }
	}
```

We decided to use Azure Stream Analytics to quickly parse the JSON messages and persist them to multiple SQL Database tables. This allows us to easily evolve the schema and the message process. Additionally, Stream Analytics will allow us to detect anomalies in near real time that are related to repeated robot movements that can lead to motor overheating. Implementing this in Stream Analytics is very easy; you can make use of Tumbling Windows functionality within the query.

*Stream Analytics in use*

![Description of the image]({{ site.baseurl }}/images/avatarion/stream.png)

In the following example, you can see how we extract the device ID from the additional payload retrieved from the IoT Hub message and how we determine the message type:

    SELECT
    IoTHub.ConnectionDeviceId as device_id,
    ip_address,
    datetime,
    life_state,
    focused_activity,
    system_version,
    battery_charging,
    battery_charge,
    CAST(cpu as bigint) as cpu,
    wifi_name
    INTO
    [RobotStatus]
    FROM
    [RobotIOTHub]
    WHERE msg_type = 'state';
    
    SELECT
    IoTHub.ConnectionDeviceId as device_id,
    diagnosis,
    datetime
    INTO
    [RobotError]
    FROM
    [RobotIOTHub]
    WHERE msg_type = 'error';
    
    SELECT
    IoTHub.ConnectionDeviceId as device_id,
    question,
    answer,
    score,
    datetime
    INTO
    [RobotQNA]
    FROM
    [RobotIOTHub]
    WHERE msg_type = 'qna';

To quickly generate reports for Avatarion and the customers, we decided to employ Power BI. Thanks to this easy-to-use tool, we can generate comprehensive interactive dashboards showing the key vital data of the robots. Through the "Publish to Web" feature we are also able to easily integrate this dashboard within customers' portals.

![Description of the image]({{ site.baseurl }}/images/avatarion/final.png)

## Learnings from the Microsoft and customer team

Thanks to the REST API, it's pretty easy to use IoT Hub from any platform. We really wanted to avoid installing or compiling any additional modules. Using REST API from Python proved to be an easy task, especially for sending messages. Instead, receiving messages has been a bit more complicated because of the way the message retrieval pattern is implemented. We had to implement the message retrieval but also the complete/reject/abandon acknowledgment. 

One point that has to be implemented is the message lock ID (represented by an etag header of the message retrieved) that needs to be sent on the complete/reject/abandon acknowledgment request, as documented in the blog post [Complete/Reject/Abandon – Part 2 of MKR1000 Azure IoT Hub Interface Using HTTP](http://mohanp.com/complete-reject-abandon-mkr1000-azure-iot-hub-how-to-part2/). 

The following shows the Python code being transmitted to the robot:

![Description of the image]({{ site.baseurl }}/images/avatarion/robotsdk.png)

## Conclusion ##

In this three-day hackfest, we set the foundation through a proof of concept that covers data injection, secure bidirectional communication, data persistence, and analysis. This base represents the pillars on which additional required functionality can be built. This solution can easily be extended to accept new message types and implement further monitoring and statistical functionality.

IoT Hub proved to be an extremely easy-to-use technology that allowed us to create scalable and secure bidirectional communication between robots and the cloud, all without requiring a huge investment in terms of coding, hardware, and software. The low maintenance of this PaaS solution was also a key deciding factor in the choice of technology.

Avatarion is now able to constantly monitor its deployed robots, acquire essential information about their daily usage, and at the same time remotely control them in case troubleshooting or normal maintenance is needed.

The powerful combination of IoT Hub, Stream Analytics, SQL Database, and Power BI enables Avatarion to save a lot of time and money and help keep the rapidly expanding fleet of robots up and running. It also allows customers such as hospitals to keep an eye on the usage of these humanoids that help sick children maintain contact with school and their families.

## Opportunities going forward

The robots are running many hours a day and therefore they are prone to hardware issues—motor overheating, in particular. This is where the acquired data can be used to feed a machine learning model that can predict required maintenance and therefore avoid possible hardware failure.

This is a first draft of a possible machine learning model:

![Description of the image]({{ site.baseurl }}/images/avatarion/ml.png) 

During the hackfest, we explored the possibility of increasing the robot functionality through Cognitive Services, Language Understanding, and BOTs. For example, in the case of a robot being used for retail scenarios, the humanoid needs to be able to answer typical frequently asked questions. Using the robot speech-to-text and text-to-speech, we were able to capture the end-user questions running through QnA Maker to get the possible best answers.

*QnA Maker loaded with FAQ jokes*

![Description of the image]({{ site.baseurl }}/images/avatarion/qna.png)

Here is a first example of a call to QnA Maker:

```cs
	protected async Task<QnAMakerResult> PostQNAQueryAsync(string customerquery)
	{
		string responseString;
		var query = customerquery; //User Query
		var knowledgebaseId = "xxxxxxxxxxxxxx"; // Use knowledge base id created.
		var qnamakerSubscriptionKey = "xxxxxxxxxxxxxxxxxxxxxxxxxx"; //Use subscription key assigned to you.
																	 
		Uri qnamakerUriBase = new Uri("https://westus.api.cognitive.microsoft.com/qnamaker/v1.0");
		var builder = new UriBuilder($"{qnamakerUriBase}/knowledgebases/{knowledgebaseId}/generateAnswer");
		//Add the question as part of the body
		var postBody = $"{% raw %}{{\"question\": \"{query}\"}}{% endraw %}";
		//Set the encoding to UTF8
		var content = new StringContent(postBody, Encoding.UTF8, "application/json");		
		//Send the POST request
		HttpClient client = new HttpClient();
		client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", qnamakerSubscriptionKey);
		HttpResponseMessage response = await client.PostAsync(builder.ToString(), content);
		if(response.IsSuccessStatusCode)
		{
			responseString = await response.Content.ReadAsStringAsync();
			return JsonConvert.DeserializeObject<QnAMakerResult>(responseString);
		}
		return null;
	}
```

This is just the beginning. Using Language Understanding Intelligent Service (LUIS) would make it possible to improve the dialog functionality of the robot even more. Additionally, features such as speaker recognition, sentiment analysis, facial recognition, and emotion detection could take the robots' capabilities to the next level.

## Additional resources

- Get hands-on with [Azure IoT Hub tutorials](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-get-started)
- Find IoT devices and starter kits: [Azure IoT device catalog](https://catalog.azureiotsuite.com/kits?wt.mc_id=dx_883177)
- Try any Azure services for free: [Create your free Azure account today](https://azure.microsoft.com/en-us/free/?wt.mc_id=dx_883176)
- Check out a curated collection of IoT learning resources: [Microsoft Technical Community Content](https://github.com/Microsoft/TechnicalCommunityContent/tree/master/IoT?wt.mc_id=dx_883175) on GitHub
- Read more IoT-focused [technical case studies](https://microsoft.github.io/techcasestudies/#technology=IoT&sortBy=featured?wt.mc_id=dx_883178) (like this one)
