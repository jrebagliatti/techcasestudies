---
layout: post
title: "Building a connected bat IoT solution with Future Technologies in Sport"
author: "James Sturtevant, Susan Hinton"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-04-17
categories: [IoT]
color: "blue"
image: "images/FTIS/feat_FTIS1.jpg"
excerpt: Microsoft joined Future Technologies in Sport, Inc (FTIS) to develop an IoT solution that reduces latency in gathering feedback for both technique and performance during practice sessions for sporting professionals.
language: [English]
verticals: [Entertainment]
geolocation: [North America]
#permalink: /<page-title>.html
---

Microsoft and Future Technologies in Sport, Inc (FTIS) jointly developed an IoT solution to gather technique and performance feedback and reduce latency during batting professionals' practice sessions.

FTIS uses a sensor-enabled cricket bat connected via Bluetooth to an iOS companion app to send messages to Azure IoT Hub. The Azure IoT Hub is connected to an Azure Stream Analytics job that processes the sensor data in real-time. This results in low latency feedback for both the sports professional and the coach, allowing both parties to quickly and efficiently observe their performance after every hit.

![FTIS showing their sensor enabled bat]({{ site.baseurl }}/images/FTIS/FTIS1.jpg)


![FTIS working with Microsoft]({{ site.baseurl }}/images/FTIS/FTIS2.jpg)


The team included the following:

