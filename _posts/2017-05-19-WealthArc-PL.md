---
layout: post
title: "WealthArc poprawia wydajność i jakość pracy zespołów rozwojowych dzięki wykorzystaniu praktyk DevOps"
author: "Dariusz Porowski"
author-link: "http://Strefa.MS"
#author-image: "{{site.baseurl}}/images/authors/dariuszporowski.jpg"
date: 2017-05-19
categories: [DevOps]
color: "blue"
image: "images/2017-05-19-wealtharc/feat-wealtharc-logo.jpg"
excerpt: WealthArc chciał uprościć proces tworzenia i wydawania oprogramowania, skonsolidować i ujednolicić narzędzia dla każdego zespołu oraz podjąć pierwsze kroki w kierunku automatyzacji w chmurze. Microsoft na warsztacie zorientowanym na DevOps pomógł firmie WealthArc w kilku obszarach opartych na praktykach DevOps, aby zwiększyć efektywność procesu związanego z rozwojem oprogramowania.
language: [Polish]
verticals: [Banking & Capital Markets]
geolocation: [Europe]
---

W tym artykule opisano, w jaki sposób firma Microsoft pomogła firmie WealthArc w zwiększaniu efektywności procesu wytwarzania oprogramowania, koncentrując się przede wszystkim na planowaniu pracy, ujednoliceniu narzędzi i procesów w zespołach, przy zachowaniu wysokiej jakości kodu oraz automatyzacji chmury Microsoft Azure w środowiskach rozwojowych.

