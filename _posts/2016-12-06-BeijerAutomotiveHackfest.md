---
layout: post
title:  "Beijer and Microsoft explore ingestion of massive amounts of car-sensor data into Azure"
author: "Valery Jacobs, Sander van den Hoven, and Eric Maino"
author-link: "# Add Twitter link here"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2017-03-24
categories: [IoT, Azure Functions]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Beijer Automotive and Microsoft conducted a hackfest to determine whether it is possible to send very large amounts of data to Azure and to receive and process that data. Beijer needed a solution for ingesting car-sensor data into Azure in order to turn the data into useful information and alerts.
language: English
verticals: 
---

Beijer Automotive and Microsoft conducted a hackfest to determine whether it is possible to send very large amounts of data to Azure and to receive and process that data. Beijer needed a technically and economically feasible solution for ingesting car-sensor data into Azure in order to turn the data into useful information and alerts. This report outlines the numbers that the project team was aiming for and how the team calculated other metrics and performance targets.

**Key technologies used:**

- Azure Functions
- Azure Service Fabric
- Azure Event Hubs

**The core team**

- Beijer and Sioux:	
  - Daan Gerrits
  - Matthijs van Bemmelen
  - Erwin de Jong	

- Microsoft:
  - Eric Maino
  - Valery Jacobs
  - Sander van den Hoven

## Customer profile

