---
layout: post
title:  "Implementing Burgan Bank's cross-platform mobile app solution for mobile banking"
author: "Ibrahim Kivanc"
author-link: "https://twitter.com/ikivanc"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2017-08-11
categories: [Mobile Application Development with Xamarin]
color: "blue"
image: "images/burgan/fab-menu-screen-tile.gif" 
excerpt: Burgan Bank, together with Microsoft, used Xamarin to develop a fully functional consumer mobile banking application.
language: [English]
verticals: [Banking & Capital Markets]
geolocation: [Middle East, Africa]
---



<img alt="Burgan Bank Xamarin Mobile Application Architecture Diagram" src="{{ site.baseurl }}/images/burgan/header.png" width="600">


Burgan Bank Turkey is the first bank in the Middle East and Africa to develop a consumer mobile banking application by using the Xamarin platform. While doing research for a future mobile development platform, the Burgan Bank mobile team started to work with a Microsoft technical evangelist. Together, the team built an application on Android and iOS with 100 percent code sharing. Empowering .NET developers with mobile application capabilities is going to be a new mobile approach for enterprise company developers.

The first considerations for cross-platform development technologies are user experience, performance, and ease of using development tools. These determined the strategic decisions of this collaboration. This joint effort is a great example of how Azure services can be implemented into enterprise solutions and financial services.

>“In alignment with Burgan Bank digital banking strategy, we investigated several solutions to enable our mobile banking platform. Microsoft offers us a strong, reliable, and ease-of-use platform in order for mobile banking to develop our new-generation product. Xamarin provides us with a unique code opportunity to meet multiplatform release instead of native development.”
>
>— Murat Çetin Sav, CIO, Burgan Bank

**Key technologies used:**

