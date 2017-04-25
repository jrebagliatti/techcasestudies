---
layout: post
title:  "Financial Express uses Power BI Embedded to help customers explore large volumes of financial information quickly and easily"
author: "Bianca Furtuna and David Gristwood"
author-link: "https://twitter.com/Fur_Bi"
author-image: "/images/2017-01-27-FinancialExpressPBIE/bianca_furtuna.jpg"
date: 2017-04-25
categories: [Power BI Embedded]
color: "blue"
excerpt: Microsoft teamed up with ISV Financial Express to help them use Power BI Embedded to encourage customers to explore large volumes of financial information quickly and easily.
language: [English]
verticals: [Financial Services]
---

Financial Express wanted to expand their current offering by providing a new set of interactive reports aimed at making more information available to their B2B customers, who currently receive one-off reports that are manual and time-consuming. They wanted to improve not only the reporting process, but also the user experience of their product by using interactive reports and a dashboard. As part of a hackfest with Financial Express, Microsoft prototyped a new portal that contains an embedded set of reports, enabling their customer to have faster and better access to information. We explored different architectures and settled on a DirectQuery approach from Power BI Embedded to an Azure SQL Database.
 
### Key technologies used
* [Microsoft Power BI Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/)
    * [Power BI Embedded REST APIs](https://docs.microsoft.com/en-us/azure/power-bi-embedded/power-bi-embedded-iframe)
* [Power BI Desktop](https://powerbi.microsoft.com/en-us/desktop/) 
* [PowerBI-Cli Tool](https://github.com/Microsoft/PowerBI-Cli)
* Microsoft Azure SQL Database ([DirectQuery connection to Power BI Embedded](https://powerbi.microsoft.com/en-us/documentation/powerbi-azure-sql-database-with-direct-connect/))
* SQL Server on-premises
* [Azure Analysis Services (preview)](https://azure.microsoft.com/en-us/services/analysis-services/)
 

### Core team
* __Microsoft__
    * [Bianca Furtuna](https://twitter.com/Fur_Bi) – Microsoft Technical Evangelist
    * [David Gristwood](https://twitter.com/ScroffTheBad) – Microsoft Technical Evangelist
    * [Amy Nicholson](https://twitter.com/AmyKateNicho) – Microsoft Technical Evangelist
    * [Anna Fear](https://twitter.com/AVFear) – Audience Marketing Manager 
* __Financial Express__
    * Mark Reed – Head of Product Development
    * Rafal Zajac – Senior Software Developer
 
## Customer profile

[Financial Express (FE)](http://www.financialexpress.net/) provides solutions for finance professionals to make the most of their data and connect with their clients, which include financial advisers (through their [FE Analytics+ tools](http://www.financialexpress.net/adviser)) and asset managers (via their [FE Precision+ Fund Management Software](http://www.financialexpress.net/asset-managers-institutions/fund-management-software)).

Trusted by hundreds of thousands of investors, advisers, asset managers, and platforms who use FE data, software, and investment advice every day, FE is the UK's leading investment ratings and research agency.

FE has offices in [multiple locations across the globe](http://www.financialexpress.net/contact). For the purposes of this project, we worked with a team in their Woking, UK offices.
 
## Problem statement
 
FE operates under a typical independent software vendor (ISV) model, providing products and solutions to finance professionals. As part of one of their solutions, they offer manual one-off reports to their customers. Building these reports is a laborious, time-consuming process, so a key requirement for them is the development of a new portal that automates the creation of these reports. A Power BI Embedded solution would allow them to build a new interactive reporting portal, which would take advantage of their extensive dataset and provide additional insights and value for their customers.

## Solution, steps, and delivery 

The goal of this engagement was to create an embedded report as part of a new portal and to connect that report to FE's existing database, while exploring better ways of storing and structuring their data. The engagement consisted of two parts:
1. Creating a new portal for the reports, building on their existing codebase and architecture. 
2. Exploring the limitations that existed around their current data store, which runs to hundreds of millions of rows of data, and looking at how to connect that efficiently to Power BI Embedded to create a fast, interactive experience. 
 
Their current data architecture uses an on-premises SQL Server database. Due to the current limitations of Power BI Embedded, DirectQuery from Azure to the on-premises database is not currently supported. So to speed up development during the hackfest, they built a .pbix file against the current database, and tested Power BI Embedded against reports in a Power BI Workspace Collection where the .pbix file was imported, and used it against a subset of data in an Azure SQL Database.
 
An Extract, Transform, and Load (ETL) process was used to move a subset of the data from the on-premises instance of SQL Server to Azure SQL Database. Their on-premises database was optimized for storage rather than performance, so even when a smaller subset of their database was moved to Azure SQL Database, DirectQuery was too slow. The data was then remodeled when transferred to the Azure SQL Database, and as a result, the performance of their queries did improve. 

### Creating a new portal for reports

The new portal was based on their existing codebase that has an AngularJS front-end and an ASP.NET MVC back-end. The .NET SDKs were used to create a JWT token, and then the token was passed via REST APIs to the AngularJS front-end. The next step was to get the embed URL by using the [Power BI Angular client](https://github.com/Microsoft/PowerBI-Angular) and the generated token. The report was then embedded into the UI using the embed URL, and it displayed reports when the app token was signed and the .pbix file returned.

<br/>
![Architecture implemented during hackfest to address part 1 of the project]({{ site.baseurl }}/images/2017-01-27-FinancialExpressPBIE/architecture1.png)  
<br/>  

<br/>
![Embedded Row Level security reports]({{ site.baseurl }}/images/2017-01-27-FinancialExpressPBIE/reports.png)  
<br/>
 
### Exploring the limitations of their current data store and connecting it to Power BI Embedded 
 
One of the more interesting aspects of this project was the large volumes of data needed to drive the new insights dashboard. One of the key requirements was the need to examine large volumes of telemetry data that was acquired from the users' interaction with the website, from reports such as the following.

<br/>
![Telemetry data from user interaction with website]({{ site.baseurl }}/images/2017-01-27-FinancialExpressPBIE/userinteractiondata.png)  
<br/>
 
FE is looking for trends for every type of report, fund, financial instrument, and KPI referenced. This very quickly amounts to very large volumes of data, each entry amounting to one web view that a customer or fund manager might choose to examine. 

#### Consolidate fact tables 

FE collects this data into two large fact tables (one consisting of 450 million rows, another of 150 million rows) that have a relational link between them and a number of dimension tables. During the hackfest, we revisited this design and flattened out the two fact tables into a single table, trading ease of dashboard design for space-saving. After looking at these volumes in a column-based store in SQL Database Premium or SQL Data Warehouse, this seemed a good trade-off. 
 
#### Create a reporting data store

During the lab, working with such large volumes of data and remodeling was too time-consuming, so we worked with a smaller 5-million-row set. Even at this volume, looking at the data, we discovered some data that would never be used to report against, so we could further optimize for this. We also drilled down into setting up the reporting data repository, as well as doing an ETL into this repository of the more recent data that would be reported against; in the area of fast-moving financial indexes, there is little need to go back beyond 6 months of data for dashboards that end users will consume.
 
Following were the core tables we worked with during the hackfest.

<br/>
![Data tables within reporting database]({{ site.baseurl }}/images/2017-01-27-FinancialExpressPBIE/datatables.png)  
<br/>
 
#### Ensure the integrity of the data and performance

Performance was a critical aspect of the design work undertaken, and a set of test harness queries were developed to ensure the integrity of the data and benchmark performance.

<br/>
![Test queries and benchmarking for performance]({{ site.baseurl }}/images/2017-01-27-FinancialExpressPBIE/testqueries.png)  
<br/>

<br/>
![Current SQL Server Database on Azure]({{ site.baseurl }}/images/2017-01-27-FinancialExpressPBIE/sqlserverinfo.png)
<br/>
  
One interesting piece of work undertaken, originally unplanned, was the use of [Azure Analysis Services (preview)](https://docs.microsoft.com/en-us/azure/analysis-services/analysis-services-overview) to drive Power BI. This was to meet the need for the less than 3-second query speeds needed against tens of millions of rows of data, which FE's P series SQL Database was not able to support. A tabular data model project was set up to model the data and import it into an S1 from SQL Database.

<br/>
![Create an Analysis Services project]({{ site.baseurl }}/images/2017-01-27-FinancialExpressPBIE/analysisservices.png)  
<br/>

This new architecture performed very well, and with five million rows of test data, led to Power BI being fast and responsive. 

<br/>
![New architecture]({{ site.baseurl }}/images/2017-01-27-FinancialExpressPBIE/new-architecture.png)  
<br/>

The ideal solution for Financial Express is to use Azure Analysis Services on top of their on-premises SQL Server database to drive their Power BI Embedded reports. At the time of the hackfest, there was no support for Azure Analysis Services in Power BI Embedded, so we set up a standard Power BI (non-embedded) dashboard as a temporary solution to be used until this functionality is added to the service.
 
## Technical delivery
 
We created a Power BI Embedded Workspace Collection in Azure and used [PowerBI-Cli](https://github.com/Microsoft/PowerBI-Cli) to create a new workspace and import the .pbix file into this workspace.

We then used the .NET SDK to create the JWT (JSON web token) as shown in the following code.

<br/>

```c#
namespace ServerSide.Controllers
{
    public class PowerBiController : ApiController
    {
        private readonly string workspaceCollection;
        private readonly string workspaceId;
        private readonly string accessKey;
        private readonly string apiUrl;

        public PowerBiController()
        {
            this.workspaceCollection = ConfigurationManager.AppSettings["powerbi:WorkspaceCollection"];
            this.workspaceId = ConfigurationManager.AppSettings["powerbi:WorkspaceId"];
            this.accessKey = ConfigurationManager.AppSettings["powerbi:AccessKey"];
            this.apiUrl = ConfigurationManager.AppSettings["powerbi:ApiUrl"];
        }
        [Route("reports"), HttpGet]
        public async Task<List<Report>> GetReports()
        {
            using (var client = this.CreatePowerBIClient())
            {
                var reportsResponse = await client.Reports.GetReportsAsync(this.workspaceCollection, this.workspaceId);
                return reportsResponse.Value.ToList();
            }
        }

        [Route("report/{reportId}"), HttpGet]
        public async Task<PowerBiReport> GetReport(string reportId)
        {
            using (var client = this.CreatePowerBIClient())
            {
                var reportsResponse = await client.Reports.GetReportsAsync(this.workspaceCollection, this.workspaceId);
                var report = reportsResponse.Value.FirstOrDefault(r => r.Id == reportId);
                var principal = (FeAuthPrincipal)this.RequestContext.Principal;
                var embedToken = PowerBIToken.CreateReportEmbedToken(this.workspaceCollection, this.workspaceId, report.Id, principal.UserProfile.Username, principal.UserProfile.Roles.ToArray());

               return new PowerBiReport
               {
                    Report = report,
                    AccessToken = embedToken.Generate(this.accessKey)
                };
            }
        }

        private IPowerBIClient CreatePowerBIClient()
        {
            var credentials = new TokenCredentials(accessKey, "AppKey");
            var client = new PowerBIClient(credentials)
            {
                BaseUri = new Uri(apiUrl)
            };

            return client;
        }
    }
}

```
<br/>

We next fetched embed data from the server (MVC application) as shown in the following code.

<br/>

```javascript
(function () {
    "use strict";

    angular
        .module("app")
        .controller("pbireportCtrl", pbireportCtrl);

    pbireportCtrl.$inject = ["ServerSideSrv", "UserSrv", "$state"];

    function pbireportCtrl(ServerSideSrv, UserSrv, $state) {
        /* jshint validthis:true */
        console.log($state.params.reportId);
        if (!UserSrv.isAuthenticated()) {
            $state.go("login", { returnTo: "main.pbireportCtrl" });
            return;
        }

        var vm = this;

        activate();

        function activate() {
            ServerSideSrv.getReport($state.params.reportId).then(
                function (ret) {
                    console.log("Report result");
                    console.log(ret);
                    vm.report = ret.data;
                }                );
        }
    }
})();
```
<br/>

Finally, we inserted the Power BI Embedded component in the UI.

<br/>

```html
<md-content flex layout="column">
    <powerbi-report embed-url="vm.report.Report.embedUrl" access-token="vm.report.AccessToken" flex style="height:500px;"></powerbi-report>

</md-content>
```
 
### Pointers, references, and documentation
 
The management of Power BI workspaces and the import of the .pbix files cannot be done very easily, such as via the UI in the Azure portal. The PowerBI-Cli was a great tool to help us with the service management piece [https://github.com/Microsoft/PowerBI-Cli](https://github.com/Microsoft/PowerBI-Cli).
 
The Power BI Embedded documentation has some great samples that allowed us to get started quickly with both .NET SDKs and JavaScript APIs. Following is a list of the resources we found very useful:
* [Demo of JavaScript APIs and Embedding Scenario](https://microsoft.github.io/PowerBI-JavaScript/demo/code-demo/index.html#)
* [Getting Started C# Sample](https://docs.microsoft.com/en-us/azure/power-bi-embedded/power-bi-embedded-get-started-sample)
* [Row Level Security Sample](https://docs.microsoft.com/en-us/azure/power-bi-embedded/power-bi-embedded-rls)
* [JavaScript Library on GitHub](https://github.com/Microsoft/PowerBI-JavaScript)
 
 
### Learnings from the Microsoft and Financial Express teams
 
* Separating out line-of-business data from reporting data was key, especially for large data systems like this one. A badly designed data store can easily introduce significant latency during the dashboard experience.
* A data store set up specifically for Power BI to report against does not need to contain all the data held in the back end system, and can be optimized for reporting by removing redundant data and laying out the data in a user-centric reporting format.
* [Azure Analysis Services](https://azure.microsoft.com/en-us/services/analysis-services/) is an ideal way to host large volumes of data for fast, interactive reporting in Power BI, but is currently not supported in Power BI Embedded.
 
## Conclusion 
In conclusion, the hackfest was a successful activity for both Financial Express and Microsoft. We achieved the goals set at the beginning of the engagement: 
- Create a new portal that contained an interactive set of reports.
- Explore how to better store the data for fast and performant queries. 

We acquired a great amount of knowledge not only about Power BI Embedded, but also about the underlying data sources that could connect to this service. This engagement allowed Financial Express to prove the concept for their new portal, identify potential limitations of their underlying data store, and start the journey to move this project closer to production.

### Post-hackfest update

The Financial Express team left the hackfest with a huge amount of knowledge as well as a proof of concept with Power BI Embedded in their new FE Analytics portal offering. 

During the hackfest, they experimented with their data pipeline (to get advice and update the way they were approaching their reporting database and data pipeline). This was a success (data pipeline work now completed) as they refactored their fact tables and huge amounts of data for a specific reporting data store, and experimented with Azure Analysis Services. The application is working as it stands from an Azure SQL Database; however, after Azure Analysis Services is integrated as a DirectQuery resource into Power BI Embedded, FE could make this move with their new portal application.

Since the hackfest, FE has really moved the project forward, and the data pipeline and backend database are now in a great format for reporting in Power BI Embedded. 

*"It has given us a chance to look at how we can better present our data in Power BI [Embedded], so there has been a lot of re-working of both the data and the report layout itself." — Mark Reed, Head of Product Development, Financial Express*

This work has now put Financial Express in a position to move their new service portal into production.
 
