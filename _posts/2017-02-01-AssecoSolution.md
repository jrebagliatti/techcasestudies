---
layout: post
title: "Using Power BI Embedded, Asseco can modernize visualization for effective service processes"
author: "Miroslav Kubovcik, Lubomir Goryl, and Stanislav Harvan"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-04-03
categories: [Power BI Embedded]
color: "blue"
image: "images/AssecoSolutions/feat_5Presentationforcustomers.jpg"
excerpt: Microsoft assisted Asseco Solutions in extending a service application with modern visualization built on top of Power BI Embedded in Microsoft Azure. The complex visualizations provide a set of views on IoT data generated from machines located at customer venues.
language: [English]
verticals: [Professional Services]
geolocation: [Europe]
#permalink: /<page-title>.html
---

Asseco Solutions, working with Microsoft, extended its existing Smart Connected Solutions (SCS) application that provides a service system for its customers with all relevant machine data and information, including scheduling of next service date. The service app dashboard and reporting were refreshed with modern visualization built on top of Power BI Embedded in Microsoft Azure. The complex visualizations provide a set of views on IoT data generated from machines located at customer sites, which simplifies the overall complexity of the maintenance cycle. 

The joint team of Asseco Solutions and Microsoft prepared a prototype of a new module of the application, with code for a new visualization application extension. As a base, the existing AngularJS web application was used and the architecture was updated using new visualization technology, which is appropriate for existing customers with data on-premises and also for new customers collecting data in the cloud. 

**The core team:**

- Radoslav Balvan – Director of Enterprise Segment, Asseco Solutions Slovakia
- Dušan Mušák – Senior Architect, Asseco Solutions Slovakia
- Zdeněk Musil – Senior Architect plus team of two developers, Asseco Solutions Czech Republic
- David Kapusniak – IT Tester/Analyst, Asseco Solutions Slovakia
- Miroslav Kubovčík – Senior Technical Evangelist, Microsoft
- Ľubomír Goryl – Technical Solution Specialist for Data Platform, Microsoft
- Stanislav Harvan – Technical Evangelist, Microsoft
 
## Customer profile ##

