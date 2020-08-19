$entries = Import-Csv ./TimeEntries.csv

$ConfirmedPeriods = @()
$index = 1

foreach($entry in $entries | Select-Object) {
    if($index % 500 -eq 0) {
        Write-Output "Processing $index of $($entries.Count)"
    }
    $PeriodId = @($entry.WeekNumber, $entry.MonthNumber, $entry.YearNumber) -join "_"
    $Id = @($PeriodId, $entry.ResourceId) -join "_"

    $Period = $ConfirmedPeriods | Where-Object { $_.Id -eq $Id }
    if($Period) {
        $Period.Duration =[double]($Period.Duration) + [double]($entry.DurationHours)
    } else {
        $Period = New-Object -TypeName psobject 
        $Period | Add-Member -MemberType NoteProperty -Name Id -Value $Id
        $Period | Add-Member -MemberType NoteProperty -Name PartitionKey -Value $entry.ResourceId
        $Period | Add-Member -MemberType NoteProperty -Name RowKey -Value $PeriodId
        $Period | Add-Member -MemberType NoteProperty -Name WeekNumber -Value $entry.WeekNumber
        $Period | Add-Member -MemberType NoteProperty -Name MonthNumber -Value $entry.MonthNumber
        $Period | Add-Member -MemberType NoteProperty -Name YearNumber -Value $entry.YearNumber
        $Period | Add-Member -MemberType NoteProperty -Name Duration -Value $entry.DurationHours
        $ConfirmedPeriods += $Period
    }
    $index++
}

Write-Output "Generated $($ConfirmedPeriods.Length) periods from $($entries.Count) entries..."

$ConfirmedPeriods | Select-Object -ExcludeProperty Id -First 10 | Format-Table

$ConfirmedPeriods | Select-Object -ExcludeProperty Id | Export-Csv -Path ./ConfirmedPeriods.csv -Force