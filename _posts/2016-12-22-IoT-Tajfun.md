---
layout: post
title:  "Tajfun uses Azure IoT services to enhance its forestry products business"
author: "Bojan Vrhovnik"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/BojanVrhovnik.jpg"
date:   2017-03-08
categories: IoT
color: "blue"
#image: "{{ site.baseurl }}/images/tajfun-logo.png" #should be ~350px tall
excerpt: Microsoft worked with Tajfun in Slovenia to develop a multitenant Azure-based solution for its machines that can help lumberjacks and forest owners increase productivity and returns while reducing maintenance and operations costs.  
verticals: Forestry
language: English
---

Microsoft joined forestry products company Tajfun in Slovenia to develop a multitenant solution that can help lumberjacks and forest owners improve their productivity, seasonality, and expenses with its line of products. By optimizing its machines, sensors, and client applications, customers can also cut maintenance and operations costs and increase their returns.

**Project team**

- Bojan Vrhovnik – Technical Evangelist, Microsoft MCE 
- Martin Pregl – Technical Evangelist, Microsoft MCE 
- Matej Petek – Development Lead, Tajfun
- Boštjan Tovornik – IT Administrator, Tajfun
- Srečko Pertinač – IT Administrator, Tajfun
- Matej Makuc – Developer, Tajfun
- Mitja Gliha – Developer, Tajfun

