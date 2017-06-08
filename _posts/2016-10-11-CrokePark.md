---
layout: post
title:  "Croke Park: Sound and weather data monitoring within a smart stadium"
author: "Niall Moran"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-10-28
categories: IoT
color: "blue"
image: "images/croke01.jpg"
excerpt: The Croke Park Smart Stadium project is a collaborative effort to boost innovation around IoT. Sensors and gateways have been strategically positioned around the Dublin stadium to enable environmental monitoring, safety, and fan experience use cases. This diverse collection of data, which is stored on the Azure cloud platform, provides stadium management with real, actionable insights.
language: English
verticals: [Smart Cities, Sports, Environmental, Sound]
sticky: true
---


*This report was updated on March 1, 2017, to add a section on security.*

Boasting a capacity for 82,300 people, Ireland's Croke Park stadium is one of the largest stadiums in Europe. As the national home to the Gaelic games and headquarters of the Gaelic Athletic Association (GAA), it hosts numerous high-profile international sporting, cultural, and music events. And now, within this urban test-bed infrastructure, lies the perfect Internet of Things (IoT) microcosm: a true “smart stadium.” 

The Croke Park Smart Stadium project is a collaboration between GAA, Dublin City University (DCU), Intel, and Microsoft to advance innovation around IoT. Intel has strategically positioned sensors and gateways throughout the stadium to enable a range of environmental monitoring, safety, and fan experience use cases. These edge gateways compute and communicate with the sensors, collecting enormous amounts of diverse types of data and storing them on the Microsoft Azure cloud platform.

For the Intel ‘IoT’ Group Technical Marketing Team, the “Croke Park Project is an engineers' test-bed for deploying an E2E IoT system to enable solutions, but more importantly understand the practical realities of what it takes to go into a third-party uncontrolled environment and deploy a bolt-on IoT system that includes sensors, IT equipment, gateways, communications, and interfaces onto existing infrastructure.”

Researchers at DCU are using the Azure IoT Suite to analyze that data, in the process creating dashboards that provide stadium management with real, actionable insights. These insights have provided Croke Park with information and opportunities to improve audience and fan engagement, foster better relations with the local community, reduce the carbon footprint, and ensure a safe experience on some of their tourist attractions while driving efficiencies and cost-effective stadium management. For DCU researchers, the opportunity to gather data from a variety of sensors within the IoT framework in a live environment over long periods of time is an exciting and unique platform for advancing research in data analytics.

Laura Clifford, Commercial Development and Engagement, Research & Enterprise Hub, Dublin City University, led the effort to help interested companies learn about and participate in the project. “We’ve had more than 30 companies actively involved with us in understanding how they could potentially deploy their pre-commercial IoT technologies here at Croke Park,” she said.

Authors:

- Niall Moran – Principal Technical Evangelist, Microsoft Ireland
- David Prendergast – Senior Researcher, Intel Ireland
- Suzanne Little – Lecturer, Dublin City University
- Dian Zhang – Postdoctoral Researcher, Dublin City University

## Business case ##

One objective of the Croke Park project was to learn about the problems installing and maintaining IoT technology in densely crowded urban environments, but another was to realize how this technology could be deployed to solve real business challenges. With this goal in mind, the research team worked closely with GAA employees to align the technology solution with use cases that could offer business value to the organization.

### Sound pollution ###

An important step in building strong community relations is ensuring that Croke Park is a good neighbor with events that have a minimal impact on those who live nearby. A key dimension of this is environmental sound monitoring. When it comes to decibels, Croke Park must stay within the parameters established by Dublin City Council. Before the Smart Stadium initiative, an independent third party would record the average noise levels and let the stadium know after the fact whether it was in compliance. Now this monitoring is also done in real time from preselected, fixed locations.

An automated solution to this problem solves a number of issues for the GAA:

- Reduced overhead in sound monitoring. The pre-existing solution is very manual and requires significant effort throughout a concert to record results. The automated microphones are always running, meaning that all events are captured and enabling a solid historical baseline for comparison to be created.
- Sound data can be disseminated through multiple channels—for example, a website, a publicly accessible app, or a dashboard accessible by key personnel.

