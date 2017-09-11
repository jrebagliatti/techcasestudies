---
layout: post
title: "Emirates Air Line cable car instrumentation with Microsoft Partner TBS Mobility"
author: "Paul Foster"
author-link: "https://twitter.com/paulfo"
#author-image: "{{ site.baseurl }}/images/emiratesairline/authors/photo.jpg"
date: 2017-05-16
categories: [IoT]
color: "blue"
image: "images/emiratesairline/feat_adafruitfeatherlorawiringfix.png"
excerpt: The Emirates Air Line cable car is a 1.5-km crossing of the Thames in London, with 32 cabins bridging the North Greenwich peninsula and Royal Victoria docks. The challenge is to provide instrumentation of the cabin conditions during the crossing, and Wi-Fi across the width of the crossing and within the two stations.
language: [English]
verticals: [Facility Management]
geolocation: [Europe]
---

The Emirates Air Line cable car is a 1.5-km crossing of the Thames in London, with 32 cabins bridging the North Greenwich peninsula and Royal Victoria docks. The owners, Transport for London, and the operators, Mace Macro, wish to explore the opportunities in instrumenting the stations and the cable car cabins to improve operational insight and capabilities. 

This project will provision two networks across the 1.5-km site: 

- A **moderate bandwidth network** providing Internet-connected Wi-Fi in the stations and across the crossing by using Microsoft Research's experimental TV White Spaces network technology.
- A **LoRaWAN network** to instrument both cable car stations and cable car cabins with long-life battery-powered temperature and humidity sensors.

The TV White Spaces network provides a moderate bandwidth, Internet-connected Wi-Fi service to which Smart CCTV (closed-circuit television) cameras can be directly connected to count pedestrians passing through the stations. TV White Spaces will provide free Wi-Fi to all cabins along the 1.5-km route, which will also be used to improve the infotainment application that runs in each of the cabins. Currently the ability to update the content of the infotainment application is limited by Wi-Fi bandwidth only being available within range of the North Greenwich station. The Quality of Service (QoS) of the network will be monitored by dedicated test devices reporting back to the solution's IoT Hub. 

The services delivered for this solution will form the key strategies for TBS Mobility's facilities management solution offerings.

