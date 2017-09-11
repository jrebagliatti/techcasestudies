---
layout: post
title: "Bringing Musixmatch to the Windows Store by using Desktop Bridge"
author: "Marcello Marchetti"
author-link: "https://twitter.com/Marcello_twit"
#author-image: "{{ site.baseurl }}/images/profile-image.jpg"
date: 2017-03-23
categories: [Desktop Bridge]
color: "blue"
image: "images/MusiXmatch/feat_image01.png"
excerpt: Musixmatch, one of the most popular lyrics apps worldwide, leveraged Desktop Bridge to bring their Win32 application to the Windows Store. The app was developed with Electron; read on for an explanation of the conversion process.
language: [English]
verticals: [Entertainment]
geolocation: [Europe]
sticky: false
---

Today, Windows 10 runs on more than 400 million PCs around the world, and it aims to reach 1 billion in 2018. This is a huge user base, and the good news is that there is a simple and powerful way to reach these users in a fast and reliably way: the Windows Store.

The Windows Store is not just a marketing showcase; it is also a deployment tool that can help to manage installing, updating, and uninstalling application, without the “DLL hell” that was well-known to all who had to deploy Win32 applications.

Thanks to the Microsoft AppConsult team, in collaboration with the DX team, we were able to bring the Musixmatch Win32 application to the Windows Store by using Desktop App Converter.
  
Core team:

- Francesco Delfino ([@delfinof](https://twitter.com/delfinof)) – Co-founder, Musixmatch
- Marcello Marchetti ([@Marcello_twit](https://twitter.com/Marcello_twit)) – Technical Evangelist, Microsoft
- Matteo Pagani ([@qmatteoq](https://twitter.com/qmatteoq)) – Windows AppConsult Engineer, Microsoft

## Customer profile ##

[Musixmatch](https://www.musixmatch.com/) is the world’s largest lyrics platform with millions of lyrics available online and more than 50 million users on various platforms.

![Musixmatch website]({{ site.baseurl }}/images/MusiXmatch/image01.png)

They have worldwide agreements with Sony/ATV, EMI Publishing, Warner/Chappell Music, Universal Music Publishing Group, BMG Chrysalis, Kobalt Music, Spirit Music Group, Harry Fox Agency, peermusic, Disney Music Publishing, and several others.

Musixmatch is a lyrics application that leverages the background processes included in two of the most popular music players (Spotify and iTunes) to retrieve the following information:

- The currently playing song
- The exact timing of the playback

Thanks to this information, the application can download the proper lyrics from the Musixmatch database and keep them in sync with the playing track.

## Problem statement ##

For Windows, Musixmatch had only a classic Win32 application available as a standard .msi installer on their official website. The Win32 application is not the best experience for Windows 10 users, but they would not want to rewrite all the code to create a new Universal Windows Platform (UWP) app to leverage Windows Store capabilities.

The UWP platform offers some interesting features that could improve the user experience, like toast notifications and Cortana integration. Furthermore, 90 percent of the Musixmatch Windows user base is on Windows 10. So Musixmatch worked with the Microsoft AppConsult team to accelerate the conversion process. From the customer perspective, Desktop App Converter was the best choice in terms of the effort-to-outcome ratio.

## Solution, steps, and delivery ##

The application has been developed with [Electron](http://electron.atom.io/), an open-source framework that supports the development of cross-platform desktop applications using web technologies (HTML, CSS, and JavaScript).

Thanks to a set of advanced APIs, Electron can perform operations that typically belong to the traditional desktop world (writing and reading files, getting information about the running processe, reading from and writing to the system registry, and so on) using JavaScript.

The conversion from a desktop app to a Desktop Bridge app was facilitated by an open-source project created by [Felix Riesberg](https://felixrieseberg.com/), who previously worked in Microsoft in the open-source area and is a Senior Desktop Engineer in the Slack team (which is an application built with Electron).

This project, named [electron-windows-store](https://github.com/felixrieseberg/electron-windows-store), is a command-line tool based on PowerShell, which works in a similar way to the Desktop App Converter provided by Microsoft: The only difference is that, instead of requiring as input a traditional installer, it requires a packaged Electron app—in this case, the Musixmatch app.

From a technical point of view, the electron-windows-store tool leverages the Desktop App Converter and the Containers feature added in Windows 10 Anniversary Update. When it starts, it packages the Electron app in a .zip file and then performs an installation inside a Windows container. As a result, you get an app package with the original Electron app plus all the other files that are required by a Windows Store app, such as the manifest and the assets for the various tiles and icons used in the system.

In the end, the converter takes care of turning the app package into an AppX file using the makeappx.exe tool, which is included in the Windows 10 SDK. The final AppX package can either be signed with a custom certificate (for sideloading purposes) or submitted to the Windows Store.

<img alt="Musixmatch Desktop in the Windows Store" src="{{ site.baseurl }}/images/MusiXmatch/image02.png" width="600">

Thanks to this tool, turning the Musixmatch desktop version into a package that Musixmatch can submit to the Windows Store has been a straightforward operation. From a technical point of view, in fact, the Musixmatch app was already following all the Windows development best practices (it doesn’t require a user to be admin to run, it doesn’t try to write data in the installation folder, and so forth), so the conversion using Desktop Bridge didn’t pose any critical issues.

![Musixmatch converted application]({{ site.baseurl }}/images/MusiXmatch/image03.png)

## Conclusion ##

Thanks to Desktop App Converter, Musixmatch achieved several goals:

- Drive users to the Windows Store using the Microsoft badge on their official website

  <img alt="Windows Store badge on Musixmatch site" src="{{ site.baseurl }}/images/MusiXmatch/image04.png" width="570">

- Simplify installation and update process management
- Increase the number of downloads up to 20 percent
- Give a more trustworthy source to their users
- Open the way to add new features and provide a richer user experience

## Additional resources ##

- Release announcement on Musixmatch Blog: [Meet the new Musixmatch Desktop App](https://blog.musixmatch.com/meet-the-new-musixmatch-desktop-app-741f1b88291e)
- Desktop Bridge: [https://developer.microsoft.com/en-us/windows/bridges/desktop](https://developer.microsoft.com/en-us/windows/bridges/desktop)
- Electron: [http://electron.atom.io/](http://electron.atom.io/)
- electron-windows-store: [https://github.com/felixrieseberg/electron-windows-store](https://github.com/felixrieseberg/electron-windows-store)
