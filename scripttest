repeat wait() until game:IsLoaded()
wait(2)

Ranks = require(game.ReplicatedStorage.Library.Types.Ranks)
Data = require(game.ReplicatedStorage.Library.Client.Save)
Zones = require(game.ReplicatedStorage.Library.Directory.Zones)
Eggs = require(game.ReplicatedStorage.Library.Directory.Eggs)
remotes = game.ReplicatedStorage.Network
teleportr = remotes.Teleports_RequestTeleport
vending_buy = remotes.VendingMachines_Purchase
daily_redeem = remotes.DailyRewards_Redeem
hum = game.Players.LocalPlayer.Character.Humanoid
merchant_buy = remotes.Merchant_RequestPurchase

function FetchData(name)
    return Data:GetSaves()[game.Players.LocalPlayer][name]
end

function GetLastZone()
    List = {}
    for i,v in pairs(FetchData("UnlockedZones")) do
        table.insert(List , tonumber(Zones[tostring(i)].ZoneNumber))
    end

    max = 0
    for i,v in pairs(List) do
        if v > max then
            max = v
        end
    end

    for i,v in pairs(Zones) do
        if v.ZoneNumber == max then
            return v.ZoneName , v.ZoneNumber
        end
    end

    return nil
end

function GetZones_Num()
    _ , a = GetLastZone()
    return a
end

function Match_Zone(zone)
    for i,v in pairs(FetchData("UnlockedZones")) do
        if tostring(i) == zone then
            return true
        end
    end
    return false
end

function GetZones_Num()
    _ , a = GetLastZone()
    return a
end

