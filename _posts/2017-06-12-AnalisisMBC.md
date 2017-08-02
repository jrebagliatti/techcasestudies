---
layout: post
title: "Analisis MBC uses Desktop Bridge to convert legacy app for pineapple farmers"
author: "Joaquin Guerrero"
author-link: "https://twitter.com/kincho_guerrero"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-08-02
categories: [Desktop Bridge]
color: "blue"
image: "images/2017-06-12-AnalisisMBC/pina_architecture_tile.png" 
excerpt: This Costa Rica ISV wanted to convert existing apps to UWP and simplify deployment and updates. Desktop Bridge and Intune make this easy.  
language: [English]
verticals: ["Agriculture, Forestry & Fishing"]
geolocation: [Central America and the Caribbean]
---

Central America has plenty of independent software vendors (ISVs) that have been in the market for more than two decades, developing robust legacy apps in diverse industry verticals, but most have focused on desktop client solutions. The majority of these apps are popular niche solutions used by clients in different environments.

Now some of them are embracing an internal digital transformation. They want to enhance and modernize their old legacy apps that still represent a big part of their incomes while also developing new cloud-based apps. Desktop Bridge helps solve that problem of modernizing or revamping apps to approach new unexplored markets through the Windows Store or to streamline the deployment and installation process of legacy apps. 

Analisis MBC, one of the Microsoft ISVs in Costa Rica, took advantage of the Desktop Bridge to start migrating their legacy desktop apps developed in Delphi into Universal Windows Platform (UWP) apps to streamline and simplify the deployment and update cycles.

**Core team:** 