**Kluczowe technologie użyte w projekcie**
- [Visual Studio Team Services](https://www.visualstudio.com/team-services) - repozytorium kodu, śledzenie pracy, wdrażanie aplikacji - wszystko w jednym pakiecie
- [Azure App Service](https://azure.microsoft.com/en-us/services/app-service) - serwer aplikacyjny dla aplikacji Web oraz mobilnych
- [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database) - zarządzana chmurowa baza danych
- [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights) - wgląd w wydajność aplikacji i natychmiastowa analityka
- [Azure Resource Manager Templates](https://azure.microsoft.com/en-us/features/resource-manager) (ARM Templates) - zarządzanie zasobami w chmurze Microsoft Azure

**Zespół projektowy:**
- [Dariusz Porowski](http://Strefa.MS) - Senior Technical Evangelist, Microsoft
- Radomir Mastalerz - Chief Technology Officer, WealthArc
- Łukasz Chodarcewicz - Lead Software Architect, WealthArc
- Radosław Pawłowski - Software Developer, WealthArc
- Michał Kadłubowski - Software Developer, WealthArc

*Obrazek 1. Uczestnicy warsztatów*

![Uczestnicy warsztatów]({{site.baseurl}}/images/2017-05-19-wealtharc/hackfest-members.jpg)  

## Profil firmy
[WealthArc](http://wealtharc.com) to platforma technologiczna w chmurze dedykowana dla prywatnych banków oraz doradców inwestycyjnych. Nasze rozwiązanie wspiera podejmowanie lepszych decyzji inwestycyjnych dzięki wykorzystaniu sztucznej inteligencji i analizy big data. Zachowując najwyższe standardy bezpieczeństwa, WealthArc pozwala na błyskawiczne zarządzanie i optymalizację portfeli inwestycyjnych, dostarczając tym samym efektywnych rozwiązań dla najbardziej wymagających klientów.

Osiągnięcia firmy w zakresie konsolidacji danych i ułatwiania cyfrowej komunikacji między zamożnymi klientami, a ich doradcami inwestycyjnymi zostały ostatnio docenione przez WealthBriefing European Awards 2017. WealthArc został nominowany do Top 5 najlepszych firm FinTechowych w trzech kategoriach (innowacyjne rozwiązanie FinTech, najlepsza komunikacja z klientem, innowacyjne rozwiązanie dla klienta końcowego) i zwyciężył w dwóch kategoriach (innowacyjne rozwiązanie FinTech i innowacyjne rozwiązanie dla klienta końcowego). Nagrody zostały przyznane przez doświadczone jury i miały na celu wyróżnienie firm, które zaprezentowały najbardziej innowacyjne rozwiązania w 2016 roku.  

Obecnie WealthArc skupia się na dalszej ekspansji na terenie Wielkiej Brytanii, Szwajcarii, reszty Europy i na Bliskim Wschodzie 

Już teraz WealthArc pomaga zarządzać ponad 10 miliardami dolarów na całym świecie i może pochwalić się wieloma referencjami na terenie Szwajcarii, w tym od Arfina Capital i EB Finanz.

## Opis problemu
Dział rozwoju WealthArc podzielony jest na dwa zespoły. Każdy zespół ma niezależną odpowiedzialność za część całej platformy. Również każdy zespół ma nieco inne podejście do planowania pracy, użycia różnych narzędzi, manualnych zadań i dość złożonej strategii kontroli wersji. Proces tworzenia oprogramowania nie jest jednoznaczny dla każdego członka zespołu, są nadmiarowe zadania oraz aktywności. Wszystkie te elementy powodują znaczące obciążenie organizacyjne.

Ponadto każdy klient korzysta z niezależnego wystąpienia aplikacji (Azure Web App, Azure Storage i Azure SQL Database). Wdrażanie aplikacji dla istniejących klientów odbywa się ręcznie w każdym środowisku klienta niezależnie. Proces ten staje się uciążliwy, gdy liczba klientów wzrasta. Wdrażanie infrastruktury Azure i kodu aplikacji dla nowych klientów jest również procesem ręcznym.

Poza tym nie ma żadnego szablonu/skryptu tworzenia środowisk DevTest na żądanie wg określonego standardu.

## Podjęte dziania w celu rozwiązania problemu
Podczas warsztatów, zespoły z firmy Microsoft i WealthArc próbowały rozwiązać powyższe problemy w następujących działaniach:
- Omówienie architektury
- Ćwiczenie Value Stream Mapping
- Dostosowanie procesów do zarządzania pracą
- Dostosowanie strategii repozytorium i jakość kodu
- Zaprojektowanie definicji budowy i wydania aplikacji Web
- Sposoby dostarczenia środowisk DevTest "na zadanie"

### Architektura
Zaczęliśmy od dyskusji na temat aktualnej architektury. Zespół WealthArc omówił, jak działa ich rozwiązanie, jakie komponenty są wykorzystywane, jak wszystko jest podłączone.

Z punktu widzenia wysokopoziomowego, całe rozwiązanie jest podzielone na dwie aplikacje: aplikację Web przeznaczoną dla użytkowników końcowych oraz drugą - przetwarzanie danych i aplikacja ETL.

*Obrazek 2. Dyskusja o architekturze*

![Dyskusja o architekturze]({{site.baseurl}}/images/2017-05-19-wealtharc/architecture-discussion.jpg)

Ta aktywność była bardzo przydatna dla każdego uczestnika warsztatów, aby każdy miał podobny stan wiedzy (włączając w to osoby z firmy WeathAr - ponieważ istnieją dwa niezależne zespoły).

### Value Stream Mapping
Po transferze wiedzy architektonicznej, wykonaliśmy ćwiczenie [Value Stream Mapping] (https://en.wikipedia.org/wiki/Value_stream_mapping) (VSM) dla istniejącego procesu wytwórczego oprogramowania.

*Obrazek 3. Value Stream Mapping*

![Value Stream Mapping]({{site.baseurl}}/images/2017-05-19-wealtharc/vsm.jpg)

Ćwiczenie VSM otworzyło oczy zespołom WealthArc, pokazując jak ich aktualny proces nie jest zbyt jasny i ma sporo zbędnych aktywności, takich jak np. ręczne procesy, nieznana odpowiedzialność, przełączanie się pomiędzy zadaniami, itd.

W oparciu o wynik ćwiczenia VSM, wdrożyliśmy kilka praktyk DevOps, takich jak:
- **Continuous Integration (CI)** do automatyzacji tworzenia i testowania kodu za każdym razem, gdy członek zespołu doda zmianę do repozytorium.
- **Release Management (RM)** do zarządzania, planowania i kontrolowania dostarczania oprogramowania na różnych etapach procesu wytwórczego i w różnych środowiskach.
- **Infrastructure as Code (IaC)** do zarządzania infrastrukturą w modelu deklaratywnym przy użyciu tego samego systemu kontroli wersji, którego używają zespoły programistyczne.
- **Configuration Management (CM)** w celu zarządzania różnymi konfiguracjami na każdym etapu i/lub w różnych środowiskach. Np: inny *connection string* do bazy danych SQL dla środowisk devtest i produkcji.
- **Continuous Deployment (CD)** dla konfiguracji i wdrażania poprawnie zbudowanego i przetestowanego automatycznie oprogramowania na różne środowiska.

### Zarządzenie pracą
WealthArc miał już narzędzie do zarządzania pracą oparte o Atlassian JIRA. Po zapoznaniu się z możliwościami VSTS, zdecydowali się wykorzystać je do przyszłych iteracji. Wbudowany w VSTS proces Scrum jednak nie spełniał wymagań WealthArc, więc został utworzony nowy na podstawie szablonu Agile. Tylko kilka elementów zostało zmodyfikowanych, np. jak dodanie więcej informacji o ludziach zaangażowanych w daną pracę.

*Obrazek 4. Dostosowany formularz User Story - dodane szczegóły dotyczące osób*

![Dostosowany formularz User Story - dodane szczegóły dotyczące osób]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-work-usform.png)

WealthArc posiada dwa zespoły programistyczne odpowiedzialne za aplikację ETL (nazwa kodowa Musca) i aplikację Web (nazwa kodowa Volans). Jednym z ich wymogów było posiadanie różnych iteracji dla każdego zespołu. Dodatkowo wymogiem były iteracje do celów ogólnych i zarządczych, nie bezpośrednio związanych z rozwojem oprogramowania. Cele zostały osiągnięte poprzez implementację trzech zespołów w VSTS - jednego ogólnego WealthArc i dwóch zorientowanych na rozwój oprogramowania - Musca i Volans. Każdy zespół posiada własny obszar roboczy, a także dedykowane iteracje.

*Obrazek 5. Projekt VSTS podzielony na zespoły*

![Projekt VSTS podzielony na zespoły]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-wrok-teams.png)

*Obrazek 6. Projekt VSTS podzielony na obszary*

![Projekt VSTS podzielony na obszary]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-wrok-areas.png)

*Obrazek 7. Przypisane iteracje do obszarów i zespołów w VSTS*

![Przypisane iteracje do obszarów i zespołów w VSTS]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-wrok-iterations.png)

### Wysokiej jakości kod w gałęzi głównej i strategia rozgałęzienia
W tej sekcji opisano, jak repozytorium kodu zostało dostosowane do codziennego pracy związanej z rozwojem i utrzymaniem wysokiej jakości kodu.

#### Strategia rozgałęzienia
WealthArc korzystał już z prywatnych repozytoriów Git w VSTS, ale mieli bardzo złożoną strategię, nie bardzo jasną dla każdego członka zespołów. Po szybkiej burzy mózgów zdecydowaliśmy się na uproszczenie strategii i zbudowanie nowego planu opartego na tych trzech koncepcjach:
1. Używanie gałęzi *funkcji* dla wszystkich nowych funkcjonalności i poprawek.
2. Scalanie zmian z gałęzi *funkcji* do gałęzi głównej przy użyciu *pull requests*.
3. Zachowanie wysokiej jakości kodu w gałęzi głównej.

*Obrazek 8. Burza mózgów*

![Burza mózgów]({{site.baseurl}}/images/2017-05-19-wealtharc/brainstorming.jpg)

Nowa struktura dla gałęzi w repozytorium Git:
- **master** - gałąź główna.
- **feature** - katalog dla gałęzi *funkcji*.
- **bugfix** - katalog dla gałęzi *poprawek*, które nie są częścią stabilnego wydania.
- **hotfix** - katalog dla gałęzi *poprawek*, które są częścią stabilnego wydania.
- **release** - katalog dla gałęzi *wydania* stabilnej wersji wysłanej do QA.

*Obrazek 9. Nowa strategia gałęzi*

![Nowa strategia gałęzi]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-code-branchstrategy.png)

>Jeśli planujesz strategię gałęzi Git, powinieneś przeczytać ten artykuł i utrzymać strategię gałęzi w jak najprostszym modelu: [Adopt a Git branching strategy](https://www.visualstudio.com/en-us/articles/git-branching-guidance).

#### Polityki gałęzi głównej
Kilka polityk zostało włączonych dla gałęzi **master**, w celu zachowania wysokiej jakości kodu. Każda z poniższych polityk musi zostać zakończona pomyślnie, aby zezwolić na scalenie zmian z *pull request*.

##### Polityka "Require a successful build"
Polityka wymaga, aby zmiany w *pull request* zostały pomyślnie zbudowane w procesie *build* przez scaleniem zmian.

*Obrazek 10. Polityki w VSTS - Require a successful build*

![Polityki w VSTS - Require a successful build]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-code-policybuild.png)

Ta polityka jest związana z definicją *Build* - która sprawdza, czy nowy kod jest prawidłowo zbudowany. Testy jednostkowe są również sprawdzane. Poniżej znajduje się obrazek z definicją *Build* dla polityki. Definicja jest bardzo prosta i zawiera tylko cztery kroki:
1. **Get sources** - pobierz źródła z repozytorium Git.
2. **NuGet restore** - zainstaluj lub przywróć brakujące pakiety NuGet.
3. **Build solution** - zbuduj przy użyciu MSBuild.
4. **Test assemblies** - uruchom testy przy użyciu Visual Studio test runner.

*Obrazek 11. Definicja Build w VSTS dla pull request*

![Definicja Build w VSTS dla pull request]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-code-policybuilddef.png)

