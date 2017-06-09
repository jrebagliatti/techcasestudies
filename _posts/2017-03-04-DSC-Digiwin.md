---
layout: post
title: Using Azure Functions to improve provisioning of new SaaS customers for DSC
author: "Tom Lee"
#author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-04-25
categories: [Azure Functions]
color: "blue"
image: "images/2017-03-04-DSC-Digiwin/feat_DSC-hackathon.JPG"
excerpt: Scalability and availability are important in cloud services, but so is affordability. By using Azure Functions, Data Systems Consulting lowered the cost of provisioning new customers.
language: [English]
verticals: [Professional Services]
geolocation: [Asia]
#permalink: /<page-title>.html
---

In February 2017, Microsoft Taiwan teamed up with the A1 development team at Data Systems Consulting Co., Ltd., for a one-day hackathon in Taichung to refactor their current application architecture. This core team leveraged Microsoft Azure Functions to improve provisioning of service workloads for new customers.

Core team members:

- James Fu – Technical Director, Data Systems Consulting
- Kayle Chen – Advistory Engineer, Data Systems Consulting
- Jimmy Huang – Senior Engineer, Data Systems Consulting
- Tom Lee – Technical Evangelist, Microsoft Taiwan

<img alt="Hackathon team" src="{{ site.baseurl }}/images/2017-03-04-DSC-Digiwin/DSC-hackathon.JPG" width="600">

During this hackathon, we proved that using Azure Functions is more cost-effective than using Azure Cloud Services worker roles. And it was the first step for the A1 development team to experience the benefit of serverless architecture.

## Customer profile

