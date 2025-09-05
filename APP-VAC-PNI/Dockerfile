#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["APP-VAC-PNI/APP-VAC-PNI.csproj", "APP-VAC-PNI/"]
RUN dotnet restore "APP-VAC-PNI/APP-VAC-PNI.csproj"
COPY . .
WORKDIR "/src/APP-VAC-PNI"
RUN dotnet build "APP-VAC-PNI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "APP-VAC-PNI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "APP-VAC-PNI.dll"]
