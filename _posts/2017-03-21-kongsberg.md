---
layout: post
title: "Using Azure IoT to optimize port operations with Kongsberg"
author: "Olav Tollefsen"
author-link: "https://www.linkedin.com/in/olavtollefsen/"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-05-21
categories: [IoT]
color: "blue"
image: "images/2017-03-21-kongsberg/feat_port-berth-700x406.jpg"
excerpt: During a hackfest with Microsoft, Kongsberg tested an IoT solution that will provide their customers up-to-date data to make better, safer management decisions about loading conditions prior to a vessel's arrival and how much to load while berthed.
language: [English]
verticals: [Transportation & Logistics]
geolocation: [Europe]
#permalink: /<page-title>.html
---

Ports are subject to natural and man-caused conditions that affect the depth of berths and the channel. As a result, the harbor bottom is continually changing, and it changes randomly. Knowing the depth is essential for safe port entry and docking, and to avoid underloading vessels in berths that are actually deeper than believed. Considering that each centimeter of additional draft equates to 150 tons of additional product loaded on board, it is clear to see that accurate, up-to-the minute berth depth data can have significant revenue benefits for both the operating company and the port facility—not to mention the safety and environmental benefits of mitigating the risk of vessel groundings.

During a four-day hackfest with Microsoft, Kongsberg tested out an Internet of Things (IoT) solution, which will provide their customers up-to-date data to make better, safer management decisions about loading prior to a vessel's arrival at port and about how much to load while berthed. This report describes the learnings from the hackfest.

*Kongsberg Berth Depth Monitoring and Reporting System*

![Kongsberg Berth Depth Monitoring and Reporting System]({{ site.baseurl }}/images/2017-03-21-kongsberg/port-berth-700x406.jpg)

The solution prototyped during the hackfest connects the existing on-premises Kongsberg Berth Depth Monitoring and Reporting System to the cloud.

### Key technologies used

During the hackfest, the following technologies were used: 

- An embedded, Linux-based device gathering data from various sensors using code written in C++. The device connects to Microsoft Azure IoT Hub using the MQTT protocol.
- Azure IoT Hub for device management and security, data ingestion from device to cloud, cloud-to-device commands, file upload, and device twins.
- Azure Blob storage for storing uploaded files from the embedded device.
- Azure Stream Analytics for real-time message processing.
- Azure Event Hubs for routing messages to back-end processing.
- Azure Virtual Machines for deploying existing back-end processing of ingested data. This will be migrated to platform as a service (PaaS) components in the next phase.
- The Web Apps feature of Azure App Service for user portal and management of devices.

### Hackfest members

The roles that participated in the hackfest were as follows:

- Kongsberg
  - Project Manager
  - Principal Architect
  - Manager, Disruptive Technologies
