---
layout: post
title:  "Helping Rock in Rio integrate their website build cycle with autoscaling virtual machines"
author: "Caio Chaves Garcez"
author-link: "https://twitter.com/Caio_garcez"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-05-23
categories: [DevOps]
color: "blue"
image: "images/2017-03-22-rock-in-rio/Figure_15_Fabricio_Catae_Sanchez.jpg"
excerpt: Rock in Rio created a mechanism to ensure new versions of their website are correctly deployed to a pool of virtual machines by using autoscaling based on virtual machine scale sets in Azure.  
language: [English]
verticals: [Communications/Media]
---

   ![Figure 0 - Rock in Rio Logo]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_0_Rock_in_Rio_Logo.png)

<br/>

In the months preceding a new event, Rock in Rio's website is constantly being updated as new artists are confirmed, new tickets and bundles are put on sale, marketing strategies are adjusted, and event logistics change. This means that designers and developers are working at a rapid pace, sometimes on urgent demands that just became critical to the business at that very moment.

At the same time, the amount of users accessing the website can vary dramatically from one day to the next, as new announcements are made and concerts are confirmed. This means that the infrastructure supporting the website must ideally be dynamic, scaling up and down according to demand in an automated fashion.

These two concurrent demands drove Rock in Rio to adopt a new process of deploying website builds to virtual machine scale sets in Microsoft Azure, so that as new virtual machines are added to the pool, they receive the proper version of the website.
 
This article describes how this solution was developed in a joint partnership between Microsoft and K2, the company responsible for Rock in Rio's website operations. A value stream mapping exercise was also performed as part of the engagement, involving software development companies Artplan and Outra Coisa.

### Key technologies