- Juan Carlos Bertsch – CEO, Analisis MBC
- Thomas Bertsch – Project Manager/Business Development Manager, Analisis MBC
- Andres Oreamuno – Technical Lead for PinaApp, Analisis MBC
- [Joaquin Guerrero](https://twitter.com/kincho_guerrero) – Technical Evangelist, Microsoft

**Technologies used:**

- [Desktop Bridge](https://developer.microsoft.com/en-us/windows/bridges/desktop)
- [Microsoft Intune](https://www.microsoft.com/en-us/cloud-platform/microsoft-intune)
- [UWP Tile Generator Extension for Visual Studio](https://blogs.windows.com/buildingapps/2016/02/15/uwp-tile-generator-extension-for-visual-studio/#oOKiQf3BYp6ewUwR.97)

## Customer profile ##

[Analisis MBC](http://analisis.cr/) is a software development company based in Costa Rica, Central America. They have more than 29 years of experience in the enterprise resource planning (ERP) business, with a robust 20-person team that has deep technical and commercial skills. Analisis has a broad portfolio of ERP modules and some niche software solutions for verticals such as agriculture and farming. Most of their applications are written in Delphi and use Pervasive SQL; they also have some developments in Microsoft .NET and Xamarin. 

Their most popular product is *Enlace*, an ERP suite with more than 500 clients in Central America, North America, and Asia. Enlace contains modules such as accounting, payroll, asset management, and stock management with a focus on SMB and midsized customers. Its current version is a client-server one that runs on Windows Server 2008. This is an on-premises solution that is now being offered in Azure as a software as a service (SaaS) solution.

Another of their popular applications is the niche solution *Pineapple*. Pineapple was created at the request of some agriculture customers who wanted a more specialized module to be integrated with their Enlace ERP. Analisis developed Pineapple to meet those requests and now it's being used in most of the pineapple farms in Costa Rica. (Taking into consideration that pineapple production in Costa Rica represents more than 31 percent of the agriculture PBI, and that Costa Rica has more than 1,500 pineapple producers, it is a strong industry vertical in the region.)

## Problem statement ##

The Pineapple solution was developed in Delphi with a custom-made data-sync component to interact with Enlace and a SQL database. One of the main problems Analisis faces is the multiple modifications and requirements requested by their clients. There is a base solution, but most of the pineapple farms have specific needs and requirements that must be added and maintained over time. 

Right now, Pineapple is installed manually by Analisis through a series of tedious steps that include copying/pasting directories and Win32 executables, installing dependencies, and more. Also, it is difficult for them to track the versions deployed to the multiple clients. 

Most of these clients are located away from the cities, so remote support is the only way to reach them effectively. In some cases this is complicated because of remote connectivity or technical expertise on the client side.

Because Analisis MBC is undergoing a digital transformation process this year, they were very interested in revamping/enhancing their existing apps and using new technologies to solve deployment, versioning, and update issues for their customers. They were interested in Windows 10 Desktop Bridge conversion because they are looking forward to revamping their old legacy apps while continuing to develop their new cloud-born apps. Also, they wanted to remove the hassle of manually installing and updating the apps, a support service they provide for their clients. 

## Solution, steps, and delivery ##

The Desktop Bridge made the conversion easy and straightforward. Additionally, the Analisis MBC team learned a lot about other enhancements they could include in future conversions of their other legacy products. During the process, we also found out that Embarcadero RAD Studio has support for the Desktop Bridge and that conversions can be done directly from their IDE without having to run different command lines.

Pineapple architecture is simple—the Win32 app contains multiple references and dependencies to .dll files and also interacts with another component that acts as a middleware or data-sync component between the Enlace ERP and Pineapple data sources. The following diagram shows the architecture of the actual solution.

![Pineapple architecture diagram]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/pina_architecture.png)


### Step 1: Setting up the environment ###

The Analisis MBC team didn't have any development machines with Windows 10 installed, so the first step was to update one of their machines with [Windows 10 Creators Update](https://blogs.windows.com/windowsexperience/2017/04/11/how-to-get-the-windows-10-creators-update/).

After we prepared the environment, we continued with the setup of the Desktop App Converter (DAC). There are many ways of converting apps using the Desktop Bridge, but in this case we didn't have an installer (.msi or InstallShield) for the app, so we used the manual conversion type, which could convert the app files and dependencies into an app package (.appx file).

To set up the Desktop App Converter, we followed these steps:

1. Download the [Desktop App Converter](http://aka.ms/converter) from the Windows Store.
2. Depending on the Windows build version from the PC used for the conversion, download the appropriate WIM image for packaging the apps. For this, visit [aka.ms/converterimages](http://aka.ms/converterimages) and download the matching OSBuild WIM. 
3. Once the WIM image is downloaded, run the Desktop App Converter as an administrator. You could also run the DesktopAppConverter.exe from a CMD in Admin mode.
    
    ![Desktop Bridge architecture diagram]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/cmd1.png)
    
    
4. In the first run, you need to configure the Desktop App Converter by running the following command:

    ```
    DesktopAppConverter.exe -Setup -BaseImage {baseimagepath} -Verbose
    ``` 

    *(This step could take a while depending on your machine specs, because the setup decompresses the WIM image, enables containers, and sets the environment for conversion.)*

### Step 2: Win32 app conversion ###

Once the environment was ready, we proceeded with the app conversion process. First, Analisis MBC wanted to be sure the app could run with an on-premises machine running [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-editions-express) and also with Azure SQL Database. For this initial requirement, we did a simple migration of a sample database from an on-premises machine running SQL Server Express to a SQL database. For this we used the [Data Migration Assistant](https://www.microsoft.com/en-us/download/details.aspx?id=53595) and followed the steps detailed in [SQL Server database migration to SQL Database in the cloud](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-cloud-migrate).

With both data sets, one on-premises and one in a SQL database in Azure, we started the app conversion. The app had no installers, so we went through the manual conversion of the app. (See [Package an app that doesn't have an installer](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter#no-installer-conversion).)

To run the conversion, we used the following command:

```
DesktopAppConverter.exe -Installer D:\pineapple -AppExecutable pineapple.exe -Destination D:\PinaApp -PackageName "PinaApp" -Publisher "CN=Analisis MBC" -Version 1.0.0.0 -MakeAppx -Sign -Verbose
```

<br/>

Once the app was converted, a new folder was created with the .appx file, the certificate, and the .pfx file. 

![Desktop Bridge architecture diagram]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/pineapple_folder.png)


### Step 3: App installation and testing ###

We proceeded to install the generated app on the machine. But first we needed to install the certificate used to sign the app. To do this, we followed these steps:

1. Open the .cer file generated in the application folder.

    ![Desktop Bridge architecture diagram]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/cert1.png)
  

2. Select **Install Certificate...**

    ![Desktop Bridge architecture diagram]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/cert2.png)
    
    <br/>
    
3. Select **Local Machine** as the store location for the certificate.
    
    ![Desktop Bridge architecture diagram]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/cert3.png)
    
    <br/>
    
4. Select the certificate store to be **Trusted People**.
    
    ![Desktop Bridge architecture diagram]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/cert4.png)
    
    ![Desktop Bridge architecture diagram]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/cert5.png)
    
    <br/>
        
5. Install the certificate.

Once the certificate is installed, you will be able to install your UWP converted app. If you skip the certificate installation, you will receive errors. Also, remember to include the `-Sign` command during the conversion so the certificate is generated automatically.

To install the app, you also need to enable the App Sideloading feature for your Windows 10 environment, if you haven't done so already. To do this, follow these steps:

1. Go to **Settings**.
2. Go to **Updates and Security**.
3. On the **For Developers** tab, enable the **Sideload Apps** option from the checkbox.

After completing these steps, you should be able to install the .appx file. To do this, simply double-click the file and it will prompt you to install your new app.

<img alt="Desktop Bridge architecture diagram" src="{{ site.baseurl }}/images/2017-06-12-AnalisisMBC/installation.png" width="600">

<br/>

During the testing, we tried the app with both data sources—on-premises SQL Server Express and cloud-based SQL database. Both worked fine. 

Also during this testing, we found some issues to fix:

- The application consumes a web service to get some financial information from a third party. This is done through a specific port, and during the test it wasn't working as expected. For this we used the UWP enhancements to add the firewall exceptions at the manifest file, because it seemed that the firewall was blocking the app from connecting to the web service. We added this extension to the AppManifest.xml file:

    ```XML
    <Package
    ..
      xmlns:desktop2="http://schemas.microsoft.com/appx/manifest/desktop/windows10/2"
      IgnorableNamespaces="desktop2">
      <Extensions>
      ...
        <desktop2:Extension Category="windows.firewallRules">  
          <desktop2:FirewallRules Executable="Pineapple.exe">  
              <desktop2:Rule Direction="in" IPProtocol="TCP" Profile="all"/>  
              <desktop2:Rule Direction="in" IPProtocol="UDP" LocalPortMin="X" LocalPortMax="X" Profile="All"/>  
              <desktop2:Rule Direction="out" IPProtocol="UDP" LocalPortMin="X" LocalPortMax="X" RemotePortMin="X" RemotePortMax="X" Profile="all"/>  
          </desktop2:FirewallRules>  
      </desktop2:Extension>
      ...
    </Extensions>
    ...
    </Package>
    ```

<br/>

- The icons generated by the DAC didn't scale properly and had to be regenerated. For this we used the [UWP Tile Generator Extension for Visual Studio](https://blogs.windows.com/buildingapps/2016/02/15/uwp-tile-generator-extension-for-visual-studio/#oOKiQf3BYp6ewUwR.97) to generate the new tiles. After generating the new tiles, we included them in the actual package, following the instructions in [Package an app manually](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-manual-conversion#add-unplated-assets).

  Then we followed these next steps:

    1. In the converted app directory is a folder named PackageFiles\Assets. Inside are all the images the converter generated automatically. Replace all of them with the new generated images from the UWP Tile Generator.
    2. Next, regenerate all the resource files that contain a reference to the updated images. There should be some .pri extension files in the PackageFiles folder—delete them also.
    3. The UWP Tile Generator tool generates files with a naming convention that could differ from the one used by DAC. Be sure to check the nodes including:
    
    ```XML
      <Logo> 
      
       <uap:VisualElements>

       <uap:DefaultTile>
    ```
        
    4. After checking the file names and copying the new ones to the folder, we regenerated the assets by running the following commands:
    
      ```
      makepri createconfig /cf D:\pineapple\PackageFiles\priconfig.xml /dq en-US
      ```

      ```
      makepri new /pr D:\pineapple\PackageFiles /cf D:\pineapple\PackageFiles\priconfig.xml
      ```

### Step 4: Using Embarcadero RAD Studio ###

During the process of conversion, we found out that Embarcadero RAD Studio had integrated support to generate UWP packages directly from the IDE. Because the Analisis team uses this IDE to develop and maintain their legacy apps in Delphi, we decided to undergo the same conversion process directly from the IDE. We used the following steps to generate the conversion from the IDE:

1. First, enable the Windows 10 SDK in the RAD Studio. For this you can go to Tools > Options > Environment Options > SDK Manager. There you need to add Windows 10 SDK.

    ![Rad Studio W10 SDK Configuration]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/rad1.png)
    
    <br/>
    
    ![Rad Studio W10 SDK Configuration]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/rad2.png)
      
    <br/>
    
