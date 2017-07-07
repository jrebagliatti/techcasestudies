---
layout: post
title: "Microsoft helps Clientscape improve their DevOps processes with Visual Studio Team Services"
author: "João Almeida and Miguel Caldas"
author-link: "https://twitter.com/jalmeida"
#author-link: "https://twitter.com/miguelcaldas"
#author-image: "{{ site.baseurl }}/images/CLIENTSCAPE/authors.png"
date: 2017-07-07
categories: [DevOps]
color: "blue"
image: "images/CLIENTSCAPE/clientscape@2x.png"
excerpt: Clientscape worked with Microsoft to review their value chain from the bottom up in an effort to bring efficiency to their DevOps processes. Adopting a fully automated process and new technologies seemed impossible, yet it changed their world.
language: [English]
verticals: [Media & Cable]
geolocation: [Europe]
---

Recently at Clientscape, success among enterprise customers has been a constant. Immersed with finishing their platform vNext, they wanted to review all their internal processes so they could become more agile. From envisioning new ideas to collecting customer feedback, it was a long process requiring focus from several team members. Although still a small team, having growth as a top priority meant that they had to streamline their processes, using the best tools and having everyone onboard.

Clientscape is onboard with implementing DevOps practices by using Visual Studio Team Services and a very interesting technological stack: a [LAMP (Linux, Apache, MySQL, and PHP) stack](https://www.turnkeylinux.org/lampstack) together with [Redis](https://redis.io/) and [MongoDB](https://www.mongodb.com/cloud/atlas/lp/general). However, they wanted to containerize their vNext solution and pick an orchestrator that could answer their needs, so they went for Docker containers on Kubernetes clusters. All of this was on top of the Microsoft Azure cloud platform, a platform they've gained experience with in recent years. Clientscape's aims are to improve product quality and automate processes.

In this hackfest we focused on a few pain points, including a future roadmap and an optimized flow based on takeaways that Clientscape captured from business discussions, technical issues, and customer observations.

### Key technologies used
- [Visual Studio Team Services](https://www.visualstudio.com/team-services/)
- [Microsoft Azure Container Registry](https://azure.microsoft.com/en-us/services/container-registry/)
- [Kubernetes clusters](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/)
- [Docker](https://www.docker.com/)

### Core team

- Diogo Lima – Back-End Developer, Clientscape
- Filipe Resende – Partner and CCO (Chief Creative Officer), Clientscape
- Francisco Madeira – Front-End Developer, Clientscape
- Nuno Oliveira – Project Manager, Clientscape
- Paul Antony – CEO and Co-Founder, Clientscape
- [João Almeida](http://www.twitter.com/jalmeida) – Senior Technical Evangelist, Microsoft Portugal
- [Miguel Caldas](http://www.twitter.com/miguelcaldas) – Principal Technical Evangelist, Microsoft Portugal
 
## Customer profile

![Clientscape logo]({{ site.baseurl }}/images/CLIENTSCAPE/clientscape@2x.png "Clientscape Logo")

[Clientscape](http://www.clientscape.com/) is a Portuguese company that offers an integrated platform and tools that facilitate brand interaction with their clients through the main social networking channels. They offer a SaaS Social CRM built for Enterprise. Among their clients, we find some of the largest Portuguese companies, organizations, and institutions as well as local subsidiaries of big multinational corporations.

Instead of using a single platform to serve multiple customers high performance, high availability services, Clientscape creates an instance for every client, and that is why it needs to use an extremely flexible and scalable hardware infrastructure.

Their platform is focused in four key areas:

- [Engage](http://www.clientscape.com/engage/) – Ensure the best customer care performance. Clientscape makes sure you are always relevant and allows you to engage your client base with overwhelming conversion rates.

- [Manage](http://www.clientscape.com/manage/) – You are in full control of your client-care pipeline. Clientscape lets you fine-tune every single aspect of automation, distribution, language rules, auto-tagging, user access, and so much more.

- [Measure](http://www.clientscape.com/measure/) – How well are you doing? How satisfied are your customers? To outperform, you need a clear view of your current stats. Clientscape delivers the deepest level of insights, dashboards, and operational performance metrics.

- [Merge](http://www.clientscape.com/merge/) – Begin a client experience management revolution. Clientscape lets you build a coherent and practical customer identification funnel that is fueled via social sign-ins. Manage and serve your clients over all of your brands' digital touch-points (online and offline).

Clientscape works internationally from their headquarters in Covilhã (Portugal), Lisboa (Portugal), and Austin, Texas (United States).

## Problem statement

Before the hackfest took place, the team got together for a full day for a [value stream mapping](https://en.wikipedia.org/wiki/Value_stream_mapping) (VSM) session. We were able to identify some pain points and plan for an improved workflow. Together we scoped the priorities to focus on during the hackfest and the result was an estimated 30 percent reduction in lead time in this initial phase. Later phases could bring a 50–70 percent reduction in lead time with very high quality assurance.

![Clientscape value stream mapping]({{ site.baseurl }}/images/CLIENTSCAPE/cs_full_vsm.png)

<br/>

Clientscape used several technologies in their DevOps workflow. For source control, they were using Bitbucket. For work planning, they were using JIRA, documenting in Confluence, and implementing their automated build and deploy with Bamboo (now discontinued).

However, from the VSM session, we agreed on several key problem areas, which defined our priorities along the way.

- **Partially implemented continuous integration (CI)**. Their CI covered some automation, calling [PHP Composer](https://getcomposer.org/) for the PHP code base, and JavaScript package management tools such as npm. However, several dependencies were only known to developers, and were usually guaranteed only during new environment deployments. During the platform lifecycle, some changes led to troubleshooting and manual operations in non-development environments. However, some of these dependencies were scripted on bash scripts outside the source control.

- **Manual UI testing, lack of unit testing and coverage measurement**. While finishing sprints, after finishing deployments in their quality environments, a manual test phase would take place. Developers would do UI testing focused on app areas that may have been impacted by the current sprint. This was a non-deterministic approach, requiring an overall manual product test to tackle any potential regression issues.

- **Semi-automated deployments**. Deployments would take place in several environments. Some were internal, usually used for testing, feature evaluation, or demoing to potential new customers. Any change on platform dependencies (mostly around Apache, PHP, or JavaScript) would be manually executed on each environment, usually with bash scripts. Creating a new environment (for example, a new customer) would require some time investment from the team.

- **Single monolithic deployment**. Clientscape's platform ran on a single Linux virtual machine. With all modules running on the same virtual machine, their only option to accept large customers would be through scaling up—bringing more CPU, memory, and disk to the monolithic deployment. They felt like having a few options to scale specific services on a single deployment. However, with their ongoing success, large customers were requiring enhanced performance.

The current situation for Clientscape was also impacted by the new version of their solution, currently in the final phases of development. Having such a strong focus on their vNext didn't allow them to improve these aspects.

Another important factor was that Clientscape was also finishing a platform evolution for their customers. In recent months, they were migrating the platform from [FreeBSD](https://www.freebsd.org/) to [Ubuntu 17.04](https://www.ubuntu.com/), which also required a special time investment from the team.

>"The VSM session created a process overall view, which allowed us to identify critical points that were having impact on our development process. This analysis provided us the tools to speed up our development and delivery processes, improving our capability to reply faster to our customer requests and to more accurately calculate our man/hour costs." —Nuno Oliveira, Project Manager, Clientscape

Considering the overall scenario, and the valuable debates after the VSM session, Clientscape expressed a natural interest in Dockerizing the solution. We agreed to work together by focusing on specific DevOps practices, while bringing Clientscape into the containers world. The following areas were the focus for the hackfest:

- Infrastructure as Code (IaC)
- Continuous integration (CI)
- Automated testing
- Continuous delivery (CD)

## Solution, steps, and delivery ##

While describing the solution we implemented, we'll provide a detailed description of the existing situation and how we tackled it.

Clientscape develops their platform mostly with PHP because they have experienced developers. The code base is divided into several modules with different goals, and developed in different timeframes and languages. Clientscape focuses on PHP, but recent modules have been using [ECMAScript 2015](https://www.ecma-international.org/ecma-262/6.0/). In their roadmap, [React](https://facebook.github.io/react/) will tend to be their main development language.

Their development environments are built on top of the Ubuntu Linux distribution (distro) provisioned by each developer. All configurations and services on top of the operating system are also managed freely by each developer. Apache and PHP extensions are controlled individually, providing some freedom when trying new development approaches and general stack use. They run locally relational and non-relational databases that can be provisioned based on provisioning scripts, and source controlled and versioned. Recently they were using [Vagrant](https://vagrant.io), but only on this development environment, something they felt like trying.

![Clientscape development flow]({{ site.baseurl }}/images/CLIENTSCAPE/cs_dev_vsm.png)

<br/>

Clientscape development efforts are centralized in their main app (CustomerCare). Other modules include shared resources, single sign-on implementations, or customer analytics. Each of their large customers has a customized version of features on top of the platform, hence additional code bases per customer. These are not configurations, but features that usually tend to be included in the base product in future sprints. This strategy is particularly relevant, because Clientscape's customers tend to profit from new features that helped other organizations manage their marketing channels.

We had to automatize build, versioning, and back tracing to work items, so we started by migrating the entire repo to a single Visual Studio Team Services subscription. Several projects were created, one per each relevant module in Clientscape's solution. Sprint planning and work management were done separately by specific team members. We were lucky and had the chance to use a new (at the time) feature of Team Services: [Import a Git repo](https://www.visualstudio.com/docs/git/import-git-repository). In a matter of minutes, we had the full repo in Team Services, including historical data on commits, pull requests, and branching.

![Clientscape code repo]({{ site.baseurl }}/images/CLIENTSCAPE/cs_devops_coderepo.png) 

<br/>

Each of these projects would have their own build process and definition. This also allowed us to start discussing a test strategy. Implementing unit tests and running them as part of the build would be done per module. The concept of versioning each module was also something new that helped create a tracking process for what's tested and deployed.

In their build definitions, we had to work with package managers ([Yarn](https://yarnpkg.com/en/), PHP Composer), run unit testing ([PHPUnit](https://phpunit.de/)), and if all were successful, build a new Docker image (details follow). 

![Clientscape pre-sales phase]({{ site.baseurl }}/images/CLIENTSCAPE/cs_presales_vsm.png)

<br/>

The release management was crucial to Clientscape. Having to deal with several different code bases targeting different customers and still having a pre-sales/demo environment required a fully automated process. The release definitions in Visual Studio Team Services allowed us to clone Git repositories from other Team Services projects (Clientscape modules); we used [Donovan Brown](https://twitter.com/donovanbrown)’s recommendation to [manually clone Git repos](http://donovanbrown.com/post/How-to-manually-clone-a-repo-in-VSTS-build). Now we had a way to build the base platform, but also all the customizations done for each large customer with segmented versioning.

One important remark is related to operations and how Clientscape supports their customers. The team gets support ticket requests through [Zendesk](https://www.zendesk.com/). However, most support tickets require research and testing on a determined version used by the end customer. Now with all the trackability, they are able to create bugs and associate them to work items, while having a feature branching strategy. Development teams don't have to stop coding to sort out issues in production.   

![Clientscape operations flow]({{ site.baseurl }}/images/CLIENTSCAPE/cs_operations_vsm.png)

<br/>

The next step was about containerizing the solution. Again, the goal was to provide Clientscape with the possibility of engaging with large customers, and for that they needed a scalable solution, and scalability management was a top priority. To be able to pick modules from the solution and scale them separately was key. In the future, they also plan to decompose modules into microservices, aiming at finer-grained management capabilities. 

In this hackfest we concentrated our efforts on containerization with Docker containers, namely Linux containers.

### Containers

Before starting to containerize Clientscape's solution, we gathered all the bash scripts used in deployments and analyzed them. We classified these changes to the environment into *Application* and *runtime*. In addition, we separated data storage into different images so we could aim at leveraging capabilities from several container orchestrators available in the ecosystem (open source was the only choice).    

The following table describes the containers we created.

| Image | Description |
| --- | ---- |
| **Clientscape front-end** | An image containing some initialization and platform requirements to run the Clientscape app. The goal was to have this image as stable as possible with infrequent updates. Includes the base operating system, and installs [FFmpeg](https://ffmpeg.org/), [Phalcon](https://phalconphp.com/en/), PHP Composer, [Imagick](http://php.net/manual/en/class.imagick.php), MongoDB, and others. |
| **Clientscape app** | The actual app from Clientscape, built using PHP and JavaScript. It only included some package manager tasks, and copying code into it. |
| **MySQL** | An image specifically to run MySQL with specific configuration data pointing to mounted volumes. |
| **Redis** | As a cache service, we created a Redis Docker image.|
| **MongoDB** | An image with MongoDB installed, along with specific configurations on mounted volumes. |

Investments were mostly done around creating the Dockerfiles. This allowed us to user Docker commands to build Clientscape container images. These Dockerfiles allowed us to install several components. As an example, we showcase the Dockerfile lines where FFmpeg is installed.

### Continuous integration (CI) with Docker

One important fact was that the Clientscape *app* Docker image depended directly on the Clientscape *front-end* Docker image. This way build executions took much less time, as they only focused on the code/app changes. All the requirements and dependencies were already in place, available in the Azure Container Registry for every build. 

![Clientscape continuous integration]({{ site.baseurl }}/images/CLIENTSCAPE/cs_devops_fullci.png) 

We actually created a separate build definition in Visual Studio Team Services just for this occasion. If there is an important change to the runtime environment, Clientscape will only need to execute both build definitions, `csFrontEnd-CI` and `CustomerCare-CI`.

- `csFrontEnd-CI` In this build definition we used the [native Visual Studio Team Services Docker task](https://github.com/Microsoft/vsts-tasks/tree/master/Tasks/Docker), and we simply reference the Dockerfile (source-controlled) so it runs a `docker build` command. The second task is responsible for pushing the successfully created image to the Azure Container Registry that we set up in the subscription (a service that provides similar functionalities to [Docker Hub](https://hub.docker.com/)).

  ![Front-end container build definition]({{ site.baseurl }}/images/CLIENTSCAPE/cs_devops_fe_ci_build_image.png) 
 
<br/>

- `CustomerCare-CI` Here we wanted to go through the full process of a typical build. We first installed all application dependencies; in this case they were PHP artifacts that must be installed in the runtime, but are clearly application artifacts. Next, we ran Yarn commands to install and build. We used the Marketplace for this, an excellent task from the community: [Yarn Build and Release Tasks (Geek Learning)](https://marketplace.visualstudio.com/items?itemName=geeklearningio.gl-vsts-tasks-yarn). 
 
Next, we ran a PHP Composer update, a dependency manager for PHP, followed by unit testing. Here, we used PHPUnit, one of the most important testing frameworks for PHP. We were amazed at the flexibility it offered because we could export coverage and test results quite easily and in several formats, and integrating with Visual Studio Team Services made life easier.
 
  ```xml
  <logging>
      <log type="coverage-clover" target="tests/_reports/logs/clover.xml"/> 
      <log type="coverage-html" target="tests/_reports/coverage" charset="UTF-8" yui="true" highlight="true" lowUpperBound="35" highLowerBound="70" />
      <log type="testdox-text" target="tests/_reports/testdox/executed.txt"/>
      <log type="testdox-html" target="tests/_reports/testdox/testdox.html"/>
      <log type="junit" target="tests/_reports/logs/junit.xml" logIncompleteSkipped="false"/>
  </logging>
  ```
 
One important aspect was the tokenization of configuration and build-specific artifacts. We used [Colin's ALM Corner Build & Release Tools ](https://marketplace.visualstudio.com/items?itemName=colinsalmcorner.colinsalmcorner-buildtasks) task, also available on the [Marketplace](https://marketplace.visualstudio.com), to replace tokens inside builds and release pipelines. With this we were able to change fields depending on the environment we were building to. Following is an example of a task we used. 
 
 ```json
    {
        "enabled": true,
        "continueOnError": false,
        "alwaysRun": false,
        "displayName": "Replace tokens in Config.build.ini",
        "timeoutInMinutes": 0,
        "task": {
            "id": "9240b5c1-a1b2-4799-9325-e071c63236fb",
            "versionSpec": "1.*",
            "definitionType": "task"
        },
        "inputs": {
            "sourcePath": "src/app/config/",
            "filePattern": "config.build.ini",
            "tokenRegex": "__(cs\\-\\w+)__",
            "secretTokens": ""
        }
    },
 ```
 
The final steps are related to copying and publishing the build artifacts so we can then kick off building the Docker image and, if successful, push it to the Azure Container Registry.

![Clientscape Runtime Build Definition]({{ site.baseurl }}/images/CLIENTSCAPE/cs_devops_app_ci.png) 

<br/>

> **NOTE**: Here we used a private Linux agent, and not a hosted Linux agent. It was extremely easy to [deploy an agent on Linux](https://www.visualstudio.com/en-us/docs/build/actions/agents/v2-linux) and register it in the Visual Studio Team Services agent queues. 
>
> This means that build could be even more optimized if we pre-installed all runtime requirements in the Visual Studio Team Services agent. 

Using the Azure Container Registry allowed Clientscape to store and manage their container images, keeping container images near deployments to reduce latency and costs. This also keeps open the possibility of storing and maintaining both Windows and Linux container images. This may come in handy in future developments of the Clientscape platform.

### Continuous delivery (CD) with Docker and Kubernetes

Considering all the outcomes from the VSM session, we agreed to explore Kubernetes as the container orchestrator for Clientscape. Their release management process needed the agility of having managed modules, especially for large customers. We started by grouping all containers in the same [pod](https://kubernetes.io/docs/concepts/workloads/pods/pod/), which reduced network latency. We exposed only the Clientscape app (front-end), while the remaining containers were only accessible by the Kubernetes cluster. Respective services were created in the Kubernetes cluster so we could access each of the modules; special attention was given to the data storage containers (MongoDB, Redis, and MySQL).
 
One of the advantages of this orchestrator is the declarative nature through [YAML/JSON files](https://kubernetes.io/docs/concepts/abstractions/overview/). To describe the Clientscape platform, we named each of the modules referencing the Docker images available in the Azure Container Registry.

In the following code snippet, we describe merely the front-end app. It includes priceless aspects such as tokens (`__k8namespace__`) or the fact that the container source is retrieved from the Azure Container Registry with a secret registered in the K8s cluster (`imagePullSecrets`).

```yaml
ind: Service
apiVersion: v1
metadata:
  name: cscustomercare
  namespace: __k8namespace__
spec:
  selector:
    app: cscustomercared
  ports:
    - protocol: "TCP"
      port: 80
      targetPort: 80
  type: LoadBalancer
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: cscustomercared 
  name: cscustomercared
  namespace: __k8namespace__
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: csfrontendpod
      name: csfrontendpod
      namespace: __k8namespace__
    spec:
      containers:
        - name: cscustomercare
          image: xxxx.azurecr.io/clientscape/cs-customercare:latest
      imagePullSecrets:
        - name: xxxx.azurecr.io
```

<br/>

The YAML is also source-controlled and a key part of the deployment tasks. A Kubernetes cluster has a tool called [kubectl](https://kubernetes.io/docs/user-guide/kubectl-overview/) that allows us to read and command the cluster. The release definition in Visual Studio Team Services was around the usage of the [Deploy to Kubernetes task](https://github.com/Microsoft/vsts-tasks/tree/master/Tasks/Kubernetes). This task allows you to execute `kubectl` commands:

```json
{
    "name": "K8s Apply Task",
    "definitionType": "task",
    "inputs": {
        "kubernetesServiceEndpoint": "4d027dce-df40-4270-90a5-871f0bc0e471",
        "containerRegistryType": "Azure Container Registry",
        "dockerRegistryEndpoint": "",
        "azureSubscriptionEndpoint": "ac53c695-a823-4d4a-b349-fc61f56b9e3e",
        "azureContainerRegistry": "{\"loginServer\":\"xxxx.azurecr.io\", \"id\" : \"/subscriptions/48cdd944-0366-46ad-871e-d6e409a534fd/resourcegroups/clientscapeacr/providers/Microsoft.ContainerRegistry/registries/clientscape\"}",
        "secretName": "",
        "forceUpdate": "true",
        "command": "apply",
        "useConfigurationFile": "true",
        "configuration": "$(System.DefaultWorkingDirectory)/CustomerCare-CI/drop/deploy-csenvironment.yaml",
        "arguments": "",
        "cwd": "$(System.DefaultWorkingDirectory)",
        "outputFormat": "json",
        "kubectlOutput": ""
    }
```

<br/>

> **NOTE**: To work with the K8s clusters from Visual Studio Team Services, it is required to create a Kubernetes Service Endpoint. This will provide access to operate the cluster. 

![Release definition - Kubernetes deployment]({{ site.baseurl }}/images/CLIENTSCAPE/cs_devops_app_cd.png) 

<br/>

This approach allowed Clientscape to have one Kubernetes (K8s) cluster per customer, group of customers, or event for their development and quality environments. *The release pipeline is very similar between environments*, so there was a high rate of reutilization. We actually encouraged Clientscape to also include in source control the Visual Studio Team Services build and release definitions that are now possible to [export](https://www.visualstudio.com/en-us/docs/build/actions/work-with-release-definitions#replicate-a-definition) into JSON files.

This allowed us to have a complete CI/CD pipeline for code based on several specific requirements. Any code committed into master branches will start a build, create/renew Docker images, and automatically update the Kubernetes cluster with this recent update of cluster images. For Dev and QA environments, this is very handy, but for production environments, the authorization process includes specific team members.

>"After clearing the most pressing technical needs in the work plan, Microsoft has developed a plan to accelerate deployment. For this, it implemented continuous integration of Visual Studio Team Services and orchestrator of Kubernetes for the entire application, dramatically reducing deployment time." —Diogo Lima, Back-End Developer, Clientscape
    
## Conclusion

Clientscape wished to streamline deployments and automate the development flow, build, and deployment processes as much as possible. Their DevOps expertise was limited and they found real value having a review of their flows. The value stream mapping was decisive in learning what was known and unknown at Clientscape. Having different people actively participating and suggesting business and technical enhancements made the difference.

In the technical part, Dockerizing a not-so-simple PHP was challenging; however, there was a lot of advice and articles from the community. Being able to rethink from the ground up how Clientscape could automatize different versions of their platform and target different customers was key. This actually allowed taking automated testing seriously, bringing a positive impact to the team. Taking advantage of Docker characteristics brought a huge impact on time spent in build/deploy processes. With Kubernetes, the support in Azure was transparent. We were able to explore several scenarios (multiple pods, and using the same cluster for several deployments with namespaces).

In the end, we were able to fully automate from code check-in to build, test, and release to multiple environments by using a Kubernetes cluster. After setting up the entire pipeline, Clientscape will set up the same for other modules/APIs and services and get closer to a truly microservices architecture. 

During the hackfest, we discussed several ideas such as process and platform improvements and technical approaches for Clientscape, but always while considering the need to include DevOps practices. Most importantly, Clientscape realized the value of continuously improving and is committed to some opportunities going forward.

### Opportunities going forward

- Completing the CI/CD pipeline for other components in their platform.
- Increasing investments with React for their front-end code base.
- Completing the unit testing efforts by raising coverage but also tackling other technologies in the platform such as JUnit and [Enzyme](https://github.com/airbnb/enzyme).
- Investing in monitoring and collecting learnings from end customers by using [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/).
- Optimizing build through a total provisioning of the Visual Studio Team Services Linux agent. 
- Uniformizing the Linux distribution used across the platform; deciding on Debian or Ubuntu and deprecating FreeBSD.

![Clientscape opportunities going forward]({{ site.baseurl }}/images/CLIENTSCAPE/cs_priorities.png) 

<br/>

## Source code

We shared some source code used in the Dockerization, and several commands were used to create some of the services in Azure to support our solution. You can find the source code in this GitHub repo [DevOps with a LAMP stack containerized and orchestrated with Kubernetes](https://github.com/Clientscape/LAMPDevOpswithContainers). 

## Additional resources

During the hackfest, and also while preparing it, the team proactively did some research on the technical topics we were about to address. We felt like sharing these resources because they will bring additional details that may be useful for the reader's challenges.

### Documentation

 - [DevOps overview for Team Services and TFS](https://www.visualstudio.com/en-us/docs/)
 - [Deploy LAMP stack on Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/virtual-machines-linux-create-lamp-stack)
 - [Docker Documentation](https://docs.docker.com/)
 - [Docker for Azure Setup & Prerequisites](https://docs.docker.com/docker-for-azure/)
 - [Azure Container Service Documentation](https://docs.microsoft.com/en-us/azure/container-service/)
 - [Azure Container Registry Documentation](https://docs.microsoft.com/en-us/azure/container-registry/)
 - [Kubernetes Bootcamp](https://kubernetesbootcamp.github.io/kubernetes-bootcamp/)
 - [Azure Container Service Engine - Kubernetes Walkthrough](https://github.com/Azure/acs-engine/blob/master/docs/kubernetes.md)
 - [PHP Composer Documentation](https://getcomposer.org/doc/)

### Blog posts

 - [Creating a build agent and definition for PHP in VSTS](https://hajekj.net/2016/10/30/creating-a-build-agent-and-definition-for-php-in-vsts/)
 - [Dockerizing a PHP Application](https://semaphoreci.com/community/tutorials/dockerizing-a-php-application)
 - [Containers & Redis – Running Redis on Windows with Docker](https://blogs.msdn.microsoft.com/uk_faculty_connection/2017/02/21/containers-redis-running-redis-on-windows-with-docker/)
 - [Full CI/CD pipeline to deploy multi-containers application on Azure Container Service with Docker Swarm using Visual Studio Team Services](https://blogs.msdn.microsoft.com/jcorioland/2016/11/29/full-ci-cd-pipeline-to-deploy-multi-containers-application-on-azure-container-service-docker-swarm-using-visual-studio-team-services/)
 - [Journey to the Kubernetes from Legacy Docker environment on Azure with VSTS](https://blogs.technet.microsoft.com/livedevopsinjapan/2017/02/23/journey-to-the-kubernetes-from-legacy-docker-environment-on-azure-with-vsts/)
 - [Playing with the VSTS Linux agent and Docker](https://mderriey.github.io/2017/03/06/playing-with-vsts-linux-agent-and-docker/)
 - [Continuous Delivery to Kubernetes clusters using VSTS](https://github.com/dtzar/blog/tree/master/CD-Kubernetes-VSTS)
 - [Enzyme: JavaScript Testing utilities for React – Airbnb Engineering](https://medium.com/airbnb-engineering/enzyme-javascript-testing-utilities-for-react-a417e5e5090f)
 - [Writing PHP Unit testing friendly code](https://medium.com/@sergioserra/writing-php-unit-testing-friendly-code-5ef9a8a49da1)
 - [Generating Code Coverage with PHPUnit and phpdbg](https://hackernoon.com/generating-code-coverage-with-phpunite-and-phpdbg-4d20347ffb45)
 - [Running PHPUnit Tests in Docker](https://gilbert.pellegrom.me/running-phpunit-tests-in-docker-8899a03d3d4c)

### GitHub repos

 - [Microsoft/vsts-tasks](https://github.com/Microsoft/vsts-tasks/tree/master/Tasks/Docker)
 - [msdevno/hol-oss-devops](https://github.com/msdevno/hol-oss-devops)
 - [Azure/acs-engine](https://github.com/Azure/acs-engine)
 - [Azure/acs-demos](https://github.com/Azure/acs-demos)
 - [airbnb/enzyme](https://github.com/airbnb/enzyme)
 - [Azure/azure-sdk-for-php](https://github.com/Azure/azure-sdk-for-php)
 - [Azure/azure-sdk-for-php-samples](https://github.com/Azure/azure-sdk-for-php-samples)
 - [Azure/azure-storage-php](https://github.com/Azure/azure-storage-php) 