[Asseco Solutions](http://www.assecosolutions.com) is an independent software vendor with several enterprise resource planning (ERP) and HORECA (food service industry) products and more than 30,000 users in Central and Western Europe. The company is located in Germany, Austria, Switzerland, the Czech Republic, and Slovakia with subsidiaries in Italy and Central America. Its head offices are located according to company structure in Karlsruhe (for the DACH region), Prague (for Czech Republic), and Bratislava (for Slovakia). 

Asseco has developer teams in every country. Recently, the company has focused not only on improvements to the core ERP products but also on product portfolio integration with current market trends and industry-specific applications applying Industry 4.0. (For example, tailored solutions for the larger and medium-sized companies involved in mechanical and plant engineering, vehicle construction and automotive, series production, wholesale and service providers). Software development is product-based (with country developer teams dedicated to one product) and also project-based for regional projects (with developer teams consisting of members from all Asseco Solutions-located countries). 
 
## Problem statement ##

The complex architecture of the service application did not contain an advanced interactive reporting/dashboard level for the final users of the machines. The application was already partially prepared for data collection in the cloud through web services, but in a less scalable data ingestion. Modern visualization and requests for cloud-ready patterns were two main reasons for updating the application architecture. However, we realized the existing front-end application platform (AngularJS) was appropriate with the existing code base and modules.

We identified two technical problems we would have to solve. These were agreed on by our core team: 

-	Prepare a new complex architecture, which will allow use of Power BI Embedded visualizations for data collected not only in the cloud, but also with existing web services. 
-	Implement new code for embedding Power BI Embedded visualizations into the existing application front-end AngularJS.

Implementing Power BI Embedded enabled the final users of the serviced machines to see the vital data about the machines, including their status and other maintenance data.
 
## Solution, steps, and delivery ##

We reviewed the existing status/workflow of the SCS application. SCS records machine data and transmits it into application storage. 
Based on this data, the SCS application performs malfunction analysis and prediction. SCS calculates when preventive maintenance is necessary. SCS also offers an interface to the ERP system for effective accounting. We focused on creation of a new data visualization module effectively running in the Power BI Embedded service, which will be embedded into the existing AngularJS client.

**These are the steps and responsibilities agreed on by the team:**

1. Power BI Embedded learning and onboarding (Microsoft team).
2. Architecture review (Asseco Solutions and Microsoft team).
3. Power BI Embedded quickstart project for existing AngularJS project focused on minimal change to existing solution (Microsoft team). 
4. Advisory and sample code for Power BI Embedded authentication and authorization integration into existing solution (Microsoft team).
5. Data sources/data formatting advisory for Power BI Embedded integration into existing solution (Microsoft team).
6. Power BI Embedded visualizations design over test data. Reuse of quickstart project and advisories/architecture recommendations in AngularJS solution for pilot live presentation (Asseco Solutions team).

## Power BI Embedded learning and onboarding ##

The first mandatory step for a successful project was the learning/onboarding session provided by the Microsoft team. The Asseco Solutions team learned about the Power BI Embedded service:

- [API model](https://docs.microsoft.com/en-us/rest/api/powerbiembedded/workspacecollections?redirectedfrom=MSDN) 
- [Authentication flow](https://docs.microsoft.com/en-us/azure/power-bi-embedded/power-bi-embedded-app-token-flow) 
- [Authoring reports](https://powerbi.microsoft.com/en-us/documentation/powerbi-desktop-get-the-desktop/) 
- [Pricing model](https://azure.microsoft.com/en-us/pricing/details/power-bi-embedded/)

*Figure 1. Learning/onboarding session*

![On boarding]({{ site.baseurl }}/images/AssecoSolutions/1Onboarding.jpg)
    

## Architecture review ##

The existing application architecture was designed for on-premises data collecting through web services hosted in private datacenters. Data for servicing analysis was stored from web services code to an on-premises database and presented in an AngularJS web front-end application. The reporting part was built on a custom simple presentation layer using JavaScript and HTML.

*Figure 2. Architecture before cloud services and Power BI Embedded implementation*

![Architecture before]({{ site.baseurl }}/images/AssecoSolutions/2Architecturebeforecloud.jpg)


At the architecture session, we redesigned the SCS application with a focus on cloud scalability, especially with platform services.

*Figure 3. Architecture session*
  
![Architecture session]({{ site.baseurl }}/images/AssecoSolutions/3Architecturesession.jpg)


A new architecture branch opens a more flexible and scalable model for customers fully accepting cloud benefits. Data will be collected from monitored machines directly to Azure IoT Hub, which is more suitable and scalable for data ingestion. Azure SQL Database is used as storage for the collected data. The existing AngularJS application will be hosted in Azure App Service for cloud application deployment. 

A modern Power BI Embedded visualization dashboard and reports will be embedded into the AngularJS application. A Web API running in Azure App Service will generate embed tokens for authentication into reports hosted by Power BI Embedded. A new visualization built on top of Power BI Embedded will allow embedding of the same visualization workspace not only to the new cloud-based part but also into existing  deployments running in private datacenters.

*Figure 4. Proposed architecture using Microsoft Azure cloud platform*
  
![Architecture for cloud]({{ site.baseurl }}/images/AssecoSolutions/4Architectureforcloud.jpg)


## Power BI Embedded quickstart project ##

Implementation of a new visualization platform into the existing AngularJS application was accelerated by a quickstart project prepared by the Microsoft team. We had to reject use of the Power BI-Angular library due to conflicts with libraries already being used in the existing SCS application. That was the reason for the quickstart project with a focus on AngularJS controllers requesting metadata from the Web API façade over a Power BI Embedded workspace. 

We decided to cover a Power BI Embedded API with a Web API running in Azure App Service due to security and simpler integration with other systems in the future. The Web API project is based on an ASP.NET MVC Web API template. The most important part of its code is webapiconfig.cs, which declares mapping of HTTP calls to methods using the .NET NuGet packages Microsoft.PowerBI.Api and Microsoft.PowerBI.Core. For example, this code snippet in webapiconfig.cs will map the client call `http://<webapi dns name>/api/report` to the method GetAllReports defined in the controller “ReportController”.

```
      config.Routes.MapHttpRoute(
      name: "GetAllReports",
      routeTemplate: "api/{controller}",
      defaults: new { action = "GetAllReports" } );
```

Code of “GetAllReports” method uses .NET library from NuGet package Microsoft.PowerBI.Api:

```
    public List<Report> GetAllReports() 
        {
            using (var client = this.CreatePowerBIClient())
            {
                var reportsResponse = client.Reports.GetReports(this.workspaceCollection, this.workspaceId);
                return reportsResponse.Value.ToList<Report>();
            }
        }

```

Output from this call is based on the data model Report, which contains all information necessary for report embedding on the client AngularJS—embed URL, ID of report, report name, and web URL of rendering.
 
For the AngularJS client, it is sufficient to reference the NuGet package Microsoft.PowerBI.JavaScript, which contains all methods necessary for report embedding in JavaScript. The benefit of a built Web API providing report metadata is visible in the clear code of AngularJS ReportsController—for example, for retrieving of a report list:

``` 
     $scope.reportlist = function ()
        {
            $http.get('http://<webapi dns name>/api/report').
            success(function (data, status, headers, config) {
             $scope.reports = data;
             $scope.counter = 0;
              //for dev session only : show name of first report 
              alert($scope.reports[0].name);
              //initially select first report in list
             $scope.selectedReport = $scope.reports[0].id;
            }).error(function (data, status, headers, config) {
              alert("Error : read list of reports from WebApi ");
            });
        }
```

The quickstart project created by the Microsoft team is published at [https://github.com/mirkub2/PBIEmbedded_AngularJSclient_WebApibackend](https://github.com/mirkub2/PBIEmbedded_AngularJSclient_WebApibackend).

## Advisory and sample code for Power BI Embedded authentication and authorization ##

Access to reports in the Power BI Embedded workspace is based on master tokens ("apptoken") or embedding tokens (JWT tokens generated from "apptoken," ID of report, and, optionally, username/role). Generating an embed token on the client side in JavaScript is no problem, but we have to secure "apptoken," which is more complicated in JavaScript client code compared to Web API running on the server side. Due to this, the Web API back end will provide not only a list of reports in the Power BI Embedded workspace, but it also will generate embed tokens. Because Power BI Embedded also supports row-level security, we decided to prepare code for our Web API project, which will generate various types of embed tokens:

-	Embed tokens without row-level security.
-	Embed tokens with row-level security based only on username. 
-	Embed tokens with row-level security based on username and role. 

For the client AngularJS application, this architecture simplified embed token generating:

```
    var reportEmbedToken =  function (rid,username,roles) {
            var token = "";
            $http.get('http:// <webapi dns name>/api/report' + '/' + rid + '/' + username + '/' + roles).
            success(function (data, status, headers, config) {
                token = data;
                //for dev session only – show generated token
                alert(token);
                $scope.embedUrl = token;
                $scope.visrender = true;
                $scope.vislogin_sumbitrender = false;
                $scope.reportId = $scope.selectedReport;
                $scope.embedUrl = 'https://embedded.powerbi.com/appTokenReportEmbed?reportId=' + $scope.reportId;
                var divreportu = document.getElementById("Report");
                divreportu.attributes.getNamedItem("powerbi-access-token").value = token;
                powerbi.embed(divreportu, { embedUrl: 'https://embedded.powerbi.com/appTokenReportEmbed?reportId=' + $scope.reportId, accessToken: token });
                powerbi.init();
            }).error(function (data, status, headers, config) {
                alert("Error : get embed token for report from WebApi");
                token = "";
            });
        }
```

We recommended also implementing code for a counter of open report sessions. This will stop anomalous behavior and save costs in anomalous situations. For example, if a user opens a report session 10 times within a short time, the rendering part of the application will be hidden. Sample code is in the quickstart project created by the Microsoft team and published at [https://github.com/mirkub2/PBIEmbedded_AngularJSclient_WebApibackend](https://github.com/mirkub2/PBIEmbedded_AngularJSclient_WebApibackend).

## Data sources and data formatting advisory ##

The project core team worked on data source preparation (Azure SQL Database) and a valid data model (especially for active row-level security data filtering). One open question was whether in authoring we could use raw JSON data saved directly into an Azure SQL database. Data ingestion efficiency can be supported by the in-memory engine of the SQL database. Authoring in Power BI Desktop over JSON data can be solved with "views." The following is a sample of this view:

```
    CREATE VIEW dbo.viewStatusData AS
    SELECT	id,device_id, 'status_group'=JSON_VALUE(status_info, '$.status_group'), 'status_text'=JSON_VALUE(status_info, '$.status_text'), 'status_value'=convert(numeric(18,2),JSON_VALUE(status_info, '$.status_value')), 'status_location'=JSON_VALUE(status_info, '$.status_location'), 'status_date'=convert(datetime,JSON_VALUE(status_info, '$.status_date')) from [dbo].[status_extended_json]

```

Where a sample of a JSON message generated by the machine is:

```
{"device_id":1,"status_group":"Error","status_text":"Undefined","status_value":0.00,"status_location":"Bratislava","status_date":"2016-09-01T00:00:00"}
```

Sample reports, schema, and T-SQL commands for a sample data insert are in the quickstart project created by the Microsoft team: [https://github.com/mirkub2/PBIEmbedded_AngularJSclient_WebApibackend](https://github.com/mirkub2/PBIEmbedded_AngularJSclient_WebApibackend).

## Power BI Embedded visualizations and live presentation for customers ##

The Asseco Solutions team used the quickstart project, advisories, and code from all team code sessions. They built a solution based on the recommended architecture over the real data, including authoring of reports in a [Power BI Desktop tool](https://powerbi.microsoft.com/en-us/desktop/). The result of this precise work was publicly presented to customers with very high satisfaction.

*Figure 5. Practical presentation for customers*
  
![Presentation for customers]({{ site.baseurl }}/images/AssecoSolutions/5Presentationforcustomers.jpg)
    

*Figure 6. Review of dashboards for customers*
  
![Review for customers]({{ site.baseurl }}/images/AssecoSolutions/6Presentationforcustomers2.jpg)


## Conclusion ##

The teamwork between Asseco Solutions and Microsoft started with the one-day learning session followed by practical architecture and coding sessions, and it finished with the successful refresh of the visualization part of the servicing application. The use of Power BI Embedded extended the existing AngularJS application with a highly interactive dashboard experience.

>*"The Microsoft team helped us to innovate the existing application to a new visualization level. This brings our customers and servicing engineers an understandable interactive view of the complexity of the whole servicing process."*
>
>Radoslav Balvan, Director of Enterprise Segment, Asseco Solutions Slovakia

## Additional resources ##

-	[Quickstart project created for this solution](https://github.com/mirkub2/PBIEmbedded_AngularJSclient_WebApibackend)
-	[SCS website](http://www.scslive.com/) 
-	[SCS functionality video](https://www.youtube.com/watch?v=qmaf7x1Nwfc)