##### Polityka "Require linked work items"
Wymagaj połączenia pomiędzy *pull request* a obiektem związanym z organizacją pracy, aby zapewnić, że zmiany są śledzone i związane ściśle z procesem zarządzania pracą.

*Obrazek 12. Polityki w VSTS - Require linked work items*

![Polityki w VSTS - Require linked work items]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-code-policywork.png)

##### Polityka "Require code reviews"
Wymagaj, aby zespoły sprawdzały zmiany znajdujące się w *pull request*. Ustaliliśmy minimalną liczbę recenzentów na dwóch. Dodatkowo osoba, która wysłała *pull request* nie może zatwierdzić własnych zmian.
Ponieważ dwa zespoły pracują nad dwoma różnymi aplikacjami w całym rozwiązaniu, zdecydowaliśmy się utworzyć dwie grupy dla każdego zespołu, których członkami są starsi programiści. Każda grupa została powiązana z procesem recenzowania dedykowanym tylko konkretnej ścieżce zawierającej odpowiedni projekt.

*Obrazek 13. Polityki w VSTS - Require code reviews*

![Polityki w VSTS - Require code reviews]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-code-policyreview.png)

##### Polityka "All comments are resolved"
Sprawdź, czy wszystkie komentarze dotyczące *pull request* są rozwiązane.
Podczas recenzowania kodu, recenzent może dodawać komentarze dla programisty z notatkami, pomysłami, itp. Jeśli jakikolwiek komentarz nie zostanie rozwiązany, nie będzie można zakończyć scalania *pull request*.