- [Virtual machine scale sets in Azure](https://docs.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-overview)
- [Visual Studio Team Services](https://www.visualstudio.com/team-services/)
- [Chef](https://docs.chef.io/chef_overview.html)


### Core team

- Gabriel Moura – Project Manager, Artplan
- Pedro Cernausan – Development Head for Rock in Rio, Artplan
- Rafael Bernardes – Executive Director, K2
- Rodrigo Ramos – Technical Director, K2
- Rafael Siqueira – Developer, Outra Coisa
- [Caio Garcez](https://twitter.com/Caio_garcez) – Senior Technical Evangelist, Microsoft Brazil
- [Fabricio Catae](https://twitter.com/fcatae) – Technical Evangelist, Microsoft Brazil
- [Fabricio Sanchez](https://twitter.com/sanchezfabricio) – Technical Evangelist, Microsoft Brazil


## Customer profile

[Rock in Rio](http://rockinrio.com/) is the company responsible for promoting, organizing, and executing music festivals under the same name. The first festival happened in Rio in 1985, but since then 17 shows have been executed not only in Brazil, but also in Portugal, Spain, and the United States. More than 1,500 different artists have played in Rock in Rio, considering all editions so far.

Rock in Rio is one of the largest music festivals in the world, with 1.5 million people attending the first event, 700,000 attending the second and fourth, about 1.2 million attending the third, and about 350,000 people attending each of the 3 Lisbon events.

As a company, Rock in Rio has no IT staff itself—all development and operations are outsourced. K2 is the main vendor involved because it's directly responsible for overseeing the operation of all the company websites (11 in total). Third-party developers are hired to create new websites or maintain the existing ones, incorporating new features as demanded by the business. Two software companies are currently under contract to provide these development services to Rock in Rio: [Outra Coisa](http://outracoisa.space/en) and [Artplan](http://www.artplan.com.br/).

The main site is the Rock in Rio [portal](http://rockinrio.com/), where music fans can get information about upcoming events. Users can also initiate ticket purchase from this portal, but the actual payment is handled by a third-party ticket sales provider. 

Even though the payment itself is not done on their website, it is important for them to have a scalable and flexible architecture because customers must go through their portal to select tickets and bundles.

### Site architecture

Rock in Rio's main website used to be based on Wordpress and PHP. Due to a partnership with Microsoft's Developer Experience (DX) Brazil team, this solution was migrated to a new platform based on Azure infrastructure as a service (IaaS) virtual machines running Ruby. Data is stored in Azure SQL Database and Azure Blob storage.

To have an easy way to scale their virtual machine pool up and down, they adopted virtual machine scale sets in Azure.

The following diagram shows their site architecture.

*Figure 1. Rock in Rio site architecture*

![Figure 1 - Rock in Rio site architecture]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_1_Site_Architecture.jpg)

<br/>

The main components of this architecture are:

-   [Azure Application Gateway](https://azure.microsoft.com/en-us/services/application-gateway/), which routes incoming requests to the proper environment (legacy portal, staging portal, or production portal)

-   [Azure Load Balancer](https://azure.microsoft.com/en-us/services/load-balancer/)

-   [Virtual machine scale set in Azure](https://azure.microsoft.com/en-us/services/virtual-machine-scale-sets/)
 with a varying amount of servers running Linux Ubuntu and Ruby

-   [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/?v=16.50)

-   [Azure Blob storage](https://azure.microsoft.com/en-us/services/storage/blobs/)

-   Azure Cache

### Development and release lifecycle

Development is done by the third-party software companies, according to demands received by Rock in Rio. Artplan receives and triages these demands, which are then assigned either to an internal Artplan team or to Outra Coisa.

Most development is done by individual developers who test their code on their own machines, and then send it for code review by a peer. If code is approved, it is promoted for staging, where it's tested by the business area and then approved for production deployment.

Code is stored in a GitHub repository. Builds are manually deployed by using [Capistrano](http://capistranorb.com/) by developers on their machines, and also manually by an operations manager on staging and production. The following diagram shows a simplified view of this process.

*Figure 2. Current development and release lifecycle (simplified)*

![Figure 2 - Current development and release lifecycle (simplified)]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_2_Current_Process.jpg)

<br/>

## Problem statement

When first approached by Microsoft, the K2 team already had one very clear need: improve and automate their code promotion process as much as possible (from development to staging to production), while at the same time integrating it seamlessly with their virtual machine scale set. This way, as code updates come forward from staging, they would not only be applied to all virtual machines serving the website, but also to any new virtual machines that got added to the pool.

## Solution, steps, and delivery

### Value stream mapping

To better explore Rock in Rio's website build cycle, Microsoft proposed a value stream mapping (VSM) exercise. This was a somewhat odd scenario for this methodology, as it's commonly used to map internal processes in a single company, not across company boundaries. But Artplan, K2, and Outra Coisa felt that they could benefit from having this discussion and understanding the bigger picture of how things are working (or not) among them. They expected this exercise to help them address bottlenecks, waste, and other inefficiencies.

*Figure 3. Value stream mapping*

![Figure 3 - Value stream mapping]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_3_Value_Stream_Map.jpg)

<br/>

The VSM exercise provided many insights about current processes and tools. All mapped tasks were grouped in four phases: demand management, design and development, testing and quality assurance, and deployment.

Several issues were detected, which are summarized as follows.

**Demand management**

- Lack of sufficient resources to efficiently estimate, detail, validate, and assign demands

- Extra internal processes that extend the time taken for each demand to be routed

**Design and development**

- Insufficient capacity to tackle development backlog when demand peaks and/or is displaced by urgent requests

**Testing and quality assurance**

- No automated tests

- Developers sometimes unavailable to review code, causing delays in the cycle

- Poor or unobserved specifications, causing art assets to be wrongly constructed

- Poor or unobserved specifications, causing art assets to be delivered incomplete

- Code that depends on an art asset waiting to be tested because asset is not ready

- Single person responsible for promoting code to staging means code is not promoted if person is unavailable for whatever reason

- Manual deployment of new builds

**Deployment**

- Urgent requests sometimes skipping staging due to extremely tight deadlines, bringing risk of failure and user experience issues

- Single person responsible for promoting code to production means code is not promoted if person is unavailable for whatever reason (*same as testing and quality assurance*) 

- Manual deployment of new work items (*same as testing and quality assurance*) 

- Lack of coordination between code updates and scaling of virtual machines (*issue detected beforehand by K2*) 

*Figure 4. VSM exercise*

![Figure 4 - VSM exercise]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_4_VSM_Exercise.jpg)

<br/>

Most of these issues can be addressed by applying DevOps practices, but this scenario merited careful consideration. Besides the dynamic nature of the segment where Rock in Rio operates, the distributed and decentralized nature of the teams developing and operating its websites presents additional challenges, such as communication, application lifecycle visibility, and integration. Each company has its own set of preferred processes, tools, and practices, which sometimes conflicts with those of the others. In these circumstances it is inevitable that a huge distance exists between who asks for something to be done and the person that actually does it.

Therefore, when the team considered both the list of issues surfaced during the VSM and the context in which their companies operate, they realized that some DevOps practices would be more viable than others. For instance, continuous integration (CI) and continuous deployment (CD) would be quite complex to implement, given the way the companies currently interact. Automated testing would certainly be desirable and recommended, but is impractical for them to adopt now because it would require stalling development and focusing somewhere else completely.

The two disciplines that seemed more important in the short term were:

-   **Release management**: Adopting a centralized solution for orchestrating and controlling the development lifecycle was a clear need. This solution shouldn’t be imposed upon all companies, but rather be easy to integrate with other systems and tools.

-   **Infrastructure as Code (IaC)**: Manual deployments for staging and production were deemed cumbersome, inefficient, and very time-consuming. The fact that currently a single person is responsible for executing them compounds the problem even further. Therefore, a way to automate the execution of these scripts would go a long way in making the environments easier to manage.

All in all, the VSM exercise was considered to be very productive by the participants, despite the unorthodox scenario. In addition to the useful learnings, another benefit was gained: deeper team integration. Issues were discussed openly and respectfully, which allowed people to understand restrictions and constraints that affected other people and which they didn’t know about. Some participants provided feedback that they were better able to realize how other people were affected by their decisions and actions, which should contribute to a smoother operation in the future.

After the VSM exercise was done, the team set about designing a solution to address the most pressing problems.

### Solution conception

Targeting the objectives set at the end of the VSM, the joint Microsoft/K2 team started by analyzing the current code promotion and deployment process, with a special focus on the production environment. In simplified form:

1. After a developer has finalized a given work item, he commits it to GitHub. Capistrano scripts are generated to deploy that work item.

2. The developer tells the operations manager that a new work item is available.

3. The operations manager runs the Capistrano scripts manually, which updates the production environment accordingly. The scripts are executed once per running virtual machine.

The team started to consider different approaches to optimizing this process. More than one dimension had to be considered, and some priorities conflicted with each other. Following are some of the key points:

- The current process is largely manual, so the Capistrano scripts must be executed for every single machine—the ones running at any given moment and any new ones that happen to be added to the pool.

- On the one hand, K2 wanted to have a central tool to orchestrate the development lifecycle and provide more visibility and control of the entire process. On the other hand, because the process covers more than one company, it's impractical and unproductive to force people to work in a different way than they are used to.

- It would be desirable to reduce the number of tools involved to simplify the process as a whole. At the same time, it would be advantageous to leverage scripts and deployment logic that is working, tuned, and familiar to the team members.

Taking all these factors into consideration, the team established three directives:

1.  GitHub and Capistrano would continue to be used given their familiarity and developer preference.

2.  Visual Studio Team Services would be adopted as the main build orchestrator, activating different tools as needed.

3.  Chef recipes would be applied to automate the deployment of code to newly added virtual machines in the virtual machine scale set. 

The process is focused on the staging and production environments, which are under K2's control. It does not address the test environments directly, as they are under the control of other companies, but it can certainly be adopted by them with a few adjustments.

The following diagram shows the steps for each part of the process.

*Figure 5. New build and release process*

![Figure 5 - New build and release process]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_5_New_Build_Release_process.jpg)

<br/>

The sequence of tasks is:

1.  After code has been tested and reviewed, the developer commits it to GitHub.

2.  Visual Studio Team Services polling periodically queries the GitHub repository for changes; if changes are found, the latest commit is pulled into Team Services.

3.  A build is initiated by Team Services, comprised of 3 steps:

    1.  Running Capistrano to run the Ruby-specific tasks. At this moment, running virtual machines receive the new build.

    2.  Archiving the build results in a tar.gz file.

    3.  Publishing the tar.gz file to a file share.

4.  After the artifacts are published, a release is initiated by Team Services, composed of 2 steps:

    1.  Updating the recipe version in the Chef server.

    2.  Uploading the new recipe to the Chef server.

5.  New virtual machines that are started in the virtual machine scale set have the Chef extension installed and receive the latest Chef recipe from the Chef server.

### Solution implementation

After the process was defined, the team set about implementing it. The first step was provisioning a new account at [Visual Studio Team Services](https://www.visualstudio.com/team-services/), following the directions in the [Administrative guide to working in Team Services and TFS](https://www.visualstudio.com/en-us/docs/setup-admin/get-started).

The second step was preparing a Linux virtual machine as a build server. This involved installing the following packages:

- Visual Studio Team Services Agent

- Git 2.9+

- Chef Development Kit (ChefDK)

The third step was creating a private GitHub repository to test the solution without interfering with regular ongoing development. To do this, the team had to create a personal access token, which is used in lieu of a password to access the private repo.

*Figure 6. Creating a GitHub personal access token*

![Figure 6 - Creating a GitHub personal access token]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_6_Personal_Access_Token.png)

<br/>

After that was accomplished, the team proceeded to configure Team Services polling so that Team Services would pull new commits from GitHub after they are checked in.

*Figure 7. Configuring Team Services polling*

![Figure 7 - Configuring Team Services polling]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_7_VSTS_Polling.png)

<br/>

The following parameters were required:

- **Connection Name**: \<friendly name for connection\>

- **Server URL**: \<GitHub repository to be accessed\>

- **User name**: \<username\>

- **Personal/Token Key**: \<PAT\>

With Team Services polling enabled, the next step was to create a new build definition. The team chose the *Empty* template to create all steps from scratch.

*Figure 8. Creating an Empty build definition*

![Figure 8 - Creating an Empty build definition]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_8_Empty_Build_Definition.png)

<br/>

The following settings were applied to this build definition:

- **Source**: Remote Git repository

- **Repository type**: External Git

- **Connection**: RIR-OutraCoisa

- **Repository name**: rock-in-rio

- **Default branch**: master

*Figure 9. Newly created build definition*

![Figure 9 - Newly created build definition]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_9_Newly_created_Build_Definition.png)

<br/>

As mentioned before, the build definition is composed of 3 steps:

1. Activating Capistrano to perform the Ruby-specific build steps and deploy the new build.

2. Archiving the build results in a tar.gz package.

3. Publishing the build artifacts to a file share.

Ruby is not a compiled language, so no actual compilation is involved. Nevertheless, several actions must be taken by Capistrano during the first build step, such as:

- Minifying JavaScript

- Updating configuration files

- Defining a structure for folders and files

- Applying the new build to virtual machines

Archiving the files was achieved by defining the requested parameters in the build step:

- **Root folder (or file) to archive**: \<folder where build output is placed\>

- **Prefix root folder name to archive paths**: false

- **Archive type**: tar

- **Tar compression**: gz

- **Archive file to create**: \$(Build.ArtifactStagingDirectory)/\<package name\>\$(Build.BuildId).tar.gz

- **Replace existing archive**: true

The third build action is actually publishing the artifacts. There are two main options here in Team Services: publishing to a file share or to an Azure blob. Initially the team chose the file share option, but they found some issues when configuring folder permissions. While studying and analyzing the problem, they developed a custom script to perform the proper actions, which ended up addressing the issues found; however, this will likely be replaced by the Azure blob option in the near future because it’s simpler and more direct (file shares require configuring HTTP so they can be accessed by other tools, whereas blobs have HTTP addresses natively).

*Figure 10. Completed build definition*

![Figure 10 - Completed build definition]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_10_Completed_Build_Definition.png)

<br/>

After the build definition was taken care of, the team proceeded to configure the release definition, starting from the *Empty* template.

*Figure 11. Newly created release definition*

![Figure 11 - Newly created release definition]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_11_Newly_created_Release_Definition.png)

<br/>

As mentioned, there are two steps in the release definition:

1.  Updating the Chef recipe version.

2.  Uploading the new Chef recipe.

Uploading the recipe was accomplished by the following shell script.

*Code Snippet 1. Update\_version.sh*

```shell-script
#!/bin/bash

recipe="rockapp"
number="0.2.$1"

sed -i "s/^version.*$/version '$number'/g" cookbooks/$recipe/metadata.rb

echo "Updated $recipe to version $number"

```

<br/>

After the recipe version is updated, it can be visualized in the Chef portal.

*Figure 12. Chef portal showing the new recipe version*

![Figure 12 - Chef portal showing the new recipe version]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_12_Chef_New_Recipe.png)

<br/>

The new Chef recipe is stored in a GitHub repository with a single cookbook.

*Figure 13. GitHub repository for Chef recipes*

![Figure 13 - GitHub repository for Chef recipes]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_13_Git_Repository_Chef_Recipes.png)

<br/>

The Chef settings are stored in the .chef folder in the GitHub repository. To upload the recipe to the Chef server, the knife command is used.

*Code Snippet 2. Uploading the recipe to the Chef server*

```shell-script
Knife cookbook upload <recipe>

```

<br/>

The recipe itself executes a tar.gz operation, essentially the same one performed by Team Services in the build definition.

*Code Snippet 3. Chef recipe*

```ruby
tar_package 'https://GitHub.com/<path>/test/arda.test-release.tar.gz' do
  prefix '/tmp'
  creates '/tmp/bin'
end

```

<br/>

*Figure 14. Completed release definition*

![Figure 14 - Completed release definition]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_14_Completed_Release_Definition.png)

