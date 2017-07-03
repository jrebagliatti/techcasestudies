---
layout: post
title: "Using Desktop Bridge to bring Blizz to the Windows Store"
author: "Andreas Pohl"
author-link: "https://twitter.com/Annonator"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-07-03
categories: [Desktop Bridge]
color: "blue"
image: "images/teamviewer/blizz-tile.jpg" 
excerpt: With Desktop Bridge, TeamViewer was able to begin distributing its new Blizz team collaboration app through an additional channel, the Windows Store. 
language: [English]
verticals: [Telecommunications]
geolocation: [Europe]
---

TeamViewer wanted to publish its new Blizz application in the Windows Store as an additional distribution channel. The cross-platform client didn't target the Windows Store as a platform, so TeamViewer and Microsoft ported the app with the help of Desktop Bridge (code name Centennial).

**Core team:**

- Constantin Comendant – Software Engineer, TeamViewer
- Rainer Ruoff – DevOps Engineer, TeamViewer
- [Andreas Pohl](https://www.twitter.com/Annonator) – Technical Evangelist, Microsoft  
 
## Customer profile ##

Launched in 2005 and based in Germany, [TeamViewer](https://www.teamviewer.com/en/) focuses on cloud-based technologies to enable online support and collaboration in real time across the globe. People have collectively used TeamViewer technology in billions of instances in which distance and time would have otherwise prevented them from accomplishing their goals. TeamViewer believes that remote support, remote access, and online collaboration can help people by better integrating technology into their daily lives and creating new ideas.

TeamViewer has been installed on more than 1 billion devices (each device generates a unique ID). It creates 750,000 new IDs every day and it has more than 20 million devices online at any given time. According to TeamViewer, these numbers have led 90 percent of Fortune 500 companies to rely on it as their choice to bring colleagues together across all platforms and all devices.

## Problem statement ##

TeamViewer started developing [Blizz](https://www.blizz.com/en/), a new product for team collaboration, as a cross-platform application. They already had their TeamViewer product available as a Universal Windows Platform (UWP) application published in the Windows Store and wanted to publish their new product there as well. Because the development of Blizz had already started as a cross-platform application targeting Win32, we wanted to avoid implementing a new target and decided to convert the existing application with the help of Desktop Bridge. 

## Solution, steps, and delivery ##

TeamViewer planned to convert Blizz in a two-week sprint, but they only needed a day to set up Desktop Bridge and configure their continuous integration pipeline to adopt UWP as a new platform for Blizz.

During the conversion process, the team ran into some limitations that needed to be addressed to make Desktop Bridge work with Blizz.

### Auto Update ###

Blizz has a feature that can automatically update the application when a new version is available. In order to do this, the application needs elevated write access, which is not possible if you want to convert an application using Desktop Bridge. In this case, it wasn’t a problem to deactivate the Auto Update feature in the application because the Windows Store can update the UWP application of its users.

This way the functionality of Auto Update was still in place but the application wasn’t responsible for it anymore.

### Plug-ins ###

Another challenge was the plug-in capability of Blizz. With this you can add any plug-ins to Blizz to enhance the capabilities of the application. The plug-in functionality is implemented in a way that the application downloads the plug-ins and starts using them.

Because Blizz doesn’t have elevated write access as a UWP that has been generated with Desktop Bridge, the team needed to deactivate this feature in the first iteration. A look at the [Desktop Bridge documentation](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-prepare) indicates where the limitations of Desktop Bridge are today and gives a hint at how to solve these kinds of problems in your app. In this case, the team would need to change the behavior of the application, which they decided against because they wanted to get into the Windows Store as soon as possible.

### Integration into Jenkins ###

TeamViewer has a modern and agile process that includes DevOps practices such as continuous integration. Because of this, it was very important to automate the conversion with Desktop Bridge and the publication in the store.

Integration of Desktop Bridge into Jenkins was easy. The job needs to be run on a Windows 10 PC with the latest creators update for the most recent version of Desktop Bridge. Everything else is handled by a simple PowerShell script, which looks like this:

```powershell
#
# convert Blizz setup to uwp application
#
$WorkSpace="$env:WORKSPACE"
$SetupName="Blizz_Setup.exe"
$SetupDir="$WorkSpace\setup"
$SetupPath = "$SetupDir\$SetupName"
$AppxOutDir = "$WorkSpace\appx"

$TargetDirRoot = "\\some\path\to\Release Candidate Centennial appx"

# retrieve version information from setup
$FileVersion   =(Get-Item $SetupPath).VersionInfo.FileVersion
$ProductVersion=(Get-Item $SetupPath).VersionInfo.ProductVersion

$TargetDir = "$TargetDirRoot\$ProductVersion"

$ArgList = "-Installer " + "`"$SetupPath`" "`
+ "-Destination " + "`"$AppxOutDir`" "`
+ "-Version " + "$FileVersion "`
+ "-PackageName TeamViewer.BlizzMeeting "`
+ "-PackageDisplayName `"Blizz`" "`
+ "-Publisher `"publisherKEY`" "`
+ "-PackagePublisherDisplayName `"TeamViewer`" "`
+ "-MakeAppx -Verbose"

# delete old package conversions
Remove-Item "$AppxOutDir" -Recurse -Force

# call the desktop app converter 
$proc = Start-Process -Verbose -Wait -NoNewWindow -PassThru -FilePath DesktopAppConverter.exe -Argumentlist "$ArgList"

# copy results to storage
Copy-Item -Recurse -Force -Path $AppxOutDir -Destination "$TargetDir"
Copy-Item -Recurse -Force -Path $SetupDir   -Destination "$TargetDir"

# delete Blizz setup
Remove-Item $SetupDir -Force -Recurse

exit $proc.ExitCode
```  
 
## Conclusion ##

Overall, the process with Desktop Bridge is really easy—it integrates great into already established processes. The most important part is to have a look at the [Pre-Check List](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-prepare) for Desktop Bridge to discover possible problems as early as possible.

![The Team]({{ site.baseurl }}/images/teamviewer/theteam.jpg)

<br/>

With Desktop Bridge, TeamViewer was able to distribute Blizz through an additional channel, the [Windows Store](https://www.microsoft.com/store/apps/9nvw0nzvl737), which is essential to a newly launched product.

For the future, the team is looking into adopting new possibilities such as notifications that are available with UWP. 

>“The Blizz online meeting app download from the trusted Windows 10 app store continues TeamViewer´s tradition of offering secure, reliable meeting technology—with easy access for all.”
>
>— Holger Jung, Product Owner, TeamViewer

## Additional resources 

- [Desktop Bridge](https://developer.microsoft.com/en-us/windows/bridges/desktop)
- [Intro to the Universal Windows Platform](https://docs.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide)
- [PowerShell](https://msdn.microsoft.com/powershell)



