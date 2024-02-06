@echo off
setlocal enabledelayedexpansion

set "directorio=C:\Users\barri\OneDrive\Desktop\ETER\src\assets\ilustraciones"

for %%F in ("%directorio%\*.png") do (
    set "archivo=%%~nF"
    set "nuevo_nombre=!archivo:%%20=-!"
    ren "%%F" "!nuevo_nombre!.png"
    echo Renombrado: "%%F" -^> "!nuevo_nombre!.png"
)

endlocal
