---
layout: post
title: "Building a modern and managed cloud architecture for Content Avenue, a collaborative content platform"
author: "Benjamin Talmard"
author-link: "https://twitter.com/benjiiim"
#author-image: "{{ site.baseurl }}/images/authors/benjiiim.jpg"
date: 2017-05-08
categories: [Azure App Service]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Content Avenue partnered with Microsoft to work on a modern cloud architecture for their collaborative content platform, thanks to open-source technologies and managed application services on Microsoft Azure.
language: [English]
verticals: [Consumer Products & Services]
geolocation: [Europe]
#permalink: /<page-title>.html
---

[Content Avenue](https://www.content-avenue.fr) is a French startup in digital content management, created in 2016 and based in EuraTechnologies, one of the top 10 European start-up accelerators. Their platform aims to connect professionals with qualified digital content creators such as video makers, content marketers, visual artists, and sound designers.  

They chose Microsoft as their preferred cloud provider to host their platform and redefine a strong and future-proof architecture that will support their fast growth.

A team of several experts in Microsoft Azure worked with Content Avenue during a three-day hackfest to modernize their application architecture using the latest services available on the platform.

Hackfest participants:

- Luc Vancrayelynghe – Architect, Content Avenue
- Cédric Derue ([@cderue](https://twitter.com/cderue)) – Architect, Altran; Microsoft Most Valuable Professional
- Julien Corioland ([@jcorioland](https://twitter.com/jcorioland)) – Technical Evangelist, Microsoft France
- Benjamin Talmard ([@benjiiim](https://twitter.com/benjiiim)) – CTO in Residence Microsoft Accelerator Paris, Microsoft France
- Joel Amoussou – Technical Evangelist Intern, Microsoft France

## Customer profile ##

While social media constantly create new content formats and distribution models, companies and brands all suffer from a major problem: create and distribute content with high creative value to strained audiences, while being sure to have the biggest impact possible.

A lot of difficulties can appear during this process: a lack of formalized process or specialized tools, time spent to find the right content creators, difficulties to engage with the relevant influencers, and so on.

To solve these problems, Gregory Duquenoy, a passionate entrepreneur specializing in web marketing and digital strategy, created Content Avenue to provide the best platform for digital content professionals. Today, 4 full-time employees and 186 content creators are working for Content Avenue with the same dedication and passion for brand content.

These are examples of Content Avenue features:

- identify the right content creator
- formalize the editorial policy
- create and nurture editorial planning across platforms and media
- pilot the content creation
- distribute content across all channels
- set up and track the appropriate metrics

<img alt="Screen shot of Content Avenue website" src="{{ site.baseurl }}/images/2017-03-15-contentavenue/screenshot.jpg" width="820">

## Problem statement ##

The first versions of the Content Avenue platform were built by various external technical teams to deliver the key features as fast as possible and then to convince the first customers and partners.

The main drawback of this approach is the fact that those in charge of making some technical decisions might not work on the project a few weeks later.

This is what happened to Content Avenue, who inherited some obscure infrastructure resources (virtual machines [VMs], network artifacts, and so on) in an Azure subscription and needed to take back control.

It was clear to the team that a new architecture had to be defined to gain simplicity with self-described services, to use more developer-oriented features, and to be more agile.

Lastly, another constraint we had to respect: being able to deploy the open-source software technologies that Content Avenue is using, such as Drupal, PHP, and MySQL.

<img alt="Logos of PHP, Drupal, and MySQL" src="{{ site.baseurl }}/images/2017-03-15-contentavenue/technologies.png" width="341">

## Solution, steps, and delivery ##

The Content Avenue architecture has three main parts:

- The application itself, written on top of Drupal, a content-management framework written in PHP
- The database, using the popular relational database-management system MySQL
- The storage system, where user assets are stored

Let's examine the solution in more detail.

### Using Azure App Service to host the PHP-based application ###

There are multiple ways to run code on Azure. Users can manage their own stack on their preferred operating system on Azure Virtual Machines; they can build a complex microservices architecture on top of popular orchestrators such as Kubernetes or Docker with Azure Container Service; or they can choose Azure App Service, a fully-managed platform to focus on what matters the most for them: their code.

<img alt="Photo of presentation slide showing components of Azure Application Platform" src="{{ site.baseurl }}/images/2017-03-15-contentavenue/AzureApplicationPlatform.jpg" width="623">

The team at Content Avenue chose App Server to benefit from this platform instead of managing some infrastructure themselves.

Using App Service to host PHP applications has been possible for years. However, the Azure team has released the preview of a new flavor of the service to improve this experience: Azure App Service on Linux.

As the name implies, this new version is based on Linux, which provides a familiar environment for the technologies built first for Linux, such as PHP.

Because App Service on Linux is built atop Docker containers, it is possible to choose from three main strategies to deploy a web application:

- Choose an official run-time image to run the application and benefit from a great continuous-integration feature to deploy it.
- If the official images don't fit the needs, provide a customized run-time image that contains the app stack dependencies but not the app itself. The continuous-integration feature is still possible with this strategy.
- "Dockerize" the application, putting all the dependencies and the app itself into a ready-to-run container. With this option, the continuous-integration feature is not relevant because the app is available in the Docker image.

The integration feature described is based on Kudu, an open-source engine deployed in a separate container ("SCM" in the following diagram) next to your app container ("App" in the diagram). One of the advantages of Kudu is the deployment scripts Kudu can run to execute the tasks needed for your application to be ready for production. For example, it can run the npm package manager to restore packages for a Node.js application.

<img alt="Diagram of architecture of Azure App Service on Linux" src="{{ site.baseurl }}/images/2017-03-15-contentavenue/AppServiceArchitecture.png" width="773">

Unfortunately, at the time of the hackfest, Kudu was not able to handle PHP Composer dependencies during this process. This is something the development team is working on, according to a [GitHub issue](https://github.com/Azure-App-Service/kudu/issues/6).

Because of this temporary limitation (and because Content Avenue developers were already using Docker), the choice was made to use App Service with the last strategy described earlier, by providing a ready-to-run container including the app stack dependencies (PHP and Composer, for example) and the app itself.

### Azure Container Registry to host the container images ###

When you choose to provide your own Docker image to App Service on Linux, you need to store them first in a container registry accessible from App Service. The default option is to use Docker Hub, the official registry managed by the Docker company itself. It has a public registry to store community images, or you can pay to store your private images in a private registry.

<img alt="Screen shot of dialog box used to select container location and privacy" src="{{ site.baseurl }}/images/2017-03-15-contentavenue/AppServiceDocker.png" width="556">

But the team at Content Avenue didn't like the idea of using Docker Hub because they were concerned about the reliability and performance of the service.

Because they didn't want to maintain their own repository either, they chose to use Azure Container Registry, a service managed by Azure to store images in a familiar way because it supports the same open-source Docker CLI tools.

One of the advantage of Container Registry is the ability to store Docker images in the same Azure region as App Service, which helps reduce latency during deployments.

Furthermore, using Azure for this need allows the team to centralize everything in a single provider instead of spreading the services across multiple cloud-service providers.

Thanks to the two Azure services, the publication workflow is quite simple:

- The code (and associated Dockerfile) is pushed from the developer machine to GitLab.
- When a new version of the application is pushed on the master branch, a Docker push command is triggered to store the new image in Container Registry.
- The web app on App Service on Linux is updated to get the latest image from the repository.

In the future, this last step is going to be simplified: The App Service team is working on continuous deployment of the image itself, to automatically update the web app when a new image is available in the registry.

### Host the MySQL database on Azure ###

On Drupal, the natural choice to store the data is the MySQL database engine.

However, Azure offers no MySQL managed service. The only database engine supported is SQL Server, thanks to Azure SQL Database.

To deploy a MySQL server on Azure, one of the options is to use Azure Virtual Machines, where you can choose your operating system and install the technologies needed on it.

To build a highly available solution with Virtual Machines, it is possible to use the master/subordinate replication feature of MySQL, deployed on multiple VMs in an availability set. This solution is perfect for enterprise-grade architecture but could have been too complex and expensive for Content Avenue.

Now, though, it is possible on Azure to get great availability and a fair availability SLA when using only a "single-instance VM" (one VM that's not part of an availability set), configured with Premium Storage (SSD-based virtual disks).

Because this option is definitely more simple than using several VMs and is aligned with Content Avenue needs, this is the deployment model they chose for their MySQL deployment, while hoping to get a MySQL managed service on Azure soon.

### Opportunity for the future ###

Drupal, as a content-management system, has the notion of *assets* that represent the static files stored for each website (such as pictures and videos). With the architecture described earlier, these assets are stored in the web server file system, which means in App Service.

A good practice when using cloud technologies is to use the right tool for the right usage. App Service is a great service to host web applications, but there is a better one to store static files: Azure Storage.

At the end of the hackfest, Content Avenue agreed that one opportunity to improve the Content Avenue architecture would be to use a Drupal module able to store Drupal assets on Azure Storage.

<img alt="Architecture diagram" src="{{ site.baseurl }}/images/2017-03-15-contentavenue/ArchitectureDiagram.png" width="855">

## Conclusion ##

Using App Service on Linux instead of infrastructure services, the team has been able to host their PHP/Drupal-based application, without managing all the needed infrastructure themselves.

To get the best of this new platform service, the team has built a simple but powerful deployment process based on GitLab and Container Service.

Lastly, because not every technology is available as a managed service on Azure, Content Avenue has been able to leverage one of the latest improvements in Virtual Machines, gaining an availability SLA even with a single-instance VM.

This hackfest was a great way for Content Avenue to work on the modernization of their application architecture using the latest services available on the platform. In their own words: "The hackfest was an excellent opportunity to delve deeper into the Azure services and to match the services offered with our architecture, in order to sustain it in the long run!"

<img alt="Photo of hackfest in progress" src="{{ site.baseurl }}/images/2017-03-15-contentavenue/hackfest.jpg" width="797">

## Additional resources ##

The following resources will help you to deeply understand the concepts and technologies we discussed in this article:

- [Introduction to App Service on Linux](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-linux-intro)
- Announcement of [Single-Instance SLA Images](https://azure.microsoft.com/en-us/blog/announcing-4-tb-for-sap-hana-single-instance-sla-and-hybrid-use-benefit-images/)
- [Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/)
- [Best Practices for Drupal CMS on Azure Websites](https://azure.microsoft.com/fr-fr/blog/best-practices-for-drupal-cms-on-azure-websites-2/)
