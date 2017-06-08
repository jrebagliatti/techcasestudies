---
layout: post
title: "Using Visual Studio Team Services and Jenkins to improve the delivery pipeline of a Java application for a leading automotive manufacturing company"
author: "Julien Corioland"
author-link: "https://twitter.com/jcorioland"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-05-09
categories: [DevOps]
color: "blue"
image: "images/2017-03-15-automotive-leader-devops/vsm_part1.jpg"
excerpt: Microsoft partnered with a leader in the automotive industry to work on improving the way they are releasing their Master Data Management application by using Visual Studio Team Services and Jenkins through a DevOps practice implementation.
language: [English]
verticals: [Discrete Manufacturing]
#geolocation: []
#permalink: /<page-title>.html
---

In this article you will discover how Microsoft partnered with a leader in the automotive industry (who wishes to remain anonymous) to work on improving the way they are releasing their Master Data Management (MDM) application by using Microsoft Visual Studio Team Services and Jenkins through a DevOps practice implementation. 

This solution is a central piece in the information system of the customer because it contains all the data that is required for other BU/services. It is critical for them to have zero downtime on this software.

We first focused on understanding how the customer is currently working and how the different teams are interacting together. We then started to implement some DevOps practices with the teams by using tools such as Jenkins, Visual Studio Team Services, and Microsoft Azure.

