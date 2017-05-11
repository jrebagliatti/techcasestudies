---
layout: post
title:  "Cyberesa moves to the cloud to improve availability while scaling to meet demand"
author: "Fares Zekri"
author-link: "https://twitter.com/fareszekri"
#author-image: "{{ site.baseurl }}/images/authors/FaresZekri.jpg"
date:   2017-05-11
categories: [Azure App Service, Azure Functions]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Microsoft worked with Cyberesa to implement a highly available online booking solution that automatically scales to adapt to all load spikes while providing a faster, more reliable release management cycle. 
language: [English]
verticals: Hospitality & Travel
---

The Microsoft Tunisia DX team worked with Cyberesa to put in place a highly available online booking solution that automatically scales to adapt to all load spikes while providing a faster and more reliable release management cycle. 
 
**Key technologies used:**

- Web Apps feature of Azure App Service
- Azure Redis Cache 
- Elastic Database feature of Azure SQL Database 
- Azure Application Insights 
- Application Insights profile monitoring  
- Azure Backup 
- Microsoft Operations Management Suite 
- Visual Studio Team Services (continuous integration, continuous deployment, monitoring)
 
**Core team:** 

 * Wassim Ghliss – CEO, Cyberesa
 * Nabil El Aieb – Lead Developer, Cyberesa
 * Ghada Saihi – Senior Developer, Cyberesa
 * [Fares Zekri](https://twitter.com/fareszekri) – Principal Technical Evangelist, Microsoft   
 * [Firas Mdimagh](https://twitter.com/Firas_mdimagh) – Technical Evangelist Intern, Microsoft
 
## Customer profile ##

![Cyberesa Logo]({{ site.baseurl }}/images/Cyberesa/logo_cyberesa.png)


[Cyberesa](http://www.cyberesa.net) is a Tunisian independent software vendor (ISV) with offices in Tunisia and Morocco and customers throughout the Middle East/North Africa region. The Cyberesa.net solution is a web-based, fully integrated platform for hotels/riads/apartments, hotel chains, travel agencies, and car rental agencies. Cyberesa is an Amadeus-certified application developer, and its solution provides online, real-time bookings with secure payment for: 

- End-customers (B2C and individuals) 
- Tourism professionals (B2B: tour operators, wholesalers, travel agencies, corporations)
 
## Problem statement ##

Cyberesa's online booking platform is currently used by some of the biggest travel agencies in North Africa. It currently processes more than 10,000 bookings a day. The smallest downtime or slow response in this platform would lead to an immediate consumer churn as customers would look for different booking options. One hour of downtime in high season could cause a loss of up to $240,000. This drives the need for a highly available and performing infrastructure.

On the other hand, during night shifts and low seasons, the platform goes almost into hibernation, leading to unused supersized resources. Therefore, one of the first challenges for Cyberesa was to find the right balance between high availability requirements and cost optimization in a very competitive market.

The second most important challenge was to streamline the release and patch management cycle. Indeed, while the development environment did exist with the appropriate source control and work items, a complete DevOps process needed to be implemented to introduce a staging environment in the release cycle and overcome manual deployment and rollback situations.

>"We do provide a performant service right now, but a power outage or a storage crash or a DDOS attack would definitely be a big hit for us ... With Azure, we look forward to overcome these challenges, optimize our development and operational processes, and benefit from the infinite capacity." 
>
>— Wassim Ghliss, CEO of Cyberesa

## Solution, steps, and delivery ##

The cloud's promises of providing an infrastructure with resources that would scale according to the load were very appealing to Cyberesa and more specifically in a platform as a service (PaaS) scenario where Cyberesa focuses mainly on its code. Hence, the main design pillars were:

* Optimize and consolidate resources.
* Reduce management operations and opt for PaaS whenever possible.
* Enhance insights and analysis.

### Solution Architecture ###

![Solution architecture]({{ site.baseurl }}/images/Cyberesa/CyberesaArchitecture.png)

The above architecture allowed Cyberesa to deploy each end customer on a separate web app while using the same underlying app service plan, and use a separate Azure SQL database for each customer while leveraging the elastic database pool for cost optimization. More details about Cyberesa's journey to the cloud are provided later.

The Cyberesa online booking solution is an ASP.NET application with a SQL Server back end; therefore, the two first services to consider were: 

* The Web Apps feature of Azure App Service and Azure SQL Database for customers eligible for a full cloud scenario.
* The Web Apps feature of Azure App Service and a hybrid connection for customers who need their databases to stay on-premises.

The use of the web app allowed them to leverage the following features:

* Autoscale settings based on CPU performance. 
* Use of automatic backups.
* Use of staging slots for an easy, streamlined deployment.

### The importance of insights ###

**Inside the web app**

Following the first application migration, we noticed that the average CPU time was relatively high even for a low number of requests and that was confirmed by the Application Insights live streaming. We used Web App Process Explorer profiling to analyze CPU time and track down the CPU-intensive functions. 

![Process Explorer]({{ site.baseurl }}/images/Cyberesa/ProcessExplorer.png)


The analysis of the hot path showed that one of the most-called functions was consuming up to 40 percent of the total CPU time. This allowed Cyberesa to rewrite it and cut the query time by more than 35 percent.

![CPU Hot Path Tracking]({{ site.baseurl }}/images/Cyberesa/CpuHotpathTtracking.png)


The analysis also highlighted that custom logs written to the web app storage were negatively impacting the performance. Consequently, we evaluated two options:

* Store custom logs in Azure Table storage.
* Use Application Insights for custom events tracking.

We decided to use Application Insights for these reasons:

* There was no need for persistent storage of custom logs for more than 90 days.
* Application Insights provided simple yet extremely powerful query and analysis tools including filtering on message severity and any custom property/value needed.

In order to keep the same code working in multiple different environments, we used the appSettings Key switch that enables or disables the use of Application Insights for custom logs:

      <appSettings>  
        ...
        <add key="ApplicationTraceToAppInsights" value="True" />
        ...
      <appSettings>

Then we mapped the different severities and sent the different Key/Values pairs with the appropriate message:

      #region AZURE

      if (Global.blnApplicationTraceToAppInsights)
      {
          Microsoft.ApplicationInsights.DataContracts.SeverityLevel level = SeverityLevel.Error;

          switch ((Global.TraceLevel)enumTraceLevel)
          {
              case Global.TraceLevel.Error:
                  level = SeverityLevel.Error;
                  break;

              case Global.TraceLevel.Information:
              case Global.TraceLevel.Data:
                  level = SeverityLevel.Information;
                  break;

              case Global.TraceLevel.Verbose:
              case Global.TraceLevel.Debug:
                  level = SeverityLevel.Verbose;
                  break;



              case Global.TraceLevel.Warning:
              case Global.TraceLevel.Login:
                  level = SeverityLevel.Warning;
                  break;
          }

          var telemetry = new Microsoft.ApplicationInsights.TelemetryClient();
          telemetry.TrackTrace(strMessage,
                          level,
                          new Dictionary<string, string> { { "CRAPP", Global.ApplicationTraceName }, { "CRUSER", strUserId }, { "CRIP", strUserIP }, { "CRIISSessionId", strIISSessionId }, { "CRSessionId", strSessionId }, { "CRPage", strPageUrl } });

          //Trace.WriteLine(strMessageText);


      }
      #endregion
      else
      {
          Trace.WriteLine(strMessageText);
      }


**Connecting to other services**

Cyberesa needed to allow some of its customers to connect to their on-premises databases and needed it to be exposed in a very secure way. The use of [Hybrid Connections](https://docs.microsoft.com/en-us/azure/biztalk-services/integration-hybrid-connection-overview) allowed us to avoid opening any inbound ports to the database servers.

We used Application Insights to track and optimize all dependencies between the Cyberesa application and other services including SQL databases, on-premises SQL databases, or any other web services calls. 
 
![Application Map]({{ site.baseurl }}/images/Cyberesa/ApplicationMap_Cyberesa.png)
 

During the hybrid connections testing, the average server response time grew higher than expected, and the Application Insights dependencies timeline highlighted the important number of database requests and the time taken by each one. 
 
![Dependencies tree]({{ site.baseurl }}/images/Cyberesa/DependencyTree.png)
 

We then introduced [Azure Redis Cache](https://azure.microsoft.com/en-us/services/cache/), which considerably reduced network traversal and query times for all cacheable objects. We implemented a caching and expiry policy for each object, which led to a performance improvement and a cost reduction. Therefore, only a subset of the requests would need to reach local databases. The misses/hits ratio was around 2.5 percent (7K misses versus 303K hits daily). 

![Redis gets and Misses]({{ site.baseurl }}/images/Cyberesa/RedisCacheCyberesa.png)

 
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using StackExchange.Redis;
    using Newtonsoft.Json;
    using System.Data;

    namespace cr.XXXXX.cache
    {
        public class RedisCacheManager
        {
            private static Lazy<ConnectionMultiplexer> lazyConnection = new Lazy<ConnectionMultiplexer>(() =>
            {
                return ConnectionMultiplexer.Connect(cr.fwk.Global.RedisConnectionString);
            });

            private static ConnectionMultiplexer Connection
            {
                get
                {
                    return lazyConnection.Value;
                }
            }


            /// <summary>
            /// 
            /// </summary>
            /// <param name="key"></param>
            /// <param name="value">only string at the moment</param>
            /// <param name="intCachedDelay"> in seconds</param>
            public static void AddCachedData(string key, object value, int intCachedDelay)
            {
                IDatabase cache = Connection.GetDatabase(cr.fwk.Global.intRedisDatabase);
                TimeSpan span = new TimeSpan(0, 0, intCachedDelay);
                cache.StringSet(key, JsonConvert.SerializeObject(value), span);
            }

            public static object GetCachedData(string key)
            {
                IDatabase cache = Connection.GetDatabase(cr.fwk.Global.intRedisDatabase);
                object objCachedData = null;
                var value = cache.StringGet(key);
                if (!value.IsNullOrEmpty)
                    objCachedData = JsonConvert.DeserializeObject(cache.StringGet(key));
                return objCachedData;
            }
        }
    }

The use of Azure Redis Cache not only improved the performance but it also allowed Cyberesa to reduce each single database [DTU requirement](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-service-tiers#single-database-service-tiers-and-performance-levels) from 50 to 20 DTUs, which allowed a direct cost reduction and a higher consolidation ration while using the SQL Database elastic database pool.

With the use of PaaS combined with the monitoring and automation services, Cyberesa optimized its operational processes and was about to do the same with its dev ones.

### DevOps ### 

Some of the challenges that Cyberesa wanted to address were patch management and easy rollback to previous check-ins. Cyberesa opted to migrate to Visual Studio Team Services in order to easily implement seamless DevOps practices.

Cyberesa implemented a build pipeline that helped generate the artifacts in a clean hosted pool. Then we moved to the release management step where we created three environments:

* Dev – a frequently used environment, where most of the releases are deployed and tested, and errors are resolved.
* Staging – a preproduction environment for final testing.
* Production – where the solution goes live.

Continuous delivery allowed all deployments to be automated and enabled faster cycles and easier multi-customer upgrades. Patch management was one of the immediate improvements observed by the team. Application Insights spotted every exception and easily converted it to a work item that was fixed and quickly released.

In a case of any unwanted behavior, a simple rollback to a previous check-in initiated the continuous integration/continuous deployment process and restored the previous most-stable version.

## Conclusion ##

The journey to the cloud with Cyberesa started from a clear business need. It ended up igniting a passion for innovation. People there are coming up with improvement ideas and new ways to leverage Azure services to optimize the solution and keep it a step ahead of the competition every day.

>"Azure became for us the natural choice for our most critical customers."  
>
>— Wassim Ghliss, CEO of Cyberesa

General lessons:

- Moving to the cloud helps Cyberesa meet its security, availability, and productivity objectives.
- DevOps dramatically improves the operations and development processes.
- Web Apps and other Azure PaaS services are important abstractions to the infrastructure level that foster innovation and save important time.
- When building real-world cloud apps with Azure, it is important to implement [Transient Fault Handling](https://docs.microsoft.com/en-us/aspnet/aspnet/overview/developing-apps-with-windows-azure/building-real-world-cloud-apps-with-windows-azure/transient-fault-handling). 

## Reference documentation ##

- [Web Apps](https://docs.microsoft.com/en-us/azure/app-service-web/)
- [Azure Redis Cache](https://docs.microsoft.com/en-us/azure/redis-cache/)
- [Application Insights](https://docs.microsoft.com/en-us/azure/application-insights/)
- [DevOps](https://www.visualstudio.com/devops/)
- [Elastic Database pool](https://docs.microsoft.com/en-us/azure/sql-database/)
- [Transient Fault Handling](https://docs.microsoft.com/en-us/aspnet/aspnet/overview/developing-apps-with-windows-azure/building-real-world-cloud-apps-with-windows-azure/transient-fault-handling)
- [App Service Local Cache](https://docs.microsoft.com/en-us/azure/app-service/app-service-local-cache)