*[RCA machine](http://www.tajfun.com/rca/index.html)* 

![RCA product]({{ site.baseurl }}/images/tajfun-rca.jpg)


## Company profile ##

[Tajfun d.o.o.](http://www.tajfun.com) is a hardware company that specializes in forestry industry products. It is well known for its innovation in making the best hardware possible to get the most out of harvested lumber and provide timber workers with a productivity boost. Integrating different sensors into its product line and giving access via smart applications and web interfaces are enabling quicker adoption by workers and forest owners, allowing them to see and control their financial returns in near-real time, based on market prices. 

## Business requirement ##

Tajfun's industry machine for cutting wood has many sensors that enable users to control the output, shape, humidity, and progress. The machine's hardware joystick and LCD screen are the only way in which timber workers can control the basic information and act on changes or problems. Communication with the owner is by paper, phone or email, which can cause delays, inaccuracy, additional expenses, and even fraud if the device is loaned to someone else, a violation of the agreement with the agent or Tajfun. 

The idea was to leverage all of the information from the sensors to get more relevant data, provide services and alerts to the owners based on the incoming structure, and improve the stability and maintainability of the devices. As an additional benefit, Tajfun would like to provide and enable better integration and control of the financial aspect of the solution for its customers in their own tools and products, in essence creating an enterprise resource planning (ERP) system for lumberjacks.

**Preparing for the engagement**

Due to the landscape diversity and partner ecosystem, the need to scale out to broader audiences and more countries, and to support a quicker adoption rate and control usage, Tajfun decided to leverage Microsoft Azure to be more agile.

We divided the engagement into three parts:

1. **Envisioning session.** We sat down with marketing, product managers, CEO, sales, developers, architects, post-sales, and support personnel to identify the required features of the end solutions and to get insights into technical limitations. The result was three main objectives and core features of the application:
  - *Data collection and processing.* The IoT solution, where we gather data from the devices and process it to provide relevant information to the end customer.
  - *ERP system for lumberjacks.* End users will manage, analyze, and see the profitability of their machines.
  - *Central management system.* For devices with integration to the company's back-end system.
2. **Architecture session.** Based on the envisioning session, we decided on the main features for the solution and how to get there.
3. **Co-coding session.** We prepared a starting solution and initial demo for the agreed-on architecture and discussed how to apply this demo into their environment. Then we coded together to create a first prototype for sending and receiving data.

## Architecture session

We began by focusing on the initial problem of getting data from the device and providing meaningful output in combination with the required output.

**Solution requirements**

Based on their requirements, we started with the initial setup. We had a device that can either stand alone (with a SIM card) or be a gateway device, supporting more devices communicating with one gateway. (An example of this would be more [RCA](http://www.tajfun.com/rca/index.html "RCA Machine") devices in the forest, communicating with a server on the worker's machine—only this device has a SIM card; the others are connected via Bluetooth or integrated Wi-Fi to the gateway endpoint.) Communication can be always or partially connected. The device itself has an option to store status information about the device and automatically sync to the cloud, when a connection is established.

The device is combined from the main part (which is the [machine itself](http://www.tajfun.com/rca/index.html)) and custom-built microcontrollers, connected to the device via a serial port. Besides other custom-made connected modules, it also contains a [GPRS](https://en.wikipedia.org/wiki/General_Packet_Radio_Service "GPRS") module to establish a secure SSL connection directly to the [Azure IoT Hub](https://azure.microsoft.com/en-gb/services/iot-hub/ "Azure IoT Hub"). It also enables sending data directly to the cloud via HTTPS. Authentication is done via [REST interface](https://docs.microsoft.com/en-us/rest/api/iothub/?redirectedfrom=MSDN "REST interface") to [Azure IoT Hub](https://azure.microsoft.com/en-gb/services/iot-hub/ "Azure IoT Hub") with a device identity symmetric key. 

Access to the microcontrollers is physically protected and sealed. They can be set or replaced only if deactivated via a control dashboard on the machine with generated custom code. Only an approved technician can perform maintenance on the device itself. 

**Customer workflow**

This device sends data every few seconds or milliseconds, based on the initial setup, to the server. This data is in raw or JSON format (no more than 300 KB) and it issues a call to the server. The server picks up the data, cleans it, and performs actions based on the received information. 

It needs to store data and request information (due to legal requirements and traceability). It also needs a way to provide real-time information about current machine status and the ability to modify incoming messages to provide meaningful output (for example, different charts, search, and so on). Due to different clients and access modifications, we need an option for on-premises connection to deal with data and get the information from integrated systems in the companies.

**Setting up the architecture**

Based on the requirements, we prepared an outline architecture.

*Architecture proposal*

![architecture proposal]({{ site.baseurl }}/images/tajfun-arch1.png)


Its main components are:

- **Microsoft Azure IoT Hub.** For registering and maintaining the devices. The device comes from the factory and is registered via a web interface to the IoT hub. The IoT hub also enables them to communicate to the device and send information from the device.
- **Azure Stream Analytics.** Devices send data to the event hub. Due to the diversity of the data, we need to transform it to different formats and save it to specific datasources (Azure Table storage for log, SQL for showing it on the web and through the Web API, Microsoft Power BI to transform the data and show different reports for end customers).
- **Azure Functions.** For background processing of the data and sending push notifications or emails to the clients based on predefined alerts in the database.
- **Azure Content Delivery Network.** Access to edge server for content to be served to different geo requirements.
- **Azure Redis Cache.** In case of accessing it via a mobile interface to provide accessible data to customers as quickly as possible.

After discussing the infrastructure and services of their solution, we acknowledged issues with the current architecture due to changes in the whole process.

*Architecture discussion*

![architecture discussion]({{ site.baseurl }}/images/tajfun-arch-discussion.png)


After reviewing the architecture with demos and their solution, we found we needed an additional layer of complexity due to requirements based on the provided data. A requirement was for data to be handled by their own function to transform it from a binary format to text and vice versa due to minimized costs because of different geographical locations. The devices transmit data via SIM cards and the company pays for the SIM costs. The customer in this case buys the devices and, with a subscription, gets all the functionality for free.

*Agreed-on architecture*

![architecture agreement]({{ site.baseurl }}/images/tajfun-arch2.png)


Since they also want to include integration with their own company, we added an option via secure VPN to access their on-premises services and we predicted machine learning as an option for future upgrades, where they will leverage machine learning to detect fraud and predict maintainability of the RCA devices.

As an output, we gathered all the tasks for the back end, web interface, and data transformation as part of our engagement in the Kanban system.

*Kanban outcome*

![Kanban outcome]({{ site.baseurl }}/images/tajfun-kanban.png)


## Co-coding session ##

Based on the Kanban board, we got together and prepared an outline based on the provided architecture. Azure IoT Hub has proven to be very effective, covering every aspect of their requirements.

*Preparing the solution based on the architecture*

![Preparing solution based on architecture]({{ site.baseurl }}/images/tajfun-coding1.png)


![Iot hub]({{ site.baseurl }}/images/tajfun-coding2.png)


We did an example of sending and receiving data for their data structure as a showcase to confirm the architecture and for them to test their requirements. 

*Discussing data*

![discussing data]({{ site.baseurl }}/images/tajfun-coding3.png)


Data, which was sent to the [Azure IoT hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-what-is-iot-hub "Azure IoT Hub Docs"), contained information about the device such as **system pressure**, **splitting cylinder pressure**, **saw pressure**, **oil temperature**, **log length**, **log diameter**, **total quantity**, **current log production**, **maximum pull force**, **shaft turns**, **total working hours**, **interval working hours**, and **correction factor**. Based on their business requirements and transport choice (SIM cards), the maximum size of the package was around 300 KB.

Sample JSON payload:

    {
    "SystemPressure":0,
    "SplittingCilinderPressure":0
    "SawPressure":0,
    "OilTemperature":0,
    "LogLength":0,
    "LogDiameter":0,
    "TotalQuantity":0,
    "CurrentQuantity":0,
    "CurrentLogProduction":0,
    "MaksimumPullForce":0,
    "ShaftTurns":0,
    "TotalWorkingHours":0,
    "IntervalWorkingHours":0,
    "CorrectionFactor":0
    }


[Get the sample code for sending (and receiving) data to the Azure IoT hub here.](https://github.com/bojanv/tajgosimulatorsample "Sample for Tajgo Data Sender")

Essential data is needed to enable users to quickly see what is happening with the device.

*Sending data to the Azure IoT hub*

![sending data]({{ site.baseurl }}/images/tajfun-coding4.png)


Since the device can be offline (no signal in the forest), there is an offline storage on the device to enable it to store vital history information for a few days. If for some reason a connection is not established within that time, a maintenance team can inspect the logs with a simple press of a button on the LED display. When the device connects to the Internet via SIM, a secure connection is established to the cloud (SSL) and it communicates via HTTPS, authenticated via header ([JWT](https://en.wikipedia.org/wiki/JSON_Web_Token "JSON Web Token") token support). The token contains all required claims in order to set the device and for the device to perform *read only* operations (cannot perform operations—that can be hazardous for the user or the device). Based on the settings, the device sends information about the status every 1-5 seconds or less, if in maintenance mode.

*Receiving data from the cloud*

![receiving data]({{ site.baseurl }}/images/tajfun-coding5.png)


**Result**

The result was data in the Azure SQL database, where Stream Analytics kicked in and performed additional data management on the provided models as input.

*Data and Stream Analytics*

![data]({{ site.baseurl }}/images/tajfun-coding6.png)


Sending/receiving data was simulated from the command line in order to be used on the prototype device. 

[The code sample with instructions is available here.](https://github.com/bojanv/tajgosimulatorsample "Azure IoT Hub Sample")

![stream analytics]({{ site.baseurl }}/images/tajfun-coding7.png)


Working together with the developers enabled us to pull together the needed queries to perform data management in their environment, and then to perform the required actions on incoming data.

    with Data AS (
    	SELECT  deviceId as RcaId,
    		sum(Value) as Value,
    		System.TimeStamp as EnteredDate,
    		typeId as RcaPropertyId,
    		"" as Location
    	FROM
    		tajfuniothub
    	GROUP BY
    		deviceId,
    		typeId,
    		ThumblingWindow(second,2)
    )
    
    SELECT
    	RcaId,
    	Value,
    	EnteredDate,
    	Location,
    	RcaPropertyId
    INTO
    	tajfundb
    FROM
    	Data
    
    SELECT
    	RcaId,
    	Value,
    	EnteredDate,
    	Location,
    	RcaPropertyId
    INTO
    	tajfunstorage
    FROM
    	Data

That said, we performed queries on submitted data from the IoT hub to enable data to be translated to the appropriate storage. The first query enabled us to get the required information about the device and data from that device in a 2-second (2s) time window and grouped in the data collection. Data was saved to [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/ "Azure SQL Service"). 

The structure of the database is as follows:

![database structure]({{ site.baseurl }}/images/tajfun-sql9.jpg)


[Find the query to create tables here.](https://1drv.ms/u/s!At3HFvGXo562q4skM9Si7SrISHFwtw "Database Query") (Other non-relevant tables are omitted for clarity.)

Because we needed to have a flow of every request and all data due to legal requirements, we also saved all the information and data directly to [Azure Table storage](https://docs.microsoft.com/en-us/azure/storage/storage-dotnet-how-to-use-tables "Azure Table Storage") due to its cost-effectiveness and fast data access for the future use. We prepared the Power BI output (we connected the Power BI service with Stream Analytics—[find more information on how to do that here](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-power-bi-dashboard "SA and PowerBI")), but we didn't have time to use it in the application. Due to different business requirements, Power BI will be included in future releases.

The result was a working prototype in Azure for their environment as a starting point for continued development. Based on the envisioning session and co-coding session, we acknowledged additional blockers for their team to address, especially with correct formats to send data in raw format from the device to the cloud. 

## Conclusion ##

In this project, we did the data gathering in a secure, reliable, and scalable way with powerful services in the cloud, eliminating time to get started with a complex structure. Leveraging the cloud, SQL, queues, and IoT Hub provided Tajfun with a quick and reliable solution as a foundation on which to build additional services for its customers. After defining the whole infrastructure based on input, and sending data from the whole pipeline (device – Azure - client), we set a starting point for a great product in the future.

Tajfun is currently in the development phase and will launch its new product line in June 2017. In late February 2017, Tajfun plans to test out the solution in the field with one of its biggest customers to get feedback and act accordingly. After production, Tajfun will expand and leverage Azure for other hardware devices in its portfolio to power its productivity and give it an advantage in the forestry industry as an innovative leader.

[Matej Petek](mailto:matej.petek@tajfun.com "Matej Petek"), head of development at Tajfun, said:
> 
> "We really like IoT Hub because it was easy to learn and we were able to send the first messages to the Azure cloud in no time. Because we built our own low-level IoT device and none of many existing SDKs was suitable, we were still able to send messages through REST API reliable and securely. 
> 
> "When starting a new project, it is really good to know one will not need to care about system performance while the business is growing; therefore, in the developing phase, one can really focus on programming and not on hardware. 
> 
> "Managing and adding new devices is a really straight-through process as well, so even users without programming experience can add new devices."

With a simple interface, Azure power behind the scenes, automatic workflow, business integration, and a powerful data-digesting engine, they can be innovative, productive, and first choice for the forestry industry worldwide.

