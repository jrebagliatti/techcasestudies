---
layout: post
title:  "Istobal: Cleaning and caring for vehicles using Azure IoT"
author: "Gorka Madariaga"
author-link: "http://twitter.com/gk_8"
#author-image: "{{ site.baseurl }}/images/authors/gorkma.jpg"
date:   2017-07-06
categories: IoT
color: "blue"
image: "images/istobal/istobal1-tile.png"
excerpt: With the power of Azure IoT, Istobal can implement a solution to monitor supplies at their car-washing machines. The telemetry they get from their machines can help them save on maintenance and offer better service to their customers. 
language: English
verticals: [Professional Services]
geolocation: [Europe]
published: false
---


![Istobal Logo]({{ site.baseurl }}/images/istobal/logo-istobal.png)


Istobal and Microsoft teamed up in a week-long hackfest in Madrid, Spain, to add the power of **Azure IoT** to Istobal's car-washing solutions. The telemetry they will get from their machines will help them save costs on maintenance and offer a far better service to their customers. 

Istobal also found that the lessons and technologies learned from the hackfest will add great value to many of the other projects they are currently developing. 

This article provides a summary of the hackfest along with technologies used and observations made.

### Key technologies used

| Data ingestion          | Data processing         | Visualization & decision making  |
| ----------------------- | ----------------------- | --------------------------------- |
| Azure IoT Edge          | Azure Stream Analytics  | Power BI                          |
| Azure IoT Hub           | Azure Functions         | Azure Machine Learning Studio     |
| Azure Cosmos DB         |                         |                                   |

### DevOps technologies

- Microsoft Visual Studio 2017
- Microsoft Visual Studio Team Services
  - Project management
  - Team Foundation Server
  - Git
  - Continuous integration
- N-Layered domain driven design architecture
- Unit testing

