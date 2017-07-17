---
layout: post
title: "Sunburned Games uses Desktop Bridge to convert role-playing game, publish to Windows Store"
author: "James Earle"
author-link: "https://twitter.com/ItsJamesIRL"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-06-06
categories: [Desktop Bridge]
color: "blue"
image: "images/WhaleRoad/video_thumb.png"
excerpt: Using Desktop Bridge made it easy for this small studio to avoid inconvenient upgrades and deploy 'The Great Whale Road' to the Windows Store, greatly increasing its potential audience.
language: [English]
verticals: [Entertainment]
geolocation: [Europe]
sticky: true
---

Through the Windows Store, developers have access to an array of integrated Windows features they can leverage within their application. The creators at Sunburned Games are positioning themselves to take advantage of these features by putting their role-playing game *The Great Whale Road* into the Windows Store. In this way, they benefit from the increased user outreach, with more than 400 million PCs running Windows 10 globally, as well as the ability to update their application easily through the store.

With the [Desktop Bridge](https://developer.microsoft.com/en-us/windows/bridges/desktop) technology, Sunburned Games was able to deploy its traditional Win32-based game into the Windows Store without costly and time-consuming upgrades and source code changes, benefiting its developers as well as its users on Windows.
 
**Core team:**

- Joachim Sammer – Cofounder, CEO, Writer, Sunburned Games
- [James Earle](https://twitter.com/ItsJamesIRL) – Technical Evangelist, Microsoft
- [Jerry Nixon](https://twitter.com/JerryNixon) – Technical Evangelist, Microsoft

## Customer profile ##

[Sunburned Games](http://sunburnedgames.com/) is a new independent studio that develops its own PC games. Based in Valencia, Spain, Sunburned Games is small and self-funded. Its vision is to create handcrafted gaming experiences with historical authenticity and strong narratives.

![The Great Whale Road Homepage]({{ site.baseurl }}/images/WhaleRoad/website.PNG)

The studio was founded by Joachim and Birgit Sammer after they worked in London for nearly 10 years. The first developers and artists joined the studio in April 2015 and the team has grown to eight members over the last year.

*The Great Whale Road* is a historical game set in Europe, 650 AD. This time was chosen because of its historical significance. Much of the game is accurate as far as real events that occurred during this time, and because the team contains some well-versed historians (including Joachim), the lore is thorough and well-written.

## Problem statement ##

Sunburned Games is looking for as wide an audience as possible. The studio initially released on Steam and wanted to expand further to the 400 million Windows 10 users. This is the added value of the Windows Store. Beyond integrated Windows features, the large user base provides the developers with the increased outreach to all Windows 10 users around the world.

However, *The Great Whale Road* is not written as a Universal Windows Platform (UWP) application; it is in Unity. This meant Sunburned Games had a choice:

- Deploy as a UWP through Unity, which would require a version upgrade as well as source code changes.
- Use the Desktop Bridge, allowing them to wrap their code as-is and deploy to the Windows Store sooner. 

Although written in Unity, the game is not in the most recent version. Because of this, deploying to the store as a UWP would require a Unity upgrade. But no update installer comes with Unity. A version upgrade would require complete uninstallation of Unity on every machine Sunburned Games uses for development, then downloading and installing the newest version. In addition to this process, upgrades can cause discrepancies in user scripts, making them unusable. 

Deploying to the Windows Store using the Desktop Bridge would wrap up *The Great Whale Road* as-is. 

An upgrade was unacceptable to Sunburned Games because of the increased cost in software, labor, and time to deploy. This made the Desktop Bridge the obvious solution, so the team chose to use it to see if their game could be converted.

It is notable that any application using the Desktop Bridge will run only on the desktop version of Windows 10. For Sunburned Games, this choice was an informed one, because *The Great Whale Road* is not meant for mobile devices at this time.

## Solution, steps, and delivery ##

Sunburned Games worked with Microsoft through the conversion process of *The Great Whale Road*.

When performing manual conversion, the files need to be packaged into a Windows Store format called an AppX. Without touching the original codebase, developers used `MakeAppx.exe` provided in the Windows 10 SDK. This required putting the program's associated files and assets into a single directory and creating an `AppxManifest.xml` describing their relationships, or use the one built by the Desktop App Converter (DAC). The manifest points to the application executable that the AppX will run.

<img alt="The Great Whale Road in the Steam store" src="{{ site.baseurl }}/images/WhaleRoad/steam.PNG" width="900">

<br/>

<img alt="The Great Whale Road in the Windows Store" src="{{ site.baseurl }}/images/WhaleRoad/win-store.PNG" width="900">


Once this has been done, an AppX file is created. The developer signs the AppX so it can be sideloaded for testing, or deployed directly into the Windows Store. Signing is not required to simply publish to the Windows Store because the store signs it for you.

The initial conversion used the DAC to build the original registry and virtual file system, but it wasn't perfect. During testing, the application would fail and it was difficult to debug because the installation folder is read-only and the logs were attempting to write to that directory. Rather than changing the code of *The Great Whale Road*, we were able to run the executable outside of the AppX by unzipping it and running the executable directly. This allowed the log files to be written to the restricted folder. Those logs told us that the DAC had renamed a shader file by replacing spaces in the name with `%20`. We were able to manually rename the file, repackage the AppX using `MakeAppx.exe`, and the game was ready to play.

## Conclusion ##

<img alt="The Great Whale Road as a UWP App" src="{{ site.baseurl }}/images/WhaleRoad/start-screen.png" width="700">

<br/>

<img alt="The Great Whale Road as a UWP App" src="{{ site.baseurl }}/images/WhaleRoad/gameplay.png" width="700">


>"We were pleasantly surprised with the straightforward conversion process and how few code changes were required to get 'The Great Whale Road' published into the Windows Store. We are excited to introduce our game to Windows 10 users."
>
>— Joachim Sammer, Sunburned Games

Thanks to the Desktop Bridge, Sunburned Games brought its Unity game to the Windows Store without the need for large upgrades or changes to the existing codebase. Sunburned Games did not need to create a separate UWP application, and is now selling *The Great Whale Road* in the Windows Store. It can be [downloaded here](https://www.microsoft.com/store/apps/9nwj1sb61lws).

## Additional resources ##

- [About Sunburned Games](http://sunburnedgames.com/press/)
- [Desktop Bridge](https://developer.microsoft.com/en-us/windows/bridges/desktop)
- [Manual Desktop Conversion](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-manual-conversion)
- [Windows 10 SDK](https://developer.microsoft.com/en-US/windows/downloads/windows-10-sdk)