2. Select the deployment mode. In this case, because we are doing an internal LOB app deployment, we configured the AdHoc mode, but you can also select Windows Store in case you are publishing your app to the store. For this you can go to Tools > Options > Environment Options > Provisioning. 
    
    ![Rad Studio W10 SDK Configuration]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/rad22.png)
    
    <br/>
    
3. In case you are doing an ad-hoc distribution, you will need to generate a certificate to sign the app as we did with the DAC. For this you can click **Create self-signed certificate** and follow the steps to generate your certificate.
    
    ![Rad Studio W10 SDK Configuration]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/rad3.png)
    
    <br/>
    
    ![Rad Studio W10 SDK Configuration]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/rad4.png)
    
    <br/>
    
4. Once you have configured the environment, you can activate the target in the project by selecting **Application Store** in the target platform in the Project Manager window, and right-click **Activate**.
    
    ![Rad Studio W10 SDK Configuration]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/rad6.png)
    
    <br/>
    
5. RAD Studio can automatically generate the AppManifest.xml and the tiles. If you want to modify them, go to Project > Options > Application and make the changes.
    
    ![Rad Studio W10 SDK Configuration]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/rad8.png)
    
    <br/>
    
6. Once you have modified the tiles and the AppManifest.xml, you are ready to build the app. For this you just need to build the app in release mode and then deploy it. This will generate a ready-to-install .appx file. 

