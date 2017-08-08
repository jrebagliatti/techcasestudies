---
layout: post
title: "Dreadlocks brings its Dex game to the Windows Store with Desktop Bridge"
author: "Martin Simecek"
author-link: "https://twitter.com/deeedx"
date: 2017-08-08
categories: [Desktop Bridge]
color: "blue"
image: "images/Dreadlocks/dex-store-tile.png" #must be 440px wide
excerpt: Developers can use the Desktop Bridge to convert and publish their Win32 apps to the Windows Store. Learn the process of converting a Unity game using Advanced Installer, adding Live Tile updates to it, and publishing to the store.
language: English
verticals: Entertainment
geolocation: Europe
---

Microsoft partnered with Dreadlocks Ltd to help the video game producer bring its *Dex* game to the Windows Store and to enhance it with Universal Windows Platform (UWP) features. In this project, we demonstrated that developers can use the Desktop Bridge to convert and publish their Win32 apps to the Windows Store and that it is not limited to traditional applications—even PC games can benefit from it. 

This article describes the process of converting a Unity game using Advanced Installer, adding Live Tile updates, and publishing to the Windows Store.

**Core team:**

* [Martin Šimeček](https://twitter.com/deeedx) – Technical Evangelist, Microsoft
* Michal Červenka – CEO, Dreadlocks

**Key technologies:**

* [Unity 3D](https://unity3d.com/) (game engine)
* [Desktop Bridge](https://developer.microsoft.com/en-us/windows/bridges/desktop)
* [UWP APIs](https://docs.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide)
* [Windows Store](https://developer.microsoft.com/en-us/store/publish-apps)
* [Advanced Installer](http://www.advancedinstaller.com/desktop-bridge.html)

## Customer profile

[Dreadlocks Ltd](http://en.dreadlocks.cz) is a video game producer based in Prague, Czech Republic. The company was officially formed in 2011. Its most recent release is [Dex, an action role-playing game](http://en.dreadlocks.cz/games/dex/), which was successfully funded through Kickstarter (pledged £30,647 of a £14,000 goal) and is available for PC, Xbox One, PS4, PS Vita, Linux, and macOS. The total number of downloads on PC has exceeded 150,000.

Dreadlocks' first game, *Rune Legend*, was exclusive for Windows Phone 7. Dreadlocks is currently working on a new horror game, *Ghost Theory*, with virtual reality support.

[Dex in the Windows Store](https://www.microsoft.com/store/apps/9nblggh5p59l)

## Problem statement

Dex is available on various gaming platforms, including PC, through Steam and Xbox One. One channel was missing, though: the Windows Store. Migration to full UWP would be preferable, but was too complicated at the time due to lack of support in third-party libraries.

Dreadlocks also wanted to make use of some out-of-game engagement techniques, such as Live Tiles or Xbox Live achievements, which were missing on the PC version.

Another problem that comes with a standard MSI-based setup is complex update distribution. The Windows Store mechanism is much smoother and offers additional functionality: package flighting, promotional code distribution, time-limited special offers, and so on.

## Solution, steps, and delivery

With the goal of getting Dex to the Windows Store in mind, we started the project by evaluating whether it would be possible to use the Desktop Bridge. We then thought about enhancement options and chose Live Tiles as the proof of feasibility. We were able to successfully publish the game after going through the following process:

![Process]({{ site.baseurl }}/images/Dreadlocks/process.png)

<br/>

Details of each step are described further in this report.

### Generating an app package

The most important part of this solution—packing the game into an app (.appx) archive—was surprisingly easy and seamless. There are [several ways to convert](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-root#convert) the Win32 app to .appx, but Dreadlocks already had a project in Advanced Installer to generate the MSI/EXE installer, so they were familiar with the tool and it was natural for them to use it for Desktop Bridge as well.

Advanced Installer provides a manifest interface that does not differ much from what Visual Studio offers:

![Advanced Installer - Package Information]({{ site.baseurl }}/images/Dreadlocks/AI-1-package-information.jpg)

<br/>

![Advanced Installer - Application Details]({{ site.baseurl }}/images/Dreadlocks/AI-2-application-details.jpg)

<br/>

![Advanced Installer - Visual Assets]({{ site.baseurl }}/images/Dreadlocks/AI-3-visual-assets.jpg)

<br/>

![Advanced Installer - Capabilities]({{ site.baseurl }}/images/Dreadlocks/AI-4-capabilities.jpg)

### Signing

For store distribution, the app package doesn't have to be signed before uploading to the Dev Center portal because the publishing process handles it for developers. To test the package locally, though, it needs to be signed with a trusted certificate. When it isn't, Windows doesn't allow installation:

![Untrusted Certificate]({{ site.baseurl }}/images/Dreadlocks/untrusted-cert.png)


>This message basically states that a trusted certificate is missing for this package. Specifically, the root cert is not trusted.

We wanted to verify that the generated .appx file worked before enhancing it and submitting it to the store. Because Advanced Installer wasn't able to sign the package for us, we did it manually.

First we created a certificate, using the **makecert.exe** tool:

```
makecert.exe -r -h 0 -n "CN=Martin, O=MartinOrg, L=Prague, S=Czech Republic, C=CZ" -eku 1.3.6.1.5.5.7.3.3 -pe -sv dex.pvk dex.cer
```

<br/>

Then we used **pvk2pfx.exe** to combine *dex.pvk* (private key) and *dex.cer* (certificate) files into a PFX certificate archive:

```
pvk2pfx.exe -pvk dex.pvk -spc dex.cer -pfx dex.pfx
```

<br/>

Finally, the app package, which was created by the Advanced Installer, was signed using **signtool.exe**:

```
signtool sign /a /v /fd SHA256 /p pass /f "dex.pfx" "BuildUwpAppXSetupFiles/Dex.appx
```

<br/>

>All of the tools are part of Windows SDK and can be found at `C:\Program Files (x86)\Windows Kits\10\bin\x64\`.

<br/>

To make the certificate trusted to the root, we installed it to the Local Machine cert store:

<img alt="Import certificate" src="{{ site.baseurl }}/images/Dreadlocks/cert-import1.png" width="500">

<br/>

Then we placed it in the Trusted Root Certification Authorities store:

![Trusted Root Authority]({{ site.baseurl }}/images/Dreadlocks/cert-import2.png)

<br/>

*This approach is valid for quick testing with a certificate you have created on your own. It's not a good security practice to install unknown certificates as Trusted Root Authority!*

### Initial tests

With the app package ready and signed for sideloading, we verified that the game worked fine. Specifically, that:

* It runs when started from the Start menu.
* It runs in multiple instances.
* Xbox One controller works.
* Saving and loading games work.
* The .appx version doesn't interfere with the Steam version already installed.
* It's possible to uninstall it cleanly.

### Live Tiles

After the initial testing, it was time to begin enhancing the game with UWP features—Live Tiles, specifically. As an entry to the Live Tiles world, we chose basic [periodic notifications](https://docs.microsoft.com/en-us/windows/uwp/controls-and-patterns/tiles-and-notifications-periodic-notification-overview), which require no change in the game's code, but can still be useful as a marketing channel—showing banners on what's new with the game (such as update coming, new items, or blog post).

![Tile Architecture]({{ site.baseurl }}/images/Dreadlocks/tile-architecture.png)


To enable periodic notifications, we needed to do two things:

* Change AppxManifest to include the `<uap:LockScreen>` element.
* Upload an XML file with tile content specification to a web-accessible location.

*AppxManifest.xml*:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Package IgnorableNamespaces="uap rescap" xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10" xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10" xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities">
  <Identity Name="com.dreadlocks.dex" Version="5.3.0.0" ProcessorArchitecture="x86" Publisher="CN=[CN-ID]"/>
  <Applications>
    <Application Id="com.dreadlocks.dex" EntryPoint="Windows.FullTrustApplication" Executable="AI_STUBS\AiStub.exe">
      <uap:VisualElements AppListEntry="default" Description="Dex is a 2D action RPG set in a cyberpunk open-world, with a focus on exploration and non-linear gameplay." DisplayName="Dex - Enhanced Version" BackgroundColor="transparent" Square150x150Logo="Assets\Medium150x150Logo.png" Square44x44Logo="Assets\Tiny44x44Logo.png">
        <uap:InitialRotationPreference>
          <uap:Rotation Preference="landscapeFlipped"/>
          <uap:Rotation Preference="landscape"/>
        </uap:InitialRotationPreference>
        <uap:DefaultTile Square71x71Logo="Assets\Square71x71Logo.png" ShortName="Dex" Square310x310Logo="Assets\Square310x310Logo.png" Wide310x150Logo="Assets\Wide310x150Logo.png">
          <uap:ShowNameOnTiles>
            <uap:ShowOn Tile="square150x150Logo"/>
            <uap:ShowOn Tile="wide310x150Logo"/>
            <uap:ShowOn Tile="square310x310Logo"/>
          </uap:ShowNameOnTiles>
          <uap:TileUpdate Recurrence="halfHour" UriTemplate="https://[domain]/Dex-Store/livetile.xml"/>
        </uap:DefaultTile>
        <uap:SplashScreen Image="Assets\Image.png"/>
        <uap:LockScreen BadgeLogo="Assets\BadgeLogo.png" Notification="badge"/>
      </uap:VisualElements>
    </Application>
  </Applications>
  <Resources>
    <Resource Language="en-US"/>
  </Resources>
  <Capabilities>
    <rescap:Capability Name="runFullTrust"/>
    <Capability Name="internetClient"/>
  </Capabilities>
  <Properties>
    <Logo>Assets\Square50x50.png</Logo>
    <PublisherDisplayName>Dreadlocks Ltd</PublisherDisplayName>
    <DisplayName>Dex</DisplayName>
    <Description>Dex is a 2D action RPG set in a cyberpunk open-world, with a focus on exploration and non-linear gameplay.</Description>
  </Properties>
  <Dependencies>
    <TargetDeviceFamily MaxVersionTested="10.0.15063.0" MinVersion="10.0.14393.0" Name="Windows.Desktop"/>
  </Dependencies>
</Package>
```

<br/>

The most important piece is the `TileUpdate` element:

```xml
<uap:TileUpdate Recurrence="halfHour" UriTemplate="https://[domain]/Dex-Store/livetile.xml"/>
```

<br/>

This line specifies that Windows will check every half hour for new tile content and change it accordingly. If the URL is not reachable at the time, Windows will skip this occurrence and try again in 30 minutes.

>What's very important—and where we spent some time debugging and comparing two manifest files side by side—is that even though we were using the *runFullTrust* capability, we also needed to explicitly declare the **internetClient** capability. Otherwise, notifications didn't work.

The *livetile.xml* file is very simple:

```xml
<tile>
	<visual>
		<binding template="TileWide310x150ImageAndText01" branding="name">
			<image id="1" src="http://static.myurl.abcd/Dex-Store/1.jpg"/>
			<text id="1">Dex News</text>
		</binding>
	</visual>
</tile>
```

<br/>

This type of notification applies to the Wide tile and looks like this:

![Dex Tile]({{ site.baseurl }}/images/Dreadlocks/dex-tile.png)

To push notifications for other types of tiles, we would adhere to the tile schema as defined in the [Tile schema documentation](https://docs.microsoft.com/en-us/uwp/schemas/tiles/tilesschema/schema-root).

Periodic tile notifications expire within three days by default, taking off content of the tile and showing the default image again. This is acceptable in most cases. On special occasions with time-limited offers, the expiration time can be set explicitly to ensure that the content doesn't persist longer. This requires a server back-end script, which serves the XML content along with the `X-WNS-Expires` HTTP header with date and time of expiry.

Following is an example written in ASP.NET Core, which sets the expiration time to 1 minute (a great interval for testing—doesn't make much sense for production, where tile updates are less frequent and usually relevant for a longer time):

```c#
[HttpGet]
public string Get()
{
    Response.Headers.Add("X-WNS-Expires", DateTime.Now.AddMinutes(1).ToUniversalTime().ToString("r"));

    return "<tile><visual><binding template=\"TileWide310x150ImageAndText01\" branding=\"name\"><image id=\"1\" src=\"https://static.myurl.abcd/Dex-Store/1.jpg\"/><text id=\"1\">Dex News</text></binding></visual></tile>";
}
```

<br/>

The date should be in GMT/UTC and conform to the [HTTP-date](https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1) format (defined by W3C):

* Sun, 06 Nov 1994 08:49:37 GMT
* Sunday, 06-Nov-94 08:49:37 GMT
* Sun Nov 6 08:49:37 1994

A simple way to get it in .NET is to use the `ToUniversalTime()` method and pass "r" parameter to `ToString()`:

```c#
DateTime.Now.AddMinutes(1).ToUniversalTime().ToString("r")
```

### Store publishing

The publishing process is similar to a regular Windows Store UWP app, but it has some differences. In this section we will summarize our findings and recommendations.

#### Before posting a submission

Before even starting a submission, we needed to request permission to submit applications with *runFullTrust* capability. Every Desktop Bridge-converted app or game uses it and the publisher's Windows Store developer account needs to be allowed to use it. If you try to upload an app package (.appx file), the validation will fail with the following two messages:

<img alt="Package Validation Error" src="{{ site.baseurl }}/images/Dreadlocks/store-publish.png" width="600">

<br/>

As the message states, we had to go to [https://aka.ms/desktopbridgeforwindowsstore](https://aka.ms/desktopbridgeforwindowsstore), fill in the form with information about the publisher and the app, and submit. Keep in mind that this request should be submitted by the owner of the developer account.

>We recommend requesting the permissions before taking any other steps in the conversion process, because the validation can take a few days or even weeks.

Another thing we did before submitting the package was to run the [Windows App Certification Kit](https://developer.microsoft.com/en-us/windows/develop/app-certification-kit) (WACK) to catch and fix any errors before starting the validation process.

The newest version of WACK as of this writing is part of the Windows SDK and supports apps for Windows 10, 1703 and earlier. It also has support for testing Windows Desktop Bridge apps.

![Windows App Cert Kit]({{ site.baseurl }}/images/Dreadlocks/appcertkit.png)

<br/>

WACK is basically a wizard with only a few steps. First, we selected **Validate Store App** (beware, it's not the *Desktop App* button as you might think).

<img alt="WACK 1" src="{{ site.baseurl }}/images/Dreadlocks/wack1.png" width="600">

<br/>

Then we chose the .appx file:

<img alt="WACK 2" src="{{ site.baseurl }}/images/Dreadlocks/wack2.png" width="700">

<br/>

And finally we checked all the certification tests that were available. The tests then ran for a few minutes, because Dex is quite a large package, approximately 2.3 GB.

<img alt="WACK 3" src="{{ site.baseurl }}/images/Dreadlocks/wack3.png" width="700">

<br/>

The first run of WACK showed that the package did not pass. Looking into the report, we divided the issues into three categories.

```
Image reference "Assets\Square50x50.png": The image "c:\program files\windowsapps\com.dreadlocks.dex_5.3.0.0_x86__szcjea503wd5t\Assets\Square50x50.scale-125.png" failed the size restrictions of 62 X 62.
Image reference "Assets\Square50x50.png": The image "c:\program files\windowsapps\com.dreadlocks.dex_5.3.0.0_x86__szcjea503wd5t\Assets\Square50x50.scale-400.png" failed the size restrictions of 200 X 200.
Image reference "Assets\Square71x71Logo.png": The image "c:\program files\windowsapps\com.dreadlocks.dex_5.3.0.0_x86__szcjea503wd5t\Assets\Square71x71Logo.scale-125.png" failed the size restrictions of 88 X 88.
... (omitted similar) ...
```

This was a strange error, given that all assets were set and generated from the Advanced Installer. After a closer investigation, we found out that all images marked as incorrect are **exactly 1 pixel off** the required size.

>**Eventually we found out that this is a known issue of WACK and is safe to ignore.**

<br/>

Moving on:

```
The image file "c:\program files\windowsapps\com.dreadlocks.dex_5.3.0.0_x86__szcjea503wd5t\Assets\Wide310x150Logo.scale-200.png" must be smaller than 204800 bytes.
The image file "c:\program files\windowsapps\com.dreadlocks.dex_5.3.0.0_x86__szcjea503wd5t\Assets\Wide310x150Logo.scale-400.png" must be smaller than 204800 bytes.
The image file "c:\program files\windowsapps\com.dreadlocks.dex_5.3.0.0_x86__szcjea503wd5t\Assets\Square310x310Logo.scale-125.png" must be smaller than 204800 bytes.
... (omitted similar) ...
```

This error, on the other hand, was legitimate, so we had to resize and resample the images to fit the required byte size.

<br/>

```
Image reference "Assets\BadgeLogo.png": The image "c:\program files\windowsapps\com.dreadlocks.dex_5.3.0.0_x86__szcjea503wd5t\Assets\BadgeLogo.scale-100.png" has an ABGR value "0xFFC28B1F" at position (0, 0) that is not valid. The pixel must be white (##FFFFFF) or transparent (00######).
Image reference "Assets\BadgeLogo.png": The image "c:\program files\windowsapps\com.dreadlocks.dex_5.3.0.0_x86__szcjea503wd5t\Assets\BadgeLogo.scale-125.png" has an ABGR value "0xFFC18D23" at position (0, 0) that is not valid. The pixel must be white (##FFFFFF) or transparent (00######).
... (omitted similar) ...
```

We solved the BadgeLogo problem simply—by excluding the Badge icon from the package because it wasn't used anyway.

<br/>

```
The binary Assembly-UnityScript.dll is built in debug mode.
```

This was another issue to **ignore**, even though our submission got rejected initially. The problem here was that Dex references Unity 3D libraries, which were built in the Debug mode. Fortunately, WACK and the [Windows Store documentation](https://docs.microsoft.com/en-us/windows/uwp/debug-test-perf/windows-desktop-bridge-app-tests) state that this test is optional.

>The overall pass/fail criteria for store onboarding is determined by the required tests and not by these optional tests.

We needed Windows Store support to assist with this and waive the restriction.

#### Submission

Dex is a computer game and as such was published to the **Games** category, which is different from other categories (such as Developer tools, Books, or Productivity). Once an app is published as a game, it cannot be changed to any other category. The opposite also is true—once it is published to any other category, it cannot be switched to Games.

The rest of the submission process is similar to any other UWP app and is well described in official documentation. See [App submissions](https://docs.microsoft.com/en-us/windows/uwp/publish/app-submissions).

#### Distribution for testing

The game had to be tested before going public on the Windows Store, so Dreadlocks decided to hide it initially and make it available with a promo code only. This setting is part of the submission process—section **Pricing and availability** > **Distribution and visibility**.

<img alt="Hide in Store" src="{{ site.baseurl }}/images/Dreadlocks/hide-in-store.png" width="700">

<br/>

>The last option says: *Hide this app and prevent acquisition. Customers with a direct link can see the app's listing, but can only download the app if they have a promotional code and are using a Windows 10 device.*

Then we generated **Promo codes** from the **Attract** section of Developer Dashboard.

![promo-codes]({{ site.baseurl }}/images/Dreadlocks/promo-codes.png)

<br/>

<img alt="Order Codes" src="{{ site.baseurl }}/images/Dreadlocks/order-codes.png" width="500">

<br/>

Codes were ready to download immediately. Each tester was then able to go to the store app on their Windows 10 machine, click their profile picture, and select **Redeem code**.

![Redeem Code]({{ site.baseurl }}/images/Dreadlocks/redeem-code.png)

<br/>

<img alt="Store Code" src="{{ site.baseurl }}/images/Dreadlocks/store-code.png" width="400">

<br/>

<img alt="Accept" src="{{ site.baseurl }}/images/Dreadlocks/accept.png" width="400">

<br/>

<img alt="Accepted" src="{{ site.baseurl }}/images/Dreadlocks/accepted.png" width="400">

<br/>

Dex was added to their account and began to download right away.

![Downloading]({{ site.baseurl }}/images/Dreadlocks/downloading.png)

<br/>

The download speed can get quite high on the right kind of connection:

![Download Speed]({{ site.baseurl }}/images/Dreadlocks/store-download.jpg)

## Conclusion

Technically, the migration through the Desktop Bridge was smooth and easy. The nature of this project was rather complex because of connecting several tools and technologies from different vendors, so it's no surprise that we had to overcome several obstacles—most of them are described in this document. We recommend allocating enough time for the *runFullTrust* approval and being cautious about the WACK tool and its bugs.

This version will go to general distribution soon, once testing is done, and Dreadlocks will continue with gradual UWP extensions. The ultimate goal is to have Xbox Live achievements integrated with the store version.

## Additional resources

* [Useful blog series about Desktop Bridge on the App Consult team blog](https://blogs.msdn.microsoft.com/appconsult/tag/desktop-bridge/)
* [UWP docs about periodic notifications](https://docs.microsoft.com/en-us/windows/uwp/controls-and-patterns/tiles-and-notifications-periodic-notification-overview)
* [Packaging for UWP in Advanced Installer](http://www.advancedinstaller.com/uwp-app-package.html)
* [Desktop Bridge technical documentation](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-root)