<br/>

Besides the release definition, one last step had to be performed: ensuring new virtual machines brought into the virtual machine scale sets would have the Chef extension installed, so that they are able to receive the latest version of the website through the proper recipe.

The team created an Azure Resource Manager template, which defines all the desired settings for the virtual machine. In this scenario the most critical parts were:

1.  Ensuring the virtual machine is defined as being part of a virtual machine scale set.

2.  Allowing the definition of thresholds that trigger allocation and deallocation of virtual machines.

3.  Enabling the Chef extension.

*Figure 15. Fabricio Catae and Fabricio Sanchez working on the Team Services build and release definitions*

![Figure 15 - Fabricio Catae and Fabricio Sanchez working on the Team Services build and release definitions]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_15_Fabricio_Catae_Sanchez.jpg)

<br/>

*Code Snippet 4. Azure Resource Manager template (partial)*

```json
{
   ...
"vmssName": {
      "type": "string",
      "metadata": {
        "description": "String used as a base for naming resources (9 characters or less). A hash is prepended to this string for some resources, and resource-specific information is appended."
      },
      "maxLength": 9
    },
...
"metricName": {
      "type": "string",
      "defaultValue": "\\Processor\\PercentProcessorTime",
      "allowedValues": [
        "\\Processor\\PercentProcessorTime",
        "\\Memory\\PercentAvailableMemory",
        "\\Processor\\PercentIOWaitTime"
      ],
      "metadata": {
        "description": "Monitoring metric to be used"
      }
    },
    "metricScaleUpPercent": {
      "type": "int",
      "defaultValue": 80,
      "maxValue": 100,
      "minValue": 1,
      "metadata": {
        "description": "Percentage of metric to raise a scale up operation"
      }
    },
    "metricScaleDownPercent": {
      "type": "int",
      "defaultValue": 20,
      "maxValue": 99,
      "minValue": 1,
      "metadata": {
        "description": "Percentage of metric to raise a scale down operation"
      }
    }
  },
...
"type": "Microsoft.Compute/virtualMachines/extensions",
   "name": "myVirtualMachine/LinuxChefClient",
   "apiVersion": "2015-05-01-preview",
   "location": "westus",
   "properties": {
     "publisher": "Chef.Bootstrap.WindowsAzure",
     "type": "LinuxChefClient",
     "typeHandlerVersion": "1210.12",
     "settings": {
       "bootstrap_options": {
         "chef_node_name": "node1",
         "chef_server_url": "https://api.chef.io/organizations/my-chef-organization",
         "validation_client_name": "my-chef-organization-validator"
       },
       "runlist": "recipe[awesome_customers_rhel],recipe[yum],role[base]",
       "validation_key_format": "plaintext"
     },
     "protectedSettings": {
       "validation_key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEpQIB..\n67VT3Dg=\n-----END RSA PRIVATE KEY-----"
 }

```