[Beijer Automotive](http://www.beijer.com/en/), based in the Netherlands, builds solutions for mobility and vehicle telemetry. One of its core products is a Controller Area Network (CAN bus) solution that unifies countless variations of CAN bus implementations (such as brand and model) into a single consistent format. This enables its customers to build flexible mobility solutions on top of its platform—fleet management systems, taximeters, traffic management, and more. Learn more at *[Integration into your product](http://www.beijer.com/en/services-solutions/can-solutions/integration-into-your-product/)* on the Beijer website.

Beijer Automotive is expanding its business by recollecting and extending the telematics its customers are generating and transforming this input into a new data service called Vetuda©. Based on this data service, Beijer will be able to unlock even more scenarios in the areas of traffic management, road conditions, public safety, or whatever opportunity this vast dataset might disclose.

Beijer works with many companies in the automotive industry as well as organizations such as the Dutch Vehicle Authority (RDW) and Highways England, which are also launching customers with the Vetuda platform.

One of Beijer's goals is to change the business model for its customers by offering them the opportunity to monetize the data they contribute to the platform. This incentive is expected to accelerate adoption and improve the data coverage needed to enable even more innovations.

Each connecting customer could benefit from having their Vetuda connector running in Azure because they currently need to manage their own infrastructure to take part in the data collection for the platform, limiting the possibilities on both ends.

Beijer Automotive has years of experience in a field that our Microsoft team wants to learn more about. We expect their feedback on our approach to IoT and our IoT services to be very valuable.

Beijer will be extending its business to the agricultural vertical, which has a big worldwide potential for Microsoft as well because it could boost the scale level significantly.

## Problem statement 

Handling large amounts of data is challenging in any architecture, but in this specific scenario the frequency with which data needs to be recorded and the volume of devices (vehicles) that are deployed pose extra challenges that need to be recognized and tackled.

The potential value of the data depends on many factors such as data quality, frequency, validity, and depth. This means the specifications for this IoT solution must be finely calibrated to keep costs at a feasible level and offer the performance that is needed for outputting the end result of the system.

An additional challenge was that Beijer doesn’t know yet the treasures the data might contain and how the customers, who pay for the data, will be using it because they probably also have to validate its value. This called for an exploratory mindset that states that initially the amount of data and the number of measurements in that data should be as extensive as possible. This approach offers the opportunity to take a broad overview of what information the data could unlock and then narrow it down to the cases that have these
characteristics:

- The data has a business value without intense processing (for examplke, GPS positioning that offers direct insights on traffic congestion by simply plotting it on a map).
- The data interchange frequency is at the right level to have an adequate level of accuracy but should also not be too high because this has direct consequences on costs and performance (for example, the frequency with which vehicle speed is sensed determines the scenarios that this data can be used for).
- The payload is optimized for use in a high-throughput architecture. Carefully choosing the payload format is an important step in the process of minimizing the byte streams that need to pass the system.

We anticipated the amount of data would be quite high based on the indicative requirements we received early in the engagement. This article will outline in detail what numbers we were trying to hit and how we calculated various other metrics and performance targets from that.

Customers who are data providers for Vetuda currently don’t receive an SDK from Beijer but they receive specifications describing how the integration needs to be implemented. This means each customer has to build their own connector to connect to Vetuda, or more precisely be connected by Vetuda. Changing the underlying mechanism means impacting all these implementations, incurring costs on a per-customer basis.

In the existing implementation, data providers run HTTP-based interfaces that are called from the Vetuda back end to collect data. These requests vary in properties (last-hour update, full-day data dump, subset of metrics, and so on). The benefit of this is that Vetuda ingests data on its own terms and providers act as a buffer for the incoming data streams the vehicles submit. A downside is that extra logic is needed to call out to the interfaces and to keep track of data completeness.

The goal of our hackfest was to further investigate the topics mentioned here and to validate the assumption we made in advance that Azure can offer the performance needed to handle the large amount of data at a rate that is required for the more complex and data-intensive scenarios.

The core points that were part of this investigation were:

- Can Azure offer the bandwidth and processing power to ingest the data streams?
- How does the architecture need to be set up in order to meet the requirements for handling 50,000 vehicles recording data on intervals of 1 per second?
- What are the costs involved in implementing the architecture using Azure platform as a service (PaaS) services and how can these costs be minimized?
- How can the current architecture be optimized for the cloud to improve performance and scalability?
- What alternatives does the implementation have and what are their pros and cons?

To get to an acceptable level of details, the hackfest was scoped to focus on data ingestion. Further processing and analyzing of the data is considered a project in itself with many options to consider and include in a proof of concept.

## Solution and steps ##

The problem for Beijer as described above is to come to a technically and economically feasible solution for ingesting large amounts of data from cars into Azure in order to process and analyze the data into useful information and alerts. 

### Extracting data from cars ###

Beijer manufactures chips that are able to interpret CAN bus data in cars. CAN bus, a standard in any car since 2004, is the system in which all data of the car is transported. There is a standard for a number of signals called OBC, but every car manufacturer has its own protocol and this might even vary between models. Beijer produced a chip that can interpret the CAN bus data from a large set of cars and output a standardized set of data.

*Figure 1. Beijer CAN bus chip*

![Beijer CanBus Chip]({{ site.baseurl }}/images/Beijer/chip706x3861-706x386.jpg)


This chip needs to be implemented in the existing printed circuit boards (PCBs) of Beijer's customers, such as taxi companies or other fleet owners, and it can cover a wide variety of systems. There are no requirements for operating system, memory, or CPU as long as the system can interpret the output of the chip. 

*Figure 2. Communication between car and server*

![Beijer CanBus Chip]({{ site.baseurl }}/images/Beijer/BCC-schematic-V3small1.jpg)


Beijer provides a number of hardware configuration options:

**Integrated Beijer CAN Controller**

1. Input 1x CAN-HS or CAN-LS   >>    Output 1x CAN-HS or CAN-LS
2. Input 2x CAN-HS and/or CAN-LS   >>   Output 1x SPI or UART (RS232)
3. Output: RS232, CAN, SPI, Analog, and more

Each customer used their own system to transfer the data into their own on-premises solutions.

### Setting the scene ###

In order to set the scene on how much data will be ingested and processed by the solution, Figure 3 shows the numbers set by Beijer. These are the numbers the solution needs to process once the solution is fully deployed. However, the solution still needs to scale to larger numbers in the future.

*Figure 3. Constants*

![Figure 3. Constants]({{ site.baseurl }}/images/Beijer/Constants.PNG)


The data needs to be gathered from 50,000 cars every second. We would try only a number of signal/messages in order to test the signal with many small messages and some larger messages. We started with 1 signal value per message.

Because not all cars will be driven at every moment, the number of cars that are being driven and producing data is set to 15% (occupation) on average and 33% at peak moments. We assumed the peak level occurs for about 6 hours per day. 

We also defined the number of signal values that need to be retrieved per second. This will be 1 because we want at least to know the speed of a car every second. This might be decreased if this leads to oversampling or if a lower sampling rate does not decrease the quality of the alerts.

This input will lead to a number of messages and bytes that need to be ingested by the solution as shown in Figure 4.

*Figure 4. Numbers to be ingested*

![Figure 4. Numbers]({{ site.baseurl }}/images/Beijer/Numbers.PNG)


Per month, this will lead to considerable load and storage (estimated at 14 TB). This report will describe which solutions were tested, whether they succeeded, and what the expected cost is. 

### Overall solution  

To ingest the requested number of messages and bytes, we tested two scenarios:

1. Using a **Pull Scenario** where the solution is capable of pulling data from a VIBeX endpoint at all data suppliers (car fleet owners) and move that data into Azure via Event/IoT Hub.
2. Using a **Push Scenario** where a solution is running in the data supplier datacenter that pushes car data to the Vetuda Event Hub in Azure.

**The pull scenario**

The pull scenario is one in which every Beijer customer has their own data storage where their cars' data is stored. The timing to pull car data depends on the customer scenario, but each car will produce car sensor data to the customer storage on average every 2.5 seconds.

The data in the data storage of each customer needs to be moved to Azure. This is done via an endpoint service called VIBeX. VIBeX is a RESTful interface developed by Beijer that is able to return data from cars in JSON format. Per request, the cars, the period, and the signals can be defined.

An example VIBeX REST that gets values for a certain signal 191 over a timeframe is as follows:

    https://[IMPLEMENTER]/VIBeX/x.y/Vehicles/VehicleID/191?StartDateTime=2016-12-18T13:00:12+2:00&StopDateTime=2016-12-18T13:00:14+2:00

This call will result in a JSON payload that return the values for signal 191:

```
{
    	“Result” :
    	[
    		{
    			“SignalId” : 2,
    			“Time” : “2014-04-18T13:00.123:12+2:00”
    			“Location” : “51.4333, 5.4833”, “Value” : true
    		},
    		{
    			“SignalId” : 191,
    			“Time” : “2014-04-18T13:00.544:12+2:00”
    			“Location” : “51.4333, 5.4833”, “Value” : 31.55
    		},
       ]
    }
 ```   

Each customer will have a VIBeX endpoint that can be called to retrieve the data from cars. Once the data is retrieved, it needs to be stored and analyzed in Azure. Figure 5 shows the overall architecture.

*Figure 5. Overall pull solution architecture*

![Figure 5. Overall Architecture Pull Solution]({{ site.baseurl }}/images/Beijer/OverallPullArchitecture.png)


Every car/vehicle has a device to capture the car data via the CAN bus. This data is sent to each customer (fleet owner). They store it in their own data store and perform their local business processes on it. The data is exposed via a secure VIBeX REST API. In the Beijer solution in Azure, a solution runs that pulls this data into Azure.

In order to be able to pull all data from all customers, a solution must be built that can handle the required throughput. That solution will have the components shown in Figure 6.

*Figure 6. Pull solution components*

![Figure 6. Pull Solution Components]({{ site.baseurl }}/images/Beijer/PullComponents.png)


- Job scheduler: 

  In order to be able to schedule the jobs to pull data from a certain VIBeX endPoint, a job scheduler is created. This job scheduler defines the job that needs to be executed. The jobs will be added to a job queue that is accessible tor the job worker.
	
- Job worker

  The job worker retrieves the job from the job queue and performs the action that needs to be done. In the job, the endpoint to the VIBeX is mentioned and the job worker calls the endpoint, retrieves the results data, and sends the data to the data retriever.

- Data retriever

  The data retriever is capable of retrieving large quantities of data. It performs two actions:

    - Stores the data in persistent storage for future use.
    - Sends the data to the data processor for real-time processing.

- Data processor

  The data processor retrieves the data and analyzes the data to detect alerts. This can be, for instance, a defined number of fog lights in a certain region, which will raise the fog alert. The alerts are sent to the Beijer clients that are subscribed to the alerts.

***Security***

The majority of the system as described above is internal in Azure, has no external connections, and is secured by Azure. The VIBeX servers at the customer locations are externally exposed and need to be secured. Security is an integral part of the VIBeX protocol and is implemented using OAuth and a username, password, and API key. The username, password, and API key are managed by Beijer and therefore the customer and Beijer are the only parties that can access the customer's VIBeX server.

**The push scenario**

The push scenario is much simpler than the pull scenario that is also tested in this hackfest. It requires a change in architecture, but the promise of a simpler architecture is so important that Beijer architects have taken it into account as an alternative for the current VIBeX API. Figure 7 shows the architecture for the push scenario.

*Figure 7. Push solution components*

<img src="{{ site.baseurl }}/images/Beijer/PushComponents.png" width="600">


Instead of the deployment of the VIBeX pull API, the customer has an alternative with a deployment of a VIBeX push service. This VIBeX push service will directly send car data to the data retriever (the same as described for the pull scenario). This data retriever will serve as a hub for the data and consequently send it to storage and the data processor. The data processor creates alerts that will be sent to Beijer's clients.

This scenario has the following advantages:

- No data collector and processor is required in Azure. This reduces complexity and cost.
- The solution scales with the number of customers. When more customers are connected, the solution scales itself because processing is then done on the customer side.
- The system only sends data when a car actually produces data. In the pull scenario, the system needs to request data even if there is none, just to know there is no data. With the push scenario, the system only sends data when car is operating.

***Security***

In the pull scenario, the system will send data to the event hub of Azure. This has been secured by the use of shared access signatures that will authenticate the sender.

### Adding IoT Hub for real-time data and cloud-to-device communication

Although the Vetuda system focuses on the ingestion of large amounts of data, it does make sense to categorize these data streams. Data can be handled as it comes into the system to result in near real-time alerts (hot path), while at the same time it can be analyzed later, together with data accumulated over time (cold path).

There are plans to extend Vetuda's services to new types of vehicles that might not even involve the intermediate data-provider role but consist of devices (vehicles) connecting directly to the cloud back end.

To satisfy these requirements, we added one of the core Azure IoT services into the mix, IoT Hub. IoT Hub makes sense for those scenarios that involve a direct connection between an end-node device or a gateway and the cloud. It offers high-volume data ingestion and a registry for potentially millions of devices that can maintain durable communication channels supporting data transports in both directions. It communicates over multiple protocols like HTTP and HTTPS (mostly for backwards compatibility), MQTT (as it is the most widely used protocol in M2M and IoT currently) and AMQP (a new, Microsoft-backed member of the IoT family offering updated specs compared to MQTT on security and efficiency).

When a fleet of devices is directly connected to the Vetuda back end, it also places the responsibility of device management in that domain. Luckily, IoT Hub device management has multiple features that accelerate implementing this responsibility into the solution. Microsoft's approach here is to provide APIs on top of the IoT Hub services to either integrate with or build a custom asset management solution. As devices go through a lifecycle of provisioning, configuring, updating, and eventually decommissioning, quite a few things need to be implemented or integrated before that cycle is complete. For the hackfest, the focus was on the feature set that directly could be applied to the Vetuda case and the first step to leveraging the benefits of this service.

*Figure 8. IoT Hub architectural positioning*

![ScreenShot 4.0: IoT Hub Architectural positioning]({{ site.baseurl }}/images/Beijer/BeijerIoTHubArch.png)


Under the hood, IoT Hub is based on Azure Event Hubs and on the consumer side (reading the data from the buffer) the developer experience is identical. The main differences are on the service and device registry end of IoT Hub where there are several endpoints for specific tasks such as managing devices and their state.

For the hackfest, we looked at the specific application for IoT Hub and noted that for Vetuda, device identity actually was an issue in that data should never be traceable to its source, which sounds like the opposite of that IoT Hub tries to offer. On the other hand, one of the more advanced and differentiating scenarios is where Vetuda would be able to query and communicate back to vehicles in a way that the system would target vehicles in a specific geographical area (geo-fenced). The approach we chose was to use device twins and let vehicles update their GPS data in device twin properties.

*Figure 9. IoT Hub device twins*

![ScreenShot 4.1: IoT Hub Device Twins]({{ site.baseurl }}/images/Beijer/BeijerIoTDeviceTwins.png)


The device twin properties could look like the following:

```
	@"{
             tags: {
                 location: {
                     region: 'EU',
                     lon: '52.3054724',
                     lat: '4.7533562'
                 },
                 allocation:{fleet: 'AgriAutomotive_F12',
                     fleetId: 'F12C345'},
			     state:{wipers:1,
				 		foglight:1,
						 warningLight:0}
             }
         }"
```

The vehicle client would update the state using:

```
await registryManager.UpdateTwinAsync(twin.DeviceId, patch, twin.ETag);
```

The back end can query the state of all vehicles in a registry using this syntax:

	"SELECT * FROM devices WHERE tags.location.lon < 53 AND tags.location.lat < 5

	query = registryManager.CreateQuery("SELECT * FROM devices WHERE tags.location.lon < 53 AND tags.location.lat < 5", 100);
	var twinsInNearFogZone = await query.GetNextAsTwinAsync();
	Console.WriteLine("Vehicles in fog zone: {0}", string.Join(", ", twinsInNearFogZone.Select(t => t.DeviceId)));


Using this approach, a back-end service can query state without the need for vehicles being online. In general, it is a good practice to be independent on both connectivity and bandwidth for back-end querying because third-party services might depend on swift query results coming through. 

The query detects vehicles in a geo-fenced region and, based on the result, several things could be determined:

- The vehicle is in a specific region.
- In this region, *n* vehicles have fog lights on.
- An alert should be send to vehicles in this region.

To confirm with the requirement that vehicle data should not be traceable to its owner or driver, all of the registry data could be stored anonymously where IoT Hub would be able to query or send a message to a specific vehicle but there is no metadata available to trace any other entity related to that vehicle. GPS locations are tricky in this regard because one could trace a work or home address and still find out who was driving. A solution to this problem could be to rasterize the GPS data to a lower resolution (offering less accuracy in querying vehicle positioning) or only storing region identifiers that have no queryable GPS properties.

*Figure 10. Applying a geographical raster for device querying*

![ScreenShot 4.2: Applying a geographical raster for device querying]({{ site.baseurl }}/images/Beijer/BeijerIoTHubRaster.png)


There are multiple options for sending messages back to vehicles using IoT Hub:

- Direct methods
  - Direct response
  - Applicable for lower latency messages like: turn on/off 
  - 8 KB maximum
  - 1,500/minute/unit maximum

- Device twin desired properties
  - State update 
  - Applicable for higher latency messages such as configuration changes
  - 8 KB maximum

- C2D messages
  - One way
  - Larger-sized messages, up to 256 KB
  - Lower frequency
  - 5,000/minute/unit maximum

A feature recently added to IoT Hub offers the opportunity to filter incoming messages and reroute them to external endpoints as they enter the IoT Hub ingest endpoint. This can be interesting for setting up an alerting scenario where certain message values (properties) can be routed to an endpoint that translates incoming messages into notifications to mobile phones or triggers that communicate back to vehicles or other services using a web hook, for example.

The way we chose to implement this was to use Azure Service Bus as the external endpoint and filter the warning light state so that engaged warning lights could result in a very quick response on the back end. Azure Service Bus additionally offers topics on top of queues where multiple parties, or systems, could subscribe to events coming from the filtered stream of events.

Using the Service Bus Explorer tool we simulated this scenario. Device state updates would come in and the IoT hub routing filter would pass them through to the Service Bus. It is possible to define multiple endpoints and filters. IoT hub manages all the states for filtering and splitting message routes.

## Technical delivery

### The job scheduler for the pull scenario 

The pull scenario requires that, at dedicated moments, the data is pulled from Beijer's customer VIBeX endpoint. To schedule and scale the pulling of data, a scalable solution is designed. This design is based on an application that generates jobs and adds these jobs to Azure Queue storage. The job worker can retrieve the jobs from the Azure queue and perform the jobs.

The job scheduler is for the hackfest—just a Console App that adds a certain message to an Azure queue in a certain time interval. The message is according to the following class:

```
    [Serializable]
    public class CollectorJob
    {
        public Uri EndPoint;
        public string Query;
    }
```

This class is serialized to JSON and sent to the Azure queue as a JSON payload. The JSON payload looks as follows:

```
	{
		"EndPoint":"http://vetudavibexdemo.azurewebsites.net",
		"Query":"api/IOTObject?customer=1&nrCars=165&nrSignalValues=1"
	}
```

The code that sent the message to the queue is:

```
    static void Main(string[] args)
     {
        var cString = ConfigurationManager.AppSettings["StorageConnectionString"];
        CloudStorageAccount storageAccount = CloudStorageAccount.Parse(cString);
        CloudQueueClient queueClient = storageAccount.CreateCloudQueueClient();
        CloudQueue queue = queueClient.GetQueueReference("ventudacollectorjobs");
        queue.CreateIfNotExists();

        Random rand = new Random();
        var j = 1;
        var nrJobs = 100;
        var nrSignalValues = 16500;
        var nrCarPerCompany = nrSignalValues / nrJobs;
        var pullingTimeSpan = 1000*10; //in milliseconds

        var run = 1;
        while (run <= 100000)
        {
            run++;
            var now = DateTime.Now;
            for (int c = 1; c <= nrJobs; c++)
            {
                var job = new CollectorJob { EndPoint = new Uri("http://vetudavibexdemo.azurewebsites.net"), Query = $"api/IOTObject?customer={c.ToString()}&nrCars={nrCarPerCompany}&nrSignalValues=1" };
                var json = JsonConvert.SerializeObject(job);
                CloudQueueMessage message = new CloudQueueMessage(json);
                queue.AddMessage(message);
                Console.WriteLine($"Created Job {j} to {job.EndPoint}/{job.Query}");
                j++;
            }
            var done = DateTime.Now;
            var duration = (done - now).TotalMilliseconds;
            if (duration < pullingTimeSpan)
                Thread.Sleep(Convert.ToInt32(pullingTimeSpan - Convert.ToInt32(duration)));
        }
    }
```

In a loop (max 10,000 runs), a number of jobs, defined by the variable nrJobs, are created. Each job represents a call to a Beijer customer that we have set to 100. In the code, this is just one endpoint that is very scalable, configured to deliver data from memory very fast and is therefore capable of delivering a very high load. For this test, this is valid because we do not want to test the retrieval of data, but the ingestion into Azure.

We want to retrieve 1 signal for 16,500 (the number of cars driven on a peak moment) every second. However, because the system is not able to add a message to the queue, pick it up at the job worker, get the data, and put it into the data retriever, we set the pullingTimeSpan to 10 seconds. Every call will then retrieve data for 10 seconds.

**#Pull scenario using Azure Functions**

The pull scenario using Azure Functions implements the job worker function from the architecture. In this architecture we have used dynamic Azure Functions that do not have their own hosting plan but share a hosting plan and the owner pays per execution and used memory (see [Functions Pricing](https://azure.microsoft.com/en-us/pricing/details/functions/ "Azure Functions Pricing") for more details).

We used an Azure function that is triggered when a message is added to the Azure queue. The Azure function has therefore one input (the Azure queue) and one output (Azure Blob storage). The output to Azure Event Hubs is done in code because we need to process the incoming data to disassemble on response with the data of multiple cars into multiple messages to the event hub. This can be seen by the function.json that is used for the Azure function.

```
	{
	  "bindings": 
		[
			{
			  "name": "myQueueItem",
			  "type": "queueTrigger",
			  "direction": "in",
			  "queueName": "vetudacollectorjobs",
			  "connection": "vetudajobs_STORAGE"
			},
			{
			  "type": "blob",
			  "name": "outputBlob",
			  "path": "outcontainer/{rand-guid}",
			  "connection": "vetudajobs_STORAGE",
			  "direction": "out"
			}
		  ],
		  "disabled": false
	} 
```

The Azure function is automatically triggered when an item is added to the queue "vetudacollectorjobs". In order to run all the code we need, the following namespaces were used: 

```
	#r "Newtonsoft.Json"
	#r "Microsoft.ServiceBus"
	
	using System;
	using Newtonsoft.Json;
	using Newtonsoft.Json.Linq;
	using System.Net;
	using Microsoft.ServiceBus.Messaging; 
	using System.Text;
	using System.Configuration;
```

We had to reference Newtonsoft.Json and Microsoft.ServiceBus because these are not natively available in the Azure Functions code.

The following code is executed when an item is added to the Azure queue "vetudacollectorjobs":

```	
	public static void Run(string myQueueItem, TraceWriter log, out string outputBlob)
	{
	
		//Step 1: Config
	    var eventHubName = "functions";
	    var maxBatchSize = 200000; //Max Bytes of a message
	    long totalCurrentSize = 0;
	    var connectionString = ConfigurationManager.AppSettings["vetudaEventHubConnectionString"].ToString();
	    var eventHubClient = EventHubClient.CreateFromConnectionString(connectionString, eventHubName);
	    var batch = new List<EventData>();

		//Step 2: Get Queue Item
	    var json = myQueueItem;
	    var job = JsonConvert.DeserializeObject<CollectorJob>(json); 
	
		//Step 3: Run the Job to get Data
	    var result = Task.Run(() => PerformJob(job)).Result; 

		//Step 4: Output the Job to Blob Storage
	    outputBlob = result;

		//Step 5: Create batches and sent to EventHub
	    var signalList  = JsonConvert.DeserializeObject<Measurements>(result); 
	    foreach(SignalValue obj in signalList.SignalValues)
	    {
	        var serializedIOTObject = JsonConvert.SerializeObject(obj);
	        var x = new EventData(Encoding.UTF8.GetBytes(serializedIOTObject));
	        totalCurrentSize += x.SerializedSizeInBytes;
	        if (totalCurrentSize > maxBatchSize)
	        {
	            SendBatchToEventHub(batch, eventHubClient);
	            totalCurrentSize = 0;
	            batch.Clear();
	        }
	       
	        batch.Add(x);
	    }
	    SendBatchToEventHub(batch, eventHubClient);
	}
```

The code goes through five steps:

- Step 1: Configure.
	
  The configuration is done to set the constants and create the eventhubclient and an empty list of the class EventData. Also, the maxBatchSize is set to 200,000. This is used as the maximum size of the batch that is sent to the event hub. This is set to 256 KB, but to prevent any error we have set our maximum lower.

- Step 2: Get queue item.

  The next step is to get the message from the queue end deserialize it into a class. The class used is CollectorJob, which looks like this:

		public class CollectorJob
		{
		    public Uri EndPoint;
		    public string Query;
		}

- Step 3: Run the job to get data.

  Now the job can be executed. Because the Azure function is not asynchronous, the action needs to run as an anonymous function in Task.Run. The job is run by the function PerformJob, which looks like this:

  ```
		public async static Task<string> PerformJob(CollectorJob job) 
		{
		    try
		    {
		        string uri = $"{job.EndPoint}{job.Query}";
		        var client = new HttpClient();
		        client.BaseAddress = job.EndPoint;
		        var response = await client.GetAsync(job.Query);
		        var json = await response.Content.ReadAsStringAsync();
		        return json;
		    }
		    catch(Exception ex)
		    {
		        return null;
		    }
		}
  ```

  The URI is determined as the endpoint for the call. This REST API call is done and JSON is returned.

- Step 4: Output the job to Blob storage.

  The JSON is sent to blobstore. In Azure Functions, this is simple to do by assigning a string to the variable. Each document automatically gets a unique name as a GUID. This way the raw data is stored and can be used for future processing.

- Step 5: Create batches and send to event hub.

  In this step, the first action is to deserialize the JSON into an object called Measurements. This object is a list of SignalValues and is defined as follows:

  ```
		public class SignalValue
		{
		    public string Fleet { get; set; }
		    public string Vin { get; set; }
		    public int SignalId { get; set; }
		    public DateTime Time { get; set; }
		    public string Location { get; set; }
		    public string Value { get; set; }
		}
		
		public class Measurements
		{
		    public Measurements()
		    {
		        this.SignalValues = new List<SignalValue>();
		    }
		    public List<SignalValue> SignalValues { get; set; }
		}
  ```

The SignalValue is the value that actually contains the data of a car. The SignalId defines what type of signal it is (one of 300 ranging from speed, to gear that is used, to fuel level, use of lights, and so on). A JSON payload can contain data from multiple cars and multiple times. So it might contain data for one moment for 50 cars but also data of the 50 cars for the last 5 minutes.

Once a list is created of SignalValues, we want each SignalValue to be sent to the event hub. This makes the processing in the event hub through, for instance, Stream Analytics easier because it does not have to process bulk data and can do processing on individual SignalValues.

To make the ingestion into Azure event hub faster, we use batches of events. Because the size of a batch has a maximum, we traverse through all of the SignalValues and add each SignalValue to the batch until we reach the maximum size. The batch is then sent to the Azure event hub.

Azure functions run on the Azure function host build on Azure WebJobs and they take care of their own scalability. This means that multiple Azure functions are executed in parallel based on the messages in the Azure queue. The scalability is the responsibility of the Azure function hosting environment and outside the control of the hackfest.

**Pull scenario using Azure WebJobs**

Azure WebJobs is very similar to Azure Functions. The code is almost the same, except for the coding to send files to Blob storage. Each WebJob is continuous and has an infinite loop that checks on whether a message exists in the Azure queue. If a message exists, it will perform the job in exactly the same manner as the Azure function will. 

Because of the similarities, we did not create a solution for it during the hackfest. We have, however, created a design and defined an assumption on the required infrastructure in order to make a cost estimate. 

**Pull scenario using Azure Service Fabric**

Azure Service Fabric is very similar to Azure Functions, except a stateless server is created that, in a loop, reads the job from the queue and processes the job. The stateless server is defined as follows:

```
        protected override async Task RunAsync(CancellationToken cancellationToken)
        {
            QueueReader queue = new QueueReader(log, performer);

            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    if (!await queue.ReadItem(cancellationToken))
                    {
                        await Task.Delay(TimeSpan.FromSeconds(5), cancellationToken);
                    }
                }
                catch (Exception ex)
                {
                    log.LogWarning("Exception", ex.ToString());
                }
            }
        }
```

The performer is a JobPerformer that is defined in the constructor to the service:

```
        public CollectorWorker(StatelessServiceContext context)
            : base(context)
        {
            rand = new Random();
            log = new ServiceLogger(this);
            performer = new JobPerformer(log);
        }
```

In the queue.ReadItem, a job from the queue is read (if there is one) and the associated job is executed.

```
        public async Task<bool> ReadItem(CancellationToken cancellationToken)
        {
            await _queue.CreateIfNotExistsAsync();

            // Get the next message
            CloudQueueMessage retrievedMessage = await _queue.GetMessageAsync(cancellationToken);
            if (retrievedMessage != null)
            {
                try
                {
                    _watch.Start();
                    var json = retrievedMessage.AsString;
                    var job = JsonConvert.DeserializeObject<CollectorJob>(json);
                    _log.LogMessage($"Starting Job {job.EndPoint}{job.Query}");
                    var success = await _performer.PerformJob(job, cancellationToken);

                    if (success)
                    {
                        await _queue.DeleteMessageAsync(retrievedMessage, cancellationToken);
                    }
                }
                finally
                {
                    _watch.Stop();
                    _log.LogInfo("ExecutionTime", _watch.AverageExecutionInSeconds.ToString());
                }
            }

            return retrievedMessage != null;
        }
```

The job is similar to the Azure function scenario where the data is retrieved and batches of 200 KB are sent to the event hub.

**Push scenario**

The push scenario as described above has a component that sends a signal to the Event Hub from the VIBeX server. This will require that the VIBeX server that runs at the Beijer customer site needs an additional component that can send car signals if they are present. The car data will be stored locally in the data store of the customer. This can be any data store ranging from SQL Database to flat files. In the hackfest we assumed that we would retrieve data from a database. The test implementation was done via a console app, but this can be refactored to a daemon of a Windows service to run as a background process.

The code of the application is very similar to the code used in the Azure function because it has the same functionality.

The class of data that is sent to the event hub is the following:

```
        public class SignalValue
        {
            public string Vin { get; set; }
            public int SignalId { get; set; }
            public DateTime Time { get; set; }
            public string Location { get; set; }
            public string Value { get; set; }
        }
```

A class EventHubAgent checks the status of the database of the Beijer customer and, if there is new data, will send it to the event hub. 

```
        public EventHubAgent(IDatabaseAccessFacade databaseAccessFacade, string eventhubName, string connectionString )
        {
            databaseAccessFacade.DatabaseActionOcurred += DatabaseAccessFacade_DatabaseActionOcurred;
            mEventhubName = eventhubName;
            mConnectionString = connectionString;
        }
```

The databaseAccessFacade is dependent on the implementation of the database at the customer and can range from flat file to SQL Server.

The code that sent the message to the queue is the following. The method SendBatchToEventHub is the same as the one in Azure Functions. If there is new data, the following event will be triggered:

```
        private void DatabaseAccessFacade_DatabaseActionOcurred(object sender, DatabaseActionEventArgs e)
        {
			//Step 1
            Console.WriteLine($"database action occurred. Sending {e.Values.Count} to eventHub");
            Stopwatch s = new Stopwatch();
            s.Start();
            var values = e.Values.Select(v => new SignalValue { Vin = v.Vin, Location = v.Location, SignalId = v.SignalId, Time = v.Time, Value = v.Value }).ToList();
            var eventHubClient = EventHubClient.CreateFromConnectionString(mConnectionString, mEventhubName);

            var batch = new List<EventData>();
            var maxBatchSize = 200000; //max size of eventhub batch

			//Step 2: Create Batch
            long totalCurrentSize = 0;
            int i = 0;
            foreach (var value in values)
            {
                i++;
                var serializedSignalValue = JsonConvert.SerializeObject(value);
                var x = new EventData(Encoding.UTF8.GetBytes(serializedSignalValue));
                totalCurrentSize += x.SerializedSizeInBytes;
                if (totalCurrentSize > maxBatchSize)
                {
                    Console.WriteLine($"Sending batch to eventHub. batch size: {i}");
                    SendBatchToEventHub(batch, eventHubClient);
                    totalCurrentSize = 0;
                    batch.Clear();
                    i = 0;
                }

                batch.Add(x);
            }

			//Step 3: Finalize
            Console.WriteLine($"Sending batch to eventHub. batch size: {i}");
            SendBatchToEventHub(batch, eventHubClient);
            Console.WriteLine($"done sending batches, time spent sending: {s.ElapsedMilliseconds} milliseconds");
        }

        public static void SendBatchToEventHub(List<EventData> batch, EventHubClient eventHubClient)
        {
            eventHubClient.SendBatch(batch);
        }
```

This solution will get the car data via DatabaseActionEventArgs and create a values list in Step 1. In Step 2, the data is batched into an event hub batch of 200 KB maximum and sent to the event hub in batches.

Technical execution
-------------------

After creating the code for all scenarios, we executed it. The most important finding can be seen in the cost section. We had created a Power BI dashboard on top of Stream Analytics to see how many signals were sent to the event hub. In all scenarios, we were able to get to around 3 million events. See the screenshot (Figure 11) from our Power BI.

*Figure 11. 3 million signals in 5 minutes*

![ScreenShot 1: 3 Million Signals in 5 minutes]({{ site.baseurl }}/images/Beijer/Screenshot1.png)


During the execution, the event hub was hit quite hard and we had to do some configuration on the number of throughput units for the event hub to accommodate the throughput. This resulted in high throughput in our event hub, as can be seen in the following screenshot (Figure 12).

*Figure 12. High throughput in event hub*

![ScreenShot 2: Busy Eventhub]({{ site.baseurl }}/images/Beijer/EventHubMetrics.png)


Costs
----------

This section describes the cost of the different scenarios. The cost will be defined for the use of Azure resources including:

- Virtual machines

  Virtual machines on Azure are paid according to hourly use and the price differs per type of virtual machine created. 

- Bandwidth

  Bandwidth is for normal use only, paid for outbound (egress) network traffic. This is out of scope for this case because we only ingress data, so no costs are calculated for bandwidth. Of course, the customers of Beijer will need to send the data to Azure. The cost of this bandwidth is out of scope for this report.
	
- Storage

  In Azure, storage is calculated for storing, writing, retrieval, and operation. In this report, we only define the cost for the data that is gathered. The cost we define is for storing and writing to the storage. The cost for retrieval and operation are out of scope. The costs are €8,64/TB for storage, €2.16/TB for writing.

- Azure Functions 

  The Azure Functions cost is calculated on executions and on used memory. The price is determined by execution time and use of memory plus the executions. The price is €0.000013/GB-s and €0.1687 per million executions, where the first 400,000 GB/s and 1,000,000 executions are free.
  
  The advantage of Azure Functions is that if the solution is not used, there are no costs and when the system is gradually used more, the costs also gradually rise.

- Event Hub usage

  The Azure Event Hub is priced on the number of events that are processed (called ingress) and the use of throughput units. Each throughput unit is capable of handling 1 MB/second of events, with a maximum 1,000 ingress events. We assume that we need the maximum of 20 throughput units (10 for input and 10 for output to, for instance, Stream Analytics). The costs are €0.024 per million events and €9.41 euro per throughput unit for a full month (744 hours).

### Cost of pull scenario using Azure Functions ###

In order to define the cost for Azure Functions, we did a test with the software described in the section [Pull scenario using Azure Functions](#pull-scenario-using-azure-functions). We have taken some constants to do the cost calculation, as shown in Figure 13. More details on the costs can be found in the [Azure pricing calculator](https://azure.microsoft.com/en-us/pricing/calculator). We assume Azure Functions needs the maximum memory of 1,536 MB.

*Figure 13. Azure Functions constants*

![Figure 13. Azure Function Durations]({{ site.baseurl }}/images/Beijer/AzureFunctionConstants.PNG)


We have done multiple runs to find the average throughput. We have done tests with 1,000, 2,500, 5,000, 7,500, and 50,000 signals in one job. For the system, it does not matter whether these are signals from 1 car, multiple cars, or a combination. Figure 14 shows the average execution time.

*Figure 14. Average execution time*

![Figure 14. Azure Function Durations]({{ site.baseurl }}/images/Beijer/AzureFunctionDuration.PNG)


Figure 15 shows a graphical representation of this table.

*Figure 15. Average duration*

![Figure 15. Azure Function Duration Graph]({{ site.baseurl }}/images/Beijer/AzureFunctionDurationGrap.PNG)


We have done an extrapolation of the number of items that can be done in 1 second (which is on average 320). To get the optimum for the retrieval of data, we need to consider that the time it takes to retrieve and process the data should not be longer than the retrieval interval. For instance, if we want data for every second, but we retrieve every 5 seconds to get the data from the last 5 seconds, the processing must be lower than 5 seconds to avoid congestion. This has an impact on the sampling rate. The higher the sampling rate, the more SignalValues need to be retrieved and the more retrieval processes need to run in parallel.

Figure 16 shows the time it takes to ingest 16,500 SignalValues with a 320 signal/second depending on the number of VIBeX servers that are called. This is in fact executing parallel requests.

*Figure 16. Time depending on number of VIBeX servers*

![Figure 16. Time depending on number of Vibex Servers]({{ site.baseurl }}/images/Beijer/RequiredVibexServers.PNG)


The following tables give an overview of the cost of Azure Functions based on the sampling rate. Table 1 shows the cost optimized on duration of each job. Table 2 shows the cost optimized on the number of executions.

*Table 1*

![Table 1: Azure Function Cost optimized on Duration]({{ site.baseurl }}/images/Beijer/AzureFunctionCostOptimizedonDuration.PNG)


Table 1 shows that if one signal is required each second from every car during peak time (33% of 55,000 = 16,500), then 52 parallel processes need to start, each retrieving an average of 320 signals per second (this is the maximum that we saw in our tests). This will result in memory consumption of 1,536 MB with a monthly cost of €2641. 

This is not a feasible option because:

- Azure Functions are not able to run 53 parallel processes.
- The timespan of 1 second is very short and leaves no room for latency to actually retrieve the data from a remote location. 
- The costs are relatively high.

A more feasible solution is to lower the sampling rate to once per 10 seconds. In the calculation, the cost lowers to €264 and the number of parallel processes is feasible.

If the optimization is not done on duration but on number of executions, this is the estimate:

*Table 2*

![Table 2: Azure Function Cost optimized on number executions]({{ site.baseurl }}/images/Beijer/AzureFunctionCostOptimizedonExecutions.PNG)


We see that with 7 VIBeX servers, the request time is also 7 seconds. The estimated cost to have 1 signal every second is much lower than in the previous table. But this is not possible because it would take more than 1 second (7 seconds with 7 VIBeX servers) to perform the task. 

If the sampling rate is lowered to once per 10 seconds and 16,500 is divided among 7 VIBeX servers (=customers), it is possible to ingest the required signal values and have 3 seconds left to do the HTTP request. This seems to be the optimal constellation.

So the optimum is:

- 7 VIBeX servers that can be called in parallel.
- Having a sample rate of every 10 seconds to allow requests to be retrieved and sent to event hub processing.

This will lead to a monthly cost for Azure Functions of €36.

### Cost of pull scenario using Service Fabric ###

The cost of Service Fabric is easier to determine than for Azure Functions. Azure Service Fabric billing is based on the rent of virtual machines. Here are four dimensions on which they are billed:

- **Virtual machine size.** Virtual machines have a wide range of sizes, from very small "A1, with q core and 0.75 GB of RAM" to very large "H16MR, with 16 core and 224 GB of RAM." Of course, the price differs per size. We chose D3 with 4 cores and 14 GB of RAM. The system needs to run many actions that are memory-intensive and large JSON payloads need to be processed. 
- **Duration.** The virtual machines are billed based on the time they are active, regardless of what they do. That means the number of hours that a virtual machine runs is billed. We assumed that virtual machines will run constantly, so 744 hours a month.
- **Number of virtual machines.** Service Fabric is a solution in which compute and data are distributed over multiple machines. Service Fabric can have scale sets and has a minimum of 5 machines. We assumed we needed 1 scale set and that the minimum of 5 would be sufficient. 
- **Storage.** This is required for log and diagnostics. The costs are similar to normal storage costs and we assumed that 100 GB would be enough.

We used these assumptions to calculate the cost of Service Fabric:

	Number of VMs:			5

	Price of VMs: 			€0.5000/hour 

	Number of hours: 		744

	Storage: 			200 GB

This will result in a stable price every month of €1,864. 

### Cost of pull scenario using Web Apps/Jobs ###

The cost of WebJobs will be the same as Service Fabric because the pricing is also based on virtual machines (called Instances) and we assume that similar sizing is required for WebJobs as for Service Fabric. The advantage of WebJobs over Web Apps is that scaling can start from 1 virtual machine, so if the system is not processing data, it can be automatically scaled down to 1 machine, reducing costs. Because App Service will only be used for WebJobs, we assume that a B3 (4 core, 7 GB of RAM) should be enough. 

	Number of VMs:			5

	Price of VM: 			€0.253/hr 

	Number of hours: 		744

	Storage: 			N/A

This will result in a stable price of €941 per month.

### Cost of push scenario ###

The push scenario will not have a cost for retrieval and ingestion into the event hub, since this is done at the customer site. This results in a very stable cost of €0.

### Cost of event hub

The event hub billing is based on two areas:

- **Throughput units for ingress and egress.** The ingress is the unit that is available to get the signals in. To get data into a system like Stream Analytics, throughput units for egress are required, which process the same data so the same number is required. The cost of 1 throughput unit can handle 1 MB/second of ingress events and 2 MB/second for egress events.
- **Number of events.** The event hub is billed per event and the price is €0,024 per million events.

Table 3 shows the calculation for the price of cars at 1 signal per second.

*Table 3. Event hub cost 1 per second*

![Table 3: EventHubCost 1 per sec]({{ site.baseurl }}/images/Beijer/EventHubCost1persec.PNG)


Table 3 shows that with 1 event per second and with a payload of 112 bytes (size of signal message), the number of messages per month is 25,272 million. This is calculated with 6 hours peak and 18 hours normal car usage. This results in an MB/second number of 1.8. This means we need 3 ingress throughput units (2 plus one spare for peaks) and 3 egress throughput units. This results in a monthly cost of €668.

As with the Azure Functions description, it will be hard to have 1 signal per second. It is more likely to have 1 signal per 10 seconds to allow the retrieval and processing into the event hub. These results are shown in Table 4.

*Table 4. Event hub cost 1 per 10 seconds*

![Table 4: EventHubCost 1 per 10 sec]({{ site.baseurl }}/images/Beijer/EventHubCost1per10sec.PNG)


This will result in a lower number of messages (2,527 million per month) and lower price. With 1 signal per 10 seconds, the total price will be €87.

### Storage cost ###

The storage of the data introduces some costs. For this calculation, we used the constants shown in Table 5.

*Table 5. Storage cost constants*

![Table 5. Storage Cost constants]({{ site.baseurl }}/images/Beijer/CostConstants.PNG)


Table 5 shows that per month, 2.57 TB of data will be produced. The cost for storage has three parts:

	Storage: 			€8.64 per TB/month
	
	Retrieval: 			€8.64 per TB/month
	
	Write: 				€2,16 per TB/month

In summary, this will result in the following costs for 3 years with 1 signal per second. We assume that data will be removed after 3 years, which means that costs are stable after 3 years.

	Storage cost year 1:			€2,068

	Storage cost year 2: 			€5,271

	Storage cost year 3: 			€8,474

	Storage cost year >3:			€8,474

The cost for retrieving 1 signal per 10 seconds:

	Storage cost year 1:			€206
	
	Storage cost year 2:			€527
	
	Storage cost year 3:		 	€847
	
	Storage cost year >3:			€847

The cost per month for retrieving 1 signal per 10 seconds per car is shown in Table 6.

*Table 6. Storage cost for 1 per 10 seconds*

![Table 6. Storage Cost 1 per 10 sec]({{ site.baseurl }}/images/Beijer/Storagecost1per10sec.PNG)


### Cost of using Stream Analytics ###

Stream Analytics is used in this hackfest to calculate the number of signal values. If Stream Analytics will be used in a production solution, the costs are straightforward:

Usage                                                           |	Price
----------------------------------------------------------------|------------------------------------------
Volume of data processed by the streaming job                   |	€0.0008/GB 
Streaming Unit (blended measure of CPU, memory, throughput)     |	€0.0261/hr 

For the Beijer case, we calculated 2,57 TB per month and 2 MB/second:

	Volume of data processed by the streaming job: 		€2,17 

	2 streaming units: 					€38.90

	Total: 							€41.07

### Total cost ###

The costs of the different solutions are presented here.

**Pull scenario with 1 message per 10 seconds**

Azure Functions (per month):

	Storage cost:			€70 (€847 / 12)

	Azure Functions cost: 		€36

	Event Hub cost: 		€87

	Total cost: 			€193


Service Fabric (per month):

	Storage cost: 			€70 (€847 / 12)

	Service Fabric cost: 		€1,864

	Event Hub cost: 		€87

	Total cost: 			€2,021
	

Azure WebJobs (per month):

	Storage cost: 			€70 (€847 / 12)

	App Web cost: 			€941

	Event Hub cost:			€87

	Total cost: 			€1,098

	

**Push scenario with 1 message per 10 seconds**

The costs for the push scenario will only introduce Event Hub and storage costs:

Cost per month:

	Storage cost: 			€70 (€847 / 12)

	Event Hub cost: 		€87

	Total cost: 			€147


The cost for the servers that can send data to the event hubs at the Beijer customer sites is not included in this report because these are out of scope for Beijer.

Conclusion
----------

The hackfest proved that it is possible to send very large amounts of data to Azure and to receive and process them. Some interesting outcomes from the hackfest:

- The push scenario is much simpler and cheaper for Beijer. This has convinced them to change their architecture from the pull scenario to the push scenario.
- Azure Functions are a more low-cost solution than Service Fabric for single-purpose solutions. In this scenario, the functionality and services are very limited and the added value of Service Fabric is not used.
- Although storage is very low cost, the cost grows when large amounts of data are stored over longer periods. Therefore, it is advisable to process data and store aggregations instead of raw data.

> “The hackfest made it possible for us to work with specialists from Microsoft and to think of more efficient and scalable solutions and designs on Azure.”
>
>— Ronald Beijer, founder of Beijer Automotive

Additional resources
--------------------

- [Beijer Automotive home page](http://www.beijer.com/)

- [GitHub repo](https://github.com/DXNL/BeijerHackFest). This repo contains all the code in Sources folder.

- [Azure Vehicle Telemetry Analytics](https://gallery.cortanaintelligence.com/Solution/Vehicle-Telemetry-Analytics-9)