![M'START Rollover]({{ site.baseurl }}/images/istobal/istobal1.png)


## Project team

| Member            | Company   | Title                           |
| ----------------- | --------- | ------------------------------- |
| Andrés Amát       | Istobal   | Project Consultant              |
| Salvador Montrull | Istobal   | R&D Engineer                    |
| Pedro Dias        | Microsoft | Technical Evangelist            |
| Pablo Perla       | Microsoft | Modern Apps Solution Architect  |
| Gorka Madariaga   | Microsoft | Technical Evangelist            |


## Company profile

[Istobal](http://www.istobal.com/usa/) is a Spanish company founded in 1950. It initially focused on manufacturing greasing units and then on automotive lifts for repair shops. Later it developed the first-ever all Spanish-built car-wash machine. Since then it has become an international brand with a presence in more than 60 countries and with more than 600 employees, having vehicle care as its brand focus and selling more than 5,000 car-wash machines per year in more than 75 countries. 

With a worldwide network of distributors, seven subsidiaries, two assembly plants in Europe, and two subsidiaries and assembly plants in the United States and Brazil, Istobal is currently positioned as a **leading company in the design, manufacture, and marketing of wash solutions for the automotive sector**.

## Problem statement

Istobal approached us with a desire to be more **proactive in handling the chemicals used in car-wash stations around the globe**. Maintaining a service team that travels to every station to monitor values and refill the products is very expensive, and having the clients call in because a car-wash machine is out of chemicals is even more costly. Istobal wanted to learn how to leverage the power of cloud-based IoT solutions to **monitor the chemistry levels in current installations** and also to see what insights they could get with Azure Machine Learning, helping them to predict these levels.

<img alt="Chemistry containers" src="{{ site.baseurl }}/images/istobal/istobal2.png" width="500">

<br/>

Istobal wants to adopt a new full maintenance service for customers, including the refill of the chemicals that are used in every washing program run by the machine. With each program, consumption of different chemicals will be different as well, so Istobal was very interested in getting as much insight as possible into the program selection and consumption of each chemical on each program. That way the maintenance operation can be more predictable and they can be better prepared when the time comes. Another interesting point is to analyze the impact of weather conditions on the workload of the machines, the program selection, and hence the chemical consumption.

## Solution description

Istobal's washing halls contain various devices that run the washing sequences within a program. These devices communicate among each other using different protocols, such as PROFIBUS and other proprietary protocols. The original idea was to start implementing Azure IoT Edge (formerly known as Azure IoT Gateway). However, the lack of protocol support for these forced us to consider alternatives. As we struggled with the idea of setting up a gateway, we decided to work with a device simulator (using a console application) and focus on the rest of the telemetry chain in order to produce a near-complete end-to-end solution, with the ultimate goal of teaching as much as possible to Istobal regarding Microsoft technologies, services, and solutions.

The plan for Istobal, moving forward, is to look further into their options for gathering telemetry from the devices, so they can implement a final solution with the lessons learned from the hackfest and implement it on their washing stations.

### Visual Studio Team Services

Istobal already had a lot of experience working with Visual Studio Team Services, but they hadn't started to use all of its capabilities:

- Continuous integration builds to automate deployment activities.
- Better commit messages to improve teamwork and collaboration.
- Exploring Git and its branching system.

### DevOps-driven approach using N-Layered DDD architecture

We took advantage of our time during the hackfest to give the Istobal team a refresh on some coding best practices that would help us during the hackfest in order to produce a cleaner code for the solution, as well as the parallelization of coding tasks during the hackfest, because every piece would be independent. With this approach, we enabled Istobal to be able to change any piece of the system (that is, they could easily change the storage option from Azure Cosmos DB to Azure SQL Database just by changing the setup on the IoC registry class) without affecting the whole project.

The DevOps-driven approach included: 

- Clean separation of technology tiers
- SOLID principles
- Separation of concerns
- Inversion of control
- Unit testing

### Azure Cosmos DB over SQL Server

Istobal brought a SQL database full of data, but before starting the implementation the team discussed different options (such as Azure Storage and Azure Cosmos DB), weighing pros and cons for each. We ended up choosing Azure Cosmos DB (formerly called DocumentDB) because of the geospatial search capability, because we will use some positional data further on. Scalability was also a key factor in choosing Azure Cosmos DB, as well as the I/O operations speed working with JSON objects instead of whole entities.

### IoT Edge issues

We decided to compile the IoT Edge SDK from the sources provided on the SDK GitHub repo, but we ran into some issues because of the dependencies not building up properly. To solve the problem, we tried different cbuild versions and different Git versions, but the only thing that worked for us was to build the dependencies first and then use the IoT Edge SDK script. We moved on using a device simulator instead, so we could go ahead with the rest of the work.

**Protocols**

One of the main issues we found toward dedicating more time to IoT Edge was also the protocol support. To make it an undisputed part of the solution, it would need to have support for the following protocols:

- CANbus
- PROFINET
- PROFIBUS
- OPC UA

Although everything can be routed through an OPC server, the client was still unsure if that was doable in their current infrastructure without a major investment.

**Developer friendliness**

The actual process to start a project with the IoT Edge SDK requires a very high technical profile just to be able to build all the sources, and this could help some teams to continue investing time on this. Working on our side to make it easier and more accessible for our customers would be highly appreciated, so they can face the fewest obstacles possible to start ingesting data.

### IoT Hub

The process of sending messages using IoT Hub was straight and clean. We just created a connector on our .NET solution, dynamically getting all the setup information needed to connect to the service, and it was up and running in a short time. As with the storage option, the architecture implemented on our solution enables Istobal to replace IoT Hub with other *messages-receiver* services (such as Event Hub) if needed. We wanted to further explore the possibilities offered by IoT Hub, especially by looking at device twins, but time ran out.

```c#
using istobal.domain.Contracts;
using istobal.domain.Entities;
using Microsoft.Azure.Devices;
using Microsoft.Azure.Devices.Client;
using Microsoft.Azure.Devices.Common.Exceptions;
using Newtonsoft.Json;
using System.Text;
using System.Threading.Tasks;
using System;

public class IotHubConnector : IIotServicesConnector<IOTPackage>
{
    private RegistryManager registryManager;
    private DeviceClient deviceClient;

    private string _endpointUrl;
    private string _connectionString;
    private string _primaryKey;

    private string _deviceName;
    private Microsoft.Azure.Devices.Client.TransportType _transportType;

    public async Task Initialize(ISettingsReader settings,string deviceName)
    {
        try
        {
            _endpointUrl = settings["IoTHub.EndpointUrl"];
            _connectionString = settings["IoTHub.ConnectionString"];

            _deviceName = deviceName;
            _transportType = Microsoft.Azure.Devices.Client.TransportType.Mqtt;

            registryManager = RegistryManager.CreateFromConnectionString(_connectionString);
            AddDeviceAsync(_deviceName).Wait();

            await this.AddDeviceAsync(_deviceName);
            deviceClient = DeviceClient.Create(_endpointUrl,
                           new DeviceAuthenticationWithRegistrySymmetricKey(_deviceName, _primaryKey),
                           _transportType);
            Console.WriteLine("Initialize");
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error");
        }
    }

    public async Task SendMessage(IOTPackage value)
    {
        if (await AddDeviceAsync(_deviceName))
        {
            var messageString = JsonConvert.SerializeObject(value);
            var message = new Microsoft.Azure.Devices.Client.Message(Encoding.ASCII.GetBytes(messageString));

            await deviceClient.SendEventAsync(message);
            Console.WriteLine("{0} > Sending message: {1}", DateTime.Now, messageString);

        }
    }

    private async Task<bool> AddDeviceAsync(string deviceName)
    {
        bool deviceAdded = false;
        Device device;
        try
        {
            device = await registryManager.AddDeviceAsync(new Device(deviceName));
            _primaryKey = device.Authentication.SymmetricKey.PrimaryKey;
            deviceAdded = true;
        }
        catch (DeviceAlreadyExistsException)
        {
            device = await registryManager.GetDeviceAsync(deviceName);
            _primaryKey = device.Authentication.SymmetricKey.PrimaryKey;
            deviceAdded = true;
        }
        catch (System.Exception e)
        {
            deviceAdded = true;
            throw e;

        }

        return deviceAdded;
    }
}
```

### Azure Stream Analytics

With Azure Stream Analytics, we spent quality time getting Istobal through all the options available, especially on the list services offered as inputs/outputs for the query ... and they loved it! Again, connecting the dots here was pretty quick and smooth because we got our data flowing from IoT Hub through the Stream Analytics query and stored on our Azure Cosmos DB database. Regarding the query, we spent some time walking Istobal through the processing capabilities available, but because data had been prepared to be cleaned coming from the device simulator, we didn't have much work to do here and decided to keep it simple and just pass all the data as it was from IoT hub to the database.

### Power BI

Once we got our data flowing through our system, the team managed to connect Azure Cosmos DB to Power BI and start exploring data in new ways. We started with a short walkthrough of the Power BI service and the Power BI Desktop application to create the reports and visualizations needed, and again it was pretty easy for Istobal to get it done quickly. They loved this way of visualizing their data, as they found it very useful to confirm some of their hypotheses (biggest use of the car-wash machines is on weekends rather than weekdays) and find new business opportunities to offer to their customers, such as discounted prices on weekdays to increase use and revenue.

Some screenshots of the Power BI dashboards are shown below, displaying the consumption levels of different sensors on one machine (one sensor for each chemical product), and the different programs activated per day:

![Power BI report]({{ site.baseurl }}/images/istobal/istobalPB1.png)


![Power BI report]({{ site.baseurl }}/images/istobal/istobalPB2.png)


![Power BI report]({{ site.baseurl }}/images/istobal/istobalPB3.png)


### Retrieving weather data using Azure Functions

Once the monitoring was up and running, we moved on to the next goal: getting weather data from an external source. Our approach to accomplish this was to create a time-triggered Azure Function using C#, which will iterate through the machines on the database and retrieve the weather information for the location of each. On a first attempt we tried to use Azure Cosmos DB as an output to store the weather data once retrieved from the [OpenWeatherMap](http://openweathermap.org/) service, but we ran into some issues with that and switched the approach to use the regular .NET libraries to get it done.

Again, Istobal loved the easiness of accomplishing this with Azure Functions, and getting this done enabled us to move on to the next step, correlating this weather information with the chemicals consumption levels.

**DocumentDB.csx (managing data insertion on Azure Cosmos DB from Azure Functions)**

```c#
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using System;
using System.Threading.Tasks;

public class DocumentDbBase
{
    public string _endpointUrl;
    public string _primaryKey;
    public string _databaseName;
    public string _collectionName;
    private DocumentClient _documentDbClient;

    public DocumentDbBase()
    {
        _endpointUrl = "<<endpoint-url-value>>";
        _primaryKey = "<<primary-key-value>>";
        _databaseName = "<<database-name-value>>";
        _collectionName = "<<collection-name-value>>";
    }

    public async Task<bool> InitializeAsync()
    {
        _documentDbClient = new DocumentClient(new Uri(_endpointUrl), _primaryKey);

        await _documentDbClient.OpenAsync();
        await _documentDbClient.CreateDatabaseIfNotExistsAsync(new Database { Id = _databaseName });

        return true;
    }

    public async Task<bool> Upsert(object document,TraceWriter log)
    {
        log.Info($"Process Upsert");
        var documentCollectionUri = UriFactory.CreateDocumentCollectionUri(_databaseName, _collectionName);
        log.Info($"Doc Uri: {documentCollectionUri}");
        var response = await Client.UpsertDocumentAsync(documentCollectionUri, document);

        log.Info($"Executed UpsertAsync response: {response.StatusCode}");
        return true;
    }

    public DocumentClient Client
    {
        get
        {
            return _documentDbClient;
        }
    }
}
```

<br/>

**run.csx (Azure Function core code)**

```c#
#load "IOTWeather.csx"
#load "DocumentDB.csx"
#load "Machine.csx"

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.Documents.Client;

private HttpClient client = new HttpClient();
static DateTime timespan = DateTime.Now;

public static void Run(TimerInfo myTimer, TraceWriter log)
{
    log.Info($"C# Timer trigger function executed at: {DateTime.Now}");
    GetLocations(log).Wait();
}

public async static Task GetLocations(TraceWriter traceWriter)
{
    DocumentDbBase db = new DocumentDbBase();
    await db.InitializeAsync();
    FeedOptions queryOptions = new FeedOptions { MaxItemCount = -1 };
    traceWriter.Info($"DB initialized");

    IQueryable<Machine> machineQuery = db.Client.CreateDocumentQuery<Machine>(
                UriFactory.CreateDocumentCollectionUri(db._databaseName, db._collectionName), queryOptions)
                .Where( c => c.Latitude != 0);


    traceWriter.Info($"Items readed: {machineQuery.Count()}");
    
    foreach(var item in machineQuery)
    {
        traceWriter.Info($"Machine name: {item.MachineName}");
        var weather = ReadWeather(item.Latitude, item.Longitud, traceWriter).Result;

        if(weather == null || string.IsNullOrEmpty(weather.name))
        {
            traceWriter.Info($"No weather for machine {item.MachineName}");
            continue;
        }

        weather.Timespan = timespan;
        weather.point = new Point() {  type = "Point", coordinates = new[] {item.Longitud, item.Latitude}};
        weather.Type = "IOTWeather";
        weather.id = Guid.NewGuid().ToString();

        traceWriter.Info($"Weather name: {weather.name}");
        
        if(!await db.Upsert(weather, traceWriter))
        {
            traceWriter.Info($"Upsert error");
        }
    }
}

private static async Task<IOTWeather> ReadWeather(float latitude, float longitude, TraceWriter traceWriter)
{

    traceWriter.Info($"Im in ReadWeather");
    IOTWeather weather;
    string _endpointUrl = "http://api.openweathermap.org/data/2.5/weather";
    string _apiKey = "<<api-key-value>>";
    string _connectionString = string.Format("{0}?lat={1}&lon={2}&appid={3}", _endpointUrl, latitude, longitude, _apiKey);

    HttpClient client = new HttpClient();

    client.BaseAddress = new Uri(_endpointUrl);
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

    _connectionString = string.Format("{0}?lat={1}&lon={2}&appid={3}", _endpointUrl, latitude, longitude, _apiKey);
    HttpResponseMessage response = await client.GetAsync(_connectionString);
    if (response.IsSuccessStatusCode)
    {
        weather = await response.Content.ReadAsAsync<IOTWeather>();
        traceWriter.Info($"Weather object {weather}");
        return weather;
    }

    traceWriter.Info($"Response status: {response.StatusCode}");

    return null;
}
```

### Machine Learning

One of the goals for Istobal was to correlate the weather information with the consumption levels so they can perform a predictive refill of their customers' machines proactively, and also get some insights into the impact of the weather on washing-station workloads. To accomplish that, as our final goal of the hackfest, we set up an Azure Machine Learning Studio project with two experiments:

**1. To prepare the data for the correlation.**

  In this first experiment we created different queries to retrieve each type of data (chemicals, programs, weather, and machines) on a different dataset by using the discriminator field "Type" on our Azure Cosmos DB records. The way we managed to connect them all together into a flat structure was by using a datepart trick to split the dates into years, months, days, and weekdays so we could link them with the weather data.

  ![Data prep experiment]({{ site.baseurl }}/images/istobal/istobalML1.PNG)

<br/>

**2. To predict the consumption levels.**

  Once we created the dataset for our correlation experiment, we set up another experiment to use this consolidated data to predict the consumption levels based on the weekday, the location, and the weather conditions. Because this was our last task, we ran out of time, but before starting with the Machine Learning project we drilled down on the features of Azure Machine Learning Studio and some data science basics on regressions and classifications.

## Architecture

Wrapping it up, this would be the flow for our solution:

![Architecture diagram]({{ site.baseurl }}/images/istobal/istobalArchitecture.png)

<br/>

1. Data is ingested via IoT Hub from a device simulator.
2. Azure Stream Analytics processes the data and stores it on Azure Cosmos DB (DocumentDB).
3. Azure Functions periodically retrieves weather conditions data for the washing machine locations and also stores it on Azure Cosmos DB.
4. Power BI reports are generated from Azure Cosmos DB as a data source to help Istobal monitor the chemical levels and get insights into the usage of the machines.
5. Machine Learning experiment gets data straight from Azure Cosmos DB to expand their insights with the weather conditions correlation.

## Moving forward

After the hackfest, Istobal will continue to work on this to create a viable product. As suggested during the hackfest, they will contact Siemens to explore the possibility of getting a custom device that fits their needs to help them ingest data from their wash-station machines, as well as another third-party supplier to discuss the possibility of integrating IoT Edge on their devices.

Many of the lessons learned during the hackfest will be applied to several other projects that Istobal is currently working on, such as the DevOps practices, which will help them write better commit messages and get instant feedback from automated builds.

## Conclusion

Overall, it was a **very successful hackfest**. Istobal managed to not only get a solid understanding of how to architect and implement their solution, but they are already looking into several other projects to implement the same kind of technology. We had time to cover a lot of content from our Azure offering and were able to go through all of the goals established before the hackfest during our week in Madrid. 

<br/>

>“Very productive week for us and for our projects during the hackfest, as we were able to get the whole picture of the main services on Azure for IoT, as well as other areas of Microsoft technologies. Multi-team working environment and meetings with product group people were very interesting for us as well.”
>
>— Salvador Montrull, R&D Engineer, Istobal

<br/>

>“The hackfest experience was really enriching for us, both personally and professionally. Working with real experts on IoT, Azure, and DevOps gave us a great view of the Microsoft products, services, and offerings that we hadn't had before. Working closely on four full days with Microsoft staff guarantees an end-to-end functional solution on the short term, and we got a great amount of knowledge that would have required much more time working by ourselves on a daily basis.
>
>"Great organization, it's so cool that Microsoft arranges this kind of event for the companies working with them, as it is a win-win situation. This hackfest will mark a significant turning point for Istobal regarding IoT technologies and Azure services adoption.”
>
>— Andrés Amat, Project Consultant, Istobal

## Additional resources

- [Azure Cosmos DB](https://azure.microsoft.com/en-us/services/cosmos-db/)
- [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
- [Azure IoT Edge](https://azure.microsoft.com/en-us/campaigns/iot-edge/)
- [Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/)
- [Azure Machine Learning Studio](https://docs.microsoft.com/en-us/azure/machine-learning/machine-learning-what-is-ml-studio)
- [Azure Stream Analytics](https://azure.microsoft.com/en-us/services/stream-analytics/)
- [Microsoft Power BI](https://powerbi.microsoft.com/en-us/)
- [Microsoft Visual Studio 2017](https://docs.microsoft.com/en-us/visualstudio/welcome-to-visual-studio)
- [Microsoft Visual Studio Team Services](https://azure.microsoft.com/en-us/services/visual-studio-team-services/)