<br/>

When the team launched the virtual machine that would be used to create the Chef cookbook and recipes, they discovered that for some reason the generalization process had somehow corrupted the WAAgent startup process. After some investigation, they discovered that this agent expects a file called `OVF-ENV.XML`, which wasn't present on the virtual machine. They created this file and the agent started working again.

*Code Snippet 5. OVF-ENV.XML*

```xml
 <?xml version='1.0' encoding='utf-8'?>
 <Environment xmlns='http://schemas.dmtf.org/ovf/environment/1' xmlns:oe='http://schemas.dmtf.org/ovf/environment/1' xmlns:wa='http://schemas.microsoft.com/windowsazure' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'>
   <wa:ProvisioningSection>
     <wa:Version>1.0</wa:Version>
     <LinuxProvisioningConfigurationSet xmlns='http://schemas.microsoft.com/windowsazure' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>
       <ConfigurationSetType>LinuxProvisioningConfiguration</ConfigurationSetType>
       <HostName>test-ext</HostName>
       <UserName>azureuser</UserName>
       <UserPassword>User@123</UserPassword>
       <DisableSshPasswordAuthentication>false</DisableSshPasswordAuthentication>
       <SSH>
         <PublicKeys>
           <PublicKey>
             <Fingerprint>test</Fingerprint>
             <Path>/home/azureuser/.ssh/authorized_keys</Path>
           </PublicKey>
         </PublicKeys>
       </SSH>
     </LinuxProvisioningConfigurationSet>
   </wa:ProvisioningSection>
   <wa:PlatformSettingsSection>
     <wa:Version>1.0</wa:Version>
     <PlatformSettings xmlns='http://schemas.microsoft.com/windowsazure' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>
       <KmsServerHostname>kms.core.windows.net</KmsServerHostname>
       <ProvisionGuestAgent>true</ProvisionGuestAgent>
       <GuestAgentPackageName>Win7_Win8_IaaS_rd_art_stable_140703-0050_GuestAgentPackage.zip</GuestAgentPackageName>
     </PlatformSettings>
   </wa:PlatformSettingsSection>
 </Environment>

```

