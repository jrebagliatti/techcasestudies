---
layout: post
title: "Using Xamarin.Forms and Azure to help travelers stop jet lag"
author: "Doris Chen"
author-link: "https://twitter.com/doristchen"
#author-image: "{{ site.baseurl }}/images/authors/doris.jpg" 
date: 2017-05-17
categories: [Azure App Service]
color: "blue"
image: "images/stopjetlag/team1.jpg"
excerpt: Kinetic Software and Microsoft teamed up to build a Xamarin.Forms revision of the StopJetLag app and a back end using Azure App Service. This helped reduce the cost and management overhead of the app that creates customized StopJetLag plans for travelers.  
verticals: [Hospitality & Travel]
language: [English]
geolocation: [North America]
#permalink: /<page-title>.html
---

Kinetic Software and Microsoft teamed up to build a Xamarin.Forms revision of the StopJetLag app and a back end using Azure App Service coordinating with the Web Apps feature of App Service and Azure SQL Database to reduce the cost and management overhead of the applications required to create a customized jet lag plan for travelers.

**Core team:**

- Bill Ashton ([@StopJetLag](https://twitter.com/StopJetLag), [@billkinetic](https://twitter.com/billkinetic)) – CEO, Kinetic Software
- Doris Chen ([@doristchen](https://twitter.com/doristchen)) – Senior Technical Evangelist, Microsoft

The StopJetLag app gives travelers a customized jet lag plan on their mobile devices. It offers travelers the correct timing for scientific advice that makes beating jet lag as rapid and easy as possible. The solution leverages Azure App Service, both the Web Apps and API Apps features, to deliver jet lag advice to the mobile app, as well as a web admin portal with a database API layer to edit trip notes for the StopJetLag plan. The Azure SQL database is also manipulated from the processing of StopJetLag order information during the creation of the StopJetLag plan by the Windows Presentation Foundation implementation of the StopJetLag expert system.

*Bill Ashton and Doris Chen displaying the StopJetLag app*

![StopJetLag & Microsoft]({{ site.baseurl }}/images/stopjetlag/team1.jpg)


## Customer profile ##

California-based [Kinetic Software](http://kinetic-software.com/) developed [StopJetLag](http://www.stopjetlag.com/), an app that provides personalized jet lag advice for travelers. StopJetLag integrates personal profiles, flight schedules, and applied research in chronobiology, providing travelers with a comprehensive and accurate means of beating jet lag, even for those with difficult flight times or complex, multistop itineraries. 

The app has been featured on Katie Couric's talk show.

*"How To Avoid Travel Mistakes" with Sarah Spagnolo (Travel+Leisure) and Katie Couric*

![Katie And Sarah With SJL Logo]({{ site.baseurl }}/images/stopjetlag/KatieAndSarahWithSJLLogo.jpg)


*"There's a great service called StopJetLag.com"*

![Katie And Sarah With Major Influences]({{ site.baseurl }}/images/stopjetlag/KatieAndSarahWithMajorInfluences.jpg)


(Courtesy of Katie's Travel Toolkit.)

The video segment can be viewed here: [http://www.stopjetlag.com/saying/katie-couric-stop-jet-lag.html](http://www.stopjetlag.com/saying/katie-couric-stop-jet-lag.html)

## Problem statement ##

### StopJetLag mobile Xamarin native UI 

Before the Xamarin.Forms revision of the StopJetLag app, each mobile platform had to be addressed with a platform-specific user interface (UI). The core logic consisted of two major shared-file library projects housed in one solution per platform.
  
The earlier implementations of StopJetLag apps had an average of about 80 percent code share per app based on the core business logic, which had to be compiled for each platform.

It is deceptive to say that each app shares 80 percent of the core code base because the 20 percent for each platform UI had to be developed for each of the four supported platforms. This makes the UI development time easily equivalent to the amount of development time required to create the core domain manipulation logic. Once the core logic is stabilized, updating the UI for new releases on each platform becomes a development bottleneck.
 
### StopJetLag infrastructure

The on-premises and web-hosted infrastructure for receiving orders, creating and reviewing StopJetLag plans, as well as delivering jet lag advice was not cost-effective and generated large management overhead of the applications required. The infrastructure of StopJetLag needed to be refined to reduce the cost and allow better scaling of the entire process. An admin interface and database was also needed to build and maintain a repository of explanatory trip notes.

### Adding StopJetLag trip notes 

When we decided to add the StopJetLag trip notes to the StopJetLag Mobile app, several issues became apparent with the old architecture:

- Uploading the formatted jet lag advice file was time consuming.
- There was no location for storing and subsequently editing the trip notes.
- The StopJetLag Expert System had to be run on-premises.

## Solution, steps, and delivery ##

### Implementing StopJetLag Mobile with Xamarin.Forms

StopJetLag needed to update the UI of the StopJetLag app for both iOS and Android plus create a Windows 10 Universal Windows version of the app to replace the Windows 8.1 and Windows Phone versions. Using Xamarin.Forms allows for one UI code base for all three platforms instead of multiple separate native UI apps. Also, converting the StopJetLag separate shared-files core logic solutions into one PCL core non-UI logic solution makes maintenance significantly easier and less error prone. Plus, it is possible to use dependency injection, which allows platform-specific view models as needed by the local notifications.

### StopJetLag infrastructure

The team migrated the StopJetLag on-premises as well as an off-premises web-hosted server infrastructure to Azure App Service to leverage the platform as a service (PaaS) capabilities of the Azure cloud platform and bring down the cost and management overhead of the application. The application also can easily leverage autoscaling for peak performance as well as integrate with continuous deployment for both Team Foundation Server and GitHub.

The team implemented a web app to enable rapid development and deployment of the StopJetLag trip notes admin website using .NET Core. The REST endpoints required for the jet lag trip advice and trip notes delivery were implemented in a .NET Core App Service API.

*StopJetLag Mobile app using Xamarin.Forms - home page*

![StopJetLag 3Platforms HomePage]({{ site.baseurl }}/images/stopjetlag/StopJetLag-3Platforms-HomePage.jpg)

<br/>

*StopJetLag Mobile app using Xamarin.Forms - major jet lag influences*

![StopJetLag 3Platforms Influences]({{ site.baseurl }}/images/stopjetlag/StopJetLag-3Platforms-Influences.jpg)

<br/>

### Architecture diagrams – before and after migration to Azure

*StopJetLag architecture before Azure migration*

![StopJetLag Before Azure Migration Architecture]({{ site.baseurl }}/images/stopjetlag/StopJetLag-Before-Azure-Migration-Architecture.jpg)


The architectural diagram above shows the components used to deliver a traveler’s StopJetLag plan prior to using Azure.

Two on-premises SQL databases held the client information and the specific trip information. The StopJetLag Order Processing app worked with both of these to process the information required to complete a personalized StopJetLag plan.

The StopJetLag Expert System app is written in C# and uses the Windows Presentation Foundation UI framework. The app used data retrieved from the on-premises StopJetLag trip database.

A StopJetLag plan proprietary formatted jet lag advice data file was generated from this app and then manually uploaded to a SQL database at our previous web-hosting provider. This was a time-consuming step. 
 
### Overview of StopJetLag Azure implementation

*StopJetLag Azure architecture*

![StopJetLag Azure Architecture]({{ site.baseurl }}/images/stopjetlag/StopJetLag-Azure-Architecture.jpg)

<br/>

While designing how to add the StopJetLag trip notes to the StopJetLag Mobile app, we addressed the above issues in our old architecture by moving to a significantly refined architecture based on Azure App Service, Azure SQL Database, and .NET Core.

Details about the Azure implementation are found in these sections:

- [Azure API Apps](#azure-api-apps)
- [Azure Web Apps](#azure-web-apps)
- [Azure SQL database](#azure-sql-database)

### Xamarin

Xamarin.Forms was selected for the cross-platform UI technology because it is available on all three of the target platforms—iOS (iPhone and iPad), Android, and Windows 10 (desktop and mobile).

*Xamarin.Forms basic structure in Visual Studio*

![Visual Studio StopJetLag XamarinForms Structure]({{ site.baseurl }}/images/stopjetlag/VisualStudio-StopJetLag-XamarinForms_Structure.jpg)

<br/>

The newly developed UI layer for the StopJetLag app is composed of these four StopJetLagForms projects:
	
- StopJetLagForms (Portable)—This is the project where the majority of the shared UI is located.
- StopJetLagForms.Droid (Android)
- StopJetLagForms.iOS (iPhone and iPad)
- StopJetLagForms.UWP (Universal Windows Platform for Windows 10)

**Platform-agnostic .NET-based core logic PCL**

The solution has three platform-agnostic core logic projects. These are not dependent on Xamarin.Forms but are written in C#. 

After the traveler uses the StopJetLag Mobile app to retrieve jet lag advice and trip notes from Azure SQL Database using the REST endpoints, the information is persisted locally using a SQLite database located on the mobile device. The major requirement when using SQLite in a PCL is that the database file is in the correct location on the mobile device, which is based on the specific platform being used.

The following code snippets show how to get the platform-specific folder where SQLite needs to be located and then pass it into the StopJetLag core PCL project.

***StopJetLag for iOS SQLite file location setup***

In an iOS app, you can determine the platform-specific folder using the following code, which was placed in the AppDelegate class of the iOS project and then passed into the core PCL.

```cs
public partial class AppDelegate : global::Xamarin.Forms.Platform.iOS.FormsApplicationDelegate    {
    	
        .....
    	  
        public override bool FinishedLaunching(UIApplication app, NSDictionary options)
        {
            global::Xamarin.Forms.Forms.Init();
   
            #region SQLitePCL_Region
            string documentsPath = Environment.GetFolderPath(Environment.SpecialFolder.Personal); 
            string libraryPath = Path.Combine(documentsPath, "..", "Library");

            SQLiteDbCoreViewModel sqliteDbCoreViewModel = SQLiteDbCoreViewModel.Instance;
            sqliteDbCoreViewModel.LibraryPath = libraryPath;
            #endregion

            LoadApplication(new App());

            return base.FinishedLaunching(app, options);
        }
}
```

<br/>

***StopJetLag for Android SQLite file location setup***

In an Android app, you can determine the platform-specific folder using the following code, which was placed in the MainActivity class of the Android project and then passed into the core PCL.

```cs
public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {
        protected override void OnCreate(Bundle bundle)
        {
            .....

            base.OnCreate(bundle);

            global::Xamarin.Forms.Forms.Init(this, bundle);

            #region SQLitePCL_Region
            string documentsPath = System.Environment.GetFolderPath(System.Environment.SpecialFolder.Personal); 
            string libraryPath = documentsPath;

            SQLiteDbCoreViewModel sqliteDbCoreViewModel = SQLiteDbCoreViewModel.Instance;
            sqliteDbCoreViewModel.LibraryPath = libraryPath;
            #endregion

            LoadApplication(new App());
        }
    }
```

<br/>

***StopJetLag for UWP SQLite file location setup***

In a UWP app, you can determine the platform-specific folder using the following code, which was placed in the MainPage class of the UWP project and then passed into the core PCL.

```cs
public sealed partial class MainPage
    {
        public MainPage()
        {
            this.InitializeComponent();

            #region SQLitePCL_Region
            string documentsPath = ApplicationData.Current.LocalFolder.Path;            
            string libraryPath = documentsPath;

            SQLiteDbCoreViewModel sqliteDbCoreViewModel = SQLiteDbCoreViewModel.Instance;
            sqliteDbCoreViewModel.LibraryPath = libraryPath;
            #endregion

            LoadApplication(new StopJetLag.App());
        }
    }
```

<br/>

**Use of plug-ins compatible with Xamarin**

*StopJetLag forms references*

<img alt="StopJetLag Forms References" src="{{ site.baseurl }}/images/stopjetlag/StopJetLagForms-References.jpg" width="400">

<br/>

To avoid reinventing the wheel, these plug-ins were added to the projects using NuGet:

- MvvmHelpers
- Connectivity
- DeviceInfo
- TextToSpeech
- SQLite
- Xamarin.Forms.CarouselView

These plug-ins are designed to add platform-specific implementations where necessary, which is a great timesaver during development.

Because Xamarin.Forms is primarily a XAML technology, the StopJetLag app made extensive use of the Model-View-ViewModel (MVVM) design pattern. This image shows the directory structure used to organize the StopJetLagForms (Portable) project.

*StopJetLagForms directory organization*

<img alt="StopJetLagForms Directory Organization" src="{{ site.baseurl }}/images/stopjetlag/StopJetLagForms-DirectoryOrganization.jpg" width="400">

<br/>

**Deployment and debugging**

While the Microsoft Visual Studio emulators for Android, iOS, and Windows UWP are a good option for debugging and viewing several different device-size profiles, the StopJetLag Mobile app was primarily tested using actual devices for each of the target platforms. 

There are two major reasons for using actual mobile devices to confirm what the emulators show:

- The processing speed of mobile devices is typically slower than the mobile emulators, which is important to the end-user experience.
- There are definitely instances where the mobile device does not behave the same as a mobile emulator.

*Microsoft Visual Studio emulator for Android dashboard*

![Microsoft Visual Studio Emulator For Android]({{ site.baseurl }}/images/stopjetlag/MicrosoftVisualStudioEmulatorForAndroid.jpg)

 <br/>
 
*Jet lag advice information using Xamarin.Forms (retrieved from Azure REST call)*

![StopJetLag 3Platforms JetLagAdvice]({{ site.baseurl }}/images/stopjetlag/StopJetLag-3Platforms-JetLagAdvice.jpg)

<br/>

The above screen shows the jet lag advice recommendations for the traveler to follow. The “Most Recent Jet Lag Advice” and the “Upcoming Jet Lag Advice” now have enhanced visibility for the traveler.

Jet lag advice is retrieved with an asynchronous web request to the Azure App Service REST endpoint using `async` and `await` in order not to block the main thread of the app. After retrieval, they are then persisted to a local SQLite database.

```cs 
// Retrieve Advice from Azure API App Service       
public async Task<int> RetrieveAdviceAsync(string id)
{
    Uri call = new Uri( "http://xxxxxxxxxx.azurewebsites.net/" + _httpUtilCross.UrlEncode(id) );

    var httpClient = new HttpClient();

    Task<string> contentsTask = httpClient.GetStringAsync(call);

    string contents = await contentsTask;

    ParseAdviceAndPersistToStorage(contents);

    int contentsLength = contents.Length;

    return contentsLength;
} 
```

<br/>

*Trip notes using Xamarin.Forms (retrieved from Azure REST call)*

![StopJetLag 3Platforms Trip Notes]({{ site.baseurl }}/images/stopjetlag/StopJetLag-3Platforms-TripNotes.jpg) 

<br/>

This screen shows the StopJetLag trip notes that were added after taking advantage of the migration of the StopJetLag infrastructure to Azure. 

**Local notifications for jet lag advice**

Besides the convenience of a traveler having jet lag advice at their fingertips, there is also the advantage of getting jet lag advice reminder notifications on their mobile device. This is especially convenient for busy travelers needing help to remember important advice for limiting jet lag.

One of the primary architectural design considerations was that jet lag advice notifications needed to be created and stored locally on the mobile device because Internet access is not guaranteed on flights, which is where many jet lag activities take place. 

Because management of local notifications is platform-specific and implemented differently on iOS, Android, and Windows 10, the ability to use dependency injection and Xamarin.Forms became important. A platform-specific implementation could be created for each platform after defining an interface with the high-level methods required.

Xamarin.Forms allows developers to define behavior in platform-specific projects. DependencyService then finds the right platform implementation, allowing shared code to access the native functionality.

The StopJetLag local notifications are set up by first creating an INotifyViewModel class, which holds the method names for the functions that are needed to manipulate the platform-specific notification functionality. This is done at the StopJetLagForms Portable level. Next, a NotifyCallsViewModel class is created. This is also found at the StopJetLagForms Portable level. Methods in this class use the Xamarin.Forms DependencyService to find the right platform implementation. Then platform-specific implementation of the NotifyViewModel : INotifyViewModel is created in the ViewModel directory for the iOS, Android, and UWP projects.

```cs
// LocalNotifications-DependencyInjection

// Interface at the StopJetLag (Portable level)

public interface INotifyViewModel
    {
        ....

        void ClearNotifications();

        Task<int> SetNotificationsAsync();

        ....
    }   

// These methods are called from NotifyCallsViewModel class at the StopJetLag (Portable level) 

class NotifyCallsViewModel
{      
       ..... 

        public void ClearNotifications()
        {
            DependencyService.Get<INotifyViewModel>().ClearNotifications();
        }


        public void SetNotificationsAsync()
        {           
           int notifications = 0;

            INotifyViewModel NotifyViewModel = DependencyService.Get<INotifyViewModel>();

            notifications = NotifyViewModel.SetNotificationsAsync();    

            .....
        }


        .....
}

// And these methods are all implemented in ViewModel layer of the Platform specific iOS, Android and UWP projects

// iOS Platform specific code 
[assembly: Xamarin.Forms.Dependency(typeof(NotifyViewModel))]
namespace StopJetLag.iOS.ViewModel
{
    public class NotifyViewModel : INotifyViewModel
    {
        .....
        public void ClearNotifications()
        {
            .....
        }

        public Task<int> SetNotificationsAsync()
        {
            .....
        }
        .....
    }
}	

// Android Platform specific code 
[assembly: Xamarin.Forms.Dependency(typeof(NotifyViewModel))]
namespace StopJetLag.Droid.ViewModel
{
   public class NotifyViewModel : INotifyViewModel
   {
        .....
        public void ClearNotifications()
        {
            .....
        }

        public Task<int> SetNotificationsAsync()
        {
            .....
        }
        .....
   }
}

// UWP Platform specific code 
[assembly: Xamarin.Forms.Dependency(typeof(NotifyViewModel))]
namespace StopJetLag.UWP.ViewModel
{
    public class NotifyViewModel : INotifyViewModel
    {
        .....
        public void ClearNotifications()
        {
            .....
        }

        public Task<int> SetNotificationsAsync()
        {
            .....
        }
        .....
    }
}
```

<br/>

### Azure App Service

#### Azure API Apps

The goal of the StopJetLag API layer is to provide a REST interface for the StopJetLag Mobile app to retrieve jet lag advice activity data as well as the created trip notes from the Azure SQL database using stored procedures for data retrieval. The need to scale automatically as well as the ease of development and integration with Azure based on .NET Core made the use of an Azure API app the obvious choice for the infrastructure development.

REST endpoints were created using .NET Core controllers to be delivered by the Azure API app for both StopJetLag jet lag advice and trip notes.

The layout for the API layer is a typical .NET Core MVC pattern that calls stored procedures in the Azure SQL database to retrieve the required information for the StopJetLag Mobile app.

*Mobile data Azure web app*

<img alt="Mobile Data Azure WebApp MoreInfo" src="{{ site.baseurl }}/images/stopjetlag/Mobile_Data_AzureWebApp-MoreInfo.jpg" width="400"> 


#### Azure Web Apps

***StopJetLag trip notes admin portal***

The Web Apps feature of Azure App Service provides excellent support for .NET Core and an easy way to configure continuous integration with Visual Studio Team Services using a GIT-style repository. This made Azure App Service a great platform for hosting the trip notes admin portal. The solution can handle scaling as needed and it makes deployment to Azure easy.

A StopJetLag trip notes admin portal was created using .NET Core to edit trip notes and save the changes back to the Azure SQL database. By using Azure App Service, a StopJetLag team member can work off-premises as needed when team scaling is required.

***Info setup prep by StopJetLag Expert System in SQL***

The following screen shows the trip-related information that the StopJetLag Expert System prepopulates in the Azure SQL database during the creation and review of the traveler’s StopJetLag plan.
 
*StopJetLag trips example*

![Stop Jet Lag Trips Example]({{ site.baseurl }}/images/stopjetlag/StopJetLag_Trips_Example.jpg)

<br/>

The next screen shows the trip leg notes-related information that is also prepopulated in the Azure SQL database to improve the speed of preparing a StopJetLag plan.

*StopJetLag trip leg notes empty example*

![StopJetLag Trip Leg Notes Empty Example]({{ site.baseurl }}/images/stopjetlag/StopJetLag_TripLeg_Notes_Empty_Example.jpg)

<br/>

***Trip notes after editing by Azure web app in SQL***

This screen shows a summary of all the trip notes for each leg of the traveler’s trip after the notes are edited using the Azure web app.

*StopJetLag trip leg notes example*

![StopJetLag Trip Leg Notes Example]({{ site.baseurl }}/images/stopjetlag/StopJetLag_TripLeg_Notes_Example.jpg)

<br/>

***Trip notes detail editing by Azure web app in SQL***

This screen shows where the individual trip leg note is edited.

*StopJetLag trip leg note edit example*

![StopJetLag Trip Leg Note Edit]({{ site.baseurl }}/images/stopjetlag/StopJetLag_TripLeg_Notes_Example_Edit.jpg)

<br/>

Here is the Visual Studio structure for the .NET Core MVC app that was used to create the screens shown above that are part of the trip notes admin portal.

*Visual Studio structure for .NET Core MVC app*

<img alt="TripNotes Azure WebApp MoreInfo" src="{{ site.baseurl }}/images/stopjetlag/TripNotes-AzureWebApp-MoreInfo.jpg" width="400">

<br/>

### Azure SQL database

An Azure SQL database is leveraged throughout the processing of a StopJetLag plan. This includes:

- Order Processing.
- StopJetLag Expert System persistence for both traveler and flight-specific information as well as persisting trip-specific tuning overrides. This information is pushed to the Azure SQL database programmatically from the Expert System during the creation and review of the StopJetLag plan.
- Mobile information repository for delivery of jet lag advice and trip notes to the StopJetLag Mobile app.

Two databases were created in Azure SQL Database. Using only two Azure SQL databases instead of four contributes to Azure data-hosting cost savings. 

*StopJetLag Azure SQL Database architecture*

![StopJetLag Azure SQL Architecture]({{ site.baseurl }}/images/stopjetlag/StopJetLag-Azure_SQL-Architecture.jpg)


Here is an overview of what is found in these two proprietary Azure SQL databases:

- StopJetLag trip data
  - 2 schemas (Client and Trip)
  - 16 tables
  - 50 stored procedures
- StopJetLag mobile delivery
  - 2 schemas (Jet Lag Advice and Trip Notes)
  - 7 tables
  - 43 stored procedures

Within these two Azure SQL databases, the tables are organized by functional schemas: 

- A Client schema and a Trip schema are used to consolidate two on-premises SQL databases into one StopJetLag trip data Azure SQL database.
- A Jet Lag Advice schema and a Trip Notes schema are used in the StopJetLag mobile delivery Azure SQL database.
- All of these schemas contain several proprietary database tables that are used. 

In addition to setting up the database architecture with schemas and tables, stored procedures were developed to be called by the data logic layer found in the following: 

- Remote StopJetLag Order Processing app
- Remote StopJetLag Plan Expert System app
- StopJetLag trip notes admin portal – web app (Azure App Service)
- StopJetLag plan mobile delivery REST endpoints for jet lag advice and trip notes – API app (Azure App Service)

### Azure service features

**Continuous deployment**

***Visual Studio Team Services***

Because StopJetLag has been using Visual Studio Team Services for source control, we first wanted to configure continuous deployment for this repository. It couldn’t have been easier. We configured continuous deployment through the Azure portal by setting the Team Services repo as the deployment source under ‘deployment options’.

*StopJetLag deployment source*

![StopJetLag Deployment Source Fig1]({{ site.baseurl }}/images/stopjetlag/StopJetLag_DeploymentSourceFig1.jpg)

<br/>

After choosing the repository source, the next step was to choose the desired project from the repository. Then we selected the desired source code branch and approved the continuous deployment options. After that confirmation, the project is built and deployed each time source code is checked into the repository.

*StopJetLag deployment* 

<img alt="StopJetLag Deployment Fig2" src="{{ site.baseurl }}/images/stopjetlag/StopJetLag_DeploymentFig2.jpg" width="400">

<br/>

***GitHub***

We also implemented a partial project with GitHub and configured continuous deployment under “deployment options”.

*StopJetLag GitHub source*

![StopJetLag GitHub Source]({{ site.baseurl }}/images/stopjetlag/StopJetLag_GitHubSourceFig1.jpg)

<br/>

Once continuous deployment is set up, a new build will be created and deployed to the desired App Service slot after each code check-in to the repository. 

*StopJetLag GitHub deployment options*

![StopJetLag GitHub Deployment Options]({{ site.baseurl }}/images/stopjetlag/StopJetLag_GitHubDeploymentOptionsFig.jpg)

<br/>

**Autoscaling and App Service environment**

***Scaling based on the preset CPU percentage metric***

During StopJetLag Mobile app upgrades, there is often a surge in calls to the REST API that can increase StopJetLag plan retrieval response times for the app user.

App Service autoscaling can automatically adjust the number of instances based on CPU percentage found in the scale by dropdown. 

1. Select the CPU percentage metric. Then use the top slider with text boxes to enter the number of instances to scale between. For StopJetLag, we are targeting 1 to 3 instances. Autoscale will never take the service below or above the boundaries that are set, no matter the load.

	*StopJetLag autoscale*

	![StopJetLag AzureAutoScale]({{ site.baseurl }}/images/stopjetlag/StopJetLag_AzureAutoScale.jpg)

 
2. Next, choose the target range for the CPU percentage metric. StopJetLag uses a minimum of 50 and a maximum of 80 as a target for the average CPU across all of the instances of the service. A scale-out will happen when the average CPU exceeds the defined maximum of 80. And a scale-in will happen whenever the average CPU drops below the minimum of 50.
3. Finalize the settings by clicking **Save**. 

Autoscale will then check every few minutes to make sure that StopJetLag service is in the instance range and target for the metric. When the service receives additional traffic, more instances are added to meet the load without doing anything.

***Application settings – always on***

Because mobile app users are notoriously impatient, it is important that any REST calls return information quickly. For the StopJetLag Mobile app, we discovered it is important that one of the default settings is changed. By default, the application setting **Always On** is turned off when an app service is created. This was resulting in response times in the range of 15 to 20 seconds when retrieving StopJetLag plan information because the app service had to be spun up if a traveler had not used the API app in the previous 10 minutes.

By changing this value to **Always On**, the StopJetLag plan is usually returned from the REST call in less than 2 seconds and often well under 1 second.

*StopJetLag setting Always On*

![StopJetLag Application Settings AlwaysOn]({{ site.baseurl }}/images/stopjetlag/ApplicationSettings-AlwaysOn.jpg)

<br/>

**Use of deployment slots**

***Swapping staging and production slots***

During development, we take advantage of Azure App Service development deployment slots. Once a release candidate staging version of a StopJetLag app service has been approved for production, we take advantage of the ease of swapping an app service staging slot with the production slot. 

Deploying an application to a development slot before swapping to a production slot gives us the following benefits:

- We can validate app changes in a staging deployment slot before swapping it with the production slot.
- Deploying an app to a staging slot first and swapping it into production ensures that all instances of the slot are warmed up before being swapped into production. This eliminates downtime when you deploy your app. This is especially important for our client travelers, who could be anywhere in the world and requesting to retrieve their StopJetLag plan from the StopJetLag Mobile app in any time zone.

*StopJetLag deployment slots*

![StopJetLag Deployment Slots And Swapping to Scale]({{ site.baseurl }}/images/stopjetlag/DeploymentSlotsAndSwappingtoScale.jpg)


## Conclusion ##

>“I am pleased with the improvements in the day-to-day operations at StopJetLag.com that resulted from this project. First, the creation of the StopJetLag app with Xamarin.Forms will certainly make enhancements to the StopJetLag Mobile UI easier in the future. 
>
>"And moving much of our infrastructure to utilize Azure has lowered the cost and management overhead of the applications required to create a customized StopJetLag plan for travelers.
>
>"With Azure App Service and our new Azure SQL database, we can now scale up our processes during peak travel times for our service without requiring StopJetLag team members to work on-premises to create and review StopJetLag plans.”
>
>- Bill Ashton, CEO, Kinetic Software

### General lessons ###

- Xamarin.Forms is an excellent way to develop a mobile app for iOS, Android, and Windows 10. Visual Studio Team Services allows for the best practice of developing for all target platforms at the same time.
- Mobile app builds should be checked on physical devices frequently. 
- Using .NET Core web API in Azure App Service was a quick way to stand up the HTTP REST endpoint for the StopJetLag Mobile app. 
- Visual Studio Team Services tooling made it efficient to create the trip notes admin portal with a .NET Core web app hosted by Azure App Service.
- Both the Jet Lag Advice API app and the Trip Notes web app can be quickly deployed to Azure App Service using continuous deployment from the Visual Studio Team Services repository and GitHub.
- Azure SQL Database was an easy feature to add to both our ASP.Net Order Processing web app and the Windows Presentation Foundation-based StopJetLag Expert System instead of going to an on-premises SQL Server database. 

### End-customer example ###

"Finally, an All-Natural Solution to Jet Lag That Actually Works"

_Linda Wells - New York Magazine: The CUT_

![StopJetLag All Natural NY Mag The CUT]({{ site.baseurl }}/images/stopjetlag/StopJetLag-AllNatural-NYMagTheCUT.jpg)


Here is what the media and world travelers say about StopJetLag: [http://www.stopjetlag.com/saying/what-others-are-saying.html](http://www.stopjetlag.com/saying/what-others-are-saying.html)

## Additional resources ##

### Xamarin resources

- Xamarin.Forms: [https://developer.xamarin.com/guides/xamarin-forms](https://developer.xamarin.com/guides/xamarin-forms)
- Xamarin Async/Await Support Overview: [https://developer.xamarin.com/guides/cross-platform/advanced/async_support_overview](https://developer.xamarin.com/guides/cross-platform/advanced/async_support_overview)
- Xamarin.Forms DependencyService: [https://developer.xamarin.com/guides/xamarin-forms/application-fundamentals/dependency-service](https://developer.xamarin.com/guides/xamarin-forms/application-fundamentals/dependency-service)

### Azure resources

- [Set up staging environments in Azure App Service](https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-staged-publishing)
- [Continuous Deployment to Azure App Service](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-continuous-deployment)
- [Autoscaling and App Service Environment](https://docs.microsoft.com/en-us/azure/app-service/app-service-environment-auto-scale)
- [Scale instance count manually or automatically](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/insights-how-to-scale)
