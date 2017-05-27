---
layout: post
title: "Netpartners adopts Power BI Embedded to easily deliver customized sales reports to its customers"
author: "Caio Chaves Garcez"
author-link: "https://twitter.com/Caio_garcez"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-04-19
categories: [Power BI Embedded]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Netpartners leveraged Power BI Embedded for its new Sales Assistant solution, which will deliver customized sales reports to hundreds of customers.
language: [English]
verticals: [Telecommunications, Discrete Manufacturing, Process Mfg & Resources]
geolocation: [South America]
#permalink: /<page-title>.html
---

![Figure 0 - Netpartners Logo]({{ site.baseurl }}/images/2017-03-31-netpartners/Figure_0_Netpartners_Logo.png)

Microsoft and Netpartners are working together to build an optimized reporting solution for Netpartners’ customers, leveraging technologies such as Microsoft Azure, [Microsoft Power BI Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/), [Bot Framework](https://dev.botframework.com/), [Language Understanding Intelligent Service (LUIS)](https://www.microsoft.com/cognitive-services/en-us/language-understanding-intelligent-service-luis), and [Bing Speech API](https://www.microsoft.com/cognitive-services/en-us/speech-api). This solution, called **Sales Assistant**, provides customers with a rich user experience and quick access to sales reports. This case study describes the problem statement and the steps taken to build and deliver the reporting part of Sales Assistant, which is based on Power BI Embedded.

Following is the core team that worked on this project:

-   Netpartners

    -   André Borges – Innovation Manager

    -   Jaison Sacramento – Business Analytics Consultant

    -   Luiz Ricardo da Silva Rego – Business Analytics Consultant

    -   Wellington do Carmo – Business Analytics Manager

-   Microsoft

    -   [Allan Targino](https://twitter.com/allantargino) – Technical Evangelist

    -   [Caio Garcez](https://twitter.com/Caio_garcez) – Senior Technical Evangelist

    -   [Cynthia Zanoni](https://twitter.com/cynthiazanoni) – Technical Evangelist

    -   [Lucas Humenhuk](https://twitter.com/mslucash) – Technical Evangelist

## Customer profile

[Netpartners](http://www.netpartners.com.br/en/home-2/) is a company that combines business and technology expertise to offer solutions and services to customers in diverse industries such as Telecommunications, Mining, Pharmaceutical, and Manufacturing, among others. It has a particular focus on Business Intelligence (BI) solutions, combined with business and financial consulting.

The company had its beginnings in 1996 by building systems for BI, Sales Tracking, Supply Chain, Finance, and HR. Its portfolio gradually increased to include the diverse solutions and consulting offers it has today. Netpartners seeks to meet its customers’ needs through constant innovation and strategic partnerships with top technology companies, such as Microsoft.

The company was founded in Brazil and is currently expanding into Latin America and Europe.

## Problem statement

As part of their portfolio, Netpartners developed a solution that synthesizes and consolidates customer sales data. Customers send raw sales data to Netpartners in several formats, and an Extract, Transform, and Load (ETL) process is executed to normalize it and organize it in a standard way. After data is processed, it is imported into an Excel spreadsheet where a Power Pivot is used to build a Relational Online Analytical Processing (ROLAP) model. Visual Basic for Applications (VBA) is used to provide a customized dashboard that shows several business metrics and indicators.

*Figure 1 – Example Excel dashboard (sensitive data covered by red boxes)*
![Figure 1 – Example Excel dashboard (sensitive data covered by red boxes)]({{ site.baseurl }}/images/2017-03-31-netpartners/Figure_1_Excel_Report.png)

This dashboard is sent to customers as an email attachment. A single Excel spreadsheet is generated per customer, and VBA is used to ensure that users can only read data that is suitable and approved for their position (such as seller, sales manager, or director). 

The current process has two major drawbacks:

- The spreadsheets have a lot of data and bundled VBA code, and therefore require significant processing power on users’ computers. This means that users with low-end hardware have a less than optimal experience.
- The spreadsheets are sent with all the data for a particular Netpartners customer. The dashboards hide information that is not meant for users signed in through VBA, but malicious users could in theory attempt to break this barrier and access all the data.

Netpartners would like to have a better way to provide custom reports to its customers, ideally without sacrificing the rich data visualization that tools like Excel can offer. They also wanted to explore different ways to enable user interaction with reports, mainly through Bots powered by a Natural Language interpreter and Text-to-Speech functionality. The following diagram shows the proposed architecture for the new **Sales Assistant** solution.

*Figure 2 – Netpartners Sales Assistant solution architecture*

![Figure 2 – Netpartners Sales Assistant solution architecture]({{ site.baseurl }}/images/2017-03-31-netpartners/Figure_2_Architecture.png)

A joint effort was conducted by Microsoft and Netpartners to integrate Power BI Embedded with Sales Assistant. The steps taken to accomplish this integration are described in the following section.

## Solution, steps and delivery

Netpartners chose Hershey’s as a customer scenario for creating and testing the Power BI Embedded reports. Hershey’s has 700 users who receive the Excel spreadsheet daily, and the reports generated for them are elaborate enough to validate the technology for customers with more complex scenarios.

### Create reports using Power BI Desktop
The first step was to create reports using Power BI Desktop to reproduce what was currently being delivered through Excel. The Excel spreadsheet was imported into Power BI Desktop, and three roles were defined to model the current hierarchy at the customer level:

- BackOffice = has full access to all reports
- Supervisor = can only access data from their sales team
- Seller = can only access their own individual information

Having an existing report as a starting point made it very easy to tweak, customize, and recreate the equivalent visualizations in Power BI Desktop. It was interesting to observe that the report creation process elicited some unexpected insights, because the Data Specialist on the team was able to observe certain aspects of the customer data that were not previously clear.

At the end of the first day of the joint effort, the team already had a working prototype, as shown in Figure 3.

*Figure 3 – Prototype report (sensitive data covered by red boxes)*
![Figure 3 – Prototype report (sensitive data covered by red boxes)]({{ site.baseurl }}/images/2017-03-31-netpartners/Figure_3_PBID_Report.png)

Because Power BI reports are organized in pages, some consideration had to be given to the position of graphs and charts. In Excel the report had been contained on a single sheet, and the user could scroll to see it all. Now information had to be arranged in a different way.

As reports were being created, the team identified the need to create a custom visualization. The Excel report uses “Traffic Light”-style visual indicators that can quickly convey the status of a particular metric or Key Performance Indicator (KPI). The team developed this custom visualization by using [Typescript](http://www.typescriptlang.org/) and [D3.js](https://d3js.org/).

*Code Snippet 1 – Custom “Traffic Light”-style visualization*
```ts
module powerbi.extensibility.visual {

    interface circleKPIVisual {
        color: string;
    }
    export class Visual implements IVisual {
        private target: HTMLElement;
        private host: IVisualHost;
        private updateCount: number;
        private svg: d3.Selection<SVGElement>;

        constructor(options: VisualConstructorOptions) {
            let svg = this.svg = d3.select(options.element)
                .append('svg').classed('circle-g', true);

            this.svg.append("circle")
                .attr("cx", "50%")
                .attr("cy", "50%")
                .attr("r", "30%")
                .attr("class", "gp-circle")
                .style("fill", 'green');
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            let instances: VisualObjectInstance[] = [];
            console.log(options.objectName);
            return instances;
        }

        public update(options: VisualUpdateOptions) {
            var dataset = options.dataViews[0];
            var value = dataset.categorical.values[0].values[0];
            var targetValue = dataset.categorical.values[1].values[0];
            if (value < targetValue) {
                //RED
                this.svg.select("circle").style("fill", "RED");
            }
            else if (value == targetValue) {
                //YELLOW
                this.svg.select("circle").style("fill", "YELLOW");
            }
            else {
                //GREEN
                this.svg.select("circle").style("fill", "GREEN");
            }
        }
    }
}
```

### Prepare the ASP.NET website to host the reports
After reports were created, the team set about preparing the ASP.NET website that would host the reports. The first step was to create the Power BI Embedded workspace collection on Azure through the Azure portal, and to create the workspace for Hershey’s reports by using the [PowerBI-Cli](https://github.com/Microsoft/PowerBI-Cli) command-line tool.

The team then proceeded to install the [PowerBI.Core](https://www.nuget.org/packages/Microsoft.PowerBI.Core/) Nuget library on the website. This was done with the following command.

*Code Snippet 2 – Installing the PowerBI.Core Nuget library*
```posh
PM> Install-Package Microsoft.PowerBI.Core
```

The website’s **web.config** file was updated with the settings required for the website to access the Power BI Embedded reports correctly.

*Code Snippet 3 – Web.config for the ASP.NET website (partial)*
```xml
<configuration>
  <appSettings>
	[…]
    <add key="PBIEAccessToken" value="YOUR ACCESS TOKEN"/>
    <add key="PBIEWorkspaceCollection" value="YOUR WORKSPACE COLLECTION"/>
    <add key="PBIEWorkspaceId" value="YOUR WORKSPACE ID"/>
    <add key="PBIEReportId" value="YOUR REPORT ID"/>
  </appSettings>
[…]
</configuration>
```

During testing, the team leveraged the [JWT.IO](https://jwt.io/) website, which has a Debugger section that allows pasting an encoded token and seeing its content decoded. This was very helpful to ensure that the tokens were being generated and used correctly.

The site adopts the commonly used [Model-View-Controller (MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) design pattern. A ViewModel class (used to transfer information between the Controller and View components) was created, containing the **AccessToken** and **ReportId** attributes. This is used directly by the View class (responsible for showing the user interface) and its associated client-side JavaScript code.

*Code Snippet 4 – ViewModel class*
```csharp
namespace CognitiveFront.Models
{
    public class PBIETokenViewModel
    {
        public string AccessToken { get; set; }

        public string EmbedReportId { get; set; }
    }
}
```

The next step was to create a Controller class responsible for obtaining a token with the role of the signed-in user.

*Code Snippet 5 – Controller class*
```csharp
using System.Configuration;
using System.Web.Mvc;
using CognitiveFront.Models;
using Microsoft.PowerBI.Security;

namespace CognitiveFront.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private string PBIEAccessToken = ConfigurationManager.AppSettings["PBIEAccessToken"];
        private string PBIEWorkspaceCollection = ConfigurationManager.AppSettings["PBIEWorkspaceCollection"];
        private string PBIEWorkspaceId = ConfigurationManager.AppSettings["PBIEWorkspaceId"];
        private string PBIEReportId = ConfigurationManager.AppSettings["PBIEReportId"];

        // GET: Dashboard
        public ActionResult Index()
        {
            var username = "user@company.com";
            var roles = new string[] { "BackOffice" };
            var pbieToken = GetAccessToken(username, roles);

            return View(pbieToken);
        }


        private PBIETokenViewModel GetAccessToken(string username, string[] roles)
        {
            var embedToken = PowerBIToken.CreateReportEmbedToken(PBIEWorkspaceCollection, PBIEWorkspaceId, PBIEReportId, username, roles);
            var jwt = embedToken.Generate(PBIEAccessToken);
            var pbieToken = new PBIETokenViewModel()
            {
                AccessToken = jwt,
                EmbedReportId = PBIEReportId
            };

            return pbieToken;
        }
    }
}
```

The last step for integrating the Power BI Embedded reports with the ASP.NET website was to generate the client-side JavaScript code. The team leveraged the example code provided on the [Microsoft Power BI – Report Embed Sample](https://microsoft.github.io/PowerBI-JavaScript/demo/code-demo/index.html) page. Two snippets of the created code are shown as follows, one for embedding the report in the website and another for enabling full-screen visualization.

*Code Snippet 6 – JavaScript code that embeds the report in the website*
```js
// Read embed application token from textbox
var accessToken = $("#embedParameters").data("accesstoken");

// Fixed embed URL
var embedUrl = 'https://embedded.powerbi.com/appTokenReportEmbed';

// Read report Id from textbox
var embedReportId = $("#embedParameters").data("embedreportid");

// Embed configuration used to describe the what and how to embed.
// This object is used when calling powerbi.embed.
// This also includes settings and options such as filters.
// You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
var config= {
    type: 'report',
    accessToken: accessToken,
    embedUrl: embedUrl,
    id: embedReportId,
    settings: {
        filterPaneEnabled: true,
        navContentPaneEnabled: true
    }
};

// Grab the reference to the div HTML element that will host the report.
var reportContainer = $('#reportContainer')[0];

// Embed the report and display it within the div container.
var report = powerbi.embed(reportContainer, config);

// Report.off removes a given event handler if it exists.
report.off("loaded");

// Report.on will add an event handler which prints to Log window.
report.on("loaded", function() {
    Log.logText("Loaded");
});
```

*Code Snippet 7 – JavaScript code that shows the report in full-screen*
```js
$('#fullScreenLink').click(function () {
    // Get a reference to the embedded report.
    report = powerbi.embeds[0];

    // Displays the report in full screen mode.
    report.fullscreen();
});
```

### Automate the daily report generation process
At this stage, the team had a working report that had been successfully integrated into a web page. There was one final decision to be made: how to automate the daily report generation process. Because Excel was being used as the data source for the report, data had to be imported into it. It was not possible to use [DirectQuery](https://powerbi.microsoft.com/en-us/documentation/powerbi-desktop-use-directquery/), because that would require a different kind of data source (such as a SQL Server database).

Because data is local to the report and must be updated daily, this posed an interesting challenge. The team investigated the possibility of adopting the Power BI dataset manipulation APIs, which allow for data to be [pushed into](https://powerbi.microsoft.com/en-us/documentation/powerbi-developer-walkthrough-push-data/#power-bi-api-operations-to-push-data) a dataset. However, this would require extra coding effort to read the data from Excel (in a “row-by-row” fashion) and then push it into the dataset. This was certainly feasible, but perhaps not the best architecture for their scenario.

Because Netpartners indicated their intention to replace Excel as the data source with a PostgreSQL database, the cost-benefit of this approach was put in check. After this database is available with the sales data, the reports can be easily changed to use DirectQuery instead, and no process will be necessary to update the data daily because the report will directly access the SQL database. This was considered the better long-term solution.

## Conclusion

Netpartners was quite pleased with the proof of concept (POC) results. They considered Power BI easy to work with as a platform, and they believe Power BI Desktop will allow them to generate and customize reports rapidly. Being able to deliver reports to users online, as opposed to using an Excel spreadsheet, will be a more secure solution because users won’t have to access an offline file that has all the company data.

Netpartners also identified an additional custom visualization that needs to be created to provide a user experience that is closer to what users receive today in Excel: a [Tree View](https://en.wikipedia.org/wiki/Tree_view)-like control that allows users to collapse and expand sections of a table to switch between detailed and aggregated information. This custom visualization will be created in the same manner as the “Traffic Light”-style visualization.

Netpartners is planning a launch event in May for Sales Assistant, and they will be working with Microsoft on the cognitive part of the solution (Bot, LUIS, Speech) in the upcoming weeks, as well as implementing the PostgreSQL database for the commercial release.

### Partner feedback

Fabio Ito, Director: *“This partnership with Microsoft is strategic for our business. The expectation is to leverage our solutions based on sales performance and planning to another level by using the Microsoft technology stack, such as Office 365. This will maximize Power BI and Skype for Business usability, providing a new user experience for customers in terms of Cognitive Services (machine learning, natural language processing, speech, human–computer interaction, etc.) and Azure Cloud Services, which will host these solutions and provide a robust and easy infrastructure management to support our solutions, driving the business solutions from sales performance and planning to managing results. In terms of a commercial approach, this partnership will amplify the visibility of our solutions, generating new commercial opportunities for both sides considering Microsoft capillarity and market penetration in Brazil and the adherence of our solutions for the consumer goods industry.”*


*Figure 4 – Part of the joint Netpartners and Microsoft team who worked on the POC*
![Figure 4 – Part of the joint Netpartners and Microsoft team who worked on the POC]({{ site.baseurl }}/images/2017-03-31-netpartners/Figure_4_Team_Picture.jpeg)
