---
layout: post
title:  "Azure App Service enables Johnson & Johnson to migrate internal Java apps to the cloud"
author: "Dave Voyles"
author-link: "http://www.twitter.com/DaveVoyles"
#author-image: "{{ site.baseurl }}/images/johnson-and-johnson/dave-voyles-headshot.jpg"
date: 2017-7-21
categories: [Azure App Service]
color: "blue"
image: "images/Johnson-and-Johnson/johnson-johnson-logo-header.png"
excerpt: Johnson & Johnson, a Fortune 500 company working in tandem with Microsoft Technical Evangelists, used Azure App Service to pave the way for the first of 200+ internal Java applications to be migrated from an on-premises environment to the cloud. 
language: [English]
verticals: [Retail & Consumer Goods]
geolocation: [North America]
---

A team from Microsoft and Johnson & Johnson set out to migrate the first of many internal applications written in Java to Microsoft Azure App Service and host them on an Apache Tomcat server.

This engagement was executed to highlight the simplicity and power behind Azure App Service, and improve the workflow for this Fortune 500 company. This consisted of several parts, notably:

- Understanding how App Service can host a Java application that leverages a Tomcat server
- Defining the format and transfer method to have App Service be the target for their existing Jenkins pipeline
- Utilizing Visual Studio Team Services to build the application that resides on an internal [Bitbucket](https://bitbucket.org/) server
- Scaling up and out to meet demand
- Managing continuous deployment and versioning through deployment slots


### Key technologies

- [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/)
- [Jenkins](https://jenkins.io/)
- [Apache Tomcat](https://tomcat.apache.org/)
- [Visual Studio Team Services](https://www.visualstudio.com/team-services/)


### Core team

- [Doris Chen ](http://www.twitter.com/doristchen) – Technical Evangelist, Microsoft
- [Dave Voyles](http://www.twitter.com/DaveVoyles) – Technical Evangelist, Microsoft
- [James Truitt](http://www.twitter.com/auburnjames) – Technical Evangelist, Microsoft
- [Jennelle Crothers](http://www.twitter.com/jkc137) – Technical Evangelist, Microsoft
- James Prendergast – Cloud Solutions Architect, Microsoft
- Adam Goldberg – Principal Solutions Specialist, Microsoft
- Thanh Ta – Technology Manager, Johnson & Johnson
- Jochen Bertels – Information Technology Architect, Johnson & Johnson

 
## Customer profile

[Johnson & Johnson](www.jnj.com) is a 130-year-old firm and the world’s largest manufacturer of healthcare products, with operations in 60 countries and approximately 126,500 people working at its 265 companies. The company is organized into three business segments: *Consumer*, *Pharmaceutical*, and *Medical Devices*.
 
## Problem statement

Johnson & Johnson's Application Services team has several hundred custom-developed applications on Java/Tomcat/PHP/.NET on aging platforms that they have targeted to convert to cloud native configurations. Because this is one of the first migrations of a group of applications to a platform as a service (PaaS) architecture, they requested some assistance in understanding how Azure App Service could fit in their existing Jenkins pipeline, and the proper use of cloud native tools/capabilities available in Azure. 

One area of discussion with the developers was helping them define the way they will handle monitoring during day-to-day operations as well as verbose logging during the development cycle. Because their cloud environment is self-service, there is a lot of additional responsibility that could fall on the Application Services developers, and they are looking to minimize or eliminate as many routine processes as possible.

## Solution, steps, and delivery

Our engagements were handled both externally during a hackfest, as well as onsite at Johnson & Johnson's offices. 

Our solution required: 

-	Scaling the application up and out to meet demand
-	Integrating Bitbucket into their production pipeline
-	Quick migrations from QA to production and rollback procedures, utilizing deployment slots
- Logging traces and errors

This involved defining the dev, test, QA, and production branches of the code to push them to dedicated slots within App Service. After the discussions about the pipeline were held and decisions made, we discussed the monitoring considerations during the working sessions.

Converting to Azure PaaS services addressed several of their goals:

1. **Reduce the maintenance of the platform versions** (Java & Tomcat) due to the nature of PaaS being a managed service that includes security and platform level patching as part of the base hosting costs. 

2. **Experience smoother rollouts to production** by using Azure variables assigned to web app slots that enable variables and database connections to use the same variables in their code, but have individual values depending on the slot the code is running in. 

   For example, the variable `myappdatabase_connection` is defined in the code once for database connections. When the code is running in the QA slot, it returns the QA database connection string; in the production slot, it returns the value for the production database connection string. This simplifies coding so that a slot swap can be quick and ensure that the production users will always connect to the production databases, and the QA users will always connect to the QA databases.

3. **Enable the reduction of hosting costs** because the applications are dynamically running on multiple servers in the cluster, and there are no underlying costs to manage, patch, or expand the cluster resources over time.

![Building with Visual Studio Team Services]({{ site.baseurl }}/images/Johnson-and-Johnson/jnj-visio.JPG)

<br/>

### Deploying Java apps to Azure

For any typical Java web app, one can easily deploy it to Azure App Service. The same WAR file of a Java app will be deployed onto Azure App Service. Keeping WAR files in a Git repository is not ideal. It is better to use [FTP](https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-deploy#howtoftp) or [content synchronization with a cloud folder](https://azure.microsoft.com/en-us/documentation/articles/app-service-deploy-content-sync/).

To run Java apps in Azure App Service, we used Apache Tomcat server as our web server, provided by Azure App Service. To deploy Java apps onto Azure, we constructed the Java app to have the following folder structure:

- **webapps folder with ROOT.war**. The Tomcat server in Azure App Service will look inside this folder for web apps to host. `ROOT.war` represents the default web app (at the site root). Any WAR file that's otherwise named represents a web app accessible at `~/WARfilename`. 

- **web.config file**. This file uses the `httpPlatformHandler` to tell IIS to be a proxy between HTTP requests and the Tomcat server.  

In the `web.config` file, we specified the version of Tomcat server and Java; the `.war` file is located in the webapps folder, which is at the same level as the `web.config` file. Following is a sample of the `web.config` file.

```cs
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <handlers>
            <add name="httpPlatformHandler" path="*" verb="*" 
                 modules="httpPlatformHandler" resourceType="Unspecified" />
        </handlers>
        
        <httpPlatform processPath="%AZURE_TOMCAT85_HOME%\bin\startup.bat" 
                      startupTimeLimit="30">
                       <environmentVariables>
                <environmentVariable name="JRE_HOME" value="%ProgramW6432%\Java\zulu8.17.0.3-jdk8.0.102-win_x64\jre" />
            </environmentVariables>
            </httpPlatform>
    </system.webServer>
</configuration>
```

<br/>

As an alternative, the [Microsoft Azure portal](https://azure.microsoft.com/en-us/features/azure-portal/) also provides a UI for configuring Tomcat and Java, so you can use the Azure portal UI configuration as well.


### Backing up and restoring apps

One benefit of App Service is the ability to back up not only the website's codebase, but also that of the databases the code relies on. The *Back up and Restore* feature in Azure App Service lets you easily create app backups manually or on a schedule. You can restore the app to a snapshot of a previous state by overwriting the existing app or restoring to another app. In total, we are interested in backing up the:

- App configuration
- File content

For more information about how to do this, see [Backup your app in Azure](https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-backup).

### Scaling up and out

To ensure a consistent experience regardless of the time of day or how many users are active on the site, we needed to take advantage of App Service scaling. When it comes to scaling, there are two workflows: scale up and scale out. Because the customer's internal web application is not running computationally intensive applications, there wasn't a need to scale up, but as traffic increases on the site, increasing the number of instances would be important.

You can scale out to as many as 20 instances, depending on your pricing tier. App Service environments in Premium tier will further increase your scale-out count to 50 instances, which is more than would be needed here. 

We've enabled autoscaling, which allows us to scale the instance count automatically based on predefined rules and schedules. This could be anything from CPU utilization to disc queue length.

We are scaling through the Azure portal, but you can also use the [REST API](https://msdn.microsoft.com/library/azure/dn931953.aspx) or [.NET SDK](https://www.nuget.org/packages/Microsoft.Azure.Insights/) to adjust scales manually or automatically.

![Azure scaling]({{ site.baseurl }}/images/Johnson-and-Johnson/scale-rule.png)

<br/>

### Continuous deployment

App Service has built-in integration with a number of services, including Bitbucket, GitHub, and Visual Studio Team Services, which enables a continuous deployment workflow where Azure pulls in the most recent updates from your project published to one of these services. 
 
Continuous deployment is a great option for projects where multiple and frequent contributions are being integrated, and considering that this project will continue to be worked on by numerous volunteers over time, it made for a perfect use case. 

We also illustrated the benefits of Visual Studio Team Services by building a Java application with Maven and utilizing a hosted agent.  When you use a hosted agent,  Visual Studio Team Services takes care of the maintenance and upgrades, so for many teams this is the simplest way to build and deploy. 

After we've deployed an agent, we are ready to define a continuous integration build that compiles the Java app with Maven whenever the team checks in code. For more information, see [Implement a CI/CD process to build and deploy your Java app to Azure](https://www.visualstudio.com/en-us/docs/build/get-started/java-maven).

<br/>

![Building a Java app with Maven]({{ site.baseurl }}/images/Johnson-and-Johnson/Maven-build.png)

<br/>

### Application settings and connection strings

Azure Web Sites has a nice capability whereby developers can store key-value string pairs in Azure as part of the configuration information associated with a website.  At runtime, App Service automatically retrieves these values for you and makes them available to code running on your website. After a developer enters key-value pairs for their website, the data can be retrieved at runtime by code running inside the site. The Azure Web Sites provides these values to a running website through environment variables.

Here's how it appears when we use Azure SQL Database:

```cs
<connectionStrings>
  <add name="CustomConnString" connectionString="Server=tcp:[serverName].database.windows.net;Database=myDataBase;User ID=[LoginForDb]@[serverName];Password=myPassword;Trusted_Connection=False;Encrypt=True;">
</connectionStrings>
```

<br/>

With this functionality, developers can securely and safely store configuration data without having it appear as clear text in a website configuration file. For more information, see [How Application Strings and Connection Strings Work](https://azure.microsoft.com/en-us/blog/windows-azure-web-sites-how-application-strings-and-connection-strings-work/).

## Conclusion

During this workshop, we demonstrated how the client could configure their Java WAR files, variable naming conventions, and Azure slot variables, which enabled them to configure their applications to use the Azure managed services Java/Tomcat and PHP. This reduced their labor costs related to patching and maintaining the infrastructure and the application environments.

In addition, the Azure slot capabilities will empower their developers to accelerate their rollouts to production and give them a smoother roll-back scenario than they have today. Due to our detailed discussions, they can easily add the solution to their existing pipeline and create a direct pipeline for their existing legacy applications, which were previously not in active development but in maintenance mode.

The developers were able to explore the many capabilities of Web Apps in Azure App Service, and consider the multiple options available to them to deploy, monitor, and maintain their applications as they are going through their CI/CD pipeline. There were several aspects that have alignment with the .NET development processes, which will be contrasted and compared so they can leverage the lessons learned in those environments. 

With the successes in reducing code complexity and hosting efforts, Johnson & Johnson is now looking at reducing the complexity of their application level authentication using LDAP to now use Azure Active Directory. Moreover, there is synergy between the third-party code level monitoring and the [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) tool that is being evaluated for added benefits. 

## Additional resources

- [Where to Find Azure App Service Logs for Your App, IIS, Failed Request Tracing]( https://stackify.com/azure-app-service-log-files/)
- [Why Azure Deployment Slots are Awesome and How to Use Them](https://stackify.com/azure-deployment-slots/)
- [Bind an existing custom SSL certificate to Azure Web Apps](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-tutorial-custom-ssl)
- [Buy and Configure an SSL Certificate for your Azure App Service](https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-purchase-ssl-web-site)
- [Continuous Deployment to Azure App Service](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-continuous-deployment?toc=%2fazure%2fapp-service%2ftoc.json)
- [What Azure Web Site/App Environment Variables Are Available?](http://whatazurewebsiteenvironmentvariablesareavailable.azurewebsites.net/)