The MDM application is based on the [Orchestra Networks](http://www.orchestranetworks.com/) solution. The customer is developing custom modules in Java for their specific needs. The goal of the hackfest was to help them improve the way they release new features into this solution with a high level of industrialization and by implementing processes such as continuous integration (CI), continuous deployment (CD), and release management.

The following sections explain the work we did with the customer during the five-day workshop and hackfest. 

### Key technologies used

- [Microsoft Visual Studio Team Services](https://www.visualstudio.com/team-services/)
- [Microsoft Azure](https://azure.microsoft.com/en-us/?v=17.14)
- [Jenkins](https://jenkins.io/)
- [Apache Maven](http://maven.apache.org/)
- [JFrog Artifactory](https://www.jfrog.com/artifactory/)

### Core team
Three technical evangelists from Microsoft France worked with the customer during this hackfest: 

- [Julien Corioland](https://twitter.com/jcorioland) – Technical Evangelist, Microsoft France
- [Pascal Sauliere](https://twitter.com/psauliere) – Technical Evangelist, Microsoft France
- [Sébastien Pertus](https://twitter.com/sebastienpertus) – Technical Evangelist, Microsoft France

On the customer's side, the following people with different responsibilities and profiles joined forces for this hackfest:

- Three people from the development team that worked on the MDM solution
- The manager/product owner of the solution
- One architect from another team that already had used Visual Studio Team Services and Azure on other projects
- Those responsible for the infrastructure and deployment of this solution	

## Problem statement

The customer already had a great release pipeline and process before the workshop that was organized with Microsoft, but they were doing a lot of things manually. The main goal of this partnership was to help them automate the way they were creating and releasing new application features into their Master Data Management (MDM) solution. 

One of the objectives of this partnership was to remove as many manual steps as possible, especially those known to contain errors. For example, the packages were manually created by the developers each time the application needed to be tested. Another objective was to work on a continuous deployment pipeline for the customer's development environment so they will not have to do anything to have the latest version of the application running in this environment.

> NOTE: 
> Because of their business processes and very strict release planning, the customer did not want to extend this continuous deployment pipeline to the preproduction and production environment, but it could have been done in the exact same way.


## Solution, steps, and delivery

The five-day project consisted of two sections:

- [A two-day workshop to build a value stream mapping (VSM)](#value-stream-mapping-workshop) of the customer's release process. The goal was to understand how they are releasing a new feature in their Master Data Management (MDM) application, from the users' request to production, and how this pipeline could be improved.
- [A three-day hackfest to implement continuous integration, continuous deployment, and release management](#devops-hackfest) on their project.


### Value stream mapping workshop

The first exercise that we did with the customer was to build a value stream mapping, which allowed us to understand how they are currently working on the MDM project and what process is in place to release new versions of the application.

We started by drafting an overview of the application's architecture.

![Architecture overview]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/mdm_architecture_overview.jpg)

<br/>

As explained earlier, the MDM application is based on the Orchestra Networks solution. The customer develops custom features in Java by using the Java Development Kit (JDK) 1.7. The application is connected to an Oracle Database and is running on-premises on Red Hat Enterprise 5.7. 

The value stream mapping exercise describes a process step-by-step, starting with the end. We started from the users that are using the application in production, and listed all the steps that occur before that.

![Value stream mapping - First draft]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/vsm_start.jpg)

<br/>

This was a really important part of the workshop because it allowed us to go deeper in the process to be able to understand and improve it. After 1.5 days, we had a full VSM with a clear description of the release pipeline.

![Value stream mapping - Part 1]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/vsm_part1.jpg)

<br/>

![Value stream mapping - Part 2]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/vsm_part2.jpg)

<br/>


We then agreed on some recommendations (in green on the VSM) that could be implemented in the next three days:

- Move the source code from the on-premises CVS (concurrent versions system) to Visual Studio Team Services to have a modern source control management system that integrates with the Eclipse IDE used by the development team (by using the [Visual Studio Team Explorer Everywhere plug-in](http://java.visualstudio.com/Downloads/eclipseplugin/Index)).
- Create a development environment in Azure.
- Implement continuous integration and continuous deployment in the development environment by using a Jenkins instance in Azure to build the package and Team Services to deploy it.
- Prototype a basic release management workflow for the pre-production and production environments (but stay on-premises for the production).

As you can see on the VSM, today it takes about one hour to have the application deployed into the development environment. That means that each time developers want to integrate their new code with others and test the feature in development, they need one hour to get the job done, using a lot of manual steps. Before starting the hackfest, our expectation was that the hour could be saved after automating the build and deployment process by using Team Services and Jenkins.

> NOTE: 
> In this case, Jenkins was chosen for the Maven build because the customer wanted to prototype the usage of Jenkins when deployed in Azure. However, we also could have used the [Java app with Maven](https://www.visualstudio.com/en-us/docs/build/get-started/java-maven).

### DevOps hackfest

During the three-day hackfest, we implemented the following pipeline in Azure.

![Pipeline in Azure]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/devops-pipeline.jpg)

<br/>

As you can see, the workflow is as follows:

1. The development team connects to Visual Studio Team Services from Eclipse and checks in/checks out source code and manages work items by using Eclipse with the [Visual Studio Team Explorer Everywhere plug-in](http://java.visualstudio.com/Downloads/eclipseplugin/Index).
2. After a check-in is completed, a build is triggered in Jenkins. To do that, we used the [Team Foundation Server Plug-in](https://wiki.jenkins-ci.org/display/JENKINS/Team+Foundation+Server+Plugin) for Jenkins that works with both Git and Team Foundation Version Control repositories.
3. Jenkins executes the Maven build.
4. Jenkins gets the dependencies from a JFrog Artifactory package manager that has been deployed in Azure from [this template](https://azure.microsoft.com/en-us/marketplace/partners/bitnami/artifactory/).
5. Jenkins archives the artifacts so that they can be available within Team Services, and then triggers a new release into Team Services.
6. The Team Services release is responsible for deploying the package (.war) into an Apache Tomcat server by using a simple copy over SSH task.

We split our work with the team into several parts:

- Moving the source code to Team Services and migrating from Ant to Maven
- Creating and configuring the environment in Azure
- Defining a new build in Jenkins
- Creating the release definition

#### Moving the source code to Team Services and migrating from Ant to Maven

As explained earlier, the development team was using CVS for source control. Some of the customer teams had already moved their source code to Team Foundation Server or Visual Studio Team Services by using the Team Foundation Version Control protocol, which is similar to CVS in principle. We used this protocol to create a project in Visual Studio Team Services.

Next, the developers downloaded and installed the Visual Studio Team Explorer Everywhere plug-in for Eclipse. They then configured their new workspace to be able to push a snapshot of the source into Team Services so that they were ready to work with this new source control system.

They also wanted to move from Ant to Maven, which not only standardizes and handles build sequences more efficiently, but also helps improve dependencies management without having to check in binaries into the source code repositories; to do this, we chose the package manager JFrog Artifactory.

We started by configuring some repositories in Artifactory and uploading the Orchestra dependencies that are required to build the application package. 

![JFrog Artifactory repositories]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/jfrog-artifactory.png)

<br/>

We did the same thing for the custom libraries, in both the release and snapshot versions, to be able to have release packages and development packages. One thing that is really important to understand when you work with a package manager is that packages are immutable, so it is mandatory to have stable (release) and development (snapshot) packages. For all the public Maven dependencies, Artifactory is automatically connected to the official Maven repositories.

After the package manager was configured, we started to move their Ant definition into a Maven one, which is done by defining a pom.xml file that contains all the information to execute a build workflow, from the dependencies management to the steps to execute (building the package, running unit tests, and so on).

`<script src="https://gist.github.com/jcorioland/600d9408d9647011edb96308c1a40a0f.js"></script>`

We defined the property of the package that we wanted to build with Maven as `contoso-web`. We indicated that we wanted to generate a WAR (**W**eb application **AR**chive) package, and we specified the version for this package. We then indicated the JDK that Maven should use to build the package. The customer uses the JDK 1.7 (which needs to be installed on the Jenkins build server).

The package repository configuration is also done in the pom.xml file; it allows us to define where Maven should get the dependencies. 
The build node allows us to define the build workflow that will be executed by Maven, which here is quite simple because we are generating only the WAR package.

The last step was to test the packaging locally by using the Maven command line. After it's validated, the source code with its new pom.xml file in the root directory is committed into Team Services, so now we can have it build automatically in a continuous integration process.

#### Creating and configuring the environment in Azure

This section covers deploying and configuring the different tools we need to implement the DevOps pipeline that was described earlier. The [Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/) provided all we needed, from the Jenkins build server to the [JFrog Artifactory](https://azure.microsoft.com/en-us/marketplace/partners/bitnami/artifactory/) and [Red Hat Enterprise Linux](https://azure.microsoft.com/en-us/marketplace/partners/redhat/redhatenterpriselinux73/), where Apache Tomcat has been installed for the development environment.

After Jenkins was deployed, we went into the Jenkins plug-ins manager to download and install the Team Foundation Server plug-in that will allow us to connect to the Team Services source control and also trigger a new release after a successful build in Jenkins.

![Team Foundation Server plug-in for Jenkins]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/jenkins-configuration-vsts.png)

<br/>

The connection to Team Services is done by using a personal access token. The procedure to create a new one is detailed later in this document.

We also installed the JDK 1.7 on the Jenkins server and configured Maven to be able to connect to the JFrog Artifactory package manager. This next step can be done by updating the Maven settings.xml configuration file on the Jenkins server and adding the following part.

`<script src="https://gist.github.com/jcorioland/eb6024bfe032d074410fdb878a0a11a4.js"></script>`

As you can see, it is as simple as listing all the repositories that should be accessed by Maven and providing the credentials that need to be used. To get a protected version of the password, sign in to JFrog Artifactory, select your username on the top right, and then enter your password and select **Unlock**.

![Get protected password]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/jfrog-get-encrypted-password.png)

<br/>

The password will appear in the **Encrypted Password** box; you just have to copy it.

#### Defining a new build in Jenkins

The next thing we did with the team was to define a new Maven-based build in Jenkins.

![New Maven build in Jenkins]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/new-maven-build.png)

<br/>

To be able to configure Jenkins to get the source code from a Team Services repository, you need to [create a personal access token](https://www.visualstudio.com/en-us/docs/setup-admin/team-services/use-personal-access-tokens-to-authenticate). You can do this directly on the Team Services portal by selecting your photo and then **Security**. Select **Add** to create a new access token with the scope that you want (at least being able to read the code) and the expiration you want. Save this token in a safe place because you will not be able to read it again after you leave the page.

You can then configure the source code part in the Jenkins Maven build definition by selecting Git if you are using a Git repository on Team Services or Team Foundation Version Control.

![New Maven build in Jenkins source configuration]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/jenkins-vsts-source-config.png)

<br/>

You need to specify the URL of the Team Services account and the project path in the source control, and then select to use manual credentials, where the username is the email address used to connect to Team Services, and the user password is the personal access token that you have just created.

In the build trigger configuration, make sure that you have selected the **Build when a change is pushed to TFS/Team Services** check box. It is also required to select **Poll SCM** without any schedule to make it work.

We then configure the build to execute Maven on the pom.xml file that is at the root of the source code.

![New Maven build in Jenkins POM file]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/build-maven-jenkins.png)

<br/>

The last step is to ask Jenkins to archive the artifacts and trigger a new release in Visual Studio Team Services.

![New Maven build in Jenkins trigger release]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/trigger-vsts-release.png)

<br/>

Here we are asking Jenkins to trigger the continuous deployment release. It's the name we gave to the release in Team Services (detailed later).

For the build to trigger automatically, we now need to tell Team Services that it needs to notify Jenkins when a check-in is complete. This can be done from the **Service Hooks** tab on the Team Services portal.

![New Maven build in Jenkins Service Hooks tab]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/service-hook-vsts.png)

<br/>

#### Creating the release definition

The release definition that we prototyped with the customer is quite simple right now because they wanted to evaluate the workflow capacity of Team Services and be able to have an approbation step between the two environments.

> NOTE: 
> Having a release definition instead of doing the deployment inside the build definition is really important for several reasons. First, it is possible to trigger a release multiple times without having to rebuild the artifact. Another reason is that it is easier to work with multiple environments and handle a deployment workflow between those environments, mixing some automatic and manual approbations. Finally, sometimes you need artifacts from several builds before triggering a release.

The first thing to do is to link the release to the Jenkins build, which can be done on the **Artifacts** tab.

![New Maven build in Jenkins Artifacts tab]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/link-artifacts-jenkins.png)

<br/>

By doing this, the WAR file that has been generated by Jenkins is available in the release step, so it is very easy to deploy it to 
Apache Tomcat by using an SCP task.

![Team Services release]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/connect-vsts-release-artefacts.png)

<br/>

> NOTE: 
> Team Services also provides a [task to deploy an application in Apache Tomcat](https://marketplace.visualstudio.com/items?itemName=ms-vscs-rm.apachetomcat), but in this case we chose to do an SCP task as the customer is doing in its current deployment process.

It is waiting for an approval between the two environments.

![VSTS Release]({{ site.baseurl }}/images/2017-03-15-automotive-leader-devops/waiting-approval.png)

<br/>

The people that need to approve the deployment will be notified by email. It is also possible to use [Team Services service hooks](https://www.visualstudio.com/en-us/docs/marketplace/integrate/service-hooks/get-started) to integrate with other services, such as [Slack](https://www.visualstudio.com/en-us/docs/marketplace/integrate/service-hooks/services/slack).

## Conclusion

After a two-day value stream mapping workshop and a three-day intensive hackfest, we achieved a lot while partnering with the customer. We successfully helped them to detail all their release processes and identify the points that could be improved. We then successfully prototyped a full CI/CD pipeline in Azure by using tools such as Jenkins, Maven, JFrog Artifactory, and Visual Studio Team Services.

Now, as soon as a developer checks in code changes to Visual Studio Team Services from Eclipse, a Maven build is executed by Jenkins to produce the WAR package, and a new release is triggered in the development environment. After the tests are done in this environment, the team can approve or reject this release.

Even if they wanted to keep some manual steps for the release in production, they will still be able to save almost all the time they needed to deploy a new version on the dev/test environment (one hour each time to package, deploy, and check everything is okay) by avoiding the manual steps that may lead to errors. 

One other point that is really important is that now, deploying the application into the development or test environment is not a big deal anymore and does not require that every developer stop working. All is done automatically when a commit is done. 