### Key technologies used
- **Microsoft TV White Spaces network service**: an experimental network services backplane providing a backhaul to which Wi-Fi access points can be connected. The TV White Spaces network can cover the entire 1.5-km crossing from a single antenna, and provides up to 6 Mbps bandwidth. For more information, see [Microsoft White Spaces Database](http://whitespaces.microsoftspectrum.com/).
- **LoRaWAN network**: a low-bandwidth network to support long-life battery-powered sensors placed within cable car cabins and the stations to measure temperature and humidity. The LoRaWAN network will cover a 5-km radius from the North Greenwich station. For more information about this network, see [LoRa Alliance Technology](https://www.lora-alliance.org/What-Is-LoRa/Technology).
- **Sensors** 
	- **Smart CCTV sensor**: a generic IP camera connected to cloud analysis services to provide the selected style of computer vision analysis. Single or multiple analysis modules can be added to the processing pipeline to do many tasks from one video stream, such as counting pedestrians and identifying individuals. Traffic monitoring and automatic number plate recognition (ANPR) modules are also available.
	- **Temperature and humidity sensor**: long-life, battery-powered sensor based on the [MultiTech MultiConnect mDot](http://www.multitech.net/developer/products/multiconnect-dot-series/multiconnect-mdot/) development board, and for testing the [Adafruit Feather](https://learn.adafruit.com/adafruit-feather) M0 LoRa development board.
- **Network QoS Windows mobile devices**: server and client network test solutions deployed across two Windows mobile devices to capture the quality of the TV White Spaces network during the crossings operational day. One device will be installed at a station, while the second will travel the crossing mounted within a cabin.
- **Microsoft Azure technologies**: [Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/) as the data gathering conduit from both networks' devices. [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) and [Azure Storage](https://azure.microsoft.com/en-us/services/storage/?v=16.50) for the capture and processing of video frames from the Smart CCTV cameras. The Azure IoT Suite's remote monitoring solution will be customized during the hackfest to present the information. The final technology deployment will be made by using [Microsoft Power BI Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/) at a future point in time. 
- **Gateway and access points**. The LoRaWAN gateway, a [MultiConnect Conduit](http://www.multitech.net/developer/products/multiconnect-conduit-platform/) configured for direct IoT Hub connection by using [MQTT](http://mqtt.org/). A trial LoRaWAN gateway built by using a [Raspberry Pi](https://www.raspberrypi.org/) and [iC880a frequency concentrator board](https://wireless-solutions.de/products/long-range-radio/ic880a) connected to IoT Hub via the public [The Things Network (TTN)](https://www.thethingsnetwork.org/) by using C# bridge and MiFi bridge devices that are able to connect to the TV White Spaces backhaul and provide a localized Wi-Fi service.


### Core team
- [Paul Foster](https://twitter.com/paulfo) – Project Lead, Microsoft
- [Bianca Fortuna](https://twitter.com/furbi) – Software Development Engineer, Microsoft
- [Andrew Bennett](https://twitter.com/awbennett) – Software Development Engineer, Microsoft
- [David Gristwood](https://twitter.com/ScroffTheBad) – Software Development Engineer, Microsoft
- [Greg Rivington](https://twitter.com/gregrivo) – Software Development Engineer, TBS Mobility

## Customer profile
Three organizations were involved in the project:

- [Transport for London](https://tfl.gov.uk/) is the integrated transport authority responsible for delivering the strategy and transport commitments for the Mayor of London, Sadiq Khan. They run the day-to-day operation of the capital's public transport network and manage London's main roads. 

- [Mace Macro](http://macemacro.com/projects/emirates-air-line-operation) of North Greenwich, London, provides facilities consultancy and facilities management. In 2012, Mace had already completed delivery of the Emirates Air Line, the UK’s first urban cable car. In its first major transport operations role, Macro was commissioned to assist with the final design, preparations, and operating procedures. Their scope of operations spanned FM and engineering management but also the day-to-day operations, including ticketing, incident management, and transport operations.
	  

- [TBS Mobility](http://www.tbsmobility.com/) has over 22 years of experience in the deployment of scalable, secure workforce solutions built by using their innovative, award winning TaskMaster Managed Mobility Platform. Businesses across the globe are using TaskMaster to manage tens of millions of transactions per month to ensure process compliance, optimize business efficiency, reduce operating costs, and improve their customers’ experience. This, coupled with investment through a continual and aggressive R&D program, makes TBS the ‘go to’ provider for those companies connecting the enterprise to their workforce. TBS is integrating the Internet of Things (IoT) to enable instrumented data to become a real-time part of the TaskMaster Managed Mobility Platform. TaskMaster supports mobile devices, wearables, and IoT Sensors as a means to automate informed field force operations at scale.

 
## Problem statement

The ability to connect both sides of the crossing and instrument the cable cars across the breadth of the crossing was prohibitively expensive at the time of construction. The availability of new low-cost, long-range radio network technologies such as LoRaWAN and TV White Spaces enables the instrumentation of the cable car stations and the cable car cabins economically from one location, across the breadth of the 1.5-km crossing. This enables improvements to customer services and experiences, operational insights, and commercial opportunities through the infotainment system.
 
*"By instrumenting the Emirates Air Line crossing, real-time smart services enable preventative and proactive maintenance based on usage, delivering operational efficiencies." — Steve Reynolds, CEO, TBS Mobility*

## Solution and steps
 
### Smart CCTV camera solution

Smart CCTV was the camera analysis component for the ingress, processing, and reporting of people count from a camera endpoint. The main goal was to implement a generic and scalable architecture for this module so that it can be easily integrated with the rest of the remote monitoring solution and easily extended with additional analytics capability. 

Multiple architectures were explored including putting camera frames into an Azure queue that can be processed by an Azure WebJob. The issue with this approach was that an Azure queue cannot hold images/emiratesairline. You can see the final architecture/workflow in the following diagram: a frame is put into Azure Blob storage, which triggers Azure Functions. The function calls the image processing API, which returns the number of people in the image and outputs this into Azure Event Hubs. An Azure Stream Analytics job processes the incoming data from Event Hubs and outputs the results into Azure Table storage. 

![IoT Architecture Diagram]({{ site.baseurl }}/images/emiratesairline/smartcctvarchitecture.png)

<br/>

The flexibility of this architecture is that both Azure Functions and Stream Analytics can read data from and output the results of the image processing into a variety of sources such as Azure Blob storage and Azure Event Hubs. This simplifies the integration of this module into the rest of the system. 

#### API app

The image processing API is based on [EmguCV](http://www.emgu.com/wiki/index.php/Main_Page ), a .NET wrapper of the [OpenCV image processing library](http://opencv.org/). To count people in an image, we used the [FindPedestrian class written by the Emgu foundation](http://www.emgu.com/wiki/index.php/Pedestrian_Detection_in_CSharp). 

Two different APIs were created for the people detection analysis, one that requires the URL of the image, and a second one that accepts an image being uploaded in the body of the HTTP request as base64. These image processing APIs were published as API apps (using the API Apps feature of Azure App Service). 

For the code for the API implementation, see [People Detection API App](https://github.com/dxuk/SmartIoTSensorProject/tree/master/DevelopmentBranch/AnalyticsAPIs/PeopleDetectionAPIApp). 

#### Azure Functions

Azure Functions was used to call the image processing API every time a new image was added to Blob storage. After the API returned the number of people in the image, this information was sent to Azure Event Hubs. For the code for the Azure function, see [ImageProc/run.csx](https://github.com/dxuk/SmartIoTSensorProject/blob/master/DevelopmentBranch/AzureFunctions/ImageProc/run.csx). 

```
        using System;
        using System.Text;
        using System.Net.Http;
        using System.Net.Http.Headers;

        public static void Run(Stream myBlob, string name, out string outputEventHubMessage, TraceWriter log)
        {
            string uri = "http://[servicesURLhere].azurewebsites.net/api/detect";

            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri(uri);
                var fileStream = new StreamContent(myBlob);
                
                using (var content = new MultipartFormDataContent())
                {
                    //get response
                    fileStream.Headers.ContentType = MediaTypeHeaderValue.Parse("image/jpeg");
                    
                    content.Add(fileStream, "image", name);
                    
                    var response = httpClient.PostAsync(uri, content).Result;            
                    var responseString = response.Content.ReadAsStringAsync().Result;
                    log.Info(responseString);
                    
                    //write to output thumb
                    outputEventHubMessage = responseString;
                    
                }
            }
        }
```

<br/>

#### Azure Stream Analytics

Azure Stream Analytics was used to process the results of the people count algorithm that were sent to Azure Event Hubs. Rather than returning the number of people for each frame, the system should return the total number of people for an interval of time (for example, every 5 seconds). During this phase of the implementation, a simple sum was used to return the total number of people. 

The problem with this approach is that people could be counted multiple times because every frame is analyzed as a separate entity. A few ideas were explored such as detecting/predictive when people leave the frame by using the rectangles coordinates around the person returned by the `FindPedestrian` class. However, these were not implemented due to the short time frame.   

The query used in Stream Analytics is as follows.

```
SELECT
    'Station1' AS Station,
    'Camera1' AS CameraName,
    System.TimeStamp AS Time,
    SUM(counted) AS Counted
INTO
    Output
FROM
    Input
GROUP BY 
    TumblingWindow(s,5)
```

<br/>

### Smart CCTV device test solution

A Universal Windows Platform (UWP) app for the capture and frame streaming of the video camera input to the Smart CCTV service was created. This followed several investigations into alternative technologies:

- **Azure Media Services**. Although a working Media Services client and service were established on day one of the hackfest, consultation with the Media Services blackbelt team closed down this line of development because Media Services is not commercially suited to the surveillance tasks.

- **RTMP**. The current industry protocol for video streaming is the Real-Time Messaging Protocol (RTMP). An investigation was undertaken to find a suitable open source RTMP codebase from which to work. However, no suitable framework was found, so this line of development was stopped for the hackfest.

The UWP camera frame application showed that a Windows mobile device, self-powered and connected to the Wi-Fi service, could deliver a suitable frequency and quality of frames for processing by the Smart CCTV service. The application posted frames via HTTP to the Smart CCTV API or directly to Blob storage via the REST API to trigger the Smart CCTV [Azure Network Watcher](https://azure.microsoft.com/en-us/services/network-watcher/) function. For the UWP camera app, see [Camera Preview Frame Sample](https://github.com/dxuk/SmartIoTSensorProject/tree/master/DevelopmentBranch/CameraGetPreviewFrame).

### LoRaWAN network range and device development solution
    
With a delay in the purchasing of the MultiTech LoRaWAN equipment, an interim implementation was constructed that used readily available development boards.

#### LoRaWAN gateway construction

A LoRaWAN gateway was constructed based on the instructions offered by The Things Network (TTN). This uses an iC880A frequency concentrator board coupled with a Raspberry Pi via SPI. For the codebase, see [iC880A gateway](https://github.com/ttn-zh/ic880a-gateway/tree/spi). Assembly is easy, and after the installation is running, it automatically registers the device with TTN. From there it was easy to bridge the TTN application handler into Azure IoT Hub by using the [C# bridge](https://github.com/JeeWeetje/TtnAzureBridge), although the bridge had to be recently upgraded to match the new production TTN environment.

![Working on Raspberry Pi LoRaWAN gateway]({{ site.baseurl }}/images/emiratesairline/workingonhub.jpeg)

<br/>

The `MqttMsgPublishReceived` event handler code, which creates or validates the sending device and creates the IoT Hub message, is shown without error handling for simplicity in the following sample.

```
                var jsonText = Encoding.ASCII.GetString(e.Message);
                dynamic jsonMessage = JsonConvert.DeserializeObject(jsonText);
                // Get id of device
                var deviceId = (string)jsonMessage.dev_id; // dev_eui;
                // Create or get device
                var device = (Device)await AddDeviceAsync(deviceId);
                if (device.Status != DeviceStatus.Enabled)
                {
                    Console.WriteLine($"Device {deviceId} disabled");
                    return;
                }
                // extract data from json
                var deviceMessage = jsonMessage.payload_fields.ToString();
                var metaText = jsonMessage.metadata.ToString();
                var jsonMeta = JsonConvert.DeserializeObject(metaText);
                var time = jsonMeta.time.ToString();
                // construct message for IoT Hub
                dynamic iotHubMessage = JsonConvert.DeserializeObject(deviceMessage);
                iotHubMessage.deviceId = deviceId;
                iotHubMessage.time = time;
                string iotHubMessageString = JsonConvert.SerializeObject(iotHubMessage);
                Console.WriteLine($"IoT Hub message {iotHubMessageString}");
                // create device client
                var key = string.Empty;
                if (ConfigurationManager.AppSettings["DeviceKeyKind"] == "Primary")
                {
                    key = device.Authentication.SymmetricKey.PrimaryKey;
                }
                else
                {
                    key = device.Authentication.SymmetricKey.SecondaryKey;
                }
                var deviceClient = _deviceClientList.GetDeviceClient(deviceId, key);
                // send message
                var message = new Message(Encoding.UTF8.GetBytes(iotHubMessageString));
                await deviceClient.SendEventAsync(message);
                Console.WriteLine("IoT Hub message sent");
```

<br/>

#### LoRaWAN sensor construction

A sensor was constructed by using the Adafruit Feather M0 LoRa development board. The board required a circuit modification to support the [LoRaWAN protocol implementation](https://github.com/matthijskooijman/arduino-lmic). 

![Adafruit Feather M0 LoRa wiring fix for LoRaWAN]({{ site.baseurl }}/images/emiratesairline/adafruitfeatherlorawiringfix.png)

<br/>

![Adafruit LoRaWAN fix implementation]({{ site.baseurl }}/images/emiratesairline/featherwiring.jpg)

<br/>

The sketch was modified to provide a one-minute transmission frequency, the maximum duty cycle for the EU LoRa 863 – 870 MHz G1 channel. The device was coupled with an OLED feather to provide a display for test feedback, and powered by a 2200 mAh lithium battery, all mounted within an Otter waterproof container. This sensor was used during a site visit to the cable car to prove that the LoRaWAN network could provide unbroken connectivity during the crossing in both directions (see [the modified test sketch for use against The Things Network](https://github.com/dxuk/SmartIoTSensorProject/tree/master/DevelopmentBranch/LoRAWANSensor/ttn-otaa.ino)).

Range testing for the LoRaWAN gateway and sensor was conducted at the Microsoft campus. This proved the capability of the LoRaWAN within commercial offices, which is important to the TBS solution and generically within the facilities management industry. With the gateway operating from the second floor of Building 2, the sensor was walked around the campus, noting success of data transmission via a mobile phone reviewing the dataset received at the server and the sensor feedback on the OLED display.

![Microsoft Campus range testing results estimation]({{ site.baseurl }}/images/emiratesairline/rangetest.jpg)

<br/>

The results show that externally from the buildings, the range is terrific. Internally, the range covered three of the five Microsoft buildings but did not extend into Buildings 4 and 5. Building 1 is 20 meters from Building 2, Building 3 is 25 meters from Building 2, and Building 4 is 45 meters from Building 3. The road beyond the boundary of the campus, at the top of the eclipse is 250 meters from Building 2. Even with a duplicate gateway to cover these buildings, the LoRaWAN gateway to sensor ratio is significantly higher than that of the current TBS incumbent gateway/sensor hardware, which is based on Bluetooth Low Energy (BLE). LoRaWAN presents a significant improvement in capabilities for servicing the FM industry.

### TV White Spaces Quality of Service solution

The Microsoft Research team currently uses the iPerf network testing application to measure TV White Spaces network performance. The challenge was to make at least the server or client side of this solution self-contained so that it could be battery-powered and post the results to the common IoT Hub being used in the solution. It was also intended that the solution would receive cloud-to-device messages from the IoT Hub to enable configuration of the iPerf tests and frequency of testing. However, this task was not completed within the hackfest timeframe.

A UWP wrapper for the iPerf tool was located on GitHub, and this codebase was modified to post results into IoT Hub and to run on Windows mobile devices. The solution implementation places the server device within a cable car cabin roof and the client device within the North Greenwich station. In this way, the client device could be used manually to configure tests and observe results, while both client and server devices would publish the results automatically to the IoT Hub. Both devices utilized the TV White Spaces Wi-Fi service as their means to communicate with the IoT Hub. This presents a point of failure if the TV White Spaces network fails. Resolving of this issue by using persistent store and forward patterns in the solution was not completed within the timeframe of the hackfest. For the server/client code, see [UWP iPerf](https://github.com/dxuk/SmartIoTSensorProject/tree/master/DevelopmentBranch/UWPiPerf).

![UWP iPerf IoT Hub configuration]({{ site.baseurl }}/images/emiratesairline/iperfsetupiothub.jpg)

<br/>

### Remote monitoring solution

To simplify testing and progress of the project, a temporary customization of the IoT Suite remote monitoring solution was made to present both simulated and real datasets from the different sensors. The remote monitoring solution is more sophisticated than is required; in the final customer interface, it will be presented by using Power BI. For more information, see [Modification of the Microsoft Azure Remote Monitoring Solution for Emirates Air Line Cable Cars](https://github.com/GregRivo/emiratesairline/tree/develop).


## Technical delivery ##

Due to the delay in receiving the production hardware, the LoRaWAN implementation used was The Things Network (TTN). TTN can easily be spun up in a Docker container to provide a private IoT service that can then be bridged to IoT Hub. This architecture was used as a pragmatic solution to the delays in obtaining the solutions' real hardware caused by Microsoft's purchasing process.

### Security details

The LoRaWAN implementation utilizes AES 128-bit encryption of the sensor payload. The payload remains encrypted through the TTN network until it reaches the  application handler where the payload can be decrypted before being consumed by IoT Hub. In the test scenario, decrypting the payload in the handler enabled a full Azure Stream Analytics query capability to be used against the data for hot path processing.

### Device used

**IoT device information:** 

- The solution used a modified Adafruit Feather M0 LoRa board and alternatively, an Adafruit Feather 32u4 LoRa board for the test devices. Final device requirements and manufacturer have yet to be determined. 
- The M0 device has 32 KB of memory, 256 KB of flash storage, uses a 3.7 V lithium polymer battery for power, and runs the LMIC for LoRaWAN protocol implementation over the LoRa radio for connectivity. 
- It is programmed using the Arduino Sketch C language environment. 
- In the test scenario, the TTN system is bridged to IoT Hub using a C# console application that makes use of the MQTT client libraries and IoT Hub Device SDK to receive data payloads and transmit them into IoT Hub respectively.

### Device messages sent

The cable car has 32 active cabins. Initially, a single cabin will be instrumented with a test sensor while final selection of a sensor and manufacturer is completed. Using the LoRaWAN network means the solution has to regulate its transmission frequency to remain within 1% duty cycle. This equates to 30 seconds of transmission every hour, or one 0.5-second transmission every minute. Because the sensors are measuring temperature and humidity, the frequency of transmission can be a lot longer and will probably be every 15 minutes when deployed. The cable car typically operates for at least 7 hours each day, resulting in a message volume of 896 messages per day (32 x 7 x 4). In addition to this, the iPerf network tests will post messages every 15 minutes, bringing the daily message rate close to 900 messages per day. This volume is easily handled by a single IoT Hub S1 Unit.

### SDKs used

The [Azure IoT Hub Connected Service Visual Studio extension for C++ codebase](https://github.com/Azure/azure-iot-hub-vs-cs) was used to implement the connectivity in the UWP iPerf app.      

### Code artifacts

You can find the Smart CCTV, UWP iPerf, IoT Suite remote monitoring customization, and LoRaWAN sensor code at the [Smart IoT Sensor Project Development Branch](https://github.com/dxuk/SmartIoTSensorProject/tree/master/DevelopmentBranch).

### Pointers to references or documentation

- [Construction of the LoRaWAN Raspberry Pi gateway](https://github.com/ttn-zh/ic880a-gateway/tree/spi)
- [Modification and construction of LoRaWAN Adafruit Feather M0 sensor](https://www.thethingsnetwork.org/forum/t/adafruit-lora-feather-gateway/2440/46)

### Learnings from the Microsoft team and the customer team

- Azure Functions provides a simple integration and activation solution.
- The LoRaWAN technologies present an affordable long-range, low-bandwidth solution that requires further investigation for native IoT Hub integration. 
- The ratio of sensors to gateways is in the order of thousands to one, which factors better than current incumbent BLE hardware, where scattered deployments within commercial offices (such as toilets) mean a ratio of six to one is typical. 
- The remote monitoring IoT Suite solution is over-engineered compared to functionality now available in Power BI.
- Azure Media Services does not attempt to commercially support anything other than broadcast TV scale services. Third-party services such as [Wowza live streaming server](https://www.wowza.com/) present the lower-end service but with limited customization.
- Using UWP and C++ is still a highly productive development option.
 
## Conclusion ##

The solution is due for deployment at the Emirates Air Line Cable Car in March 2017. This is during a period of annual maintenance and will allow for the two networks, Smart CCTV cameras, and cabin sensors to be fitted. 

### Measurable impact/benefits resulting from the implementation of the solution

- The cost of the solution makes it an easy enabler for the Emirates Air Line.
- The simple and low-cost provision of network services to the crossing enables new commercial advertising opportunities within the infotainment system as well as customer service with free Wi-Fi.
- The real-time instrumentation provides accurate and timely operational information that will make maintenance and daily running of the crossing more efficient.

### General lessons

- The LoRaWAN range is huge, and the hardware construction is simple and easily achievable, making it a valuable part of the TBS Mobility IoT strategies for FM going forward.
- The world of RTMP is not well-supported, and direct engagement with IP camera manufacturers will be required to obtain quality commercial devices.
- In comparison to the alternatives, the complexity of the Azure IoT service offerings is significantly easier.

### Opportunities going forward

The structure of two overarching networks to provide moderate and low bandwidth service to low-power long-life devices (LoRaWAN sensors) and high-end edge intelligent devices (Smart CCTV, Echo Dot) provides a compelling strategy for enabling advanced digital transformation for the short term three-year service contracts typically found in the FM industry. 

By requiring only power and Internet connectivity to the TV White Spaces network, the two networks can activate large campus sites with the minimum of gateway and AP hardware, enabling new directions such as dynamic cleaning contracts based on usage rather than rota. This strategy is underpinning the TBS Mobility engagement going forward, and the demonstration and learnings from this project have provided the proof required. 

*"We rapidly built an end-to-end PoC bringing a variety of data into Azure via IoT Hub, enabling our established TaskMaster services to be easily integrated with the new IoT data." — Oliver Keyworth, Development Manager, TBS Mobility*

## Additional resources ##

Documentation
- [Open CV EMGU.Net Wrapper](http://www.emgu.com/wiki/index.php/Main_Page)
- [iPerf 3](https://iperf.fr/iperf-doc.php)

GitHub repos
- [Core solution](https://github.com/dxuk/SmartIoTSensorProject/tree/master/DevelopmentBranch)
- [Codebase for test sensor](https://github.com/matthijskooijman/arduino-lmic)
- [Codebase for IoT Hub integration to iPerf](https://github.com/Azure/azure-iot-hub-vs-cs)
- [Codebase and build instructions for LoRaWAN gateway](https://github.com/ttn-zh/ic880a-gateway/tree/spi)
- [Thread on conversion of Adafruit Feather M0 for LoRaWAN](https://www.thethingsnetwork.org/forum/t/adafruit-lora-feather-gateway/2440/46)

IoT resources
- Get hands-on with [Azure IoT Hub tutorials](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-get-started)
- Find IoT devices and starter kits: [Azure IoT device catalog](https://catalog.azureiotsuite.com/kits?wt.mc_id=dx_883177)
- Try any Azure services for free: [Create your free Azure account today](https://azure.microsoft.com/en-us/free/?wt.mc_id=dx_883176)
- Check out a curated collection of IoT learning resources: [Microsoft Technical Community Content](https://github.com/Microsoft/TechnicalCommunityContent/tree/master/IoT?wt.mc_id=dx_883175) on GitHub
- Read more IoT-focused [technical case studies](https://microsoft.github.io/techcasestudies/#technology=IoT&sortBy=featured?wt.mc_id=dx_883178) (like this one)