<br/>

## Conclusion

This was a gratifying project for all involved and the feedback was quite positive.

The VSM exercise was very productive and helped strengthen the integration and collaboration among the companies, while also giving greater visibility into issues that directly affect the productivity of the development and operations teams.

The hackfest was an opportunity for all participants to learn about technologies they were not familiar with, and it helped K2 adopt these two intended DevOps practices:

- Release management, because they now have a central orchestrator that works in a non-impositive manner, allowing easy integration with external tools.

- Infrastructure as Code, because the automated deployment removes both the dependency on manual processes and the risk associated with having a single person to execute them. The new process is executed in less time, while also providing more resiliency and elasticity. It also helps save undue cloud costs because previously, virtual machines could be left running without being required, and now they will be removed from the pool if demand is low.

K2 intends to use the Team Services-based release management process as a foundation for all their future projects because it’s very common for them to have to integrate with different software companies that use different languages and tools. The process allows K2 to be flexible with the technology but still maintain control over the development lifecycle.

*Figure 16. VSM participants, from left to right: Gabriel Moura (Artplan), Rafael Siqueira (Outra Coisa), Rafael Bernardes (K2), Pedro Cernausan (Artplan), and Rodrigo Ramos (K2)*

![Figure 16 - VSM participants, from left to right: Gabriel Moura (Artplan), Rafael Siqueira (Outra Coisa), Rafael Bernardes (K2), Pedro Cernausan (Artplan) and Rodrigo Ramos (K2)]({{ site.baseurl }}/images/2017-03-22-rock-in-rio/Figure_16_VSM_Team.jpg)

<br/>

### Quotes

*"This was amazing! I didn't know Microsoft could be so close to our projects. All their professionals were thoughtful and were really committed to helping us take our next step."* — Rafael Bernardes, K2

### Lessons learned

The team obtained some valuable learnings through the hackfest:

- When the team began to analyze the scenario, their first impression was that it might be hard to orchestrate the different parts of the build cycle in an orderly manner because so many tools were involved. But Visual Studio Team Services proved to be a fitting solution, due to its structured and well-defined build and release pipeline.

- Even though the team had a conceptual understanding of what Chef did and how it worked, they had never implemented it. They discovered that it required several additional configurations and workarounds to work exactly as they wanted, especially when targeting more than one environment (in this case, staging and production). They also faced some issues with cookbook versioning, which is not simple and took some time to figure out.

- The hackfest team also had no familiarity with Capistrano, which is the preferred build tool used by the website developers. They had to study how it works and the kinds of output it produces, as well as understanding the required dependencies (Ruby gems) on the computer being used to run the tool.

- The Chef extension requires that virtual machines have the WAAgent installed. It is possible to use the extension without the agent, but that results in the communication between the virtual machine and Chef becoming complex and inefficient.
