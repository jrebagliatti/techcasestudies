---
layout: post
title: "Using Desktop Bridge, Saito Kikaku converts Hidemaru Editor to UWP app"
author: "Shozo Arai"
author-link: "https://blogs.msdn.microsoft.com/shozoa/"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-07-26
categories: [Desktop Bridge]
color: "blue"
image: "images/SaitoKikakuHidemaru/saitokikaku-tile.png" 
excerpt: Saito Kikaku wanted to meet the demand for a Windows Store version of its successful text editor software. With Desktop Bridge and a lot of communication, Saito Kikaku and Microsoft worked through the conversion process. 
language: English
verticals: ["Retail & Consumer Goods"]
geolocation: [Asia]
---


Hidemaru Editor, the leading shareware in the Japanese market, is a text editor that provides various programming features such as macro, debugger, and external commands. It has many loyal users and is influential in many developer communities.  

Microsoft worked with a team of Hidemaru Editor developers to convert their app to a Universal Windows Platform (UWP), using the [Desktop Bridge](https://developer.microsoft.com/en-us/windows/bridges/desktop). All work by the Microsoft team was done remotely. 

<br/>

<img alt="Hidemaru Editor public" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/SaitoKikaku.png" width="600">

<br/>

**The core team:**

- Takashi Yamamoto – Senior Developer, Saito Kikaku
- Hideo Saito – CEO, Saito Kikaku
- Shozo Arai – Technical Evangelist, Microsoft Japan
- Kazuki Tsuguma - App Consultant, Microsoft Japan

<br/>

*Takashi Yamamoto, Saito Kikaku project team member*

<img alt="Saito Kikaku team" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/Yamamoto2-crop.jpg" width="300">


*The Microsoft team: Shozo Arai (left) and Kazuki Tsuguma*

<img alt="Microsoft teams" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/MicrosoftTeam.JPG" width="500">

## Customer profile ##

[Saito Kikaku Ltd](http://hide.maruo.co.jp/company.html) is a Japan-based company founded in 1993 by Hideo Saito, a famous Japanese shareware developer. The company's flagship product is [Hidemaru Editor](http://hide.maruo.co.jp/software/hidemaru.html), a widely used text editor in Japan. The software, which runs on Windows, has many sophisticated macro functions and commands that support C and Java programming. This software is known for its great usability.

<img alt="Development Environment" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/SaitoKikaku3.JPG" width="645">

<br/>

*The Saito Kikaku offices*

<img alt="Sabae 1, Fukui" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/SaitoKikaku1.JPG" width="320">


**Hidemaru Editor short history:**

- 1992: First version of Hidemaru Editor (16-bit) released for Windows 3.1. 

  <img alt="Hidemaru Icon" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/HidemaruIcon.png" width="50" >

- 1995: Hidemaru Editor 1.05 (32-bit) released for Windows 95. Hidemaru Editor 2.0 released.
- 1999: Hidemaru Editor 3.0 released. 
- 2003: Hidemaru Editor 4.0 released. 
- 2005: Hidemaru Editor 5.0 released.
- 2006: Hidemaru Editor 6.0 released.
- 2007: Hidemaru Editor 7.0 released.
- 2010: Hidemaru Editor 8.0 released. Added 64-bit support. 
- 2017: Latest version is 8.7.1. 

<br/>

*The offices where Hidemaru Editor was first developed*

<img alt="Sabae 2, Fukui" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/SaitoKikaku2.JPG" width="320">


## Problem statement ##

Hidemaru Editor has various distribution channels and two unique characteristics. First, as shareware, it permits durable use. It also has a paid (licensed) version. But there has been a licensing problem because of casual hacking. Because Hidemaru Editor has so many users, a licensing change is difficult. Saito Kikaku is looking for a new distribution channel and they decided to distribute the editor on the Windows Store.  

Multiple technical challenges were discovered during the initial discussions:

- Licensing: coexistent dual license (Windows desktop and Windows Store). 
- Settings information export and import feature.
- Macro feature.

## Solution, steps, and delivery ##

To resolve these issues, we took the following steps:

1. Discuss issues related to converting Hidemaru Editor to an app package (.appx).
2. Discuss issues related to running a UWP app of Hidemaru Editor.
3. Publish a UWP app to the Windows Store.

### 1. Discuss issues related to converting Hidemaru Editor to an app package ###

These are some of the questions and answers addressed in this step.  

- **Can we use a coexistent dual license?**  

  No, you can use the store licensing only, so you should consider changing the app licensing. 
  
  As a result, Saito Kikaku decided to support the store licensing only.

- **How do you create the app package?**  
  
  There are two ways to create an app package. One is to use the Desktop App Converter. Based on our investigation, they could create an app package using `hmsetup` (Hidemaru Editor’s custom setup program). For more information, see [Package an app using the Desktop App Converter](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter).  
  
  ```batch
  DesktopAppConverter.exe -Installer ".Input\Hmsetup.exe" -InstallerArguments "/h" -InstallerValidExitCodes 1 -Destination "." -AppExecutable "C:\Program Files\Hidemaru\Hidemaru.exe" -PackageName "Hidemaru" -Publisher "CN=SAITO-KIKAKU" -Version 0.0.1.0" -MakeAppx -Verbose
  ```  
  
  Another way to create an app package is manually. For an explanation, see [Package an app manually](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-manual-conversion).

- **How do you use in-app purchase and trial?**  

  See the information at [In-app purchases and trials](https://docs.microsoft.com/en-us/windows/uwp/monetize/in-app-purchases-and-trials). We provided [IAP-APIs sample code](https://github.com/shozoarai/DesktopBridgeSample/tree/master/Samples/StoreTestHelper).

- **How do you use registry?**  
  
  Your app modifies HKEY_CURRENT_USER Hive, but cannot modify HKEY_LOCAL_MACHINE Hive. This behavior is described in [Prepare to package an app (Desktop Bridge)](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-prepare). Saito Kikaku decided to create new export and import features because the original features used registry settings. 

- **How do you use Windows Runtime API with minimum impact to existing code?**  

  There are two methods. One is to use another process, which is written in C# and co-works with the main program. This C# program encapsulates Windows Runtime API code. Another is to use the Win32 dynamic-link library (DLL) to encapsulate Windows Runtime API code. See the [DLL sample](https://github.com/shozoarai/DesktopBridgeSample/tree/master/Samples/WpfAppUsingWinRT).

### 2. Discuss issues related to running a UWP app of Hidemaru Editor ###

These are some of the issues and solutions addressed in this step.

- **Issue: What is a countermeasure against casual hacking?**

  Hidemaru Editor is deployed using XCOPY and then it launches a clone executable. There is a specific behavior for either process type UWP app or desktop app.
  
  How do you determine process type? We provided [sample code](https://github.com/shozoarai/DesktopBridgeSample/tree/master/Samples/UwpProcessHelper). Saito Kikaku implemented it and a new feature for a coexistent desktop app.  
  
  <img alt="new feature" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/NewFeatures.png" width="645">

<br/>

- **Issue: How do you show the same icon of the desktop app on the taskbar?**

  <img alt="don't show same icon on the taskbar" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/DesktopIcon.PNG" width="200">

  Our investigation found this is related to the plated icon assets because the taskbar uses the unplated icon assets. Hence, adding unplated icon assets worked well. See the information in [Guidelines for tile and icon assets](https://docs.microsoft.com/en-us/windows/uwp/controls-and-patterns/tiles-and-notifications-app-assets). 
  
  We provided information on [How to use file extension settings](https://github.com/shozoarai/DesktopBridgeSample/blob/master/Doc/HowToUseFileExtension.md) to include unplated icon assets. Also, we provided information on [How to create PRI resources](https://github.com/shozoarai/DesktopBridgeSample/blob/master/Doc/HowToCreatePriResources.md).
 
- **Issue: Google IME was aborted.**  

  This is an issue with [Google IME](https://en.wikipedia.org/wiki/Google_IME). See the information at the [Google IME Help Forum](https://productforums.google.com/forum/#!topic/ime-ja/7o8SEmVmcHQ;context-place=forum/ime-ja).
 
### 3. Publish a UWP app to the Windows Store ###

Special thanks to Kazuki Tsuguma (Microsoft App Consultant), who helped to publish the Windows app. He taught us the publishing process and the package is now available on the Windows Store. During the publishing process, we gave advice on a few questions about certificate criteria.  

<img alt="WindowsStore" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/WindowsStore.png" width="400">

<br/>

<img alt="App1" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/HidemaruApp1.png" width="400"><img alt="App2(New Feature)" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/HidemaruApp2.png" width="250"> 

<br/>

<img alt="App3(InAppPurchase)" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/HidemaruApp4.png" width="300"><img alt="App4(Taskbar)" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/HidemaruApp3.png" width="300"> 


## Opportunities going forward ##

Saito Kikaku now has the app ready for the Windows Store, providing them with a new distribution channel. Saito Kikaku participated in a Windows 10 compatibility program and received a Windows 10 Compatible logo.

<br/>

<img alt="Windows10 Compatible Logo" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/Windows10CompatibleLogo.png" width="500">  

<br/>

They also were able to add the Windows Store badge.  

<img alt="Store Badge" src="{{ site.baseurl }}/images/SaitoKikakuHidemaru/WindowsStoreBadge.png" width="500">  

<br/>
 
## Conclusion ##

Saito Kikaku successfully converted the Hidemaru Editor app. As a result, they expect to have a broader customer reach with the Windows Store and enhanced usability with additional functions. Here is a quote from our customer: 

>"I'm thankful for your support. I was able to publish the app in the Windows Store via your support. ... Hidemaru Editor had a few issues such as an app update mechanism and purchase mechanism. But these issues were resolved by the Windows Store. I received deep support from Microsoft, such as 'how to edit appxmanifest,' 'testing our apps,' and 'how to use IAP API.' The Microsoft team helped convert and put the app onto the Windows Store. Many thanks to the Microsoft team."
>
>— Takashi Yamamoto, Senior Developer, Saito Kikaku  

## Additional resources ##

Resources in this article:

- [Desktop Bridge](https://developer.microsoft.com/en-us/windows/bridges/desktop)
- [Desktop App Converter](https://www.microsoft.com/en-us/store/p/desktop-app-converter/9nblggh4skzw)
- [Package an app using the Desktop App Converter](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter)
- [Package an app manually](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-manual-conversion)
- [In-app purchases and trials](https://docs.microsoft.com/en-us/windows/uwp/monetize/in-app-purchases-and-trials)
- [IAP-APIs sample code](https://github.com/shozoarai/DesktopBridgeSample/tree/master/Samples/StoreTestHelper)
- [Prepare to package an app (Desktop Bridge)](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-prepare)
- [DLL sample](https://github.com/shozoarai/DesktopBridgeSample/tree/master/Samples/WpfAppUsingWinRT)
- [UWP Process Helper sample code](https://github.com/shozoarai/DesktopBridgeSample/tree/master/Samples/UwpProcessHelper)
- [Guidelines for tile and icon assets](https://docs.microsoft.com/en-us/windows/uwp/controls-and-patterns/tiles-and-notifications-app-assets)
- [How to use file extension settings](https://github.com/shozoarai/DesktopBridgeSample/blob/master/Doc/HowToUseFileExtension.md)
- [How to create PRI resources](https://github.com/shozoarai/DesktopBridgeSample/blob/master/Doc/HowToCreatePriResources.md)

Other resources:

- [Hidemaru Editor in the Windows Store](https://www.microsoft.com/store/apps/9njg526bqn7t)
- [Hidemaru Editor store version](http://hide.maruo.co.jp/software/hidemaru_appx.html)
- [Desktop Bridge sample](https://github.com/shozoarai/DesktopBridgeSample)