### Step 5: Deployment ###

The converted Pineapple app is an LOB app that is sold by the commercial team at Analisis MBC. Because of its custom requirements for customers and the licensing model, it isn't suitable for publishing on the Windows Store.

Instead, we thought the best way of automating the complete deployment of the app to the end customers and solving the issue of versioning and custom versions per customer was through Intune deployment. 

For this we set up a new Intune tenant for managing the remote devices and deploying the initial versions of the apps and pushing future updates in a smooth way.

After we had an active Intune subscription, we enrolled some test environments for us to test the deployments. For more information on how to enroll devices using Intune, here are the steps: [Install the Intune software client on Windows PCs](https://docs.microsoft.com/en-us/intune-classic/deploy-use/install-the-windows-pc-client-with-microsoft-intune).

To upload the .appx through Intune, we used the following steps:

1. Log on to the [Intune Management Portal](https://admin.manage.microsoft.com) with your Intune admin credentials. Then go to the **Apps** tab.
    
    ![Intune App tab]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/intune1.png)
      
    <br/>
    
2. Select **Add Apps** to prompt a download of the Microsoft Intune Software Publisher. Wait until the download is complete.
3. Log on with your Intune Admin credentials.
    
    ![Intune App tab]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/intune2.png)
      
    <br/>
    
4. Select the type of software that you will upload—in this case, a Windows app package (.appx). Browse for your previously generated app package (.appx) from the converter.
    
    ![Intune App tab]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/intune4.png)
         
    <br/>
    
5. Include some details about your app. These details are for the company portal (LOB internal "Windows Store" for Intune).
    
    ![Intune App tab]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/intune5.png)
     
    <br/>
    
6. Upload the app.
    
    ![Intune App tab]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/intune6.png)
      
    <br/>
    
7. Once the upload is finished, you will be able to see your new app in the **Apps** tab. 
    
    ![Intune App tab]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/intune8.png)
      
    <br/>
    
8. To deploy the app, select **Manage Deployments**, and then select the group of devices to which you will deploy the app. This is a useful feature for Analisis because they can group their client devices in groups and in that way they can have multiple versions of the same Pineapple app. 
    
    ![Intune App tab]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/intune10.png)
      
    <br/>
    
9. At approval policy, select **Available Install** so users will be able to download the app from the company portal. 
    
    ![Intune App tab]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/intune11.png)
      
    <br/>
    
10. Once the app is deployed, the selected users in the group will be able to download the app from the company portal or the UWP app. 
    
    ![Intune App tab]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/intune12.png)
        
    <br/>
    
## Conclusion ##

The Desktop Bridge is an amazing tool that can help ISVs and software developers easily port their apps to UWP apps and publish them in the Windows Store to increase downloads and approach new markets. Also, it's a great tool for ISVs with legacy LOB apps looking to modernize their apps and take advantage of new UWP features. 

Converting Pineapple was a good exercise for Analisis MBC because they could easily solve some of their installation, packaging, and deployment problems through Desktop Bridge and Intune. 

Analisis MBC is planning to modernize the rest of their Delphi LOB apps now that they know how to generate UWP packages directly from the RAD Studio from Embarcadero. For the next conversion of some of their Enlace ERP modules, they plan to take more advantage of the UWP features and enhancements such as background tasks, integration with calendar and tasks, live tiles, and notifications. 

Also, Analisis is now considering developing future versions of their desktop solutions completely in UWP (.NET), because they are now developing some of their new solutions in .NET and Xamarin. 

<br/>

>"The Desktop Bridge is an excellent tool that lets us revamp our old legacy apps created in non-Microsoft frameworks and take advantage of UWP development. It helped us move our apps to a newer platform and take advantage of the deployment options such as Intune for sideloading apps."
>
>— Thomas Bertsch, Project Manager, Analisis MBC

<br/>

>"Desktop Bridge integration with RAD Studio for Delphi development and directly deploying to UWP provided us an easier process for converting our actual apps to UWP. It provides us with the tools for future enhancement features from UWP such as background process and live tiles."
>
>— Andres Oreamuno, Technical Lead for Pineapple, Analisis MBC

<br/>

Here is the final converted app deployed through Intune in a test client:

![Pineapple UWP Converted App]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/pinapp1.png)

<br/>

![Pineapple UWP Converted App]({{ site.baseurl }}/images/2017-06-12-AnalisisMBC/pinaapp2.png)

