local hasShutdown = false

AddEventHandler("playerSpawned", function()
    if hasShutdown then return end
    hasShutdown = true

    Citizen.CreateThread(function()
        SendLoadingScreenMessage(json.encode({ type = "shutdown" }))
        Citizen.Wait(1500)
        DoScreenFadeOut(0)
        ShutdownLoadingScreenNui()
        Citizen.Wait(500)
        DoScreenFadeIn(2000)
    end)
end)
