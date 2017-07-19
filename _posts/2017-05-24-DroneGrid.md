---
layout: post
title:  "DroneGrid switches to Azure PaaS to reduce cost and increase scalability"
author: "Benjamin Tokgöz"
author-link: "https://twitter.com/Benn0rs"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2017-07-19
categories: [IoT, Azure App Service]
color: "blue"
image: "images/2017-05-24-DroneGrid/dronegrid-logo-header.png"
excerpt: Microsoft helped DroneGrid redesign their IoT solution and switch the back-end and front-end services to Azure PaaS services to give DroneGrid customers a better experience when using their software.
language: [English]
verticals: ["Agriculture, Forestry & Fishing", Power & Utilities, Retail & Consumer Goods, Hospitality & Travel]
geolocation: [Europe]
---

Microsoft helped DroneGrid redesign their IoT solution and switch the back-end and front-end services to Azure PaaS services to give DroneGrid customers a better experience when using their software.

### Key technologies

- [Microsoft Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
- [Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/)
- [Azure SDK for .NET](https://www.visualstudio.com/vs/azure-tools/)
- [Shared access signature (SAS)](https://docs.microsoft.com/en-us/azure/storage/storage-dotnet-shared-access-signature-part-1)
- [Visual Studio 2017](https://docs.microsoft.com/en-us/visualstudio/welcome-to-visual-studio)
- [Web Apps feature of Azure App Service](https://azure.microsoft.com/en-us/services/app-service/web/)
- [Windows 10 Enterprise](https://www.microsoft.com/en-us/windowsforbusiness/default.aspx)

### Core team

- [Benjamin Tokgöz](https://twitter.com/Benn0rs) – Technical Evangelist, Microsoft
- Ville Rantala – SDE, Partner Catalyst Team, Microsoft
- Maxime Bossens – CTO, DroneGrid

## Customer profile

[DroneGrid](http://www.dronegrid.com/) is a Belgian company that was founded in August 2016. DroneGrid targets specific end-to-end enterprise applications and is active in the energy, construction/mining, and infrastructure sectors.

In their own words:

> "DroneGrid helps enterprises increase operational efficiency by giving them access to accurate, repeatable aerial information. Our enterprise solution allows our customers to focus on what’s important, i.e. working with business-critical data to make better informed decisions. Collecting aerial drone data has never been easier for our customers. Accessible to anyone with a web browser and Internet connection, managing a drone operation is as easy as a few clicks."

## Problem statement

DroneGrid is working on a solution that provides automated drone operation management for customers all over the world. They have automated operations for mining and quarrying, energy, and construction. For example, nearly 60% of the solar panel operator and operations and maintenance (O&M) companies in Belgium are their customers. 

A customer can manage each of their operations through a ReactJS web interface, and select areas that they want automated drones to scan by interacting with and marking lines in a web browser. After their solution was built on virtual machines with frameworks such as RabbitMQ and self-managed databases, DroneGrid wanted to change their solution to a modern, scalable [platform as a service (PaaS)](https://azure.microsoft.com/en-us/overview/what-is-paas/) on Azure to give their own business and customers a higher impact and user experience. (Please note that at this point every DroneGrid virtual machine still runs on Azure.)

The most interesting use case for a docking is on a mining site, where customers want to collect data every single day or even multiple times a day. Currently the customers perform weekly flights through the DroneGrid platform, but with a human drone pilot coming to their site. A mine can be covered by using one or two drones. Because the drone can recharge itself, covering large areas can be done by performing multiple flights.

In the future, the total number of drones managed by the system could easily go up to a few hundred.

## Solution and steps

To support DroneGrid in analyzing, redesigning, and building their solution in Azure, Microsoft took the following steps:

- **Analyzed the current state of their solution** through technical assessment calls.
- Held an IoT and App Service workshop in Munich to **define an optimized and scalable architecture in Azure** and explain some code samples and specifics by building the architecture.

### Current architecture

Before we could start with a solution proposal, we had to understand the current architecture used by DroneGrid. The current state of the DroneGrid customer scenario is shown in the following diagram.

 ![DroneGrid current state]({{ site.baseurl }}/images/2017-05-24-DroneGrid/DroneGridCurrentState.png)

<br/>

A typical DroneGrid customer has at least one object that they want to manage and analyze (to better understand a solar site, for example). In the solar site example, they possibly want to analyze which solar panels have defects. To realize and start an operation like this, they can easily manage their objects by using the DroneGrid web interface that is implemented in ReactJS. They can define an object, initiate an operation to send automated drones to take images of the object, take the drone back to a docking station, and send these images to an analyzing processing partner. 

About 50% to 60% of the cost of a drone operation is the drone pilot. If a customer does more than five or six flights a month, it becomes cheaper to install a docking station. Docking stations are leased to the customer on a monthly basis. 

The drones run on DJI autopilots. DroneGrid does not build the drone software or hardware, but adds a module that connects into the API/SDK of the flight controller. In the current prototype, a [Raspberry Pi 3](https://www.raspberrypi.org/) is added as a companion computer running Linux. The processing partner analyzes the received images and sends them back to the DroneGrid database. DroneGrid is then able to display the current states of the object and any possible broken panels and their position.

### Proposed architecture

In this early state, DroneGrid’s solution worked pretty well; however, they determined that separating the individual software components in PaaS, especially the IoT component and the web services, could reduce costs, increase scalability, and make it easier to manage new features and extensions that would be worthwhile in the future.

During the first technical assessment calls, we proposed the solution shown in the following diagram as a starting point.

 ![DroneGrid first design approach]({{ site.baseurl }}/images/2017-05-24-DroneGrid/DroneGridTargetState.png)

<br/>

The main goal in this first approach was to separate each component of DroneGrid’s solution into its own PaaS service on Azure. IoT Hub as a component for communication with the drone devices is a critical part of the software, because every request from and to the drones is managed by this service. Using Azure Functions, metadata from IoT Hub is directly stored into the PostgreSQL database through an Event Hubs trigger. With a solution like this, DroneGrid is able to focus more on their own business logic and the important parts of the UI. 

Other important resources are Azure Blob storage for shared images, and the Web Apps feature of Azure App Service as a service for all control elements from the user's and the administrator's perspective. Regarding storage, it's possible for DroneGrid to use a dynamically generated SAS token to easily share data with their customers.

Furthermore, a future goal could be for DroneGrid to handle the image processing instead of employing a third-party analyzer. In this case, we decided that it's still too early at this point to integrate intelligence services for image analytics.

## Technical delivery

We started the project with a few technical assessment calls with technical experts from Microsoft and DroneGrid to analyze the current state of the solution and plan a new PaaS architecture. Afterwards, Microsoft and DroneGrid came together at a workshop at the Microsoft headquarters in Munich, Germany to code and work on unresolved challenges.

As a result of the workshop, DroneGrid gained more technical knowledge about IoT services and shared storage. Furthermore, Microsoft and DroneGrid collaborated to create code samples for each approach to help DroneGrid in their development.

In the remainder of this case study, we'll describe the topics we worked on together in the workshop, along with the learnings and corresponding code snippets.

The following image shows the first architecture approach that we worked on together at the workshop in Munich. As you can see, it’s quite similar to the first approach we used during the technical assessment calls. Because it was possible to upload files directly from IoT Hub, we no longer needed to use Azure Stream Analytics in this scenario. 

 ![DroneGrid workshop design]({{ site.baseurl }}/images/2017-05-24-DroneGrid/MucArchitecture.png)

<br/>

### Data transmission

There are two types of data transmission:

- **During flight**: Only telemetry data is sent (over a long-range radio connection), which includes status, GPS location, altitude, velocity, and battery level. The frequency is once every second.
- **After flight, during charging**: Mission data is transferred over a fast 2.4 GHz connection. This data includes pictures taken by the camera. A thirty-minute mission could easily gather up to 2 GB of images. 

### Code samples

#### Uploading files

The first coding challenge was to handle file uploads from devices to IoT Hub with Python. At this point I would like to give a special thanks to Ville Rantala, who demonstrated a solution to help DroneGrid implement an IoT Hub connection from their drone stations. 

The following code snippet represents a sample to connect from a device to IoT Hub and enable uploading blobs.

```
	PROTOCOL = IoTHubTransportProvider.MQTT

	CONNECTION_STRING = "[Device Connection String]"  

	client = None  


	// print commands show how to get information from the message	  
	def receive_message_callback(message, counter):  

		global RECEIVE_CALLBACKS  

		message_buffer = message.get_bytearray()  

		size = len(message_buffer)  

	    print("Received Message [%d]:" % counter)  

	    print("    Data: <<<%s>>> & Size=%d" % (message_buffer[:size].decode('utf-8'), size))  

	    map_properties = message.properties()  

	    key_value_pair = map_properties.get_internals()  

	    print("    Properties: %s" % key_value_pair)  

	    counter += 1  

	    RECEIVE_CALLBACKS += 1  

	    print("    Total calls received: %d" % RECEIVE_CALLBACKS)  

	    return IoTHubMessageDispositionResult.ACCEPTED  


	def send_confirmation_callback(message, result, user_context):  

	    global SEND_CALLBACKS  

	    print("Confirmation[%d] received for message with result = %s" % (user_context, result))  

	    map_properties = message.properties()  

	    print("    message_id: %s" % message.message_id)  

	    print("    correlation_id: %s" % message.correlation_id)  

	    key_value_pair = map_properties.get_internals()  

	    print("    Properties: %s" % key_value_pair)  

	    SEND_CALLBACKS += 1  

	    print("    Total calls confirmed: %d" % SEND_CALLBACKS)  


	def device_twin_callback(update_state, payload, user_context):  

	    global TWIN_CALLBACKS  

	    print("\nTwin callback called with:\nupdateStatus = %s\npayload = %s\ncontext = %s" % (update_state, payload, user_context))  

	    TWIN_CALLBACKS += 1  

	    print("Total calls confirmed: %d\n" % TWIN_CALLBACKS)  



	def send_reported_state_callback(status_code, user_context):  

	    global SEND_REPORTED_STATE_CALLBACKS  

	    print("Confirmation for reported state received with:\nstatus_code = [%d]\ncontext = %s" % (status_code, user_context))  

	    SEND_REPORTED_STATE_CALLBACKS += 1  

	    print("    Total calls confirmed: %d" % SEND_REPORTED_STATE_CALLBACKS)  



	def device_method_callback(method_name, payload, user_context):  

	    global METHOD_CALLBACKS  

	    print("\nMethod callback called with:\nmethodName = %s\npayload = %s\ncontext = %s" % (method_name, payload, user_context))  

	    METHOD_CALLBACKS += 1  

	    print("Total calls confirmed: %d\n" % METHOD_CALLBACKS)  

	    device_method_return_value = DeviceMethodReturnValue()  

	    device_method_return_value.response = "{ \"Response\": \"This is the response from the device\" }"  

	    device_method_return_value.status = 200  

	    return device_method_return_value  



	def blob_upload_conf_callback(result, user_context):  

	    global BLOB_CALLBACKS  

	    print("Blob upload confirmation[%s] received for message with result = %s" % (user_context, result))  

	    BLOB_CALLBACKS += 1  

	    print("    Total calls confirmed: %d" % BLOB_CALLBACKS)  

	    message_text = "{\"filename\": \"%s\",\"status\": \"complete\"}" % user_context  

	    message = IoTHubMessage(message_text)  

	    client.send_event_async(message, send_confirmation_callback, 1)  

	//client initialization
	def iothub_client_init():

	    global client

	    # prepare iothub client

	    client = IoTHubClient(CONNECTION_STRING, PROTOCOL)

	    if client.protocol == IoTHubTransportProvider.HTTP:

		client.set_option("timeout", TIMEOUT)

		client.set_option("MinimumPollingTime", MINIMUM_POLLING_TIME)

	    # set the time until a message times out

	    client.set_option("messageTimeout", MESSAGE_TIMEOUT)

	    # to enable MQTT logging set to 1

	    if client.protocol == IoTHubTransportProvider.MQTT:

		client.set_option("logtrace", 0)

	    client.set_message_callback(

		receive_message_callback, RECEIVE_CONTEXT)

	    if client.protocol == IoTHubTransportProvider.MQTT or client.protocol == IoTHubTransportProvider.MQTT_WS:

		client.set_device_twin_callback(

		    device_twin_callback, TWIN_CONTEXT)

		client.set_device_method_callback(

		    device_method_callback, METHOD_CONTEXT)

	    return client

```

<br/>

#### Storing device metadata 

The second code snippet represents a way to store device metadata via IoT Hub to a PostgreSQL database by using an Azure JavaScript function.

```
	var Pool = require('pg').Pool;  

	var config = require('./config.js');  

	var pool = new Pool(config);  

	module.exports = function (context, event) {  

	  context.log(context.bindingData);  

	  context.log(event);  	  

	  pool.connect()  

	    .then((client) => {  

	      client.query('INSERT INTO events(event) VALUES($1)', [JSON.stringify(event)])  

		.then((res) => {  

		  context.log('Successfully inserted');  

		  client.release();  

		  context.done();    

		})  

		.catch((err) => {  

		  client.release();  

		  context.log(err);  

		  context.done();  

		});  

	    })  

	    .catch((err) => {  

	      context.log(err);  

	      context.done();  

	    });  

	};  
```

<br/>

#### Uploading and downloading files by using a SAS token

Furthermore, we discussed the possibility of uploading and downloading files from Blob storage by using a SAS token. This is important for the image processing partner and also for a user who wants to upload files manually.

The following code snippet represents a way to upload and download files by using a SAS token from Blob storage.

```
	public LinkedList<CloudBlockBlob> getBlobList(CloudBlobContainer container)  
	{  	  
	       LinkedList<CloudBlockBlob> tempBlobList = new LinkedList<CloudBlockBlob>();  

	       foreach (IListBlobItem item in container.ListBlobs(null, false))  

	       {   

		   if (item.GetType() == typeof(CloudBlockBlob))  

		   {  

			CloudBlockBlob blob = (CloudBlockBlob)item;  

			tempBlobList.AddLast(blob);  

		   }  

		}  

		return tempBlobList;  

	 }  

	public void downloadBlockBlob(CloudBlobContainer container, string blockblobname)
	{  

		    CloudBlockBlob blockBlob = container.GetBlockBlobReference(blockblobname);  

		using (var fileStream = System.IO.File.OpenWrite(System.AppDomain.CurrentDomain.BaseDirectory + "\\" + blockblobname))  

		{  

		    blockBlob.DownloadToStream(fileStream);  

		}  

		Console.WriteLine(blockBlob.Name + " downloaded");  

	}  


	public void uploadBlockBlobManipulated(CloudBlobContainer container, string blockblobnname) 
	{  

		//manipulateFile  

		string newPrefix = "new-";   

		CloudBlockBlob blockBlob = container.GetBlockBlobReference(newPrefix + blockblobnname);  

		using (var fileStream = System.IO.File.OpenRead(System.AppDomain.CurrentDomain.BaseDirectory + "\\" +blockblobnname))  

		{  

		    blockBlob.UploadFromStream(fileStream);  

		}  

		Console.WriteLine(blockBlob.Name + " uploaded");  


	}   

```

<br/>

#### Implementing a resumable upload

We also discussed implementing a resumable upload to Blob storage. After the workshop, DroneGrid decided to use [Fine Uploader](https://fineuploader.com/) as a solution that is available on the market today. The code for a resumable upload is located in this [AzureBlobUploadJS repo](https://github.com/benjamintokgoez/AzureBlobUploadJS).

#### Deploying the web app

The last subject of discussion at the workshop was a solution for an easy and fast deployment from an existing web app on GitHub to Web Apps on Azure App Service. We chose to use the [Microsoft Azure portal](https://azure.microsoft.com/en-us/features/azure-portal/) to deliver the web app from GitHub. For this reason, there is no sample snippet at this point.

### Solution development process

In the following two months, DroneGrid decided to develop their redesigned solution on their own. During this development process, DroneGrid faced a few challenges and focused mainly on the implementation of the web app service and the UI.

The following diagram shows the new and current architecture of DroneGrid. They are now using PaaS services on Azure for each of their components. During the next few months, they plan to integrate IoT Hub for communication with their drones and drone docking stations.

All communication between the drone, docking station, and the cloud is secured. Security (from both a hardware and software perspective) is not yet addressed specifically in the current prototype; development on this is planned in the coming months. 

 ![DroneGrid current state after workshop]({{ site.baseurl }}/images/2017-05-24-DroneGrid/newCurrentArchitecture.png)

<br/>

## Conclusion

In DroneGrid's project, Microsoft helped to successfully implement a PaaS solution on Azure. In addition, we helped DroneGrid get a better understanding of the Azure IoT approach. After the workshop, DroneGrid was able to implement their code. The only issue was a time constraint, which is the reason for the currently missing IoT Hub service.

In the end, it was a great experience to work with DroneGrid on their solution, and we are looking forward to working on future projects together.

Finally, a quote from DroneGrid after our workshop:

> "It was great to work with Microsoft on a new architecture on Azure. We learned a lot and hope to work together again in the future."

## Additional resources

- [AzureDownloadUploadClient repo](https://github.com/benjamintokgoez/AzureDownloadUploadClient)
- [AzureBlobUploadJS repo](https://github.com/benjamintokgoez/AzureBlobUploadJS)
- [Postgresql-function repo](https://github.com/vjrantal/postgresql-function)
- [Explore Azure IoT Hub documentation](https://docs.microsoft.com/en-us/azure/iot-hub/)
- [Find IoT devices and starter kits: Azure IoT device catalog](https://catalog.azureiotsuite.com/kits)
- [Try any Azure services for free: Create your free Azure account today](https://azure.microsoft.com/en-us/free/)
- [Check out a curated collection of IoT learning resources: Microsoft Technical Community Content](https://github.com/Microsoft/TechnicalCommunityContent/tree/master/IoT) on GitHub
- [Read more IoT-focused technical case studies (like this one)](https://microsoft.github.io/techcasestudies/#technology=IoT&sortBy=featured)

