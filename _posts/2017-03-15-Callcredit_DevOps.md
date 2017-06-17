---
layout: post
title:  "Modernizing the development and deployment practices of a legacy application by using DevOps and containers"
author: "Marcus Robinson, Ross Smith"
#author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-06-16
categories: [DevOps]
color: "blue"
image: "images/callcreditdevops/VSM-small.jpg"
excerpt: Microsoft teamed up with Callcredit and Numéro to streamline the development and deployment of their marketing application by using Visual Studio Team Services and Azure. 
language: [English]
verticals: [Financial Services]
geolocation: [Europe]
published: false
---

Our customer, Numéro, has a marketing application used in retailer call centers called Numéro Interactive. This product is partially installed on-premises and partially hosted on virtualized servers in a hosting provider. Each customer that uses Numéro Interactive has their own version of the software with different configurations. Automated testing is carried out during the development process followed by manual tests. Environments must be created to build and test every specific version of the base software and its respective configuration. Numéro has access to some deployments to carry out updates, whereas others are managed by the end customer. After the build process is complete, it creates a package that is then deployed manually to all customer sites. These current processes are time-consuming and error-prone.

The solution hopes to expand Numéro’s user base and streamline the deployment process by creating a continuous delivery pipeline using Visual Studio Team Services and Azure.

### Key technologies used

