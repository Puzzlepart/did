Param(
    [Parameter(Mandatory = $true)]
    [string]$ResourceGroupName,
    [Parameter(Mandatory = $true)]
    [string]$AppName,
    [Parameter(Mandatory = $false)]
    [string]$Slot,
    [Parameter(Mandatory = $false)]
    [switch]$Disable,
    [Parameter(Mandatory = $true)]
    [string]$SubscriptionId,
    [Parameter(Mandatory = $false)]
    [string]$Message = "Maintenance mode is enabled for this slot. Please try again later."
)

# Log in to Azure CLI
az login --subscription $SubscriptionId

# Set the application settings for the specified slot
az webapp config appsettings set `
    --name $AppName `
    --resource-group $ResourceGroupName `
    --slot $Slot `
    --settings MAINTENANCE_MODE=$($Disable.IsPresent ? '0' : '1') `
    --output none

if(-not $Disable.IsPresent) {
    if(-not $Slot) {
        # Set the message for maintenance mode
        az webapp config appsettings set `
        --name $AppName `
        --resource-group $ResourceGroupName `
        --settings MAINTENANCE_MESSAGE=$Message `
        --output none
    } else {    
        # Set the message for maintenance mode
        az webapp config appsettings set `
            --name $AppName `
            --resource-group $ResourceGroupName `
            --slot $Slot `
            --settings MAINTENANCE_MESSAGE=$Message `
            --output none
    }
} else {
    # Clear the maintenance message
    az webapp config appsettings set `
        --name $AppName `
        --resource-group $ResourceGroupName `
        --slot $Slot `
        --settings MAINTENANCE_MESSAGE="" `
        --output none
}

Write-Host "Maintenance mode set to $($Disable.IsPresent ? 'disabled' : 'enabled') for $AppName in $Slot slot. Restarting application..."

az webapp restart `
    --name $AppName `
    --resource-group $ResourceGroupName `
    --slot $Slot `
    --output none


# Wait for application to restart
$waitTime = 120
$startTime = Get-Date
$endTime = $startTime.AddSeconds($waitTime)
while ((Get-Date) -lt $endTime) {
    Start-Sleep -Seconds 15
    $status = az webapp show `
        --name $AppName `
        --resource-group $ResourceGroupName `
        --slot $Slot `
        --query state `
        --output tsv

    if ($status -eq "Running") {
        Write-Host "Application is running."
        break
    } else {
        Write-Host "Waiting for application to start..."
    }
}

Start-Process "https://$AppName-$Slot.azurewebsites.net"