### Fan engagement ###

The ability to monitor sound plays a part in enhancing the fan experience as well. The experimental system developed to allow the park to measure the average noise levels outside the stadium for compliance was repurposed to create friendly fan competition within the stadium bowl. Strategically positioned microphones capture maximum decibel peaks in crowd cheering levels, and gateways send this information to the Azure IoT hub. Data is presented on a dashboard to the staff, who in turn project it on a stadium screen, enabling them to “gamify” the data and identify which section is making the most noise. A great example of this is the data that was presented during the 2016 All-Ireland Hurling and Football Finals, which compared the noise levels at particular points in the games: key scores.

*Sept. 18 football final, first-half sound analysis*

![Football final]( {{ site.baseurl }}/images/croke01.jpg)



### Health and safety ###

The Etihad Skyline tour at Croke Park offers visitors unmatched panoramic city views and insights into Dublin’s celebrated landmarks. While a stroll around the top of one of Europe’s largest stadiums can be exhilarating, on a windy day a 17-story-high walking tour can be less comfortable. The team has deployed wind speed and direction sensors that collect the data in real time and feed the information back to the tour organizers so they know whether conditions are suitable to proceed with allowing visitors onto the roof. For the Smart Stadium project team, this seemingly simple implementation has far-reaching implications as it illustrates the direct, real-time connection of sensor data with local decision-makers.

## Solution ##

As well as the business requirements noted above, a number of other functional requirements needed to be considered:

- For sound monitoring, it is important to strategically position microphones within the stadium. To understand noise levels for both crowd cheer and noise pollution level, microphones must be located both within the stadium bowl and externally. For this reason, four microphones were deployed, two on the east side of the stadium and two on the west side. Each side had one microphone inside the stadium and one outside. Outside the stadium, microphone locations were selected in known areas of significant noise leakage due to breaks, such as access corridors, in the concrete bowl infrastructure.
- Keeping in mind that the stadium represents a microcosm of a city, an important requirement for the project was that the team learn how best to deploy an IoT solution and use these learnings to help other companies build their own smart-city solutions. This means carefully architecting solutions so that they can scale when applied to the real world.

### Engagement approach and team ###

Preliminary scoping of the project took place in several stages. Intel ran a design-thinking workshop with perspectives from across the employee base at Croke Park, exploring what a day in the life of a smart stadium would look like with particular focus on how to improve the big-match experience. Internal stadium use cases were later worked up as a collaborative co-design endeavor with partners describing local needs and challenges and reviewing technological options, including some devices that were being tested in Dublin City. At key stages, interviews and discussions took place with core employees—for example, the pitch manager and communications officer—to elicit engineering requirements and better understand their work practices, tools, and flows. 

Throughout the process the team was carefully guided by senior stadium management. Follow-up interviews and observations are planned toward the end of the deployment to assess usage of the technology and data insights generated. DCU also ran an exercise developing insight stories around two key personae: four 35-year-old sports fanatics traveling long-distance to the stadium and a family attending with children with particular focus on wayfinding, queuing, and age-appropriate entertainment. DCU also worked with Arizona State University on a white paper exploring the ethical implications of IoT within sporting arenas.

One of the challenges in working on the smart stadium project was the various skills sets required, including:

- Sound and weather monitoring specialists. This activity was primarily carried out by Croke Park staff and Sonitus Systems, a specialist sound-monitoring organization.
- Gateway management, including deployment, networking, and development. Intel deployed and managed all gateways within the stadium, with GAA IT staff providing backhaul connectivity to the network and Internet, where required.
- Stadium staff for access control and health and safety monitoring.
- Cloud specialists to handle the ingestion and analysis of collected data. Cloud capabilities were provided by Microsoft.
- Business intelligence and user experience experts who understand and define use cases as well as develop dashboards and user interfaces for displaying the data in effective ways. All BI dashboarding was provided by Microsoft.
- Data scientists to analyze data and develop predictive models to proactively act on intelligence extracted from historical data. Data science work was carried out by a team of research scientists at Dublin City University and Intel.