*Obrazek 14. Polityki w VSTS - All comments are resolved*

![Polityki w VSTS - All comments are resolved]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-code-policycomments.png)

##### Polityka "Merge requirements"
Utrzymuj spójną historię gałęzi poprzez egzekwowanie strategii scalania *pull request*. Uzgodniliśmy, że historia komentarzy gałęzi nie będzie przenoszona do gałęzi głównej, czyli będzie wymuszenie operacji *squash changes*.

*Obrazek 15. Polityki w VSTS - Merge requirements*

![Polityki w VSTS - Merge requirements]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-code-policymerge.png)

### Definicje budowy oraz wydania dla aplikacji Web
Jednym z najbardziej bolesnych zadań zespołu WealthArc było ręczne wdrożenie na produkcję i środowiska DevTest. Podczas hackfestu stworzyliśmy definicje dla praktyk CI / CD dla aplikacji Web skupiającej się na środowiskach DevTest.

#### Continuous Integration
Definicja *Build* dla CI nie była zbyt wyszukana, większość kroków jest opartych na konfiguracji out-of-box z szablonu aplikacji ASP.NET w VSTS, ale dwa ważne elementy zostały dostosowane - transformacja XDT oraz filtry w mechanizmie automatyzacji wywołania.

Użyliśmy rozszerzenia [XDT Transform](https://marketplace.visualstudio.com/items?itemName=qetza.xdttransform) do wstawiania tokenów dla plików konfiguracyjnych Web.config i ApplicationInsights.config w celu zastąpienia lokalnych ustawień i przygotowania artefaktu w trakcie procesu wydawania z odpowiednią wartością dla każdego środowiska.

*Obrazek 16. VSTS Continuous Integration - Transformacja XDT*

![VSTS Continuous Integration - Transformacja XDT]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-build-cixdt.png)

