---
layout: post
title: "How Azure and DevOps enabled a major US research university to deploy back-end and student VMs"
author: "Dan Stolts, Heather Shapiro, Ian Philpot, and Jessica Deen"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/2016-12-05-classroom/authors/authors.png"
date: 2017-04-07
categories: DevOps
color: "blue"
#image: "{{ site.baseurl }}/images/2016-12-05-classroom/imagename.png" #should be ~350px tall
excerpt: A major US research university partnered with Microsoft to learn how Azure infrastructure, the Web Apps feature of Azure App Service, and DevOps best practices could better address their need to quickly, easily, and consistently onboard classroom and student infrastructure.
language: English
verticals: [Education]
---

A major US research university partnered with Microsoft to learn how Azure infrastructure, the Web Apps feature of Azure App Service, and DevOps best practices could better address their need to quickly, easily, and consistently onboard classroom and student infrastructure. This included back-end servers, storage, and networking as well as student virtual machines (VM), organizational authentication, and private and public shares for students to use to submit homework or collaborate in teams. This class could have more than 400 students each term so automation was paramount on the needs list. The project made use of the following services and practices:

- Azure Active Directory integration
- Azure Blob storage
- Infrastructure as code
- Monitoring
- Automated deployment

The project took place over the course of two months with the premise of migrating all infrastructure to Azure, re-creating a web portal, and enabling best practices for automated deployment and infrastructure as code. The university also needed to monitor usage patterns and quotas to ensure that students were not manually standing up significant hardware that would ultimately be charged back to the university. The hackfest team comprised members from both Microsoft and the university and included the following:

