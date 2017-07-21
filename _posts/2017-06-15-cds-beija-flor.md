---
layout: post
title: "Bringing Beija-Flor ERP to the Windows Store with the Desktop Bridge"
author: "Caio Chaves Garcez"
author-link: "https://twitter.com/Caio_garcez"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-07-21
categories: [Desktop Bridge]
color: "blue"
image: "images/2017-06-15-cds-beija-flor/cds-header.png"
excerpt: Microsoft helps an ISV convert its point of sales application, which is part of an ERP suite, to the Universal Windows Platform by using the Windows Desktop Bridge.
language: [English]
verticals: [Retail & Consumer Goods, Professional Services]
geolocation: [South America]
---

![Figure 0. CDS Logo]({{ site.baseurl }}/images/2017-06-15-cds-beija-flor/Figure_0_CDS_Logo.png)

CDS is a Brazilian software company that develops and sells software suites. One of these suites is Beija-Flor ERP, which is an Enterprise Resource Planning (ERP) system targeted at small and medium companies. The suite includes a Windows Forms application, which CDS converted to the Universal Windows Platform (UWP) by using the Windows Desktop Bridge tool.

This article describes this conversion process. 

### Core team

- [Carlos dos Santos](https://twitter.com/cdssoftware) – Director/R&D, CDS
- Leandro Adriano dos Santos – Developer, CDS
- [Caio Garcez](https://twitter.com/Caio_garcez) – Senior Technical Evangelist, Microsoft
- [Luis Henrique Demetrio](https://twitter.com/demetrio_casao) – Senior PFE Developer, Microsoft

## Customer profile

[CDS](http://www.cds-software.com.br/) is a Brazilian ISV that provides Accounting, Finance, Sales, and Customer Service solutions. It was founded around 20 years ago by Carlos dos Santos, a Microsoft MVP and RD (Regional Director). In addition to offering on-premises systems, it has some software as a service (SaaS) products such as [Beija-Flor ERP](http://www.beijaflorerp.com.br), an online ERP system targeted at small and medium companies.

CDS has customers in many segments, including wholesale, construction, industrial plants, stores, and the service sector. Besides building and selling software, they also offer consulting services related to migrating on-premises applications to Azure and implementing Visual Studio Team Foundation Server (TFS) and Office 365, as well as offering training courses about the Microsoft platform.

## Problem statement

CDS has designed and developed an ERP system aimed at small and medium companies, called Beija-Flor (*Hummingbird* in English). The system’s main components are a website and a point of sales (POS) C# Windows Forms application, called *Beija-Flor Frente de Caixa*. Beija-Flor’s website features include:

-   Stock control
-   Finances
-   Procurement
-   Sales
-   Point of sales
-   Restaurant table management
-   NF-e invoice emission (*NF-e stands for Nota Fiscal Eletrônica, and is the standard document companies are obliged to produce when issuing invoices in Brazil)*

The desktop application is intended to be used by POS operators. When customers download it, they are expected to sign in by using their credentials (which should have been previously created on the website). Following is a screenshot of the sign-in window shown by the application.

<br/>

*Figure 1. Beija-Flor sign-in screen*

![Figure 1. Beija-Flor sign-in screen]({{ site.baseurl }}/images/2017-06-15-cds-beija-flor/Figure_1_Login_screen.png)

<br/>

As a security measure, when the system detects a sign-in from an unknown computer, the user is asked to generate a token on the website. The token is then pasted into a dialog box, which then brings the user to the application’s main menu (Figure 2).

<br/>

*Figure 2. Beija-Flor main menu*

![Figure 2. Beija-Flor main menu]({{ site.baseurl }}/images/2017-06-15-cds-beija-flor/Figure_2_Main_menu.png)

<br/>

From this menu, users can perform the usual POS operations, such as opening the POS for the day, selling products, and printing tags. The following screenshot (Figure 3) shows the main POS interface.

<br/>

*Figure 3. POS interface*

![Figure 3. POS interface]({{ site.baseurl }}/images/2017-06-15-cds-beija-flor/Figure_3_POS_Interface.png)

<br/>

CDS was very interested in exploring the Desktop Bridge as a means to publish their application to the Windows Store. The main benefits they hoped to gain were:

-   An expanded user base, given the reach of the Windows Store
-   A better deployment and update experience for their customers
-   The possibility of incorporating UWP features in their application, mainly:
    -   Live Tiles 
    -   Notifications
    -   Geolocation

CDS partnered with Microsoft in a joint effort to explore this opportunity.

## Solution, steps, and delivery

When converting a desktop application to UWP, you can use either of these options:

- Desktop App Converter (DAC)
- Visual Studio 2017

The first option, using DAC, is best suited for applications where the person doing the conversion does not have access to the application’s source code, which is quite common in enterprises when dealing with third-party software. The DAC tool must be downloaded, along with a base image that will be used to capture all the registry and file changes performed by the application installer. The procedure is described at [Package an app using the Desktop App Converter (Desktop Bridge)](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter).

The second option, using Visual Studio, is more efficient when the person doing the conversion has access to the application’s source code. In this option, no tools other than Visual Studio 2017 and the Windows 10 Software Development Kit (SDK) are needed. Because CDS is the developer and owner of the *Beija-Flor Frente de Caixa* desktop application, this was the natural choice. As a basis, the team used the procedure described at [Package a .NET app using Visual Studio (Desktop Bridge)](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-packaging-dot-net).

Before doing the actual conversion, the team performed some analyses and preparation steps. These included trimming the Visual Studio solution, identifying necessary code changes, figuring out the branching strategy, and doing the actual coding.

After these steps were completed, the actual conversion took place, which in fact was simply building a project in Visual Studio. The resulting package was tested both manually and by using the [Windows App Certification Kit (WACK)](https://docs.microsoft.com/en-us/windows/uwp/debug-test-perf/windows-app-certification-kit) tool.

All these activities are described in detail in the following sections in chronological order.

### Trimming the Visual Studio solution

The most recent version of the *Beija-Flor Frente de Caixa* desktop application (henceforth simply called *the desktop app*) had 106 referenced DLLs. These DLLs included different kinds of libraries:

-   Internal CDS utility/helper libraries
-   Microsoft-provided DLLs (such as EntityFramework and OWIN)
-   A set of DLLs used for rendering graphics, provided by a third-party company ([DevExpress](https://www.devexpress.com/))
-   Third-party libraries

Not all of these libraries were actually in use, and many were still referenced only as a consequence of the natural accruing process of a typical desktop application over its lifetime. The application was revised and the unneeded references were removed. The leaner application package kept only 39 DLLs.

### Identifying needed code changes

Upon analyzing the logic and behavior of the desktop app, the following code changes were deemed necessary:

1.  Adjusting folder locations used by the application
2.  Removing the update logic
3.  Removing the **Restaurant** module, which requires admin privileges

The reason for the first change is that, as is common with many Win32 and .NET applications, the desktop app uses the installation folder as a location to store some files—in this case a SQLite database and some XML configuration files. UWP apps cannot write to (but can read from) their installation folders, due to security restrictions imposed by the operating system. This meant that when running as a UWP app, the app would need to use a different folder. The most suitable place was defined as the ProgramData folder (usually *C:\\ProgramData*).

The reason for the second change is that the app has its own update logic. When executed, the app checks its version against an API and if a new version is available, it downloads all the required files and usually applies local database changes. It would make no sense to maintain this custom logic when the app is delivered through the Windows Store, which naturally has its own update mechanism.

The third change involved removing the **Restaurant** module that is used to control tables at restaurants (ordering products, closing bills, issuing checks, and so forth). It is fully functional on PCs, but has a specific feature that requires administrator privileges: the *Web Module for Tablets/Smartphones*. This feature starts a local web server on the PC, which is then accessed by waiters using tablets and smartphones through the restaurant’s Wi-Fi network. Waiters simply launch a browser and navigate to the local web server address, allowing them to manage tables and orders from the devices.

Despite being a very convenient and productive feature, it is not essential to the app because not all Beija-Flor customers are restaurants, and only a part of those who are have waiters using electronic devices. Because administrator privileges are not allowed for UWP apps deployed through the Windows Store, this particular feature had to be removed, at least for now.

At this point in time, the team had to make a decision about how to best incorporate all these needs into the current code base. This led to a discussion about the branching strategy.

### Determining the branching strategy

The desktop app is maintained by a small team of developers, who all work in the same room. During development, they avoid changing the same files simultaneously as much as possible to keep merges to a minimum. The app has a simple versioning scheme consisting of minor versions (which consist of bug fixes and small tweaks) and major versions (which are established when new features are introduced or changes are significant from a user perspective).

The team could choose to enforce a single, unified code base for both versions, and have the application detect at runtime whether it is running as a desktop app or a UWP app. This could be accomplished by using the [GetPackageFamilyName](https://msdn.microsoft.com/en-us/library/windows/desktop/hh446603(v=vs.85).aspx) function, which returns `ERROR_SUCCESS` if the app is deployed as a UWP package and `APPMODEL_ERROR_NO_PACKAGE` if not.

However, despite the simplicity of this approach, there are other factors involved:

-   CDS has a support department that assists customers with application issues. Any changes in file locations, however trivial, might cause disruptions in the service provided.
-   Not all of CDS’ customers are running Windows 10, so maintaining the desktop app is important; therefore, when running as a desktop app, the app would still need its custom update logic.

Based on these circumstances, the team decided to manually control at compile time which version of the app would be generated (desktop or UWP) by using a simple Boolean variable.

<br/>

*Code snippet 1. Boolean control variable*

```csharp
public static bool storeWindows10 = true;
```

<br/>

The application will continue to have a single code base, but will be intentionally built for either desktop or UWP according to the situation. At runtime, the variable is evaluated and the proper code branches are executed, as shown in the following sections.

### Implementing code changes

Because the database and XML files location will not be changed at this moment for the desktop version, the app needs to define the proper folder at runtime.

<br/>

*Code snippet 2. File location definition*

```csharp
public static string dataFolder = storeWindows10 ? System.Environment.GetEnvironmentVariable("ProgramData") + @"\BeijaFlor" : Util.GetPath();
```

<br/>

The approach for the UWP app was:

1.  Include a clean database file and the XML configuration files in the UWP package (as they already are in the desktop installer package).
2.  Have the app check when launched if the database and XML files are present in the ProgramData folder; if not, copy them there from the installation folder.
3.  Use only the ProgramData folder during runtime.

Regarding the database file, the following logic (Code snippet 3) was implemented. This code detects if the database file is in the ProgramData folder, and if it’s not, it copies the .db file in the installation folder to this folder. It also opens the connection to the SQLite database.

<br/>

*Code snippet 3. Copying the database file to the ProgramData folder*

```csharp
public static void ValidateConnection()
{
string programDataDB = dataFolder + @"\Data\";
string DBfile = Utilitarios.GetPath() + @"\Data\BeijaFlorFrenteCaixa.db";
string DBfile2 = programDataDB + @"BeijaFlorFrenteCaixa.db";
if (!File.Exists(DBfile2))
{
if (File.Exists(DBfile))
       {
       	try
		{
              	if (!Directory.Exists(programDataDB))
              		Directory.CreateDirectory(programDataDB);
              	File.Copy(DBfile, DBfile2);
              }
              catch (Exception ex)
              {
              	MessageBox.Show("Error copying database file to folder 'ProgramData'.\n" + ex.Message);
                     return;
              }
       }
       else
       {
        	MessageBox.Show("Database file not found on folder 'Data'");
        	Application.Exit();
        	return;
       }
}
try
{
conexao = new SQLiteConnection(string.Format("Data Source={0}; FailIfMissing=True", DBfile2));
}
catch (Exception ex)
{
MessageBox.Show("Error when opening database:\n" + ex.Message);
       Application.Exit();
       return;
}
}

```

<br/>

A similar logic was used for the XML configuration files (Code snippet 4).

<br/>

*Code snippet 4. Copying the XML files to the ProgramData folder*

```csharp
public static void ValidaSchema()
        {
            string programDataSchemas = dataFolder + @"\Schemas\";
            if (!Directory.Exists(programDataSchemas))
            {
                Directory.CreateDirectory(programDataSchemas);
                string pastaSchemaInstall = Util.GetPath() + @"\Schemas";
                if (Directory.Exists(pastaSchemaInstall))
                {
                    var info = Directory.GetFiles(pastaSchemaInstall);
                    foreach (var item in info)
                    {
                        var fs = new FileInfo(item);

                        File.Copy(fs.FullName, programDataSchemas + fs.Name);
                    }
                }
            }
        }

```

<br/>

The final code change was related to the update process. All the custom update logic was made conditional based on the Boolean control variable. However, one particular aspect merited deeper analysis. One of the tasks commonly done during application updates is applying changes to the local SQLite database file. These changes are done through a .upd file with SQL instructions, such as in the following example (Code snippet 5).

<br/>

*Code snippet 5. Example .upd file*

```sql
#
alter table Configuracao add CasasDecimaisQuantidade int
#
update Configuracao set CasasDecimaisQuantidade = 2 where CasasDecimaisQuantidade is null
#
alter table Configuracao add CasasDecimaisUnitario int
#
update Configuracao set CasasDecimaisUnitario = 2 where CasasDecimaisUnitario is null
#

```

<br/>

The application parses this file by using the `#` character to split the text into SQL commands, and then runs them against the database. After that’s done, it deletes the .upd file.

Because the application does not have rights to delete files in the installation folder, a simple `if` statement was added to this part of the code (Code snippet 6).

<br/>

*Code snippet 6. Not deleting the .upd file*

```csharp
public static void ExecutaUpdate()
{
...
if (!Utilitarios.storeWindows10)
File.Delete(arquivos[a]);
...
}

```

<br/>

### Adding the UWP JavaScript (JS) project

The next step was adding a new project to the existing solution in Visual Studio 2017. The chosen template was a JavaScript Windows Universal app, due to a few known issues with C# UWP apps (which are described at the end of this [previously referenced page](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-packaging-dot-net)).

After the project was added, the default .css, .js, and .html files were removed. This is because the project is only needed as a means to produce the UWP package, represented by the .appx or .appxupload file; there is no logic implemented in JavaScript in this scenario.

The application manifest was modified to include a few additional elements. The first change was adding the reference to the `RestrictedCapabilities` namespace and the inclusion of the `runFullTrust` restricted capability. This is necessary because desktop applications packaged as UWP apps actually run by using the same level of permissions as the signed-in user. This characteristic must be explicitly declared in the manifest (Code snippet 7).

<br/>

*Code snippet 7. Reference to the Restricted Capabilities namespace and inclusion of runFullTrust capability*

```xml
<Package ...
xmlns:rescap=http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities IgnorableNamespaces="... rescap">

<Capabilities>
    <.../>
    <rescap:Capability Name="runFullTrust"/>
  </Capabilities>

```

<br/>

The second change was related to the `TargetDeviceFamily` element. Desktop applications can only run on Windows PCs, not on smartphones or other UWP-compatible devices. The `MinVersion` and `MaxVersionTested` attributes specify, respectively, the minimum version of Windows 10 needed to run this application and the ideal version. In this case, the minimum version was defined as Windows 10 Anniversary Update (version 1607, OS Build 14393), while the ideal version is the Windows 10 Creators Update (version 1703, OS Build 15063); see Code Snippet 8.

<br/>

*Code snippet 8. Change to the TargetDeviceFamily element*

```xml
<TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.14393.0" MaxVersionTested="10.0.15063.0"/>

```

<br/>

The third and final manifest change was ensuring that the application ID, executable path, and entry point for the desktop app were properly defined (Code snippet 9).

<br/>

*Code snippet 9. Change to the Application element*

```xml
<Application Id="BeijaFlor.FrenteCaixa" Executable="Binarios\BeijaFlor.FrenteCaixa.exe" EntryPoint="Windows.FullTrustApplication">

```

<br/>

Following is the complete application manifest after all the modifications were finished (Code snippet 10).

<br/>

*Code snippet 10. Final UWP JavaScript app application manifest*

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<Package xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10" xmlns:mp="http://schemas.microsoft.com/appx/2014/phone/manifest" xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10" xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities" xmlns:build="http://schemas.microsoft.com/developer/appx/2015/build"
IgnorableNamespaces="uap mp rescap build">
  
  <Identity Name=" xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" Version="1.0.11.0" Publisher="CN=xxxxxxx" ProcessorArchitecture="neutral"/>
  <mp:PhoneIdentity PhoneProductId=" xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" PhonePublisherId="00000000-0000-0000-0000-000000000000"/>
  <Properties>
    <DisplayName>BeijaFlor.FrenteCaixa.UWP</DisplayName>
    <PublisherDisplayName>xxxxxxx</PublisherDisplayName>
    <Logo>images\storelogo.png</Logo>
  </Properties>
  <Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.14393.0" MaxVersionTested="10.0.15063.0"/>
  </Dependencies>
  <Resources>
    <Resource Language="EN-US"/>
    <Resource uap:Scale="200"/>
  </Resources>
  <Applications>
    <Application Id="BeijaFlor.FrenteCaixa" Executable="Binarios\BeijaFlor.FrenteCaixa.exe" EntryPoint="Windows.FullTrustApplication">
      <uap:VisualElements DisplayName="BeijaFlor.FrenteCaixa.UWP" Description="BeijaFlor.FrenteCaixa.UWP" BackgroundColor="transparent" Square150x150Logo="images\Square150x150Logo.png" Square44x44Logo="images\Square44x44Logo.png">
        <uap:DefaultTile Wide310x150Logo="images\Wide310x150Logo.png"/>
        <uap:SplashScreen Image="images\splashscreen.png"/>
      </uap:VisualElements>
    </Application>
  </Applications>
  <Capabilities>
    <Capability Name="internetClient"/>
    <rescap:Capability Name="runFullTrust"/>
  </Capabilities>
  <build:Metadata>
    <build:Item Name="VisualStudio" Version="15.0"/>
    <build:Item Name="VisualStudioEdition" Value="Microsoft Visual Studio Enterprise 2017"/>
    <build:Item Name="OperatingSystem" Version="10.0.15063.0 (WinBuild.160101.0800)"/>
    <build:Item Name="Microsoft.Build.AppxPackage.dll" Version="15.0.26419.1"/>
    <build:Item Name="ProjectGUID" Value="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"/>
    <build:Item Name="OptimizingToolset" Value="None"/>
    <build:Item Name="TargetRuntime" Value="AppHost"/>
    <build:Item Name="MakePri.exe" Version="10.0.15063.400 (WinBuild.160101.0800)"/>
  </build:Metadata>
</Package>

```

<br/>

*Figure 4. Leandro from CDS working on the necessary code changes*

![Figure 4. Leandro from CDS working on the necessary code changes]({{ site.baseurl }}/images/2017-06-15-cds-beija-flor/Figure_4_Leandro.jpg)

<br/>

### Integrating the Windows Forms and the UWP projects

As mentioned earlier, the sole purpose of the UWP JS project is to generate the UWP package. For the package to be created correctly, it must include all the Win32 binary files that are part of the desktop app being converted.

To produce the desired output, a new folder was added to the UWP project called *Binarios* (“Binaries” in English). All the binary output of the Windows Forms project, including the executable file and the 39 referenced DLLs, were added to this folder.

The Windows Forms project file (.csproj) was modified to include a post-build task that copies all these files to the Binarios folder. This way, whenever the Windows Forms project is rebuilt, the modified files (executable and DLLs, as stated) are automatically copied to the Binarios folder inside the UWP project (Code snippet 11).

<br/>

*Code snippet 11. Changes to the Windows Forms project file (.csproj)*

```xml
<Target Name="AfterBuild">
    <PropertyGroup>
      <TargetUWP>..\BeijaFlor.FrenteCaixa.UWP\Binarios\</TargetUWP>
    </PropertyGroup>
    <ItemGroup>
      <Win32Binaries Include="$(TargetDir)\*" />
    </ItemGroup>
    <Copy SourceFiles="@(Win32Binaries)" DestinationFolder="$(TargetUWP)" />
  </Target>

```

<br/>

In addition to being included in the UWP JS project, the files had to have the following properties changed:

-   **Package Action** was set to *Content*
-   **Copy to Output Directory** was set to *Copy if newer*

### Resolving compilation issues

When the project was initially built, some strange errors appeared. These errors seemed to indicate issues with some of the DLLs related to "duplicate entries" and "not serializable types" (see Figure 5).

<br/>

*Figure 5. Example DLL error*

![Figure 5. Example DLL error]({{ site.baseurl }}/images/2017-06-15-cds-beija-flor/Figure_5_Example_DLL_error.png)

<br/>

This was an odd issue because compilation would always work normally for the Windows Forms project, but not for the UWP project. Upon further investigation, we determined that the DevExpress DLLs were the ones causing these errors, but because they are from a third-party company, the team didn’t have access to their source code, making it difficult to pinpoint the cause.

The solution was provided when the issue was posted at this Stack Overflow thread [Duplicate entry error in DLL when building Desktop Bridge UWP application](https://stackoverflow.com/questions/44399824/duplicate-entry-error-in-dll-when-building-desktop-bridge-uwp-application). There is a known bug in the resource generator step in UWP JavaScript apps, when DLLs have embedded resources (this is documented in the comments thread at [Create app packages in release mode](https://github.com/Microsoft/DesktopBridgeToUWP-Samples/issues/8#issuecomment-266912073)). 

The current workaround is to add an `AppxGeneratePrisForPortableLibrariesEnabled` element with a value of `false` to the .jsproj file, inside the `PropertyGroup` element (Code snippet 12).

<br/>

*Code snippet 12. Fixing the strange DLL errors*

```xml
<PropertyGroup Label="Globals">
...
<AppxGeneratePrisForPortableLibrariesEnabled>false</AppxGeneratePrisForPortableLibrariesEnabled>
</PropertyGroup>

```

<br/>

No further compilation issues were found after adding this tag.

### Generating the visual assets

The final step in creating the initial UWP app was adding all the required image sizes to the package. This was made easy by the Asset Generator feature in the application manifest editor in Visual Studio. Found on the **Visual Assets** tab, this feature automatically generates all the required image sizes, based on a provided base image (see Figure 6).

<br/>

*Figure 6. Asset Generator interface with chosen image sizes*

![Figure 6. Asset Generator interface with chosen image sizes]({{ site.baseurl }}/images/2017-06-15-cds-beija-flor/Figure_6_Asset_Generator.png)

<br/>

In the case of Beija-Flor, Badge Logo tiles will not be used, so that option was left unselected. A total of 45 images were created through this method, greatly accelerating the final polishing steps.

When ready, the team right-clicked the UWP JS Project in Visual Studio and chose the **Store > Create App Packages** command to create the ARM, x86, and x64 .appx packages, which were then tested and submitted to the Windows Store.

## Conclusion

Overall, the conversion process proved to be simple and relatively straightforward. Required code modifications were minimal and did not cause any significant increase in code complexity. After the building issues were addressed, tests ran smoothly and no issues were found.

As a next step, CDS is evaluating the inclusion of UWP features in the app. Some of the most relevant are:

- **Geolocation**. Because the app is used by franchises, the Geolocation API could be used to automatically identify which store is running the app.
- **Live Tiles**. CDS intends to use Live Tiles to send information and news to users, increasing awareness and possibly engagement as well.
- **Notifications**. The app could leverage the Notifications API as an additional channel to divulge information to users.

*Beija-Flor Frente de Caixa* can now be found in the [Windows Store](https://www.microsoft.com/store/apps/9nvsk849f1jg).


### Quotes

>“I found it very interesting to have a technical specialist from Microsoft onsite at our company to help us convert and publish our application. This will give more visibility to our products in the market.” —Leandro dos Santos, Developer, CDS

>“The joint work with Microsoft allowed for a rich exchange of knowledge and experience, besides bringing one more achievement to our product, which is to be present in the Windows Store.” —Carlos dos Santos, Director/R&D, CDS

<br/>

*Figure 7. The joint CDS and Microsoft team who worked on the project*

![Figure 7. The joint CDS and Microsoft team who worked on the project]({{ site.baseurl }}/images/2017-06-15-cds-beija-flor/Figure_7_Joint_team.jpg)

<br/>