Repozytorium Git utrzymuje kod źródłowy dla obu projektów, ale proces *Build* powinien być uruchomiony tylko wtedy, gdy zmiany powstały tylko w aplikacji Web (projekt Volans). Aby to osiągnąć, włączyliśmy filtry dla ścieżek.

*Obrazek 17. VSTS Continuous Integration - Filtry*

![VSTS Continuous Integration - Filtry]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-build-citriggers.png)

#### Continuous Deployment
Proces wydawania jest automatycznie uruchamiany przez pomyślne zakończony proces budowy (Continuous Integration) i jest podzielony między 4 środowiska:
1. **Dev** - Dedykowane środowisko dla zespołów rozwojowych dla podstawowej weryfikacji.
2. **QA** - Dedykowane środowisko dla testerów do wykonywania planów testowych.
3. **Staging** - slot *staging* czekający na nowe wydanie.
4. **Production** - slot produkcyjny.

##### Zmienne
Definicja związana z wydaniem wykorzystuje kilka zmiennych zdefiniowanych dla wszystkich środowisk, a także dla każdego środowiska osobno np. do zastąpienia tokenów w plikach konfiguracyjnych np. definicje połączeń do różnych baz danych.

*Obrazek 18. VSTS Release Management - Zmienne dla całej definicji*

![VSTS Release Management - Zmienne dla całej definicji]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-release-cdvar.png)

*Obrazek 19. VSTS Release Management - Zmienne dla środowiska Dev*

![VSTS Release Management - Zmienne dla środowiska Dev]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-release-cddevvar.png)

##### Środowiska Dev, QA, Staging
Środowiska Dev, QA, Staging mają dosyć podobne definicje. Poniżej znajdują się kroki zastosowane w definicjach.

*Obrazek 20. VSTS Release Management - Definicja dla środowiska Dev*

![VSTS Release Management - Definicja dla środowiska Dev]({{site.baseurl}}/images/2017-05-19-wealtharc/vsts-release-cddev.png)

1. Utwórz lub zaktualizuj grupę zasobów opartą na szablonach ARM Templates (Infrastructure as Code).
```
Title: Create or Update Azure Resources
Task: Azure Resource Group Deployemnt
Action: Create or update resource group
Resource group: $(resourceGroup)
Location: $(location)
Template location: Linked artifact
Template: $(System.DefaultWorkingDirectory)/CI.Volans.master/drop/Volans.CloudInfra/volansWebApp.json
Template parameters: $(System.DefaultWorkingDirectory)/CI.Volans.master/drop/Volans.CloudInfra/volansWebApp.parameters.json
Override template parameters: -webAppName $(webAppName)
Deployment mode: Incremental
```