- Microsoft
  - Olav Tollefsen ([@olavtollefsen](https://www.linkedin.com/in/olavtollefsen/)), Technical Evangelist
  - Mike Myers (LinkedIn: [mike-myers-b51a664](https://www.linkedin.com/in/mike-myers-b51a664/)), Technical Evangelist

## Customer profile ##

[Kongsberg Gruppen](http://www.kongsberg.com/) is an international technology group that delivers advanced and reliable solutions improving safety, security, and performance in complex operations and under extreme conditions. Kongsberg works with demanding customers in the global defense, maritime, oil and gas, fisheries, and aerospace sectors. Their motto is "We deliver extreme performance for extreme conditions."
 
## Problem statement ##

The current solution for port berth depth monitoring is not connected to the cloud, and the local processing power and storage space is limited. To be able to extend and improve the solution, we would like to explore the use of various Azure cloud-based services.

The challenges during the hackfest were as follows:

- Connect the existing embedded Linux device to Azure IoT Hub in a secure way with minimal changes to the existing device-side code
- Ingest simple sensor data from the device to IoT Hub
- Ingest larger bulk data (point clouds) into Azure storage in a secure way
- Send commands from IoT Hub to the device
- Use IoT Hub device twins with desired/reported properties and tags to configure the device and keep some metadata about the device
- Store and process the ingested data in the cloud using the existing database and code running in a virtual machine (VM); this will be redesigned as PaaS components in the next phase
- Create a website to display the processed data in an existing web-based application framework  
 
## Solution and steps ##

### Connecting the existing solution to Azure IoT Hub

By connecting multiple berth depth monitoring systems to the Azure cloud, Kongsberg will be able to provide a more powerful and more intelligent solution to their customers. The cloud offers limitless computing power to enable more advanced processing of data with higher resolution. Storing more data across multiple ports will also enable advanced analytics and machine learning across the entire data sets so that customers will be able to predict berth conditions both in the port of loading and of unloading. This will allow customers to optimize port operation, which increases profitability, increases safety, and shrinks the environmental footprint of the maritime industry. The device management and security features of IoT Hub will also help increase the security and manageability of the edge devices. 

*Connecting the Port Berth Depth Monitoring System to Azure IoT Hub*

![Conceptual diagram]({{ site.baseurl }}/images/2017-03-21-kongsberg/ConnectToCloud.png)

### Prototype architecture

The architecture for the hackfest was heavily influenced by the need to reuse some of the existing code to be able to quickly implement and test an end-to-end working prototype. The focus of the four days was not to re-architect everything, but to test the most important concepts of Azure IoT Hub and related services. In the next phase, we will work to streamline and re-architect the back-end processing of the ingested data.

*Architecture of the hackfest prototype*

![Architecture diagram]({{ site.baseurl }}/images/2017-03-21-kongsberg/iotarchitecture.png)

### Visualization of port berth depth

Immediately after the sensor data have been ingested into IoT Hub, the data is processed and various forms of visualizations are created and made available for users to view in the portal.

*A 2D plot of the port berth depth*

![2D plot of port berth depth]({{ site.baseurl }}/images/2017-03-21-kongsberg/Graphical2D.png)

*A 3D plot of the port sea bed*

![3D plot of port berth depth]({{ site.baseurl }}/images/2017-03-21-kongsberg/Graphical3D.png)

## Technical delivery ##

### The sensors

The Kongsberg Berth Depth Monitoring Reporting System uses dual-axis sonars to acquire profile data of the berth bottom adjacent to the instrumented section. The frequency of data collection can be defined by user needs—continually, hourly, daily, weekly, or on-demand. The data is then uplinked to the monitoring station using a suitable telemetry link. The result of each scan is a point-cloud representation of the channel bed at scan time. Some of the data is suitable to send as regular messages to IoT Hub in JSON format. The resulting point cloud from a scan is typically uploaded to Azure Blob storage as a complete file.

*Dual-axis sonars*

![Diagrammatic photo of dual-axis sonar units]({{ site.baseurl }}/images/2017-03-21-kongsberg/k-observer-250x340.jpg)

### The IoT client device

The client device used is typically a computing device designed for embedded data-acquisition applications like the Moxxa UC-8100. The UC-8100 is built around a Cortex-A8 RISC processor that has been optimized for use in energy monitoring systems, but is widely applicable to a variety of industrial solutions. With flexible interfacing options, this tiny embedded computer is a reliable and secure gateway for data acquisition and processing at field sites as well as a useful communication platform for many other large-scale deployments.

*The Moxxa UC-8100 embedded computer*

<img alt="Photo of Moxxa UC-8100" src="{{ site.baseurl }}/images/2017-03-21-kongsberg/Moxxa.jpg" width="300">

The programming language used for the client device is C++. To connect the device to Azure IoT Hub, we used the [Azure IoT device SDK for C](https://github.com/azure/azure-iot-sdk-c). We had some initial struggles to get the SDK to build without errors on the target platform using CMake, but because we had a team member with experience in developing the C++ code on the embedded device we were able to get it working. We typically found a relevant sample in the samples folder of the SDK and then stripped the code down to exactly what we needed.

To make as few changes as possible to the existing code running on the client, we created the new code as a separate executable that was invoked by adding a couple of lines to the existing command script. The new code handles the connection and communication with IoT Hub.

### IoT device security

An important part of any IoT scenario is security. The Azure IoT Suite secures devices while they are in the field by providing a unique identity key for each device, which can be used by the IoT infrastructure to communicate with the device while it is in operation. The process is quick and easy to setup. The generated key with a user-selected device ID forms the basis of a token used in all communication between the device and IoT Hub.

IoT Hub access-control policies in the cloud enable activating and disabling any device identity, providing a way to disassociate a device from an IoT deployment when required. This association and disassociation of devices is based on each device identity.

### Messages sent from the device to Azure IoT Hub

Smaller messages in JSON format containing simple sensor values or aggregate information are sent directly through the normal IoT Hub device-to-cloud APIs. The maximum size of such message is currently 256 KB.

*JSON formatted message sent directly to Azure IoT Hub* 

```json
{
	"assetid": "BerthMonitoring_#001",
	"properties": [{
		"property": "Depthraw",
		"doublevalue": 12.3
	}, {
		"property": "Depth",
		"doublevalue": 12.1
	}],
	"timezone": "UTC",
	"timestamp": "2016-10-30 23:00:00"
}
```

### Secure upload of files

In addition to sending ordinary device-to-cloud messages to IoT Hub, we also need to upload larger chunks of data. The sonar sensors creates a rather large 3D point cloud, which we upload as a file to Azure Blob storage. Normally the client would need some king of key or access token to upload files directly to Blob storage. This could have been a security challenge. We would not like to store a master key to the Azure storage account in the device client, and we would have to implement some functionality for uploading files based on shared access signatures (SAS). However, IoT Hub provides good integration for handling doing this through the DeviceClient.UploadToBlobAsync method (and similar approaches using the C SDK).

*Upload a file to Azure Blob storage trough IoT Hub*

```c#
private static async void UploadToBlobAsync(string sourceFilePath, string targetFilename)
{
    Console.WriteLine($"Uploading file: {sourceFilePath}");
    var watch = System.Diagnostics.Stopwatch.StartNew();

    using (var sourceData = new FileStream(sourceFilePath, FileMode.Open))
    {
        await deviceClient.UploadToBlobAsync(targetFilename, sourceData);
    }

    watch.Stop();
    Console.WriteLine($"Upload of file to Blob completed. Time to upload file: {watch.ElapsedMilliseconds}ms\n");
}
```

### Azure IoT Hub file-upload notification

When a file is uploaded to Azure Blob storage through IoT Hub, it is useful to be able to trigger code in the cloud to process the file. The IoT Hub ServiceClient class implements a method for this: GetFileNotificationReceiver. When you finish processing the file, you call a method to indicate that the processing has completed. Otherwise, you would re-process the same file. This ensures that each file gets processed at least once. It's important to design the code that processes the file as an idempotent operation to avoid errors when files are processed multiple times, which could happen due to errors while processing. It's also important to have proper error handling to avoid re-processing the same file over and over again due to hitting the same error each time.

*Getting notification when a file has been uploaded to Azure Blob storage*

```c#
private async static Task ReceiveFileUploadNotificationAsync()
{
    var notificationReceiver = serviceClient.GetFileNotificationReceiver();

    Console.WriteLine("\nReceiving file upload notification from service");
    while (true)
    {
        var fileUploadNotification = await notificationReceiver.ReceiveAsync();
        if (fileUploadNotification == null) continue;

        Console.ForegroundColor = ConsoleColor.Yellow;
        Console.WriteLine("Received file upload noticiation: {0}", string.Join(", ", fileUploadNotification.BlobName));

        // Download the blob to the VM disk. The existing tool does not know how to process blobs
        // The processing of the file will be done by an existing tool in another process
        string blobFilename = Path.GetFileName(fileUploadNotification.BlobName);
        string targetPath = $"{downloadPath}\\{blobFilename}";
        await DownloadBlobToFile(fileUploadNotification.BlobName, targetPath);

        Console.WriteLine($"File downloaded to: {targetPath}");
        Console.ResetColor();

        // We are done with the file
        await notificationReceiver.CompleteAsync(fileUploadNotification);
    }
}
```

### Azure IoT Hub device twins

IoT Hub has a nice feature named *device twins*. For each device, IoT Hub stores a JSON document containing device-state information. Typically, at startup a device sets its properties to default values that are local to the device; then it retrieves the set of desired properties from IoT Hub and overrides the default values if they differ. The device then reports the effective properties and values back to IoT Hub as reported properties. When you want to change a device property, you call the IoT Hub management APIs to set the desired property. The device is notified of the change, the change is made at the device level, and the resulting property is reported back. This ensures that the device-twin metadata remains in sync with the corresponding properties set on the device (as long as the device is online and connected to IoT Hub).

*Azure IoT Hub device twin*

![Diagram of IoT Hub device twin]({{ site.baseurl }}/images/2017-03-21-kongsberg/twin.png)

*C# code showing how to work with IoT Hub device twins from the client device*

```csharp
// To change this while device is running, update the device twin with
// "sensorDataReportIntervalMinutes": 5
static int sensorDataReportIntervalMinutes = 2;

static void Main(string[] args)
{
    // Create the IoT Hub device client instance
    deviceClient = DeviceClient.CreateFromConnectionString(DeviceConnectionString, TransportType.Mqtt);

    deviceClient.SetDesiredPropertyUpdateCallback(OnDesiredPropertyChanged, null);

    SynceDeviceWithDeviceTwin().Wait();

    Console.WriteLine("Press enter to exit...");
    Console.ReadLine();
    Console.WriteLine("Exiting...");
}

private static async Task SynceDeviceWithDeviceTwin()
{
    var twin = await deviceClient.GetTwinAsync();
    TwinCollection desiredProperties = twin.Properties.Desired;

    await UpdateDeviceProperties(desiredProperties);
}

private static async Task OnDesiredPropertyChanged(TwinCollection desiredProperties, object userContext)
{
    await UpdateDeviceProperties(desiredProperties);
}

private static async Task UpdateDeviceProperties(TwinCollection desiredProperties)
{
    // Set properties based on desired properties (from device twin stored in cloud)
    if (desiredProperties.Contains("sensorDataReportIntervalMinutes"))
    {
        sensorDataReportIntervalMinutes = desiredProperties["sensorDataReportIntervalMinutes"];
    }

    // Set reported properties based on actual device settings
    TwinCollection reportedProperties = new TwinCollection();
    reportedProperties["sensorDataReportIntervalMinutes"] = sensorDataReportIntervalMinutes;

    // Update device twin stored in the cloud
    await deviceClient.UpdateReportedPropertiesAsync(reportedProperties);
}
```

To set the desired properties for a given device, one can use the [Device Explorer](https://github.com/Azure/azure-iot-sdk-csharp/tree/master/tools/DeviceExplorer#download) tool. Typically, this functionality would be built into a custom device-management portal using the IoT Hub cloud APIs. Setting the desired properties from the cloud triggers the OnDesiredPropertyChanged method in the connected client device, which performs the changes and reports back to the cloud.

*Set device-twin desired properties for a device using the Device Explorer tool*

![Screen shot of setting properties for an IoT Hub device twin]({{ site.baseurl }}/images/2017-03-21-kongsberg/DeviceTwinSetDesiredProperties.png)

### Receiving messages from Azure IoT Hub from .NET Core

During the last day of the hackfestm we were also able to test receiving messages from IoT Hub using a .NET Core application. Not all Azure IoT libraries are compatible with .NET Core, but this turned out to be quite easy using the EventProcessorHost class, which is found in the Microsoft.Azure.EventHubs.Processor NuGet package. We encountered some minor issues with documentation that did not match Visual Studio 2017 (which no longer uses project.json).

## Conclusion ##

In just three days of working with the proof-of-concept code, we successfully met all the various challenges we had planned. By the end of the hackfest, we had an end-to-end working solution, from data ingestion to visualization. Azure IoT Hub was providing the required functionality, and we were able to connect the embedded Linux-based client device to IoT Hub, with only minor issues related to getting the C++ code from the Azure IoT device SDK for C to compile and build on the target embedded platform.

> "A combination of a great technology stack and excellent mentoring from Microsoft specialists made it possible for us to develop a solution for berth monitoring very fast. The workshop was very productive and much appreciated." —Kongsberg

### Going forward

The focus for the hackfest was to validate the core IoT functionality. The next steps will be to work more on the processing of the data ingested, complete the whole architecture, and move it into a production platform for other sensor-data scenarios. In the near future, the platform will also contain advanced analytics and machine-learning capabilities integrated with the data ingested by IoT devices combined with other data sources.

This video describes the platform.

<iframe width="560" height="315" src="https://www.youtube.com/embed/6rWtTa5hpGQ" frameborder="0" allowfullscreen></iframe>

## Additional resources ##

[Azure IoT Hub Test code samples](https://github.com/olavt/AzureIoTHubTest) is a GitHub repository containing small pieces of sample code that we developed and used to test various concepts during the hackfest. These pieces were then integrated into the overall solution.

### Documentation links

- [Connect your simulated device to your IoT hub using .NET](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-csharp-csharp-getstarted)
- [Microsoft Azure IoT device SDK for C](https://github.com/Azure/azure-iot-sdk-c)
- [Secure your IoT deployment](https://docs.microsoft.com/en-us/azure/iot-suite/iot-suite-security-deployment)
- [Upload files from your simulated device to the cloud with IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-csharp-csharp-file-upload)
- [Understand and use device twins in IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-device-twins)
- [Get started receiving messages with the Event Processor Host in .NET Standard](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-dotnet-standard-getstarted-receive-eph)