- [Xamarin.Forms](https://www.xamarin.com/forms) 
- [Xamarin Studio for Mac](https://www.xamarin.com/studio)
- [Microsoft Team Foundation Server 2015 Update 2](https://www.visualstudio.com/en-us/news/releasenotes/tfs2015-update2-vs)
- [HockeyApp](https://azure.microsoft.com/en-us/services/hockeyapp)
- [Xamarin Test Cloud](https://www.xamarin.com/test-cloud)
- [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights)
- [Microsoft Power BI Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/)
- [Azure Notification Hubs](https://docs.microsoft.com/en-us/azure/notification-hubs/notification-hubs-push-notification-overview)

**Core team:**

- [Ibrahim Kıvanç](https://twitter.com/ikivanc) – Senior Technical Evangelist, Microsoft
- Murat Çetin Sav – CIO, Burgan Bank
- Hıdır Keser – Digital Channels & Innovation Division Manager, Burgan Bank
- Zafer Yasin Alemdaroğlu – Senior Software Development Engineer, Burgan Bank
- Enis Özgit – Senior Software Development Engineer, Burgan Bank
- Erdem Kalaycı – Senior Software Development Engineer, Burgan Bank
- Ahmet Serhan Ay – Junior Software Development Engineer, Burgan Bank
- Onur Doğan – Senior Software Development Engineer, Burgan Bank
- Serpil Şen Oğuz – Project Manager, Burgan Bank

<br/>

<img src="{{ site.baseurl }}/images/burgan/burgan_team.png" alt="Burgan Bank Xamarin Mobile Application Architecture Diagram">


<img src="{{ site.baseurl }}/images/burgan/burgan_team1.png" alt="Burgan Bank Xamarin Mobile Application Architecture Diagram">


## Customer profile ##

The [Burgan Bank](https://www.burgan.com.tr) information technology and core mobile development team is located in Istanbul, Turkey.

Although originally founded in Turkey as Tekfen Investment Finance Bank, it became known as Burgan Bank after the Burgan Bank Group became its major shareholder in 2012. The Burgan Bank Group is a Kuwait-based financial services group and a leading financial services provider in the Middle East and North Africa (MENA) with three other majority-held subsidiaries in Algeria (Gulf Bank Algeria), Iraq (Bank of Baghdad), and Tunisia (Tunis International Bank).

## Problem statement ##

Burgan Bank doesn’t have a mobile banking channel and they’re trying to build a mobile development team in-house with ROI. They needed to have mobile expertise (such as native mobile development, push notifications, and mobile user telemetry monitoring) because they wanted a cross-platform development solution to provide a consistent application experience across various devices. 

There are key elements for Burgan Bank’s mobile application such as performance, maximum code sharing, user experience, and understanding user behaviors. At the same time, they would like to integrate mobile DevOps processes such as continuous integration and continuous delivery for their application packages as company culture. 

“Burgan Bank Mobile” is the key project to enable customers to customize their needs based on the financial changes. This helps to establish an optimized solution to integrate API banking facilities to the retail banking market.

## Solution and steps ##

Burgan Bank is in the process of developing a business-to-consumer (B2C) mobile application using Xamarin for cross-platform apps. It is working on a mobile banking app for iOS and Android devices using a [Xamarin.Forms](https://www.xamarin.com/forms) approach to building mobile apps using C# and delivering fully native mobile app experiences to all major devices, including iOS and Android, with maximum code sharing between platforms.

>“There are some key reasons to consider a new mobile application development platform (MADP) to use in the production environment. First of all, duration of shipping the product in real life, then maximum code sharing across platforms without any customization per platform, using existing .NET skills of developers in mobile projects. Xamarin is the key solution providing all benefits all together.”
>
>— Hıdır Keser, Digital Channels & Innovation Division Manager, Burgan Bank

<br/>

<img src="{{ site.baseurl }}/images/burgan/uiux.png" alt="Burgan Bank Mobile Application with same UI on Android and iOS">


The Xamarin.Forms approach enables developers to take advantage of the productivity and power of .NET to build mobile apps and to use C# to write to the full set of native APIs and mobile capabilities provided by each device platform. This enables developers to easily share common app code across their iOS and Android apps while still delivering fully native experiences for each of the platforms.

The app uses REST API request and response to get or post data. Visual Studio and Xamarin Studio on Mac devices provide a rich mobile development offering that enables existing .NET developers at the bank.

They’ll be sending their push notifications through [Azure Notification Hubs](https://azure.microsoft.com/en-us/services/notification-hubs/), and they’ll be using [Application Insights](https://azure.microsoft.com/en-us/services/application-insights) to track users’ telemetry to understand user behavior.

In addition, the Burgan Bank digital banking and innovation team will create a mechanism to better understand user interactions and application stability by incorporating [HockeyApp](https://azure.microsoft.com/en-us/services/hockeyapp) crash reporting and analytics. The team is also able to incorporate an innovative feature in the final product using [Xamarin Profiler](https://www.xamarin.com/profiler) and [Xamarin Test Cloud](https://www.xamarin.com/test-cloud).

Xamarin Profiler integrates seamlessly with an existing Xamarin toolchain to collect information about your Xamarin apps. You can use it to find memory leaks, resolve performance bottlenecks, and add polish to your apps before getting them out the door.

The team used Xamarin Test Cloud with Xamarin.UITest. First, the team set the Xamarin Test Cloud device configurations on the Xamarin Test Portal. Then they uploaded app packages for testing. Finally, the team viewed test reports of automated tests.

[Power BI Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/) became a major tool to monitor users' behaviors through Application Insights analytics data. 

>“When I started working on Xamarin.Forms applications two years ago, Xamarin was moving with baby steps. Now when I look back at platform development progress to today, it has evolved into a strong and capable platform providing anything you can expect from a successful mobile application.”
>
>— Zafer Yasin Alemdaroğlu, Senior Software Development Engineer, Burgan Bank

<br/>

<img src="{{ site.baseurl }}/images/burgan/project.JPG" alt="Burgan Bank Xamarin Mobile Application Architecture Diagram">


## Technical delivery ##

Because this will be a banking application, Burgan Bank has started to build a user acceptance testing (UAT) platform with fake data using their existing banking environment during development. Burgan Bank also started designing their solution architecture to make it ready for production, so all systems have started using their internal resources.

Burgan Bank decided to build their first mobile banking application in order to connect existing back-end systems with their mobile front end. In addition to their existing back end, the team planned to integrate Azure cloud services.  

<img src="{{ site.baseurl }}/images/burgan/architecture.png" alt="Burgan Bank Xamarin Mobile Application Architecture Diagram">
 
 
Banking regulations in Turkey prohibit the storage of personal and banking data outside of Turkey. While we were working on this mobile app, we considered scenarios in which we could use Azure and we'll explain those below. 

<img src="{{ site.baseurl }}/images/burgan/solution.png" width="300px" alt="Burgan Bank custom UI for same experience">


In order to retrieve data from several resources, the project solution looks like the structure above, including the Xamarin.Forms project and other services.

Core common features for this solution have been compiled in a sample by technical evangelist (and author of this report), Ibrahim Kivanc: [Firarperest Project](https://github.com/ikivanc/firarperestx)

Burgan Bank created an account on GitHub to share their learnings. They also wanted it to be a good example of how a bank can be open to grow a community of developers: [Burgan Bank Turkey Mobile GitHub Account](https://github.com/BurganBankMobile)

### User interface (UI) and user experience (UX)

Burgan Bank used the same customized look and feel for both platforms. To implement these kinds of modifications, they dived deep into XAML code. XAML is a markup language for Xamarin.Forms projects.

>"We're proud of sharing our Xamarin learnings with other developers. [BurganBankUIKit GitHub Project](https://github.com/BurganBankMobile/BurganBankXamarinUIKit) is available on GitHub for all developers."
>
>— Hıdır Keser, Digital Channels & Innovation Division Manager

<br/>

#### 1. Same look and feel

In Xamarin.Forms, you can provide the same common experiences between platforms using XAML customization. Burgan Bank used the same look-and-feel experience in their application views. This is an important ask from business units to provide a unified support script for call centers if any need for support occurs.   

<img src="{{ site.baseurl }}/images/burgan/lookandfeel.png" alt="Burgan Bank custom search in menu">


#### 2. Custom UI sample

Xamarin.Forms only has common UI elements between platforms. There may be some custom element needs that do not exist due to implementation scenarios. Burgan Bank needed a search menu with its hamburger menu. They implemented the following code snippet to have a search bar on top of the menu. It dynamically filters the results.

<img src="{{ site.baseurl }}/images/burgan/custommenu.png" alt="Burgan Bank custom search in menu">


Here is the code sample for the expandable animated menu list with search bar:

[Expandable animated menu list with search bar GitHub code part](https://github.com/BurganBankMobile/BurganBankXamarinUIKit/tree/master/BurganBankUIKit/ExpandableMenuPage)

#### 3. Custom UI progress bar

<img src="{{ site.baseurl }}/images/burgan/OTPScreen.gif" alt="Burgan Bank custom UI for same experience">


Code sample for XAML UI: 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ContentView xmlns="http://xamarin.com/schemas/2014/forms" 
			 xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml" 
			 x:Class="BurganBank.ProgressBarView">
	<ContentView.Content>
		<Grid>
			<BoxView x:Name="ProgressBarBlock" HorizontalOptions="StartAndExpand"/>
			<Label x:Name="ProgressBarTimeIndicator" TextColor="#263238" FontAttributes="Bold"/>
		</Grid>
	</ContentView.Content>
</ContentView>
```

<br/>

Code sample for C#: 

```cs
	public partial class ProgressBarView : ContentView
	{
		public ProgressBarView()
		{
			InitializeComponent();

            MarginUtil.AddToMargin(ProgressBarTimeIndicator, "11,5,0,0");
			StartTimer();
		}

        private string ConvertToMinuteRepresentation(int totalSeconds)
        {
            int minutes = totalSeconds / 60;
            int seconds = totalSeconds % 60;
            return String.Format("{0}:{1}", minutes.ToString("D2"), seconds.ToString("D2"));
        }
   }
```

<br/>

Usage in a page:

```xml
<views:ProgressBarView x:Name="OtpProgressBar" IntervalInSeconds="120" BarWidthRequest="336" BarHeightRequest="30" BarColor="#f78e1e" BackgroundColor="#ececec" TimerCompleted="Handle_TimerCompleted" />
```

<br/>

#### 4. Label animation

Whenever the user clicks **Entry**, the Entry label moves above with an animation. 

<img src="{{ site.baseurl }}/images/burgan/LabeledEntryAnimation.gif" alt="Burgan Bank custom UI for same experience">


Code sample for XAML UI: 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<ContentView xmlns="http://xamarin.com/schemas/2014/forms"
		xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
		xmlns:views="clr-namespace:BurganBank;assembly=BurganBank"
		x:Class="BurganBank.LabeledEntryView"
		x:Name="LabeledEntry">
  <ContentView.Content>
		<Grid x:Name="LabeledEntryGrid" Margin="0,20,0,0" BindingContext="{x:Reference Name=LabeledEntry}">
				<Label x:Name="LabeledEntryLabel" FontSize="16" Margin="6,0,0,0" Text="{Binding LabelText}"/>
				<views:DoneEntry x:Name="LabeledEntryInput" 
								IsEnabled="{Binding Enabled}"
								Text="{Binding EntryText, Mode=TwoWay}" 
								TextChanged="Handle_TextChanged" 
								Unfocused="Handle_Unfocused"/>
		</Grid>
	</ContentView.Content>
</ContentView>

```

<br/>

Usage in a page:

```xml
<views:ProgressBarView x:Name="OtpProgressBar" IntervalInSeconds="120" BarWidthRequest="336" BarHeightRequest="30" BarColor="#f78e1e" BackgroundColor="#ececec" TimerCompleted="Handle_TimerCompleted" />
```

<br/>

#### 5. Expandable menu

<img src="{{ site.baseurl }}/images/burgan/FABMenuScreen.gif" alt="Burgan Bank Mobile DevOps Architecture Diagram">

<br/>

Here is the code sample for the expandable menu UI:

<img src="{{ site.baseurl }}/images/burgan/FABMenuItem.png" width="300" alt="Burgan Bank Mobile DevOps Architecture Diagram">


[FABMenuPage Github code part](https://github.com/BurganBankMobile/BurganBankXamarinUIKit/tree/master/BurganBankUIKit/FABMenuPage)


### Code sharing 

Almost 100 percent of the code has been shared between Android and iOS projects, with only some platform-specific needs solved by implementing into related project folders. These include retrieving SMS content on Android, push notification to Android and iOS, and UI blur effect when the app is running in the background.

Pressing the home button sends the application to the background. This is a need for a banking application and it's available only on the iOS platform. That's why this is integrated only into the iOS part of the Xamarin project.

<img src="{{ site.baseurl }}/images/burgan/BlurEffectOnHomeButtonPressed.gif" width="300" alt="Burgan Bank Mobile DevOps Architecture Diagram">

<br/>

An iOS-specific code sample for C#: 

AppDelegate.cs

```cs
UIVisualEffectView _blurView = null;
        public override void OnActivated (UIApplication application)
        {
            try {
                Window.Hidden = true;
            } catch { }
        }
        public override void OnResignActivation (UIApplication application)
        {
            Window = new UIWindow (UIScreen.MainScreen.Bounds);
            var controller = new UIViewController ();
            Window.RootViewController = controller;
            using (var blurEffect = UIBlurEffect.FromStyle (UIBlurEffectStyle.Light)) {
                _blurView = new UIVisualEffectView (blurEffect);
                _blurView.Frame = Window.RootViewController.View.Bounds;
                Window.RootViewController.View.AddSubview (_blurView);
            }
            Window.MakeKeyAndVisible ();
        }
        public override UIInterfaceOrientationMask GetSupportedInterfaceOrientations (UIApplication application, UIWindow forWindow)
        {
            switch (Device.Idiom) {
            case TargetIdiom.Phone:
                return UIInterfaceOrientationMask.Portrait;
            case TargetIdiom.Tablet:
                return UIInterfaceOrientationMask.Landscape;
            default:
                return UIInterfaceOrientationMask.Portrait;
            }
        }
```

### Azure Notification Hubs

Burgan Bank used Azure Notification Hubs to send push notifications to Android and iOS devices. After creating this service on Azure, on the Xamarin code side below code snippets were integrated to register devices for notification listening and notification receiving.

The team configured Azure Notification Hubs for Android and iOS with the help of these documents:

- [Get started with Notification Hubs with Xamarin for Android](https://docs.microsoft.com/en-us/azure/notification-hubs/xamarin-notification-hubs-push-notifications-android-gcm)
- [iOS Push Notifications with Notification Hubs for Xamarin apps](https://docs.microsoft.com/en-us/azure/notification-hubs/xamarin-notification-hubs-ios-push-notification-apns-get-started)

<img src="{{ site.baseurl }}/images/burgan/notificationhub.png" alt="Burgan Bank Azure Notification Hub">

<br/>

From the Burgan Azure Notification Hubs settings, the team entered a project ID for Android and uploaded a .p12 certificate for iOS. Then the team took the connection strings to register the app to both receive and send push notifications.

<img src="{{ site.baseurl }}/images/burgan/notificationhub1.png" alt="Burgan Bank Azure Notification Hub">

<br/>

The team added these connection strings to App.xaml.cs in the project.

<img src="{{ site.baseurl }}/images/burgan/notificationhub2.png" alt="Burgan Bank Azure Notification Hub">

<br/>

On Xamarin.Android, the team added the following codes to receive push notifications.

Android:

PushHandlerService.cs

```cs
[Service]
    public class PushHandlerService : GcmServiceBase
    {
        public static string RegistrationID { get; private set; }
        private NotificationHub Hub { get; set; }

        public PushHandlerService() : base(App.SenderID)
        {
            Log.Info(MyBroadcastReceiver.TAG, "PushHandlerService() constructor");
        }
        protected override void OnUnRegistered(Context context, string registrationId)
        {
            Log.Verbose(MyBroadcastReceiver.TAG, "GCM Unregistered: " + registrationId);

            createNotification("GCM Unregistered...", "The device has been unregistered!");
        }

        protected override bool OnRecoverableError(Context context, string errorId)
        {
            Log.Warn(MyBroadcastReceiver.TAG, "Recoverable Error: " + errorId);

            return base.OnRecoverableError(context, errorId);
        }

        protected override void OnError(Context context, string errorId)
        {
            Log.Error(MyBroadcastReceiver.TAG, "GCM Error: " + errorId);
        }
        protected override void OnMessage(Context context, Intent intent)
        {
            Log.Info(MyBroadcastReceiver.TAG, "GCM Message Received!");

            var msg = new StringBuilder();

            if (intent != null && intent.Extras != null)
            {
                foreach (var key in intent.Extras.KeySet())
                    msg.AppendLine(key + "=" + intent.Extras.Get(key).ToString());
            }

            string messageText = intent.Extras.GetString("message");
            if (!string.IsNullOrEmpty(messageText))
            {
                createNotification("New hub message!", messageText);
            }
            else
            {
                createNotification("Unknown message details", msg.ToString());
            }
        }
        
        protected override void OnRegistered(Context context, string registrationId)
        {
            Log.Verbose(MyBroadcastReceiver.TAG, "GCM Registered: " + registrationId);
            RegistrationID = registrationId;

            createNotification("PushHandlerService-GCM Registered...",
                                "The device has been Registered!");

            Hub = new NotificationHub(App.NotificationHubName,
                App.ListenConnectionString, context);
            try
            {
                Hub.UnregisterAll(registrationId);
            }
            catch (Exception ex)
            {
                Log.Error(MyBroadcastReceiver.TAG, ex.Message);
            }

            var tags = new List<string>() { };

            try
            {
                var hubRegistration = Hub.Register(registrationId, tags.ToArray());
            }
            catch (Exception ex)
            {
                Log.Error(MyBroadcastReceiver.TAG, ex.Message);
            }
        }

        void createNotification(string title, string desc)
        {
            var notificationManager = GetSystemService(Context.NotificationService) as NotificationManager;
            var uiIntent = new Intent(this, typeof(MainActivity));
            var notification = new Notification(Android.Resource.Drawable.SymActionEmail, title);
            notification.Flags = NotificationFlags.AutoCancel;
            notification.SetLatestEventInfo(this, title, desc, PendingIntent.GetActivity(this, 0, uiIntent, 0));
            notificationManager.Notify(1, notification);
            dialogNotify(title, desc);
        }
        protected void dialogNotify(String title, String message)
        {
            MainActivity.instance.RunOnUiThread(() => {
                AlertDialog.Builder dlg = new AlertDialog.Builder(MainActivity.instance);
                AlertDialog alert = dlg.Create();
                alert.SetTitle(title);
                alert.SetButton("Ok", delegate {
                    alert.Dismiss();
                });
                alert.SetMessage(message);
                alert.Show();
            });
        }
    }
    [BroadcastReceiver(Permission = Constants.PERMISSION_GCM_INTENTS)]
    [IntentFilter(new string[] { Constants.INTENT_FROM_GCM_MESSAGE },
         Categories = new string[] { "com.*****burgan.azurepush" })]
    [IntentFilter(new string[] { Constants.INTENT_FROM_GCM_REGISTRATION_CALLBACK },
         Categories = new string[] { "com.*****burgan.azurepush" })]
    [IntentFilter(new string[] { Constants.INTENT_FROM_GCM_LIBRARY_RETRY },
         Categories = new string[] { "com.*****burgan.azurepush" })]
    public class MyBroadcastReceiver : GcmBroadcastReceiverBase<PushHandlerService>
    {
        public static string[] SENDER_IDS = new string[] { App.SenderID };

        public const string TAG = "MyBroadcastReceiver-GCM";
    }
}
```

<br/>

On Xamarin.IOS, the team added the following code snippets to receive push notifications.

AppDelegate.cs

```cs
[Register("AppDelegate")]
    public partial class AppDelegate : global::Xamarin.Forms.Platform.iOS.FormsApplicationDelegate
    {
        public override bool FinishedLaunching(UIApplication app, NSDictionary options)
        {
            global::Xamarin.Forms.Forms.Init();
            LoadApplication(new App());

            var settings = UIUserNotificationSettings.GetSettingsForTypes(
                 UIUserNotificationType.Alert
                 | UIUserNotificationType.Badge
                 | UIUserNotificationType.Sound,
                 new NSSet());

            UIApplication.SharedApplication.RegisterUserNotificationSettings(settings);
            UIApplication.SharedApplication.RegisterForRemoteNotifications();

            return base.FinishedLaunching(app, options);
        }
        public override void RegisteredForRemoteNotifications(UIApplication application,
     NSData deviceToken)
        {
            const string templateBodyAPNS = "{\"aps\":{\"alert\":\"$(messageParam)\"}}";

            JObject templates = new JObject();
            templates["genericMessage"] = new JObject
             {
               {"body", templateBodyAPNS}
             };

            Push push = TodoItemManager.DefaultManager.CurrentClient.GetPush();
            push.RegisterAsync(deviceToken, templates);
        }
        public override void DidReceiveRemoteNotification(UIApplication application,
    NSDictionary userInfo, Action<UIBackgroundFetchResult> completionHandler)
        {
            NSDictionary aps = userInfo.ObjectForKey(new NSString("aps")) as NSDictionary;

            string alert = string.Empty;
            if (aps.ContainsKey(new NSString("alert")))
                alert = (aps[new NSString("alert")] as NSString).ToString();

            if (!string.IsNullOrEmpty(alert))
            {
                UIAlertView avAlert = new UIAlertView("Notification", alert, null, "OK", null);
                avAlert.Show();
            }
        }
    }

```

<br/>

Then when the team wants to send campaign push notifications for Android and iOS on the banking mobile app, they use Azure Notification Hubs for sending test messages.

<img src="{{ site.baseurl }}/images/burgan/notificationhubTest.png" alt="Burgan Bank Mobile DevOps architecture diagram">

<br/>

Here is the test push sent from Azure Notification Hubs. 

<img src="{{ site.baseurl }}/images/burgan/notificationhubPush.png" alt="Burgan Bank Mobile DevOps architecture diagram">

<br/>

For enabling iOS push notifications, you can check prerequisites for iOS applications and get more information from this documentation on Azure: [iOS Push Notifications with Notification Hubs for Xamarin apps](https://docs.microsoft.com/en-us/azure/notification-hubs/xamarin-notification-hubs-ios-push-notification-apns-get-started).

When Burgan Bank Mobile users log on successfully, the application sends user push registration ID, user information, operating system, version, and date to the back end, where all information for every user is stored.

To send a notification for a specific user, the team wrote a service on the back end to use it. Here are the back-end code snippets for Notification Hubs iOS and Android in the Burgan API:

NotificationSender.cs

```cs
using Microsoft.Azure.NotificationHubs;
using System;
namespace BurganBankApiNotificationSender
{
    class Program
    {
        static void Main(string[] args)
        {
            SendNotificationAsync();
            Console.ReadLine();
        }
        private static async void SendNotificationAsync()
        {
            NotificationHubClient hub = NotificationHubClient.CreateClientFromConnectionString("Endpoint=sb://burganmobile123.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=***************************=", "BurganMobileAzureNotificationHub");
            await hub.SendGcmNativeNotificationAsync("{ \"data\" : {\"message\":\"Test From BurganBank!\"}}");
        }
    }
}

```

### Multi-language in app EN/TR

The Burgan Bank Mobile application supports two languages, Turkish and English. To implement this feature, Burgan Bank used the following code snippet. Due to the device's language application, language is automatically set with the code sample below.

<img src="{{ site.baseurl }}/images/burgan/multilanguage.png" width="300" alt="Burgan Bank Mobile DevOps Architecture Diagram">

<br/>

Code sample for C#: 

```cs
namespace BurganBank.Resx
{
    [ContentProperty (“Text”)]
    public class TranslateExtension : IMarkupExtension
    {
        public string Text { get; set; }

        public object ProvideValue (IServiceProvider serviceProvider)
        {
            if (Text == null) {
                return null;
            }

            return AppResources.ResourceManager.GetString (Text, CultureInfo.CurrentCulture);
        }
    }
}
```

<br/>

Code sample for XAML integration: 

```xml
<Label Text=“{resources:Translate ConnectionUS}” />
```

## Mobile DevOps

To build an automated environment for development and minimize the operation process, Burgan Bank decided to build a mobile DevOps environment to run a seamless development process.

<img src="{{ site.baseurl }}/images/burgan/architectureMobileDevOps.png" alt="Burgan Bank Mobile DevOps Architecture Diagram">

<br/>

For code repository, continuous integration, and continuous deployment, Burgan Bank used [Team Foundation Server 2015 Update 2](https://www.visualstudio.com/en-us/news/releasenotes/tfs2015-update2-vs). To test their application on hundreds of devices, they used [Xamarin Test Cloud](https://www.xamarin.com/test-cloud). After creating packages, they used [HockeyApp](https://azure.microsoft.com/en-us/services/hockeyapp) to distribute the app, track crash reports, and collect feedback. 

In order to track user behavior and telemetry data, they used the power of [Application Insights](https://azure.microsoft.com/en-us/services/application-insights), especially using the Application Insights analytics tool to run custom reports to get insights for the application. In order to visualize these reports, Power BI Desktop is an essential tool. After creating custom dashboards, [Power BI Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/) is a great tool to embed these reports into their portal.

### Security

App test processes that happen in the cloud and, sometimes, internal test resource accesses are restricted with a firewall. [Xamarin Test Cloud firewall](https://developer.xamarin.com/guides/testcloud/firewall-information/) is another important element for banking UAT test scenarios to test applications with internal banking data. Xamarin Test Cloud has a static IP to give internal access to these endpoints. 

  - 195.249.159.238
  - 195.249.159.239 

## Conclusion ##

With this project, Burgan Bank powered their omnichannel banking with their first mobile application using Xamarin. They plan to release this application soon. The whole application is running with UAT test environment data and it will be easy to implement with a production environment.

**General lessons:**

- Xamarin is a great tool for enabling core .NET developers to build mobile applications. 
- One development team and one solution for Android and iOS platform applications reduce development costs. 
- Enterprise-level, fully functional consumer mobile banking applications can be developed with Xamarin.
- In this solution, Xamarin.Forms provides 99.99 percent code sharing between Android and iOS. 
- Power BI can be used by other teams.
- Mobile DevOps, especially [Visual Studio Mobile Center](https://www.visualstudio.com/vs/mobile-center/), is a powerful tool for any mobile app.
- Xamarin Studio on Mac and emulators are a great way to develop and test applications easily. 

**Opportunities going forward:**

- Power BI Embedded is an essential tool for having quick dashboard reports to see analytic details of apps.
- Application Insights can be a tool for the API side in future projects for Burban Bank.
- The continuous integration and continuous delivery features of Team Foundation Server 2015 can be implemented into other projects within the bank.

## Additional resources ##

- [Power BI Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/) 
- [Xamarin Test Cloud](https://www.xamarin.com/test-cloud)
- [Xamarin Profiler](https://www.xamarin.com/profiler)
- [HockeyApp](https://azure.microsoft.com/en-us/services/hockeyapp)
- [Application Insights](https://azure.microsoft.com/en-us/services/application-insights)
- [Azure Notification Hubs](https://azure.microsoft.com/en-us/services/notification-hubs/)
- [Xamarin.Forms](https://www.xamarin.com/forms) 
- [Portable Class Library](https://msdn.microsoft.com/en-us/library/gg597391(v=vs.110).aspx)
- [MVVM Pattern](https://developer.xamarin.com/guides/xamarin-forms/xaml/xaml-basics/data_bindings_to_mvvm/)
- [The Xamarin Show: Getting Started with MVVM](https://blog.xamarin.com/the-xamarin-show-getting-started-with-mvvm/)
- [Add push notifications to your Xamarin.Forms app](https://docs.microsoft.com/en-us/azure/app-service-mobile/app-service-mobile-xamarin-forms-get-started-push)

## Demo of Burgan Bank Mobile App ##

<img src="{{ site.baseurl }}/images/burgan/demo.gif" alt="Burgan Bank Xamarin Mobile Application Architecture Diagram">

 