+ **Jaco Pretorius** – Co-Founder and Mechanical Engineer, Future Technologies in Sport, Inc
+ **James Fry** – Co-Founder and CEO, Future Technologies in Sport, Inc
+ **Eric Bodnar** – Lead Developer, Future Technologies in Sport, Inc
+ **[James Sturtevant](https://twitter.com/Aspenwilder)** – Senior Technical Evangelist, Microsoft
+ **[Susan Hinton](https://twitter.com/noopkat)** – Technical Evangelist, Microsoft

## Customer profile ##

Future Technologies in Sport, Inc (FTIS) is transforming coaching and player performance, as well as umpiring and audience engagement in cricket and other batting sports, via their proprietary sensor and mobile app based solutions.

FTIS has the only technology that can reliably, accurately, and affordably deliver:

+ Power Hitting Levels
+ Ball Location on Bat
+ Bat Twist
+ Bat Swing Speed and Plane
+ Bat Orientation and Bat Angle

Independent research indicates that the ability to measure  these variables can enhance batting performance.

The sensors are integrated into the bat; a Bluetooth device on the bat transmits sensor data to the cloud. The data will be distributed to apps for:

+ Coaching and Performance
+ Broadcaster Audience Engagement
+ Officiating

FTIS is collaborating with a leading international cricket team on an R+D partnership that will enable their elite players to understand how their Power Hitting compares to their peers and what variables are contributing to their results.

The program is a continuation of the relationship that FTIS's founders built when the International Cricket Council's (ICC) tested the cricket technologies used by the Decision Review System (DRS). FTIS's founders were the principal investigators in the [MIT led program](http://www.espncricinfo.com/ci-icc/content/story/1022261.html).

## Problem statement ##

In the current environment, giving cricket players immediate hitting stats feedback is an involved process. Sensors must be placed on the batsman and expensive infra-red cameras must be set up in the batting test location. Future Technologies in Sport solved this problem with an easily installable sensor that collects data metrics on the swing.

The sensor collects:

+ Power Hitting Levels
+ Ball Location on Bat
+ Bat Twist
+ Bat Swing Speed and Plane
+ Bat Orientation and Bat Angle

The current prototype collects sensor data and transmits it to a specialized app running on an iOS device. Once the data is collected, the prototype emails the data to a user, who then runs it through FTIS' proprietary algorithms that returns a variety of metrics, including where the ball hit the bat.

The team wants to use Azure IoT to turn this prototype into a solution that will provide feedback to the coach and player within seconds, along with storing data for future analysis.

> "We spent two productive days with Microsoft building the core infrastructure for our cloud solution. The Azure platform is robust, intuitive, secure and scalable and will allow us to bring our unique smart product to market with confidence." 
>
>—James Fry, CEO Future Technologies in Sport

## Solution and steps ##

Future Technologies in Sport and Microsoft teamed up to create a proof of concept (POC) with Microsoft Azure services that would collect the sensor data from the iOS companion app.

The POC had the following success steps:

1. Upload sensor data to the Azure IoT Hub through the iOS companion app
2. Process data through Azure Stream Analytics for initial processing
3. Store raw data in Azure blob storage. This raw data can then be opened up for processing by third parties.
4. Run the data through FTIS's proprietary algorithms application. For the POC, the the algorithms were treated as a ‘black box', with an Azure Function App set up in its place to mock out this step.
5. After the data is "processed" through the Azure Function App, the results will be pushed back to the iOS app so the coach can immediately give feedback to the player.

The solution was developed over the course of a few days at a hackfest held at the Microsoft NERD office in Boston, Massachusetts.

The overall architecture is as follows:

![FTIS arch diagram]({{ site.baseurl }}/images/FTIS/FTIS-arch-diagram.png)


### Register and send data from iOS ###

Each mobile device running the iOS app needs to be registered with the IoT Hub. If there is a client controlled device (like the iOS-controlled companion app in this scenario), we leverage an API to abstract the connection to the IoT Hub so there are no hard coded connection strings in the source code. We also use a [token service](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security#custom-device-authentication) to leverage the strong client authorization to determine if the user should be granted IoT Hub access. To access the [token service](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security#custom-device-authentication):

1. The user logs into the iOS app.
2. The application makes a request to a secured endpoint to retrieve the SAS token to connect to the IoT Hub.
3. If the device is not registered, the API endpoint makes a call to IoT Hub to register the device.
4. Once a device is registered, the API endpoint generates a SAS token for the client device.
5. The client device can then use the SAS token to make authorized requests to the IoT Hub.

![token service flow]({{ site.baseurl }}/images/FTIS/ftis-tokenservice.png)

We set up an Azure Function so the POC can register and supply [SAS tokens](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security#security-tokens). Devices can use the tokens to connect with the IoT Hub to send sensor data to FTIS's algorithms and long term storage. FTIS will integrate the registration code into the existing secured API.  

**Note:** the Azure Function has a key that secures the endpoint. In the prototype version, the key is in the source code. In the production version, the key will be behind a secured API endpoint (as described above).

Each SAS token returned is scoped so the specific device can only send data to Azure IoT Hub; it cannot manage the device registry. Azure IoT Hub can also disable individual devices via the Management Portal if a device is compromised. 

> "Building in 'security-from-the-start' will save us a lot of headaches in future scale up" 
>
>—Jaco Pretorius, co-founder FTIS

The C# Azure Function code for device registration:

```csharp
using System;
using System.Net;
using Microsoft.Azure.Devices;
using System.Configuration;
using Microsoft.Azure.Devices.Common.Security;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info("C# HTTP trigger function processed a request.");

    // Get request body
    dynamic data = await req.Content.ReadAsAsync<object>();

    // Set name to query string or body data88
    string name = data?.name;
   
    if (name == null)
        return req.CreateResponse(HttpStatusCode.BadRequest, "Please pass a device name in the request body");

    var connectionString = ConfigurationManager.AppSettings["iotregistry"];
    RegistryManager manager = RegistryManager.CreateFromConnectionString(connectionString);
    
    Device device = await manager.GetDeviceAsync(name);
    if (device == null){
        try
        {
            log.Info($"Adding Device {name}");
            device = await manager.AddDeviceAsync(new Device(name));
        }
        catch (Exception ex)
        {
            log.Info($"error adding device {ex.Message}");
            return req.CreateResponse(HttpStatusCode.BadRequest, "Unable to register device.");
        }
    }

    var sasBuilder = new SharedAccessSignatureBuilder()
    {
        Key = device.Authentication.SymmetricKey.PrimaryKey,
        Target = String.Format("{0}/devices/{1}", "SmartbatPilot.azure-devices.net", WebUtility.UrlEncode(device.Id)),
        TimeToLive = TimeSpan.FromHours(2)
    };

    var response = new {SASToken= sasBuilder.ToSignature()};

    return req.CreateResponse(HttpStatusCode.OK, response);
}
```

To send sensor data to IoT Hub for processing, the mobile device uses the iOS companion app and the [MQTT protocol](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-mqtt-support). There is no IoT Hub SDK for the iOS platform; the MQTT protocol was chosen because of existing [iOS library support](https://github.com/emqtt/CocoaMQTT). 

Both the app and the code additions were written in Objective-C. Here's an excerpt of the Objective-C code to connect to IoT Hub from the iOS companion app:

```objectivec
-(void) CallRegistrationService {
    NSString *urlPath = [NSString stringWithFormat:@"https://%@.azurewebsites.net/api/registerdevice?code=%@", azureFunctionName, azureFunctionCode];
    
    NSURL *url = [NSURL URLWithString:urlPath];
    NSDictionary *dictionary = @{ @"name" : deviceName };
    
    
    NSData *JSONData = [NSJSONSerialization dataWithJSONObject:dictionary
                                                       options:0
                                                         error:nil];
    
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    request.HTTPMethod = @"POST";
    request.HTTPBody = JSONData;
    [request addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    
    NSURLSessionDataTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request
                                                                 completionHandler:^(NSData *data,
                                                                                     NSURLResponse *response,
                                                                                     NSError *error)
                                  {
                                      if (!error)
                                      {
                                          NSLog(@"Status code: %li", (long)((NSHTTPURLResponse *)response).statusCode);
                                          NSString * text = [[NSString alloc] initWithData: data encoding: NSUTF8StringEncoding];
                                          NSLog(@"%@", text);
                                          
                                          
                                          NSDictionary *json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
                                          NSLog(@"%@", json);
                                          sasToken = json[@"SASToken"];
                                          
                                          NSLog(@"%@", sasToken);
                                          [self ConnectToHub];
                                      }
                                      else
                                      {
                                          NSLog(@"Error: %@", error.localizedDescription);
                                      }
                                  }];
    
    [task resume];
}

- (IBAction)sendMessage:(id)sender {
    NSString *topic = [NSString stringWithFormat:@"devices/%@/messages/events/", deviceName];

    [mqtt publish:topic withString: defualtPayload qos:CocoaMQTTQOSQos1 retained:false dup:false];
    
    NSLog(@"send");
}

-(void) ConnectToHub {
    NSString *host = [NSString stringWithFormat:@"%@.azure-devices.net", iotHubName];
    NSString *username = [NSString stringWithFormat:@"%@.azure-devices.net/%@", iotHubName, deviceName];
    
    mqtt = [[CocoaMQTT alloc]  initWithClientID:deviceName host:host port:8883];
    mqtt.username = username;
    mqtt.password = sasToken;
    mqtt.keepAlive = 60;
    mqtt.enableSSL = true;
    mqtt.delegate = self;
    
    [mqtt connect];
    NSLog(@"connect sent");
}
```

### Processing in Azure Stream Analytics ###

Every time the bat hits the ball, the iOS companion app sends a JSON data object containing the captured sensor data to the Azure IoT Hub, where an Azure Stream Analytics job processes the data. The data has a device ID value the rest of the system uses to determine which user the device belongs to.

The Azure Stream Analytics (ASA) job has three queries:

1. A raw data query for blob storage
2. A raw data query for FTIS algorithm processing via an Azure Function App
3. A flattened query for direct output to PowerBI

> "Real time data processing, storage and communication happens seamlessly on the Azure platform – it was a lot easier to implement than I suspected"
>
>—Jaco Pretorius, co-founder FTIS

The Azure Stream Analytics job diagram:

![ASA job diagram]({{ site.baseurl }}/images/FTIS/FTIS-ASA-job-diagram.png)


The raw data is stored in Blob Storage using a simple query:

```SQL
-- Raw data

SELECT * INTO [blobOutput] FROM [IoTHub]
```

The raw data is flattened via a second, more in-depth query. The flattened data is then ingested by PowerBI. PowerBI parses data more easily when it doesn't contain deeply nested properties and arrays. 

The final query:

```sql
-- Flattened acceleration, orientation, and vibration data

SELECT 
       A.device, 
       A.acceleration.x as accelerationX,
       A.acceleration.y as accelerationY,
       A.acceleration.z as accelerationZ,
       A.note,
       A.vibration.center as vibrationCenter,
       A.vibration.toe as vibrationToe,
       A.vibration.shoulder as vibrationShoulder,
       A.temperature,
       A.orientation.x as orientationX,
       A.orientation.y as orientationY,
       A.orientation.z as orientationZ,
       A.name,
       A.[user],
       A.EventProcessedUtcTime,
       A.PartitionId,
       A.EventEnqueuedUtcTime,
       A.IoTHub,
       A.ConnectionDeviceId,
       A.ConnectionDeviceGenerationId,
       A.EnqueuedTime,
       A.StreamId
INTO
    [PowerBI]
FROM
    [IoTHub] as A

```

## Process data and send to device ##

The data is passed from Azure Stream Analytics to a Azure Function that processes the data and sends it back to the device:

```csharp
public async static Task Run(string myEventHubMessage, ICollector<PushDownRes> outputTable, TraceWriter log)
{
    var parsedMessage = JsonConvert.DeserializeObject<BatData>(myEventHubMessage);
    log.Info($"device id: {parsedMessage.device}");

    var connnectionString = ConfigurationManager.AppSettings["iotservice"];
    var serviceClient = ServiceClient.CreateFromConnectionString(connnectionString);

    //custom FTIS Processing here
    var Result = new PushDownResult();

    //push processed data to table storage
    outputTable.Add(Result);

    var ResultString = JsonConvert.SerializeObject(Result);
    var commandMessage = new Message(Encoding.ASCII.GetBytes(ResultString));
    
    // send data back to Device
    log.Info($"sending message {parsedMessage.IoTHub.ConnectionDeviceId}");
    await serviceClient.SendAsync(parsedMessage.IoTHub.ConnectionDeviceId, commandMessage);
}
```

Once the mobile device receives the data, it can be displayed for the coach to review:

![mobile app after data is processed]({{ site.baseurl }}/images/FTIS/ftis-mobileapp.png)


## Conclusion ##

The proof of concept was a success; FTIS is working to complete the iOS companion app and integrate their algorithms into the final product. The entire solution is expected to be rolled out as part of a pilot program with selected players and coaches. The feedback they receive will be used to improve the offering before it is rolled out to a wider clientele.

> "When you are setting out to transform a sport, you need a technology platform that can grow and adapt to your changing business plan. Microsoft Azure has quickly shown us it can deliver on our needs now and in the future."  
>
>—Jaco Pretorius, co-founder FTIS

### General lessons 

Tailoring each output's separate query within Azure Stream Analytics makes the data easier to ingest, especially for PowerBI. The sensor data returned from each device is complex and nested, so flattening some of the JSON properties back to the top level was beneficial when visualizing the resulting data within PowerBI.

Producing a workable code example for connecting via MQTT to Azure IoT Hub using Objective-C was extremely valuable as there were no existing Objective-C examples or documentation to use for reference.  It also [resulted in improvements](https://github.com/emqtt/CocoaMQTT/pull/127) to an existing and widely used MQTT library in the iOS ecosystem.

We can now share this knowledge so you can successfully integrate with Azure IoT Hub. Here are two samples:

- [Connect to IoT Hub with Objective-C](https://github.com/jsturtevant/ios-iothub-objectivec)
- [Connect IoT Hub with Swift](https://github.com/jsturtevant/ios-iothub)

### Opportunities going forward ###

FTIS plans to integrate a Power BI dashboard as part of their product offering. Visualizing player data over extended periods of time will be a crucial step in studying and learning about the effectiveness of the various prescriptive advice and coaching techniques currently put into practice within the cricket industry.

FTIS is also planning to consult with Azure experts within Microsoft, to fully integrate their data algorithms into the real-time feedback solution as part of the final product.

> "The ability to transform the raw data into usable information on the cloud and deliver it back to a mobile device is a step change for our offering." 
>
>—Jaco Pretorius, co-founder FTIS

## Additional resources ##

As the team developed the solution we came across several key resources:

- The [CocoaMQTT Library](https://github.com/emqtt/CocoaMQTT) enables iOS app to connect to IoT Hub
- Documentation that helped understand how to [connect directly over MQTT](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-mqtt-support#using-the-mqtt-protocol-directly)
- The [MyDriving sample](https://github.com/Azure-Samples/MyDriving) to learn how to use Mobile devices as IoT gateways. [DeviceProvisionHandler.cs](https://github.com/Azure-Samples/MyDriving/blob/master/src/MobileApps/MyDriving/MyDriving.AzureClient/DeviceProvisionHandler.cs) is the best example
- The documentation on [creating security tokens](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security) and [Token Service pattern](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-security#custom-device-authentication)