function GetRandomZone()
    List = {}
    for i,v in pairs(Zones) do
        if Match_Zone(tostring(i)) then
            table.insert(List , tostring(i))
        end
    end
    return List[math.random(1 , #List)]
end

function GetZoneName_ByNum(num)
    for i,v in pairs(Zones) do
        if v.ZoneNumber == num then
            return v.ZoneName
        end
    end
    return nil
end


function GoToBestZone()
    Last_Zone = GetLastZone()

    game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
end

function GoToZone(name)

    game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[name].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[name].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[name].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
end

function GetEggNumFromName(name)
    for ii,vv in pairs(Eggs) do
        if tostring(ii) == name then
            return vv.eggNumber
        end
    end
    return nil
end

local machines = {
    {"PotionVendingMachine1";"Cherry Blossom"};
    {"PotionVendingMachine2";"Safari"};
    {"EnchantVendingMachine1";"Misty Falls"};
    {"EnchantVendingMachine2";"Fire and Ice"};
    {"FruitVendingMachine1";"Mushroom Field"};
    {"FruitVendingMachine2";"Pirate Cove"};
}

local DailyRedeemables = {
    {"Castle"; "SmallDailyDiamonds"};
    {"Jungle";"DailyPotions"};
    {"Red Desert"; "MediumDailyDiamonds"};
}

local Merchants = {
    {"RegularMerchant";"Oasis"};
    {"AdvancedMerchant"; "Ice Rink"}
}













-- script











local Fluent = loadstring(game:HttpGet("https://raw.githubusercontent.com/bunny42312/GUI/main/G"))()
local SaveManager = loadstring(game:HttpGet("https://raw.githubusercontent.com/dawid-scripts/Fluent/master/Addons/SaveManager.lua"))()

local Window = Fluent:CreateWindow({
    Title = "Muimi Hub",
    SubTitle = "Pet Simulator 99 New!",
    TabWidth = 100,
    Size = UDim2.fromOffset(620, 500),
    Acrylic = false, -- The blur may be detectable, setting this to false disables blur entirely
    Theme = "Dark",
    MinimizeKey = Enum.KeyCode.End -- Used when theres no MinimizeKeybind
})

Zones_List = {}
for i,v in pairs(Zones) do
    table.insert(Zones_List , v.ZoneName)
end

table.sort(Zones_List , function(a , b)
    return a < b
end)

Eggs_List = {}
for i,v in pairs(Eggs) do
    table.insert(Eggs_List , tostring(i))
end

table.sort(Eggs_List , function(a , b)
    return a < b
end)

local Tabs = {
    Main = Window:AddTab({ Title = "Main", Icon = "home" }),
    Misc = Window:AddTab({ Title = "Misc", Icon = "plus-circle" }),
    Eggs = Window:AddTab({ Title = "Eggs", Icon = "egg" }),
    Quest = Window:AddTab({ Title = "Quest", Icon = "file-question" }),
    Teleport = Window:AddTab({ Title = "Teleport", Icon = "palmtree" }),
}

local Dropdown = Tabs.Main:AddDropdown("SelectZone", {
    Title = "Select Zone!",
    Values = Zones_List,
    Multi = false,
    Default = "Spawn",
}):OnChanged(function(value)
    _G.SelectZone = value
end)

local Toggle = Tabs.Main:AddToggle("AutoFarmSelectedArea", {Title = "Auto Farm Selected Zone", Default = false }):OnChanged(function(t)
    _G.AutoFarmSelectedArea = t
end)
local Toggle = Tabs.Main:AddToggle("AutoFarmBestZone", {Title = "Auto Farm Best Zone", Default = false }):OnChanged(function(t)
    _G.AutoFarmBestZone = t
end)
local Toggle = Tabs.Main:AddToggle("AutoUnlockNextZone", {Title = "Auto Unlock Next Zone", Default = false }):OnChanged(function(t)
    _G.AutoUnlockNextZone = t
end)

local Toggle = Tabs.Main:AddToggle("AutoFarmVIP", {Title = "Auto Farm VIP Zone ( Have VIP )", Default = false }):OnChanged(function(t)
    _G.AutoFarmVIP = t
end)

Tabs.Main:AddParagraph({
    Title = "Farm Things!",
    Content = "Things!!\n Tips: Auto Farm Last Zone + Auto Unlock Next Zone is Auto Play!"
})

local Toggle = Tabs.Main:AddToggle("AutoFarmDiamond", {Title = "Auto Farm Diamonds ( Not VIP )", Default = false }):OnChanged(function(t)
    _G.AutoFarmDiamond = t
end)
local Toggle = Tabs.Main:AddToggle("AutoFarmSafe", {Title = "Auto Farm Safes", Default = false }):OnChanged(function(t)
    _G.AutoFarmSafe = t
end)
local Toggle = Tabs.Main:AddToggle("AutoFarmPresent", {Title = "Auto Farm Presents", Default = false }):OnChanged(function(t)
    _G.AutoFarmPresent = t
end)


-- add paragraph

Tabs.Misc:AddParagraph({
    Title = "Read This!",
    Content = "IF OPEN EGG STOP IN EGG HATCH IT MEAN WORK! IT ALREADY HATCH!"
})

local Dropdown = Tabs.Eggs:AddDropdown("SelectEgg", {
    Title = "Select Egg",
    Values = Eggs_List,
    Multi = false,
    Default = "Cracked Egg",
}):OnChanged(function(value)
    _G.SelectEgg = value
end)

local Toggle = Tabs.Eggs:AddToggle("AutoEgg", {Title = "Auto Open Egg", Default = false }):OnChanged(function(t)
    _G.AutoOpenEgg = t
end)


Tabs.Misc:AddParagraph({
    Title = "Enchant!",
})














spawn(function()
    pcall(function()
        while wait(.5) do
            if _G.AutoUnlockNextZone then
                local args = {
                    [1] = GetZoneName_ByNum(GetZones_Num() + 1)
                }

                game:GetService("ReplicatedStorage").Network.Zones_RequestPurchase:InvokeServer(unpack(args))
            end
        end
    end)
end)

spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoOpenEgg then

                
                        for iii,vvv in pairs(workspace.__THINGS.Eggs.Main:GetChildren()) do
                            if tonumber(string.match(vvv.Name , "%d+")) == GetEggNumFromName(_G.SelectEgg) then
                                game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = vvv.Center.CFrame * CFrame.new(0,0,4)
                            end
                        end
                    
                        local args = {
                            [1] = _G.SelectEgg,
                            [2] = FetchData("EggHatchCount")
                        }
                        
                        a = game:GetService("ReplicatedStorage").Network.Eggs_RequestPurchase:InvokeServer(unpack(args))




            end
        end
    end)
end)



spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoOpenEggFarmLastZone then
                
            
                local args = {
                    [1] = _G.SelectEgg,
                    [2] = FetchData("EggHatchCount")
                }
                
                a,b = game:GetService("ReplicatedStorage").Network.Eggs_RequestPurchase:InvokeServer(unpack(args))

                if a == false and b == "You are too far away from the egg!" then
                    for iii,vvv in pairs(workspace.__THINGS.Eggs.Main:GetChildren()) do
                        if tonumber(string.match(vvv.Name , "%d+")) == GetEggNumFromName(_G.SelectEgg) then
                            game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = vvv.Center.CFrame * CFrame.new(0,0,4)
                        end
                    end
                end
                
                if a == nil then
                    Last_Zone = GetLastZone()
            
                    game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
                
                    for ii,vv in pairs(game.workspace.__THINGS.Breakables:GetChildren()) do
                                                        
                        if vv:GetAttribute("ParentID") == Last_Zone then
                            
                            local args = {
                                [1] = vv:GetAttribute("BreakableUID")
                            }
                            
                            game:GetService("ReplicatedStorage").Network.Breakables_PlayerDealDamage:FireServer(unpack(args))  
                            break
                                            
                        end
                    end
                end

            

            end
        end
    end)
end)


local Toggle = Tabs.Misc:AddToggle("AutoCollectDrop", {Title = "Auto Collect Drops", Default = true }):OnChanged(function(t)
    _G.AutoCollectOrb = t
end)

local Toggle = Tabs.Misc:AddToggle("AutoCollectLootBags", {Title = "Auto Collect Lootbags", Default = true }):OnChanged(function(t)
    _G.AutoCollectLootBag = t
end)
local Toggle = Tabs.Misc:AddToggle("AutoFish", {Title = "Auto Fish", Default = false }):OnChanged(function(t)
    _G.AutoFish = t
end)

spawn(function()
    pcall(function()
        while wait(.5) do
            if _G.AutoFish then
            if workspace.__THINGS.__INSTANCE_CONTAINER.Active:FindFirstChild("Fishing") then
                if not a then
                a = require(workspace.__THINGS.__INSTANCE_CONTAINER.Active.Fishing.ClientModule.FishingGame)

                a.IsFishInBar = function() return true end
                end

                local args = {
                    [1] = "Fishing",
                    [2] = "RequestCast",
                    [3] = Vector3.new(1157.7513427734375, 75.91419219970703, -3453.863525390625)
                }

                game:GetService("ReplicatedStorage"):WaitForChild("Network"):WaitForChild("Instancing_FireCustomFromClient"):FireServer(unpack(args))
                wait(3.5)
                local args = {
                    [1] = "Fishing",
                    [2] = "RequestReel"
                }

                game:GetService("ReplicatedStorage"):WaitForChild("Network"):WaitForChild("Instancing_FireCustomFromClient"):FireServer(unpack(args))
                else
                    print("go fishing")
         
                        local args = {
                            [1] = "Pirate Tavern"
                        }

                        game:GetService("ReplicatedStorage"):WaitForChild("Network"):WaitForChild("Teleports_RequestTeleport"):InvokeServer(unpack(args))
                        wait(8)
                        if not workspace.__THINGS.__INSTANCE_CONTAINER.Active:FindFirstChild("Fishing") then
                        game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(794.2509155273438, 18.972103118896484, 1135.8216552734375)
                        end
                    
                end
            end
        end
    end)
end)

Tabs.Misc:AddParagraph({
    Title = "Merchant & Vending!",
    Content = "BUY AUTO ( WORK WHILE! ) !!"
})

local Dropdown = Tabs.Misc:AddDropdown("SelectTierRegularMerchant", {
    Title = "Select Tier ( RegularMerchant )!",
    Values = {"1" , "2" , "3" , "4" , "5" , "6"},
    Multi = true,
    Default = {"1"},
}):OnChanged(function(value)
    _G.SelectTierRegularMerchant = value
end)

local Toggle = Tabs.Misc:AddToggle("Auto Buy Regular Merchant", {Title = "Auto Buy Regular Merchant", Default = false }):OnChanged(function(t)
    _G.AutoBuyRegularMerchant = t
end)

local Dropdown = Tabs.Misc:AddDropdown("SelectTierAdvanceMerchant", {
    Title = "Select Tier ( AdvancedMerchant )!",
    Values = {"1" , "2" , "3" , "4" , "5" , "6"},
    Multi = true,
    Default = {"1"},
}):OnChanged(function(value)
    _G.SelectTierAdvancedMerchant = value
end)