- Major US university
  - Professor – project owner
  - Azure project lead and senior teacher assistant – development partner/system architect
  - Other teacher assistants (master's and doctoral students) – documentation and student support
- Microsoft
  - Dan Stolts ([@itproguru](https://twitter.com/itproguru)) – Senior Technical Evangelist 
  - Ian Philpot ([@tripdubroot](https://twitter.com/tripdubroot)) – Senior Technical Evangelist
  - Heather Shapiro ([@microheather](https://twitter.com/microheather)) – Technical Evangelist
  - Jessica Deen ([@jldeen](https://twitter.com/jldeen)) – Technical Evangelist

All source code is available in [dstolts/Azure_Classroom](http:/github.com/dstolts/Azure_Classroom) on GitHub.

<img alt="Azure_Classroom on GitHub" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom99-siteimage.png" width="758">

## Customer profile ##

This major US university is a world-class university that is known for their leading-edge stance on the use of technology. The university is regularly regarded as a top-five university worldwide. The university is an independent, co-educational, privately endowed university, organized into five schools: architecture and planning; engineering; humanities, arts, and social sciences; management; and science. It has approximately 1,000 faculty members, more than 11,000 undergraduate and graduate students, and more than 130,000 living alumni. The university would, for now, prefer to remain anonymous, so this article refers to this university as simply "The University."

The University provides its students with a platform to manage their infrastructure, submit homework, collaborate in teams, and collaborate with professors. The platform gives students a single command to log in to their automatically generated hardware infrastructure, and it provides students the capability to stand up the additional infrastructure needed to thoroughly evaluate the performance of the software they create on various classes of machines and even clusters of servers.

A large staff of six or more teacher assistants (TAs) helps students as needed, so they are also automatically granted access rights to the machines the students use. These TAs manage many aspects of the class, including grading all homework and ensuring that the students are fully prepared to start class on day one with no technical surprises. The TAs also manage the back-end infrastructure for submitting homework and exams.

The following are direct quotes from TA Tim K.:

- "Last year we had 60 students; this year we were shocked that we had 120 signed up. We needed to significantly scale this class. Given this large class size and the tremendous computational needs for this class, we had to look at the cloud for scale. Azure offered us the services we needed to alleviate this hurdle."
- "Microsoft was able to offer some technical manpower to help set up the class in Azure."
- "This assistance allowed us to get going on Azure very quickly. It also helped with morale; it was reassuring to us that Microsoft was willing to help us solve challenges that might arise."
- "After we set up everything, the student experience was completely seamless."
- "We were able to link credentials to the university's .edu credentials, so, from a student perspective, they were able to log in exactly the same way as they logged in to any other learning portal. The experience was completely seamless."
- "We made it extremely easy and automatic to create, launch, and initialize their VM for a perfect deployment. They [students] simply had to run a script; if the students tried to do it manually, there would have certainly been road bumps." 
- "I was very pleased, and the rest of the core team was very pleased with how relatively painless this move to Azure ended up being. Of course, from the perspective of those that were not intimately involved, from the student’s perspective, it seemed like magic; everything just works. That is somewhat of an illusion because it was a bunch of work from Dan's team and the core team went into making that magic."
- "When we started, we thought that we were just going to do a one-to-one substitution for what we already had, with just more scale. What we found was there were many new opportunities we were able to take advantage of.... One of these was the ability to provide students with a multi-core instance to test their final exam: [a] chess playing program. Students were given a budget to manage; they could then spin up additional cores to test their program; some teams even launched multiple core instances in parallel."
- "We were able to monitor the entire usage of the class through a reasonable easy-to-use portal. This allowed us to make sure no individual team was going nuts."
- "We had overall a great experience using Microsoft Azure. We are very grateful for all the resources Microsoft provided."

## Problem statement ##

Students need access to high-performance computing for performance benchmarking in the classroom setting.  Due to the nature of the classroom projects, and benchmarking applications, the students need access to cost-effect high-performance compute. This is easily accomodated by running VMs in Azure. To significantly cut the costs, students machines can be turned off when not in use. The University currently leverages AWS for this purpose. It is a manual process for each new class to break down the class prior environment and rebuild for the new class. The University needs to significantly streamline and automate this process. They also have an Azure grant from Microsoft that they would like to leverage for this purpose. The customer is interested in creating a repeatable process for other classes within The University and other classes in other institutions.

### Creating the value stream map ###

The value stream mapping (VSM) portion of the project helped The University see the big picture and understand where automation, proper processes, and DevOps practices can improve processes, expand capabilities, decrease setup time, simplify standing up a teaching environment, and realize the value of monitoring the students and the process.

This process identified that the classroom environment is very different from a traditional enterprise or small-company environment. For this project, we were working with graduate students as the workers, not professional developers. The programs were revised, but they were not deployed in a typical deployment fashion. We discussed some ideas of how we could integrate full continuous integration and continuous deployment (CI/CD), but due to the tight timeline we had for this project (before class starts) we had to limit the scope to automating delivery through scripts that can later be used to expand into CI/CD. To account for these changes, we focused most of our efforts on designing infrastructure as code that would be the "application" that they are deploying.

During VSM we determined shared storage was going to be a requirement. Students needed a way to send private work to the staff where other students could not see or otherwise gain access. There was also a need to have students share files with other students, enabling team collaboration. This storage structure would need to be one of the first things we set up to accommodate connections from all other elements of the infrastructure. By having a separate script to define storage, we could easily isolate that component and build additional drives that could easily be mounted by students if needed during class.

VSM is a great vehicle to understand an existing workflow and to decide on which areas to focus for improvement. The following diagram is an example classroom-development environment. The student VM is a "jump box" used for development. The student submits a job message to the job cluster. The job cluster runs various tests, and the student's grade gets calculated based on run time. The report/grade is put in a private share for that student. Notice that the times to perform these various processes are significant: weeks to build out the infrastructure and docs for each class.

The hard part is for students, who often needed to begin setting up their environments before class began, because for many the process would take many days. Some did not even get it done by day five, which was the day that the first homework assignment was due. This caused the students to be late in submitting their homework. Students who did not engage until the first day of class, or enrolled late, were in bad shape. Most if not all of these students needed one-on-one TA support to get their systems and environments working correctly.

We expected to eliminate most of these delays, which were caused by manual processes and confusion. We expected development to take three to four weeks and student onboarding to take a day. The resulting code took more than six weeks to develop (on the calendar), four weeks of engineer time, and less than a day to onboard the students. Going over budget on the time calendar was mostly due to scope changes, such as changing Azure Resource Manager templates to the Azure command-line interface (CLI).

During VSM, we determined that shared storage was going to be a requirement. Students needed a way to send private work to the staff where other students could not see or otherwise gain access. Students also needed to share files with other students, enabling team collaboration. This storage structure would need to be one of the first things we set up to accommodate connections from all other elements of the infrastructure. By having a separate script to define storage, we could easily isolate that component and build additional drives that could easily be mounted by students if needed during class.

The value stream map helped identify opportunities for automating current manual processes. It allowed the team to visualize scenarios that could improve the deliverables, streamline existing process, and even eliminate processes that could be fully automated. Examples include authenticating using .edu credentials, eliminating the need for students to manually sign up for a cloud account, and monitoring and tracking usage by each student. The map showed how full CI/CD, automated testing, and even automated destruction could greatly decrease manual processes while eliminating errors. Before VSM, these capabilities were not even in the thought process. Additionally, the value stream map provided additional areas of improvement that can be incorporated as changes made for future classes.

<img alt="Creating the value stream map" src="{{ site.baseurl }}/images/2016-12-05-classroom/Azure_Classroom_VSM.jpg" width="800">

Many manual processes were identified for future work by the customer. In a couple areas, heroics were identified. In these cases, we determined that others needed to be trained to take on some or all of those tasks, at least for backup. The heroics identified mostly revolved around one person who will be in the program for only a couple more years, so it is important that this training starts now. Documentation would also include ramping future TAs and likely even include videos to help streamline the onramp for TAs to understand what is going on behind the covers of the automation. Much automation—in particular where CI could play an important role—will be tackled later. The staff expectation is they will continue to grow and add additional capabilities in future classroom deployments.

We identified many DevOps practices that can be added to the project. For Phase I, we incorporated infrastructure as code, automated deployment, and monitoring. After we handed off the project to the customer, they immediately added single sign-on capabilities so students would not have to sign into Azure. This was simple because we already had all the scripts to do the work using Bash, so all that was needed was automatically lay down a certificate on each of the VMs so the VMs the students were using could auto-authenticate to other systems that were deployed and to Azure Active Directory (Azure AD). After this class, they plan on including automated testing and continuing to improve the processes we established in this project. Full CI/CD is the next big challenge.

## Project objectives ##

The original goal of the project, after completing the VSM, was to create a GitHub repository from which students and teachers could pull to deploy VMs to Azure, taking advantage of DevOps practices by simplifying and automating everything while splitting the tasks out to standalone small tasks that could easily be run in their own environments. The University found that all of this could be automated, so the TA could simply email the students a link to log in to the web app with their own organizational credentials. They could then automatically log in to their VM using certificate-based authentication. The students were also given a Bash script (.sh) file in their standard working classroom folder that they could run to log in to their Azure VM at any time. They are also very likely to add additional capabilities before the end of the class, including automated destruction.

The various scripts would include the following:

- Create Resource Manager templates to deploy VMs to Azure
- Create CLI scripts that will run on the VMs that are being deployed
- Copy CLI scripts to deployed VMs
- Modify existing Python scripts to point to Azure accounts (instead of AWS)
- Create scalable high-performance clusters of VMs that students will use for performance testing and submitting homework    
- Create CLI scripts to launch SSH sessions to high-performance clusters from student VMs
- Tie student authentication to organization authentication, including Azure AD

## Infrastructure as code ###

For this project, we provided many ways to accomplish the same task. This was a requirement because the primary TA is graduating soon and he wanted to set up his predecessor for success. It also gives the advantage of making the code available for students to use in their platform or language of choice. We also went in with the understanding that there were relationships between this class and other similar classes in other universities. The University wanted to add additional technology (PowerShell) to accommodate these other schools. The current TA that is running the program for this class preferred Python. He did not know Azure CLI, so he wanted us to write everything in Bash so he could very easily convert it to Python.

The fundamental deployments that were required included the following:

- Configure Azure AD
- Create network
- Create VMs and other related infrastructure in multiple environments
  - Python (with JSON templates)
  - Azure CLI (with JSON templates)
  - Bash and Azure CLI (without JSON templates)
  - PowerShell

As you go through the description of the technologies, please remember that it is not a common practice to do the same thing with multiple languages—but this was a special case. It was just as important to service the broader community as it was to service the immediate needs of the staff in this class. A huge upside of this approach is it can be leveraged not only by The University and their partner classes but also by almost any classroom environment. This could include any university, smaller school, training facility, or even business that performs internal or external training.

Infrastructure as code was the code we were deploying and the processes that leveraged the DevOps practices. We chose to organize in this fashion to streamline the development process by creating the things that were needed in the priority they were needed. The first components could be created first so testing could be done while still writing other parts of the program. Staff did most of the testing, so it was also a great way to optimize the various roles participating in the process. Compartmentalization of the code also played a key role in moving the project forward quickly. As an example, we built the underlying network and storage first and then the capture-image step (which could be tested alone manually). Then we built the VM scripts to deploy the student VMs, which would leverage the captured image. Each of these could be thoroughly tested while we were building out the homework-submission servers, which were not needed until the last day of week one. We did end up getting all of it ready at least a week before class started, but having the extra testing time by modules made the staff very comfortable with the entire process. Had we not done it this way, it was apparent the staff might get nervous and roll back to the process they used the last term. It was a painful process, but there were no questions of it working. By the time we reached the drop-dead date for them to start working the manual process, most of the infrastructure was set up, we had authentication working (no single sign-on yet), and the queue to process homework was working. These were the parts that were perceived to be the most challenging and was enough evidence that it was going to work as specified.

When you look at the code, you may notice that it doesn't have much error checking. For the limited time we had before class starts, the staff opted to leave out the error checking to maximize development cycles. They will go back after this class and add checks and additional logic as needed to minimize crashes and improve understanding of error conditions.

### Azure Active Directory ###

Certain SDKs require the user to have an Azure AD account created on their Azure subscription. The University is already on Office 365 for all staff and students. They already have Azure AD configured to allow everyone to log in with organization (.edu) credentials. For organizations that do not already have this configured and running, it is easy to set up using Azure AD. An Azure AD account is also important for the customer because it provides the students with a single sign-on organizational account. This allows them to access all applications within the Azure AD tenant with the same credentials.

For a step-by-step guide on how to set up an Azure AD account, use this tutorial: [Setting up Azure AD to use with Azure SDKs](http://microheather.com/setting-up-azure-ad-to-use-with-azure-sdks/).

### Azure Virtual Network ###

To establish connections between student machines and the private and public shares as well as to allow the students to collaborate or share their machine with other students or TAs, we created VMs on the same network. We created this in scripts as seen in the following image, which shows the Linux Bash with Azure CLI version of the script. We wanted to have the networking available for each language. This would allow staff to be able to use the scripts to setup team and other environments that might be on different networks. Providing this made the scripts easy to follow and reproduce.  

<img alt="Share same network" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom10-networking.png" width="640">

Creating the network is done prior to the creation of any VMs. Of course, it's possible to reconfigure any existing virtual network, but doing so requires PowerShell knowledge or access to the old portal. This is, of course, not an issue if using JSON because everything automatically happens in the right sequence. Because we wanted to provide the use case of standing up a complete environment with each VM deployment script, we opted to just help you understand the consequences of doing it the long way (without JSON). Prior to creating any VMs, we create the network, subnet, and network security group (NSG). Finally, as we deploy VMs we create the network interface cards used for the machine. Within the portal, we can see graphically what was created. The sequence is important to eliminate the challenge of creating scripts to associate the network with the VM.

More details about virtual networks are available in [Create a virtual network using the Azure CLI 2.0](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-create-vnet-arm-cli). This article also features a drop-down list to see how to do this on various platforms.

Note that configuring a virtual network requires a few minutes. **Don't create any VMs before the virtual network is done.**

After the virtual network is complete, the next step is to create the NSG. The NSG offers routing with port redirection, port enables, port disables, and so on. Think of this as your firewall configuration for the network. The NSG can be connected to a subnet of the network or to any of the network interface cards attached to the network. This can be done using any of the languages we covered in this project and more. The following image shows what it looks like in PowerShell.

<img alt="Create network security group" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom11-nsg.png" width="756">

Notice the first step is to create the new NSG. Then you can add "rules" to the NSG. For this project, we opened (or exposed) port 22 and port 3389. Even the student Linux machines might opt to install desktop and xRDP, so we wanted it to just work. The same is true for SSH on the Windows machines. After creating the ports, we then must link the NSG to the subnet or NIC to enable them.

After the VM is created, it’s possible to connect to the VM with either Remote Desktop Client or SSH depending on the OS or student preference. By default, for this project, we are using only SSH on Linux and RDP on Windows, but you could easily change the default custom image to enable RDP or SSH on both platforms.

When the port is open and the machine is running, it’s possible to connect the VM using the machine IP address or DNS name. Most of the machines we created ran Linux, so our tool of choice for connecting was [PuTTY](http://www.putty.org/).

### Azure command-line interface using JSON templates ###

The Azure CLI provides a cross-platform command-line interface for developers and IT administrators to develop, deploy, and manage Azure applications. The Azure Classroom project provides a series of scripts based on the Azure CLI, written in Bash, that can help you create VM images and deploy them for use by students. These scripts should be accessible to users on both Mac OSX and various Linux flavors, such as Ubuntu or Fedora. We chose Bash and Azure CLI because the student VMs are all Linux and the students and staff in this class are already Linux savvy. We built much of script and processes leveraging JSON templates. There were places where we had to do some dynamic changes that made the JSON very difficult to follow. During code review, the staff found the JSON very difficult to follow and were worried that it would take too much training to learn it for this class staff as well as future classes. They asked if there was another way to achieve the result without using JSON. Obviously, our answer was "yes," and we proceeded to rewrite the components that used JSON using raw Azure CLI commands. This was much easier for the staff to read, understand and modify. It was more of a development burden than we anticipated, but it did not jeopardize our overall timeline, so we made it happen. Because we already had much of it built, we opted to provide both solutions for the open-source community. In cases where no dynamic content was needed or expected to be needed, we kept JSON in the code due to the additional time it would take to change.

The scripts assume you've logged into the Azure CLI and selected the subscription you want to target. They provision a VM that is used as what we refer to as a gold image. This is the machine image that will be used for student machines. These images are then generalized and copied into a location that is accessible from other student subscriptions.

A script the students will run is provided. This script pulls the gold image from the shared location into a new storage account in the student's subscription. It then uses a Resource Manager template that references the gold image to deploy the student VM. The default deployment uses Bash and Azure CLI, but other links can be used for classes that are not Linux heavy.

All source code can be found in [dstolts/Azure_Classroom](http:/github.com/dstolts/Azure_Classroom) on GitHub.

<img alt="Azure CLI" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom20-azure-cli_screenshot.png" width="900">

### Bash and Azure CLI (without JSON templates) ###

The TA that was working with us on this found working with JSON templates somewhat complex. He asked us to provide a Bash version of the scripts that were a little more simplified and did not use JSON files. This was easy as we just needed to set parameters and call the functions to create the components. In the following image, you will see that we set a couple of command-line parameters for the resource group name and the image URL. If these parameters were not passed, we set a default. (The default would need to be supplied by using the output of the created base VM or captured image scripts.) We also exported these values to environment variables so they could be easily reused by other scripts. As articulated earlier, this was done due to the complexity of dynamic JSON and readability.

<img alt="Bash Azure CLI storage unique ID" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom25-bash-create-storageaccountname.png" width="900">

One important concept regards storage. The storage account name is used for the public DNS name of the storage account. For this reason, when creating the storage account, we needed to have a unique ID to minimize the likelihood of conflict with other public storage account names. The University already has a three-letter unique ID that is stored in an environment variable of the currently logged-in user. When we created the storage, we leveraged this key, but because it contains a maximum of three letters, it was not long enough to be unique in all of Azure. We created an algorithm to add an additional 12-character random string (using the characters "a–z" and "0–9") to the end of the "athena_user" and saved the output to a variable to use in creating the storage account. This allowed us to use the variable to setvup the storage and get an access key. We also saved the unique ID to an environment variable named AZURE_UNIQUE_ID for use in other scripts. 

<img alt="Bash Azure CLI storage unique ID" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom26-bash-createstorage-getaccesskey.png" width="900">

### Azure SDK for Python ###

The [Azure SDK for Python](http://azure-sdk-for-python.readthedocs.io/en/latest/) is a set of libraries that allow you to work on Azure for management, run-time, or data needs. The Azure Classroom project provides a series of scripts using the Azure SDK for Python that help teachers and students create VM images and deploy them for use by the students. These scripts require that the user has Python installed on their computer, which can be downloaded from [Python.org](https://www.python.org/downloads/). Several Python libraries are necessary for the scripts to run, but the scripts check for them and install them if they are not found.

Like the Azure CLI scripts, the Python scripts provision a VM that is used as a gold image. This is the machine image that will be used for student machines. These images are then generalized and copied into a location that is accessible from other student subscriptions.

Finally, a script the students run is provided. This script pulls the gold image from the shared location into a new storage account in the student's subscription. It then uses a Resource Manager template that references the gold image to deploy the student VM.

#### How to run the Python scripts ####

This SDK requires users to have an Azure AD Account set up. If you have not set one up yet, see the [Azure Active Directory](#azure-active-directory) section earlier in this article.

To run the scripts, you can use any IDE of your choice. For this example, we used Terminal. After downloading the scripts, you will need to change to the proper folder and run `python <script_name>`.

<img alt="Running Python script in Terminal" src="{{ site.baseurl }}/images/2016-12-05-classroom/python/commandPrompt.png" width="580">

The scripts ask for Azure credentials from the Azure AD account that was just created. After you do this once, it creates a file for the user with the credentials so that the user does not have to keep entering their information.

<img alt="Dialog box for login" src="{{ site.baseurl }}/images/2016-12-05-classroom/python/login.PNG" width="247">

### PowerShell ###

For the PowerShell scripts, there are four main scripts to build the lab and execute the deployment.

- login.ps1

  Logs the user into both Azure CLI and Azure PowerShell.

  <img alt="Using login.ps1" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom30-ps-login_example.png" width="591">

- createbasevm.ps1

  Uses Azure CLI to quickly create a Linux VM using a certificate instead of password authentication. The public/private key pair is provided for convenience in the repo. This is not the same key The University used; it is just a sample to make trying it easy. We recommend generating your own keys using a tool like [Azure Key Vault] (https://azure.microsoft.com/en-us/services/key-vault/). PuTTY is an open-source program that can be used to generate keys. Upon successful completion, the SSH connection string and the deprovisioning command is also pushed to the console for the end user to use.

  <img alt="Using createbasevm.ps1 (example 1)" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom31-ps-createbasevm_example1.png" width="900">

  <img alt="Using createbasevm.ps1 (example 2)" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom32-ps-createbasevm_example2.png" width="900">

- captureimage.ps1

  Uses positional parameters to capture the resource group name and VM name in plain text when executing the PS script. The script then captures the VM created using the previous createbasevm.ps1 script and copies the image VHD to a public storage account. After the copy completes, an image URI is printed to the output of the screen for the end user to use with the next script.

  <img alt="Using captureimage.ps1 (example 1)" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom34-ps-captureimage_example1.png" width="900">

  <img alt="Using captureimage.ps1 (example 2)" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom33-ps-captureimage_example2.png" width="900">

- deployVM.ps1

  Uses positional parameters to capture a new resource group name and image URI from the preceding script in plain text when executing the PS script. The script then copies the VHD from the public storage account to the user's local storage account in their subscription. From there, the script uses the image to complete the deployment using the associated JSON template files, which can be found in the templates folder.

  <img alt="Using deployVM.ps1 (example 1)" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom37-ps-deployVM_example1.png" width="900">

  <img alt="Using deployVM.ps1 (example 2)" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom38-ps-deployVM_example2.png" width="900">

  The deployVM.ps1 script creates a custom storage account parameters file:

  <img alt="Using CustStorageAcct.parameters.json" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom36-ps-CustStorageAcct.parameters_example.png" width="730">

  The script also creates a custom gold VM parameters file:

  <img alt="Using CustomGoldVM.Parameters.json" src="{{ site.baseurl }}/images/2016-12-05-classroom/classroom35-ps-CustGoldVM.parameters_example.png" width="900">

## Automated deployment, testing, monitoring, automated destruction, and CI/CD ##

To deploy the many components of this application, we used automated deployment and infrastructure as code. Together, this allowed us to spin up many servers, networks, and storage accounts, as well as a customized image that was the base to deploy hundreds of student machines that could all talk to each other and authenticate using their standard .edu credentials. The various scripts were set up as different components that can easily isolate and minimize risk as future modifications are made. As an example, capturing the image is separate from building the student machines. Creating these small segments of code further moves the code to an agile and CI/CD compliant model. Currently, these scripts for deployment are manually triggered by the staff. When triggered, they automatically deploy all the hardware defined for that script. This also allows the staff to easily loop through a list of student email addresses to build out machines and credentials for the student VMs regardless of the size of the class. This class did not leverage this technology. However, they expect this will be one of the first things they add for next class because it will cut 30 minutes off the student onramp process.

We wanted to set up automated testing, but due to lack of time, we decided to simply start the process of identifying test criteria that we could then expand later and add to what will eventually be the CI/CD pipeline. The following is an example of some of those tasks.

Test scenario for capturing and deploying master student image scripts:

 1. Master VM to be captured exists and has been customized; file placed on local disk
 2. Capture is called on that VM (using capture script)
 3. Same account: create two VMs by calling deploy script twice
    a. Both accounts should have same disks including test file 
    b. Script is not placing the file; it is in the original image

We need to add basic monitoring capabilities of the VMs. We found this to be incredibly easy because the internal monitoring of Azure VMs gave TAs and students all the information they needed. All we had to do was enable it. In the future the customer will likely set up alerts as well.

<img alt="Monitor overview" src="{{ site.baseurl }}/images/2016-12-05-classroom/MonitorOverview.png" width="756">

<img alt="Monitor disk" src="{{ site.baseurl }}/images/2016-12-05-classroom/MonitorDisk.png" width="429">

Before this project, CI/CD was not even considered. Today, the staff can see how adding capabilities can get to a place where CI/CD is a reality.

The need for automated deallocation was identified in the VSM. In an education environment, we are completely wiping out all infrastructure, including student data, and recreating it for the next class. In some education environments the professor wants to save the student environments in case students return and dispute their grades. This is easy to do in the cloud because all services in the class can simply be stopped and deallocated. Any programs that a student created in class would be archived in their own GitHub account. The infrastructure had to be completely rebuilt for a new class, accommodating permissions for new users, IDs, roles, teams, and so on. There is no need for tweaking the hardware in a classroom; it is a wipe-and-replace operation every term. This greatly adds to the viability of having a complete DevOps experience to deprovision and delete all infrastructure.

To accommodate and simplify this process, we used resource groups to build infrastructure. The staff could easily stop, deallocate, and delete the resource group and all items in it. Adding a text file to identify the resource groups that were created with the script was considered as an easy next step. This would allow the automation to delete only the resource groups that were created by the scripts, allowing other resource groups that were manually created by the staff to remain intact. This was not implemented simply due to time constraints and a potential gap where students or staff create additional resource groups that should not not get deleted with the class. Staff can create resource groups that are classroom related, which could be done with code and CI/CD in the future. Then if they want to create a resource group that is not deleted, provisions would have to be made. This will be an opporturtunity for another day.

## Onboarding students ##

The staff scheduled a lab to onboard students on the Saturday before class for students to get their environments set up, with the Microsoft team and TAs in the room to assist as needed. We had a couple changes that we had to make on the fly, redeploying the code mods a few times, but we got the entire class of more than 100 students done in one day. Most students were finished in less than an hour. The lab was scheduled in four different rooms and at three different time slots of 4 hours each so that we could accommodate all the students. Approximately 90 percent were successful on their own with no TA interaction—just a URL on the board for the onboarding instructions. The other 10 percent were fixed through tweaks (check for scenarios and accommodate) to the onboarding script, redeploying it to production, and having those students try again (pseudo CI/CD). Other than these few tweaks, Microsoft involvement was not needed. Clearly, this could all be done by staff moving forward. All students that showed up for the setup lab had their entire lab set up, logged into VMs, and running test scripts on their VMs before they left (1–2 hours each). This far surpassed our goal of onboarding students with one day of student effort. It also almost completely eliminated the stress of helping students onboard. Most importantly, the process was in place to repeat for future classes with little or no effort.

## General lessons ##

Some key learnings to consider from this process:

- It takes time for each script to complete. Copying an image of the VM can take several minutes to finish.
- It is important to understand the process of deprovisioning, generalizing, and capturing the image; otherwise you will not be able to copy the image to a new resource group or account.
- To copy the "gold image," you need to ensure that the original image is public and not a premium_LRS. If it is private, you will not be able to copy the image through scripts.
- You can test the JSON templates through PowerShell by logging into your Azure account and running `Test-AzureRmResourceGroupDeployment -ResourceGroupName <string> -TemplateFile <string>`
- The TAs in a class are great partners for helping with student onboarding. Having six TAs means that if or when there are a bunch of questions by students, they can be spread among many people.
- The primary features of Azure are speed and performance. They are critical on all high-performance workloads. Usually, in business, this is exactly what customers want. However, it is not well suited for a platform that needs limited variability in job runs. For example, if you run a script for performance on time it could take 3 seconds. Running the same script again could take 2.93 seconds. Run it a third time, and it could be another number in between. The University expectation is if you run the same script multiple times, you should get the same run time within hundredths of a second. When running on Azure you do not. This variability is a problem for any class in which performance is evaluated, such as performance classes, OS classes, database classes, machine-learning classes, analytics classes, and many more. The reason for the variability is the ability to provide the maximum performance available on the hardware. To give the customer the fastest possible speed for each workload, Turbo is turned on and cannot be turned off. For most machines, including all high-performance machines, Turbo is enabled. When using Turbo, if the host happens to be quiet, the workload gets a big boost of CPU cycles; if the host is busy, the workload might get no boost. The University would rather sacrifice that turbo boost to have little or no variability.
- Scripts that do not use JSON can sometimes be easier for customers to read, especially if there are dynamic changes to the JSON.

## Conclusion ##

The University sees the project outcomes being applying DevOps capabilities (such as automated deployment, infrastructure as code, and monitoring) to deliver a fully automated solution to stand up a class of more than a hundred students, many teacher assistants, and multiple professors. Leveraging VSM, the team identified and eliminated many wasted and manual steps. They found limitations to the current process and opportunities for improvement. The team used this project to correct and add capabilities that could be leveraged immediately. They wanted to deploy to Azure to inherently gain capabilities. Many more opportunities were identified to continue improving. The requirement of being able to use multiple languages to support future options made the project a bit more challenging. However, the result and the open nature of the code (GitHub MIT License) can be used by not only The University but any university and any classroom environment. These scripts and processes can be used for one-day and multiple-day workshops and classes that last weeks, months, or even years. It can be used to set up any demo or teaching environment where simplicity of deployment and consistency of process are required.

All source code is available in [dstolts/Azure_Classroom](http:/github.com/dstolts/Azure_Classroom) on GitHub.

## Additional resources ##

- Azure Active Directory tutorial: [Setting up Azure AD to use with Azure SDKs](http://microheather.com/setting-up-azure-ad-to-use-with-azure-sdks/)
- [Create a virtual network using the Azure CLI 2.0](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-create-vnet-arm-cli) (use the drop-down list to see how to do this on various platforms)
- [PuTTY](http://www.putty.org/)
- [Azure SDK for Python](http://azure-sdk-for-python.readthedocs.io/en/latest/)
- [Download Python](https://www.python.org/downloads/)
- [Azure Key Vault] (https://azure.microsoft.com/en-us/services/key-vault/)