- [Windows Server](https://www.microsoft.com/en-us/cloud-platform/windows-server)
- [Docker](https://www.docker.com/)
- [Visual Studio Team Services](https://www.visualstudio.com/team-services/)
- [Microsoft Azure DevTest Labs](https://azure.microsoft.com/en-us/services/devtest-lab/)
- [Azure Container Service](https://azure.microsoft.com/en-us/services/container-service/)

### Core team

- James McGeachie – Senior Engineer, Application Delivery System Build, Callcredit
- David Wilson – Technical Architect, Callcredit
- Colin Williamson – Software Engineer,  Callcredit (N)
- Mo Musa – Senior Engineer, Application Management & Support, Callcredit
- David Money – Engineer, System Build Dev Ops Team, Callcredit
- Stewart Lord – Engineer, Infrastructure DevOps Team, Callcredit
- Bartas Kondrotas – Operations, Engineer IT Services - Operations, Callcredit
- Ash Shelton – Software Engineer, Callcredit (N)
- Chris Downes-Ward – Development Manager, Callcredit (N)
- Simon Cohen – Test Engineer, Callcredit (N)
- Alex Carter – System Build Engineer, DevOps Consumer Team, Callcredit
- Ross Smith – Technical Evangelist, Microsoft
- Marcus Robinson – Technical Evangelist, Microsoft
- Joao Pedro Martins – Cloud Solution Architect, Microsoft
- Gina Dragulin – Director, Audience Evangelism, Microsoft

(N) indicates part of the Numéro team.

## Customer profile

[Callcredit](http://www.callcredit.co.uk/), based in Leeds, is one of the largest credit rating agencies in the UK. Known to the general public for their free service Noddle.co.uk, which has over three million subscribers, they use Azure for a range of workloads, from Noddle itself to other platform as a service (PaaS)-based workloads.

[Numéro](http://www.thisisnumero.com/), based in Stockport, is a recent acquisition, and Callcredit is looking into bringing them to the cloud. Numéro has a marketing product used in retailer call centers. This product is partially installed on-premises, and partially hosted on virtualized servers in a hosting provider. The product runs on Windows Server and utilizes Microsoft technologies, such as ASP.NET on IIS, as well as non-Microsoft technologies, such as Node.js and Java running on Apache Tomcat.

## Problem statement

Each customer that uses Numéro has their own version of the software with different configurations. Each version must be built in environments with the right requirements, such as versions of .NET or dependent libraries. Automated testing is carried out during the development process followed by manual tests. Environments must be created to build and test every specific version of the base software and its respective configuration.

Some customers have the product deployed on-premises and others to servers hosted at [UKFast](https://www.ukfast.co.uk/). Numéro has access to some deployments to carry out updates, whereas others are managed by the end customer. The existing continuous integration (CI)-triggered build process is carried out within Jenkins and takes up to eight hours. This is not ideal.

After the build process is complete, it creates a package that is then deployed manually to all customer sites, and [Octopus deploy](https://octopus.com/) is used to push updates to the hosting environment. This process is error-prone and often requires manual intervention. Callcredit hopes to expand Numéro’s user base with the assistance of Azure; hence, moving forward with manual updates of deployments will not be feasible. 

Because Callcredit is FCA-regulated, a clear segregation must exist between developers and the release process. Any software used for continuous integration and continuous deployment (CI/CD) must facilitate this.

## Envisioning day

This day provided an opportunity to understand the Numéro application and identify areas for potential improvement and work during the hackfest.

We started by going around the room doing introductions. Although some of the Callcredit and Numéro teams had not worked together a great deal in the past, it was clear at this point that the day would be an extremely productive exploration exercise for Callcredit.

### Architecture

The first step was to discuss the architecture of the Numéro application, which is essentially a three-tier application: a web front end, a number of services within an application layer, and a Microsoft SQL database. The majority of the services are within a single Core Services component, whereas some more recently developed services have been split out into smaller microservice-like components.

![Architecture diagram]({{ site.baseurl }}/images/callcreditdevops/arch.png)

<br/>

![Architecture whiteboard]({{ site.baseurl }}/images/callcreditdevops/arch.jpg)

<br/>

### Value stream mapping

The members of the team mapped out the process followed for the release of a feature. 

![Value Stream Mapping Process]({{ site.baseurl }}/images/callcreditdevops/vsm-map.jpg)

<br/>

After it was mapped, we identified areas of waste by using a red pen. The entire team took part in this process.

![Value Stream Mapping Waste]({{ site.baseurl }}/images/callcreditdevops/vsm-waste.jpg)

<br/>

After the areas of waste were identified, we discussed how improvements could be made to existing processes to reduce waste. These were recorded by using a green pen. The completed value stream mapping is shown in the following image.

![Completed Value Stream Mapping]({{ site.baseurl }}/images/callcreditdevops/vsm.jpg)

<br/>

Currently, the entire amount of process time from the sale of a feature to its release to a customer was approximately seven months, with approximately five months taken up by development time, around a month at the proof-of-concept stage, and the rest during sprints.

### Areas for improvement

A number of areas for improvement were outlined, some that have potential technical solutions, and others that require a change to a process. Areas identified included the following.

#### Improve the definition of requirements early in the process

This is a common problem that can cause unnecessary development cycles. One suggestion that was made was to write tests at the requirement stage, which will help refine the details prior to the start of development.

#### Reduce the time taken for build to complete and increase the build success rate

A full build including automated tests takes approximately 8 hours. It was estimated that this build also fails 50% of the time due to technical issues rather than test failures.

- **Remove redundant tests**. We need to remove or rewrite redundant and unreliable tests within the build process.

- **Work to remove technical debt**. Some of the reasons that the Jenkins build regularly fails could be due to using old versions of testing frameworks, such as NUnit and Selenium, and also to application dependencies. The time has not been available to upgrade these components and carry out any remedial work required, such as updating tests.

- **Enable parallel testing**. At present all tests are carried out in a serial fashion. This is due to a combination of infrastructure constraints and the time required to implement parallel tests. By using cloud infrastructure or technologies such as containers, these constraints can be removed.

- **Improve infrastructure performance and remove limitations**. In line with aging hardware, poor SAN performance and other factors increase the amount of time required to complete builds. By making use of cloud infrastructure, additional resources can be provided to the automated build process.

#### Improve the deployment process

The application needs to be deployed multiple times, both through the development process and when deployed to customer sites. Each deployment can be time-consuming and error-prone.

- **Reduce the number of supported versions**. At present, each time the application is deployed to a customer environment, the deployment methodology is different. This is due to the fact that different customers are on different versions of the software. If the number of supported versions was reduced, ideally if everyone was on the same version, the application deployment methodology would be a lot more consistent.

- **Amend the application to enable efficient deployment**. We discussed methods that could be used to make deployment of the application more efficient. This would be beneficial not only when deploying applications to customer production environments but also when deploying applications to carry out automated or manual testing as part of the development process. The options we discussed, along with the pros/cons with relation to Numéro and Callcredit, are shown in the following table.

| Technology  |  Pros | Cons  |
|-------------|----------------------|-------|
| <strong>IaaS</strong>        | Lift and shift | Cloud-specific deployment methodology  |
|             |          | Poor resource utilization  |
| <strong>Containers</strong>  | Deploy anywhere   | Windows containers are very new  |
|             |                    | Skills gap for management        |
| <strong>PaaS</strong>  | Zero infrastructure concerns         | Azure-specific                  |
|             |                                    | Skills gap, though less than containers   |

<br/>

### Hackfest focus

As a result of the value stream mapping, we decided to focus on the following areas during the hackfest.

#### Migrate build and release processes to Visual Studio Team Services

A discussion was had regarding taking the builds from Jenkins and using Visual Studios Team Services release management. Callcredit currently uses Team Foundation Server and was keen to evaluate Visual Studio Team Services, which also provides a single location for source code, build, release, and package management, enabling continuous integration and continuous delivery. These features significantly reduce the complexity of Numéro's existing development infrastructure. The overwhelming preference from both Numéro and Callcredit was to use Team Services for the hackfest. 

#### Deploy Numéro Interactive by using containers

Callcredit defined the following requirements for moving forward with Numéro:

- The solution needs to be portable (both hosted and on-premises).
- For hosted, we need to be able to push an update once and update many instances.
- We need to be able to quickly replicate a specific instance for support purposes.

For the purposes of the hackfest, due to the requirement for both hosted and on-premises deployment, we decided to proceed with containers rather than utilize cloud native solutions.

## The hackfest

On Day 1 of the hackfest, we decided to focus on a subset of the Numéro Interactive application to increase the likelihood of an end-to-end result being produced. The components chosen were the minimum components required to get the application up and running: Core Services and Vouch. Core Services is the primary application, and Vouch looks after authentication.

![Containers]({{ site.baseurl }}/images/callcreditdevops/containers.png)

<br/>

### Azure DevTest Labs

We decided to use Azure DevTest Labs to provide both build agents and developer workstations during the hackfest. DevTest Labs offers a wrapper around existing Azure services to facilitate the use of Azure in dev-test scenarios.

#### Artifacts

To create both build agents and development machines for the project, we needed to repeatedly deploy virtual machines with a number of prerequisites. 

Although an image could be created with the prerequisites installed, this cannot be shared across subscriptions and is one-size-fits-all. We needed to be able to create virtual machines with different options, one configuration for build, one for test, and some users just needed Docker support.

DevTest Labs has the concept of *artifacts*. There is a  public artifact repository, but this does not have all the required prerequisites. Prior to the hackfest, we created custom artifacts to cover Docker and the [Adobe Flex SDK](http://www.adobe.com/products/flex.html).

#### Custom repository

The first step was to fork the existing repository. I could have created a new repository from scratch, but wanted to be able to create a pull request back to the Azure/azure-devtestlab repository and use the existing examples as templates.

- **Add repository to DevTest Labs**

  I added my new repository to DevTest Labs.

  ![Add Repo]({{ site.baseurl }}/images/callcreditdevops/addrepo.png)
  
  <br/>

  This could be seen alongside the public repo in the portal.

  ![Two Repo]({{ site.baseurl }}/images/callcreditdevops/tworepo.png)
  
  <br/>

- **Enable Docker artifact**

  The first artifact I built was to enable Docker on Windows Server. There is a base "Windows Server 2016 with Containers" image on Azure, but we wanted to use a base image with Visual Studio, so we'd need to install Docker.

  For information about creating artifacts, see [Authoring Artifacts](https://github.com/Azure/azure-devtestlab/blob/master/Documentation/AUTHORING.md).

  Each artifact exists within its own folder. The first file required is an `artifact.json` file. This includes metadata about the artifact, a URL to an icon, and the command to execute. The file I created is as follows.

  <script src="https://gist.github.com/marrobi/e4c86e12844342cdd1dda246a755c2a7.js"></script>
  
  <br/>

  The file `InstallDocker.ps1` is executed by using Windows PowerShell; it is simply two commands.

  <script src="https://gist.github.com/marrobi/3d73762884e48313c68019af1d1b8990.js"></script>
  
  <br/>

  After the hackfest was complete and the artifact had been used multiple times, I [submitted a pull request](https://github.com/Azure/azure-devtestlab/pull/209), which was accepted and can now be seen in the public repository in the Azure portal.

  ![Docker Artifact]({{ site.baseurl }}/images/callcreditdevops/dockerartifact.png)
  
  <br/>

- **Adobe Flex SDK**
  
  Again I created an `artifact.json`.

  <script src="https://gist.github.com/marrobi/14989b07e9193ebf22673719471ae874.js"></script>
  
  <br/>

  The PowerShell script is a little more complex. It extracts the download URL from a web page by using a regular expression, extracts the archive, and installs the Flash plug-in.

  <script src="https://gist.github.com/marrobi/95205ed83a8a7d36a3efaab57053d910.js"></script>
  
  <br/>

#### Formula

DevTest Labs has the concept of *formula*, which is in effect a template combining virtual machine specifications with artifacts. I created a formula for build agents and one for test agents.

#### ARM templates

To aid the deployment of DevTest Labs into the hackfest subscription, Azure Resource Manager (ARM) templates were created by using the examples at [ARM Templates](https://github.com/Azure/azure-devtestlab/tree/master/ARMTemplates).

The template created enables:
- Deployment of the lab
- Creation of a custom repository
- Creation of the formula

The ARM template can be seen in the following code.

<script src="https://gist.github.com/marrobi/c0fb80a095e22950170f0870a0503a62.js"></script>

<br/>

- **Network configuration**

  Two areas of the template proved to be tricky, the first being network configuration. By default, when a network is deployed in DevTest Labs, by default, the ability to access it by using public IP addresses is disabled, as is the ability to connect virtual machines to the network.

  Subnet overrides had to be defined within the network configuration as follows.

  ```
    "subnetOverrides": [

                {

                  "name": "[variables('DevTestLabNetworkSubnet1Name')]",
                  "resourceId": "[variables('existingSubnetId')]",
                  "useInVmCreationPermission": "Allow",
                  "usePublicIpAddressPermission": "Default",
                  "sharedPublicIpAddressConfiguration": {
                    "allowedPorts": [
                      {
                        "transportProtocol": "tcp",
                        "backendPort": 3389
                      },
                      {
                        "transportProtocol": "tcp",
                        "backendPort": 22
                      }
                    ]
                  }

                }

              ]
  ```
  
  <br/>

  This gives control to lab administrators as to what protocols can be exposed to the public Internet.

- **Repository name**

  The second area that required some investigation was referencing the artifacts in the custom repository within the formula. The example given uses the repository name "public repo." Each custom repository has to be created with a display name and also a unique name. This name is generated within the template as follows.

   `"privateRepoName": "[concat('Repo-', uniqueString(subscription().subscriptionId))]",`
   
   <br/>

  This unique name needs to be referenced when specifying artifacts.

  ```
      {
      "artifactid": "[concat('/artifactsources/',variables('privateRepoName'),'/Artifacts/windows-docker')]",
      "parameters": []
      }
  ```

  <br/>

### Docker images

The first step towards containerizing the Numéro solution was to create Docker files for the required images. Because Callcredit has strict security requirements, all images had to be built internally rather than using [Docker Hub](https://hub.docker.com/). 

The base images required were:

- IIS and .NET 4.5 
- IIS, .NET 4.5, Tomcat, and Java
- Node.js

The images required to get the minimum services running were:

- Core Services
- Vouch

#### IIS and .NET 4.5

PowerShell was used to install and configure IIS. A PowerShell script was used to monitor IIS and ensure that the container remained in the running state; for more information, see [Wait-Service](https://github.com/Microsoft/Virtualization-Documentation/tree/master/windows-server-container-tools/Wait-Service).

<script src="https://gist.github.com/marrobi/e2c3c80ba9759d99cc83eb5cd7995af0.js"></script>

<br/>

#### Tomcat and Java in addition to IIS

Because Core Services also requires Tomcat and Java in addition to IIS, an additional image was created from the IIS image with these features. Tomcat and Java were installed by using an existing PowerShell script, `install.ps1`.

<script src="https://gist.github.com/marrobi/6dc0cf2773f1044607b51f5e2e6e73ac.js"></script>

<br/>

#### Core Services

This image is the image that contains the custom services and will be run.

<script src="https://gist.github.com/marrobi/4c339b87f0f59291c0dcbf047f3a3480.js"></script>

<br/>

This Docker file pulls in multiple artifacts and runs the installation PowerShell script.

**DNS bug**. There is currently a bug in Windows Server where DNS resolution between containers does not work correctly. Although I was aware of this issue before the hackfest, it still took a while for the issue to be identified and then remember that we needed to fix it. The issue can be resolved by using the following registry fix in the Docker file.

```
RUN set-itemproperty -path 'HKLM:\SYSTEM\CurrentControlSet\Services\Dnscache\Parameters' -Name ServerPriorityTimeLimit -Value 0 -Type DWord
```

This issue will hopefully be fixed in a future update of the Windows Server core base images.

The Docker file also specifies that port 80 should be exposed at run time.

#### Vouch

<script src="https://gist.github.com/marrobi/d96aa11ac6bc6683d44d7ddad1663ac1.js"></script>

<br/>

The Vouch Docker file uses similar commands. To get around some path escaping issues when running commands, we used `WORKDIR` to change the current working directory.

#### Data

For the purposes of the hackfest, SQL Server Express was installed within a container, and the data stored within the container itself. Further consideration will need to be given to this when the solution moves towards production. The data could be mounded in from an external volume, or stored on a SQL cluster external to the containerized application, or use a cloud SQL offering such as Azure SQL Database.

<script src="https://gist.github.com/marrobi/c0f2b17e0a677b70fdabceab3f4fa02f.js"></script>

<br/>

An image derived from the SQL image was created with the required database schema.

<script src="https://gist.github.com/marrobi/ed5b4e9119bf6b84af435c0f4c12f006.js"></script>

<br/>

**Nginx**. The Callcredit team continued work after the hackfest to containerize the remaining elements of the application. This included building a container running Nginx to act as a reverse proxy and provide SSL offload.

<script src="https://gist.github.com/marrobi/3208e5e784953c65d35d4c400bf10ba2.js"></script>
  
<br/>

### Visual Studio Team Services build

After the images had been created locally, build definitions were created in Team Services to accelerate further development.

#### Base images

For the base images, the build pipeline is extremely straightforward because there is no code to build prior to the images being built.

- **Build task**

  As seen in the following image, the image name is tagged with the build ID, for example `iis-net45:$(Build.BuildID)`, which means that each image created is versioned with the build ID. 

  The **Qualify Image Name** check box is selected, which prefixes the image name with the registry name, as specified in the **Docker Registry Connection** field. This means that when we push the image, it goes to the appropriate registry without any additional tags.
  
  <br/>
  
  ![Build task]({{ site.baseurl }}/images/callcreditdevops/build_common.png)

  <br/>

- **Push task**
  
  The push task simply pushes the image up to the Azure Container Registry. The base images are also tagged **Latest**, which meant we didn't have to worry about image versions when building images relying on the base images. In a production environment, this would not be recommended because some control is lost as to what changes are made into images built from the base images.
  
  <br/>
  
  ![Push task]({{ site.baseurl }}/images/callcreditdevops/build_common.png)
  
  <br/>

#### Core Services build

On Day 1 of the hackfest we attempted to migrate the existing Grunt build into Team Services. Grunt had been used previously because the development team had adopted all open source technologies, and they preferred to run the same Grunt script during their local development cycle and their continuous integration. Numerous obstacles needed to be overcome to get this work; Grunt was orchestrating building of C++, C#, and Java by using Artifactory, NuGet on a UNC share, and npm. We set up a private build agent, and we used the Team Services Package Manager mainly for npm packages.

![Release]({{ site.baseurl }}/images/callcreditdevops/package.PNG)

<br/>

We would have really liked to use Artifactory in the hackfest, but there was no extension at that point and we didn't have time to write one, so we had to copy Ivy onto the build server for the purposes of the hackfest. For future hackfests, we would use the [Artifactory extension](https://marketplace.visualstudio.com/items?itemName=JFrog.jfrog-artifactory) to push packages and the [Build plug-in](https://www.jfrog.com/confluence/display/RTF/MSBuild+Artifactory+Plugin) to pull packages. For more information, see [Documentation for using Maven with Package Management in Team Services and TFS](https://www.visualstudio.com/en-us/docs/package/preview/maven-docs).

We timeboxed the build activities to the first day, and after not being able to complete this activity, we decided to copy the binaries into Team Services so that we could unlock the other parts of the hackfest. We then concentrated on building smaller subsets of the system such as Vouch.


#### Vouch build

We used Team Services tasks to reduce scripting, and we used the existing Grunt script that was in use with the Jenkins Docker build, and then pushed after the code had been built.

Some key callouts on the tasks that we used are in the following screen shot.

![Vouch Build]({{ site.baseurl }}/images/callcreditdevops/vouch_build.png)

<br/>

- The **PowerShell task** was to copy the latest version of NuGet onto the build server, which was needed if you are going to use the Visual Studio Team Services Package Manager extension. This could be tidied up so that we weren't using the command-line to call PowerShell.

  ![Latest NuGet]({{ site.baseurl }}/images/callcreditdevops/LatestNuget.PNG)

  <br/>

- The existing **Grunt build task** was used, which was responsible for creating a zip file in the distribution folder with a version number in the file name. To get this in the right place, we had to extract this into a folder called **latest** in the **Docker** path so that we had a consistent folder name before we created the Docker image.

  ![Extract Vouch]({{ site.baseurl }}/images/callcreditdevops/ExtractVouch.PNG)

  <br/>

### Visual Studio Team Services release pipeline

For the purposes of the hackfest we created two environments: a Test environment and an LV (Live) environment.


#### Docker Compose

We decided to use Docker Compose to deploy the services because we needed a simple way to deploy to a single Windows virtual machine.

The Docker Compose file that we used during the hackfest is as follows.

<script src="https://gist.github.com/marrobi/ad97b604132c1ddc90b509efdba117ce.js"></script>

<br/>

Each service is defined, along with exposed ports and any environment variables.

The `numero` network is defined within the Docker Compose file and all services connect to it. This is of type `nat`. At the time of the hackfest, Windows Server 2016 did not support overlay networks, but moving forward, an overlay network is likely to be used because it supports communication between containers running on multiple nodes.

We began to look at Docker Swarm towards the end of the hackfest, but ran out of time. Callcredit took this away as something to investigate after the hackfest.

#### Visual Studio Team Services task

The first step was to use `docker-compose up` to deploy containers. The command was run with the `-d` flag to run containers in the background, and a project name of `numero` was specified.

The image builds were specified as artifact sources to the release, and hence the build ID was  available at runtime within an environment variable.

To enable the appropriate version of a container image to be pulled from Azure, Container Registry placeholders were used in the Docker Compose file to specify the image tag as follows.

 `image: numerohack.azurecr.io/vouch:${RELEASE_ARTIFACTS_VOUCH_BUILDID}`

<br/>

![Release]({{ site.baseurl }}/images/callcreditdevops/release.jpg)

<br/>

#### Automated testing

One of the pain points for the customer was the time that it took for their integration suite to run and the amount of failures that occurred. We ran through the concept of using test agents to automatically run their UI tests on a designated machine and thus free the build server for other work. **Copy Test Scripts to Test Agents** copies the Selenium artifacts to the C:\Tests folder on a server running in Azure.

![Copy Test Scripts]({{ site.baseurl }}/images/callcreditdevops/CopyTestScripts.PNG)

<br/>

We can then use the **Deploy Test Agent** task to ensure that the virtual machine is capable of running tests and able to publish back to Visual Studio Team Services.

![Deploy Test Agent]({{ site.baseurl }}/images/callcreditdevops/DeployTestAgent.PNG)

<br/>

The final step is to execute the tests that were copied into the C:\Tests folder. The Selenium tests would now be executed on a remote machine in Azure.


#### Triggers

A release trigger was configured each time the Docker Compose file was modified. In production, we would also likely trigger on the update of each individual image build, but we didn't do this in the hackfest given the frequency of updates being made to images.

![Release Trigger]({{ site.baseurl }}/images/callcreditdevops/release_triggers.jpg)

<br/>


### Monitoring

To monitor the containers, an Operations Management Suite (OMS) agent was installed on the container host. The container logs were then accessible via the OMS portal.

![OMS]({{ site.baseurl }}/images/callcreditdevops/momscontainer2.jpg)

<br/>

## Conclusion

The entire engagement was a great success. The value stream mapping exercise gave the team great insight into their current development processes.

> "The value stream mapping exercise wasn't just useful in terms of laying out the technologies and processes. It was also a bit of a trust and familiarisation exercise for the teams and individuals. We found it extremely valuable." —Alex Carter, System Build Engineer, DevOps Consumer Team, Callcredit

> "Actually isolating and realising how much ‘waste’ was interesting to me. I knew there was quite a lot, but identifying exactly where and how much there was, was essentially a green light for further work into improving the build system." —Ash Shelton, Software Engineer, Callcredit

Using Visual Studio Team Services to create a continuous delivery pipeline that outputs a set of containers vastly improved the efficiency in which the Numéro application could be deployed. This saves time when deploying the application to customer sites and when deploying a specific version of the application to replicate a customer environment. Multiple versions of the application can be maintained and deployed with consistency independent of the deployment location.

> "Watching the build agent run the compose command and then Numéro popping up a minute or so later was impressive, as it takes us about 15 minutes to bring an entire Numéro system up on our CI as it stands." —Ash Shelton, Software Engineer, Callcredit

The use of Azure as a development and testing platform removes bottlenecks that are present due to existing on-premises hardware limitations. The ability to create and destroy development environments on demand enables developers to become more productive.

> "We enjoyed getting to know Azure DevTest Labs and were impressed by the ease of creating and scripting environments." —Alex Carter, System Build Engineer, DevOps Consumer Team, Callcredit

As always it would have been great to achieve even more. At the end of the hackfest, the Numéro application, although running, wasn't 100% functional. An issue that was resolved a few days later by the Numéro team (a file permissions issue) prevented fully integrating and testing some of the work that had been carried out.

> "I thought it was overall very successful, but it was a bit of a shame we didn’t get the system up and running in time to check Application Insights or the ELK stack work." —Ash Shelton, Software Engineer, Callcredit

### Callcredit's next steps

#### Immediately

- Assess orchestration technologies:
  - [Kubernetes](https://kubernetes.io/)
  - [Docker Swarm](https://docs.docker.com/engine/swarm/)
  - [Azure Service Fabric](https://azure.microsoft.com/en-us/services/service-fabric/)
- Recreate the solution outside of the hackfest environment.

#### Within a year

- Prove portability, both on-premises and with other cloud providers.
- Add customer configuration to the application.
- Deploy a fully functional, live customer solution running in containers.
- Begin containerization of the next software product.

> "In just three days we created builds in Visual Studio Team Services with continuous integration and delivery pipelines into our Azure environments. Since the hackfest, we have continued our work to containerise the rest of the Numéro components and we will continue to create a fully configured, fully production-ready solution. There is so much still to learn, but the hackfest gave us a real head start, with a grounding in the methods and the confidence to make it all work." —Alex Carter, System Build Engineer Dev Ops Consumer Team, Callcredit