[Data Systems Consulting Co., Ltd.](http://tw.digiwin.biz/) (DSC) was founded in Taiwan in 1982. It is a leading industry-specific software solution provider in the Greater China and Southeast Asia area. According to the 2015 ERP Solutions survey by China Computerworld Research, DSC has been one of the top 3 enterprise software providers in Greater China.

In 2011, DSC planned to use cloud technology to expand its customer base into the small-business market. The DSC A-series business cloud is software as a service (SaaS) designed for small to micro businesses. [A1](https://a1.digiwin.com/) has been running on Azure since 2012.

## Problem statement

When a new customer is registered in the A1 business cloud, part of the process is provisioning the new customer services. In the early release, the provisioning services were implemented by Azure Cloud Services worker roles. The A1 business cloud needed to runn two worker role instances across different fault domains to avoid a single point of failure. Provisioning services is an important workload but not a heavy workload. Azure Cloud Services worker roles provide excellent scalability and availability, but that approach is not cost-effective. The sales and marketing team kept asking the development team to reduce the cloud operation cost to increase margins.

## Solution, steps, and delivery

Azure Functions is designed for a serverless application architecture. It allows an application function to be triggered by specific events, where some amount of server-side logic is still written by developers but—unlike traditional architectures—is running on a 7x24 dedicated server. Azure Functions charge only by function-execution time. It seemed to be the right solution for reducing both management cost and cloud-operation cost.

Besides, the core team needed to prove that Azure Functions can meet these technical requirements:

- Supports triggers for Azure Storage queues
- Can be integrated with SendGrid API for sending confirmation email to customers
- Can be integrated with Slack Webhooks API for informing internal operators

### Migrating from Azure Cloud Services worker role to Azure Functions

In the past, a worker role instance needed to poll the Azure Storage queue for new messages, retrieve them, and process them, using code similar to the following.

```csharp
public override void Run()
{
  //Start up the Azure Storage queue
  StartUpQueue();

  //Loop infinitely until the Worker Role Instance shuts down
  while (true)
  {
    try
    {
      // retrieve a new Order message from the queue
      CloudQueueMessage myQueueItem = queue.GetMessage();
      if (myQueueItem != null)
      {
        //Process the new order message code here

        //Parse new order message format
        //Insert new customer database and update tenant information
	    //Invoke SendGrid API send out confirmation email to the customer
	    //Invoke Slack Webhooks API to inform internal operator	        

        queue.DeleteMessage(myQueueItem);        
        
      }
      else
      {
        //no message found, sleep for 15 seconds
        Thread.Sleep(15000);
      }
    }
    catch (Exception ex)
    {
      Trace.TraceError("Exception thrown");
      //Invoke Slack Webhooks API to inform internal operator	        
      Thread.Sleep(15000);
    }
  }    
}
```

The core team created an Azure function with queue trigger inputs. The following diagram shows the new architecture.

<img alt="Architecture diagram" src="{{ site.baseurl }}/images/2017-03-04-DSC-Digiwin/architecture.png" width="845">

We created an Azure Function call named A8OpenOrder for processing new customer orders and provisioning. Because Azure Functions supports the C\# language, migrating legacy worker-role code is easy. The structure of run.csx looks like this:

```csharp
#load "Library.csx"

public static void Run(string myQueueItem, TraceWriter log)
{
    // A new Order message is coming from the queue
    log.Info($"Start Order Process");

    try
    {
        //Process the new order message code here

        restoredObject = JsonConvert.DeserializeObject<JObject>(myQueueItem);
        //Parse new order message format

        //Insert new customer database and update tenant information
	    //Invoke SendGrid API send out confirmation email to the customer
	    //Invoke Slack Webhooks API to inform internal operator  
        log.Info($"Order Process Complete");
    }
    catch (Exception e)
    {
        log.Info($"Exception:{e.Message}");
       //Invoke Slack Webhooks API to inform internal operator
    }
}
```

All of the source code is stored in Visual Studio Team Services; to practice continuous deployment, core team members follow the document [Continuous deployment for Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-continuous-deployment). The A8OpenOrder function has three files: Major function code is in run.csx; Azure Queue storage data flows into our C\# function via method arguments. Argument names are specified in function.json, and Library.csx provides some helper classes to encapsulate the Slack Webhooks API and SendGrid API.

<img alt="Source-code structure" src="{{ site.baseurl }}/images/2017-03-04-DSC-Digiwin/VSTS.png" width="820">

### Outcome

The DSC A1 development team is excited about monitoring the capabilities of Azure Functions. The Monitor tab in Azure portal can display each function and its execution status without any code. In the past, the development team needed to put a lot of effort into making the Azure worker role emit telemetry data by using the .NET EventSource class and Azure Diagnostics API.

<img alt="Monitoring Azure Functions in Azure portal" src="{{ site.baseurl }}/images/2017-03-04-DSC-Digiwin/AzureFun.png" width="820">

After a day of core team effort and prior planning, Slack successfully received messages from Azure Functions. During the next few days, the core team fully integrated the Azure Functions code into the production release, and the system is running well.

![Messages from Azure Functions displayed in Slack]({{ site.baseurl }}/images/2017-03-04-DSC-Digiwin/SLACK.png)

According to James Fu, Technical Director of DSC, Azure Functions is a relatively simple alternative to the Azure Cloud Services worker role:

>"This is a significant step forward for Azure users. Using Azure Functions, I can save 70 percent of cloud costs in new-customer provisioning workload. Serverless and event-driven cloud infrastructure will fundamentally change how we build SaaS. I can expect more applications will adopt Azure Functions!"

<img alt="Bar chart comparing costs" src="{{ site.baseurl }}/images/2017-03-04-DSC-Digiwin/cost.png" width="704">

## Conclusion

DSC is the largest industry-specific software company in Taiwan. Its A1 business cloud is constantly evolving to fulfill the latest technology trends and business needs. Because Azure Functions charges based only on the number of computing resources needed, it significantly reduces the cloud costs in certain scenarios. The DSC A1 development team clearly experienced that, compared to the Azure Cloud Services worker role, Azure Functions is easier to debug, monitor, and manage. The event-driven serverless application model will be more widely applied in the other workloads, and the A1 business cloud can expect more deep integration with Microsoft Azure technology.

## Additional resources

Code for the proof of concept is available on GitHub: [Proof of concept - Azure Functions](https://github.com/tomleetaiwan/Azure/tree/master/AzureFunctions)

Related documents:

- [Work with triggers and bindings in Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings)
- [Azure Functions Storage queue bindings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue)
- [Continuous deployment for Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-continuous-deployment)
- [How to Send Email Using SendGrid with Azure](https://docs.microsoft.com/en-us/azure/app-service-web/sendgrid-dotnet-how-to-send-email)
- [Effortless C# integration with Slack](http://piotrgankiewicz.com/2016/06/10/effortless-csharp-integration-with-slack/)
- [How to use SendGrid in Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-sendgrid)