2. Przechwyć wynik z szablonów ARM z kluczem usługi Application Insights. Zadanie bazuje na rozszerzeniu [ARM Outputs](https://marketplace.visualstudio.com/items?itemName=keesschollaart.arm-outputs).
```
Title: Capture ARM Outputs: appInsightInstrumentationKey
Task: ARM Outputs
Resource Group: $(resourceGroup)
```

3. Zamień tokeny w plikach Web.config i ApplicationInsights.config, które pasują do zmiennych (uwzględnij również zmienne z zadania ARM Output). Zadanie bazuje na rozszerzeniu [Replace Tokens](https://marketplace.visualstudio.com/items?itemName=qetza.replacetokens).
```
Title: Replace tokens in *.config
Task: Replace Tokens
Root directory: $(System.DefaultWorkingDirectory)/CI.Volans.master/drop/config
Target files: *.config
Files encoding: auto
Token prefix: __
Token suffix: __
```

4. Utwórz plik ZIP z plikami Web.config i ApplicationInsights.config po zastąpieniu tokenów.
```
Title: Archive config files
Task: Archive files
Root folder (or file) to archive: $(System.DefaultWorkingDirectory)/CI.Volans.master/drop/config
Prefix root folder name to archive paths: false
Archive type: zip
Archive file to create: $(System.DefaultWorkingDirectory)/CI.Volans.master/drop/config.zip
Replace existing archive: true
```

5. Wdróż aplikację do usługi Azure AppService poprzez mechanizm Web Deploy.
```
Title: Deploy WebApp to Azure AppService
Task: Azure App Service Deployment
Package or Folder: $(System.DefaultWorkingDirectory)/CI.Volans.master/drop/Volans.zip
Publish using Web Deploy: true
```

6. Wdróż pliki konfiguracyjne do usługi Azure AppService poprzez mechanizm Web Deploy.
```
Title: Deploy config files to Azure AppService
Task: Azure App Service Deployment
Package or Folder: $(System.DefaultWorkingDirectory)/CI.Volans.master/drop/config.zip
Publish using Web Deploy: true
```

7. Przeładuj aplikację po całym procesie wdrażania.
```
Title: Restart Azure App Service
Task: Azure App Service Manage
Action: Restart App Service
App Service name: $(webAppName)
```

##### Infrastructure as Code
Zasoby Azure dla aplikacji Web (w tym Application Insight) są dostarczane przez szablony ARM Templates.
Pełny szablon ARM można znaleźć w repozytorium GitHub: [volantWebApp.json](https://github.com/DariuszPorowski/TechCaseStudies/blob/master/WealthArc/volantWebApp.json)
Plik parametrów dla powyższego szablonu można znaleźć w repozytorium GitHub: [volantWebApp.parameters.json](https://github.com/DariuszPorowski/TechCaseStudies/blob/master/WealthArc/volantWebApp.parameters.json)

### Szybkie dostarczanie środowisk DevTest
Drugim, najbardziej bolesnym problemem dla WealtArc było tworzenie środowisk DevTest dla programistów. Wszystko było ustawiane ręcznie i zajmowało sporo czasu. Jednym z głównych wymagań było klonowanie wzorcowej bazy danych z przykładowymi danymi, itp. Aby przyspieszyć to, przygotowaliśmy szablony ARM wywoływany ad-hoc, które dostarczał całe środowisko DevTest zawierające klon bazy danych.

#### Infrastructure as Code dla środowiska DevTest
Najciekawsza część procesu klonowania bazy danych przy użyciu szablonu ARM można znaleźć poniżej. Kluczowy jest parametr **createMode** ustawiony jako **Copy**.

adhocDevTest.json
```json
        {
          "apiVersion": "2014-04-01",
          "name": "[concat(parameters('sqlServerName'), '/', parameters('databaseName'))]",
          "location": "[resourceGroup().location]",
          "properties": {
            "createMode": "[variables('databaseCreateMode')]",
            "sourceDatabaseId": "[variables('sourceDatabaseId')]",
            "requestedServiceObjectiveName": "[parameters('databaseRequestedServiceObjectiveName')]"
          },
          "dependsOn": [
            "[concat('Microsoft.Sql/servers/', parameters('sqlServerName'))]"
          ],
          "type": "Microsoft.Sql/servers/databases"
        }
```
Pełny szablon ARM można znaleźć w repozytorium GitHub: [adhocDevTest.json](https://github.com/DariuszPorowski/TechCaseStudies/blob/master/WealthArc/adhocDevTest.json)

## Wnioski i pomysy na przyszłość
Wynik warsztatów był bardzo satysfakcjonujący dla WealthArc. Zaprojektowaliśmy podstawowy proces wytwórczy i zwiększyliśmy świadomość w praktykach DevOps.
Dodatkowo daliśmy pewne zalecenia i pomysły na przyszłość, na przykład:
- Utrzymanie jednego kodu dla aplikacji Web w podejściu multitenant i wprowadzenie flag funkcyjnych.
- Użycie Azure KeyVault do poprawy bezpieczeństwa przechowywania kluczy/certyfikatów.
- Automatyzacja testów, np. testy jednostkowy, testy Selenium, itd.
- Zaprojektowanie CI/CD dla drugiej części rozwiązania - aplikacja ETL.
- Zaprojektowanie Release Managemen dla dostarczania środowisk DevTest w trybie ad-hoc opartych na szablonie ARM.

Kilka ciekawych faktów i usprawnień po warsztatach:
- Skróciliśmy czas dostarczania środowiska ad-hoc DevTest z ok. 6 godzin (praca ręczna + czas oczekiwania) do 15 minut (automatyczny proces na żądanie).
- Zautomatyzowaliśmy proces sprawdzania poprawności *pull request*, co skróciło ogólny czas (praca ręczna + czas oczekiwania) od około 2-4 godzin do 15 minut.
- Wyeliminowaliśmy czynniki związane z błędem ludzkim poprzez tokenizowanie plików XML. Teraz programiści nie są odpowiedzialni za konfigurację, co zmniejszyło nakład pracy i czas przygotowania wydania do 0 z około 30 minut.

### Referencja dotyczące projektu od firmy WealthArc
> "Dariusz jest prawdziwym ewangelistą! Podczas warsztatów znacznie poprawiliśmy nasz proces wytwórczy oprogramowania i otrzymaliśmy konstruktywne porady dotyczące przyszłych usprawnień.
> Firma Microsoft udowodniła, że oferuje nie tylko fantastyczną platformę chmurową, ale także chętnie dzieli się wiedzą i kształci klientów Microsoft Azure."
> 
> Radomir Mastalerz, CTO firmy WealthArc

## Dodatkowe zasoby
Aby uzyskać więcej informacji o DevOps, zobacz:
- [Teoria i implementacja DevOps](https://www.visualstudio.com/devops)
- [DevOps w Microsoft](https://www.visualstudio.com/en-us/articles/devopsmsft/overview)
- [Microsoft - nasza podróż do DevOps](http://stories.visualstudio.com/devops)

Dobrym punktem wejścia dla uzyskania więcej informacji o użytych technologiach są poniższe zasoby:
- [dokumentacja Visual Studio Team Services](https://www.visualstudio.com/en-us/docs/overview)
- [dokumentacja Azure App Service](https://docs.microsoft.com/en-us/azure/app-service)
- [dokumentacja Azure SQL Database](https://docs.microsoft.com/en-us/azure/sql-database)
- [dokumentacja Azure Application Insights](https://docs.microsoft.com/en-us/azure/application-insights)
- [dokumentacja Azure Resource Manager](https://docs.microsoft.com/en-us/azure/azure-resource-manager)
