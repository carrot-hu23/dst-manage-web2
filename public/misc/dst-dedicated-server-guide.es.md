# Guía completa: parámetros de configuración y argumentos de línea de comandos del Dedicated Server

**Autor original:** Max — [Guía original en Steam Community (chino)](https://steamcommunity.com/sharedfiles/filedetails/?id=1616647350)

1. Explica en detalle la función de cada parámetro de configuración de cluster.ini y server.ini en el Dedicated Server.
2. Preguntas frecuentes sobre la administración del servidor.
3. Explicación detallada de los argumentos de línea de comandos para iniciar el servidor.

---

## Resumen del contenido

Antes de empezar: el autor original lleva bastante tiempo jugando a Don't Starve Together y se ha encontrado con muchos problemas. Por eso recopiló y tradujo la documentación oficial, como aportación a la comunidad de habla china. En algunos puntos del texto añadió su propia interpretación, y también documentó las preguntas más frecuentes.

Este artículo se divide en tres partes:
* Si quieres configurar el servidor con más detalle para adaptarlo a necesidades específicas, consulta la explicación de cluster.ini y server.ini.
* Si necesitas controlar los permisos de los usuarios del servidor, configurar administradores, listas negras/blancas, plazas reservadas o ajustes de grupo, consulta las preguntas frecuentes.
* Si te resulta tedioso ajustar el archivo de configuración cada vez que creas un servidor nuevo, o necesitas hacer pruebas frecuentes de ajuste fino de parámetros, consulta los argumentos de línea de comandos de inicio, que permiten sobrescribir los ajustes del archivo de configuración.

Si quieres leer el texto original en inglés, consulta los siguientes enlaces:
* Explicación de cluster.ini y server.ini — [Dedicated Server Settings Guide](https://forums.kleientertainment.com/forums/topic/64552-dedicated-server-settings-guide/)
* Explicación de los argumentos de línea de comandos de inicio — [Dedicated Server Command Line Options Guide](https://forums.kleientertainment.com/forums/topic/64743-dedicated-server-command-line-options-guide/)

---

## Estructura del Dedicated Server

El Dedicated Server de Don't Starve Together usa una estructura de fragmentos ("shards"). La superficie y las cuevas donde normalmente jugamos se ejecutan de forma independiente; a cada una la llamamos "shard". El conjunto de todos los shards forma un servicio completo, al que llamamos "cluster".

Un cluster necesita un shard principal. Normalmente, el mundo de la superficie es el shard principal del cluster, llamado habitualmente "Master shard"; el mundo subterráneo (Caves) es un shard secundario.

Como el rendimiento de cada máquina física varía, para que el juego funcione con fluidez hay que elegir una forma de despliegue adecuada. Normalmente existen los siguientes tipos:

1. **Ejecución en una sola máquina física**
   ![](https://images.steamusercontent.com/ugc/946220797946387781/F2EFDE3A1DEC7BE8B13D519BEC1353C15C0F8AFC/)

2. **Varios clusters ejecutándose en una sola máquina física**
   ![](https://images.steamusercontent.com/ugc/946220797946391829/1D95CE8BCBA4CAC26FDE433E2D0C0442348C0E5B/)

3. **Un cluster ejecutándose en dos (o más) máquinas físicas**
   ![](https://images.steamusercontent.com/ugc/946220797946393703/D7C302F08C3923C8F422FC65B35CFF47887C30F7/)

Montar un servidor de Don't Starve Together es, en esencia, un proceso de despliegue. Basta con modificar los parámetros del archivo de configuración según tus necesidades para ajustar el funcionamiento del servidor.

> **Nota:** no uses el Bloc de notas de Windows para modificar los archivos de configuración. Al guardar con codificación UTF-8 con BOM, causa muchos problemas.
> Se recomienda usar editores como Notepad++, Vim, Sublime Text o EditPlus para ajustar los archivos de configuración.

---

## Explicación detallada de los parámetros de cluster.ini

### [MISC]
* **max_snapshots**
  * Valor por defecto: 6
  * Número máximo de instantáneas (snapshots) conservadas. Cada vez que se guarda la partida se genera una instantánea, que se usa para revertir el juego. Por defecto, el guardado se ejecuta justo al amanecer.
* **console_enabled**
  * Valor por defecto: true
  * Permite introducir comandos en la consola del juego o en la terminal del servidor en ejecución.

### [SHARD]
* **shard_enabled**
  * Valor por defecto: false
  * Activa la fragmentación (sharding) del servidor. Para montar un mundo de varios niveles, este parámetro debe estar en true. Para un mundo de un solo nivel se puede ignorar.
  *\*Este valor debe ser idéntico en todos los cluster.ini. (Ver nota al final de la sección)*
* **bind_ip**
  * Puede sobrescribirse desde server.ini
  * Valor por defecto: 127.0.0.1
  * Obligatorio cuando `shard_enabled = true` y `is_master = true`.
  * bind_ip especifica la dirección de red en la que el servidor principal escucha las solicitudes de conexión de los servidores de fragmento. Cuando un servidor de fragmento envía una solicitud de conexión a esta dirección, el servidor principal la detecta y conecta automáticamente los demás mundos. Si el servidor principal y los de fragmento están en la misma máquina, deja este valor en 127.0.0.1; si están en máquinas distintas, ponlo en 0.0.0.0. Este parámetro solo hace falta definirlo en el cluster.ini o server.ini del servidor principal.
* **master_ip**
  * Puede sobrescribirse desde server.ini
  * Valor por defecto: none
  * Obligatorio cuando `shard_enabled = true` y `is_master = false`.
  * Los servidores de fragmento que no son el principal intentarán conectarse al servidor principal usando esta dirección IP. Si todos los servidores del cluster están en la misma máquina, pon esta dirección en 127.0.0.1.
* **master_port**
  * Puede sobrescribirse desde server.ini
  * Valor por defecto: 10888
  * El servidor principal escucha en este puerto UDP; los servidores de fragmento que no son el principal usarán este puerto para conectarse a él. Para todos los servidores de fragmento, basta con definirlo una única vez en cluster.ini, o simplemente omitirlo y usar el valor por defecto. Este valor debe ser distinto del valor server_port del servidor principal.
* **cluster_key**
  * Puede sobrescribirse desde server.ini
  * Valor por defecto: none
  * Obligatorio cuando `shard_enabled = true`.
  * Es la contraseña que usan los servidores subordinados para autenticarse al conectarse al servidor principal. Si el servidor principal y los subordinados se ejecutan en máquinas distintas, el valor de cluster_key configurado en cada máquina debe coincidir. Si se ejecutan en la misma máquina, basta con definirlo una sola vez en cluster.ini.
  *\*Este valor debe ser idéntico en todos los cluster.ini. (Ver nota al final de la sección)*

### [STEAM]
* **steam_group_only**
  * Valor por defecto: false
  * Si se pone en true, el servidor solo permitirá unirse a los miembros del grupo de Steam especificado en steam_group_id.
* **steam_group_id**
  * Valor por defecto: 0
  * Especifica el id del grupo de Steam usado por steam_group_only / steam_group_admins.
  Sobre cómo obtener el id del grupo de Steam, consulta la sección "Preguntas frecuentes" de esta guía.
* **steam_group_admins**
  * Valor por defecto: false
  * Si se pone en true, los administradores del grupo de Steam especificado se convertirán automáticamente en administradores del servidor de Don't Starve Together.

### [NETWORK]
* **offline_cluster**
  * Valor por defecto: false
  * Crea un servidor sin conexión. Este servidor no aparecerá en la lista pública de servidores, solo podrán unirse usuarios locales, y todas las funciones relacionadas con Steam quedan deshabilitadas.
  *\*Este valor debe ser idéntico en todos los cluster.ini. (Ver nota al final de la sección)*
* **tick_rate**
  * Valor por defecto: 15
  * Este valor indica cuántas veces por segundo el servidor envía actualizaciones de estado al cliente. Aumentarlo hace que la respuesta del cliente sea más precisa, pero también incrementa la carga de red. Se recomienda mantener el valor por defecto de 15. Si realmente necesitas cambiarlo, hazlo en un entorno de red local y usa un valor que divida a 60 (15, 20, 30).
* **whitelist_slots**
  * Valor por defecto: 0
  * Número de plazas reservadas para los jugadores de la lista blanca. Para añadir un jugador a la lista blanca, basta con agregar su id de usuario de Klei en el archivo whitelist.txt (este archivo debe colocarse en el mismo directorio que cluster.ini).
  *\*\*Solo tiene efecto en el servidor principal (ver nota al final de la sección)*
* **cluster_password**
  * Valor por defecto: none
  * Contraseña que los jugadores deben introducir para entrar al servidor. Si no necesitas contraseña, deja este campo vacío u omítelo.
  *\*\*Solo tiene efecto en el servidor principal (ver nota al final de la sección)*
* **cluster_name**
  * Nombre del servidor; se mostrará con este nombre en la lista pública de salas.
  *\*\*Solo tiene efecto en el servidor principal (ver nota al final de la sección)*
* **cluster_description**
  * Valor por defecto: empty
  * Descripción del servidor. En la lista pública de salas, se mostrará este contenido en el apartado de detalles del servidor.
  *\*\*Solo tiene efecto en el servidor principal (ver nota al final de la sección)*
* **lan_only_cluster**
  * Valor por defecto: false
  * Si se pone en true, el servidor solo permitirá entrar a jugadores de la misma red local.
  *\*\*Solo tiene efecto en el servidor principal (ver nota al final de la sección)*
* **cluster_intention**
  * Valor por defecto: depende del modo de juego elegido
  * Estilo de juego del cluster del servidor. Su función es equivalente a la opción de estilo de juego al crear una partida (Host Game) desde el propio juego. Valores posibles: cooperative, competitive, social, madness
  *\*\*Solo tiene efecto en el servidor principal (ver nota al final de la sección)*
* **autosaver_enabled**
  * Valor por defecto: true
  * Si se pone en false, el juego no guardará automáticamente al final de cada día; en su lugar, guardará al cerrar el servidor. El guardado manual mediante el comando `c_save()` sigue estando disponible.

### [GAMEPLAY]
* **max_players**
  * Valor por defecto: 16
  * Número de jugadores que pueden estar conectados al servidor simultáneamente.
  *\*\*Solo tiene efecto en el servidor principal (ver nota al final de la sección)*
* **pvp**
  * Valor por defecto: false
  * Si se pone en true, activa el modo PvP.
* **game_mode**
  * Valor por defecto: survival
  * Modo de juego. Equivale a la opción de modo de juego en Host Game (Supervivencia, Interminable, Salvaje). Valores posibles: survival, endless, wilderness
  *\*Este valor debe ser idéntico en todos los cluster.ini. (Ver nota al final de la sección)*
* **pause_when_empty**
  * Valor por defecto: false
  * Si se pone en true, el tiempo del servidor se pausa cuando no hay ningún jugador conectado.
* **vote_enabled**
  * Valor por defecto: true
  * Si se pone en true, activa la función de votaciones entre jugadores.

### Notas adicionales:
```text
如果使用多物理机运行服务器，每个物理机上将有一个cluster.ini文件，且所有cluster.ini文件内容相同。

** 上文中标记"仅主服务器有效"，表示仅有主服务器中的cluster.ini有效，其他分片服务器中cluster.ini中配置会被忽略。

* 上文中标记"每个cluster.ini中的设置必须一致"，表示所有机器中cluster.ini值必须一致。可忽略配置从而使用默认值。
```

Traducción de la nota anterior:
```text
Si ejecutas el servidor en varias máquinas físicas, cada una tendrá su propio archivo cluster.ini, y el contenido de todos esos cluster.ini debe ser idéntico.

** Cuando arriba se indica "solo tiene efecto en el servidor principal", significa que solo el cluster.ini del servidor principal es efectivo; la configuración del cluster.ini en los demás servidores de fragmento se ignora.

* Cuando arriba se indica "este valor debe ser idéntico en todos los cluster.ini", significa que el valor debe coincidir en el cluster.ini de todas las máquinas. Se puede omitir la configuración para usar el valor por defecto.
```

---

## Explicación detallada de los parámetros de server.ini

### [SHARD]
* **is_master**
  * Valor por defecto: none
  * Obligatorio cuando `shard_enabled = true`.
  * Marca un servidor de fragmento como el servidor principal. Cada cluster debe tener exactamente un shard principal. Ponlo en true en el server.ini del servidor principal, y en false en los demás fragmentos.
* **name**
  * Valor por defecto: none
  * Obligatorio cuando `shard_enabled = true` e `is_master = false`.
  * Nombre del servidor de fragmento que se muestra en los logs. El shard principal usará `[SHDMASTER]` como nombre, sobrescribiendo este valor.
* **id**
  * Valor por defecto: un número generado aleatoriamente
  * Este campo lo genera automáticamente el servidor de fragmento para mantener su unicidad. Modificar o eliminar este valor después de que los jugadores ya estén en el servidor puede causar errores en el programa.

### [STEAM]
* **authentication_port**
  * Valor por defecto: 8766
  * Puerto interno usado por Steam. En una misma máquina, cada servidor de fragmento debe tener un valor distinto para este puerto.
* **master_server_port**
  * Valor por defecto: 27016
  * Puerto interno usado por Steam. En una misma máquina, cada servidor de fragmento debe tener un valor distinto para este puerto.

### [NETWORK]
* **server_port**
  * Valor por defecto: 10999
  * Puerto UDP que este servidor usa para escuchar conexiones. En un cluster de varios niveles, cada fragmento en la misma máquina debe tener un puerto distinto. Si quieres que el servidor aparezca en la lista pública de servidores, este puerto debe estar en el rango 10998~11018. El rango real permitido es 1-65535; los puertos por debajo de 1024 pueden implicar problemas de permisos de usuario en algunos sistemas operativos, por lo que no se recomiendan.

---

## Preguntas frecuentes

1. **P: ¿Cómo configuro una lista negra?**
   **R:**
   * En el mismo directorio que cluster.ini, añade un archivo `blocklist.txt`. Este archivo admite tanto id de Klei como steam64 id.
   * En el directorio Master del servidor, revisa el archivo `server_log.txt` para encontrar el registro de inicio de sesión del usuario, como se muestra a continuación:
     ![](https://images.steamusercontent.com/ugc/946220797946496237/2F511135E5EFF651AB6393C5876A844EC3189CE4/)
   * Copia ese Klei UserId que empieza por "KU" al blocklist.txt recién creado, uno por línea, guarda y cierra. Basta con reiniciar el servidor.
   * Si por algún motivo no puedes consultar el log del servidor, también puedes gestionar la lista mediante el steam64 id. Sobre cómo obtenerlo, consulta la pregunta correspondiente más abajo.
   *Además, desde la propia interfaz del juego, un administrador también puede expulsar (banear) a alguien mediante la interfaz gráfica, lo que lo añade a esta lista blocklist.txt.*

2. **P: ¿Cómo añado un administrador?**
   **R:** En el mismo directorio que cluster.ini, añade un archivo `adminlist.txt`. Este archivo admite tanto id de Klei como steam64 id.
   Añade el Klei UserID que empieza por "KU" línea por línea en este archivo y guarda. Basta con reiniciar el servidor.

3. **P: ¿Cómo configuro una lista blanca y reservo plazas para jugadores concretos?**
   **R:** En el mismo directorio que cluster.ini, añade un archivo `whitelist.txt`. Este archivo admite tanto id de Klei como steam64 id.
   Añade el Klei UserID que empieza por "KU" línea por línea en este archivo y guarda.
   En la sección `[NETWORK]` de cluster.ini, añade `whitelist_slots = X`, donde X es el número de plazas a reservar. Por ejemplo, si el límite del servidor es 6 y reservas 2 plazas, cuando el servidor llegue a 4 jugadores, los jugadores que no estén en la lista blanca ya no podrán unirse.

4. **P: ¿Cómo obtengo el steam64 id para usarlo en las listas negra, blanca o de administradores?**
   **R:** Aquí tienes dos métodos:
   * **Método 1**: para usuarios de Steam que no tienen una URL personalizada, normalmente el último segmento de la URL de su perfil es el steam64 id. Por ejemplo, si la URL de un perfil es [https://steamcommunity.com/profiles/76561198107878383/](https://steamcommunity.com/profiles/76561198107878383/), su steam64 id es `76561198107878383`.
   * **Método 2**: si el usuario tiene una URL personalizada y no se puede ver el id directamente, algunos sitios de terceros permiten obtener el steam64 id con facilidad. Basta con introducir la URL del perfil en el buscador del sitio para obtener los detalles del id de la cuenta. Algunos sitios disponibles:
     * [https://steamid.xyz/](https://steamid.xyz/)
     * [http://steamrep.com/](http://steamrep.com/)

5. **P: ¿Cómo obtengo el steam_group_id?**
   **R:** Configurar un grupo facilita la gestión de los miembros del juego.
   * **Método 1**: si eres administrador del grupo, en la página principal del grupo pulsa "Editar perfil del grupo" a la derecha. En la página de administración, el valor de ID de la primera línea es el steam_group_id.
   * **Método 2**: para miembros normales, en la página principal del grupo pulsa "Invitar amigos" y toma el valor de invitegid de la barra de URL, por ejemplo 103582791451482449. Réstale 103582791429521408, es decir, `103582791451482449 - 103582791429521408 = 21961041`, y ese es el id del grupo de Steam actual.

6. **P: ¿Cómo estimo y ajusto el rendimiento del servidor?**
   **R:** El servidor de Don't Starve Together requiere bastante memoria, pero su exigencia de CPU es moderada. Según los datos de referencia de la [wiki](http://dontstarve.wikia.com/wiki/Guides/Don%E2%80%99t_Starve_Together_Dedicated_Servers): velocidad de red (subida) = 8 KB/jugador/segundo, memoria ≈ 65 MB/jugador. Teniendo en cuenta que el propio sistema operativo también consume algo de memoria, para un servidor de 6 jugadores, un solo shard (superficie o cuevas) debería tener al menos 1 GB de RAM, y se recomienda una máquina con 2 GB o más.
   Si la máquina física tiene un rendimiento limitado, se recomienda desplegar un único shard por máquina.
   Además, está el control del número de mods. Con recursos limitados, desactivar algunos mods que consumen muchos recursos del sistema puede mejorar el funcionamiento del servidor.

7. **P: Si los shards de superficie y cuevas no están en la misma máquina, ¿cómo ajusto la configuración?**
   **R:** Para los requisitos del archivo de configuración, consulta el diagrama de la segunda sección de esta guía.
   * En cluster.ini, cambia el valor de `bind_ip` a `0.0.0.0`.
   * Pon el valor de `master_ip` como la IP de la máquina donde está el shard de superficie. Si Master y Caves están en la misma red, master_ip también puede ser una dirección de red interna.
   * Copia el cluster.ini modificado a la máquina donde está Caves.
   * Copia cluster_token.txt a la máquina donde está Caves.
   * Basta con iniciar el shard correspondiente en cada una de las dos máquinas.

---

## Explicación detallada de los argumentos de línea de comandos de inicio del servidor

La línea de comandos se refiere al ejecutable `dontstarve_dedicated_server_nullrenderer`, ubicado en `Don't Starve Together Dedicated Server/bin`.

Normalmente, iniciar un shard por línea de comandos no requiere muchos parámetros. Sin embargo, algunos argumentos de línea de comandos pueden sobrescribir los ajustes del archivo de configuración, y sirven como alternativa.

A continuación se explica la función de cada parámetro:

* **-persistent_storage_root**
  * Cambia la ubicación de almacenamiento por defecto de la configuración. El valor del parámetro debe ser una ruta absoluta. La ruta completa donde se almacenan los archivos de configuración es `<persistent_storage_root>/<conf_dir>/`, donde el valor de `<conf_dir>` lo proporciona el parámetro `-conf_dir`. En las distintas plataformas, las ubicaciones por defecto son:
    ```text
    Windows: <Your documents folder>/Klei
    Mac OSX: <Your home folder>/Documents/Klei
    Linux: ~/.klei
    ```
* **-conf_dir**
  * Cambia el directorio de configuración al que se apunta. El valor del parámetro no puede contener "/" ni "\\". La ruta completa donde se almacenan los archivos de configuración es `<persistent_storage_root>/<conf_dir>`, donde el valor de `<persistent_storage_root>` lo proporciona el parámetro `-persistent_storage_root`.
  * El valor por defecto de `-conf_dir` es `"DoNotStarveTogether"`.
* **-cluster**
  * Define el directorio que usará el cluster del servidor de juego. El servidor buscará el archivo cluster.ini en la ruta: `<persistent_storage_root>/<conf_dir>/<cluster>/cluster.ini`
  * El valor por defecto del parámetro `-cluster` es `"Cluster_1"`.
* **-shard**
  * Define el directorio que usará el servidor de shard. El servidor buscará el archivo server.ini en la ruta: `<persistent_storage_root>/<conf_dir>/<cluster>/<shard>/server.ini`
  * El valor por defecto del parámetro `-shard` es `"Master"`.
* **-offline**
  * Inicia el servidor en modo sin conexión. Una vez iniciado, no aparecerá en la lista pública de servidores; solo podrán unirse jugadores de la red local, y todas las funciones relacionadas con Steam quedarán deshabilitadas.
* **-disabledatacollection**
  * Desactiva la recopilación de datos.
  * Klei recopila datos de los usuarios de forma continua para ofrecer sus servicios en línea. Si usas este parámetro, dejarán de enviarse datos de usuario, pero el servidor pasará a funcionar en modo sin conexión.
* **-bind_ip \<bind_ip\>**
  * Cambia la dirección IP a la que se vincula el servidor para escuchar las solicitudes de conexión de los usuarios. La mayoría de usuarios no necesitará esta opción (es más probable que se use en servidores con varias máquinas físicas).
* **-port \<port_number\>**
  * Rango de valores permitido: 1~65535
  * Puerto UDP que el servidor usa para escuchar solicitudes de conexión. Este valor sobrescribe el valor `server_port` de la sección `[NETWORK]` en server.ini. Si ejecutas un mundo de varios niveles, el puerto de cada nivel no puede coincidir. Solo los puertos en el rango 10998~11018 permiten que el servidor aparezca en la lista pública. Los puertos por debajo de 1024 pueden dar problemas de permisos en algunos sistemas operativos.
* **-players \<max_players\>**
  * Rango de valores: 1~64
  * Define el número máximo de jugadores permitidos en el servidor. Este valor sobrescribe el ajuste `[GAMEPLAY] / max_players` del archivo cluster.ini.
* **-steam_master_server_port \<port_number\>**
  * Rango de valores: 1~65535
  * Puerto interno usado por Steam. Este valor sobrescribe el ajuste `[STEAM] / master_server_port` del archivo server.ini. Asegúrate de que los servidores en la misma máquina usen valores de puerto distintos.
* **-steam_authentication_port \<port_number\>**
  * Rango de valores: 1~65535
  * Puerto interno usado por Steam. Este parámetro sobrescribe el ajuste `[STEAM] / authentication_port` del archivo server.ini. Asegúrate de que los servidores en la misma máquina usen valores de puerto distintos.
* **-backup_logs**
  * Crea una copia de seguridad del archivo de log anterior cada vez que se inicia el servidor. Estas copias se almacenan en la carpeta backup, dentro del mismo directorio que server.ini.
* **-tick \<tick_rate\>**
  * Rango de valores: 15~60
  * Este valor indica cuántas veces por segundo el servidor interactúa con el cliente. Aumentarlo incrementa el consumo de ancho de banda de red. El uso de este parámetro sobrescribe el ajuste `[NETWORK] / tick_rate` de cluster.ini. Se recomienda mantener el valor por defecto de 15. Si realmente necesitas cambiarlo, hazlo en un entorno de red local y usa un valor que divida a 60 (15, 20, 30).

### Ejemplo de uso de los parámetros:
Para ejecutar un mundo de dos niveles, la línea de comandos tendría esta forma:
```bash
dontstarve_dedicated_server_nullrenderer -console -cluster MyClusterName -shard Master
dontstarve_dedicated_server_nullrenderer -console -cluster MyClusterName -shard Caves
```

Las dos líneas anteriores ejecutarán el servidor de juego usando los archivos de configuración ubicados en:
```text
<Klei默认路径>/MyClusterName/cluster.ini
<Klei默认路径>/MyClusterName/Master/server.ini
<Klei默认路径>/MyClusterName/Caves/server.ini
```
(`<Klei默认路径>` = la ruta por defecto de Klei indicada en `-persistent_storage_root` más arriba, según tu sistema operativo)

---

*Traducción al español de la guía comunitaria original en chino de Steam Community, con fines de referencia dentro de este panel. Consulta siempre la [guía original](https://steamcommunity.com/sharedfiles/filedetails/?id=1616647350) para ver actualizaciones o imágenes adicionales.*