local Toggle = Tabs.Misc:AddToggle("Auto Buy Advanced Merchant", {Title = "Auto Buy Advanced Merchant", Default = false }):OnChanged(function(t)
    _G.AutoBuyAdvancedMerchant = t
end)

spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoBuyRegularMerchant then
                for i,v in pairs(_G.SelectTierRegularMerchant) do
                    if v == true and not (FetchData("MerchantPurchases")["RegularMerchant"]["Purchases"][i]) then
                        _G.Buyyyy = true

                        GoToZone("Oasis")

                        repeat
                            a,b = merchant_buy:InvokeServer("RegularMerchant", tonumber(i))
                            wait(0.1)
                        until a == false
                       
                        _G.Buyyyy = false
                    end
                end
            end
        end
    end)
end)


spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoBuyAdvancedMerchant then
                for i,v in pairs(_G.SelectTierAdvancedMerchant) do
                    if v == true and not (FetchData("MerchantPurchases")["AdvancedMerchant"]["Purchases"][i]) then
                        _G.Buyyyy = true
                        GoToZone("Ice Rink")
                        
                        repeat
                            local args = {
                                [1] = "AdvancedMerchant",
                                [2] = tonumber(i)
                            }
                                
                            a,b = game:GetService("ReplicatedStorage").Network.Merchant_RequestPurchase:InvokeServer(unpack(args))
                                
                            wait(0.1)
                        until a == false

                        _G.Buyyyy = false
                      
                    end
                end
            end
        end
    end)
end)



Zones_List = {}
for i,v in pairs(Zones) do
    table.insert(Zones_List , v.ZoneName)
end

table.sort(Zones_List , function(a , b)
    return a < b
end)

local Dropdown = Tabs.Teleport:AddDropdown("SelectZone2", {
    Title = "Select Zone!",
    Values = Zones_List,
    Multi = false,
    Default = "Spawn",
}):OnChanged(function(value)
    _G.SelectZone2 = value
end)

local Toggle = Tabs.Teleport:AddToggle("Teleport", {Title = "Teleport Zone", Default = false }):OnChanged(function(t)
    _G.Teleport = t
end)

spawn(function()
    pcall(function()
        while wait() do
            if _G.Teleport then
                Last_Zone = _G.SelectZone2
                
                game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
            end
        end
    end)
end)

spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoFarmSafe then
                found = nil

                for i,v in pairs(Zones) do
                    if v.Breakables.Main then
                        for ii,vv in pairs(v.Breakables.Main.Data) do
                            if string.find(vv.Type , "Safe") then
                                Last_Zone = tostring(i)

                                if Match_Zone(Last_Zone) then
                                    game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
                                end
                            end
                        end
                    end
                end

                for ii,vv in pairs(game.workspace.__THINGS.Breakables:GetChildren()) do
                    if Match_Zone(vv:GetAttribute("ParentID")) and string.find(tostring(vv:GetAttribute("BreakableID")) , "Safe") then
                        game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = vv:GetPivot()

                        local args = {
                            [1] = vv:GetAttribute("BreakableUID")
                        }
                        
                        game:GetService("ReplicatedStorage").Network.Breakables_PlayerDealDamage:FireServer(unpack(args))  
                        found = true
                        break
                        
                    end
                end

                if found == nil then
                    ZoneSafe = GetZoneName_ByNum(16)

                    if Match_Zone(ZoneSafe) then
                        game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[ZoneSafe].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[ZoneSafe].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[ZoneSafe].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
                    end
                end
            end
        end
    end)
end)

spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoFarmVIP then
                game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(214.5154571533203, 27.293315887451172, -586.52490234375)

                for ii,vv in pairs(game.workspace.__THINGS.Breakables:GetChildren()) do
                    if vv:GetAttribute("VIPBreakable") and vv:GetAttribute("VIPBreakable") == true then
                    
                        local args = {
                            [1] = vv:GetAttribute("BreakableUID")
                        }
                        
                        game:GetService("ReplicatedStorage").Network.Breakables_PlayerDealDamage:FireServer(unpack(args))  
                        break
                    end
                end

            end
        end
    end)
end)

spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoFarmDiamond then
                ZoneSafe = GetRandomZone()

                game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[ZoneSafe].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[ZoneSafe].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[ZoneSafe].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
                
                for ii,vv in pairs(game.workspace.__THINGS.Breakables:GetChildren()) do
                    if Match_Zone(vv:GetAttribute("ParentID")) and string.find(tostring(vv:GetAttribute("BreakableID")) , "Diamond") and not v:GetAttribute("VIPBreakable") then
                        game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = vv:GetPivot()

                        local args = {
                            [1] = vv:GetAttribute("BreakableUID")
                        }
                        
                        game:GetService("ReplicatedStorage").Network.Breakables_PlayerDealDamage:FireServer(unpack(args))  
                        
                        break
                        
                    end
                end

            end
        end
    end)
end)

spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoFarmPresent then
                found = nil

                for i,v in pairs(Zones) do
                    if v.Breakables.Main then
                        for ii,vv in pairs(v.Breakables.Main.Data) do
                            if string.find(vv.Type , "Present") then
                                Last_Zone = tostring(i)

                                if Match_Zone(Last_Zone) then
                                    game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
                                end
                            end
                        end
                    end
                end

                for ii,vv in pairs(game.workspace.__THINGS.Breakables:GetChildren()) do
                    if Match_Zone(vv:GetAttribute("ParentID")) and string.find(tostring(vv:GetAttribute("BreakableID")) , "Present") then
                        game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = vv:GetPivot()

                        local args = {
                            [1] = vv:GetAttribute("BreakableUID")
                        }
                        
                        game:GetService("ReplicatedStorage").Network.Breakables_PlayerDealDamage:FireServer(unpack(args))  
                        found = true
                        break
                        
                    end
                end

                if found == nil then
                    ZoneSafe = GetZoneName_ByNum(6)

                    if Match_Zone(ZoneSafe) then
                        game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[ZoneSafe].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[ZoneSafe].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[ZoneSafe].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
                    end
                end
            end
        end
    end)
end)
spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoFarmSelectedArea then
                Last_Zone = _G.SelectZone
            
                game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
            
                for ii,vv in pairs(game.workspace.__THINGS.Breakables:GetChildren()) do
                                                    
                    if vv:GetAttribute("ParentID") == Last_Zone then
                        
                        local args = {
                            [1] = vv:GetAttribute("BreakableUID")
                        }
                        
                        game:GetService("ReplicatedStorage").Network.Breakables_PlayerDealDamage:FireServer(unpack(args))  
                        break
                                        
                    end
                end

                
            end
        end
    end)
end)

spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoFarmBestZone then
                Last_Zone = GetLastZone()
            
                game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame = CFrame.new(Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.X , Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Y + 2, Zones[Last_Zone].ZoneFolder.INTERACT.BREAK_ZONES.BREAK_ZONE.CFrame.Z)
            
                for ii,vv in pairs(game.workspace.__THINGS.Breakables:GetChildren()) do
                                                    
                    if vv:GetAttribute("ParentID") == Last_Zone then
                        
                        local args = {
                            [1] = vv:GetAttribute("BreakableUID")
                        }
                        
                        game:GetService("ReplicatedStorage").Network.Breakables_PlayerDealDamage:FireServer(unpack(args))  
                        break
                                        
                    end
                end

                
            end
        end
    end)
end)
spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoCollectOrb then
         
                for i,v in pairs(game:GetService("Workspace").__THINGS.Orbs:GetChildren()) do
                    if v.Center then
                        v.CFrame = game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame
                        v.Center.Item.Texture = ""
                    end
                end

            end
        end
    end)
end)


spawn(function()
    pcall(function()
        while wait() do
            if _G.AutoCollectLootBag then

                for _, v in pairs(workspace.__THINGS.Lootbags:GetChildren()) do
                    v:setPrimaryPartCFrame(game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame)
                end
                
                
            end
        end
    end)
end)

Window:SelectTab(1)
SaveManager:SetLibrary(Fluent)
SaveManager:IgnoreThemeSettings()
SaveManager:SetIgnoreIndexes({})
SaveManager:SetFolder("MuimiHub/specific-game")
SaveManager:BuildConfigSection(Tabs.Settings)
SaveManager:LoadAutoloadConfig()
