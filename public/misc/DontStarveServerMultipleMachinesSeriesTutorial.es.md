# Tutorial: enlazar varios servidores de Don't Starve Together - así de sencillo

> El siguiente tutorial es de propósito general

## Introducción

Cuando el rendimiento de nuestro servidor en la nube no da para abrir dos mundos o más, podemos repartir la carga entre varios servidores; los servidores secundarios pueden ser tanto locales como en la nube.

Como se muestra en la imagen:

![Untitled](misc/images/DontStarveServerMultipleMachinesSeriesTutorial/Untitled.png)

Podemos abrir un mundo de tres niveles, donde solo el mundo principal necesita estar en una IP pública; los demás mundos secundarios no necesitan estarlo.

> 💡 Nota: el puerto de comunicación del mundo principal, **master_port**, necesita tener el puerto UDP abierto

## Ejemplo

Supongamos que necesitamos enlazar una máquina

Ahora tenemos el mundo principal en **139.159.184.218**, y el mundo secundario 1 abierto localmente


| Servidor        | ip              | Rol                       | ¿IP pública? |
| ---------------- | --------------- | ------------------------- | ------------ |
| Mundo principal  | 139.159.184.218 | Mundo principal (superficie) | Sí necesaria |
| Mundo secundario 1 | 192.168.9.203 | Mundo secundario (cueva)   | No necesaria |

>💡 Nota: aquí solo se muestra un ejemplo de dos niveles; si son tres niveles o más, es necesario añadir el mod «Selector multi-nivel»
> **Además, el token de todos los mundos debe ser el mismo**

### Mundo principal

Abrimos el panel del servidor en la nube (**mundo principal**), abrimos la configuración de la sala, pulsamos `Todos`, dentro de la configuración de mundos múltiples.

- **IP de enlace: 0.0.0.0**
- **IP del mundo principal: 139.159.184.218**

Si necesitas cifrado, añade también la contraseña de comunicación, que debe coincidir en todos los mundos

![Untitled](misc/images/DontStarveServerMultipleMachinesSeriesTutorial/Untitled%201.png)

### Mundo secundario

Volvemos al panel local; aquí solo necesitamos modificar la IP de enlace y la IP del mundo principal

- **IP de enlace: 127.0.0.1**
- **IP del mundo principal: 139.159.184.218**

Si necesitas cifrado, añade también la contraseña de comunicación, que debe coincidir en todos los mundos

![Untitled](misc/images/DontStarveServerMultipleMachinesSeriesTutorial/Untitled%202.png)

### Inicio

Inicia en este orden: **mundo principal → mundo secundario 1 → …**

Al iniciar el mundo principal, su log muestra

```go
[00:00:37]: Validating portal[4] <-> <nil>[4] (inactive)	
[00:00:37]: Validating portal[5] <-> <nil>[5] (inactive)	
[00:00:37]: Validating portal[6] <-> <nil>[6] (inactive)	
[00:00:37]: Validating portal[7] <-> <nil>[7] (inactive)	
[00:00:37]: Validating portal[8] <-> <nil>[8] (inactive)	
[00:00:37]: Validating portal[9] <-> <nil>[9] (inactive)	
[00:00:37]: Validating portal[10] <-> <nil>[10] (inactive)	
[00:00:37]: Server registered via geo DNS in ap-southeast-1
[00:00:37]: Sim paused
```

Al iniciar el mundo secundario 1

```go
[00:00:46]: World 1 is now connected	
[00:00:46]: Telling Client our new session identifier: 30A50CF48D381EF6

[00:00:46]: [SyncWorldSettings] recieved world settings from master shard.	true		
[00:00:46]: [SyncWorldSettings] applying hunger = default from master shard.	
[00:00:46]: [SyncWorldSettings] applying basicresource_regrowth = none from master shard.	
[00:00:46]: Validating portal[10] <-> 1[10] (active)	
[00:00:46]: Validating portal[1] <-> 1[1] (active)	
[00:00:46]: Validating portal[9] <-> 1[9] (active)	
[00:00:46]: Validating portal[8] <-> 1[8] (active)	
[00:00:46]: Validating portal[2] <-> 1[2] (active)	
[00:00:46]: Validating portal[5] <-> 1[5] (active)	
[00:00:46]: Validating portal[4] <-> 1[4] (active)	
[00:00:46]: Validating portal[3] <-> 1[3] (active)	
[00:00:46]: Validating portal[6] <-> 1[6] (active)	
[00:00:46]: Validating portal[7] <-> 1[7] (active)	
[00:00:47]: [Shard] secondary shard LUA is now ready!
[00:00:47]: Sim paused
```

**[00:00:47]: [Shard] secondary shard LUA is now ready! significa que la conexión con el mundo principal se realizó correctamente**

Ya está listo: ahora vamos a consultar el servidor, ver el nombre de la sala actual, pulsar en el número de niveles y comprobar si los mundos ya están conectados

![Untitled](misc/images/DontStarveServerMultipleMachinesSeriesTutorial/Untitled%203.png)

Ahora vamos a enlazar todos los servidores y jugar juntos; solo hace falta un servidor en la nube, el resto pueden ser equipos locales

## Notas importantes

1. Todos los mods de los distintos mundos (mods de misiones, "cinco casillas" y similares) deben mantenerse lo más idénticos posible; si no coinciden, se pueden producir pérdidas o errores al cambiar de mundo
2. El token usado al iniciar todos los mundos debe ser exactamente el mismo, es decir, el contenido del archivo `cluster_token.txt` debe coincidir
3. Si se actualiza el juego base, el juego base de todos los mundos también debe actualizarse
4. Añadir o quitar mods también requiere modificar y reiniciar el servicio en todos los mundos por igual
5. En los mundos secundarios no se puede abrir el cuerpo celeste (no se puede iniciar la aventura lunar)
6. En los mundos secundarios no se puede cambiar de personaje

## Referencias

1. [https://atjiu.github.io/dstmod-tutorial/#/multi_dedicated_server](https://atjiu.github.io/dstmod-tutorial/#/multi_dedicated_server)