Bringing all of these resources together and successfully managing the delivery of each use case was challenging and required a governance model managed by two core teams:

- A central governance team responsible for agreeing on use cases and alignment between all parties. This team managed the budget for all delivery and provided the direction for prioritizing the delivery of specific use cases.
- A core technical team responsible for designing and implementing solutions for each use case.

### Technical solution ###

The technical solution was designed based on the above business, functional, and non-functional requirements. The following table details the components along with the partner responsible for the deployment and operation and notes on how these components satisfied requirements:


| Component                  | Provider        | Details/Links                                                                    | Notes                                                                                                                                                                                                                                                                                                                                                                                  |
|----------------------------|-----------------|----------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sound monitoring equipment | Sonitus Systems | [*EM2010 sound level monitor*](http://www.sonitussystems.com/products/EM2010)    | 4 sound monitoring microphones positioned around the stadium, 2 internal and 2 external as per stadium map.                                                                                                                                                                                                                                                                            |
| Gateway Devices            | Intel           |                                                                                  | 4 Intel Quark™ gateways positioned strategically around the stadium. The key criteria for determining location was based on the networking access and line of sight between sensors and gateways within optimal transmission distances for the RFBee radios used in the devices.                                                                                                       |
| Master Gateway             | DCU             | Central Dell machine running Ubuntu 14.4 LTS                                     | This machine aggregates and collates all data from the gateways to be pushed to the cloud. This removes the need to have internet connectivity for each gateway and gives us a certain amount of resilience as data can be collected and stored. This device and the processes that run on it have recently been migrated to a virtual machine running Ubuntu 16.04 LTS.               |
| Azure Cloud                | Microsoft       | [*Microsoft Azure IoT Services*](https://azure.microsoft.com/en-us/develop/iot/) | The Azure cloud is used to provide all back end and business intelligence functions including, device registration, security, data ingestion, real time analytics, storage and display.                                                                                                                                                                                                |
| Cognitive Models           | DCU             |                                                                                  | DCU work with all of the data collected to analyse quality and help direct the overall architecture including position of microphones as well as how to deal with interference. DCU are also working on developing machine learning models that can be used to predict outcomes based on data feeds. For example, the likelihood of the Skyline tour being cancelled at certain times. |



### Security 

The security of the smart stadium IoT solution has been built in at a number of layers to ensure the integrity of the data captured at the edge, processed by the gateway devices, and ultimately transmitted to the cloud. To achieve this “security in layers” approach, the following measures were taken:

- The gateway devices use Intel’s Wind River solution, which adds an enterprise-grade layer of security on top of the base Linux distribution. The security includes locking down the gateway OS including encrypting any connection strings required by the gateway to communicate with back-end systems, protecting against any endpoint tampering that could compromise the system.
- Each gateway has a unique registration with the Azure IoT hub, ensuring that if a device was compromised, it couldn’t compromise the entire solution. The device can then be further controlled from the IoT hub, allowing a compromised device to be taken off the network.
- All data sent to the Azure IoT hub is sent over HTTPS and hence is encrypted.
- Data is stored in an Azure SQL Database with transparent data encryption enabled. This encrypts the entire storage for the database, including data files, log files, and associated backups. 

### Architecture ###

The fundamental premise of the technical solution was to design with the following architectural concepts in mind:

- Loosely coupled components. This meant that each component used was not dependent on any other component or could easily be replaced, updated, or removed without affecting the entire solution. The benefit of this approach was that the team could test individual components and replace or update independently when required. 
- Queue-centric approach. Following on from the loosely coupled approach, the project team wanted to build as much resilience into the solution as possible. For example, one of the challenges within the project was positioning of microphones in relation to the radio antenna used to provide connectivity for the microphone gateways back to the master gateway that communicated with the cloud. Messages sent to the master gateway are forwarded to the cloud using the IoT hub. If there is an issue with connectivity, this data is still stored on the Sonitus system and logged on the gateway. This same principle was adopted in the cloud where different services performed separate functions and communicated with each other via queues.
- Separation of concerns. As well as loosely coupling components and queuing communications between them, each component was designed to provide a certain function and nothing else. This again supports the maintainability and extensibility of the solution by allowing each component to be updated without affecting the entire solution. This proved critical in this IoT project as there are so many components doing different things. The best example of this is separating ingestion from real-time communications via the IoT Hub and Stream Analytics respectively. When we wanted to update or amend a new real-time query to the data, we could stop the Stream Analytics job without affecting the ingestion and update the queries before restarting the service. This is fundamental to creating a solution that could scale to a globally deployed IoT scenario.

### Components ###

The complete solution is made up of a number of components, both within the stadium and in the cloud. The following section details these components and explains how they interact with the above architectural principles in mind.

![]( {{ site.baseurl }}/images/croke02.png)


#### Sensors and gateway equipment

**Sound monitoring**

In order to capture noise levels throughout the stadium, sound monitoring equipment was positioned at four points—two within the stadium at the stands and two outside the stadium. This allowed us to measure crowd cheer within the stadium but also compare this to external sound to monitor noise pollution for neighboring areas. The following photo shows the position of one of the Sonitus microphones. Sound data is measured by the microphones and averaged over a 1-minute period and then sent to the closest gateway where it is then sent to the cloud via the master gateway.

![]( {{ site.baseurl }}/images/croke03.jpg)


**Weather station**

A weather station was also deployed to measure wind speed and other data and was positioned at the top of the stadium between the Cusack and Davin stands. The following diagram shows a schematic of all of the different sensor equipment deployed as well as the gateways. Weather data is sent to the gateway every 30 seconds and then sent to the cloud via a master gateway.

![Schematic]( {{ site.baseurl }}/images/croke04.png)


**Gateways**

The job of the gateways is to collect the relevant sensor data, both sound and weather, and communicate the data back to the master gateway. To connect to the gateways, each piece of monitoring equipment is connected to a [*Seedstudio RFBee v1.1*](http://wiki.seeed.cc/RFbee_V1.1-Wireless_Arduino_compatible_node/) using simplex communication. Each unit is set up in Transceive mode (Send and receive), Baud rate 9600 8N1 and no flow control. These units are attached via USB connection and use a [*UartSBee*](https://www.seeedstudio.com/uartsbee-v4-p-688.html) adapter. The data is transferred in wireless serial mode using UART between the RFBee unit and the gateway.

The gateways used are [*E100-8Q from SuperMicro*](https://www.supermicro.nl/products/system/Compact/IoT/SYS-E100-8Q.cfm) based on the [*Intel Quark Processor*](http://ark.intel.com/products/79084/Intel-Quark-SoC-X1000-16K-Cache-400-MHz) and are powered by Wind River Linux 5.0.1.

**Master gateway**

This initial work done, each gateway then sends data to the master gateway which in turn sends data to the cloud, specifically an IoT hub. This allows the data to be aggregated and cached centrally within the stadium for edge analytics. Once the master gateway receives the data, it then connects to the IoT hub and transmits the data. The master gateway has been recently upgraded and migrated to a virtual machine running Ubuntu 16.04 LTS.

**IoT hub**

Azure IoT Hub is a cloud service responsible for device registration, securing the data transfer and high-volume data ingestion. In this case the master gateway is the only device registered with the hub and a unique device ID is passed in all payloads so we can establish which gateway the data originated from. This means that the IoT hub is sent all data collected, including weather and sound data. The data format must be JSON and is shown below. 

To connect with the IoT hub, the master gateway can send data over MQTT, IMQP or HTTP and must use an encrypted tunnel. There are a number of [*SDKs available*](https://azure.microsoft.com/en-in/develop/iot/get-started/), but in our case LUA scripts were used to connect directly with the REST API and sent the data over HTTPS. The following diagram shows a snippet of this LUA script as well as the JSON structure for the payload.

![]({{ site.baseurl }}/images/croke05.png)


![]({{ site.baseurl }}/images/croke06.png)


**Stream Analytics**

Once data has been ingested into the IoT hub, Stream Analytics is used to analyze the data and create a stream of data for each use case. Each stream of data is then outputted to a table in the SQL database. There are two Stream Analytics jobs, one to handle weather data and another to handle sound. Each job has the IoT hub as input and defines a number of outputs. The following table outlines each Stream Analytics query, their inputs, queries, and outputs:

| Stream Analytics Job            | Input  | Outputs    | Queries                                                    | Description                                                                                                                                                     |
|---------------------------------|--------|------------|------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CrokeParkStreamAnalytics        | IoTHub | sql        | ![]( {{ site.baseurl }}/images/croke07.png)                          | Sends all sound data points to a SQL database table. The LAMax values are used to evaluate intensity of crowd cheer.                                            |
|                                 | IoTHub | sqlrolling | ![]( {{ site.baseurl }}/images/croke08.png)                           | Retrieve a rolling average of LAEQ values to determine a normalized view of sound data for noise pollution. The average is calculated as a logarithmic average. |
|                                 | IoTHub | soundblob  | ![]( {{ site.baseurl }}/images/croke09.png)                          | All data points are sent to blob storage for diagnosis.                                                                                                         |
| CrokeParkWeatherStreamAnalytics | IoTHub | Sql        | ![]( {{ site.baseurl }}/images/croke10.png)                          | Raw weather data is sent to a SQL table.                                                                                                                         |

**SQL database**

An Azure SQL database is used to store relevant data for analysis or display. SQL Database is a fully managed relational database service hosted on Azure and offers 99.99% SLA for availability, which helps this solution scale to a full production system. The database also supports 100 database transaction units but can scale to 4,000 units when required. The DTU is a blended measure of performance that can be used to get predictable performance.

![]({{ site.baseurl }}/images/croke11.png)


The database tables are populated by the Stream Analytics jobs described previously.

![]({{ site.baseurl }}/images/croke12.png)


**BLOB storage**

As well as storing the data in a structured store like SQL Database, we have also used BLOB (binary large object) storage to store all raw JSON data that is sent to the IoT hub. This has allowed the team to query the JSON directly and review the format as well as diagnose any issues with data ingestion. This also allows us to take sample data to test with Stream Analytics jobs' queries.

The following image shows how the storage account can be monitored, including data inserts over time and egress of data. For the purposes of this pilot, a geo-replication storage account was used. This meant that all data was replicated three times within the Dublin Azure region but also replicated out to the Netherlands region in case of a disaster. This is important as this forms the basis of our disaster recovery plan. If something happens in Dublin we can rebuild the entire system using the data stored in this BLOB account. Even if Dublin were completely down due to some natural disaster, all data could be retrieved from the Netherlands.

![]({{ site.baseurl }}/images/croke13.png)


**Web API**

The Web API application was created in Visual Studio 2015 and contains a number of REST APIs to access the data stored within the SQL database. This REST API is then used by front-end dashboards or apps that need access to any of the data.

![]({{ site.baseurl }}/images/croke14.png)


**Web dashboard**

A simple web dashboard was created to present the data online. The dashboard was built using the MVC framework within Visual Studio 2016 and used Power BI Embedded to embed Power BI dashboards. The Power BI dashboards were built using Power BI Desktop and then uploaded to Microsoft Azure to make them available to the web dashboard. To get started building the dashboard, [*sample code*](https://github.com/Azure-Samples/power-bi-embedded-integrate-report-into-web-app/) from the Azure team was used.

Two Power BI reports were created and uploaded to an Azure Power BI workspace. Both reports connect directly to the SQL database described previously and use a number of views to present the following information:

- 15-minute rolling average sound data and maximum spikes for the last 20 minutes, 60 minutes, 2 hours, 1 day, and any specific date to review historical data. This data is represented in a single Power BI data set as tabs; see the following diagram.
- Most recent wind speed data, average wind speed data for the current day, and a time series graph of wind speed for the current day. This graph helps indicate the likelihood of a skyline tour taking place.

The following diagrams show the dashboard interfaces:

![]({{ site.baseurl }}/images/croke15.png)


![]({{ site.baseurl }}/images/croke16.png)


![]({{ site.baseurl }}/images/croke17.png)


## Conclusions ##

The purpose of this project was primarily research and some decisions made were done so in this light. For example, choice of radio and gateway devices would be different when this project is rolled out for full production. This said, conducting this research project with a clear view of the business models and use cases from the outset has enabled all stakeholders to learn exactly what is involved in developing and deploying an IoT solution that can drive business value. To do this, the project team had to ensure that certain elements of the infrastructure and the outputs of the solution were robust enough to allow us to demonstrate real business value with a clear view of total cost of ownership and return on investment. To achieve this, we did several things:

- From the outset, the team carried out several stakeholder workshops and interviews to scope use cases and define user requirements.

- The project engaged with Sonitus Systems, an industrial sound monitoring organization commissioned by Dublin City Council to monitor sound pollution around the city. This proved invaluable in designing the dashboard interfaces and allowed us to prove that collecting the data centrally and sharing this data via the dashboard could greatly improve the productivity of the sound monitoring exercise and at the same time provide a mechanism to compare site measurements against sound pollution regulations in real time and potentially alert sound desk engineers of impending infractions.

- Once the solution was ready we engaged with the GAA communications team to implement a fan engagement scenario, the crowd cheer or "the roar of the 16<sup>th</sup> Player," during the All-Ireland intercounty football and hurling finals. In addition to engaging the crowd via the big screens in the stadium, this simple scenario saw the GAA get over 25,000 impressions on one single tweet sent during the hurling final alone. This engagement far exceeds anything that was done before and offers real value for the GAA in engaging with their members and fans.

- The use of Microsoft Azure and Power BI as the back-end ingestion and analytics platform allowed the team to deploy a solution quickly as the IoT and dashboarding services available are pre-built for these types of scenarios. This resulted in a lot less coding and development work than would have been required if the solution was built from the ground up. Using Azure also meant we were using a robust platform that could handle the relatively low amounts of data we were processing for this pilot but could scale to handle a significantly larger deployment and keep the costs in line with this scale. This has allowed the team to more accurately predict the cost of the solution as it grew.

### Learnings ###

- **Team makeup and governance.** As this IoT project has proved, quite a few elements need to work together, from sensors to gateways to data collection and analysis. This means working with a variety of different technologies that require different skills and resources to get working well. It also requires working with a number of partners and/or vendors to realize the value of the project. Creating a good governance framework and rhythm of business from the outset was critical for the success of the project. This involved a biweekly steering group meeting to agree on strategy and report on progress with representatives from all partners as well as a technical core team that discussed implementation details and reported back up to the steering committee.

- **Health and safety.** Due to the nature of an IoT project, equipment must be installed and/or configured on site. For this project we were challenged with connectivity between microphones and gateways and had to move gateways to find the optimum positioning to ensure connectivity. Doing any of this work requires physical access to stadium stands and requires personnel on site to support. These activities can take time and need to be accounted for in project plans. Coordination of schedules and management of time to fit into busy working calendars across different stakeholders is a major challenge. A stadium constantly has big events and ongoing construction and IT upgrades. Staff are busy with day jobs and although often enthusiastic and helpful, it can be hard to find the right person for the right task at the right time. Getting access to stand areas, ladders, coordinating between different facilities groups, regulations, opening ports, all can mean a task estimated to take a morning can take several days. The team concluded that the most efficient model is for the deployment engineer to embed locally and spend a block of 3-4 days on site rather than splitting a task across repeat visits.

- **Environment and resilience.** Large buildings much like large organizations evolve over time and often unevenly. Behind the streamlined front-of-house processes of a stadium, council or company lie many processes, silos, personalities, and fiefdoms. Equally, IT systems are not guaranteed to be interoperable and networks of cables are seldom clearly mapped out and understood. As this was a proof of concept, some of the equipment used and how it was connected was not robust enough if this solution was to be used in a production environment. RFBee radio connectivity, for example, is not robust enough and meant we spent a lot of time positioning gateways and microphones for optimal connectivity. A stadium is a complex and difficultly built concrete-and-steel environment with multiple radio frequencies and interference. Most sensors used were wireless and we have faced challenges in antennae direction and 868 & 868 MHz for range and penetration. The metal turnstile gateway required considerable effort to extend and mount an external antenna. It is also important not to underestimate the disruptions that can be caused by environmental factors such as temperature, moisture, air and animals to an IoT system. These experiences are steering how Intel is thinking about the selection of materials and components and redefining operational capabilities. For example:
    - New separate enclosures for gateways had to be created, and power supplies and RF connectors for sensor nodes had to be hardened and improved.
    - New brackets had to be created to support large birds sitting on and moving cameras.
    - Relocating hardware in secure locked areas to avoid accidental interference by non-project members.
    
- **Packet loss.** Loss of data packets from the sound level monitoring system was experienced, especially during big events such as the Hurling and Gaelic Football finals, when the stadium is filled with over 82,000 fans. This is an issue that is not unique to this deployment. Mobile carriers and Internet providers have spent decades to find a solution to establish fast and reliable wireless data communication channels in this kind of highly dense and highly dynamic environment. It was difficult initially to understand where the loss occurred; however, after investigation, a number of issues were discovered:
    - JSON format. The Azure back-end setup relies on data being sent in valid JSON format before being analyzed and aggregated in real time. Any invalid value or changes to the format resulted in dropped packets by Azure. New functionality in Stream Analytics makes it very easy to test real-time analytics scripts against sample data, but there seems to be no real way of dealing with invalid formats. To resolve this, all data was pushed to BLOB storage so that we could analyze all packets to understand where formats were changing. This helped greatly in agreeing on a strict format and sticking with it as well as making the Stream Analytics jobs flexible enough to handle new data sent within the packets. Invalid JSON was much more difficult to deal with and is simply dropped at the moment. It is worth considering using routines on the gateways or master gateway to validate JSON formats before sending to Azure and alerting or logging results. In addition, a two-way communication mechanism may be applied so that Azure can request the gateway to re-send the missing/damaged data at quieter times.
    - The current setup may suffer from radio signal interference in the high-dynamic and high-density environment. The motion from human bodies and the signals from their mobile devices along with wireless signals from TV broadcast crews, Garda officers, and security teams may all interfere the wireless data communication between the microphone and the gateway. This can be confirmed from the following graph, showing that the number of packets lost starts decreasing when the game is over and almost no packets were lost as soon as all the fans exited the stadium. This issue is well recognized and a project is under way to build more resilience into to the system.
    
*A sample of sound data packets lost at a match day (2016 Gaelic Football final replay, over 82,000 fans in attendance)*
      
![]({{ site.baseurl }}/images/croke18.png)
        
      
*The network traffic at Croke Park during a game day. A huge network traffic increase occurred during the half-time break (red: incoming traffic; blue: outgoing traffic).*

![]({{ site.baseurl }}/images/croke19.png)
        

  “Black out” periods were also experienced at the half-time break, where the Azure platform received no data from the sound monitoring system. In addition to the causes discussed above, we have theorized that people initiating connections with their mobile devices to the Croke Park free Wi-Fi network at the start of half-time generate a huge network traffic at the half time break (as seen in the graph above). This may jam the data transmission between the gateway and Azure, which further increases the data lost. A solution to this will also be tested in the project under way as described above.
    
- **Payload frequency.** The edge microphones aggregated data and sent pay loads to the gateways every minute. This frequency was perfectly fine for the sound pollution use case when data is aggregated over 15-minute periods; however, this could mean missing a spike at a match. As this solution proved very successful for fan engagement, the team will be investigating opportunities to increase the data frequency.
