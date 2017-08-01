---
layout: post
title:  "ENGIE Cofely uses Azure to improve data analysis"
author: "Benjamin Guinebertière, Alex Danvy"
#author-link: "@benjguin, @danvy"
#author-image: "{{ site.baseurl }}/images/authors/benjguin-danvy.jpg"
date:   2017-08-01
categories: [IoT]
color: "blue"
image: "images/2017-04-21-EngieCofely/engie-cofely-header.png"
excerpt: ENGIE Cofely used Azure IoT Hub to retrieve production data, and leveraged Azure Time Series Insights, Azure Machine Learning, and Azure Batch to visualize and operationalize data analysis written as R scripts by LOB teams. 
language: [English]
verticals: [Power & Utilities, Process Mfg & Resources]
geolocation: [Europe]
---

Managing heating systems in smart buildings is becoming a key part in the energy transition in France. We need to do more than collect and store huge volumes of data from connected systems. Data must push the boundaries of today's solutions. ENGIE Cofely and Microsoft joined efforts to work on what could be the next generation energy management platform by using Azure in general, and Azure IoT Hub and Azure Machine Learning in particular.

### Key technologies used
- [Microsoft Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/)
- [Azure Machine Learning](https://azure.microsoft.com/en-us/services/machine-learning/)
- [Azure Time Series Insights](https://azure.microsoft.com/en-us/services/time-series-insights/)
- [Azure Batch](https://azure.microsoft.com/en-us/services/batch/)
- [Azure Event Hubs](https://azure.microsoft.com/en-us/services/event-hubs/)

### Core team

- [Benjamin Guinebertière](https://twitter.com/benjguin) – Software Engineer, Microsoft 
- [Alex Danvy](https://twitter.com/danvy) – Technical Evangelist, Microsoft France 
- Patrick Fremont – Cloud Solutions Architect, Microsoft France
- David Romary – Energies Project Manager, Line of Business Division, ENGIE Cofely
- Dominique Martin – DM Consultant, Line of Business Division, ENGIE Cofely
- Christian Faucon – Department Manager, IT Division, ENGIE Cofely
- Eric Jaloustre – CGI, IT Division, ENGIE Cofely
- Frédéric Hanse – Energies Project Manager, Line of Business Division, ENGIE Cofely 
- Didier Bruneau – General Director, Technilog
- Frédéric Bouvier – Technical Director, Technilog

## Customer profile

<img alt="ENGIE Cofely logo" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/Engie-Cofely.png" width="350">

[ENGIE Cofely](http://www.engie-cofely.fr/) (formerly Cofely Services) is an entity in the ENGIE Group (formerly GDF Suez) and one of the leaders of the energy transition in France. As an energy and environmental efficiency services company, ENGIE Cofely proposes solutions to businesses and communities on how they can use energy more efficiently and reduce their environmental impact. The company expertise is based on the long-established know-how of 12,000 collaborators in the following domains: 

- Optimizing a building's energy and environmental performance
- Developing renewable energies in the heart of French territories
- Improving public building services (facility management)

<img alt="ENGIE Cofely key figures" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/key-figures.png" width="600">

<br/>
 
## Problem statement

ENGIE Cofely has thousands of connected systems (such as different brands, models, and versions of heating systems) that generate a large volume of heterogenous data (devices sending a few bytes of telemetry messages several times an hour in normal conditions) through different kinds of networks (private networks and Sigfox networks). This situation is becoming more and more challenging with time as new systems are deployed and more data is collected.

The big data environment can be quite difficult to set up and maintain; the cloud is often a good way to make things easier while being able to scale on demand.

ENGIE Cofely has already experimented with technologies such as Azure Data Lake, and now they are facing two new challenges: 

- What happens before using Data Lake (IoT)?
- What happens after using Data Lake (advanced data analytics)?

ENGIE Cofely saw a great opportunity to set up a hackfest with Microsoft and experiment in those areas.

### How can we collect data from existing and future systems?

Before using Azure Data Lake, connected systems must send their data to the cloud. The solution must be able to:
- Deal with a substantial number of devices.
- Connect to various existing systems.
- Support new low power networks such as Sigfox and LoRaWAN.
- Ensure a high level of security.
- Be easily managed.

One of the goals of this part is to increase the [top line](https://www.quora.com/What-does-top-line-and-bottom-line-mean) by raising the number of possible customers.

### How can we get intelligent insights from raw data?

After using Data Lake, prepared datasets must be analyzed. In this case, the analysis consists of checking the data quality by having machines detect the few anomalies that should be investigated by humans.

In particular, during this hackfest, ENGIE Cofely retrieved production data into IoT Hub that helps leverage high scale capacity in Azure, for example, Azure Time Series Insights. The IT team also leveraged Azure Batch to operationalize data analysis written as R scripts by the line of business (LOB) teams. 

Today, the data collected is transformed and sent to a relational data warehouse. As data grows, they need to define their next generation architecture. For this purpose, they already did a proof of concept (PoC) that shows how to get the data from Azure IoT Hub to Azure Data Lake, and from Azure Data Lake to produce a dataset that can then be analyzed by the LOB teams.

Data quality is one of the core subjects that the teams are interested in. For example, it is essential to detect when data corresponds to an anomaly. The anomaly can either be due to an issue in the data retrieval process or in the system itself. Detecting such an anomaly is relevant in both cases.

The LOB team already leverages R scripts.  However, two important points still need to be improved:
- Complementing the business rules approach with a statistical one
- Having their analysis operationalized in an automated way

One of the goals of this part is to increase the [bottom line](https://www.quora.com/What-does-top-line-and-bottom-line-mean) by decreasing costs, thanks to better data quality leading to better operations.

## Solution and steps

Because ENGIE Cofely had already studied how to get data from Azure IoT Hub to Azure Data Lake and manage it there, we focused on other areas. 

<img alt="At the end of the kickoff meeting" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/hackfest_1.jpg" width="600">

<br/>
 
### Getting data from real systems into IoT Hub

We spent some time figuring out whether to host the Dev I/O instance in ENGIE Cofely datacenters or in the cloud. To avoid breaking an existing robust and secure configuration, we decided to use the on-premises option.  

The connection between Dev I/O and IoT Hub will go through ENGIE Cofely's highly secured datacenter. IoT Hub supports AMQP, MQTT, and HTTPS, and the SDK made it easy to switch according to our needs. We ended up choosing HTTPS for its ability to go through the existing firewall rules.

Because of its gigantic ingestion capacity, IoT Hub will be able to deal a direct connection to thousands of other sensors by using an LPWAN such as Sigfox or LoRaWAN, in addition to Dev I/O.

### Analyzing data to detect quality breaches through anomaly detection 

To analyze the data, we needed to:

- **Get a significant dataset**. During the hackfest, we extracted a dataset from the existing data warehouse. In the target architecture, it could be built from the Azure Data Lake Store by using Azure Data Lake Analytics running a U-SQL script. For a number of installations (locations where there is a heating system), we get ambient temperature (for example, temperature in an office), exterior temperature, and circuit 1 input water temperature. A circuit starts at the heat source (boiler), goes to the radiators or other systems that bring heat in the offices or houses, and goes back to the boiler. Of course, this can be more complicated; there can be several circuits associated to a boiler, etc. During the hackfest, we simplified it by limiting it to circuit 1.
- **Visualize the data as a time series**. The hackfest happened only a few days after Azure Time Series Insights was announced, so we injected data from the dataset to Azure Event Hubs and had Azure Time Series Insights show us the data.
- **Analyze the dataset with an R script**. We wanted to try a new approach consisting of trying to find anomalies in the time series. Each installation has its own time series; some installations may have data that do not correspond to what happens to an average installation and that could reveal errors in the installation itself or in data collection. Therefore, the approach was to use time series clustering modules and see how we could find anomalies.
- **Operationalize the execution of the R script**. After we had an R script showing some results, we needed to be able to operationalize this approach at scale. 

![IoT architecture diagram]({{ site.baseurl }}/images/2017-04-21-EngieCofely/arc1.png)

<br/>
 
## Technical delivery

### IoT connectivity

A new connector was easily created by using the [Azure IoT Hub SDK](https://github.com/Azure/azure-iot-sdks). By using a simple connection string parameter, by default all messages are pushed to an IoT Hub instance over a secured HTTPS connection, but AMQP was the preferred solution for security and performance reasons. 

![IoT architecture diagram 2]({{ site.baseurl }}/images/2017-04-21-EngieCofely/DeviceToCloudArchitecture.PNG)

<br/>

To double check the effectiveness of the connector, we used Azure Time Series Insights connected to IoT Hub and immediately started exploring the data.
 
<img alt="First Dev I/O messages in IoT Hub" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/time-series.jpg" width="1000">

<br/>
 
### Data analysis

In this part of the hackfest, we basically tried the architecture in the following diagram.

![Architecture]({{ site.baseurl }}/images/2017-04-21-EngieCofely/arc3.png)

<br/>
 
#### Creating the dataset

A dataset was created by issuing several SQL statements in the existing data warehouse. We took that shortcut because we knew that ENGIE Cofely knows how to do this from data that arrives from IoT Hub (by using Azure Data Lake tools).

The resulting dataset looks like this, and has about 3.5 million rows:

```
 IdInterneInstallation,NumInstallation,Ville,IdInterneMesure,LibelleLongMesure,DateEvenement,Valeur
 16957,9028480001,MONTAUBAN,760944,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 00:00:00,12.904763221740723
 16957,9028480001,MONTAUBAN,760944,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 00:15:00,12.780929565429687
 16957,9028480001,MONTAUBAN,760944,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 00:30:00,12.641674041748047
 16957,9028480001,MONTAUBAN,760944,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 00:45:00,12.564787864685059
 16957,9028480001,MONTAUBAN,760944,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 01:00:00,12.489211082458496
 16957,9028480001,MONTAUBAN,760944,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 01:15:00,12.243849754333496
 16957,9028480001,MONTAUBAN,760944,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 01:30:00,12.081991195678711
 (...)
 16957,9028480001,MONTAUBAN,760944,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 17:30:00,11.136606216430664
 16957,9028480001,MONTAUBAN,760944,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 17:45:00,11.157817840576172
 16957,9028480001,MONTAUBAN,760944,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 18:00:00,11.105156898498535
 8275,9003489001,LAMBALLE,815516,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 00:00:00,12.393486022949219
 8275,9003489001,LAMBALLE,815516,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 00:15:00,12.248613357543945
 8275,9003489001,LAMBALLE,815516,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 00:30:00,12.207138061523438
 8275,9003489001,LAMBALLE,815516,BASE_VN_T.EXTER_T.REF_CORRIGE,2016-04-01 00:45:00,12.217850685119629
 (...)
```

<br/>

The columns contain the following information.

Name                  | Type      | Content
----------------------| --------- | ----------------------
`IdInterneInstallation` | string    | Installation ID
`NumInstallation`       | integer   | Installation number
`Ville`                 | string    | City where the installation is
`IdInterneMesure`       | string    | Measure type ID
`LibelleLongMesure`     | string    | Measure type label
`DateEvenement`         | date/time | Date/time when the event occurred
`Valeur`                | float     | Measure value

<br/>
 
*Measure type label* is the result of a strict codification. 

#### Visualizing the time series data

The first thing we wanted to do was visualize the data. 

In the current version, Time Series Insights supports Azure Event Hubs and Azure IoT Hub, and in the future, more Event Sources will be added (from [What is Azure Time Series Insights](https://docs.microsoft.com/en-us/azure/time-series-insights/time-series-insights-overview)).

You can view a recent video on this service: [Cloud Cover Show, episode 229](https://channel9.msdn.com/Shows/Cloud+Cover/Episode-229-Azure-Time-Series-Insights).

We wrote a simple C# program that reads from the dataset and injects data into an event hub where Time Series Insights can consume it (note that this sample code can be enhanced by sending data in batch for better performance; in our case, it was good enough).

```csharp
 using Microsoft.ServiceBus;
 using Microsoft.ServiceBus.Messaging;
 using Microsoft.VisualBasic.FileIO;
 using Newtonsoft.Json;
 using Newtonsoft.Json.Linq;
 using System;
 using System.Collections.Generic;
 using System.Configuration;
 using System.Globalization;
 using System.Linq;
 using System.Text;
 using System.Threading.Tasks;

 namespace CsvToEventHub
 {
     class Program
     {
         private static object ConsoleSemaphore = new object();

         static void Main(string[] args)
         {
             string serviceBusNamespace = ConfigurationManager.AppSettings["serviceBusNamespace"];
             string eventHubName = ConfigurationManager.AppSettings["eventHubName"];
             string senderName = ConfigurationManager.AppSettings["senderName"];
             string senderKey = ConfigurationManager.AppSettings["senderKey"];
             string csvFilename = ConfigurationManager.AppSettings["csvFilename"];
             string datasetId = ConfigurationManager.AppSettings["datasetId"];

             var settings = new MessagingFactorySettings()
             {
                 TokenProvider = TokenProvider.CreateSharedAccessSignatureTokenProvider(senderName, senderKey),
                 TransportType = TransportType.Amqp
             };
             var factory = MessagingFactory.Create(
                  ServiceBusEnvironment.CreateServiceUri("sb", serviceBusNamespace, ""), settings);
             EventHubClient client = factory.CreateEventHubClient(eventHubName);

             using (TextFieldParser parser = new TextFieldParser(csvFilename))
             {
                 parser.TextFieldType = FieldType.Delimited;
                 parser.SetDelimiters(",");

                 parser.ReadFields(); // read header

                 while (!parser.EndOfData)
                 {
                     //Processing row
                     string[] fields = parser.ReadFields();
                     dynamic e = new JObject();
                     int i=0;
                     e.datasetId = datasetId;
                     e.IdInterneInstallation = fields[i++];
                     e.NumInstallation = fields[i++];
                     e.Ville = fields[i++];
                     e.IdInterneMesure = fields[i++];
                     e.LibelleLongMesure = fields[i++];
                     e.DateEvenement = DateTime.Parse(fields[i++], CultureInfo.InvariantCulture);
                     e.Valeur = float.Parse(fields[i++]);
                     string eAsJsonString = JsonConvert.SerializeObject(e);

                     EventData data = new EventData(Encoding.UTF8.GetBytes(eAsJsonString))
                     {
                         PartitionKey = e.NumInstallation.ToString()
                     };

                     Console.WriteLine(eAsJsonString);

                     client.Send(data);
                 }
             }

             Console.WriteLine("OK");
             Console.ReadLine();
         }
     }
 }
```

<br/>

Using this code allowed us to see the following type of diagram while data was being injected into the event hub. To maintain a constant temperature inside (middle line) while the exterior temperature varies (lower line), an opposite temperature must be injected at the beginning of the circuit (upper line). In other words, the lower the temperature is outside, the higher the temperature must be when leaving the boiler to always have the same temperature inside.  

![Time Series Insights screenshot #1]({{ site.baseurl }}/images/2017-04-21-EngieCofely/ts-1.png)

<br/>
 
The tool allows us to compare different charts side by side and different time series in one chart. This way, we could see how different installations behave.

![Time Series Insights screenshot #2]({{ site.baseurl }}/images/2017-04-21-EngieCofely/ts-2.png)

<br/>
 
![Time Series Insights screenshot #3]({{ site.baseurl }}/images/2017-04-21-EngieCofely/ts-3.png)

<br/>
 
Later, we also used the tool to draw different time series that were analyzed with R time series clustering to see if we could correlate the clusters with what we saw.

The Time Series Insights tool was a good way to visualize the data. We tested it just a few days after its first preview release so the features were mainly limited to visualization. There is no automated anomaly detection so far, so we tried a few other things.

#### Finding anomalies with Azure Machine Learning

The first thing we tried was Azure Machine Learning's module named [Time Series Anomaly Detection](https://msdn.microsoft.com/library/azure/96b98cc0-50df-46ff-bc18-c0665d69f3e3). We extracted a time series for one installation and one measure type and fed the module with it. 

The dataset columns were:
- date/time
- data value

The Machine Learning experiment resembles that in the following diagram.

![Data visualization of the Azure Machine Learning output in R - 1]({{ site.baseurl }}/images/2017-04-21-EngieCofely/i002.png)

<br/>
 
From a Jupyter notebook in R, we executed the following code. 

```r
 install.packages("lubridate")

 library("ggplot2")
 library("lubridate")
 library("AzureML")
 ```

 ```r
 ws <- workspace(
   id = "e71c5###obfuscated###4f6c",
   auth = "###obfuscated###",
   api_endpoint = "https://europewest.studioapi.azureml.net"
 )
```

<br/>
 
```r
 ds <- download.intermediate.dataset(
   ws = ws,
   node_id = "2cccd51a-9751-463e-95fb-4785ed607af2-752",
   experiment = "e71c5659f1154070acc4b3d5cfda4f6c.f-id.2e4c8b9fea0346319d64022b0d666b8a",
   port_name = "Results dataset",
   data_type_id = "GenericCSV"
 ) 
 ds$ParsedDateEvenement <- mdy_hms(ds$DateEvenement)
 dsextract = ds
 dsextract2=dsextract[,c(5,2)]
 dsextract3=dsextract[dsextract$Alert.indicator==1,c(5,2)]
 ggplot() + geom_line(aes(ParsedDateEvenement, Valeur), dsextract2) + geom_point(aes(ParsedDateEvenement, Valeur), dsextract3, colour="red")
```

<br/>
 
This code generates the following data visualization. 

![Data visualization of the Azure Machine Learning output in R - 2]({{ site.baseurl }}/images/2017-04-21-EngieCofely/i001.png)

<br/>
 
In this case, the red dots show on a one-year time series when summer or winter is coming.

In our case, these dots were not anomalies in the real world. This still can remain an interesting way to detect other kinds of anomalies inside each time series. 

#### Finding anomalies with R

We then worked on an R script to implement the following idea. By defining clusters of time series, we could see in each cluster the ones that are far away from their centroid, or the ones that are part of clusters with very few items. These items can be considered as anomalies and escalated to humans for investigation.

The script we came up with still needs enhancements on how to cluster the time series. Still, the iteration we used is the following.

```r
 library(dplyr)
 library(tidyr)
 library(lubridate)
 library(dygraphs)
 library(xts)
 library(TSclust)
 library(FactoMineR)
 library(ggplot2)

 ds0 <- read.csv("E:/(...)/dataset.csv", as.is = TRUE)

 ds1 <- tbl_df(ds0) %>% 
   mutate(time_t = ymd_hms(DateEvenement)) %>% filter(time_t >= ymd("20161215"), time_t < ymd("20170101"))

 ds1_ss <- ds1 %>% 
   select(NumInstallation, LibelleLongMesure, time_t, Valeur) %>% distinct() %>% 
   mutate(time_t = format(time_t, format = "%Y-%m-%d %H", tz = "")) %>% 
   group_by(NumInstallation, LibelleLongMesure, time_t) %>% summarise(Valeur = mean(Valeur)) %>% 
   ungroup() %>% 
   mutate(time_t = ymd_h(time_t))

 time_min <- min(ds1_ss$time_t)
 time_max <- max(ds1_ss$time_t)

 ds1_ss_1 <- ds1_ss %>% spread(key = LibelleLongMesure, value = Valeur)

 ds1_ss_2 <- ds1_ss_1 %>% 
   mutate(ratio = (CIR1_VN_AMB_T.AMB_CORRIGE - BASE_VN_T.EXTER_T.REF_CORRIGE)/(CIR1_AI_EAU_T.DEP_SONDE - BASE_VN_T.EXTER_T.REF_CORRIGE)) %>% 
   select(NumInstallation, time_t, ratio) %>% spread(key = NumInstallation, value = ratio)

 ds1_ss_2[is.na(ds1_ss_2)] <- -1

 ds1_ss_xts <- xts(ds1_ss_2[, 2:ncol(ds1_ss_2)], order.by = ds1_ss_2$time_t)

 ds1_ss_xts_dist <- diss(t(ds1_ss_xts), "PACF", p=0.05)

 ds1_ss_xts_dist[is.nan(ds1_ss_xts_dist)] <- 9

 hc <- hclust(ds1_ss_xts_dist)

 ggsave("hierarchical_clustering.png", plot(hc))

 hc$height[which(hc$height > 5)]

 ds.output <- data.frame(NumInstallation = hc$labels[hc$order[seq_len(sum(hc$height > 5))]])

 write.csv(ds.output, "ts_anomalies.csv")
```

<br/>
 
The generated PNG file shows two time series that are quite high in the cluster dendogram. They are part of clusters of one item and can be seen as anomalies. 

<img alt="Time Series clustering visualization in R" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/cluster.png" width="700">

<br/>
 
For that particular dataset, we investigated and found that the two time series had much fewer data points than the others. 

After this kind of result is found for one sample dataset, we can operationalize the execution so that data can be monitored automatically.

#### Operationalizing R scripts execution

Part of the operationalization conditions is that the script can be ported easily. This includes constraints such as having similar versions of R, or being able to use the same modules. 

**Operationalize with Azure Machine Learning**

The R script we developed in David Romary's environment was in CRAN R version 3.3.2. Machine Learning has two environments available to execute R scripts: CRAN R 3.1.0 and Microsoft R Open 3.2.2.

<br/>

![Execute R script module in Azure Machine Learning showing 2 R versions to choose from]({{ site.baseurl }}/images/2017-04-21-EngieCofely/azuremlr.png)

<br/>

In these environments, only the most common modules are available, and it is possible to make any module available by providing a ZIP file. When there are a number of modules to add, it is also a good idea to leverage miniCRAN. Following are a few links to useful documentation: 
- [Introducing miniCRAN: an R package to create a private CRAN repository](http://blog.revolutionanalytics.com/2014/10/introducing-minicran.html)
- [Revisiting package dependencies](http://blog.revolutionanalytics.com/2014/07/revisiting-package-dependencies.html)
- [Using miniCRAN in Azure Machine Learning](http://blog.revolutionanalytics.com/2015/10/using-minicran-in-azure-ml.html)

For example, in our case, we could create miniCRAN by using the following script in the source environment:

```r
 install.packages("miniCRAN")

 library(miniCRAN)

 options(repos = c(CRAN = "http://cran.at.r-project.org/"))
 pkgnames <- c("ggplot2", "dplyr","lubridate", "xts", "tidyr", "FactoMineR", "ggplot2")
 pkglist <- pkgDep(pkgnames, suggests=FALSE, enhances=FALSE, includeBasePkgs = TRUE)
 miniCRANPath <- "C:/benjguin/miniCRAN-170506d"
 dir.create(miniCRANPath)
 makeRepo(pkglist, path=miniCRANPath, type="source")
 makeRepo(pkglist, path=miniCRANPath, type="win.binary")
```

<br/>

Then, in the executing script in Azure Machine Learning, the following code can be used to install the packages included in the miniCRAN zipped repo.

```r 
 uri_repo <- paste("file:///",getwd(), "src/", sep="")
 options(repos = uri_repo) 

 install.packages("dplyr")
 install.packages("tidyr")
 install.packages("lubridate")
 install.packages("xts")
 install.packages("FactoMineR")
 install.packages("ggplot2")

 library(dplyr)
 library(tidyr)
 library(lubridate)
 library(xts)
 library(FactoMineR)
 library(ggplot2)

 # Map 1-based optional input ports to variables
 dataset1 <- maml.mapInputPort(1) # class: data.frame

 # use the modules
 # (...)

 # sample (very simple) usage
 x <- tbl_df(data.frame(a=1:3, b=4:6))
 y <- x %>% mutate(c=a+b)

 maml.mapOutputPort("y")  
```

<br/>
 
This was okay with Microsoft R Open 3.2, but this was a different version from R 3.3, which David was used to. Also, ENGIE Cofely doesn't have low latency requirements for this use case because most meters send data at a rate of 15 minutes. 

Therefore, we wanted to check whether Azure Batch would be a better fit. 

**Operationalize with Azure Batch**

As its name suggests, Azure Batch doesn't provide low latency, but is a good fit to execute compute jobs at scale. Azure Machine Learning also has Batch API, so we wrote some comparisons on the white board.

<img alt="Sketching pros and cons of Azure Machine Learning vs Azure Batch for our scenario" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/ml_batch.jpg" width="900">

<br/>
 
The main ideas on the white board are outlined in this table.

Criteria | Azure Machine Learning | Azure Batch | Comments
---------|------------------------|-------------|---------
Request response API | yes | no |
Batch API | yes | yes |
compute capacity | Each module runs on a container with ~60 GB of RAM. Several modules can run in parallel on several nodes. | A task is defined by the way one calls the batch service. Each task runs on one node that has the size that was defined when calling the batch service. One task could run to nodes with as low as 768 MB of RAM or up to 448 GB of RAM. | Note that 60 GB of RAM seems sufficient for the current workloads.
Customization | Low. There are a few parameters, for example, the runtime to use for R scripts. The user doesn't choose how many containers are used, the size of each container, its operating system, etc. This can be an advantage because the user doesn't have to bother, as long as performance and results are good. | High. The framework lets the user define a pool size, the type of nodes (OS, size, VM image, etc.) that are in the pool, the way to break down a job into tasks, and so on. It's more work, but it also provides more flexibility. Note that it is still less work than doing everything by hand from IaaS. |
How to package R modules | The most common modules are available out of the box. For the other ones, they must be packaged as a ZIP file from which the script will install them; miniCRAN may help. They cannot be installed from the Internet. | Neither the runtime nor any modules are installed out of the box. It is possible to provide everything as a ZIP file and install each node from this. It is also possible to create nodes from Marketplace images with R runtime pre-installed, and then have the script leverage the Internet to install additional modules. |
CRAN R 3.3 availability | no | yes | this is the version used by David
Pricing | You pay for a developer's workspace, ~$10 per month. You then pay for what you use in development and production API calls, in a serverless way. You don't pre-provision anything; the pools are available from Microsoft for on-demand usage. Details are available at [Machine Learning Pricing](https://azure.microsoft.com/en-us/pricing/details/machine-learning/). | You provision pools of resources and pay for the time they are available to you. Details are available at [Batch Pricing](https://azure.microsoft.com/en-us/pricing/details/batch/).
API, inputs, outputs | In batch, upload inputs to blob storage, invoke the service, and then get outputs from blob storage. | A task can get its input and store its output wherever it needs. Still, using blob storage for input and output is quite common. |

<br/>
 
We decided to use Azure Batch for this workload because we could choose the R runtime to use, and it gave us some flexibility on the way we package R modules and the size of the nodes.

During the PoC, we used the [Microsoft Data Science Virtual Machine](https://docs.microsoft.com/en-us/azure/machine-learning/machine-learning-data-science-provision-vm), which is a pre-packaged virtual machine image with Windows, R runtime, and many other tools. The advantage is that we didn't have to package R runtime installation. We also had the tasks installing the required R modules exactly as we do in an interactive R Studio environment. That was simple to implement.

In production, it would be better to start from a plain Windows image, and then install R runtime and the required module from a miniCRAN ZIP file, just after a node starts in a pool. This will optimize Internet usage, execution time, and so on.

Because ENGIE Cofely uses C#, we wrote a sample in C#, starting from [DotNetTutorial](https://github.com/Azure/azure-batch-samples/tree/master/CSharp/ArticleProjects/DotNetTutorial).

Following are some code excerpts.

```csharp
 // Paths to the executable and its dependencies that will be executed by the tasks
 List<string> applicationFilePaths = new List<string>
 {
     @"..\..\..\RScripts\oneTask.cmd",
     @"..\..\..\RScripts\install_packages.R",
     @"..\..\..\RScripts\Task_46.R",
     typeof(AzureBatchHelper.Program).Assembly.Location, /* this project has a reference to the Helper to get this file Path */
     "Microsoft.WindowsAzure.Storage.dll"
 };
 
 (...)
```

<br/>

```csharp
 // Create the pool that will contain the compute nodes that will execute the tasks.
 // The ResourceFile collection that we pass in is used for configuring the pool's StartTask
 // which is executed each time a node first joins the pool (or is rebooted or reimaged).
 await CreatePoolIfNotExistAsync(batchClient, PoolId, applicationFiles);

 // Create the job that will run the tasks.
 await CreateJobAsync(batchClient, JobId, PoolId, storageAccount);

 // Add the tasks to the job. We need to supply a container shared access signature for the
 // tasks so that they can upload their output to Azure Storage.
 await AddTasksAsync(batchClient, JobId, inputFiles, applicationFiles, outputContainerSasUrl);

 // Monitor task success/failure, specifying a maximum amount of time to wait for the tasks to complete
 await MonitorTasks(batchClient, JobId, TimeSpan.FromMinutes(30));

 // Download the task output files from the output Storage container to a local directory
 await DownloadBlobsFromContainerAsync(blobClient, outputContainerName, Environment.GetEnvironmentVariable("TEMP"));

 // Clean up Storage resources
 await DeleteContainerAsync(blobClient, appContainerName);
 //await DeleteContainerAsync(blobClient, inputContainerName);
 await DeleteContainerAsync(blobClient, outputContainerName);

 // Print out some timing info
 timer.Stop();
 Console.WriteLine();
 Console.WriteLine("Sample end: {0}", DateTime.Now);
 Console.WriteLine("Elapsed time: {0}", timer.Elapsed);

 // Clean up Batch resources (if the user so chooses)
 Console.WriteLine();
 Console.Write("Delete job? [yes] no: ");
 string response = Console.ReadLine().ToLower();
 if (response != "n" && response != "no")
 {
     await batchClient.JobOperations.DeleteJobAsync(JobId);
 }

 Console.Write("Delete pool? yes [no]: ");
 response = Console.ReadLine().ToLower();
 if (response == "y" || response == "yes")
 {
     await batchClient.PoolOperations.DeletePoolAsync(PoolId);
 }
```

<br/>
 
The main scripts that are included are the following. 

*oneTask.cmd*

```cmd
 set TZ=UTC
 set inputFile=%1
 set outputBlobContainerSas=%2

 echo %inputFile%
 echo %outputBlobContainerSas%

 RScript install_packages.R
 RScript Task_46.R %inputFile%

 %AZ_BATCH_TASK_WORKING_DIR%\AzureBatchHelper copyOutputToBlob cluster.png %outputBlobContainerSas%
 %AZ_BATCH_TASK_WORKING_DIR%\AzureBatchHelper copyOutputToBlob tswarnings.csv %outputBlobContainerSas%
```

<br/>
 
*install_packages.R*

```r
 install.packages("dplyr")
 install.packages("tidyr")
 install.packages("lubridate")
 install.packages("dygraphs")
 install.packages("xts")
 install.packages("TSclust")
 install.packages("FactoMineR")
 install.packages("ggplot2")
```

<br/>
 
*Task_46.R*

```r
 library(dplyr)
 library(tidyr)
 library(lubridate)
 library(dygraphs)
 library(xts)
 library(TSclust)
 library(FactoMineR)
 library(ggplot2)

 args <- commandArgs(trailingOnly = TRUE)
 print(args)

 csvFilePath <- as.character(args[1])
 ds0 <- read.csv(csvFilePath, as.is = TRUE)

 #(...)

 hc <- hclust(ds1_ss_xts_dist)

 ggsave("cluster.png", plot(hc))

 hc$height[which(hc$height > 5)]

 ds.output <- data.frame(NumInstallation = hc$labels[hc$order[seq_len(sum(hc$height > 5))]])
 write.csv(ds.output, "tswarnings.csv")
```

<br/>
 
Following is an example of the batch job running, as seen from the laptop launching and following the job.

<img alt="Batch - C# command line" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/batch09.png" width="1000">

<br/>
 
Following are some screen shots of the Azure portal showing the same job running in Azure Batch.

<img alt="Batch - tsanomalies0 task is completed" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/batch-13.png" width="1000">

<br/>

The unique task `tsanomalies0` existed successfully.

<img alt="Batch - inspect files on node" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/batch-14.png" width="1000">

<br/>

Files that are available on the node that ran the task can be viewed from the portal. Each file can be viewed or downloaded.

<img alt="Batch - see execution log from Azure portal" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/batch-15.png" width="1000">

<br/>

As you may have noticed, the C# code downloads the result files from the blob storage. After the execution, the user can get the results from the machine that ran the C# code. 

<br/>

![Batch - result files]({{ site.baseurl }}/images/2017-04-21-EngieCofely/batch16.png)

<br/>
 
In our case, the two important files are the PNG showing the clusters (shown earlier) and a CSV file containing the installation IDs that require some human investigation.

*cluster.png*

<img alt="Time Series clustering visualization in R" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/cluster.png" width="400">

<br/>
 
*tswarnings.csv*

```
 "","NumInstallation"
 "1","2342400001"
 "2","2341755004"
```
<br/>

## Conclusion

During this hackfest, we were able to achieve the following: 
- Get data from a production installation up to Azure IoT Hub. 
- Explore data from IoT Hub and Event Hubs with Azure Time Series Insights and show patterns like the typical relationship between exterior, ambient, and circuit temperatures.
- Analyze data from an R script from an interactive environment, as business teams usually do. Note that the R script itself leveraged other ways to analyze that data with clustering.
- Operationalize this R script execution with Azure Batch. The IT team can monitor the execution environment and make sure that the compute resources are well used, the data is retrieved in a proper way, and so on. 

Thanks to what was done, ENGIE Cofely can now move to another phase to test and validate other aspects of the solution.

During the hackfest, we learned that, in some cases like this one, R scripts can be well operationalized with Azure Batch.

### Customer quote

> Following this experience, the story told by Cofely highlights the added value of mutually proposing a shared environment to the functional teams and IT teams simultaneously:
> - Functional teams develop new advanced methods based on the operating data provided by the IT teams
> - IT teams easily put in production all the methods proposed by the functional teams
> - Cofely's organization has the ability to reach an unparalleled time to market
>
> — David Romary, Project Manager, LOB Division, ENGIE Cofely

<br/>

<img alt="Hackfest - data part" src="{{ site.baseurl }}/images/2017-04-21-EngieCofely/hackfest_3.jpg" width="600">

<br/>
