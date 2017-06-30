---
layout: post
title:  "Real-time monitoring and performance analysis of power plants at BaxEnergy"
author: "Patric Boscolo"
author-link: "https://twitter.com/patricsmsdn"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-06-30
categories: [IoT]
color: "blue"
image: "images/2017-05-01-baxenergy/windgenerator-small.png"
excerpt: BaxEnergy teamed up with Microsoft to build a Lambda architecture that allows you to define “data in motion” and “data in rest” approaches used in the energy sector to deliver real-time monitoring systems.
language: [English]
verticals: [Power & Utilities]
geolocation: [Europe]

---


![Header]({{ site.baseurl }}/images/2017-05-01-baxenergy/windgenerator-medium.png)

<br/>

BaxEnergy is dedicated to delivering innovative turnkey solutions to renewable energy players so they can visualize, organize, analyze, and optimize their power plants. The aim of the company is to make renewable energy easier and more efficient, affordable, and secure, contributing to building a greener world for the benefit of present and future generations. 

BaxEnergy has combined extensive domain expertise with the latest cutting‐edge technologies to develop Energy Studio Pro®, the only integrated platform capable of truly unifying under one roof all renewable energy technologies and manufacturers. With Energy Studio Pro, BaxEnergy helps utilities, independent power producers, and operation and maintenance (O&M) service providers to operate power plants more efficiently by accessing data anytime anywhere, minimizing energy losses, and increasing the overall return on investment. Because BaxEnergy understands how power plants operate, they can help the customer identify issues as well as measure and predict production of energy-related KPIs. 

In the fast-growing energy market, data volume and data sources are multiplying as more and more devices can be connected to a network. As a result, BaxEnergy has outgrown the traditional data warehouse infrastructure, and has built a secure and independent data acquisition architecture that's able to collect, store, and process large amounts of data coming from any kind of device in the power plants. In the future, BaxEnergy would also like to be able to not only scale the current solution but also offer additional services such as big data predictive and preventive analysis. 

During a one-week hackfest in Berlin, we helped BaxEnergy define the flow of data in the system and implement data acquisition.
 
### Key technologies used

