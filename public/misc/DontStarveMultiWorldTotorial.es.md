# Tutorial: crear un mundo multi-nivel en el panel dst-admin-go

Activar un mundo multi-nivel es algo muy sencillo en este panel: puedes añadir o quitar niveles libremente, y la interfaz está adaptada al mod de selector multi-nivel.

**A continuación, como ejemplo, vamos a crear un mundo de tres niveles: un bosque y dos cuevas**

## 1. Añadir mundos

Añade dos mundos (el puerto, el id de mundo y el orden de nombres ya vienen configurados por defecto)

![Untitled](misc/images/DontStarveMultiWorldTotorial/Untitled.png)

Así se ve la interfaz una vez añadidos

![Untitled](misc/images/DontStarveMultiWorldTotorial/Untitled%201.png)

## 2. Configurar el selector multi-nivel

Ahora configura el selector multi-nivel. Siguiendo la configuración de abajo, define el id de mundo, la categoría y la distribución de tráfico, y pulsa guardar; esto añadirá el mod de selección multi-nivel.

![Untitled](misc/images/DontStarveMultiWorldTotorial/Untitled%202.png)

## 3. Iniciar los mundos

Ahora vamos a iniciar todos los mundos

```go
[00:00:12]: Mod: workshop-1754389029 (多层世界选择器)	Loading modworldgenmain.lua	
[00:00:12]: Mod: workshop-1754389029 (多层世界选择器)	  Mod had no modworldgenmain.lua. Skipping.	
[00:00:12]: Mod: workshop-1754389029 (多层世界选择器)	Loading modmain.lua	
```

Veremos que el mod "Selector de mundo multi-nivel" ya se está cargando

![Untitled](misc/images/DontStarveMultiWorldTotorial/Untitled%203.png)

Cuando veas el siguiente contenido, significa que ya está todo listo

```go
[00:00:37]: [SyncWorldSettings] Resyncing master world option dropeverythingondespawn = default to secondary shards.	
[00:00:42]: [Shard] Secondary shard 洞穴2(3) connected: [LAN] 127.0.0.1
[00:00:44]: [Shard] Secondary 洞穴2(3) ready!
[00:00:44]: World 3 is now connected	

[00:00:44]: [SyncWorldSettings] Resyncing master world option ghostsanitydrain = always to secondary shards.	
[00:00:44]: [SyncWorldSettings] Resyncing master world option darkness = default to secondary shards.	
[00:00:44]: [SyncWorldSettings] Resyncing master world option resettime = default to secondary shards.	
ncWorldSettings] Resyncing master world option dropeverythingondespawn = default to secondary shards.	
```

## 4. Usa el panel para consultar el servidor en línea y comprobar que el número de niveles coincide

Si el número de mundos es 2, significa que ya está completamente configurado

![Untitled](misc/images/DontStarveMultiWorldTotorial/Untitled%204.png)