- [Microsoft Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/)
- [Azure Service Bus](https://azure.microsoft.com/en-us/services/service-bus/)
- [Azure Service Fabric](https://azure.microsoft.com/en-us/services/service-fabric/)
- [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/?v=16.50)
- [Azure Stream Analytics](https://azure.microsoft.com/en-us/services/stream-analytics/)
 
### Core team

- [Patric Boscolo](https://twitter.com/patricsmsdn) – Technical Evangelist, Microsoft 
- Georgi Varbanov – Software Developer, BaxEnergy
- Francesco Di Giunta – Development Manager, BaxEnergy
- Andreas Berthold-van der Molen – CSO, BaxEnergy

## Customer profile

![Logo BaxEnergy]({{ site.baseurl }}/images/2017-05-01-baxenergy/Logo.png)

The mission of [BaxEnergy GmbH](https://www.baxenergy.com/) is to deliver innovative turnkey solutions to renewable energy players so they can visualize, organize, analyze, and optimize their power plants. They believe that renewable energies are fundamental for mankind, and innovation and technology are the key factors to foster their growth.

Founded in 2010 in Germany by Rüdiger Bax and Simone Massaro to bring innovation to the wind industry, BaxEnergy is the first independent company on the market in terms of total gigawatts (GW) of renewable energy for power plants connected worldwide. With its headquarters in Berlin and the research and development center in Catania, BaxEnergy is growing in headcount, business, and project complexity, opening new offices in Portugal and South Africa and making new partnerships in India and Turkey with local players. 

[Energy Studio Pro®](https://www.baxenergy.com/products-energy-studio-pro/) is the only turnkey solution available on the market for visualizing, analyzing, and optimizing power plant operations across multiple technologies and manufacturers all in one place. 

![Operations Center]({{ site.baseurl }}/images/2017-05-01-baxenergy/operations.png)

<br/>

## Problem statement ##

Due to the amount of data points acquired each hour by multiple customers, BaxEnergy has outgrown the traditional data warehouse infrastructure. An average customer of BaxEnergy creates 400 GB of filtered data per year, which is stored in SQL Server. Filtered data is processed by BaxEnergy and is used to calculate KPIs and store logs in a human readable format by indexing the logs sent from the power plant. Message artifacts cannot be processed nor can downtime of the wind generator. Because the original messages processed are up to 4 TB per year, it makes it extremely difficult for traditional software to query and analyze historical data and at the same time present real-time insights in data and services. The current architecture is a database-centric application that puts a lot of simultaneous read and write operations on the systems.
 
## Solution and steps

Energy Studio Pro is a complex modular software application. In meetings and architecture design sessions, we identified one of the potentially biggest challenges for power plant owners: data acquisition from wind generators (typically energy wind generator parks). 

Currently, the BaxEnergy customer operations center establishes a VPN connection to each wind generator. After the connection is established, a component responsible for the data acquisition collects the information from the wind generator, processes the data, and stores the information in a SQL database. Our approach was to move to a model where the wind generators send the information to the cloud.

![ADS Simple Approach]({{ site.baseurl }}/images/2017-05-01-baxenergy/architecture.png)

<br/>

The project's technical details were addressed during several meetings held in the weeks before the hackfest to better understand the entire scenario. Our simple approach was to use Windows 10 IoT hardware instead of Windows Server, which would reduce the cost for maintaining the expensive network infrastructure and server hardware for both the wind generator and the datacenter. We considered using [Azure IoT Gateway](https://azure.microsoft.com/en-us/blog/introducing-the-azure-iot-gateway-sdk-beta/) mainly for security reasons and device management.

## Technical delivery

### Security details

Communication between the sensor device and Azure uses HTTPS as well as shared access signature (SAS) tokens. Azure IoT Hub allows you to revoke each device access token to send information. We used the [Web Apps feature of Azure App Service](https://azure.microsoft.com/en-us/services/app-service/web/) and [Azure Traffic Manager](https://azure.microsoft.com/en-us/services/traffic-manager/) to route the traffic to the web app. That way the SignalR website could be secured via a web application firewall. We used [Azure Active Directory](https://www.microsoft.com/en-us/cloud-platform/azure-active-directory) to authenticate operators who wanted to get access to the SignalR website, and to authorize internal subscription administrators to manage only their part of the solution via groups.

### Devices used

The device range used in wind generators varies, but typically, it is a Windows Server-based system with a local SQL Server. Because most of the wind generators come with dedicated hardware to run the engine, the specification of the hardware varies. Siemens, for example, is using this as a minimal specification for its PC hardware:

- Intel Pentium(R) 4 Processor
- 512-MB RAM
- 30-MB free space for software
- 500-GB hard drive
- 800 x 600 compatible monitor
- Mouse
- Keyboard

Installing additional hardware onsite is not always an option for a company that operates a wind park.

### Benefits of the design

- Replaces expensive servers with IoT hardware
- Reduces network operation costs for handling VPN connections

> NOTE: Thinking about an average wind generator farm with 70 wind generators, you need to maintain a VPN network connection to a wind generator several miles away from the next city or infrastructure. Typically, side-to-point and point-to-side connections need to be managed by the wind park operator.

### Data

We first analyzed the data and the current dataflow model of the application. The data included the following types:

- **Signals**. Signals are collected every 7 seconds and can contain critical information about the state of the wind generator. The size varies from 20 KB to 200 KB.
- **Metadata**. Metadata is information that is not critical for power plant operation but contains information about the output and energy network. Metadata is collected over a duration of 14 seconds and can reach a file size of 60 KB to 250 KB.

An average wind farm monitored by using Energy Studio Pro will generate the data ingestion shown in the following diagram. 

![Data Ingestion Calculation]({{ site.baseurl }}/images/2017-05-01-baxenergy/dataingest.png)

<br/>

#### Data structure

Because there is no industry standard for the data yet, every wind generator produces different types of data structures. More importantly, data can change over the lifetime (20 years) of a wind generator, when, for example, new components are integrated during service and maintenance.  

The Windows Server appliance collects the sensor data from the wind generator or plant, converts it into CSV files, and stores it in local databases so it's accessible to maintenance workers.

The BaxEnergy solution data meets all the criteria from a volume, velocity, and variety perspective of a big data solution. This also means that the data that's received should be structured in such a way that it makes it easier to use tools such as [Apache Hadoop](http://hadoop.apache.org/) to process the data. Typically, [Apache Hive](https://hive.apache.org/) and Hadoop perform better if you have larger files instead of several smaller files, an aspect that has to be taken into consideration. 

In addition to the way that data is stored and queried, another problem is that the current dashboards pull data at a high frequency speed to show the most accurate presentation of data at a given time, which has a negative impact on the overall solution. Even though customers really like the dashboards, this speed, combined with long running queries against SQL Server, is too much for the current system to handle. 

Because there seems to be a hot path where you want to see and monitor what is going on in a power plant, and a cold path that leverages the collected data for historical analysis, we came up with a Lambda architecture. The idea behind the Lambda architecture is to divide the data into two streams: one for analyzing the data and one for storing the data, using Azure Blob storage and extracting the KPIs and relevant metadata and storing it in Azure SQL Database.

![Architecture]({{ site.baseurl }}/images/2017-05-01-baxenergy/baxarcfinal1.png)

<br/>

#### Data ingestion

We deployed and configured an Azure IoT Hub to handle the data ingestion. We wrote a Windows service that will be executed at the plant with the purpose of packaging messages and storing those that have not yet been sent. This service acts like a local queue. 

We used the NuGet package [Microsoft Azure IoT Device Client SDK](https://www.nuget.org/packages/Microsoft.Azure.Devices.Client) to send information to IoT Hub. 

```csharp
private static async Task SendDeviceMessageAsync(QueuedMessage qmessage)
{
    /*
    ... 
    Check several things like:
    - message status
    - Priority
    ... 
    */
    qmessage.Status = MessageStatus.Processing;
    Logger.Log($"{DateTime.Now}: {qmessage.Id} - {qmessage.Status}");

    //Messages to be send are droped in a local folder
    var allFiles = Directory.EnumerateFiles(qmessage.FolderPath, "min.js").ToArray();

    foreach(string filePath in allFiles)
    {
        long length = new FileInfo(filePath).Length;
        string fileName = new FileInfo(filePath).Name;

        if (ValidateFile(file)) //local validation filesize, hash, ...
        {
            using (var fileStream = File.OpenRead(filePath))
            {
                using(var reader = new StreamReader(fileStream))
                {
                    string content = await reader.ReadToEndAsync();
                    var message = new Message(Encoding.UTF8.GetBytes(content));
                    message.Properties.Add("filetype", "HistoricalData");
                    message.Properties.Add("filename", fileName);
                    message.Properties.Add("parkid", parkId);
                    
                    try
                    {
                        await deviceClient.SendEventAsync(message);
                        //for debugging purpose only
                        //await Task.Delay(1000);
                        
                        qmessage.Status = MessageStatus.Send;
                        Logger.Log($"{DateTime.Now}: {qmessage.Id} - {qmessage.Status}");
                    }
                    catch (System.Exception ex)
                    {
                        Logger.Log($"{DateTime.Now}: {qmessage.Id} - {ex.Message}");
                        //internal Error handling of the service
                    }
                }
            }
        }
    }
}
```

<br/>

We defined endpoints in IoT Hub as Azure Service Bus queues. Each wind farm generator has a unique identifier (Park ID).

> NOTE: We send the "Park ID" as metadata for each message to IoT Hub. By doing so, we have been able to define routes for each wind farm in IoT Hub.

![IoT Hub Route]({{ site.baseurl }}/images/2017-05-01-baxenergy/route.png)

<br/>

We decided to create two queues per windfarm. One queue is for the *data in motion* scenario, and the second queue is for the *data at rest* scenario. The main benefit of Service Bus queues is their ability to collect data and store it for further processing. By doing so, you can distribute the messages and at the same time handle the load effectively.

Benefits of the implemented solution:

- No complex setup for data acquisition via VPN
- Workload reduced to read/write operations by establishing queues
- Data flow divided into hot and cold paths
- Asynchronous model allows for temporary storage of the data without putting more pressure on the already busy databases


#### Data in motion

The next project step was real-time monitoring of the power plants. We decided to use a SignalR-based website and host it in Azure App Service. We called the Service Bus queues directly and presented the incoming messages, which allowed us to present the data without any `request` send to a database. This resulted in a great impact on the overall system’s performance. 

![SignalR Dashboard]({{ site.baseurl }}/images/2017-05-01-baxenergy/dashboardfinal.png)

<br/>

The following snippet shows the code reading the data from the queue and presenting all the information.  

```csharp
public async Task<ActionResult> Index()
{
    QueueClient client = QueueClient.CreateFromConnectionString(connectionString, queueName, ReceiveMode.ReceiveAndDelete);
    Task task = Task.Run(() =>
    {
        client.OnMessage(message =>
        {
            using (Stream stream = message.GetBody<Stream>())
            {
                if (stream != null)
                {
                    using (var reader = new StreamReader(stream, Encoding.UTF8))
                    {
                        while (!reader.EndOfStream)
                        {
                            var line = reader.ReadLine();
                            if (!string.IsNullOrWhiteSpace(line))
                            {
                                try
                                {
                                    var result = GetJsonfromLine(line);
                                    _hubcontext.Clients.All.iotHubNotification(result);
                                }
                                catch (Exception e)
                                {
                                    Debug.WriteLine(e.Message);
                                    continue;
                                }
                           }
                       }
                    }
                }
            }
        });
    });
    await task;
    return View();
}
```

<br/>

Benefits of the implemented solution:

- Visualizing real-time monitoring without accessing the database
- Presenting the data in nearly real time
- Portal still allowing for execution of queries on historical data
- Immediate notification as soon as the device is not sending any data

The new architecture also allows us to trigger certain processes, which is why we decided to offer an additional service that sends instantaneous notifications as soon as a power plant’s signals report a critical error. 

#### Message processing and analytics

To continuously analyze the incoming data, we used Azure Stream Analytics and the [Azure Stream Analytics tools for Visual Studio](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-tools-for-visual-studio). After the data reaches a predefined threshold, we store it in a Service Bus queue, which triggers a workflow that allows us to do certain things. 

For example, most offshore and wind turbines are capable of operating at a temperature range of -20°C to +40°C. The engine would shut down before a critical temperature is reached. Therefore, wind farm operators should be notified before the shutdown happens and be informed about the related root causes. 

Because the real data send from the wind generator is way too complex to highlight here (due to its containing information that represents the rotors as well as status, error, and production codes), we simplified the data model of the message to illustrate what we did.

For example, we could assume that the device produces the following data (*this is a fake data message send from the device*):

![Azure Table storage]({{ site.baseurl }}/images/2017-05-01-baxenergy/data.png)

<br/>

We created a new Stream Analytics job to process the incoming data from IoT Hub by defining the IoT Hub messages as **input** and a Service Fabric queue as **output**. We also implemented another output, [Azure Table storage](https://azure.microsoft.com/en-us/services/storage/tables/), so we can look into the data and validate our queries.

Following is how the corresponding Stream Analytics query would look.

```sql
SELECT * 
INTO Notify
FROM iothub
WHERE parkid ='404404404' AND (temperature >30 OR temperature < -10 )
```

![Azure Monitoring]({{ site.baseurl }}/images/2017-05-01-baxenergy/monitorasab.png)

<br/>

The Microsoft Azure Dashboard has great features to visualize the results of the Azure Stream Analytics job. Following is a screenshot of both the input and output messages.  

![Microsoft Azure Stream Analytics Job]({{ site.baseurl }}/images/2017-05-01-baxenergy/asajob.png)

<br/>

As illustrated in the previous diagram, the two queries are executed and produce the desired outputs. One query will write the data into a Service Bus queue, which triggers an Azure function that is able to send automatic notification to the receivers’ chain specified for each wind farm in Table storage, while the second query stores the data in Table storage for debugging purposes.

Benefits of the implemented solution:

- Creation of automatic workflows and additional services
- Instantaneous notification to windfarm operators so they can take immediate action
- Cost-effective feature
- Real-time data analytics


#### Data at rest

The project’s biggest challenge was the parsing of the acquired data. We used several techniques and Service Fabric to scale small services that can handle the data ingestion routed to the Service Fabric queues.

![Diagram used to explain Azure Service Bus queues]({{ site.baseurl }}/images/2017-05-01-baxenergy/loaddiag.png)

<br/>

Why use Azure Service Fabric? We are dealing with a lot of variations in the data itself. The solution is to use specialized parsers. To map a message to a specific parser we used the Message Factory in the Service Fabric SDK to have full control over each message. Service Fabric allowed us to connect several service instances to several Service Fabric queues at the same time. These “micro-services” read the messages and handle the messages asynchronously by using the ReceiveMode.PeekLock feature of the Service Bus queues. The Data Factory creates a Parser Factory, which loads several parser implementations for each Message object. These parsers are injected at runtime via dependency injection. 

If one of the services fails (due to an error in the service not related to parsing), the lock is removed after 5 minutes from the Message object. Another service can process the message again. If the parsers are executed successfully but cannot parse the data of the message, the Message object is stored in the DeadLetterQueue of the Service Fabric queues. An engineer can investigate the corrupted messages in the DeadLetterQueue later on. These also allow us to improve the parsers. If the parsers are executed successfully, the result will be a semi-structured JSON format. Specialized data writers continue to process the JSON format and store them for historical use and queries. As of today, the data is stored in Azure Blob storage and Azure SQL Database.

![Architecture Full Picture]({{ site.baseurl }}/images/2017-05-01-baxenergy/architecturefull.png)

<br/>

## Conclusion ##

With the new architecture design, we achieved the overall goal to process the growing data ingestion. This will also allow us to scale the application parts more easily in the future. By looking at the number of events and logs generated onsite in a wind farm, it is most likely that we cannot use any IoT hardware in the near future. However, BaxEnergy is committed to this idea and just recently acquired a startup focusing on solving the onsite hardware where Microsoft IoT Gateway can be a great solution. The best thing is that the current application will not be impacted, and we only changed the way the data gets acquired. This will take a lot of load from the current system and impact the overall performance and stability of the solution.

BaxEnergy was extremely satisfied with the results achieved with the Service Fabric approach, allowing us to better handle and utilize hardware. Although the data output/input didn’t change, the load gets distributed much better. With the Lambda architecture, it is much easier to look into new services and to react on customer requests much faster than before. 

From a Microsoft perspective, we learned that a Windows Server and SQL Server can be an IoT device that we have not considered in the past. There are several benefits of dividing the parsing of the data and storing the data for further purposes. 

Looking to the future, the next step is to analyze the current system and evaluate if a Docker or Service Fabric approach would be the right way to move further workloads. There is a strong focus on hybrid infrastructure where all of the lessons learned and solutions built in the cloud are available for on-premises customers as well. So we are all extremely excited about the announcement of [Azure IoT- Edge](https://azure.microsoft.com/en-us/campaigns/iot-edge/).

### Opportunities going forward

- **Big data analysis (predictive maintenance)**. If the software can identify patterns in the sensor data that will cause a downtime of the wind generator, operations can be informed before the power node goes offline. The first step was storing the raw messages into Blob storage per wind farm in Azure Storage Premium accounts. 

- **Queries**. With the new architecture, it is much easier to analyze the historical data and try out data query and analysis services such as Azure Search and Azure HDInsight.

- **Scale opportunity**. As a next step, parts of the application architecture could be refactored or rebuilt as micro-services that would allow a better usage of the hardware.  

## Additional resources

- [Overview of the Azure IoT Hub service](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-what-is-iot-hub)
- [Create applications that use Service Bus queues](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-create-queues)
- [What is Stream Analytics?](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-introduction)
- [Service Fabric application lifecycle](https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-application-lifecycle)
- [SQL-Datenbank (German)](https://azure.microsoft.com/de-de/services/sql-database/)
- [Microsoft Azure IoT Hub (German)](https://azure.microsoft.com/de-de/services/iot-hub/)

